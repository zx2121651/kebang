<template>
  <div class="stock-page">
    <el-tabs v-model="activeTab" type="card" class="stock-tabs">
      <!-- 页签1：发货库存 -->
      <el-tab-pane label="发货库存" name="1">
        <div class="contentBox">
          <div class="gbContainer">
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
                    placeholder="请选择库存网点"
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
                    @click="ElMessage.success('发货库存查询成功')"
                  >
                    查询
                  </el-button>
                </el-form-item>

                <el-form-item>
                  <span class="funnel-trigger" title="高级筛选" @click="sendStockTableRef?.openSeniorFilter()">
                    <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                      <path
                        d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                      />
                    </svg>
                  </span>
                </el-form-item>
              </el-form>

              <GbPager
                :total="sendStockList.length"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
              />
            </div>

            <div class="gbOperationBtns">
              <div class="left-btn-wrap">
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/customRoute/addTranslist')"
                >
                  干线配载
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/customRoute/addStrans')"
                >
                  短途配载
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/operation/outgo/localoutgo')"
                >
                  本地外发
                </el-button>
              </div>

              <div class="right-btn-wrap">
                <el-button size="small" :icon="Download" @click="handleExportSendStock">
                  导出
                </el-button>
                <el-button size="small" :icon="Lock" @click="sendStockTableRef?.saveColumnAppearance()">
                  锁定外观
                </el-button>
                <el-button size="small" :icon="Setting" @click="sendStockTableRef?.openColumnSet()">
                  列设置
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <GbTableEngine
            ref="sendStockTableRef"
            :table-data="sendStockList"
            :columns="STOCK_COLUMNS"
            :filter-items="STOCK_FILTERS"
            storage-key="kebang_stock_send_cols_v2"
            :current-page="currentPage"
            :page-size="pageSize"
            @link-click="row => router.push({ path: '/operation/ship/shipdetail', query: { shipid: row.orderNo, type: 'shipNo' } })"
          />
        </div>
      </el-tab-pane>

      <!-- 页签2：到货库存 -->
      <el-tab-pane label="到货库存" name="2">
        <div class="contentBox">
          <div class="gbContainer">
            <div class="filter-top-row">
              <el-form :inline="true" size="small" class="listForm" @submit.prevent>
                <el-form-item class="dateItem">
                  <el-select v-model="queryForm.timeType" class="width-90">
                    <el-option label="到达日期" :value="1" />
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
                    placeholder="请选择库存网点"
                    :width="170"
                  />
                </el-form-item>

                <el-form-item>
                  <el-button
                    type="primary"
                    :icon="Search"
                    class="btn-save"
                    @click="ElMessage.success('到货库存查询成功')"
                  >
                    查询
                  </el-button>
                </el-form-item>

                <el-form-item>
                  <span class="funnel-trigger" title="高级筛选" @click="arriveStockTableRef?.openSeniorFilter()">
                    <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                      <path
                        d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                      />
                    </svg>
                  </span>
                </el-form-item>
              </el-form>

              <GbPager
                :total="arriveStockList.length"
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
              />
            </div>

            <div class="gbOperationBtns">
              <div class="left-btn-wrap">
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
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/operation/outgo/terminaloutgo')"
                >
                  终端外发
                </el-button>
                <el-button
                  size="small"
                  class="btn-shortcut"
                  @click="router.push('/operation/arrive/signlist?tab=1')"
                >
                  自提签收
                </el-button>
              </div>

              <div class="right-btn-wrap">
                <el-button size="small" :icon="Download" @click="handleExportArriveStock">
                  导出
                </el-button>
                <el-button size="small" :icon="Lock" @click="arriveStockTableRef?.saveColumnAppearance()">
                  锁定外观
                </el-button>
                <el-button size="small" :icon="Setting" @click="arriveStockTableRef?.openColumnSet()">
                  列设置
                </el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <GbTableEngine
            ref="arriveStockTableRef"
            :table-data="arriveStockList"
            :columns="STOCK_COLUMNS"
            :filter-items="STOCK_FILTERS"
            storage-key="kebang_stock_arrive_cols_v2"
            :current-page="currentPage"
            :page-size="pageSize"
            @link-click="row => router.push({ path: '/operation/ship/shipdetail', query: { shipid: row.orderNo, type: 'shipNo' } })"
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
import { Search, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { STOCK_COLUMNS, STOCK_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import { exportTableToCsv } from '@/utils/exportHelper'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'

const router = useRouter()
const opStore = useOperationStore()

const activeTab = ref('1')
const currentPage = ref(1)
const pageSize = ref(100)
const sendStockTableRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const arriveStockTableRef = ref<InstanceType<typeof GbTableEngine> | null>(null)

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

const sendStockList = computed(() =>
  opStore.shipList.filter(r => r.oStatusStr === '已入库' || r.oStatus === 100)
)

const arriveStockList = computed(() =>
  opStore.shipList.filter(r => r.oStatusStr === '已到达' || r.oStatus === 150)
)

function handleExportSendStock() {
  exportTableToCsv(sendStockList.value, STOCK_COLUMNS, '星云TMS发货库存台账')
}

function handleExportArriveStock() {
  exportTableToCsv(arriveStockList.value, STOCK_COLUMNS, '星云TMS到货库存台账')
}
</script>

<style scoped>
.stock-page {
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.stock-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  min-height: 0;
}
.stock-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
  background: #f5f7fa;
}
.stock-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
}
.stock-tabs :deep(.el-tab-pane) {
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
