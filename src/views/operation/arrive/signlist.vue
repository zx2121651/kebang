<template>
  <div class="sign-manage-page">
    <el-tabs v-model="activeTab" type="card" class="sign-tabs">
      <!-- 前4个页签：自提签收 / 直送签收 / 送货签收 / 外发签收 (双栏穿梭选单 1:1 live_signlist.png) -->
      <el-tab-pane
        v-for="tab in shuttleTabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <div class="shuttle-top-box">
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
                  @click="ElMessage.success(`${tab.label}待签收列表已刷新`)"
                >
                  查询
                </el-button>
              </el-form-item>

              <el-form-item>
                <span class="funnel-trigger" title="高级筛选" @click="leftTableRef?.openSeniorFilter()">
                  <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                    <path
                      d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                    />
                  </svg>
                </span>
              </el-form-item>
            </el-form>

            <GbPager
              :total="leftPendingList.length"
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
            />
          </div>

          <div class="shuttle-action-row">
            <div class="shuttle-left-acts">
              <span class="quick-label">快速跳转</span>
              <el-input
                v-model="quickJumpNo"
                size="small"
                placeholder="输入运单号回车移入右侧"
                style="width: 190px"
                clearable
                @keyup.enter="handleQuickJump"
              />
              <el-button size="small" type="primary" @click="openSignModal(tab.label)">
                下一步 ({{ tab.label }})
              </el-button>
              <el-button size="small" class="btn-green" @click="moveAllToRight">
                全部移入 &gt;&gt;
              </el-button>
              <el-button size="small" type="warning" @click="moveAllToLeft">
                &lt;&lt; 全部移出
              </el-button>
            </div>

            <div class="shuttle-right-acts">
              <el-button size="small" :icon="Lock" @click="leftTableRef?.saveColumnAppearance()">
                保存外观
              </el-button>
              <el-button size="small" :icon="Setting" @click="leftTableRef?.openColumnSet()">
                左列设置
              </el-button>
              <el-button size="small" :icon="Setting" @click="rightTableRef?.openColumnSet()">
                右列设置
              </el-button>
            </div>
          </div>
        </div>

        <div class="shuttle-split-wrap">
          <div class="shuttle-pane">
            <div class="pane-header">
              <span>待{{ tab.label }}运单 ({{ leftPendingList.length }} 票)</span>
              <span class="pane-tip">双击行移入右侧签收</span>
            </div>
            <GbTableEngine
              ref="leftTableRef"
              :table-data="leftPendingList"
              :columns="SHUTTLE_WAYBILL_COLUMNS"
              :filter-items="SHUTTLE_WAYBILL_FILTERS"
              :storage-key="`kebang_sign_left_${tab.name}_v2`"
              @row-dblclick="row => selectedIds.add(row.id)"
            />
          </div>

          <div class="shuttle-divider">||</div>

          <div class="shuttle-pane">
            <div class="pane-header right-header">
              <span>已选待签收运单 ({{ rightSelectedList.length }} 票)</span>
              <span class="pane-tip">双击行移回左侧</span>
            </div>
            <GbTableEngine
              ref="rightTableRef"
              :table-data="rightSelectedList"
              :columns="SHUTTLE_WAYBILL_COLUMNS"
              :filter-items="SHUTTLE_WAYBILL_FILTERS"
              :storage-key="`kebang_sign_right_${tab.name}_v2`"
              @row-dblclick="row => selectedIds.delete(row.id)"
            />
          </div>
        </div>
      </el-tab-pane>

      <!-- 第5个页签：签收列表 -->
      <el-tab-pane label="签收列表" name="5">
        <div class="shuttle-top-box">
          <div class="filter-top-row">
            <el-form :inline="true" size="small" class="listForm" @submit.prevent>
              <el-form-item class="dateItem">
                <el-select v-model="queryForm.timeType" class="width-90">
                  <el-option label="签收日期" :value="1" />
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
                <NetworkTreeSelect v-model="queryForm.startGroups" placeholder="请选择始发网点" :width="170" />
              </el-form-item>
              <el-form-item>
                <NetworkTreeSelect v-model="queryForm.destGroups" placeholder="请选择签收网点" :width="170" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :icon="Search" @click="ElMessage.success('签收列表已刷新')">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
            <GbPager :total="signedList.length" />
          </div>

          <div class="shuttle-action-row">
            <div class="shuttle-left-acts">
              <el-button size="small" class="btn-green" :icon="Edit" @click="openEditSign">
                修改签收
              </el-button>
              <el-button size="small" type="danger" @click="cancelSigned">
                取消签收
              </el-button>
            </div>
            <div class="shuttle-right-acts">
              <el-button size="small" :icon="Download" @click="handleExportSigned">
                导出
              </el-button>
              <el-button size="small" :icon="Setting" @click="signedTableRef?.openColumnSet()">
                列设置
              </el-button>
            </div>
          </div>
        </div>

        <div class="table-wrap">
          <GbTableEngine
            ref="signedTableRef"
            :table-data="signedList"
            :columns="SHIPLIST_COLUMNS"
            :filter-items="SHIPLIST_FILTERS"
            storage-key="kebang_signlist_tab5_v2"
            @selection-change="rows => (checkedSignedRows = rows)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 签收登记弹窗 -->
    <el-dialog v-model="signModalVisible" :title="signModalTitle" width="480px" draggable>
      <el-form :model="signForm" label-width="90px" size="small">
        <el-form-item label="签收人" required>
          <el-input v-model="signForm.signPerson" placeholder="请输入签收人姓名" />
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input v-model="signForm.signCardId" placeholder="请输入签收人身份证号" />
        </el-form-item>
        <el-form-item label="签收时间">
          <el-date-picker
            v-model="signForm.signDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="签收类型">
          <el-select v-model="signForm.signType" style="width: 100%">
            <el-option label="正常签收" value="正常签收" />
            <el-option label="异常签收" value="异常签收" />
            <el-option label="他人代签" value="他人代签" />
          </el-select>
        </el-form-item>
        <el-form-item label="签收备注">
          <el-input v-model="signForm.signRemark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="signModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSignSubmit">确定签收</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Edit, Download, Lock, Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import {
  SHUTTLE_WAYBILL_COLUMNS,
  SHUTTLE_WAYBILL_FILTERS,
  SHIPLIST_COLUMNS,
  SHIPLIST_FILTERS
} from '@/views/operation/components/OperationColumnConfig'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'

const route = useRoute()
const opStore = useOperationStore()

const shuttleTabs = [
  { name: '1', label: '自提签收' },
  { name: '2', label: '直送签收' },
  { name: '3', label: '送货签收' },
  { name: '4', label: '外发签收' }
]

const activeTab = ref(String(route.query.tab || '1'))
watch(
  () => route.query.tab,
  (val) => {
    if (val) activeTab.value = String(val)
  }
)
const currentPage = ref(1)
const pageSize = ref(100)
const quickJumpNo = ref('')

const leftTableRef = ref<any>(null)
const rightTableRef = ref<any>(null)
const signedTableRef = ref<any>(null)

const queryForm = reactive({
  timeType: 1,
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: ['hq'] as string[],
  destGroups: [] as string[]
})

const selectedIds = ref<Set<string>>(new Set())
const checkedSignedRows = ref<Record<string, any>[]>([])

const leftPendingList = computed(() =>
  opStore.shipList.filter(r => r.oStatusStr !== '已签收' && !selectedIds.value.has(r.id))
)
const rightSelectedList = computed(() =>
  opStore.shipList.filter(r => selectedIds.value.has(r.id))
)
const signedList = computed(() =>
  opStore.shipList.filter(r => r.oStatusStr === '已签收')
)

function moveAllToRight() {
  leftPendingList.value.forEach(r => selectedIds.value.add(r.id))
}

function moveAllToLeft() {
  selectedIds.value.clear()
}

function handleQuickJump() {
  const kw = quickJumpNo.value.trim().toLowerCase()
  if (!kw) return
  const found = leftPendingList.value.find(r =>
    String(r.orderNo || '').toLowerCase().includes(kw)
  )
  if (found) {
    selectedIds.value.add(found.id)
    quickJumpNo.value = ''
    ElMessage.success(`已移入运单 ${found.orderNo}`)
  } else {
    ElMessage.warning('未找到匹配的待签收运单')
  }
}

const signModalVisible = ref(false)
const signModalTitle = ref('自提签收登记')
const signForm = reactive({
  signPerson: '',
  signCardId: '',
  signDate: '2026-10-11 11:00:00',
  signType: '正常签收',
  signRemark: ''
})

function openSignModal(label: string) {
  if (rightSelectedList.value.length === 0 && leftPendingList.value.length > 0) {
    selectedIds.value.add(leftPendingList.value[0].id)
  }
  const first = rightSelectedList.value[0]
  signModalTitle.value = `${label}登记`
  signForm.signPerson = first?.receiver || ''
  signForm.signCardId = first?.receiveIdCard || ''
  signForm.signDate = new Date().toISOString().replace('T', ' ').slice(0, 19)
  signForm.signRemark = `${label}正常签收`
  signModalVisible.value = true
}

import { useEnterpriseStore } from '@/store/enterprise'

const entStore = useEnterpriseStore()

function confirmSignSubmit() {
  if (!signForm.signPerson.trim()) {
    ElMessage.warning('请输入签收人姓名')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const orderNos = rightSelectedList.value.map(r => r.orderNo)

  rightSelectedList.value.forEach(r => {
    r.oStatus = 200
    r.oStatusStr = '已签收'
    r.signPerson = signForm.signPerson
    r.signCardId = signForm.signCardId
    r.signDate = signForm.signDate
    r.signRemark = signForm.signRemark
  })

  // 同步货款中心：该笔运单的代收货款变更为【已收回】
  entStore.goodsPaymentList.forEach(item => {
    if (orderNos.includes(item.shipOrderNo)) {
      item.stage = '已收回'
      item.recoverTime = now
      item.remark = `${item.remark ? item.remark + '；' : ''}运单已完成签收，款项已由网点收回`
    }
  })

  // 同步回单管理：回单状态变更为【已签收】
  entStore.receiptList.forEach(item => {
    if (orderNos.includes(item.shipOrderNo)) {
      item.stage = '已签收'
      item.signTime = now
      item.signer = signForm.signPerson
      item.remark = `${item.remark ? item.remark + '；' : ''}客户已签收原件回单`
    }
  })

  // 记录系统操作日志
  entStore.operLogs.unshift({
    id: `OL-${Date.now()}`,
    module: '营运中心-签收管理',
    actionType: '签收录入',
    operator: 'admin (管理员)',
    network: '总部',
    ip: '113.108.221.45',
    targetNo: orderNos.join(','),
    detail: `完成 ${orderNos.length} 票运单的【${signModalTitle.value}】，签收人：${signForm.signPerson}，同步更新代收货款与回单台账`,
    costMs: '35ms',
    operTime: now
  })

  selectedIds.value.clear()
  signModalVisible.value = false
  ElMessage.success(`成功完成 ${orderNos.length} 票运单签收，代收货款已标记收回，回单已更新！`)
}

function openEditSign() {
  if (checkedSignedRows.value.length !== 1) {
    ElMessage.warning('请勾选 1 条已签收记录进行修改')
    return
  }
  const row = checkedSignedRows.value[0]
  selectedIds.value.add(row.id)
  signModalTitle.value = '修改签收信息'
  signForm.signPerson = row.signPerson || row.receiver || ''
  signForm.signCardId = row.signCardId || ''
  signForm.signDate = row.signDate || '2026-10-11 11:00:00'
  signForm.signRemark = row.signRemark || ''
  signModalVisible.value = true
}

function cancelSigned() {
  if (checkedSignedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要取消签收的运单')
    return
  }
  checkedSignedRows.value.forEach(r => {
    r.oStatus = 150
    r.oStatusStr = '已到达'
  })
  ElMessage.success('已取消签收，运单恢复为【已到达】状态')
}

import { exportTableToCsv } from '@/utils/exportHelper'

function handleExportSigned() {
  exportTableToCsv(
    `星云TMS_已签收运单台账_${new Date().toISOString().slice(0, 10)}`,
    signedList.value,
    SHIPLIST_COLUMNS.map((c: any) => ({ prop: c.prop, label: c.label }))
  )
  ElMessage.success(`已成功导出 ${signedList.value.length} 笔已签收单据至本地文件`)
}
</script>

<style scoped>
.sign-manage-page {
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.sign-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  min-height: 0;
}
.sign-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
  background: #f5f7fa;
}
.sign-tabs :deep(.el-tabs__content) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 8px;
}
.sign-tabs :deep(.el-tab-pane) {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  height: 100%;
}
.shuttle-top-box {
  border: 1px solid #dcdfe6;
  border-bottom: none;
  padding: 6px 10px;
  background: #ffffff;
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
.shuttle-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid #f0f2f5;
}
.shuttle-left-acts,
.shuttle-right-acts {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.quick-label {
  font-size: 12px;
  color: #606266;
  font-weight: 600;
}
.btn-green {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}
.shuttle-split-wrap {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}
.shuttle-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.pane-header {
  height: 28px;
  padding: 0 10px;
  background: #eef5fe;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: #3888fa;
}
.pane-header.right-header {
  background: #f0f9eb;
  color: #24b678;
}
.pane-tip {
  font-weight: normal;
  color: #909399;
  font-size: 11px;
}
.shuttle-divider {
  width: 10px;
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909399;
  font-size: 10px;
}
.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
</style>
