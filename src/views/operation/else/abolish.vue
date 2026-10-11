<template>
  <div class="listBox">
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 分页 -->
        <div class="filter-top-row">
          <el-form :inline="true" size="small" class="listForm" @submit.prevent>
            <el-form-item class="dateItem">
              <el-select v-model="queryForm.timeType" class="width-90">
                <el-option label="作废日期" :value="1" />
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
              <el-button
                type="primary"
                :icon="Search"
                class="btn-save"
                @click="ElMessage.success('作废运单查询成功')"
              >
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
            :total="opStore.abolishList.length"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
          />
        </div>

        <!-- 第二行：操作按钮栏 (1:1 live_abolish.png) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <el-button size="small" class="btn-green" :icon="RefreshLeft" @click="handleRecover">
              恢复运单
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

    <!-- 作废运单主表格 (50列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="opStore.abolishList"
        :columns="ABOLISH_COLUMNS"
        :filter-items="ABOLISH_FILTERS"
        storage-key="kebang_abolish_cols_v2"
        :current-page="currentPage"
        :page-size="pageSize"
        @selection-change="rows => (selectedRows = rows)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, RefreshLeft, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { ABOLISH_COLUMNS, ABOLISH_FILTERS } from '@/views/operation/components/OperationColumnConfig'
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
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

function handleRecover() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要恢复的作废运单')
    return
  }
  ElMessageBox.confirm(
    `确定恢复选中的 ${selectedRows.value.length} 票作废运单至【运单管理】吗？`,
    '恢复运单确认',
    { type: 'warning' }
  )
    .then(() => {
      opStore.recoverAbolishedShips(selectedRows.value.map(r => r.id))
      tableEngineRef.value?.clearSelection()
      ElMessage.success('运单已恢复至【运单管理】列表')
    })
    .catch(() => {})
}

import { exportTableToCsv } from '@/utils/exportHelper'

function handleExport() {
  exportTableToCsv(
    opStore.abolishList,
    ABOLISH_COLUMNS,
    `星云TMS_作废运单台账_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已导出 ${opStore.abolishList.length} 笔作废运单记录至本地文件`)
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
