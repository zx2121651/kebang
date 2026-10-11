<template>
  <div class="listBox">
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 分页 -->
        <div class="filter-top-row">
          <el-form :inline="true" size="small" class="listForm" @submit.prevent>
            <el-form-item class="dateItem">
              <el-select v-model="queryForm.timeType" class="width-90">
                <el-option label="改单日期" :value="1" />
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
                @click="ElMessage.success('改单历史查询成功')"
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
            :total="opStore.updList.length"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
          />
        </div>

        <!-- 第二行：操作栏 (1:1 live_updlist.png) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap"></div>
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

    <!-- 改单历史主表格 (13列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="opStore.updList"
        :columns="UPDLIST_COLUMNS"
        :filter-items="UPDLIST_FILTERS"
        storage-key="kebang_updlist_cols_v2"
        :current-page="currentPage"
        :page-size="pageSize"
        @link-click="row => router.push({ path: '/operation/ship/shipdetail', query: { shipid: row.orderNo, type: 'shipNo' } })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { UPDLIST_COLUMNS, UPDLIST_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'

const router = useRouter()
const opStore = useOperationStore()
const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const currentPage = ref(1)
const pageSize = ref(100)

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

import { exportTableToCsv } from '@/utils/exportHelper'

function handleExport() {
  exportTableToCsv(
    opStore.updList,
    UPDLIST_COLUMNS,
    `星云TMS_改单历史台账_${new Date().toISOString().slice(0, 10)}`
  )
  ElMessage.success(`已导出 ${opStore.updList.length} 笔改单历史记录至本地文件`)
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
.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
