<template>
  <div class="sendout-page">
    <el-tabs v-model="activeTab" type="card" class="sendout-tabs">
      <!-- 页签1：送出外发列表 -->
      <el-tab-pane label="送出外发列表" name="list">
        <div class="contentBox">
          <div class="gbContainer">
            <div class="filter-top-row">
              <el-form :inline="true" size="small" class="listForm" @submit.prevent>
                <el-form-item class="dateItem">
                  <el-select v-model="queryForm.timeType" class="width-90">
                    <el-option label="创建日期" :value="1" />
                    <el-option label="送出日期" :value="2" />
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
                    placeholder="请选择送出网点"
                    :width="170"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" :icon="Search" @click="ElMessage.success('送出外发列表已刷新')">
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
                :total="opStore.sendOutList.length"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
              />
            </div>

            <div class="gbOperationBtns">
              <div class="left-btn-wrap">
                <div class="btn-group">
                  <el-button size="small" class="btn-green" :icon="Plus" @click="activeTab = 'add'">
                    新增
                  </el-button>
                  <el-button size="small" class="btn-green" :icon="Edit" @click="activeTab = 'add'">
                    修改
                  </el-button>
                  <el-button size="small" type="danger" :icon="Delete" @click="handleDelete">
                    删除
                  </el-button>
                </div>

                <div class="btn-group shortcut-group">
                  <el-button size="small" class="btn-shortcut" @click="updateStatus('已送出')">
                    确认送出
                  </el-button>
                  <el-button size="small" class="btn-shortcut" @click="updateStatus('待送出')">
                    取消送出
                  </el-button>
                  <el-button
                    size="small"
                    class="btn-shortcut"
                    :icon="Printer"
                    @click="handlePrint"
                  >
                    打印送出清单
                  </el-button>
                </div>
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

        <div class="table-wrap">
          <GbTableEngine
            ref="tableEngineRef"
            :table-data="opStore.sendOutList"
            :columns="SENDOUT_COLUMNS"
            :filter-items="SENDOUT_FILTERS"
            storage-key="kebang_sendout_cols_v2"
            :current-page="currentPage"
            :page-size="pageSize"
            @selection-change="rows => (selectedRows = rows)"
          />
        </div>
      </el-tab-pane>

      <!-- 页签2：新增送出外发 (复用双栏穿梭选单引擎) -->
      <el-tab-pane label="新增送出外发" name="add">
        <ShuttleStowageEngine
          :biz-type="7"
          biz-title="送出外发"
          prefix="SC"
          back-route="/operation/outgo/sendout"
        />
      </el-tab-pane>
    </el-tabs>

    <!-- 单据打印预览 -->
    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  Edit,
  Delete,
  Printer,
  Download,
  Lock,
  Setting
} from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { SENDOUT_COLUMNS, SENDOUT_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import { exportTableToCsv } from '@/utils/exportHelper'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'

const opStore = useOperationStore()
const activeTab = ref('list')
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])
const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[]
})

function handleExport() {
  const dataToExport = selectedRows.value.length > 0 ? selectedRows.value : opStore.sendOutList
  exportTableToCsv(dataToExport, SENDOUT_COLUMNS, '星云TMS送出外发台账')
}

function handlePrint() {
  const printData = selectedRows.value.length > 0 ? selectedRows.value : opStore.sendOutList
  printPreviewRef.value?.open('manifest', printData)
}

function handleDelete() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要删除的送出外发批次')
    return
  }
  ElMessageBox.confirm(`确定删除选中的 ${selectedRows.value.length} 个送出批次吗？`, '删除确认', {
    type: 'warning'
  })
    .then(() => {
      const ids = new Set(selectedRows.value.map(r => r.id))
      opStore.sendOutList = opStore.sendOutList.filter(r => !ids.has(r.id))
      tableEngineRef.value?.clearSelection()
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}

function updateStatus(statusLabel: string) {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要操作的送出批次')
    return
  }
  selectedRows.value.forEach(r => {
    r.sStatusStr = statusLabel
  })
  ElMessage.success(`状态已更新为【${statusLabel}】`)
}
</script>

<style scoped>
.sendout-page {
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.sendout-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  min-height: 0;
}
.sendout-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
  background: #f5f7fa;
}
.sendout-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
}
.sendout-tabs :deep(.el-tab-pane) {
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
.funnel-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
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
</style>
