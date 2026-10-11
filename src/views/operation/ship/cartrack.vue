<template>
  <div class="listBox">
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 分页 (1:1 原版 live_cartrack.png) -->
        <div class="filter-top-row">
          <el-form :inline="true" size="small" class="listForm" @submit.prevent>
            <el-form-item class="dateItem">
              <el-select v-model="queryForm.timeType" class="width-90">
                <el-option label="开单日期" :value="1" />
                <el-option label="起运时间" :value="2" />
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
              <el-select
                v-model="queryForm.status"
                clearable
                placeholder="请选择车辆状态"
                style="width: 150px"
              >
                <el-option label="全部状态" value="" />
                <el-option label="待发车" value="待发车" />
                <el-option label="已发车" value="已发车" />
                <el-option label="送货中" value="送货中" />
                <el-option label="已到达" value="已到达" />
                <el-option label="已签收" value="已签收" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.startGroups"
                placeholder="请选择始发网点"
                :width="170"
              />
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.destGroups"
                placeholder="请选择终端网点"
                :width="170"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :icon="Search" class="btn-save" @click="handleSearch">
                查询
              </el-button>
            </el-form-item>

            <el-form-item>
              <span class="funnel-trigger" title="高级筛选" @click="tableEngineRef?.openSeniorFilter()">
                <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                  <path
                    d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                  />
                </svg>
              </span>
            </el-form-item>
          </el-form>

          <GbPager
            :total="filteredTableData.length"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
          />
        </div>

        <!-- 第二行：操作按钮栏 (1:1 live_cartrack.png) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <el-button size="small" class="btn-green" :icon="Plus" @click="openTrackDialog">
              跟踪
            </el-button>
          </div>

          <div class="right-btn-wrap">
            <el-button size="small" :icon="Download" @click="handleExport">
              导出
            </el-button>
            <el-button size="small" :icon="Lock" @click="tableEngineRef?.saveColumnAppearance()">
              锁定外观
            </el-button>
            <el-button size="small" :icon="Setting" @click="tableEngineRef?.openColumnSet()">
              列设置
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 车辆跟踪主表格 (单选高亮模式 isMultiple=false, 46列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="filteredTableData"
        :columns="CARTRACK_COLUMNS"
        :filter-items="CARTRACK_FILTERS"
        :is-multiple="false"
        storage-key="kebang_cartrack_cols_v3"
        :current-page="currentPage"
        :page-size="pageSize"
        :row-bg-color="getRowBgColor"
        @selection-change="rows => (selectedRows = rows)"
        @row-click="handleRowSelect"
        @row-dblclick="openTrackForRow"
        @link-click="handleCellLinkClick"
      />
    </div>

    <!-- 跟踪信息弹窗 (1:1 还原原版 addTrakcar 交互) -->
    <el-dialog
      v-model="trackDialogVisible"
      title="跟踪信息"
      width="820px"
      draggable
      destroy-on-close
    >
      <div v-if="activeRow" class="track-dialog-container">
        <!-- 头部摘要信息 (1:1 原版 baseInfoRow) -->
        <div class="baseInfoRow">
          <div class="info-pill">
            <span class="label">配载批次：</span>
            <span class="val font-bold text-blue">{{ activeRow.transportNo }}</span>
          </div>
          <div class="info-pill">
            <span class="label">始发地：</span>
            <span class="val">{{ activeRow.startGroup }}</span>
          </div>
          <div class="info-pill">
            <span class="label">目的地：</span>
            <span class="val">{{ activeRow.destGroup }}</span>
          </div>
          <div class="info-pill">
            <span class="label">车牌号：</span>
            <span class="val">{{ activeRow.licenseNo }}</span>
          </div>
          <div class="info-pill">
            <span class="label">司机：</span>
            <span class="val">{{ activeRow.driverName }} ({{ activeRow.driverMobile }})</span>
          </div>
          <div class="info-pill">
            <span class="label">车辆状态：</span>
            <el-tag size="small" :type="getStatusTagType(activeRow.tStatusStr)">
              {{ activeRow.tStatusStr }}
            </el-tag>
          </div>
        </div>

        <!-- 历史跟踪列表表格 -->
        <div class="sub-table-header">
          <span>历史在途跟踪记录 (共 {{ (activeRow.tracks || []).length }} 次上报)</span>
          <span class="tip">提示：点击列表行可直接载入下方表单进行修改或删除</span>
        </div>
        <el-table
          :data="activeRow.tracks || []"
          size="small"
          border
          stripe
          height="230"
          highlight-current-row
          @row-click="handleTrackRowClick"
        >
          <el-table-column type="index" label="序号" width="55" align="center" />
          <el-table-column prop="trackingTime" label="跟踪时间" width="160" />
          <el-table-column prop="province" label="省份" width="90" />
          <el-table-column prop="city" label="到达城市" width="100" />
          <el-table-column prop="location" label="所在位置/途径节点" min-width="160" show-overflow-tooltip />
          <el-table-column prop="content" label="跟踪说明/在途情况" min-width="180" show-overflow-tooltip />
          <el-table-column prop="isSms" label="短信通知" width="85" align="center">
            <template #default="{ row }">
              <el-tag :type="row.isSms ? 'success' : 'info'" size="small">
                {{ row.isSms ? '已发送' : '未发送' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="trackCreator" label="跟踪人" width="85" align="center" />
        </el-table>

        <!-- 底部跟踪信息录入/修改表单 -->
        <div class="track-form-box">
          <div class="form-title">
            <span>{{ selectedTrackIndex >= 0 ? '📝 修改当前选中跟踪记录' : '➕ 录入最新在途跟踪信息' }}</span>
            <el-button
              v-if="selectedTrackIndex >= 0"
              size="small"
              link
              type="primary"
              @click="resetTrackFormToNew"
            >
              切换为新增模式
            </el-button>
          </div>
          <el-form :model="trackForm" size="small" label-width="85px" class="track-form">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="跟踪时间" required>
                  <el-date-picker
                    v-model="trackForm.trackingTime"
                    type="datetime"
                    placeholder="选择跟踪上报时间"
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到达省份" required>
                  <el-select
                    v-model="trackForm.province"
                    placeholder="选择省份"
                    style="width: 100%"
                    @change="handleProvinceChange"
                  >
                    <el-option v-for="prov in PROVINCE_OPTIONS" :key="prov" :label="prov" :value="prov" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="到达城市" required>
                  <el-select
                    v-model="trackForm.city"
                    placeholder="选择城市"
                    style="width: 100%"
                  >
                    <el-option v-for="c in cityOptions" :key="c" :label="c" :value="c" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="所在位置" required>
                  <el-input
                    v-model="trackForm.location"
                    placeholder="例如：G4京港澳高速1205KM处 / 衡阳服务区"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="跟踪情况" required>
                  <el-input
                    v-model="trackForm.content"
                    placeholder="例如：车辆行驶平稳，预计明日上午8点抵达武汉分部"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="通知服务">
                  <el-checkbox v-model="trackForm.isSms">发送在途节点短信通知收发货人</el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="text-align: right">
                <span style="font-size: 12px; color: #909399; line-height: 28px;">
                  操作人：系统管理员
                </span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer-row">
          <div class="left-actions">
            <el-button
              type="success"
              size="small"
              :icon="Plus"
              @click="submitAddTrackRecord"
            >
              新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              :disabled="selectedTrackIndex < 0"
              @click="submitUpdateTrackRecord"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              :disabled="selectedTrackIndex < 0"
              @click="deleteSelectedTrackRecord"
            >
              删除
            </el-button>
          </div>
          <div>
            <el-button size="small" @click="trackDialogVisible = false">取消</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 配载详情弹窗 (点击发车批次链接直接穿透查看配载运单与成本) -->
    <el-dialog
      v-model="detailVisible"
      title="配载详情"
      width="820px"
      draggable
      destroy-on-close
    >
      <div v-if="activeRow" class="detail-container">
        <el-descriptions :column="3" border size="small" class="detail-desc">
          <el-descriptions-item label="发车批次">
            <b class="text-blue">{{ activeRow.transportNo }}</b>
          </el-descriptions-item>
          <el-descriptions-item label="车辆状态">
            <el-tag size="small" :type="getStatusTagType(activeRow.tStatusStr)">
              {{ activeRow.tStatusStr }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="合同编号">{{ activeRow.contractNo || '暂无合同号' }}</el-descriptions-item>
          <el-descriptions-item label="配载类型">{{ activeRow.transportTypeStr || '干线配载' }}</el-descriptions-item>
          <el-descriptions-item label="运输类型">{{ activeRow.sendType || '整车专线' }}</el-descriptions-item>
          <el-descriptions-item label="承运公司">{{ activeRow.supplierName || '自有运输车队' }}</el-descriptions-item>
          <el-descriptions-item label="车牌号码">{{ activeRow.licenseNo }}</el-descriptions-item>
          <el-descriptions-item label="司机姓名">{{ activeRow.driverName }}</el-descriptions-item>
          <el-descriptions-item label="司机电话">{{ activeRow.driverMobile }}</el-descriptions-item>
          <el-descriptions-item label="始发/终端">{{ activeRow.startGroup }} → {{ activeRow.destGroup }}</el-descriptions-item>
          <el-descriptions-item label="起运时间">{{ activeRow.shipTime || activeRow.creationTime }}</el-descriptions-item>
          <el-descriptions-item label="要求到达">{{ activeRow.askArriveTime || '按计划准时到达' }}</el-descriptions-item>
          <el-descriptions-item label="总运费">
            <span class="text-danger font-bold">¥{{ activeRow.fTotal || 0 }}</span>
          </el-descriptions-item>
          <el-descriptions-item label="预付车费">¥{{ activeRow.fPrepare || 0 }}</el-descriptions-item>
          <el-descriptions-item label="到付车费">¥{{ activeRow.fArrive || 0 }}</el-descriptions-item>
          <el-descriptions-item label="回付车费">¥{{ activeRow.fBack || 0 }}</el-descriptions-item>
          <el-descriptions-item label="油卡付">¥{{ activeRow.fOilCard || 0 }}</el-descriptions-item>
          <el-descriptions-item label="途径网点">{{ activeRow.routeGroup || '直达专线' }}</el-descriptions-item>
          <el-descriptions-item label="备注说明" :span="3">{{ activeRow.remark || '正常在途运输调度' }}</el-descriptions-item>
        </el-descriptions>

        <div class="sub-table-header" style="margin-top: 10px">
          <span>本车配载运单明细 (共 {{ loadedWaybills.length }} 票)</span>
        </div>
        <el-table :data="loadedWaybills" size="small" border stripe max-height="240px">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="orderNo" label="运单号" width="130" />
          <el-table-column prop="goodsNo" label="货号" width="120" />
          <el-table-column prop="destCity" label="目的地" width="90" />
          <el-table-column prop="goodsName" label="货物名称" min-width="120" />
          <el-table-column prop="numberCount" label="件数" width="70" align="right" />
          <el-table-column prop="weightCount" label="重量(kg)" width="85" align="right" />
          <el-table-column prop="volumeCount" label="体积(m³)" width="85" align="right" />
          <el-table-column prop="fTotal" label="运单运费" width="90" align="right" />
          <el-table-column prop="cost" label="分摊成本" width="90" align="right">
            <template #default="{ row }">
              ¥{{ row.cost || Math.round((activeRow.fTotal || 500) / (loadedWaybills.length || 1)) }}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <template #footer>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <div>
            <el-button size="small" type="primary" plain @click="handlePrintManifest">
              打印大车清单
            </el-button>
            <el-button size="small" type="primary" plain @click="handlePrintContract">
              打印运输合同
            </el-button>
          </div>
          <div>
            <el-button size="small" @click="detailVisible = false">关闭</el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 打印预览弹窗 -->
    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Plus, Download, Lock, Setting, Edit, Delete } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { CARTRACK_COLUMNS, CARTRACK_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import { exportTableToCsv } from '@/utils/exportHelper'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'

const opStore = useOperationStore()
const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])

// 省份与城市对照列表
const PROVINCE_OPTIONS = [
  '广东省', '湖北省', '湖南省', '四川省', '上海市', '北京市',
  '江苏省', '浙江省', '江西省', '河南省', '陕西省', '重庆市',
  '贵州省', '广西壮族自治区'
]

const PROVINCE_CITY_MAP: Record<string, string[]> = {
  广东省: ['广州市', '深圳市', '佛山市', '东莞市', '中山市', '珠海市', '惠州市'],
  湖北省: ['武汉市', '襄阳市', '宜昌市', '荆州市', '黄冈市', '孝感市'],
  湖南省: ['长沙市', '株洲市', '湘潭市', '衡阳市', '岳阳市', '常德市'],
  四川省: ['成都市', '绵阳市', '德阳市', '南充市', '宜宾市', '泸州市'],
  上海市: ['黄浦区', '徐汇区', '浦东新区', '闵行区', '青浦区', '嘉定区'],
  北京市: ['朝阳区', '海淀区', '丰台区', '大兴区', '顺义区', '通州区'],
  江苏省: ['南京市', '苏州市', '无锡市', '常州市', '南通市', '徐州市'],
  浙江省: ['杭州市', '宁波市', '温州市', '嘉兴市', '金华市', '台州市'],
  江西省: ['南昌市', '九江市', '赣州市', '吉安市', '上饶市', '宜春市'],
  河南省: ['郑州市', '洛阳市', '南阳市', '许昌市', '新乡市', '商丘市'],
  陕西省: ['西安市', '咸阳市', '宝鸡市', '渭南市', '汉中市', '延安市'],
  重庆市: ['渝中区', '江北区', '渝北区', '九龙坡区', '沙坪坝区', '南岸区'],
  贵州省: ['贵阳市', '遵义市', '安顺市', '毕节市', '铜仁市', '六盘水市'],
  广西壮族自治区: ['南宁市', '桂林市', '柳州市', '北海市', '玉林市']
}

// 头部筛选表单
const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  status: '',
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

// 综合所有在途运力批次 (干线配载 + 短途配载)
const allTrackableBatches = computed<Record<string, any>[]>(() => {
  const trunks = (opStore.transList || []).map(r => ({
    ...r,
    transportTypeStr: r.transportTypeStr || '干线配载'
  }))
  const shorts = (opStore.stransList || []).map(r => ({
    ...r,
    transportTypeStr: r.transportTypeStr || (r.transportType === 2 ? '短途配载' : r.transportType === 3 ? '到货分拨' : '送货上门')
  }))
  return [...trunks, ...shorts]
})

// 过滤后的表格数据
const filteredTableData = computed(() => {
  let list = allTrackableBatches.value

  if (queryForm.status) {
    list = list.filter(r => r.tStatusStr === queryForm.status)
  }

  if (queryForm.startGroups && queryForm.startGroups.length > 0) {
    const hasHq = queryForm.startGroups.includes('hq')
    if (!hasHq) {
      list = list.filter(r => queryForm.startGroups.includes(r.startGroup))
    }
  }

  if (queryForm.destGroups && queryForm.destGroups.length > 0) {
    list = list.filter(r => queryForm.destGroups.includes(r.destGroup))
  }

  return list
})

function getStatusTagType(statusStr?: string) {
  if (statusStr === '已发车' || statusStr === '送货中') return 'primary'
  if (statusStr === '已到达' || statusStr === '已签收') return 'success'
  if (statusStr === '待发车') return 'warning'
  return 'info'
}

function getRowBgColor(row: Record<string, any>) {
  if (row.tStatusStr === '已发车' || row.tStatusStr === '送货中') {
    return '#ecf5ff'
  }
  if (row.tStatusStr === '已到达' || row.tStatusStr === '已签收') {
    return '#f0f9eb'
  }
  return undefined
}

function handleSearch() {
  currentPage.value = 1
  ElMessage.success('车辆跟踪列表已刷新')
}

function handleExport() {
  const dataToExport = selectedRows.value.length > 0 ? selectedRows.value : filteredTableData.value
  exportTableToCsv(dataToExport, CARTRACK_COLUMNS, '星云TMS车辆在途跟踪台账')
}

// 选中行处理
function handleRowSelect(row: Record<string, any>) {
  selectedRows.value = [row]
}

// 跟踪信息弹窗状态
const trackDialogVisible = ref(false)
const activeRow = ref<Record<string, any> | null>(null)
const selectedTrackIndex = ref(-1)

const trackForm = reactive({
  trackingTime: '',
  province: '湖北省',
  city: '武汉市',
  location: '',
  content: '',
  isSms: false
})

const cityOptions = computed(() => {
  return PROVINCE_CITY_MAP[trackForm.province] || ['市区']
})

function handleProvinceChange(prov: string) {
  const cities = PROVINCE_CITY_MAP[prov] || []
  trackForm.city = cities[0] || '市区'
}

function resetTrackFormToNew() {
  selectedTrackIndex.value = -1
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  trackForm.trackingTime = now
  trackForm.province = '湖北省'
  trackForm.city = '武汉市'
  trackForm.location = ''
  trackForm.content = ''
  trackForm.isSms = false
}

function openTrackDialog() {
  const row = selectedRows.value[0] || filteredTableData.value[0]
  if (!row) {
    ElMessage.warning('请选择需要跟踪的车辆批次')
    return
  }
  openTrackForRow(row)
}

function openTrackForRow(row: Record<string, any>) {
  activeRow.value = row
  handleRowSelect(row)
  resetTrackFormToNew()
  trackDialogVisible.value = true
}

function handleTrackRowClick(trackRow: Record<string, any>) {
  if (!activeRow.value?.tracks) return
  const idx = activeRow.value.tracks.findIndex((t: any) => t.id === trackRow.id)
  selectedTrackIndex.value = idx >= 0 ? idx : -1
  if (idx >= 0) {
    trackForm.trackingTime = trackRow.trackingTime || ''
    trackForm.province = trackRow.province || '湖北省'
    trackForm.city = trackRow.city || '武汉市'
    trackForm.location = trackRow.location || ''
    trackForm.content = trackRow.content || ''
    trackForm.isSms = Boolean(trackRow.isSms)
  }
}

function submitAddTrackRecord() {
  if (!activeRow.value) return
  if (!trackForm.location.trim()) {
    ElMessage.warning('请输入所在位置信息')
    return
  }
  if (!trackForm.content.trim()) {
    ElMessage.warning('请输入跟踪情况说明')
    return
  }

  const now = trackForm.trackingTime || new Date().toISOString().replace('T', ' ').slice(0, 19)
  if (!activeRow.value.tracks) {
    activeRow.value.tracks = []
  }

  const newTrack = {
    id: `TK-${Date.now()}`,
    trackingTime: now,
    trackCreator: '管理员',
    trackType: '在途上报',
    province: trackForm.province,
    city: trackForm.city,
    location: trackForm.location,
    content: trackForm.content,
    isSms: trackForm.isSms
  }

  activeRow.value.tracks.unshift(newTrack)
  activeRow.value.trackCount = activeRow.value.tracks.length
  activeRow.value.trackCreator = '管理员'
  activeRow.value.trackingTime = now
  activeRow.value.location = trackForm.location

  // 同步更新 Pinia Store 中的车辆数据
  syncActiveRowToStore()

  resetTrackFormToNew()
  ElMessage.success('车辆跟踪记录新增成功')
}

function submitUpdateTrackRecord() {
  if (!activeRow.value || selectedTrackIndex.value < 0) {
    ElMessage.warning('请先在上方表格中选择要修改的跟踪记录')
    return
  }
  if (!trackForm.location.trim() || !trackForm.content.trim()) {
    ElMessage.warning('位置与跟踪情况不能为空')
    return
  }

  const track = activeRow.value.tracks[selectedTrackIndex.value]
  if (track) {
    track.trackingTime = trackForm.trackingTime
    track.province = trackForm.province
    track.city = trackForm.city
    track.location = trackForm.location
    track.content = trackForm.content
    track.isSms = trackForm.isSms

    activeRow.value.trackingTime = trackForm.trackingTime
    activeRow.value.location = trackForm.location

    syncActiveRowToStore()
    ElMessage.success('车辆跟踪记录修改成功')
  }
}

function deleteSelectedTrackRecord() {
  if (!activeRow.value || selectedTrackIndex.value < 0) {
    ElMessage.warning('请先在上方表格中选择要删除的跟踪记录')
    return
  }

  ElMessageBox.confirm('确定要删除选中的在途跟踪记录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    if (!activeRow.value) return
    activeRow.value.tracks.splice(selectedTrackIndex.value, 1)
    activeRow.value.trackCount = activeRow.value.tracks.length
    if (activeRow.value.tracks.length > 0) {
      activeRow.value.trackingTime = activeRow.value.tracks[0].trackingTime
      activeRow.value.location = activeRow.value.tracks[0].location
    }
    syncActiveRowToStore()
    resetTrackFormToNew()
    ElMessage.success('跟踪记录删除成功')
  })
}

function syncActiveRowToStore() {
  if (!activeRow.value) return
  const id = activeRow.value.id
  // 查找干线列表
  const tIdx = opStore.transList.findIndex(r => r.id === id)
  if (tIdx >= 0) {
    opStore.transList[tIdx] = { ...activeRow.value }
    return
  }
  // 查找短途列表
  const sIdx = opStore.stransList.findIndex(r => r.id === id)
  if (sIdx >= 0) {
    opStore.stransList[sIdx] = { ...activeRow.value }
  }
}

// 配载详情弹窗与运单联动
const detailVisible = ref(false)

const loadedWaybills = computed(() => {
  if (!activeRow.value) return []
  const waybillIds = activeRow.value.waybillIds || []
  return opStore.shipList.filter(s => waybillIds.includes(s.id) || waybillIds.includes(s.orderNo))
})

function handleCellLinkClick(row: Record<string, any>, col?: any) {
  activeRow.value = row
  handleRowSelect(row)
  if (col?.field === 'transportNo' || !col) {
    detailVisible.value = true
  } else {
    openTrackForRow(row)
  }
}

// 打印集成
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

function handlePrintManifest() {
  if (!activeRow.value) return
  const data = {
    ...activeRow.value,
    waybillList: loadedWaybills.value
  }
  printPreviewRef.value?.open('manifest', [data])
}

function handlePrintContract() {
  if (!activeRow.value) return
  const data = {
    ...activeRow.value,
    waybillList: loadedWaybills.value
  }
  printPreviewRef.value?.open('contract', [data])
}

onMounted(() => {
  // 保证所有初始批次具备 tracks 数组
  allTrackableBatches.value.forEach(batch => {
    if (!batch.tracks) {
      batch.tracks = []
      batch.trackCount = 0
    }
  })
})
</script>

<style scoped>
.listBox {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
}
.contentBox {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  padding: 8px 10px 6px;
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
  display: flex;
  align-items: center;
}
.width-90 {
  width: 90px;
}
.width-220 {
  width: 220px;
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
  width: 28px;
  height: 28px;
  color: #409eff;
  cursor: pointer;
  border-radius: 4px;
}
.funnel-trigger:hover {
  background: #ecf5ff;
}

.gbOperationBtns {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4px;
}
.left-btn-wrap,
.right-btn-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-green {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.btn-green:hover {
  background-color: #85ce61;
  border-color: #85ce61;
  color: #fff;
}

.table-wrap {
  flex: 1;
  min-height: 0;
  background: #fff;
  border: 1px solid #dcdfe6;
}

/* 跟踪信息弹窗样式 */
.track-dialog-container {
  padding: 0 4px;
}
.baseInfoRow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  margin-bottom: 12px;
}
.info-pill {
  display: flex;
  align-items: center;
  font-size: 13px;
}
.info-pill .label {
  color: #64748b;
}
.info-pill .val {
  color: #1e293b;
}
.text-blue {
  color: #409eff;
}
.text-danger {
  color: #f56c6c;
}
.font-bold {
  font-weight: 600;
}
.sub-table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 6px;
}
.sub-table-header .tip {
  font-size: 12px;
  font-weight: normal;
  color: #909399;
}
.track-form-box {
  margin-top: 12px;
  padding: 10px 12px 2px;
  background-color: #fbfcfe;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
}
.form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: #409eff;
  margin-bottom: 8px;
}
.track-form :deep(.el-form-item) {
  margin-bottom: 8px;
}
.dialog-footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left-actions {
  display: flex;
  gap: 8px;
}

/* 配载详情弹窗样式 */
.detail-container {
  padding: 0 4px;
}
.detail-desc {
  margin-bottom: 12px;
}
</style>
