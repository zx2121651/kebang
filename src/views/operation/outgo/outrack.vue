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
              <el-select
                v-model="queryForm.typeStr"
                clearable
                placeholder="请选择中转类型"
                style="width: 150px"
              >
                <el-option label="本地外发" value="本地外发" />
                <el-option label="终端外发" value="终端外发" />
              </el-select>
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.startGroups"
                placeholder="请选择中转网点"
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

        <!-- 第二行：操作按钮栏 (1:1 live_outrack.png) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <el-button size="small" class="btn-green" :icon="Plus" @click="openTrackModal">
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

    <!-- 外发跟踪主表格 (76列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="filteredTableData"
        :columns="OUTRACK_COLUMNS"
        :filter-items="OUTRACK_FILTERS"
        :is-multiple="false"
        storage-key="kebang_outrack_cols_v2"
        :current-page="currentPage"
        :page-size="pageSize"
        @selection-change="rows => (selectedRows = rows)"
        @link-click="openTrackForRow"
        @row-dblclick="openTrackForRow"
      />
    </div>

    <!-- 外发跟踪信息弹窗 -->
    <el-dialog v-model="trackVisible" title="外发中转跟踪信息" width="740px" draggable>
      <div v-if="activeRow">
        <el-descriptions :column="3" border size="small" style="margin-bottom: 12px">
          <el-descriptions-item label="运单号">{{ activeRow.orderNo }}</el-descriptions-item>
          <el-descriptions-item label="中转类型">{{ activeRow.typeStr }}</el-descriptions-item>
          <el-descriptions-item label="承运公司">{{ activeRow.carrierName }}</el-descriptions-item>
          <el-descriptions-item label="中转单号">{{ activeRow.switchNo }}</el-descriptions-item>
          <el-descriptions-item label="本地电话">{{ activeRow.localPhone }}</el-descriptions-item>
          <el-descriptions-item label="提货电话">{{ activeRow.takePhone }}</el-descriptions-item>
        </el-descriptions>

        <el-form :inline="true" size="small" style="margin-bottom: 10px">
          <el-form-item label="跟踪备注">
            <el-input v-model="newTrackContent" placeholder="请输入外发中转跟踪进展" style="width: 340px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitOutgoTrack">保存跟踪</el-button>
          </el-form-item>
        </el-form>

        <el-table :data="activeRow.tracks || []" size="small" border stripe height="200">
          <el-table-column type="index" label="序号" width="55" align="center" />
          <el-table-column prop="trackingTime" label="跟踪时间" width="160" />
          <el-table-column prop="trackCreator" label="跟踪人" width="95" />
          <el-table-column prop="content" label="跟踪详情" min-width="260" />
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, Plus, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { OUTRACK_COLUMNS, OUTRACK_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import { exportTableToCsv } from '@/utils/exportHelper'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'

const opStore = useOperationStore()
const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const currentPage = ref(1)
const pageSize = ref(100)
const selectedRows = ref<Record<string, any>[]>([])

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  typeStr: '',
  startGroups: ['hq'] as string[]
})

const filteredTableData = computed(() => {
  let list = [...opStore.outgoList]
  if (queryForm.typeStr) {
    list = list.filter(r => r.typeStr === queryForm.typeStr)
  }
  return list
})

function handleSearch() {
  currentPage.value = 1
  ElMessage.success('外发跟踪查询成功')
}

function handleExport() {
  const dataToExport = selectedRows.value.length > 0 ? selectedRows.value : filteredTableData.value
  exportTableToCsv(dataToExport, OUTRACK_COLUMNS, '星云TMS外发中转跟踪台账')
}

const trackVisible = ref(false)
const activeRow = ref<Record<string, any> | null>(null)
const newTrackContent = ref('')

function openTrackModal() {
  const row = selectedRows.value[0] || filteredTableData.value[0]
  if (!row) {
    ElMessage.warning('请选择需要跟踪的外发记录')
    return
  }
  openTrackForRow(row)
}

function openTrackForRow(row: Record<string, any>) {
  activeRow.value = row
  newTrackContent.value = ''
  trackVisible.value = true
}

function submitOutgoTrack() {
  if (!activeRow.value || !newTrackContent.value.trim()) {
    ElMessage.warning('请输入跟踪内容')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  if (!activeRow.value.tracks) activeRow.value.tracks = []
  activeRow.value.tracks.unshift({
    id: `OTK-${Date.now()}`,
    trackingTime: now,
    trackCreator: '管理员',
    content: newTrackContent.value
  })
  activeRow.value.trackCount = activeRow.value.tracks.length
  activeRow.value.trackCreator = '管理员'
  activeRow.value.trackingTime = now
  activeRow.value.bz = newTrackContent.value
  newTrackContent.value = ''
  ElMessage.success('外发跟踪记录已保存')
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
.right-btn-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.btn-green {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}
.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
