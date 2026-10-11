<template>
  <div class="receipt-engine-page">
    <!-- 顶部回单 5 步流转导航条 -->
    <div class="rcp-step-bar">
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

    <!-- 工具栏 -->
    <div class="rcp-toolbar">
      <div class="left-filters">
        <el-select v-model="filterNetwork" placeholder="网点过滤" clearable size="small" style="width: 130px">
          <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
        </el-select>
        <el-input
          v-model="searchKw"
          size="small"
          placeholder="输入运单号 / 回单号 / 发货方 / 收货方 / 快递单号"
          clearable
          style="width: 260px"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <el-button v-if="isShuttlePage" size="small" type="primary" :icon="Check" @click="openConfirmModal">
          {{ stageActionConfig.btnText }} ({{ rightSelectedList.length || leftList.length }}票)
        </el-button>
        <el-button size="small" :icon="Download" @click="exportExcel">导出回单台账</el-button>
      </div>

      <div class="right-kpi">
        <span>回单总票数：<b>{{ baseFiltered.length }} 票</b></span>
        <span>总份数：<b style="color: #409eff">{{ baseFiltered.reduce((s, r) => s + r.receiptCount, 0) }} 份</b></span>
      </div>
    </div>

    <!-- A. 左右双表穿梭工作台 (回单签收 / 回单寄回 / 回单接收 / 回单返厂) -->
    <div v-if="isShuttlePage" class="rcp-shuttle-body">
      <div class="shuttle-pane">
        <div class="pane-header">
          <span class="p-title">待{{ stageActionConfig.shortName }}运单列表 ({{ leftList.length }} 票)</span>
          <el-button size="small" type="primary" link @click="moveAllToRight">全部移入右侧 →</el-button>
        </div>
        <div class="pane-table">
          <el-table :data="leftList" border stripe size="small" height="100%" @row-dblclick="moveOneToRight">
            <el-table-column type="index" label="#" width="42" align="center" />
            <el-table-column prop="shipOrderNo" label="运单号" width="125" fixed="left" />
            <el-table-column prop="receiptNo" label="回单号" width="115" />
            <el-table-column prop="receiptReq" label="回单要求" width="85" align="center" />
            <el-table-column prop="receiptCount" label="份数" width="60" align="center" />
            <el-table-column prop="destCity" label="到站" width="80" />
            <el-table-column prop="shipperName" label="发货方" width="80" />
            <el-table-column prop="receiverName" label="收货方" width="80" />
            <el-table-column prop="goodsName" label="品名" min-width="95" />
            <el-table-column label="操作" width="65" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="moveOneToRight(row)">移入→</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="shuttle-pane">
        <div class="pane-header">
          <span class="p-title">本次待{{ stageActionConfig.shortName }}清单 ({{ rightSelectedList.length }} 票)</span>
          <div>
            <el-button size="small" type="danger" link @click="rightIds = []">← 全部移回</el-button>
            <el-button size="small" type="success" @click="openConfirmModal">立即{{ stageActionConfig.shortName }}</el-button>
          </div>
        </div>
        <div class="pane-table">
          <el-table :data="rightSelectedList" border stripe size="small" height="100%" @row-dblclick="removeOneFromRight">
            <el-table-column label="操作" width="65" fixed="left" align="center">
              <template #default="{ row }">
                <el-button size="small" type="danger" link @click="removeOneFromRight(row)">←移出</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="shipOrderNo" label="运单号" width="125" />
            <el-table-column prop="receiptNo" label="回单号" width="115" />
            <el-table-column prop="receiptReq" label="回单要求" width="85" />
            <el-table-column prop="shipperName" label="发货方" width="80" />
            <el-table-column prop="receiverName" label="收货方" width="80" />
            <el-table-column prop="remark" label="回单备注" min-width="140" show-overflow-tooltip />
          </el-table>
        </div>
      </div>
    </div>

    <!-- B. 回单总表 -->
    <div v-else class="rcp-full-table">
      <el-table :data="baseFiltered" border stripe size="small" height="100%" show-summary>
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="shipOrderNo" label="运单号" width="135" fixed="left" />
        <el-table-column prop="receiptNo" label="回单编号" width="125" />
        <el-table-column prop="stage" label="当前状态" width="95" align="center">
          <template #default="{ row }">
            <el-tag :type="row.stage === '已返厂' ? 'success' : row.stage === '未签收' ? 'danger' : 'primary'" size="small">
              {{ row.stage }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="receiptReq" label="回单要求" width="95" align="center" />
        <el-table-column prop="receiptCount" label="份数" width="65" align="right" />
        <el-table-column prop="startNetwork" label="始发网点" width="100" />
        <el-table-column prop="endNetwork" label="终端网点" width="110" />
        <el-table-column prop="shipperName" label="发货方" width="90" />
        <el-table-column prop="receiverName" label="收货方" width="90" />
        <el-table-column prop="goodsName" label="品名" width="100" />
        <el-table-column prop="num" label="件数" width="70" align="right" />
        <el-table-column prop="signer" label="签收人" width="85" />
        <el-table-column prop="signTime" label="签收时间" width="150" />
        <el-table-column prop="expressCompany" label="寄回快递" width="100" />
        <el-table-column prop="expressNo" label="寄回快递单号" width="145" />
        <el-table-column prop="receiveTime" label="总部接收时间" width="150" />
        <el-table-column prop="returnFactoryTime" label="返厂时间" width="150" />
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
        <el-table-column label="电子影像" width="105" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openImagePreview(row)">查看回单照片</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 1：回单流转确认窗 -->
    <el-dialog v-model="confirmModalVisible" :title="stageActionConfig.btnText" width="500px" append-to-body>
      <el-form :model="confirmForm" label-width="115px" size="small">
        <el-form-item label="处理回单票数：">
          <el-tag type="primary">{{ pendingRows.length }} 票</el-tag>
        </el-form-item>
        <el-form-item v-if="pageKey === 'rcpsign'" label="客户签收人：">
          <el-input v-model="confirmForm.signer" placeholder="输入签收人姓名或身份证号" />
        </el-form-item>
        <template v-if="pageKey === 'rcpback'">
          <el-form-item label="寄回快递公司：">
            <el-select v-model="confirmForm.expressCompany" style="width: 100%">
              <el-option label="顺丰速运" value="顺丰速运" />
              <el-option label="中通快递" value="中通快递" />
              <el-option label="圆通速递" value="圆通速递" />
              <el-option label="随班车文件袋" value="随班车文件袋" />
            </el-select>
          </el-form-item>
          <el-form-item label="寄回快递单号：">
            <el-input v-model="confirmForm.expressNo" placeholder="输入快递单号或车牌批次" />
          </el-form-item>
        </template>
        <el-form-item label="流转备注：">
          <el-input v-model="confirmForm.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="confirmModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="executeReceiptStage">确认提交</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗 2：电子回单高清影像预览 -->
    <el-dialog v-model="imagePreviewVisible" title="电子回单签收联高清影像件" width="600px" append-to-body>
      <div v-if="previewRow" class="receipt-paper-mock">
        <div class="rp-stamp">已签收归档</div>
        <div class="rp-title">科邦智联物流 · 客户签收回单联 (原件扫描件)</div>
        <div class="rp-grid">
          <div><b>托运单号：</b>{{ previewRow.shipOrderNo }}</div>
          <div><b>回单编号：</b>{{ previewRow.receiptNo }}</div>
          <div><b>发站 → 到站：</b>{{ previewRow.startNetwork }} → {{ previewRow.destCity }} ({{ previewRow.endNetwork }})</div>
          <div><b>回单要求：</b>{{ previewRow.receiptReq }} ({{ previewRow.receiptCount }}份)</div>
          <div><b>发货客户：</b>{{ previewRow.shipperName }} ({{ previewRow.shipperMobile }})</div>
          <div><b>收货客户：</b>{{ previewRow.receiverName }} ({{ previewRow.receiverMobile }})</div>
          <div><b>货物明细：</b>{{ previewRow.goodsName }} / {{ previewRow.num }} 件</div>
          <div><b>签收状态：</b>{{ previewRow.stage }}</div>
        </div>
        <div class="rp-sign-box">
          <div>收货单位盖章 / 签收人手写签名：<b>{{ previewRow.signer || previewRow.receiverName }}</b></div>
          <div>签收时间：{{ previewRow.signTime || '2026-04-10 15:20:00' }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Check, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEnterpriseStore, type ReceiptRecord } from '@/store/enterprise'
import { useArchiveStore } from '@/store/dictionaryAndArchive'

const route = useRoute()
const entStore = useEnterpriseStore()
const archiveStore = useArchiveStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'rcpsign'
})

const isShuttlePage = computed(() => ['rcpsign', 'rcpback', 'rcpreceive', 'rcpfactory'].includes(pageKey.value))

const filterNetwork = ref('')
const searchKw = ref('')
const rightIds = ref<string[]>([])

watch(pageKey, () => {
  rightIds.value = []
})

const stepNodes = computed(() => [
  { key: 'rcpsign', path: '/receipt/process/rcpsign', title: '1. 回单签收', desc: '终端客户签字盖章', count: entStore.receiptList.filter(i => i.stage === '未签收').length },
  { key: 'rcpback', path: '/receipt/process/rcpback', title: '2. 回单寄回', desc: '终端寄回始发网点', count: entStore.receiptList.filter(i => i.stage === '已签收').length },
  { key: 'rcpreceive', path: '/receipt/process/rcpreceive', title: '3. 回单接收', desc: '始发网点确认接收', count: entStore.receiptList.filter(i => i.stage === '已寄回').length },
  { key: 'rcpfactory', path: '/receipt/process/rcpfactory', title: '4. 回单返厂', desc: '返还发货客户归档', count: entStore.receiptList.filter(i => i.stage === '已接收').length },
  { key: 'rcplist', path: '/receipt/process/rcplist', title: '5. 回单总表', desc: '全流程回单追踪', count: entStore.receiptList.length }
])

const stageActionConfig = computed(() => {
  const map: Record<string, { sourceStage: ReceiptRecord['stage']; targetStage: ReceiptRecord['stage']; shortName: string; btnText: string }> = {
    rcpsign: { sourceStage: '未签收', targetStage: '已签收', shortName: '回单签收', btnText: '确认回单签收' },
    rcpback: { sourceStage: '已签收', targetStage: '已寄回', shortName: '回单寄回', btnText: '确认回单寄回总部' },
    rcpreceive: { sourceStage: '已寄回', targetStage: '已接收', shortName: '回单接收', btnText: '确认总部接收回单' },
    rcpfactory: { sourceStage: '已接收', targetStage: '已返厂', shortName: '回单返厂', btnText: '确认回单返厂交客户' }
  }
  return map[pageKey.value] || map.rcpsign
})

const baseFiltered = computed(() => {
  const kw = searchKw.value.trim().toLowerCase()
  return entStore.receiptList.filter(item => {
    if (filterNetwork.value && item.startNetwork !== filterNetwork.value && item.endNetwork !== filterNetwork.value) return false
    if (kw && !`${item.shipOrderNo}${item.receiptNo}${item.shipperName}${item.receiverName}${item.expressNo || ''}`.toLowerCase().includes(kw)) return false
    return true
  })
})

const leftList = computed(() =>
  baseFiltered.value.filter(i => i.stage === stageActionConfig.value.sourceStage && !rightIds.value.includes(i.id))
)

const rightSelectedList = computed(() =>
  entStore.receiptList.filter(i => rightIds.value.includes(i.id))
)

const moveOneToRight = (row: ReceiptRecord) => {
  if (!rightIds.value.includes(row.id)) rightIds.value.push(row.id)
}
const removeOneFromRight = (row: ReceiptRecord) => {
  rightIds.value = rightIds.value.filter(id => id !== row.id)
}
const moveAllToRight = () => {
  leftList.value.forEach(r => {
    if (!rightIds.value.includes(r.id)) rightIds.value.push(r.id)
  })
}

const confirmModalVisible = ref(false)
const confirmForm = reactive({
  signer: '客户本人签章',
  expressCompany: '顺丰速运',
  expressNo: 'SF14309988271',
  remark: '回单联原件核验无误'
})

const pendingRows = computed(() => (rightSelectedList.value.length ? rightSelectedList.value : leftList.value))

const openConfirmModal = () => {
  if (!pendingRows.value.length) {
    ElMessage.warning(`当前没有待${stageActionConfig.value.shortName}的回单`)
    return
  }
  confirmModalVisible.value = true
}

const executeReceiptStage = () => {
  const ids = pendingRows.value.map(r => r.id)
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const count = entStore.advanceReceiptStage(ids, stageActionConfig.value.targetStage, confirmForm)

  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '回单中心',
    actionType: stageActionConfig.value.shortName,
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: `HD${Date.now().toString().slice(-6)}`,
    detail: `${stageActionConfig.value.shortName}：处理 ${count} 份回单，流转至【${stageActionConfig.value.targetStage}】`,
    costMs: '33ms',
    operTime: now
  })

  rightIds.value = []
  confirmModalVisible.value = false
  ElMessage.success(`已完成 ${count} 票运单【${stageActionConfig.value.shortName}】`)
}

const imagePreviewVisible = ref(false)
const previewRow = ref<ReceiptRecord | null>(null)
const openImagePreview = (row: ReceiptRecord) => {
  previewRow.value = row
  imagePreviewVisible.value = true
}

import { exportTableToCsv } from '@/utils/exportHelper'

const exportExcel = () => {
  const cols = [
    { prop: 'shipOrderNo', label: '运单号' },
    { prop: 'receiptNo', label: '回单编号' },
    { prop: 'stage', label: '流转状态' },
    { prop: 'receiptReq', label: '回单要求' },
    { prop: 'receiptCount', label: '份数' },
    { prop: 'startNetwork', label: '始发网点' },
    { prop: 'destCity', label: '到站' },
    { prop: 'endNetwork', label: '终端网点' },
    { prop: 'shipperName', label: '发货方' },
    { prop: 'receiverName', label: '收货方' },
    { prop: 'goodsName', label: '品名' },
    { prop: 'num', label: '件数' },
    { prop: 'signer', label: '签收人' },
    { prop: 'signTime', label: '签收时间' },
    { prop: 'expressCompany', label: '寄回快递' },
    { prop: 'expressNo', label: '寄回快递单号' },
    { prop: 'sendBackTime', label: '寄出时间' },
    { prop: 'receiveTime', label: '总部接收时间' },
    { prop: 'returnFactoryTime', label: '返厂时间' },
    { prop: 'remark', label: '备注' }
  ]
  exportTableToCsv(`回单管理台账_${new Date().toISOString().slice(0, 10)}`, baseFiltered.value, cols)
  ElMessage.success(`已成功导出 ${baseFiltered.value.length} 份回单台账到本地文件`)
}
</script>

<style scoped lang="scss">
.receipt-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.rcp-step-bar {
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
    &.active {
      background: #ecf5ff;
      border-color: #409eff;
      .step-num { background: #409eff; color: #fff; }
      .step-title { color: #409eff; }
    }
    .step-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #f0f2f5;
      font-weight: 700;
      font-size: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .step-title { font-size: 13px; font-weight: 700; color: #303133; }
    .step-sub { font-size: 11px; color: #909399; }
  }
}
.rcp-toolbar {
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-filters { display: flex; align-items: center; gap: 8px; }
  .right-kpi { display: flex; gap: 16px; font-size: 13px; }
}
.rcp-shuttle-body {
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
      .p-title { font-size: 13px; font-weight: 700; }
    }
    .pane-table { flex: 1; overflow: hidden; }
  }
}
.rcp-full-table {
  flex: 1;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}
.receipt-paper-mock {
  border: 2px solid #303133;
  padding: 20px;
  background: #fffdf8;
  position: relative;
  .rp-stamp {
    position: absolute;
    right: 28px;
    top: 22px;
    border: 3px solid #f56c6c;
    color: #f56c6c;
    padding: 4px 12px;
    font-weight: 800;
    font-size: 16px;
    transform: rotate(-12deg);
    border-radius: 4px;
  }
  .rp-title {
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 16px;
    border-bottom: 1px dashed #909399;
    padding-bottom: 10px;
  }
  .rp-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    font-size: 13px;
    margin-bottom: 18px;
  }
  .rp-sign-box {
    border-top: 1px solid #dcdfe6;
    padding-top: 12px;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
}
</style>
