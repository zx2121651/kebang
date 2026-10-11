<template>
  <div class="listBox">
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 分页 -->
        <div class="filter-top-row">
          <el-form :inline="true" size="small" class="listForm" @submit.prevent>
            <el-form-item class="dateItem">
              <el-select v-model="queryForm.timeType" class="width-90">
                <el-option label="中转日期" :value="1" />
                <el-option label="开单日期" :value="2" />
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
                placeholder="请选择中转网点"
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
            :total="tableData.length"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
          />
        </div>

        <!-- 第二行：操作按钮栏 (1:1 live_localoutgo.png / live_terminaloutgo.png) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <div class="btn-group">
              <el-button size="small" class="btn-green" :icon="Plus" @click="openOutgoFormModal(false)">
                新增
              </el-button>
              <el-button size="small" class="btn-green" :icon="Edit" @click="openOutgoFormModal(true)">
                修改
              </el-button>
              <el-button size="small" type="danger" :icon="Delete" @click="handleDelete">
                删除
              </el-button>
            </div>

            <div class="btn-group shortcut-group">
              <el-button
                size="small"
                class="btn-shortcut"
                @click="router.push('/operation/arrive/signlist?tab=4')"
              >
                外发签收
              </el-button>
              <el-button size="small" class="btn-shortcut" @click="handleCancelSign">
                取消签收
              </el-button>
              <el-button
                size="small"
                class="btn-shortcut"
                :icon="Printer"
                @click="openOutgoPrint('manifest')"
              >
                打印中转清单
              </el-button>
              <el-button
                size="small"
                class="btn-shortcut"
                :icon="Printer"
                @click="openOutgoPrint('label')"
              >
                打印中转标签
              </el-button>
              <el-button size="small" class="btn-shortcut" @click="handleReturnFee">
                返中转费
              </el-button>
            </div>
          </div>

          <div class="right-btn-wrap">
            <el-button size="small" :icon="Download" @click="handleExport">
              导出
            </el-button>
            <el-button size="small" :icon="Upload" @click="handleBatchImport">
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

    <!-- 主表格 (82列 / 80列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="tableData"
        :columns="outgoType === 1 ? LOCALOUTGO_COLUMNS : TERMINALOUTGO_COLUMNS"
        :filter-items="outgoType === 1 ? LOCALOUTGO_FILTERS : TERMINALOUTGO_FILTERS"
        :storage-key="`kebang_outgo_${outgoType}_cols_v2`"
        :current-page="currentPage"
        :page-size="pageSize"
        @selection-change="rows => (selectedRows = rows)"
      />
    </div>

    <!-- 新增/修改外发中转单弹窗 -->
    <el-dialog v-model="modalVisible" :title="`${isEdit ? '修改' : '新增'}${title}`" width="680px" draggable>
      <el-form :model="outgoForm" label-width="95px" size="small" class="outgo-form-grid">
        <el-form-item label="选择运单" required>
          <el-select v-model="outgoForm.orderNo" filterable style="width: 100%" @change="syncShipInfo">
            <el-option
              v-for="s in opStore.shipList"
              :key="s.id"
              :label="`${s.orderNo} (${s.goodsName} - ${s.destCity})`"
              :value="s.orderNo"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="承运公司" required>
          <CarrierPopoverInput
            v-model="outgoForm.carrierName"
            placeholder="承运商名称/首字母联想"
            @select="onSelectOutgoCarrier"
          />
        </el-form-item>
        <el-form-item label="中转单号" required>
          <el-input v-model="outgoForm.switchNo" placeholder="承运商中转单号" />
        </el-form-item>
        <el-form-item label="中转时间">
          <el-date-picker
            v-model="outgoForm.switchTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="本地电话">
          <el-input v-model="outgoForm.localPhone" placeholder="承运商本地档口电话(自动带出)" />
        </el-form-item>
        <el-form-item label="提货电话">
          <el-input v-model="outgoForm.takePhone" placeholder="承运商到站提货电话(自动带出)" />
        </el-form-item>
        <el-form-item label="中转现付">
          <el-input-number v-model="outgoForm.fSwCash" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中转回单付">
          <el-input-number v-model="outgoForm.fSwReceipt" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中转月结">
          <el-input-number v-model="outgoForm.fSwMonth" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="返中转费">
          <el-input-number v-model="outgoForm.fSwitchReturn" :min="0" style="width: 100%" />
        </el-form-item>
        <el-form-item label="中转备注" style="grid-column: span 2">
          <el-input v-model="outgoForm.remark" placeholder="请输入外发交接说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="modalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitOutgoForm">保 存</el-button>
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
import type { CarrierArchiveItem } from '@/store/dictionaryAndArchive'
import {
  LOCALOUTGO_COLUMNS,
  LOCALOUTGO_FILTERS,
  TERMINALOUTGO_COLUMNS,
  TERMINALOUTGO_FILTERS
} from './OperationColumnConfig'
import NetworkTreeSelect from './NetworkTreeSelect.vue'
import GbPager from './GbPager.vue'
import GbTableEngine from './GbTableEngine.vue'
import CarrierPopoverInput from './CarrierPopoverInput.vue'
import PrintPreviewDialog from './PrintPreviewDialog.vue'

const props = defineProps<{
  /** 1: 本地外发, 2: 终端外发 */
  outgoType: 1 | 2
  title: string
}>()

const router = useRouter()
const opStore = useOperationStore()

const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

const tableData = computed(() =>
  opStore.outgoList.filter(r => r.outgoType === props.outgoType)
)

function handleSearch() {
  currentPage.value = 1
  ElMessage.success(`${props.title}查询成功`)
}

const modalVisible = ref(false)
const isEdit = ref(false)
const outgoForm = reactive({
  id: '',
  orderNo: 'ZB2610110001',
  carrierName: '湖北大道物流广州专线部',
  switchNo: `ZZ-${Date.now().toString().slice(-6)}`,
  switchTime: '2026-10-11 10:30:00',
  localPhone: '020-36218899',
  takePhone: '027-83291100',
  fSwCash: 300,
  fSwReceipt: 200,
  fSwMonth: 0,
  fSwitchReturn: 0,
  remark: ''
})

function onSelectOutgoCarrier(c: CarrierArchiveItem) {
  outgoForm.carrierName = c.name
  outgoForm.localPhone = c.localPhone
  outgoForm.takePhone = c.pickPhone
}

function openOutgoPrint(type: 'manifest' | 'label') {
  const rows = selectedRows.value.length > 0 ? selectedRows.value : tableData.value.slice(0, 2)
  printPreviewRef.value?.open(type, rows.map(r => ({
    shipOrderNo: r.orderNo,
    startNetwork: r.groupName || '总部',
    destCity: r.destCity || '长沙市',
    endNetwork: r.carrierName || '外发承运部',
    goodsNo: r.goodsNo || '0-10',
    receiverName: r.receiver || '张向东',
    receiverMobile: r.receivePhone || '13974812233',
    receiverAddress: r.receiveAddress || '长沙县星沙物流园',
    goodsName: r.goodsName || '变频空调',
    pack: r.pack || '纸箱',
    num: r.swNumber || 10,
    weight: r.swWeight || 200,
    volume: r.swVolume || 2.5,
    collectPay: r.fSwReceipt || 0,
    agencyFund: r.fCollect || 0,
    deliveryType: r.deliveryType || '送货上门'
  })))
}

function openOutgoFormModal(editMode: boolean) {
  isEdit.value = editMode
  if (editMode) {
    if (selectedRows.value.length !== 1) {
      ElMessage.warning('请勾选 1 条外发记录进行修改')
      return
    }
    Object.assign(outgoForm, selectedRows.value[0])
  } else {
    outgoForm.id = ''
    outgoForm.switchNo = `ZZ-${Date.now().toString().slice(-6)}`
  }
  modalVisible.value = true
}

function syncShipInfo() {
  // sync from shipList when selected
}

function submitOutgoForm() {
  if (!outgoForm.carrierName.trim()) {
    ElMessage.warning('请输入承运公司名称')
    return
  }
  const ship =
    opStore.shipList.find(s => s.orderNo === outgoForm.orderNo) || opStore.shipList[0]
  const totalSw =
    Number(outgoForm.fSwCash || 0) +
    Number(outgoForm.fSwReceipt || 0) +
    Number(outgoForm.fSwMonth || 0)
  const record: Record<string, any> = {
    ...ship,
    ...outgoForm,
    id: outgoForm.id || `OG-${Date.now()}`,
    outgoType: props.outgoType,
    typeStr: props.title,
    oStatusStr: `${props.title}中`,
    fSwTotal: totalSw,
    swNumber: ship?.numberCount || 50,
    swWeight: ship?.weightCount || 1000,
    swVolume: ship?.volumeCount || 8.5,
    groupName: '总部',
    switchPerson: '管理员',
    auditStatusStr: '已审核',
    trackCount: 1,
    trackCreator: '管理员',
    trackingTime: outgoForm.switchTime,
    tracks: [
      {
        id: `OTK-${Date.now()}`,
        trackingTime: outgoForm.switchTime,
        trackCreator: '管理员',
        trackType: '外发交接',
        location: '总部外发部',
        content: `已交接【${outgoForm.carrierName}】，中转单号：${outgoForm.switchNo}`,
        isSms: false
      }
    ]
  }
  if (isEdit.value && outgoForm.id) {
    const idx = opStore.outgoList.findIndex(r => r.id === outgoForm.id)
    if (idx !== -1) opStore.outgoList[idx] = record
  } else {
    opStore.outgoList.unshift(record)
  }
  modalVisible.value = false
  ElMessage.success(`${props.title}保存成功`)
}

function handleDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要删除的外发记录')
    return
  }
  ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 条外发记录吗？`, '删除确认', {
    type: 'warning'
  })
    .then(() => {
      const ids = new Set(selectedRows.value.map(r => r.id))
      opStore.outgoList = opStore.outgoList.filter(r => !ids.has(r.id))
      tableEngineRef.value?.clearSelection()
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

function handleCancelSign() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要取消签收的外发记录')
    return
  }
  ElMessage.success('已取消外发签收状态')
}

function handleReturnFee() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要登记【返中转费】的外发记录')
    return
  }
  selectedRows.value.forEach(r => {
    r.isReturn = '是'
  })
  ElMessage.success('已完成返中转费登记')
}

import { exportTableToCsv } from '@/utils/exportHelper'

function handleExport() {
  const cols = props.outgoType === 1 ? LOCALOUTGO_COLUMNS : TERMINALOUTGO_COLUMNS
  exportTableToCsv(
    tableData.value,
    cols,
    `星云TMS_${props.title}_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已成功导出 ${tableData.value.length} 笔${props.title}数据至本地文件`)
}

function handleBatchImport() {
  const newSwitchNo = `ZZ-${Date.now().toString().slice(-6)}`
  opStore.outgoList.unshift({
    id: `OG-${Date.now()}`,
    outgoType: props.outgoType,
    typeStr: props.title,
    orderNo: `ZB261011${String(opStore.outgoList.length + 1).padStart(4, '0')}`,
    oStatusStr: `${props.title}中`,
    goodsNo: `GH-${Date.now().toString().slice(-4)}`,
    startGroup: '总部',
    destGroup: props.outgoType === 1 ? '武汉分部' : '株洲分部',
    carrierName: '湖北大道物流广州专线部',
    switchNo: newSwitchNo,
    switchTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
    tags: '批量导入外发',
    localPhone: '020-36218899',
    takePhone: '027-83291100',
    fSwTotal: 580,
    fSwCash: 280,
    fSwReceipt: 300,
    fSwMonth: 0,
    fSwitchReturn: 0,
    remark: `批量导入${props.title}中转单`,
    creator: '管理员'
  })
  ElMessage.success(`成功批量导入${props.title}记录【${newSwitchNo}】`)
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
.outgo-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 14px;
}
</style>
