<template>
  <div class="listBox">
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 分页 -->
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
                range-separator="-"
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
                placeholder="全部状态"
                style="width: 105px"
              >
                <el-option label="全部状态" value="" />
                <template v-if="transportType === 4">
                  <el-option label="待发车" value="待发车" />
                  <el-option label="送货中" value="送货中" />
                  <el-option label="已签收" value="已签收" />
                </template>
                <template v-else>
                  <el-option label="待发车" value="待发车" />
                  <el-option label="已发车" value="已发车" />
                  <el-option label="已到达" value="已到达" />
                </template>
              </el-select>
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.startGroups"
                placeholder="请选择始发网点"
                :width="150"
              />
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.destGroups"
                placeholder="请选择终端网点"
                :width="150"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="queryForm.keyword"
                placeholder="批次号/车牌/司机/合同"
                style="width: 170px"
                clearable
                @keyup.enter="handleSearch"
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

        <!-- 第二行：操作按钮栏 (1:1 原版规范) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <div class="btn-group">
              <el-button size="small" class="btn-green" :icon="Plus" @click="router.push(addRoute)">
                新增
              </el-button>
              <el-button size="small" class="btn-green" :icon="Edit" @click="handleEdit(1)">
                修改
              </el-button>
              <el-button size="small" type="danger" :icon="Delete" @click="handleDelete">
                删除
              </el-button>
            </div>

            <div class="btn-group shortcut-group">
              <template v-if="transportType === 4">
                <el-button size="small" class="btn-shortcut" :icon="Plus" @click="handleDepartOrDeliver">
                  确认送货
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleCancelDepart">
                  取消送货
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="router.push('/operation/arrive/signlist?tab=3')">
                  送货签收
                </el-button>
                <el-button size="small" class="btn-shortcut" :icon="Printer" @click="handlePrint('送货清单')">
                  打印送货清单
                </el-button>
              </template>
              <template v-else>
                <el-button size="small" class="btn-shortcut" :icon="Plus" @click="handleDepartOrDeliver">
                  确认发车
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleCancelDepart">
                  取消发车
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleArrive">
                  确认到达
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleCancelArrive">
                  取消到达
                </el-button>
                <el-button size="small" class="btn-shortcut" :icon="Printer" @click="handlePrint('配载清单')">
                  打印清单
                </el-button>
                <el-button size="small" class="btn-shortcut" :icon="Printer" @click="handlePrint('运输合同')">
                  打印合同
                </el-button>
              </template>

              <el-button size="small" class="btn-shortcut" :icon="Plus" @click="handleEdit(2)">
                补单
              </el-button>
              <el-button size="small" class="btn-shortcut" :icon="Edit" @click="handleEdit(3)">
                更改单据
              </el-button>
            </div>
          </div>

          <div class="right-btn-wrap">
            <el-button size="small" :icon="Download" @click="handleExport">
              导出
            </el-button>
            <el-button size="small" :icon="Upload" @click="importBatchDialogVisible = true">
              批量导入
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

    <!-- 主表格 (GbTableEngine) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="filteredTableData"
        :columns="currentColumns"
        :filter-items="currentFilters"
        :storage-key="`kebang_strans_${transportType}_cols_v2`"
        :current-page="currentPage"
        :page-size="pageSize"
        :row-bg-color="getRowBgColor"
        @selection-change="rows => (selectedRows = rows)"
        @link-click="openDetailModal"
        @row-dblclick="openDetailModal"
      />
    </div>

    <!-- 批次详情弹窗 -->
    <el-dialog v-model="detailVisible" :title="`${title}批次详情`" width="880px" draggable>
      <div v-if="activeRow">
        <el-descriptions :column="4" border size="small" style="margin-bottom: 12px">
          <el-descriptions-item label="发车批次">{{ activeRow.transportNo }}</el-descriptions-item>
          <el-descriptions-item label="当前状态">
            <el-tag
              size="small"
              :type="activeRow.tStatusStr === '已到达' || activeRow.tStatusStr === '已签收' ? 'success' : activeRow.tStatusStr === '已发车' || activeRow.tStatusStr === '送货中' ? 'warning' : 'info'"
            >
              {{ activeRow.tStatusStr }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="合同编号">{{ activeRow.contractNo }}</el-descriptions-item>
          <el-descriptions-item label="车牌号码">{{ activeRow.licenseNo }}</el-descriptions-item>
          <el-descriptions-item label="随车司机">{{ activeRow.driverName }}</el-descriptions-item>
          <el-descriptions-item label="司机手机">{{ activeRow.driverMobile }}</el-descriptions-item>
          <el-descriptions-item label="承运公司">{{ activeRow.supplierName || '自有短途车队' }}</el-descriptions-item>
          <el-descriptions-item label="始发/终端">{{ activeRow.startGroup }} → {{ activeRow.destGroup }}</el-descriptions-item>
          <el-descriptions-item label="总运费/成本">
            <b style="color: #f56c6c">¥{{ activeRow.fTotal }}</b>
          </el-descriptions-item>
          <el-descriptions-item label="预付车费">¥{{ activeRow.fPrepare || 0 }}</el-descriptions-item>
          <el-descriptions-item label="到付车费">¥{{ activeRow.fArrive || 0 }}</el-descriptions-item>
          <el-descriptions-item label="起运时间">{{ activeRow.shipTime }}</el-descriptions-item>
          <el-descriptions-item label="途径网点" :span="2">{{ activeRow.routeGroup || '短途直达无经停' }}</el-descriptions-item>
          <el-descriptions-item label="备注说明" :span="2">{{ activeRow.remark || '正常短途运输' }}</el-descriptions-item>
        </el-descriptions>

        <div style="font-weight: 600; margin-bottom: 6px; font-size: 13px">本车配载运单明细 (共 {{ loadedWaybills.length }} 票)</div>
        <el-table :data="loadedWaybills" size="small" border stripe max-height="260px">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="orderNo" label="运单号" width="130" />
          <el-table-column prop="goodsNo" label="货号" width="120" />
          <el-table-column prop="destCity" label="到站城市" width="90" />
          <el-table-column prop="goodsName" label="品名" min-width="130" />
          <el-table-column prop="numberCount" label="件数" width="70" align="right" />
          <el-table-column prop="weightCount" label="重量(kg)" width="85" align="right" />
          <el-table-column prop="volumeCount" label="体积(m³)" width="85" align="right" />
          <el-table-column prop="fTotal" label="合计运费" width="90" align="right" />
          <el-table-column prop="cost" label="分摊成本" width="90" align="right">
            <template #default="{ row }">
              ¥{{ row.cost || Math.round((activeRow.fTotal || 450) / (loadedWaybills.length || 1)) }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <el-button size="small" type="primary" plain @click="handlePrintSingle(activeRow, '配载清单')">
              打印随车清单
            </el-button>
            <el-button size="small" type="primary" plain @click="handlePrintSingle(activeRow, '运输合同')">
              打印运输合同
            </el-button>
          </div>
          <div>
            <el-button size="small" @click="detailVisible = false">关 闭</el-button>
            <el-button size="small" type="primary" @click="activeRow && router.push(`${editRoutePrefix}/${activeRow.id}/1`)">
              进入配载编辑
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>

    <!-- 批量导入配载计划弹窗 -->
    <el-dialog v-model="importBatchDialogVisible" :title="`${title}计划批量导入`" width="760px">
      <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 13px; color: #606266;">
          支持上传 .csv / .xlsx 格式{{ title }}列表，智能解析批次、车辆与费用信息。
        </span>
        <el-button size="small" type="primary" plain @click="downloadBatchTemplate">
          下载导入模板
        </el-button>
      </div>

      <el-upload
        drag
        action="#"
        :auto-upload="false"
        accept=".csv,.xlsx,.xls"
        :on-change="handleMockBatchImport"
        style="margin-bottom: 12px"
      >
        <div style="padding: 20px 0; text-align: center;">
          <el-icon :size="40" style="color: #409eff; margin-bottom: 8px"><Upload /></el-icon>
          <div style="font-size: 13px; color: #606266">
            将配载计划 Excel 或 CSV 文件拖到此处，或 <em style="color:#409eff; font-style:normal; cursor:pointer">点击选取文件</em> 进行智能解析
          </div>
        </div>
      </el-upload>

      <!-- 解析预览表格 -->
      <div v-if="batchImportPreviewList.length > 0">
        <div style="font-size: 13px; font-weight: bold; margin-bottom: 6px; color: #303133">
          数据解析预览 (共 {{ batchImportPreviewList.length }} 笔配载批次)
        </div>
        <el-table :data="batchImportPreviewList" size="small" border stripe max-height="220px">
          <el-table-column type="index" label="序号" width="50" align="center" />
          <el-table-column prop="transportNo" label="配载批次号" width="130" />
          <el-table-column prop="startGroup" label="始发网点" width="90" />
          <el-table-column prop="destGroup" label="目的网点" width="90" />
          <el-table-column prop="licenseNo" label="车牌号" width="105" />
          <el-table-column prop="driverName" label="司机姓名" width="85" />
          <el-table-column prop="fTotal" label="车费(元)" width="80" align="right" />
          <el-table-column prop="remark" label="备注说明" min-width="120" />
        </el-table>
      </div>

      <template #footer>
        <el-button size="small" @click="importBatchDialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="batchImportPreviewList.length === 0"
          @click="confirmBatchImport"
        >
          确认导入 (共 {{ batchImportPreviewList.length }} 批次)
        </el-button>
      </template>
    </el-dialog>

    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  Edit,
  Delete,
  Printer,
  Download,
  Upload,
  Lock,
  Setting
} from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { useEnterpriseStore } from '@/store/enterprise'
import {
  STRANSLIST_COLUMNS,
  STRANSLIST_FILTERS,
  ARRIVEASSIGN_COLUMNS,
  ARRIVEASSIGN_FILTERS,
  HOMELIST_COLUMNS,
  HOMELIST_FILTERS
} from './OperationColumnConfig'
import NetworkTreeSelect from './NetworkTreeSelect.vue'
import GbPager from './GbPager.vue'
import GbTableEngine from './GbTableEngine.vue'
import PrintPreviewDialog from './PrintPreviewDialog.vue'
import {
  exportTableToCsv,
  downloadStranslistImportTemplate
} from '@/utils/exportHelper'

const props = defineProps<{
  /** 2: 短途配载, 3: 到货分拨, 4: 送货上门 */
  transportType: 2 | 3 | 4
  title: string
  addRoute: string
  editRoutePrefix: string
}>()

const router = useRouter()
const opStore = useOperationStore()
const entStore = useEnterpriseStore()

const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)
const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  status: '',
  startGroups: ['hq'] as string[],
  destGroups: [] as string[],
  keyword: ''
})

const currentColumns = computed(() => {
  if (props.transportType === 3) return ARRIVEASSIGN_COLUMNS
  if (props.transportType === 4) return HOMELIST_COLUMNS
  return STRANSLIST_COLUMNS
})

const currentFilters = computed(() => {
  if (props.transportType === 3) return ARRIVEASSIGN_FILTERS
  if (props.transportType === 4) return HOMELIST_FILTERS
  return STRANSLIST_FILTERS
})

const rawTableData = computed(() =>
  opStore.stransList.filter(r => r.transportType === props.transportType)
)

const filteredTableData = computed(() => {
  let list = [...rawTableData.value]
  if (queryForm.status) {
    list = list.filter(r => r.tStatusStr === queryForm.status)
  }
  if (queryForm.keyword) {
    const kw = queryForm.keyword.trim().toLowerCase()
    list = list.filter(r =>
      String(r.transportNo || '').toLowerCase().includes(kw) ||
      String(r.licenseNo || '').toLowerCase().includes(kw) ||
      String(r.driverName || '').toLowerCase().includes(kw) ||
      String(r.driverMobile || '').toLowerCase().includes(kw) ||
      String(r.contractNo || '').toLowerCase().includes(kw)
    )
  }
  if (queryForm.startGroups && queryForm.startGroups.length > 0) {
    list = list.filter(r =>
      queryForm.startGroups.some(g => (r.startGroup && r.startGroup.includes(g)) || g === 'hq' || g.toLowerCase() === 'hq')
    )
  }
  if (queryForm.destGroups && queryForm.destGroups.length > 0) {
    list = list.filter(r =>
      queryForm.destGroups.some(g => r.destGroup && r.destGroup.includes(g))
    )
  }
  if (queryForm.dateRange && queryForm.dateRange.length === 2) {
    const [start, end] = queryForm.dateRange
    list = list.filter(r => {
      const d = (queryForm.timeType === 1 ? r.creationTime : r.shipTime) || ''
      return (!start || d >= start) && (!end || d <= `${end} 23:59:59`)
    })
  }
  return list
})

function getRowBgColor(row: Record<string, any>) {
  if (row.tStatusStr === '已到达' || row.tStatusStr === '已签收') return '#f0f9eb'
  if (row.tStatusStr === '已发车' || row.tStatusStr === '送货中') return '#ecf5ff'
  return undefined
}

function handleSearch() {
  currentPage.value = 1
  ElMessage.success(`${props.title}查询成功`)
}

function handleEdit(modeType: number) {
  if (selectedRows.value.length === 0) {
    const actionName = modeType === 2 ? '补单' : modeType === 3 ? '更改单据' : '修改'
    ElMessage.warning(`请先勾选需要${actionName}的${props.title}批次`)
    return
  }
  if (selectedRows.value.length > 1) {
    ElMessage.warning(`仅支持选择单笔${props.title}批次进行操作，请重新勾选`)
    return
  }
  const row = selectedRows.value[0]
  if (modeType === 1 && row.tStatus !== 1 && row.tStatusStr !== '待发车') {
    ElMessage.warning(`批次【${row.transportNo}】当前处于【${row.tStatusStr}】状态，只能修改【待发车】批次！如需追加货物请点击【补单】。`)
    return
  }
  router.push(`${props.editRoutePrefix}/${row.id}/${modeType}`)
}

function handleDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请先勾选需要删除的${props.title}批次`)
    return
  }
  const activeDispatched = selectedRows.value.find(
    r => r.tStatus === 2 || r.tStatus === 3 || r.tStatusStr === '已发车' || r.tStatusStr === '已到达' || r.tStatusStr === '送货中'
  )
  if (activeDispatched) {
    ElMessage.warning(`批次【${activeDispatched.transportNo}】当前处于【${activeDispatched.tStatusStr}】状态，不可直接删除！请先取消发车。`)
    return
  }
  ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 个${props.title}批次吗？删除后配载运单将释放回待配库存。`, '删除确认', {
    type: 'warning',
    confirmButtonText: '确定删除',
    cancelButtonText: '取消'
  })
    .then(() => {
      const delBatchNos = selectedRows.value.map(r => r.transportNo)
      const freedWaybillIds = new Set<string>()
      selectedRows.value.forEach(b => {
        ;(b.waybillIds || []).forEach((id: string) => freedWaybillIds.add(id))
      })
      // 释放运单回待配载库存
      opStore.shipList.forEach(s => {
        if (freedWaybillIds.has(s.id)) {
          s.oStatus = 100
          s.oStatusStr = '已入库'
        }
      })
      const ids = new Set(selectedRows.value.map(r => r.id))
      opStore.stransList = opStore.stransList.filter(r => !ids.has(r.id))
      // 清理应付大车台账
      entStore.carFeeList = entStore.carFeeList.filter(c => !delBatchNos.includes(c.batchNo))
      entStore.arApList = entStore.arApList.filter(a => !delBatchNos.includes(a.shipOrderNo))
      tableEngineRef.value?.clearSelection()
      selectedRows.value = []
      ElMessage.success(`删除成功，已释放 ${freedWaybillIds.size} 票运单回待配载库存`)
    })
    .catch(() => {})
}

function handleDepartOrDeliver() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请先勾选需要${props.transportType === 4 ? '确认送货' : '确认发车'}的批次`)
    return
  }
  const isDelivery = props.transportType === 4
  const targetLabel = isDelivery ? '送货中' : '已发车'
  const validBatches = selectedRows.value.filter(
    r => r.tStatus === 1 || r.tStatusStr === '待发车' || (!r.tStatus && !r.tStatusStr)
  )
  if (validBatches.length === 0) {
    ElMessage.warning(`所选批次均已处于【${targetLabel}】状态，无需重复操作`)
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const nos: string[] = []
  for (const r of validBatches) {
    r.tStatus = 2
    r.tStatusStr = targetLabel
    r.shipTime = now
    nos.push(r.transportNo)
    // 同步配载运单状态为【发车中】
    const ids: string[] = r.waybillIds || []
    opStore.shipList.forEach(s => {
      if (ids.includes(s.id)) {
        s.oStatus = 140
        s.oStatusStr = isDelivery ? '送货中' : '发车中'
        s.plateNo = r.licenseNo
        s.driverName = r.driverName
        s.driverPhone = r.driverMobile
      }
    })
    if (!Array.isArray(r.tracks)) r.tracks = []
    r.tracks.unshift({
      id: `TRK-${Date.now()}`,
      trackingTime: now,
      trackCreator: '管理员',
      trackType: isDelivery ? '送货上门' : '短途发车',
      location: r.startGroup || '总部',
      content: `${props.title}批次【${r.transportNo}】已由【${r.startGroup}】确认发车，发往【${r.destGroup}】（车牌：${r.licenseNo}，司机：${r.driverName}）`,
      isSms: true
    })
  }
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: `营运中心-${props.title}`,
    actionType: isDelivery ? '确认送货' : '确认发车',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: nos.slice(0, 3).join(','),
    detail: `${props.title}批次确认发车：${nos.join(', ')}`,
    costMs: '35ms',
    operTime: now
  })
  tableEngineRef.value?.clearSelection()
  selectedRows.value = []
  ElMessage.success(`已完成 ${validBatches.length} 个${props.title}批次的【${targetLabel}】`)
}

function handleCancelDepart() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请先勾选需要${props.transportType === 4 ? '取消送货' : '取消发车'}的批次`)
    return
  }
  const isDelivery = props.transportType === 4
  const dispatchedBatches = selectedRows.value.filter(
    r => r.tStatus === 2 || r.tStatusStr === '已发车' || r.tStatusStr === '送货中'
  )
  if (dispatchedBatches.length === 0) {
    ElMessage.warning(`所选批次尚未${isDelivery ? '送货' : '发车'}，无需取消`)
    return
  }
  const arrivedBatch = selectedRows.value.find(r => r.tStatus === 3 || r.tStatusStr === '已到达' || r.tStatusStr === '已签收')
  if (arrivedBatch) {
    ElMessage.warning(`批次【${arrivedBatch.transportNo}】已到达或已签收，不可直接取消发车`)
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const nos: string[] = []
  for (const r of dispatchedBatches) {
    r.tStatus = 1
    r.tStatusStr = '待发车'
    nos.push(r.transportNo)
    // 运单恢复为【已装车】
    const ids: string[] = r.waybillIds || []
    opStore.shipList.forEach(s => {
      if (ids.includes(s.id)) {
        s.oStatus = 130
        s.oStatusStr = '已装车'
      }
    })
  }
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: `营运中心-${props.title}`,
    actionType: isDelivery ? '取消送货' : '取消发车',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: nos.slice(0, 3).join(','),
    detail: `${props.title}批次取消发车，恢复为待发车：${nos.join(', ')}`,
    costMs: '28ms',
    operTime: now
  })
  tableEngineRef.value?.clearSelection()
  selectedRows.value = []
  ElMessage.success(`已取消，${dispatchedBatches.length} 个批次状态恢复为【待发车】`)
}

function handleArrive() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要确认到达的批次')
    return
  }
  const dispatched = selectedRows.value.filter(r => r.tStatus === 2 || r.tStatusStr === '已发车')
  if (dispatched.length === 0) {
    ElMessage.warning('所选批次尚未发车或已到达，无法执行确认到达')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  for (const r of dispatched) {
    r.tStatus = 3
    r.tStatusStr = '已到达'
    const ids: string[] = r.waybillIds || []
    opStore.shipList.forEach(s => {
      if (ids.includes(s.id)) {
        s.oStatus = 150
        s.oStatusStr = '已到达'
      }
    })
  }
  tableEngineRef.value?.clearSelection()
  selectedRows.value = []
  ElMessage.success(`已完成 ${dispatched.length} 个短途批次的【确认到达】`)
}

function handleCancelArrive() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要取消到达的批次')
    return
  }
  const arrived = selectedRows.value.filter(r => r.tStatus === 3 || r.tStatusStr === '已到达')
  if (arrived.length === 0) {
    ElMessage.warning('所选批次尚未确认到达，无需取消')
    return
  }
  for (const r of arrived) {
    r.tStatus = 2
    r.tStatusStr = '已发车'
    const ids: string[] = r.waybillIds || []
    opStore.shipList.forEach(s => {
      if (ids.includes(s.id)) {
        s.oStatus = 140
        s.oStatusStr = '发车中'
      }
    })
  }
  tableEngineRef.value?.clearSelection()
  selectedRows.value = []
  ElMessage.success(`已取消到达，${arrived.length} 个短途批次状态恢复为【已发车】`)
}

function handlePrint(docName: string) {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请先勾选需要打印【${docName}】的${props.title}批次`)
    return
  }
  if (selectedRows.value.length > 1) {
    ElMessage.warning(`打印【${docName}】仅支持单选批次，已默认取首个勾选批次`)
  }
  handlePrintSingle(selectedRows.value[0], docName)
}

function handlePrintSingle(batch: Record<string, any> | null, docName: string) {
  if (!batch) return
  const ids = batch.waybillIds || []
  const matched = opStore.shipList.filter(s => ids.includes(s.id))
  const targetWaybills = matched.length > 0 ? matched : opStore.shipList.slice(0, 2)
  const mapped = targetWaybills.map(r => ({
    shipOrderNo: r.orderNo,
    startNetwork: r.startGroup,
    destCity: r.destCity,
    endNetwork: r.destGroup,
    goodsNo: r.goodsNo,
    createTime: r.shippingDate,
    shipperName: r.shipper,
    shipperCompany: r.shipUnit,
    shipperMobile: r.shipPhone,
    receiverName: r.receiver,
    receiverCompany: r.receiveUnit,
    receiverMobile: r.receivePhone,
    goodsName: r.goodsName,
    pack: r.pack,
    num: r.numberCount || 1,
    weight: r.weightCount || 0,
    volume: r.volumeCount || 0,
    baseFee: r.freight || 0,
    totalFee: r.fTotal || 0,
    deliveryType: r.deliveryType || '自提',
    receiptRequirement: r.receipt || '签收原件',
    remark: r.remark || ''
  }))
  printPreviewRef.value?.open(docName.includes('合同') ? 'contract' : 'manifest', mapped)
}

function handleExport() {
  const exportData = selectedRows.value.length > 0 ? selectedRows.value : filteredTableData.value
  exportTableToCsv(
    exportData,
    currentColumns.value,
    `星云TMS_${props.title}_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已成功导出 ${exportData.length} 笔${props.title}数据至本地文件`)
}

// 批量导入短途配载计划
const importBatchDialogVisible = ref(false)
const batchImportPreviewList = ref<Record<string, any>[]>([])

function downloadBatchTemplate() {
  downloadStranslistImportTemplate()
  ElMessage.success(`已下载《星云TMS${props.title}计划批量导入模板.csv》`)
}

function handleMockBatchImport(file: any) {
  const rawFile = file?.raw
  if (rawFile && (rawFile.name.endsWith('.csv') || rawFile.type.includes('csv') || rawFile.type.includes('text'))) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = (e.target?.result as string) || ''
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
        const parsed: Record<string, any>[] = []
        const startIdx = lines[0]?.includes('批次') || lines[0]?.includes('网点') ? 1 : 0
        for (let i = startIdx; i < lines.length; i++) {
          const cells = lines[i].split(',').map(c => c.replace(/^["'\s]+|["'\s]+$/g, '').trim())
          if (cells.length >= 3 && cells.some(Boolean)) {
            const bNo = cells[0] || `DT261011${String(opStore.stransList.length + parsed.length + 1).padStart(3, '0')}`
            parsed.push({
              id: `ST-${Date.now()}-${parsed.length}`,
              transportNo: bNo,
              contractNo: cells[1] || `HT-${bNo}`,
              startGroup: cells[2] || '佛山分部',
              destGroup: cells[3] || '总部',
              supplierName: cells[4] || '佛山短途接驳车队',
              licenseNo: cells[5] || '粤E·66120',
              driverName: cells[6] || '周志强',
              driverMobile: cells[7] || '13726618890',
              shipTime: cells[8] || new Date().toISOString().replace('T', ' ').slice(0, 19),
              askArriveTime: cells[9] || '2026-10-11 12:00:00',
              fTotal: Number(cells[10]) || 450,
              fPrepare: Number(cells[11]) || 200,
              fArrive: Number(cells[12]) || 250,
              fBack: Number(cells[13]) || 0,
              fOilCard: Number(cells[14]) || 0,
              routeGroup: cells[15] || '',
              remark: cells[16] || `通过模板批量导入${props.title}`,
              tStatus: 1,
              tStatusStr: '待发车',
              transportType: props.transportType,
              transportTypeStr: props.title,
              creationTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
              creator: '管理员',
              auditStatusStr: '已审核',
              count: 2,
              number: 100,
              weight: 2500,
              volume: 12.0,
              waybillIds: ['ZB2610110001', 'ZB2610110002']
            })
          }
        }
        batchImportPreviewList.value = parsed.length > 0 ? parsed : fallbackBatchImport(rawFile)
        ElMessage.success(`成功解析【${rawFile.name}】中的 ${batchImportPreviewList.value.length} 个${props.title}批次`)
      } catch {
        fallbackBatchImport(rawFile)
      }
    }
    reader.readAsText(rawFile, 'utf-8')
  } else {
    fallbackBatchImport(file)
  }
}

function fallbackBatchImport(file: any) {
  const fName = file?.name || `${props.title}批次表.xlsx`
  const parsed: Record<string, any>[] = []
  for (let i = 1; i <= 2; i++) {
    const bNo = `DT261011${String(opStore.stransList.length + i).padStart(3, '0')}`
    parsed.push({
      id: `ST-${Date.now()}-${i}`,
      transportNo: bNo,
      contractNo: `HT-${bNo}`,
      startGroup: '佛山分部',
      destGroup: '总部',
      supplierName: '佛山短途接驳车队',
      licenseNo: i === 1 ? '粤E·66120' : '粤A·33219',
      driverName: i === 1 ? '周志强' : '黄立军',
      driverMobile: i === 1 ? '13726618890' : '13602881177',
      shipTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      askArriveTime: '2026-10-11 12:00:00',
      fTotal: 400 * i,
      fPrepare: 180 * i,
      fArrive: 220 * i,
      fBack: 0,
      fOilCard: 0,
      routeGroup: '南海营业部',
      remark: `根据【${fName}】批量导入`,
      tStatus: 1,
      tStatusStr: '待发车',
      transportType: props.transportType,
      transportTypeStr: props.title,
      creationTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
      creator: '管理员',
      auditStatusStr: '已审核',
      count: 2,
      number: 80 * i,
      weight: 2400 * i,
      volume: 12.0 * i,
      waybillIds: ['ZB2610110001', 'ZB2610110002']
    })
  }
  batchImportPreviewList.value = parsed
  ElMessage.success(`已解析【${fName}】中的 2 个${props.title}批次，请核对预览`)
  return parsed
}

function confirmBatchImport() {
  if (batchImportPreviewList.value.length === 0) return
  let count = 0
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  for (const b of batchImportPreviewList.value) {
    opStore.stransList.unshift(b)
    entStore.carFeeList.unshift({
      id: `CF-${b.transportNo}`,
      batchNo: b.transportNo,
      transType: props.title as any,
      departDate: b.shipTime,
      startNetwork: b.startGroup,
      endNetwork: b.destGroup,
      plateNo: b.licenseNo,
      driverName: b.driverName,
      driverPhone: b.driverMobile,
      totalDriverFee: Number(b.fTotal || 0),
      prepayFee: Number(b.fPrepare || 0),
      arrivePayFee: Number(b.fArrive || 0),
      oilCardFee: Number(b.fOilCard || 0),
      returnPayFee: Number(b.fBack || 0),
      loadFee: 0,
      settledAmount: 0,
      unsettledAmount: Number(b.fTotal || 0),
      auditStatus: '已审核',
      settleStatus: '未结算',
      remark: `批量导入${props.title}大车费用`
    })
    count++
  }
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: `营运中心-${props.title}`,
    actionType: '批量导入',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: batchImportPreviewList.value.map(r => r.transportNo).slice(0, 3).join(','),
    detail: `批量导入${props.title}计划共 ${count} 个批次`,
    costMs: '36ms',
    operTime: now
  })
  importBatchDialogVisible.value = false
  batchImportPreviewList.value = []
  ElMessage.success(`导入成功！已成功批量导入 ${count} 个${props.title}批次并同步至财务应付台账`)
}

const detailVisible = ref(false)
const activeRow = ref<Record<string, any> | null>(null)
const loadedWaybills = computed(() => {
  if (!activeRow.value) return []
  const ids = activeRow.value.waybillIds || []
  const matched = opStore.shipList.filter(s => ids.includes(s.id))
  return matched.length > 0 ? matched : opStore.shipList.slice(0, 2)
})

function openDetailModal(row: Record<string, any>) {
  activeRow.value = row
  detailVisible.value = true
}
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
}
.funnel-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 24px;
  color: #b5b5b5;
  cursor: pointer;
}
.funnel-trigger:hover {
  color: #3888fa;
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
.right-btn-wrap,
.btn-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}
.shortcut-group {
  margin-left: 50px;
}
.btn-green {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}
.btn-shortcut {
  background-color: #28a9b8 !important;
  border-color: #28a9b8 !important;
  color: #ffffff !important;
}
.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
