<template>
  <div class="shuttle-stowage-page">
    <!-- 编辑/改单/补单模式顶部提示栏 -->
    <div v-if="isEditMode" class="edit-mode-banner" style="background:#fffbe6;border:1px solid #ffe58f;padding:6px 12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;font-size:12px;border-radius:3px;">
      <span>当前正在修改{{ bizTitle }}批次：<b>{{ batchForm.transportNo }}</b>（{{ editModeText }}）</span>
      <el-button size="small" type="warning" plain @click="exitEditMode">退出修改并返回列表</el-button>
    </div>

    <el-tabs v-model="activeTab" type="card" class="stowage-tabs">
      <!-- 页签1：选择运单库存 (左右分栏穿梭表格 1:1) -->
      <el-tab-pane label="选择运单库存" name="select">
        <div class="shuttle-top-box">
          <!-- 第一行：查询条件 + 分页 -->
          <div class="filter-top-row">
            <el-form :inline="true" size="small" class="listForm" @submit.prevent>
              <el-form-item class="dateItem">
                <el-select v-model="queryForm.timeType" class="width-90">
                  <el-option label="开单日期" :value="1" />
                  <el-option label="托运日期" :value="2" />
                </el-select>
                <el-date-picker
                  v-model="queryForm.dateRange"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD"
                  class="width-220"
                />
              </el-form-item>

              <el-form-item>
                <NetworkTreeSelect
                  v-model="queryForm.startGroups"
                  placeholder="请选择始发网点"
                  :width="160"
                />
              </el-form-item>

              <el-form-item>
                <NetworkTreeSelect
                  v-model="queryForm.destGroups"
                  placeholder="请选择终端网点"
                  :width="160"
                />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :icon="Search" @click="ElMessage.success('库存刷新成功')">
                  查询
                </el-button>
              </el-form-item>

              <el-form-item>
                <span
                  class="funnel-trigger"
                  title="高级筛选"
                  @click="leftTableRef?.openSeniorFilter()"
                >
                  <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                    <path
                      d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                    />
                  </svg>
                </span>
              </el-form-item>
            </el-form>

            <GbPager
              :total="leftStockList.length"
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
            />
          </div>

          <!-- 第二行：快速跳转 + 下一步 + 穿梭按钮 + 左右列设置 -->
          <div class="shuttle-action-row">
            <div class="shuttle-left-acts">
              <span class="quick-label">快速跳转</span>
              <el-input
                v-model="quickJumpNo"
                size="small"
                placeholder="输入运单号/货号回车移入右侧"
                style="width: 210px"
                clearable
                @keyup.enter="handleQuickJump"
              />
              <el-button size="small" type="primary" @click="goNextStep">
                下一步
              </el-button>
              <el-button size="small" class="btn-green" @click="moveSelectedToRight">
                移入选中 &gt;
              </el-button>
              <el-button size="small" class="btn-green" @click="moveAllToRight">
                全部移入 &gt;&gt;
              </el-button>
              <el-button size="small" type="warning" @click="moveSelectedToLeft">
                &lt; 移出选中
              </el-button>
              <el-button size="small" type="warning" @click="moveAllToLeft">
                &lt;&lt; 全部移出
              </el-button>
            </div>

            <div class="shuttle-right-acts">
              <el-button size="small" :icon="Lock" @click="leftTableRef?.saveColumnAppearance()">
                保存外观
              </el-button>
              <el-button size="small" :icon="Setting" @click="leftTableRef?.openColumnSet()">
                左列设置
              </el-button>
              <el-button size="small" :icon="Setting" @click="rightTableRef?.openColumnSet()">
                右列设置
              </el-button>
            </div>
          </div>
        </div>

        <!-- 双栏穿梭表格主体 (左：待选库存运单，右：本车已选运单) -->
        <div class="shuttle-split-wrap">
          <div class="shuttle-pane">
            <div class="pane-header">
              <span>待选运单库存 ({{ leftStockList.length }} 票)</span>
              <span class="pane-tip">双击行可快速移入右侧</span>
            </div>
            <GbTableEngine
              ref="leftTableRef"
              :table-data="leftStockList"
              :columns="SHUTTLE_WAYBILL_COLUMNS"
              :filter-items="SHUTTLE_WAYBILL_FILTERS"
              :storage-key="`kebang_shuttle_left_${bizType}_v2`"
              @selection-change="rows => (leftChecked = rows)"
              @row-dblclick="moveOneToRight"
            />
          </div>

          <div class="shuttle-divider">
            <div class="divider-handle">||</div>
          </div>

          <div class="shuttle-pane">
            <div class="pane-header right-header">
              <span>已选配载运单 ({{ rightSelectedList.length }} 票)</span>
              <span class="pane-tip">双击行可移回左侧库存</span>
            </div>
            <GbTableEngine
              ref="rightTableRef"
              :table-data="rightSelectedList"
              :columns="SHUTTLE_WAYBILL_COLUMNS"
              :filter-items="SHUTTLE_WAYBILL_FILTERS"
              :storage-key="`kebang_shuttle_right_${bizType}_v2`"
              @selection-change="rows => (rightChecked = rows)"
              @row-dblclick="moveOneToLeft"
            />
          </div>
        </div>

        <!-- 右下角悬浮蓝色配载车图标徽章 (1:1 live_addTranslist.png) -->
        <div class="floating-cart-badge" title="点击进入填写表单" @click="goNextStep">
          <el-badge :value="rightSelectedList.length" :max="99">
            <div class="cart-circle">
              <el-icon :size="22"><Van /></el-icon>
            </div>
          </el-badge>
        </div>
      </el-tab-pane>

      <!-- 页签2：填写表单 (填写基本信息 + 途径装卸网点 + 费用分摊) -->
      <el-tab-pane label="填写表单" name="form">
        <div class="form-pane-container">
          <!-- 模块1：填写基本信息 -->
          <div class="section-card">
            <div class="section-title">填写基本信息 ({{ bizTitle }})</div>
            <el-form :model="batchForm" label-width="100px" size="small" class="batch-form-grid">
              <el-form-item label="发车批次" required>
                <el-input v-model="batchForm.transportNo" />
              </el-form-item>
              <el-form-item label="合同编号">
                <el-input v-model="batchForm.contractNo" />
              </el-form-item>
              <el-form-item label="始发网点" required>
                <el-select v-model="batchForm.startGroup" style="width: 100%">
                  <el-option label="总部" value="总部" />
                  <el-option label="佛山分部" value="佛山分部" />
                  <el-option label="长沙分部" value="长沙分部" />
                  <el-option label="上海分部" value="上海分部" />
                </el-select>
              </el-form-item>
              <el-form-item label="运输类型">
                <el-select v-model="batchForm.transportMode" style="width: 100%">
                  <el-option label="专线运输" value="专线运输" />
                  <el-option label="整车直送" value="整车直送" />
                </el-select>
              </el-form-item>

              <el-form-item v-if="batchForm.transportMode === '整车直送'" label="直送城市" required>
                <el-select
                  v-model="batchForm.destGroup"
                  filterable
                  placeholder="城市/拼音首字母检索"
                  style="width: 100%"
                >
                  <el-option
                    v-for="c in archiveStore.cityList"
                    :key="c.code"
                    :label="`${c.name} (${c.pinyin.toUpperCase()})`"
                    :value="c.name"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-else label="终端网点" required>
                <el-select v-model="batchForm.destGroup" filterable style="width: 100%">
                  <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
                </el-select>
              </el-form-item>

              <el-form-item label="承运公司">
                <el-input v-model="batchForm.supplierName" placeholder="车队或承运商名称" />
              </el-form-item>
              <el-form-item label="车牌号码" required>
                <VehiclePopoverInput
                  v-model="batchForm.licenseNo"
                  placeholder="车牌号/司机/拼音联想"
                  @select="onSelectStowageVehicle"
                />
              </el-form-item>
              <el-form-item label="司机姓名" required>
                <el-input v-model="batchForm.driverName" placeholder="随车司机姓名" />
              </el-form-item>
              <el-form-item label="司机手机" required>
                <el-input v-model="batchForm.driverMobile" placeholder="司机联系电话" />
              </el-form-item>

              <el-form-item label="起运时间">
                <el-date-picker
                  v-model="batchForm.shipTime"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="要求到达时间">
                <el-date-picker
                  v-model="batchForm.askArriveTime"
                  type="datetime"
                  value-format="YYYY-MM-DD HH:mm:ss"
                  style="width: 100%"
                />
              </el-form-item>
              <el-form-item label="大车总运费">
                <el-input-number
                  v-model="batchForm.fTotal"
                  :min="0"
                  style="width: 100%"
                  @change="recalcApportion"
                />
              </el-form-item>
              <el-form-item label="预付车费">
                <el-input-number v-model="batchForm.fPrepare" :min="0" style="width: 100%" />
              </el-form-item>

              <el-form-item label="到付车费">
                <el-input-number v-model="batchForm.fArrive" :min="0" style="width: 100%" />
              </el-form-item>
              <el-form-item label="回付车费">
                <el-input-number v-model="batchForm.fBack" :min="0" style="width: 100%" />
              </el-form-item>
              <el-form-item label="油卡付">
                <el-input-number v-model="batchForm.fOilCard" :min="0" style="width: 100%" />
              </el-form-item>
              <el-form-item label="途径网点">
                <div style="display:flex;gap:4px;width:100%">
                  <el-input v-model="batchForm.routeGroup" placeholder="点击右侧按钮配置途经装卸网点" readonly />
                  <el-button size="small" type="primary" plain @click="viaDialogVisible = true">+途径网点</el-button>
                </div>
              </el-form-item>

              <el-form-item label="备注说明" class="span-all">
                <el-autocomplete
                  v-model="batchForm.remark"
                  :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('remark', q))"
                  placeholder="请输入随车交接备注说明（支持常用语联想）"
                  style="width: 100%"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 模块2：费用分摊与本车运单清单 -->
          <div class="section-card">
            <div class="section-title-row">
              <span class="section-title" style="margin-bottom: 0">
                本车运单大车费用分摊 (共 {{ rightSelectedList.length }} 票)
              </span>
              <div class="apportion-radios">
                <span>分摊方式：</span>
                <el-radio-group v-model="apportionMode" size="small" @change="recalcApportion">
                  <el-radio-button label="weight">按重量分摊</el-radio-button>
                  <el-radio-button label="volume">按体积分摊</el-radio-button>
                  <el-radio-button label="freight">按运费分摊</el-radio-button>
                  <el-radio-button label="equal">按票数均摊</el-radio-button>
                </el-radio-group>
              </div>
            </div>

            <el-table :data="rightSelectedList" size="small" border stripe height="260" show-summary>
              <el-table-column type="index" label="序号" width="55" align="center" />
              <el-table-column prop="orderNo" label="运单号" width="135" />
              <el-table-column prop="goodsNo" label="货号" width="120" />
              <el-table-column prop="startGroup" label="始发网点" width="100" />
              <el-table-column prop="destGroup" label="终端网点" width="100" />
              <el-table-column prop="goodsName" label="品名" min-width="130" />
              <el-table-column prop="numberCount" label="件数" width="75" />
              <el-table-column prop="weightCount" label="重量(kg)" width="90" />
              <el-table-column prop="volumeCount" label="体积(m³)" width="90" />
              <el-table-column prop="fTotal" label="合计运费" width="95" />
              <el-table-column prop="cost" label="本车分摊成本(元)" width="140">
                <template #default="{ row }">
                  <el-input-number
                    v-model="row.cost"
                    size="small"
                    :min="0"
                    :precision="2"
                    style="width: 115px"
                  />
                </template>
              </el-table-column>
            </el-table>
          </div>

          <!-- 底部提交栏 -->
          <div class="form-footer-bar">
            <el-checkbox v-model="printManifestAfterSave" style="margin-right: 12px">保存后打印随车清单</el-checkbox>
            <el-button size="small" @click="activeTab = 'select'">上一步 (返回选单)</el-button>
            <el-button size="small" class="btn-green" @click="submitStowage(false)">
              保 存
            </el-button>
            <el-button size="small" type="primary" @click="submitStowage(true)">
              保存并确认发车
            </el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 900px 添加途径网点弹窗 (1:1 复刻生产环境途径网点配置) -->
    <el-dialog v-model="viaDialogVisible" title="添加途径网点与分段到付设置" width="880px" append-to-body>
      <div style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; color: #606266;">配置本车次中途经停装卸货网点及途径分段到付车费：</span>
        <el-button size="small" type="primary" plain @click="addViaStationRow">+ 新增途经站</el-button>
      </div>
      <el-table :data="viaStationRows" border size="small" show-summary>
        <el-table-column type="index" label="顺序" width="55" align="center" />
        <el-table-column label="途径网点名称" width="180">
          <template #default="{ row }">
            <el-select v-model="row.branchName" filterable size="small" style="width: 100%">
              <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="里程(km)" width="120">
          <template #default="{ row }">
            <el-input-number v-model="row.distance" :min="0" size="small" style="width: 95px" />
          </template>
        </el-table-column>
        <el-table-column prop="viaPay" label="途径到付车费(元)" width="150">
          <template #default="{ row }">
            <el-input-number v-model="row.viaPay" :min="0" size="small" style="width: 120px" />
          </template>
        </el-table-column>
        <el-table-column prop="loadFee" label="中途装卸费(元)" width="140">
          <template #default="{ row }">
            <el-input-number v-model="row.loadFee" :min="0" size="small" style="width: 115px" />
          </template>
        </el-table-column>
        <el-table-column label="装卸备注" min-width="150">
          <template #default="{ row }">
            <el-input v-model="row.remark" size="small" placeholder="中途卸货/配货说明" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70" align="center">
          <template #default="{ $index }">
            <el-button size="small" type="danger" link @click="viaStationRows.splice($index, 1)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button size="small" @click="viaDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmViaStations">确定保存途径网点</el-button>
      </template>
    </el-dialog>

    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Lock, Setting, Van } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { useArchiveStore, type VehicleArchiveItem } from '@/store/dictionaryAndArchive'
import {
  SHUTTLE_WAYBILL_COLUMNS,
  SHUTTLE_WAYBILL_FILTERS
} from './OperationColumnConfig'
import NetworkTreeSelect from './NetworkTreeSelect.vue'
import GbPager from './GbPager.vue'
import GbTableEngine from './GbTableEngine.vue'
import VehiclePopoverInput from './VehiclePopoverInput.vue'
import PrintPreviewDialog from './PrintPreviewDialog.vue'

const props = withDefaults(
  defineProps<{
    /** 1:干线配载, 2:短途配载, 3:到货分拨, 4:送货上门, 5:本地外发, 6:终端外发, 7:送出外发 */
    bizType?: number
    bizTitle?: string
    prefix?: string
    backRoute?: string
  }>(),
  {
    bizType: 1,
    bizTitle: '干线配载',
    prefix: 'GX',
    backRoute: '/operation/ship/translist'
  }
)

const route = useRoute()
const router = useRouter()
const opStore = useOperationStore()
const archiveStore = useArchiveStore()

const activeTab = ref('select')
const currentPage = ref(1)
const pageSize = ref(100)
const quickJumpNo = ref('')
const printManifestAfterSave = ref(false)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

const leftTableRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const rightTableRef = ref<InstanceType<typeof GbTableEngine> | null>(null)

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

const selectedWaybillIds = ref<Set<string>>(new Set())
const leftChecked = ref<Record<string, any>[]>([])
const rightChecked = ref<Record<string, any>[]>([])

const leftStockList = computed(() =>
  opStore.shipList.filter(r => !selectedWaybillIds.value.has(r.id))
)
const rightSelectedList = computed(() =>
  opStore.shipList.filter(r => selectedWaybillIds.value.has(r.id))
)

const batchForm = reactive({
  id: '',
  transportNo: `${props.prefix}26101100${opStore.transList.length + opStore.stransList.length + 1}`,
  contractNo: `HT-${props.prefix}-202610110${opStore.transList.length + 1}`,
  transportMode: '专线运输',
  startGroup: '总部',
  destGroup: '长沙分部',
  supplierName: '广州粤湘干线运输有限公司',
  licenseNo: '粤A·99681挂',
  driverName: '罗成刚',
  driverMobile: '13822119900',
  shipTime: '2026-10-11 11:00:00',
  askArriveTime: '2026-10-12 08:00:00',
  fTotal: 2800,
  fPrepare: 1000,
  fArrive: 1800,
  fBack: 0,
  fOilCard: 0,
  routeGroup: '',
  remark: ''
})

// 途径网点弹窗数据
const viaDialogVisible = ref(false)
const viaStationRows = ref([
  { branchName: '衡阳营业部', distance: 520, viaPay: 600, loadFee: 120, remark: '中途卸衡阳货' },
  { branchName: '株洲营业部', distance: 650, viaPay: 400, loadFee: 80, remark: '经停株洲分拨' },
])

function addViaStationRow() {
  viaStationRows.value.push({
    branchName: '湘潭营业部',
    distance: 680,
    viaPay: 300,
    loadFee: 50,
    remark: ''
  })
}

function confirmViaStations() {
  batchForm.routeGroup = viaStationRows.value.map(r => r.branchName).filter(Boolean).join(' -> ')
  viaDialogVisible.value = false
  ElMessage.success(`已设置途径网点：${batchForm.routeGroup}`)
}

function onSelectStowageVehicle(v: VehicleArchiveItem) {
  batchForm.licenseNo = v.plateNo
  batchForm.driverName = v.driverName
  batchForm.driverMobile = v.driverPhone
  if (v.bankName) {
    batchForm.supplierName = `${v.driverName}专线车队 (${v.carType})`
  }
}

const apportionMode = ref<'weight' | 'volume' | 'freight' | 'equal'>('weight')

const editIdParam = computed(() => String(route.params.id || ''))
const editTypeParam = computed(() => String(route.params.type || '1'))
const isEditMode = computed(() => Boolean(editIdParam.value))
const editModeText = computed(() => {
  if (editTypeParam.value === '2') return '补单模式：可从左侧继续选单追加配载'
  if (editTypeParam.value === '3') return '更改单据模式：可调整车辆车费与分摊明细'
  return '配载批次编辑模式'
})

function exitEditMode() {
  router.push(props.backRoute)
}

onMounted(() => {
  // 支持从运单管理勾选运单后直接带入右侧已选配载列表
  const preIds = String(route.query.shipIds || '')
  if (preIds) {
    preIds.split(',').filter(Boolean).forEach(id => selectedWaybillIds.value.add(id))
    recalcApportion()
  }

  const editId = String(route.params.id || '')
  if (editId) {
    const sourceArr =
      props.bizType === 1
        ? opStore.transList
        : props.bizType === 7
          ? opStore.sendOutList
          : opStore.stransList
    const found = sourceArr.find(r => r.id === editId || r.transportNo === editId)
    if (found) {
      Object.assign(batchForm, found)
      const ids: string[] = found.waybillIds || []
      ids.forEach(id => selectedWaybillIds.value.add(id))
      if (String(route.params.type) === '3') {
        activeTab.value = 'form'
      }
    }
  }
})

// 穿梭操作
function moveOneToRight(row: Record<string, any>) {
  selectedWaybillIds.value.add(row.id)
  recalcApportion()
}

function moveOneToLeft(row: Record<string, any>) {
  selectedWaybillIds.value.delete(row.id)
  recalcApportion()
}

function moveSelectedToRight() {
  if (leftChecked.value.length === 0) {
    ElMessage.warning('请在左侧勾选需要配载的运单')
    return
  }
  leftChecked.value.forEach(r => selectedWaybillIds.value.add(r.id))
  leftTableRef.value?.clearSelection()
  recalcApportion()
}

function moveAllToRight() {
  leftStockList.value.forEach(r => selectedWaybillIds.value.add(r.id))
  recalcApportion()
}

function moveSelectedToLeft() {
  if (rightChecked.value.length === 0) {
    ElMessage.warning('请在右侧勾选需要移出的运单')
    return
  }
  rightChecked.value.forEach(r => selectedWaybillIds.value.delete(r.id))
  rightTableRef.value?.clearSelection()
  recalcApportion()
}

function moveAllToLeft() {
  selectedWaybillIds.value.clear()
}

function handleQuickJump() {
  const kw = quickJumpNo.value.trim().toLowerCase()
  if (!kw) return
  const found = leftStockList.value.find(
    r =>
      String(r.orderNo || '').toLowerCase().includes(kw) ||
      String(r.goodsNo || '').toLowerCase().includes(kw)
  )
  if (found) {
    selectedWaybillIds.value.add(found.id)
    quickJumpNo.value = ''
    recalcApportion()
    ElMessage.success(`已移入运单 ${found.orderNo}`)
  } else {
    ElMessage.warning('待选库存中未找到该单号')
  }
}

function goNextStep() {
  if (rightSelectedList.value.length === 0) {
    if (leftStockList.value.length > 0) {
      selectedWaybillIds.value.add(leftStockList.value[0].id)
    }
  }
  recalcApportion()
  activeTab.value = 'form'
}

function recalcApportion() {
  const rows = rightSelectedList.value
  if (rows.length === 0) return
  const totalCost = Number(batchForm.fTotal || 0)
  if (apportionMode.value === 'equal') {
    const each = Number((totalCost / rows.length).toFixed(2))
    rows.forEach(r => (r.cost = each))
    return
  }
  const key =
    apportionMode.value === 'weight'
      ? 'weightCount'
      : apportionMode.value === 'volume'
        ? 'volumeCount'
        : 'fTotal'
  const totalBase = rows.reduce((s, r) => s + (Number(r[key]) || 1), 0) || 1
  rows.forEach(r => {
    const ratio = (Number(r[key]) || 1) / totalBase
    r.cost = Number((totalCost * ratio).toFixed(2))
  })
}

import { useEnterpriseStore } from '@/store/enterprise'

const entStore = useEnterpriseStore()

function submitStowage(departNow: boolean) {
  const rows = rightSelectedList.value
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const sumNum = rows.reduce((s, r) => s + (Number(r.numberCount) || 0), 0)
  const sumWeight = rows.reduce((s, r) => s + (Number(r.weightCount) || 0), 0)
  const sumVolume = rows.reduce((s, r) => s + (Number(r.volumeCount) || 0), 0)

  const record: Record<string, any> = {
    ...batchForm,
    id: batchForm.id || `TR-${Date.now()}`,
    tStatus: departNow ? 2 : 1,
    tStatusStr: departNow ? '已发车' : '待发车',
    transportType: props.bizType,
    transportTypeStr: props.bizTitle,
    sendType: props.bizTitle,
    openGroup: batchForm.startGroup,
    creationTime: now,
    count: rows.length,
    number: sumNum,
    weight: sumWeight,
    volume: Number(sumVolume.toFixed(2)),
    creator: '管理员',
    modifier: '管理员',
    auditStatusStr: '已审核',
    auditPerson: '管理员',
    auditTime: now,
    trackCount: 0,
    waybillIds: rows.map(r => r.id),
    tracks: []
  }

  // 0. 如果是修改已有批次，检查是否有被移除的运单，若有则恢复为已入库
  if (batchForm.id) {
    const existing = (props.bizType === 1 ? opStore.transList : opStore.stransList).find(
      b => b.id === batchForm.id || b.transportNo === batchForm.transportNo
    )
    if (existing && Array.isArray(existing.waybillIds)) {
      const newIds = new Set(rows.map(r => r.id))
      const removedIds = existing.waybillIds.filter((id: string) => !newIds.has(id))
      opStore.shipList.forEach(s => {
        if (removedIds.includes(s.id)) {
          s.oStatus = 100
          s.oStatusStr = '已入库'
        }
      })
    }
  }

  // 1. 同步所选运单状态（已装车 / 发车中）
  rows.forEach(r => {
    const shipIdx = opStore.shipList.findIndex(s => s.id === r.id)
    if (shipIdx !== -1) {
      opStore.shipList[shipIdx].oStatus = departNow ? 140 : 130
      opStore.shipList[shipIdx].oStatusStr = departNow ? '发车中' : '已装车'
      opStore.shipList[shipIdx].plateNo = batchForm.licenseNo
      opStore.shipList[shipIdx].driverName = batchForm.driverName
      opStore.shipList[shipIdx].driverPhone = batchForm.driverMobile
    }
  })

  // 2. 存入对应的配载台账
  if (props.bizType === 1) {
    const idx = opStore.transList.findIndex(r => r.id === batchForm.id)
    if (idx !== -1) opStore.transList[idx] = record
    else opStore.transList.unshift(record)
  } else if (props.bizType === 7) {
    opStore.sendOutList.unshift({
      id: `SO-${Date.now()}`,
      sendOutNo: batchForm.transportNo,
      sStatus: departNow ? 2 : 1,
      sStatusStr: departNow ? '已送出' : '待送出',
      groupName: batchForm.startGroup,
      creationTime: now,
      sendOutDate: batchForm.shipTime,
      licenseNo: batchForm.licenseNo,
      driverName: batchForm.driverName,
      driverMobile: batchForm.driverMobile,
      number: sumNum,
      weight: sumWeight,
      volume: Number(sumVolume.toFixed(2)),
      fTotalCost: batchForm.fTotal,
      remark: batchForm.remark,
      creator: '管理员',
      modifier: '管理员',
      waybillIds: rows.map(r => r.id)
    })
  } else {
    const idx = opStore.stransList.findIndex(r => r.id === batchForm.id)
    if (idx !== -1) opStore.stransList[idx] = record
    else opStore.stransList.unshift(record)
  }

  // 3. 联动财务中心：大车运费应付台账 (fcar) 与 应付账款 (arApList)
  if (batchForm.fTotal > 0) {
    entStore.carFeeList.unshift({
      id: `CF-${batchForm.transportNo}`,
      batchNo: batchForm.transportNo,
      transType: props.bizTitle as any,
      departDate: batchForm.shipTime,
      startNetwork: batchForm.startGroup,
      endNetwork: batchForm.destGroup,
      plateNo: batchForm.licenseNo,
      driverName: batchForm.driverName,
      driverPhone: batchForm.driverMobile,
      totalDriverFee: Number(batchForm.fTotal || 0),
      prepayFee: Number(batchForm.fPrepare || 0),
      arrivePayFee: Number(batchForm.fArrive || 0),
      oilCardFee: Number(batchForm.fOilCard || 0),
      returnPayFee: Number(batchForm.fBack || 0),
      loadFee: 0,
      settledAmount: 0,
      unsettledAmount: Number(batchForm.fTotal || 0),
      auditStatus: '已审核',
      settleStatus: '未结算',
      remark: batchForm.remark || `${props.bizTitle}大车运费自动生成应付台账`
    })

    entStore.arApList.unshift({
      id: `AP-${batchForm.transportNo}`,
      billNo: `AP-${batchForm.transportNo}`,
      shipOrderNo: batchForm.transportNo,
      direction: '应付',
      category: '大车司机车费',
      targetType: 'driver',
      targetName: batchForm.driverName,
      targetPhone: batchForm.driverMobile,
      network: batchForm.startGroup,
      destCity: batchForm.destGroup,
      feeType: '大车干线运费',
      payType: '电汇转账',
      totalAmount: Number(batchForm.fTotal || 0),
      settledAmount: 0,
      unsettledAmount: Number(batchForm.fTotal || 0),
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: now,
      goodsName: `${rows.length}票托运货物`,
      num: sumNum,
      weight: sumWeight,
      volume: Number(sumVolume.toFixed(2))
    })
  }

  // 4. 记录系统操作日志
  entStore.operLogs.unshift({
    id: `OL-${Date.now()}`,
    module: `营运中心-${props.bizTitle}`,
    actionType: departNow ? '确认发车' : '保存配载',
    operator: 'admin (管理员)',
    network: batchForm.startGroup,
    ip: '113.108.221.45',
    targetNo: batchForm.transportNo,
    detail: `${props.bizTitle}批次 ${batchForm.transportNo}（车牌：${batchForm.licenseNo}，司机：${batchForm.driverName}），配载 ${rows.length} 票运单，大车运费 ¥${batchForm.fTotal}`,
    costMs: '42ms',
    operTime: now
  })

  ElMessage.success(`${props.bizTitle}批次【${batchForm.transportNo}】已保存并同步至大车应付台账`)
  if (printManifestAfterSave.value) {
    printPreviewRef.value?.open('manifest', rows.map(r => ({
      shipOrderNo: r.orderNo,
      destCity: r.destCity,
      receiverName: r.receiver,
      receiverMobile: r.receivePhone,
      goodsName: r.goodsName,
      num: r.numberCount,
      weight: r.weightCount,
      volume: r.volumeCount,
      collectPay: r.fDeliver,
      agencyFund: r.fCollect,
      deliveryType: r.deliveryType
    })))
  } else {
    router.push(props.backRoute)
  }
}
</script>

<style scoped>
.shuttle-stowage-page {
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.stowage-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  min-height: 0;
}

.stowage-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
  background: #f5f7fa;
}

.stowage-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
}

.stowage-tabs :deep(.el-tab-pane) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
  position: relative;
}

.shuttle-top-box {
  border: 1px solid #dcdfe6;
  border-bottom: none;
  padding: 6px 10px;
  background: #ffffff;
}

.filter-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.listForm {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.listForm :deep(.el-form-item) {
  margin-bottom: 0;
  margin-right: 0;
}

.dateItem :deep(.el-form-item__content) {
  display: inline-flex;
  align-items: center;
}

.width-90 {
  width: 90px;
}

.width-220 {
  width: 220px !important;
}

.funnel-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #b5b5b5;
  cursor: pointer;
}

.shuttle-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid #f0f2f5;
}

.shuttle-left-acts,
.shuttle-right-acts {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.quick-label {
  font-size: 12px;
  color: #606266;
  font-weight: 600;
}

.btn-green {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}

/* 左右分栏穿梭表格 */
.shuttle-split-wrap {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}

.shuttle-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.pane-header {
  height: 28px;
  padding: 0 10px;
  background: #eef5fe;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #3888fa;
}

.pane-header.right-header {
  background: #f0f9eb;
  color: #24b678;
}

.pane-tip {
  font-weight: normal;
  color: #909399;
  font-size: 11px;
}

.shuttle-divider {
  width: 10px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  user-select: none;
}

.divider-handle {
  color: #909399;
  font-size: 10px;
}

/* 右下角悬浮配载车徽章 (1:1 live_addTranslist.png) */
.floating-cart-badge {
  position: absolute;
  right: 26px;
  bottom: 36px;
  z-index: 30;
  cursor: pointer;
}

.cart-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #3888fa;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(56, 136, 250, 0.45);
  transition: transform 0.2s;
}

.cart-circle:hover {
  transform: scale(1.08);
}

/* 页签2：表单填写 */
.form-pane-container {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-card {
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  padding: 10px 14px;
  background: #ffffff;
}

.section-title {
  font-size: 13px;
  font-weight: 700;
  color: #303133;
  margin-bottom: 10px;
  padding-left: 8px;
  border-left: 3px solid #3888fa;
}

.section-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.apportion-radios {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.batch-form-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px 14px;
}

.batch-form-grid :deep(.el-form-item) {
  margin-bottom: 4px;
}

.span-all {
  grid-column: span 4;
}

.form-footer-bar {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 8px 0;
}
</style>
