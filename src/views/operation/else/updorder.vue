<template>
  <div class="upd-order-page">
    <!-- 顶部检索与改单保存栏 (1:1 live_updorder.png) -->
    <div class="upd-search-bar">
      <div class="upd-left">
        <el-select v-model="docType" size="small" style="width: 115px">
          <el-option label="运单" value="运单" />
          <el-option label="干线配载" value="干线配载" />
          <el-option label="短途配载" value="短途配载" />
          <el-option label="到货分拨" value="到货分拨" />
          <el-option label="送货上门" value="送货上门" />
          <el-option label="本地外发" value="本地外发" />
          <el-option label="终端外发" value="终端外发" />
        </el-select>
        <el-autocomplete
          v-model="queryOrderNo"
          size="small"
          :fetch-suggestions="queryOrderSuggestions"
          placeholder="请输入需更改的单号/批次号联想"
          style="width: 220px"
          clearable
          @select="loadWaybill"
          @keyup.enter="loadWaybill"
        />
        <el-button size="small" type="primary" :icon="Search" @click="loadWaybill">
          查询
        </el-button>

        <span class="label" style="margin-left: 16px"><i class="req">*</i>改单原因：</span>
        <el-input
          v-model="updReason"
          size="small"
          placeholder="请输入更改单据原因（记入改单历史）"
          style="width: 260px"
        />
      </div>

      <div class="upd-right">
        <el-button size="small" class="btn-green" :icon="Check" @click="submitUpdOrder">
          保存更改 (F5)
        </el-button>
        <el-button size="small" @click="router.push('/operation/else/updlist')">
          查看改单历史
        </el-button>
      </div>
    </div>

    <!-- 单据可编辑蓝框主体 (1:1 货物托运单改单视图) -->
    <div class="upd-sheet-card">
      <div class="sheet-title">货 物 托 运 单 (更 改 单 据)</div>

      <div class="meta-row">
        <span><strong>当前运单号：</strong>{{ form.orderNo }}</span>
        <span><strong>当前状态：</strong><el-tag size="small">{{ form.oStatusStr }}</el-tag></span>
        <span><strong>原合计运费：</strong><b class="red">¥{{ originalTotal }}</b></span>
        <span><strong>改后合计运费：</strong><b class="blue">¥{{ form.fTotal }}</b></span>
      </div>

      <div class="el-form-box">
        <div class="grid-row cols-5">
          <div class="cell">
            <label>始发网点</label>
            <input v-model="form.startGroup" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>到站城市</label>
            <input v-model="form.destCity" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>运输线路</label>
            <input v-model="form.shippingRouteStr" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>终端网点</label>
            <input v-model="form.destGroup" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>货号</label>
            <input v-model="form.goodsNo" type="text" class="u-input" />
          </div>
        </div>

        <div class="grid-row cols-4">
          <div class="cell">
            <label>发货方</label>
            <input v-model="form.shipper" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>发货手机</label>
            <input v-model="form.shipPhone" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>发货单位</label>
            <input v-model="form.shipUnit" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>发货地址</label>
            <input v-model="form.shipAddress" type="text" class="u-input" />
          </div>
        </div>

        <div class="grid-row cols-4">
          <div class="cell">
            <label>收货方</label>
            <input v-model="form.receiver" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>收货手机</label>
            <input v-model="form.receivePhone" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>收货单位</label>
            <input v-model="form.receiveUnit" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>收货地址</label>
            <input v-model="form.receiveAddress" type="text" class="u-input" />
          </div>
        </div>

        <div class="grid-row cols-6">
          <div class="cell">
            <label>品名</label>
            <input v-model="form.goodsName" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>包装</label>
            <input v-model="form.pack" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>型号</label>
            <input v-model="form.model" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>件数</label>
            <input v-model.number="form.numberCount" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>重量(kg)</label>
            <input v-model.number="form.weightCount" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>体积(m³)</label>
            <input v-model.number="form.volumeCount" type="number" class="u-input" />
          </div>
        </div>

        <div class="grid-row cols-6 fee-bg">
          <div class="cell">
            <label>基本运费</label>
            <input v-model.number="form.freight" type="number" class="u-input" @input="recalc" />
          </div>
          <div class="cell">
            <label>送货费</label>
            <input v-model.number="form.fDelivery" type="number" class="u-input" @input="recalc" />
          </div>
          <div class="cell">
            <label>接货费</label>
            <input v-model.number="form.fReceive" type="number" class="u-input" @input="recalc" />
          </div>
          <div class="cell">
            <label>保险费</label>
            <input v-model.number="form.fPremium" type="number" class="u-input" @input="recalc" />
          </div>
          <div class="cell">
            <label>代收货款</label>
            <input v-model.number="form.fCollect" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>合计运费</label>
            <input v-model.number="form.fTotal" type="number" class="u-input red" />
          </div>
        </div>

        <div class="grid-row cols-6">
          <div class="cell">
            <label>结算方式</label>
            <input v-model="form.payType" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>现付</label>
            <input v-model.number="form.fCash" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>提付</label>
            <input v-model.number="form.fDeliver" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>回单付</label>
            <input v-model.number="form.fReceipt" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>月结</label>
            <input v-model.number="form.fMonth" type="number" class="u-input" />
          </div>
          <div class="cell">
            <label>交货方式</label>
            <input v-model="form.deliveryType" type="text" class="u-input" />
          </div>
        </div>

        <div class="grid-row cols-2">
          <div class="cell">
            <label>回单要求</label>
            <input v-model="form.receipt" type="text" class="u-input" />
          </div>
          <div class="cell">
            <label>备注说明</label>
            <input v-model="form.remark" type="text" class="u-input" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Check } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'

const route = useRoute()
const router = useRouter()
const opStore = useOperationStore()

const docType = ref('运单')
const queryOrderNo = ref('')
const updReason = ref('客户申请调整送货费与收货地址')
const originalTotal = ref(0)

function queryOrderSuggestions(q: string, cb: (list: { value: string; label?: string }[]) => void) {
  const kw = (q || '').trim().toLowerCase()
  const list = opStore.shipList
    .filter(r => !kw || String(r.orderNo || '').toLowerCase().includes(kw) || String(r.shipper || '').includes(kw))
    .map(r => ({ value: r.orderNo, label: `${r.orderNo} (${r.shipper} -> ${r.receiver})` }))
  cb(list)
}

const form = reactive<Record<string, any>>({
  id: '',
  orderNo: '',
  oStatusStr: '已入库',
  startGroup: '总部',
  destCity: '长沙市',
  shippingRouteStr: '广州-长沙专线',
  destGroup: '长沙分部',
  goodsNo: '',
  shipper: '',
  shipPhone: '',
  shipUnit: '',
  shipAddress: '',
  receiver: '',
  receivePhone: '',
  receiveUnit: '',
  receiveAddress: '',
  goodsName: '',
  pack: '',
  model: '',
  numberCount: 0,
  weightCount: 0,
  volumeCount: 0,
  freight: 0,
  fDelivery: 0,
  fReceive: 0,
  fPremium: 0,
  fCollect: 0,
  fTotal: 0,
  payType: '现付',
  fCash: 0,
  fDeliver: 0,
  fReceipt: 0,
  fMonth: 0,
  deliveryType: '送货上门',
  receipt: '',
  remark: ''
})

function loadByRow(row: Record<string, any>) {
  Object.assign(form, JSON.parse(JSON.stringify(row)))
  queryOrderNo.value = row.orderNo
  originalTotal.value = Number(row.fTotal || 0)
}

onMounted(() => {
  const qNo = String(route.query.orderNo || '')
  const found = qNo
    ? opStore.shipList.find(r => r.orderNo === qNo || r.id === qNo)
    : opStore.shipList[0]
  if (found) loadByRow(found)
})

function loadWaybill() {
  const kw = queryOrderNo.value.trim().toLowerCase()
  if (!kw) return
  const found = opStore.shipList.find(r =>
    String(r.orderNo || '').toLowerCase().includes(kw)
  )
  if (found) {
    loadByRow(found)
    ElMessage.success(`已加载运单 ${found.orderNo}`)
  } else {
    ElMessage.warning('未找到该运单号')
  }
}

function recalc() {
  form.fTotal =
    Number(form.freight || 0) +
    Number(form.fDelivery || 0) +
    Number(form.fReceive || 0) +
    Number(form.fPremium || 0)
}

function submitUpdOrder() {
  if (!form.id) {
    ElMessage.warning('请先查询加载需要更改的运单')
    return
  }
  if (!updReason.value.trim()) {
    ElMessage.warning('请填写改单原因')
    return
  }
  opStore.updateShipOrder(form.id, { ...form }, updReason.value)
  originalTotal.value = Number(form.fTotal || 0)
  ElMessage.success('更改单据已保存，并已记入【改单历史】')
}
</script>

<style scoped>
.upd-order-page {
  padding: 8px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 84px);
  box-sizing: border-box;
}
.upd-search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  padding: 8px 12px;
  margin-bottom: 8px;
}
.upd-left,
.upd-right {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}
.req {
  color: #f56c6c;
  font-style: normal;
  margin-right: 2px;
}
.btn-green {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}
.upd-sheet-card {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  padding: 14px;
}
.sheet-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 6px;
  margin-bottom: 10px;
}
.meta-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 8px;
}
.red {
  color: #f56c6c;
}
.blue {
  color: #3888fa;
}
.el-form-box {
  border: 1px solid #78aadd;
  font-size: 12px;
}
.grid-row {
  display: grid;
  border-bottom: 1px solid #a6c8eb;
}
.grid-row:last-child {
  border-bottom: none;
}
.cols-5 {
  grid-template-columns: repeat(5, 1fr);
}
.cols-4 {
  grid-template-columns: repeat(4, 1fr);
}
.cols-6 {
  grid-template-columns: repeat(6, 1fr);
}
.cols-2 {
  grid-template-columns: 1fr 2fr;
}
.fee-bg {
  background-color: #fffdf0;
}
.cell {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 8px;
  border-right: 1px solid #dbe8f7;
}
.cell:last-child {
  border-right: none;
}
.cell label {
  color: #606266;
  margin-right: 6px;
  white-space: nowrap;
}
.u-input {
  flex: 1;
  min-width: 0;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  height: 24px;
  font-size: 12px;
  outline: none;
  background: transparent;
}
.u-input:focus {
  border-bottom-color: #3888fa;
}
</style>
