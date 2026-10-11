<template>
  <div class="payment-engine-page">
    <!-- 顶部代收货款 5 步闭环流转导航条 -->
    <div class="pm-step-bar">
      <div
        v-for="(st, idx) in stepNodes"
        :key="st.key"
        class="step-item"
        :class="{ active: pageKey === st.key }"
        @click="$router.push(st.path)"
      >
        <span class="step-num">{{ idx + 1 }}</span>
        <div class="step-info">
          <div class="step-title">{{ st.title }}</div>
          <div class="step-sub">{{ st.desc }} ({{ st.count }}票)</div>
        </div>
      </div>
    </div>

    <!-- 搜索过滤与动作栏 -->
    <div class="pm-toolbar">
      <div class="left-filters">
        <el-select v-model="filterNetwork" placeholder="开单/到站网点" clearable size="small" style="width: 130px">
          <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
        </el-select>
        <el-input
          v-model="searchKw"
          size="small"
          placeholder="输入运单号 / 发货人 / 收货人 / 银行卡号 检索"
          clearable
          style="width: 260px"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <el-button v-if="isShuttlePage" size="small" type="primary" :icon="Check" @click="openConfirmStageModal">
          {{ stageActionConfig.btnText }} ({{ rightSelectedList.length || leftList.length }}票)
        </el-button>

        <el-button v-if="pageKey === 'pmchange'" size="small" type="warning" :icon="Edit" @click="openChangeCodModal()">
          申请代收货款变更
        </el-button>
        <el-button v-if="pageKey === 'pmcancel'" size="small" type="danger" @click="handleCancelCod">
          取消代收货款 (放货)
        </el-button>
        <el-button v-if="pageKey === 'recovery'" size="small" type="success" @click="handleRecoverCod">
          恢复代收货款状态
        </el-button>
        <el-button size="small" :icon="Download" @click="exportExcel">导出货款台账</el-button>
      </div>

      <div class="right-kpi">
        <span>代收总额：<b class="c-blue">¥ {{ totalCodSum.toLocaleString() }}</b></span>
        <span>手续费：<b class="c-orange">¥ {{ totalFeeSum.toLocaleString() }}</b></span>
        <span>实发金额：<b class="c-green">¥ {{ totalActualSum.toLocaleString() }}</b></span>
      </div>
    </div>

    <!-- A. 左右双表穿梭工作台 (货款收回 / 货款汇出 / 货款到账 / 货款发放) -->
    <div v-if="isShuttlePage" class="pm-shuttle-body">
      <!-- 左表：待处理运单 -->
      <div class="shuttle-pane">
        <div class="pane-header">
          <span class="p-title">待{{ stageActionConfig.shortName }}运单列表 ({{ leftList.length }} 票)</span>
          <div class="p-ops">
            <el-button size="small" type="primary" link @click="moveAllToRight">全部移入右侧 →</el-button>
          </div>
        </div>
        <div class="pane-table">
          <el-table
            :data="leftList"
            border
            stripe
            size="small"
            height="100%"
            show-summary
            @row-dblclick="moveOneToRight"
          >
            <el-table-column type="index" label="#" width="42" align="center" />
            <el-table-column prop="shipOrderNo" label="运单号" width="125" fixed="left" />
            <el-table-column prop="destCity" label="到站" width="80" />
            <el-table-column prop="shipperName" label="发货人" width="80" />
            <el-table-column prop="receiverName" label="收货人" width="80" />
            <el-table-column prop="codAmount" label="代收货款" width="95" align="right" />
            <el-table-column prop="codServiceFee" label="手续费" width="75" align="right" />
            <el-table-column prop="actualPayAmount" label="实发金额" width="95" align="right" />
            <el-table-column prop="bankAccountName" label="开户名" width="80" />
            <el-table-column prop="bankCardNo" label="收款银行卡号" min-width="155" show-overflow-tooltip />
            <el-table-column label="操作" width="65" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="moveOneToRight(row)">移入→</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 右表：本次选定处理清单 -->
      <div class="shuttle-pane right-pane">
        <div class="pane-header">
          <span class="p-title">本次选中待{{ stageActionConfig.shortName }}清单 ({{ rightSelectedList.length }} 票)</span>
          <div class="p-ops">
            <el-button size="small" type="danger" link @click="clearRight">← 全部移回</el-button>
            <el-button size="small" type="success" @click="openConfirmStageModal">
              立即{{ stageActionConfig.shortName }}
            </el-button>
          </div>
        </div>
        <div class="pane-table">
          <el-table
            :data="rightSelectedList"
            border
            stripe
            size="small"
            height="100%"
            show-summary
            @row-dblclick="removeOneFromRight"
          >
            <el-table-column label="操作" width="65" fixed="left" align="center">
              <template #default="{ row }">
                <el-button size="small" type="danger" link @click="removeOneFromRight(row)">←移出</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="shipOrderNo" label="运单号" width="125" />
            <el-table-column prop="shipperName" label="发货人" width="80" />
            <el-table-column prop="codAmount" label="代收货款" width="95" align="right" />
            <el-table-column prop="codServiceFee" label="手续费" width="75" align="right" />
            <el-table-column prop="actualPayAmount" label="实发金额" width="95" align="right" />
            <el-table-column prop="bankName" label="开户银行" min-width="140" show-overflow-tooltip />
            <el-table-column prop="bankCardNo" label="银行卡号" width="160" show-overflow-tooltip />
          </el-table>
        </div>
      </div>
    </div>

    <!-- B. 全宽综合表格 (货款总表 / 货款变更 / 货款恢复 / 货款取消) -->
    <div v-else class="pm-full-table">
      <el-table
        :data="filteredFullList"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="(rows: any[]) => (checkedRows = rows)"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="shipOrderNo" label="运单号" width="135" fixed="left" />
        <el-table-column prop="stage" label="货款阶段" width="95" align="center">
          <template #default="{ row }">
            <el-tag :type="stageTagType(row.stage)" size="small">{{ row.stage }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="opStatus" label="运营状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.opStatus === '正常' ? 'success' : row.opStatus === '已变更' ? 'warning' : 'danger'" size="small">
              {{ row.opStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startNetwork" label="发站网点" width="100" />
        <el-table-column prop="endNetwork" label="到站网点" width="110" />
        <el-table-column prop="shipperName" label="发货方" width="90" />
        <el-table-column prop="shipperMobile" label="发货手机" width="115" />
        <el-table-column prop="receiverName" label="收货方" width="90" />
        <el-table-column prop="receiverMobile" label="收货手机" width="115" />
        <el-table-column prop="goodsName" label="品名" width="95" />
        <el-table-column prop="codAmount" label="代收货款(元)" width="115" align="right" />
        <el-table-column prop="codServiceFee" label="手续费(元)" width="95" align="right" />
        <el-table-column prop="deductFreight" label="货款扣运费" width="100" align="right" />
        <el-table-column prop="actualPayAmount" label="应发净额(元)" width="115" align="right">
          <template #default="{ row }">
            <b style="color: #67c23a">¥ {{ row.actualPayAmount }}</b>
          </template>
        </el-table-column>
        <el-table-column prop="bankAccountName" label="收款户名" width="90" />
        <el-table-column prop="bankName" label="开户银行" width="165" show-overflow-tooltip />
        <el-table-column prop="bankCardNo" label="收款银行卡号" width="165" />
        <el-table-column prop="recoverTime" label="收回时间" width="150" />
        <el-table-column prop="grantTime" label="发放时间" width="150" />
        <el-table-column prop="remark" label="备注说明" min-width="160" show-overflow-tooltip />
        <el-table-column label="操作" width="105" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openChangeCodModal(row)">变更货款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 1：货款阶段流转结算确认窗 -->
    <el-dialog v-model="confirmModalVisible" :title="stageActionConfig.btnText" width="520px" append-to-body>
      <el-form label-width="115px" size="small">
        <el-form-item label="处理运单票数：">
          <el-tag type="primary">{{ pendingConfirmRows.length }} 票</el-tag>
        </el-form-item>
        <el-form-item label="代收货款合计：">
          <b>¥ {{ pendingConfirmRows.reduce((s, r) => s + r.codAmount, 0).toLocaleString() }}</b>
        </el-form-item>
        <el-form-item label="实发净额合计：">
          <b style="font-size: 17px; color: #67c23a">
            ¥ {{ pendingConfirmRows.reduce((s, r) => s + r.actualPayAmount, 0).toLocaleString() }}
          </b>
        </el-form-item>
        <el-form-item label="资金结算账户：">
          <el-select v-model="settleAccount" style="width: 100%">
            <el-option v-for="a in entStore.fundAccounts" :key="a.id" :label="a.accountName" :value="a.accountName" />
          </el-select>
        </el-form-item>
        <el-form-item label="结算方式：">
          <el-radio-group v-model="settleMethod">
            <el-radio label="银企直联代发">银企直联代发</el-radio>
            <el-radio label="银行转账">银行转账</el-radio>
            <el-radio label="微信/POS刷卡">微信/POS刷卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="经办备注：">
          <el-input v-model="settleRemark" placeholder="输入银行回执流水号或说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="confirmModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmExecuteStage">确认{{ stageActionConfig.shortName }}</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗 2：代收货款变更弹窗 -->
    <el-dialog v-model="changeModalVisible" title="代收货款变更申请与审核" width="520px" append-to-body>
      <el-form :model="changeForm" label-width="120px" size="small">
        <el-form-item label="关联运单号：">
          <el-input v-model="changeForm.shipOrderNo" disabled />
        </el-form-item>
        <el-form-item label="原代收货款(元)：">
          <el-input-number v-model="changeForm.oldCodAmount" disabled style="width: 100%" />
        </el-form-item>
        <el-form-item label="新代收货款(元)：">
          <el-input-number v-model="changeForm.newCodAmount" :min="0" :step="500" style="width: 100%" @change="onNewCodChange" />
        </el-form-item>
        <el-form-item label="新货款手续费：">
          <el-input-number v-model="changeForm.newFee" :min="0" :step="5" style="width: 100%" />
        </el-form-item>
        <el-form-item label="收款人开户名：">
          <el-input v-model="changeForm.bankAccountName" />
        </el-form-item>
        <el-form-item label="收款银行卡号：">
          <el-input v-model="changeForm.bankCardNo" />
        </el-form-item>
        <el-form-item label="变更原因说明：">
          <el-input v-model="changeForm.reason" type="textarea" :rows="2" placeholder="请填写发货人授权变更原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="changeModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmChangeCod">保存变更并生效</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Check, Edit, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEnterpriseStore, type GoodsPaymentItem } from '@/store/enterprise'
import { useArchiveStore } from '@/store/dictionaryAndArchive'

const route = useRoute()
const entStore = useEnterpriseStore()
const archiveStore = useArchiveStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'pmback'
})

const isShuttlePage = computed(() => ['pmback', 'pmremit', 'pmaccount', 'pmgrant'].includes(pageKey.value))

const filterNetwork = ref('')
const searchKw = ref('')
const rightIds = ref<string[]>([])
const checkedRows = ref<GoodsPaymentItem[]>([])

watch(pageKey, () => {
  rightIds.value = []
})

const stepNodes = computed(() => [
  {
    key: 'pmback',
    path: '/payment/process/pmback',
    title: '1. 货款收回',
    desc: '终端网点向收货人收款',
    count: entStore.goodsPaymentList.filter(i => i.stage === '未收回').length
  },
  {
    key: 'pmremit',
    path: '/payment/process/pmremit',
    desc: '终端网点汇交总部',
    title: '2. 货款汇出',
    count: entStore.goodsPaymentList.filter(i => i.stage === '已收回').length
  },
  {
    key: 'pmaccount',
    path: '/payment/process/pmaccount',
    title: '3. 货款到账',
    desc: '总部财务确认到账',
    count: entStore.goodsPaymentList.filter(i => i.stage === '已汇出').length
  },
  {
    key: 'pmgrant',
    path: '/payment/process/pmgrant',
    title: '4. 货款发放',
    desc: '打款至发货人银行卡',
    count: entStore.goodsPaymentList.filter(i => i.stage === '已到账').length
  },
  {
    key: 'pmlist',
    path: '/payment/process/pmlist',
    title: '5. 货款总表',
    desc: '全链路代收货款台账',
    count: entStore.goodsPaymentList.length
  }
])

const stageActionConfig = computed(() => {
  const map: Record<string, { sourceStage: GoodsPaymentItem['stage']; targetStage: GoodsPaymentItem['stage']; shortName: string; btnText: string }> = {
    pmback: { sourceStage: '未收回', targetStage: '已收回', shortName: '货款收回', btnText: '确认货款收回' },
    pmremit: { sourceStage: '已收回', targetStage: '已汇出', shortName: '货款汇出', btnText: '确认货款汇出上缴' },
    pmaccount: { sourceStage: '已汇出', targetStage: '已到账', shortName: '货款到账', btnText: '确认总部货款到账' },
    pmgrant: { sourceStage: '已到账', targetStage: '已发放', shortName: '货款发放', btnText: '确认发放货款至客户卡' }
  }
  return map[pageKey.value] || map.pmback
})

const baseFiltered = computed(() => {
  const kw = searchKw.value.trim().toLowerCase()
  return entStore.goodsPaymentList.filter(item => {
    if (filterNetwork.value && item.startNetwork !== filterNetwork.value && item.endNetwork !== filterNetwork.value) return false
    if (kw && !`${item.shipOrderNo}${item.shipperName}${item.receiverName}${item.bankCardNo}`.toLowerCase().includes(kw)) return false
    return true
  })
})

const leftList = computed(() =>
  baseFiltered.value.filter(i => i.stage === stageActionConfig.value.sourceStage && !rightIds.value.includes(i.id))
)

const rightSelectedList = computed(() =>
  entStore.goodsPaymentList.filter(i => rightIds.value.includes(i.id))
)

const filteredFullList = computed(() => {
  if (pageKey.value === 'recovery') {
    const cancelled = baseFiltered.value.filter(i => i.opStatus === '已取消')
    return cancelled.length ? cancelled : baseFiltered.value
  }
  return baseFiltered.value
})

const totalCodSum = computed(() => baseFiltered.value.reduce((s, i) => s + i.codAmount, 0))
const totalFeeSum = computed(() => baseFiltered.value.reduce((s, i) => s + i.codServiceFee, 0))
const totalActualSum = computed(() => baseFiltered.value.reduce((s, i) => s + i.actualPayAmount, 0))

const moveOneToRight = (row: GoodsPaymentItem) => {
  if (!rightIds.value.includes(row.id)) rightIds.value.push(row.id)
}
const removeOneFromRight = (row: GoodsPaymentItem) => {
  rightIds.value = rightIds.value.filter(id => id !== row.id)
}
const moveAllToRight = () => {
  leftList.value.forEach(r => {
    if (!rightIds.value.includes(r.id)) rightIds.value.push(r.id)
  })
}
const clearRight = () => {
  rightIds.value = []
}

const confirmModalVisible = ref(false)
const settleAccount = ref('工商银行广州白云基本户')
const settleMethod = ref('银企直联代发')
const settleRemark = ref('')

const pendingConfirmRows = computed(() =>
  rightSelectedList.value.length ? rightSelectedList.value : leftList.value
)

const openConfirmStageModal = () => {
  if (!pendingConfirmRows.value.length) {
    ElMessage.warning(`当前没有待${stageActionConfig.value.shortName}的运单`)
    return
  }
  settleRemark.value = `${stageActionConfig.value.shortName}核销通过`
  confirmModalVisible.value = true
}

const confirmExecuteStage = () => {
  const ids = pendingConfirmRows.value.map(r => r.id)
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const count = entStore.advancePaymentStage(ids, stageActionConfig.value.targetStage, settleRemark.value)

  // 当处于"货款发放"给发货客户阶段时，从选定的资金账户扣减打款金额，并生成付款单凭证
  if (stageActionConfig.value.targetStage === '已发放') {
    const totalActual = pendingConfirmRows.value.reduce((s, r) => s + r.actualPayAmount, 0)
    const acc = entStore.fundAccounts.find(a => a.accountName === settleAccount.value) || entStore.fundAccounts[0]
    if (acc) {
      acc.periodExpense += totalActual
      acc.currentBalance -= totalActual
    }
    const voucherNo = `FK${Date.now().toString().slice(-9)}`
    entStore.settlementVouchers.unshift({
      id: voucherNo,
      voucherNo,
      voucherType: '付款单',
      targetName: pendingConfirmRows.value[0]?.shipperName || '发货客户代收货款发放',
      feeCategory: '代收货款发放',
      amount: totalActual,
      payMethod: (settleMethod.value as any) || '银行转账',
      fundAccount: settleAccount.value,
      bankCardNo: pendingConfirmRows.value[0]?.bankCardNo || '-',
      operator: 'admin',
      auditStatus: '已审核',
      createTime: now,
      remark: `批量代收货款打款发放(${count}票): ${settleRemark.value}`
    })
  }

  // 记录操作日志
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '货款中心',
    actionType: stageActionConfig.value.shortName,
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: `HK${Date.now().toString().slice(-6)}`,
    detail: `${stageActionConfig.value.shortName}：处理 ${count} 票代收货款，流转至【${stageActionConfig.value.targetStage}】，账户：${settleAccount.value}`,
    costMs: '42ms',
    operTime: now
  })

  rightIds.value = []
  confirmModalVisible.value = false
  ElMessage.success(`操作成功！已完成 ${count} 票运单【${stageActionConfig.value.shortName}】，流转至【${stageActionConfig.value.targetStage}】阶段`)
}

// 货款变更 / 取消 / 恢复
const changeModalVisible = ref(false)
const changeForm = reactive({
  id: '',
  shipOrderNo: '',
  oldCodAmount: 0,
  newCodAmount: 0,
  newFee: 0,
  bankAccountName: '',
  bankCardNo: '',
  reason: '发货客户申请调整代收货款金额'
})

const openChangeCodModal = (row?: GoodsPaymentItem) => {
  const target = row || checkedRows.value[0] || entStore.goodsPaymentList[0]
  if (!target) return
  changeForm.id = target.id
  changeForm.shipOrderNo = target.shipOrderNo
  changeForm.oldCodAmount = target.codAmount
  changeForm.newCodAmount = target.codAmount
  changeForm.newFee = target.codServiceFee
  changeForm.bankAccountName = target.bankAccountName
  changeForm.bankCardNo = target.bankCardNo
  changeModalVisible.value = true
}

const onNewCodChange = (val: number | undefined) => {
  const v = Number(val) || 0
  changeForm.newFee = Math.round(v * 0.005)
}

const confirmChangeCod = () => {
  const item = entStore.goodsPaymentList.find(i => i.id === changeForm.id)
  if (item) {
    item.codAmount = changeForm.newCodAmount
    item.codServiceFee = changeForm.newFee
    item.actualPayAmount = Math.max(0, changeForm.newCodAmount - changeForm.newFee - item.deductFreight)
    item.bankAccountName = changeForm.bankAccountName
    item.bankCardNo = changeForm.bankCardNo
    item.opStatus = '已变更'
    item.remark = `货款变更: ¥${changeForm.oldCodAmount} -> ¥${changeForm.newCodAmount} (${changeForm.reason})`
  }
  changeModalVisible.value = false
  ElMessage.success(`运单【${changeForm.shipOrderNo}】代收货款变更已生效`)
}

const handleCancelCod = () => {
  const targets = checkedRows.value.length ? checkedRows.value : entStore.goodsPaymentList.slice(0, 1)
  targets.forEach(t => {
    t.opStatus = '已取消'
    t.remark = '发货人授权取消代收货款，允许无款放货'
  })
  ElMessage.success(`已取消 ${targets.length} 票运单的代收货款`)
}

const handleRecoverCod = () => {
  const targets = checkedRows.value.length
    ? checkedRows.value
    : entStore.goodsPaymentList.filter(i => i.opStatus !== '正常')
  targets.forEach(t => {
    t.opStatus = '正常'
    t.remark = '已恢复正常代收货款管控状态'
  })
  ElMessage.success(`已恢复 ${targets.length || 1} 票运单的代收货款状态`)
}

const stageTagType = (st: string) => {
  if (st === '已发放') return 'success'
  if (st === '已到账') return 'primary'
  if (st === '已汇出' || st === '已收回') return 'warning'
  return 'danger'
}

import { exportTableToCsv } from '@/utils/exportHelper'

const exportExcel = () => {
  const cols = [
    { prop: 'shipOrderNo', label: '运单号' },
    { prop: 'stage', label: '流转阶段' },
    { prop: 'codAmount', label: '代收货款(元)' },
    { prop: 'codServiceFee', label: '手续费(元)' },
    { prop: 'actualPayAmount', label: '实发金额(元)' },
    { prop: 'startNetwork', label: '始发网点' },
    { prop: 'destCity', label: '到站' },
    { prop: 'shipperName', label: '发货人' },
    { prop: 'shipperMobile', label: '发货手机' },
    { prop: 'receiverName', label: '收货人' },
    { prop: 'receiverMobile', label: '收货手机' },
    { prop: 'goodsName', label: '品名' },
    { prop: 'num', label: '件数' },
    { prop: 'bankName', label: '开户银行' },
    { prop: 'bankAccountName', label: '开户名' },
    { prop: 'bankCardNo', label: '银行卡号' },
    { prop: 'createTime', label: '开单时间' },
    { prop: 'recoverTime', label: '收回时间' },
    { prop: 'remitTime', label: '汇出时间' },
    { prop: 'accountTime', label: '到账时间' },
    { prop: 'grantTime', label: '发放时间' },
    { prop: 'remark', label: '备注' }
  ]
  exportTableToCsv(`代收货款台账_${new Date().toISOString().slice(0, 10)}`, baseFiltered.value, cols)
  ElMessage.success(`已成功导出 ${baseFiltered.value.length} 笔代收货款明细到本地文件`)
}
</script>

<style scoped lang="scss">
.payment-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.pm-step-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  .step-item {
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      border-color: #409eff;
    }
    &.active {
      background: #ecf5ff;
      border-color: #409eff;
      .step-num {
        background: #409eff;
        color: #fff;
      }
      .step-title {
        color: #409eff;
      }
    }
    .step-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f0f2f5;
      color: #606266;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .step-info {
      .step-title {
        font-size: 13px;
        font-weight: 700;
        color: #303133;
      }
      .step-sub {
        font-size: 11px;
        color: #909399;
      }
    }
  }
}
.pm-toolbar {
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
  .right-kpi {
    display: flex;
    gap: 16px;
    font-size: 13px;
    .c-blue { color: #409eff; }
    .c-orange { color: #e6a23c; }
    .c-green { color: #67c23a; }
  }
}
.pm-shuttle-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  overflow: hidden;
  .shuttle-pane {
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .pane-header {
      padding: 8px 12px;
      background: #f8faff;
      border-bottom: 1px solid #ebeef5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .p-title {
        font-size: 13px;
        font-weight: 700;
        color: #303133;
      }
      .p-ops {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
    .pane-table {
      flex: 1;
      overflow: hidden;
    }
  }
}
.pm-full-table {
  flex: 1;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}
</style>
