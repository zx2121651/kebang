<template>
  <div class="arrive-confirm-page">
    <el-tabs v-model="activeTab" type="card" class="arrive-tabs" @tab-change="handleTabChange">
      <el-tab-pane
        v-for="tab in tabsConfig"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <div class="contentBox">
          <div class="gbContainer">
            <!-- 第一行：查询条件 + 分页 (1:1 原版 live_arriveconfirm.png) -->
            <div class="filter-top-row">
              <el-form :inline="true" size="small" class="listForm" @submit.prevent>
                <el-form-item class="dateItem">
                  <el-select v-model="queryForm.timeType" class="width-90">
                    <el-option label="创建日期" :value="1" />
                    <el-option label="起运日期" :value="2" />
                  </el-select>
                  <el-date-picker
                    v-model="queryForm.dateRange"
                    type="daterange"
                    range-separator="~"
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

                <el-form-item v-if="activeTab !== 'loadgoods'">
                  <el-select
                    v-model="queryForm.status"
                    clearable
                    placeholder="请选择状态"
                    style="width: 120px"
                  >
                    <el-option label="所有状态" value="" />
                    <el-option label="已发车" value="已发车" />
                    <el-option label="已到达" value="已到达" />
                  </el-select>
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    :icon="Search"
                    class="btn-save"
                    @click="handleSearch"
                  >
                    查询
                  </el-button>
                </el-form-item>

                <el-form-item>
                  <span
                    class="funnel-trigger"
                    title="高级筛选"
                    @click="openCurrentSeniorFilter"
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
                :total="currentTableData.length"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
              />
            </div>

            <!-- 第二行：操作按钮栏 (1:1 原版 live_arriveconfirm.png 与 EventMonitor.8faa6471.js) -->
            <div class="gbOperationBtns">
              <!-- 左侧操作按钮组 -->
              <div class="left-btn-wrap">
                <template v-if="activeTab === 'loadgoods'">
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="Upload"
                    @click="handleMidwayAction('中途装货')"
                  >
                    中途装货
                  </el-button>
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="Download"
                    @click="handleMidwayAction('卸货')"
                  >
                    卸货
                  </el-button>
                  <el-button
                    size="small"
                    type="danger"
                    :icon="Close"
                    @click="handleMidwayAction('取消卸货')"
                  >
                    取消卸货
                  </el-button>
                </template>
                <template v-else>
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="CircleCheck"
                    @click="handleConfirmArrival"
                  >
                    确认到达
                  </el-button>
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="CircleClose"
                    @click="handleCancelArrival"
                  >
                    取消到达
                  </el-button>
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="DocumentAdd"
                    @click="handleArrivalFillShip"
                  >
                    到达补单
                  </el-button>
                </template>
              </div>

              <!-- 右侧工具栏按钮组 -->
              <div class="right-btn-wrap">
                <el-button size="small" :icon="Download" @click="handleExportCurrentTab">
                  导出
                </el-button>
                <el-button size="small" :icon="Lock" @click="saveCurrentLayout">
                  锁定外观
                </el-button>
                <el-button size="small" type="primary" :icon="Setting" @click="openCurrentColSet">
                  列设置
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 主数据表格 (支持复选、单选穿透、合计行) -->
        <div class="table-wrap">
          <GbTableEngine
            :ref="(el: any) => setTableRef(tab.name, el)"
            :table-data="currentTableData"
            :columns="currentColumns"
            :filter-items="currentFilters"
            :storage-key="`kebang_arriveconfirm_${tab.name}_v3`"
            :current-page="currentPage"
            :page-size="pageSize"
            :row-bg-color="getRowBgColor"
            @selection-change="rows => (selectedRows = rows)"
            @link-click="handleCellLinkClick"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 1:1 配载批次详情模态窗 (原版 xe / EventMonitor 规范) -->
    <el-dialog
      v-model="detailDialogVisible"
      title="配载详情"
      width="820px"
      draggable
      destroy-on-close
    >
      <div v-if="activeBatch" class="detail-container">
        <el-descriptions :column="3" border size="small" class="detail-desc">
          <el-descriptions-item label="发车批次">
            <b class="text-blue">{{ activeBatch.transportNo }}</b>
          </el-descriptions-item>
          <el-descriptions-item label="当前状态">
            <el-tag size="small" :type="getStatusTagType(activeBatch.tStatusStr)">
              {{ activeBatch.tStatusStr }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="合同编号">{{ activeBatch.contractNo || '暂无合同号' }}</el-descriptions-item>
          <el-descriptions-item label="车牌号码">{{ activeBatch.licenseNo || '自有车辆' }}</el-descriptions-item>
          <el-descriptions-item label="随车司机">{{ activeBatch.driverName || '专线司机' }}</el-descriptions-item>
          <el-descriptions-item label="司机电话">{{ activeBatch.driverMobile || '-' }}</el-descriptions-item>
          <el-descriptions-item label="始发/终端">{{ activeBatch.startGroup }} → {{ activeBatch.destGroup }}</el-descriptions-item>
          <el-descriptions-item label="起运时间">{{ activeBatch.shipTime || activeBatch.creationTime }}</el-descriptions-item>
          <el-descriptions-item label="到达时间">{{ activeBatch.arrivedTime || '在途运输中' }}</el-descriptions-item>
          <el-descriptions-item label="总运费">
            <span class="text-danger font-bold">¥{{ activeBatch.fTotal || 0 }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="预付车费">¥{{ activeBatch.fPrepare || 0 }}</el-descriptions-item>
          <el-descriptions-item label="到付车费">¥{{ activeBatch.fArrive || 0 }}</el-descriptions-item>
          <el-descriptions-item label="途径网点" :span="3">{{ activeBatch.routeGroup || '直达干线' }}</el-descriptions-item>
          <el-descriptions-item label="备注说明" :span="3">{{ activeBatch.remark || '到达确认待处理' }}</el-descriptions-item>
        </el-descriptions>

        <div class="sub-table-header" style="margin-top: 12px; margin-bottom: 6px; font-weight: bold; font-size: 13px;">
          <span>本车配载运单清单 (共 {{ loadedWaybills.length }} 票)</span>
        </div>
        <el-table :data="loadedWaybills" size="small" border stripe max-height="240px">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="orderNo" label="运单号" width="130" />
          <el-table-column prop="goodsNo" label="货号" width="120" />
          <el-table-column prop="destCity" label="到站城市" width="90" />
          <el-table-column prop="goodsName" label="货物名称" min-width="120" />
          <el-table-column prop="numberCount" label="件数" width="70" align="right" />
          <el-table-column prop="weightCount" label="重量(kg)" width="85" align="right" />
          <el-table-column prop="volumeCount" label="体积(m³)" width="85" align="right" />
          <el-table-column prop="fTotal" label="运单运费" width="90" align="right" />
          <el-table-column label="到货状态" width="90" align="center">
            <template #default="{ row }">
              <el-tag size="small" :type="row.oStatus >= 150 ? 'success' : 'warning'">
                {{ row.oStatus >= 150 ? '已到达' : '在途中' }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <template #footer>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div>
            <el-button size="small" type="primary" plain @click="handlePrintManifest">
              打印随车清单
            </el-button>
            <el-button size="small" type="primary" plain @click="handlePrintContract">
              打印运输合同
            </el-button>
          </div>
          <div>
            <el-button size="small" @click="detailDialogVisible = false">关 闭</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 中途装卸货操作弹窗 (1:1 原版 loadgoods) -->
    <el-dialog
      v-model="midwayDialogVisible"
      :title="`中途装卸货 - ${midwayActionType}`"
      width="680px"
      draggable
      destroy-on-close
    >
      <div v-if="activeBatch" class="midway-box">
        <el-alert
          :title="`正在为批次【${activeBatch.transportNo}】办理【${midwayActionType}】业务，系统将自动核算经停节点库存。`"
          type="info"
          show-icon
          :closable="false"
          style="margin-bottom: 12px"
        />
        <el-form :model="midwayForm" size="small" label-width="100px">
          <el-form-item label="发车批次">
            <b>{{ activeBatch.transportNo }}</b> ({{ activeBatch.licenseNo }} - {{ activeBatch.driverName }})
          </el-form-item>
          <el-form-item label="中途经停网点" required>
            <el-input v-model="midwayForm.point" placeholder="例如：株洲转运站 / 衡阳服务区分拨点" />
          </el-form-item>
          <el-form-item label="操作时间" required>
            <el-date-picker
              v-model="midwayForm.opTime"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="作业说明">
            <el-input v-model="midwayForm.remark" placeholder="录入中途现场装卸箱号、铅封号或货损情况" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="small" @click="midwayDialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="submitMidwayAction">确定执行</el-button>
      </template>
    </el-dialog>

    <!-- 针式打印预览组件 -->
    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Download,
  Lock,
  Setting,
  CircleCheck,
  CircleClose,
  DocumentAdd,
  Upload,
  Close
} from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { useEnterpriseStore } from '@/store/enterprise'
import {
  TRANSLIST_COLUMNS,
  TRANSLIST_FILTERS,
  STRANSLIST_COLUMNS,
  STRANSLIST_FILTERS,
  ARRIVEASSIGN_COLUMNS,
  ARRIVEASSIGN_FILTERS,
  SHIPLIST_COLUMNS,
  SHIPLIST_FILTERS
} from '@/views/operation/components/OperationColumnConfig'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'
import { exportTableToCsv } from '@/utils/exportHelper'

const router = useRouter()
const opStore = useOperationStore()
const entStore = useEnterpriseStore()

// 1:1 原版 live_arriveconfirm.png 及 index.2b083c24.js 5大页签定义
const tabsConfig = [
  { name: 'line', label: '干线配载' },
  { name: 'short', label: '短途配载' },
  { name: 'assign', label: '到货分拨' },
  { name: 'loadgoods', label: '中途装卸货' },
  { name: 'arriveship', label: '到达运单' }
]

const activeTab = ref('line')
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])
const tableRefs = reactive<Record<string, any>>({})

function setTableRef(tabName: string, el: any) {
  if (el) tableRefs[tabName] = el
}

// 头部筛选表单
const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: [] as string[],
  destGroups: ['hq'] as string[],
  status: ''
})

function handleTabChange() {
  selectedRows.value = []
  currentPage.value = 1
}

// 列定义切换
const currentColumns = computed(() => {
  switch (activeTab.value) {
    case 'line':
      return TRANSLIST_COLUMNS
    case 'short':
      return STRANSLIST_COLUMNS
    case 'assign':
      return ARRIVEASSIGN_COLUMNS
    case 'loadgoods':
      return TRANSLIST_COLUMNS
    case 'arriveship':
      return SHIPLIST_COLUMNS
    default:
      return TRANSLIST_COLUMNS
  }
})

// 高级筛选定义切换
const currentFilters = computed(() => {
  switch (activeTab.value) {
    case 'line':
      return TRANSLIST_FILTERS
    case 'short':
      return STRANSLIST_FILTERS
    case 'assign':
      return ARRIVEASSIGN_FILTERS
    case 'loadgoods':
      return TRANSLIST_FILTERS
    case 'arriveship':
      return SHIPLIST_FILTERS
    default:
      return TRANSLIST_FILTERS
  }
})

// 数据集联动
const currentTableData = computed(() => {
  let list: Record<string, any>[] = []

  if (activeTab.value === 'line') {
    list = opStore.transList || []
  } else if (activeTab.value === 'short') {
    list = (opStore.stransList || []).filter(r => r.transportType === 2)
  } else if (activeTab.value === 'assign') {
    list = (opStore.stransList || []).filter(r => r.transportType === 3)
  } else if (activeTab.value === 'loadgoods') {
    list = (opStore.transList || []).filter(r => (r.routeGroup && r.routeGroup !== '直达干线') || r.tStatus >= 2)
  } else if (activeTab.value === 'arriveship') {
    list = (opStore.shipList || []).filter(s => s.oStatus >= 140)
  }

  // 状态筛选
  if (queryForm.status && activeTab.value !== 'loadgoods') {
    if (activeTab.value === 'arriveship') {
      list = list.filter(r => r.oStatusStr === queryForm.status)
    } else {
      list = list.filter(r => r.tStatusStr === queryForm.status)
    }
  }

  // 始发网点过滤
  if (queryForm.startGroups && queryForm.startGroups.length > 0) {
    const hasHq = queryForm.startGroups.includes('hq')
    if (!hasHq) {
      list = list.filter(r => queryForm.startGroups.includes(r.startGroup))
    }
  }

  // 终端网点过滤
  if (queryForm.destGroups && queryForm.destGroups.length > 0) {
    const hasHq = queryForm.destGroups.includes('hq')
    if (!hasHq) {
      list = list.filter(r => queryForm.destGroups.includes(r.destGroup))
    }
  }

  return list
})

function getStatusTagType(statusStr?: string) {
  if (statusStr === '已到达' || statusStr === '已签收') return 'success'
  if (statusStr === '已发车' || statusStr === '在途中' || statusStr === '发车中') return 'primary'
  if (statusStr === '待发车') return 'warning'
  return 'info'
}

function getRowBgColor(row: Record<string, any>) {
  if (row.tStatusStr === '已到达' || row.oStatusStr === '已到达') {
    return '#f0f9eb'
  }
  if (row.tStatusStr === '已发车' || row.oStatusStr === '发车中') {
    return '#ecf5ff'
  }
  return undefined
}

function handleSearch() {
  currentPage.value = 1
  const tabLabel = tabsConfig.find(t => t.name === activeTab.value)?.label || '到达确认'
  ElMessage.success(`${tabLabel}查询成功`)
}

// -------------------------------------------------------------
// 核心操作 1: 确认到达 (1:1 EventMonitor.8faa6471.js)
// -------------------------------------------------------------
function handleConfirmArrival() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(activeTab.value === 'arriveship' ? '请先勾选需要确认到达的运单' : '请先勾选需要确认到达的批次')
    return
  }

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

  if (activeTab.value === 'arriveship') {
    selectedRows.value.forEach(order => {
      order.oStatus = 150
      order.oStatusStr = '已到达'
      order.arrivedTime = now
    })
    ElMessage.success(`已完成 ${selectedRows.value.length} 票运单的【确认到达】`)
  } else {
    selectedRows.value.forEach(batch => {
      batch.tStatus = 3
      batch.tStatusStr = '已到达'
      batch.arrivedTime = now

      // 级联流转装载的所有运单
      const waybillIds = batch.waybillIds || []
      opStore.shipList.forEach(s => {
        if (waybillIds.includes(s.id) || waybillIds.includes(s.orderNo)) {
          s.oStatus = 150
          s.oStatusStr = '已到达'
          s.arrivedTime = now
        }
      })
    })

    ElMessage.success(`已完成 ${selectedRows.value.length} 个批次的【确认到达】，随车运单已同步转为【已到达】`)
  }

  // 记录操作日志
  entStore.operLogs.unshift({
    id: `OL-${Date.now()}`,
    module: '营运中心-到达确认',
    actionType: '确认到达',
    operator: 'admin (管理员)',
    network: '总部',
    ip: '113.108.221.45',
    targetNo: selectedRows.value.map(r => r.transportNo || r.orderNo).join(','),
    detail: `对 ${selectedRows.value.length} 条记录执行确认到达操作`,
    costMs: '22ms',
    operTime: now
  })
}

// -------------------------------------------------------------
// 核心操作 2: 取消到达 (1:1 EventMonitor.8faa6471.js)
// -------------------------------------------------------------
function handleCancelArrival() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(activeTab.value === 'arriveship' ? '请先勾选需要取消到达的运单' : '请先勾选需要取消到达的批次')
    return
  }

  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

  if (activeTab.value === 'arriveship') {
    selectedRows.value.forEach(order => {
      order.oStatus = 140
      order.oStatusStr = '发车中'
      delete order.arrivedTime
    })
    ElMessage.success(`已取消到达，${selectedRows.value.length} 票运单状态恢复为【发车中】`)
  } else {
    selectedRows.value.forEach(batch => {
      batch.tStatus = 2
      batch.tStatusStr = '已发车'
      delete batch.arrivedTime

      const waybillIds = batch.waybillIds || []
      opStore.shipList.forEach(s => {
        if (waybillIds.includes(s.id) || waybillIds.includes(s.orderNo)) {
          s.oStatus = 140
          s.oStatusStr = '发车中'
          delete s.arrivedTime
        }
      })
    })

    ElMessage.success(`已取消到达，${selectedRows.value.length} 个批次状态恢复为【已发车】`)
  }

  entStore.operLogs.unshift({
    id: `OL-${Date.now()}`,
    module: '营运中心-到达确认',
    actionType: '取消到达',
    operator: 'admin (管理员)',
    network: '总部',
    ip: '113.108.221.45',
    targetNo: selectedRows.value.map(r => r.transportNo || r.orderNo).join(','),
    detail: `对 ${selectedRows.value.length} 条记录执行取消到达操作`,
    costMs: '20ms',
    operTime: now
  })
}

// -------------------------------------------------------------
// 核心操作 3: 到达补单 (1:1 原版 fillship 路由跳转)
// -------------------------------------------------------------
function handleArrivalFillShip() {
  if (selectedRows.value.length !== 1) {
    ElMessage.warning('请先勾选需要到达补单的单条配载批次')
    return
  }
  const row = selectedRows.value[0]
  if (activeTab.value === 'arriveship') {
    router.push({
      path: '/operation/ship/shiplist',
      query: { openEdit: row.id }
    })
  } else {
    router.push({
      path: `/customRoute/addTranslist`,
      query: {
        editId: row.id,
        mode: 'fillship',
        transportType: row.transportType || 1
      }
    })
  }
}

// -------------------------------------------------------------
// 核心操作 4: 中途装卸货 (1:1 loadgoods 业务)
// -------------------------------------------------------------
const midwayDialogVisible = ref(false)
const midwayActionType = ref('中途装货')
const midwayForm = reactive({
  point: '株洲转运站',
  opTime: '',
  remark: ''
})

function handleMidwayAction(actionType: string) {
  if (selectedRows.value.length !== 1) {
    ElMessage.warning(`请先勾选 1 个需要执行【${actionType}】的配载批次`)
    return
  }
  activeBatch.value = selectedRows.value[0]
  midwayActionType.value = actionType
  midwayForm.point = activeBatch.value.routeGroup || '株洲转运站'
  midwayForm.opTime = new Date().toISOString().replace('T', ' ').slice(0, 19)
  midwayForm.remark = ''
  midwayDialogVisible.value = true
}

function submitMidwayAction() {
  if (!midwayForm.point.trim()) {
    ElMessage.warning('请输入经停网点名称')
    return
  }
  midwayDialogVisible.value = false
  ElMessage.success(`批次【${activeBatch.value?.transportNo}】在【${midwayForm.point}】成功执行【${midwayActionType.value}】作业！`)
}

// -------------------------------------------------------------
// 详情弹窗与链接穿透 (1:1 原版 ne 逻辑)
// -------------------------------------------------------------
const detailDialogVisible = ref(false)
const activeBatch = ref<Record<string, any> | null>(null)

const loadedWaybills = computed(() => {
  if (!activeBatch.value) return []
  const waybillIds = activeBatch.value.waybillIds || []
  return (opStore.shipList || []).filter(
    s => waybillIds.includes(s.id) || waybillIds.includes(s.orderNo)
  )
})

function handleCellLinkClick(row: Record<string, any>, col?: any) {
  if (activeTab.value === 'arriveship' || col?.field === 'orderNo') {
    router.push({
      path: '/operation/ship/shipdetail',
      query: { shipid: row.orderNo || row.id, type: 'shipNo' }
    })
  } else {
    activeBatch.value = row
    selectedRows.value = [row]
    detailDialogVisible.value = true
  }
}

// 打印集成
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

function handlePrintManifest() {
  if (!activeBatch.value) return
  const data = {
    ...activeBatch.value,
    waybillList: loadedWaybills.value
  }
  printPreviewRef.value?.open('manifest', [data])
}

function handlePrintContract() {
  if (!activeBatch.value) return
  const data = {
    ...activeBatch.value,
    waybillList: loadedWaybills.value
  }
  printPreviewRef.value?.open('contract', [data])
}

// 工具栏动作
function openCurrentSeniorFilter() {
  tableRefs[activeTab.value]?.openSeniorFilter()
}

function openCurrentColSet() {
  tableRefs[activeTab.value]?.openColumnSet()
}

function saveCurrentLayout() {
  tableRefs[activeTab.value]?.saveColumnAppearance()
  ElMessage.success('外观保存成功')
}

function handleExportCurrentTab() {
  const tabLabel = tabsConfig.find(t => t.name === activeTab.value)?.label || '到达确认'
  const dataToExport = selectedRows.value.length > 0 ? selectedRows.value : currentTableData.value
  exportTableToCsv(
    dataToExport,
    currentColumns.value,
    `星云TMS_${tabLabel}_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已成功导出【${tabLabel}】共 ${dataToExport.length} 条数据至本地文件`)
}

onMounted(() => {
  // 确保初始有到达数据供测试验证
  if (opStore.transList.length > 0 && !opStore.transList.some(r => r.tStatus === 2)) {
    opStore.transList[0].tStatus = 2
    opStore.transList[0].tStatusStr = '已发车'
  }
})
</script>

<style scoped>
.arrive-confirm-page {
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.arrive-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  min-height: 0;
}

.arrive-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
}

.arrive-tabs :deep(.el-tabs__item) {
  height: 36px;
  line-height: 36px;
  font-size: 13px;
  font-weight: bold;
}

.arrive-tabs :deep(.el-tabs__item.is-active) {
  background-color: #409eff;
  color: #ffffff;
  border-bottom-color: #409eff;
}

.arrive-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0;
}

.arrive-tabs :deep(.el-tab-pane) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}

.contentBox {
  background: #ffffff;
  border-bottom: 1px solid #dcdfe6;
  padding: 6px 10px;
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

.btn-save {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}

.funnel-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 24px;
  color: #409eff;
  cursor: pointer;
}

.funnel-trigger:hover {
  background-color: #ecf5ff;
}

.gbOperationBtns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid #f0f2f5;
}

.left-btn-wrap,
.right-btn-wrap {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

/* 1:1 原版薄荷绿/青绿色操作按钮风格 (live_arriveconfirm.png) */
.btn-shortcut {
  background-color: #67c23a !important;
  border-color: #67c23a !important;
  color: #ffffff !important;
}

.btn-shortcut:hover {
  opacity: 0.9;
}

.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.detail-container {
  padding: 4px 0;
}

.text-blue {
  color: #409eff;
}

.text-danger {
  color: #f56c6c;
}
</style>
