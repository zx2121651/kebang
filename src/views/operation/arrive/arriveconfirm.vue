<template>
  <div class="arrive-confirm-page">
    <el-tabs v-model="activeTab" type="card" class="arrive-tabs">
      <el-tab-pane
        v-for="tab in tabsConfig"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
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
                  <NetworkTreeSelect
                    v-model="queryForm.startGroups"
                    placeholder="请选择发车网点"
                    :width="170"
                  />
                </el-form-item>

                <el-form-item>
                  <NetworkTreeSelect
                    v-model="queryForm.destGroups"
                    placeholder="请选择到货网点"
                    :width="170"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    :icon="Search"
                    class="btn-save"
                    @click="ElMessage.success(`${tab.label}查询成功`)"
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

            <!-- 第二行：操作按钮栏 (1:1 live_arriveconfirm.png) -->
            <div class="gbOperationBtns">
              <div class="left-btn-wrap">
                <el-button size="small" class="btn-shortcut" @click="handleAction('确认到达')">
                  确认到达
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleAction('取消到达')">
                  取消到达
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleAction('卸货入库')">
                  卸货入库
                </el-button>
                <el-button size="small" class="btn-shortcut" @click="handleAction('取消入库')">
                  取消入库
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  :icon="Printer"
                  @click="handleAction('打印到货清单')"
                >
                  打印到货清单
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/customRoute/addArrive')"
                >
                  到货分拨
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/customRoute/addDeliverHome')"
                >
                  送货上门
                </el-button>
              </div>

              <div class="right-btn-wrap">
                <el-button
                  size="small"
                  :icon="Download"
                  @click="handleExportCurrentTab"
                >
                  导出
                </el-button>
                <el-button size="small" :icon="Lock" @click="saveCurrentLayout">
                  锁定外观
                </el-button>
                <el-button size="small" :icon="Setting" @click="openCurrentColSet">
                  列设置
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <GbTableEngine
            :ref="(el: any) => setTableRef(tab.name, el)"
            :table-data="currentTableData"
            :columns="currentColumns"
            :filter-items="currentFilters"
            :storage-key="`kebang_arriveconfirm_${tab.name}_v2`"
            :current-page="currentPage"
            :page-size="pageSize"
            @selection-change="rows => (selectedRows = rows)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Printer, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import {
  ARRIVECONFIRM_COLUMNS,
  ARRIVECONFIRM_FILTERS,
  SHUTTLE_WAYBILL_COLUMNS,
  SHUTTLE_WAYBILL_FILTERS,
  STRANSLIST_COLUMNS,
  STRANSLIST_FILTERS,
  SENDOUT_COLUMNS,
  SENDOUT_FILTERS
} from '@/views/operation/components/OperationColumnConfig'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'

const router = useRouter()
const opStore = useOperationStore()

const tabsConfig = [
  { name: '1', label: '干线到车' },
  { name: '2', label: '干线到货' },
  { name: '3', label: '短途到车' },
  { name: '4', label: '短途到货' },
  { name: '5', label: '送出到货' }
]

const activeTab = ref('1')
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])
const tableRefs = reactive<Record<string, any>>({})

function setTableRef(tabName: string, el: any) {
  if (el) tableRefs[tabName] = el
}

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: [] as string[],
  destGroups: ['hq'] as string[]
})

const currentColumns = computed(() => {
  switch (activeTab.value) {
    case '1':
      return ARRIVECONFIRM_COLUMNS
    case '2':
    case '4':
      return SHUTTLE_WAYBILL_COLUMNS
    case '3':
      return STRANSLIST_COLUMNS
    case '5':
      return SENDOUT_COLUMNS
    default:
      return ARRIVECONFIRM_COLUMNS
  }
})

const currentFilters = computed(() => {
  switch (activeTab.value) {
    case '1':
      return ARRIVECONFIRM_FILTERS
    case '2':
    case '4':
      return SHUTTLE_WAYBILL_FILTERS
    case '3':
      return STRANSLIST_FILTERS
    case '5':
      return SENDOUT_FILTERS
    default:
      return ARRIVECONFIRM_FILTERS
  }
})

const currentTableData = computed(() => {
  switch (activeTab.value) {
    case '1':
      return opStore.transList
    case '2':
    case '4':
      return opStore.shipList
    case '3':
      return opStore.stransList.filter(r => r.transportType === 2)
    case '5':
      return opStore.sendOutList
    default:
      return opStore.transList
  }
})

import { useEnterpriseStore } from '@/store/enterprise'

const entStore = useEnterpriseStore()

function handleAction(actionName: string) {
  if (selectedRows.value.length === 0) {
    ElMessage.warning(`请先勾选需要执行【${actionName}】的记录`)
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  selectedRows.value.forEach(r => {
    if (actionName === '确认到达' || actionName === '卸货入库') {
      if ('tStatusStr' in r) {
        r.tStatus = 3
        r.tStatusStr = '已到达'
        r.arrivedTime = now
        // 同步联动该批次下的所有运单
        if (Array.isArray(r.waybillIds)) {
          opStore.shipList.forEach(s => {
            if (r.waybillIds.includes(s.id)) {
              s.oStatus = 150
              s.oStatusStr = '已到达'
            }
          })
        }
      }
      if ('oStatusStr' in r) {
        r.oStatus = 150
        r.oStatusStr = '已到达'
      }
    } else if (actionName === '取消到达' || actionName === '取消入库') {
      if ('tStatusStr' in r) {
        r.tStatus = 2
        r.tStatusStr = '已发车'
        if (Array.isArray(r.waybillIds)) {
          opStore.shipList.forEach(s => {
            if (r.waybillIds.includes(s.id)) {
              s.oStatus = 140
              s.oStatusStr = '发车中'
            }
          })
        }
      }
      if ('oStatusStr' in r) {
        r.oStatus = 140
        r.oStatusStr = '发车中'
      }
    }
  })

  // 记录操作日志
  entStore.operLogs.unshift({
    id: `OL-${Date.now()}`,
    module: '营运中心-到达确认',
    actionType: actionName,
    operator: 'admin (管理员)',
    network: '总部',
    ip: '113.108.221.45',
    targetNo: selectedRows.value.map(r => r.transportNo || r.orderNo || r.id).join(','),
    detail: `对 ${selectedRows.value.length} 条记录执行【${actionName}】，已同步联动更新运单到货状态`,
    costMs: '28ms',
    operTime: now
  })

  ElMessage.success(`已对选中的 ${selectedRows.value.length} 条记录执行【${actionName}】`)
}

function openCurrentSeniorFilter() {
  tableRefs[activeTab.value]?.openSeniorFilter()
}

function openCurrentColSet() {
  tableRefs[activeTab.value]?.openColumnSet()
}

function saveCurrentLayout() {
  tableRefs[activeTab.value]?.saveColumnAppearance()
}

import { exportTableToCsv } from '@/utils/exportHelper'

const tabLabels: Record<string, string> = {
  '1': '干线配载到货',
  '2': '短驳到货',
  '3': '短途到货',
  '4': '送货到货',
  '5': '外发到货'
}

function handleExportCurrentTab() {
  const tabName = tabLabels[activeTab.value] || '到达确认'
  exportTableToCsv(
    currentTableData.value,
    currentColumns.value,
    `星云TMS_${tabName}_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已成功导出【${tabName}】共 ${currentTableData.value.length} 条数据至本地文件`)
}
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
}
.arrive-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
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
  border: 1px solid #dcdfe6;
  border-bottom: none;
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
.right-btn-wrap {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
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
