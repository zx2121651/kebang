<template>
  <el-dialog
    v-model="visible"
    :width="isBatchMode ? '820px' : '720px'"
    top="8vh"
    class="convert-waybill-dialog"
    :show-close="true"
    :close-on-click-modal="false"
    append-to-body
  >
    <template #header>
      <div class="titleBox">
        <span class="title">
          {{ isBatchMode ? `批量转入正式运单（已选 ${batchList.length} 票订单）` : '订单核对转入正式运单' }}
        </span>
      </div>
    </template>

    <!-- 多票批量转入模式 -->
    <div v-if="isBatchMode" class="convert-body" style="padding: 12px 16px;">
      <el-alert
        type="info"
        :closable="false"
        show-icon
        title="系统将按当前运单号规则，为以下勾选的订单自动分配正式运单号并同步至【运单管理】【财务应收】【货款/回单中心】"
        style="margin-bottom: 10px;"
      />
      <el-table :data="batchPreviewList" border stripe size="small" height="270">
        <el-table-column type="index" label="#" width="45" align="center" />
        <el-table-column prop="orderNo" label="源订单号" width="125" />
        <el-table-column prop="upstreamPlatform" label="上游来源平台" min-width="150" show-overflow-tooltip />
        <el-table-column prop="generatedWaybillNo" label="拟生成运单号" width="130">
          <template #default="{ row }">
            <strong style="color: #409eff;">{{ row.generatedWaybillNo }}</strong>
          </template>
        </el-table-column>
        <el-table-column label="运行区间" width="135">
          <template #default="{ row }">{{ row.startGroup }} → {{ row.destCity }}</template>
        </el-table-column>
        <el-table-column prop="goodsName" label="货物名称" min-width="130" show-overflow-tooltip />
        <el-table-column label="件/重/体" width="120">
          <template #default="{ row }">{{ row.number }}件/{{ row.weight }}kg/{{ row.volume }}m³</template>
        </el-table-column>
        <el-table-column prop="fTotal" label="总运费(元)" width="90" align="right">
          <template #default="{ row }">
            <b style="color: #13ce66;">{{ row.fTotal }}</b>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 单票精细核对转入模式 -->
    <div v-else-if="activeOrder" class="convert-body">
      <div class="summary-banner">
        <div>
          <span class="label">源订单号：</span>
          <strong class="val-blue">{{ activeOrder.orderNo }}</strong>
        </div>
        <div v-if="activeOrder.upstreamPlatform">
          <span class="label">上游渠道：</span>
          <el-tag size="small" type="warning" effect="plain">
            {{ activeOrder.upstreamPlatform }} ({{ activeOrder.upstreamOrderNo || activeOrder.orderNo }})
          </el-tag>
        </div>
        <div>
          <span class="label">路由站点：</span>
          <strong>{{ activeOrder.startGroup }} → {{ activeOrder.destCity }}（{{ activeOrder.destGroup }}）</strong>
        </div>
        <div>
          <span class="label">货物汇总：</span>
          <strong>
            {{ activeOrder.goodsName }} / {{ activeOrder.number }}件 / {{ activeOrder.weight }}kg / {{ activeOrder.volume }}m³
          </strong>
        </div>
      </div>

      <el-form :model="form" label-width="92px" size="small" style="padding: 12px 18px 0;">
        <el-row :gutter="14">
          <el-col :span="12">
            <el-form-item label="生成运单号" required>
              <el-input v-model="form.waybillNo" placeholder="自动生成运单号">
                <template #append>
                  <el-button @click="regenerateNo">换号</el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的网点" required>
              <el-select v-model="form.destGroup" filterable allow-create style="width: 100%;">
                <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="发货方信息">
              <el-input :model-value="`${activeOrder.shipper} (${activeOrder.shipPhone}) - ${activeOrder.shipUnit}`" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货方信息">
              <el-input :model-value="`${activeOrder.receiver} (${activeOrder.receivePhone}) - ${activeOrder.receiveUnit}`" disabled />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="交货方式">
              <el-select v-model="form.deliveryMode" style="width: 100%;">
                <el-option label="送货上门" value="送货上门" />
                <el-option label="网点自提" value="网点自提" />
                <el-option label="送货上楼" value="送货上楼" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款方式">
              <el-select v-model="form.paymentMethod" style="width: 100%;">
                <el-option label="现付" value="现付" />
                <el-option label="提付" value="提付" />
                <el-option label="回单付" value="回单付" />
                <el-option label="月结" value="月结" />
                <el-option label="货款扣" value="货款扣" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="代收货款">
              <el-input-number v-model="form.fCollect" :min="0" :controls="false" style="width: 100%;" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="基本运费">
              <el-input-number v-model="form.freight" :min="0" :controls="false" style="width: 100%;" @change="recalcTotal" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="送货费">
              <el-input-number v-model="form.deliveryFee" :min="0" :controls="false" style="width: 100%;" @change="recalcTotal" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合计总运费">
              <el-input-number v-model="form.totalFee" :min="0" :controls="false" style="width: 100%; font-weight: 700;" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="关联车牌">
              <VehiclePopoverInput
                v-model="form.plateNo"
                placeholder="车牌联想"
                @select="onSelectVehicle"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="随车司机">
              <el-input v-model="form.driverName" placeholder="选择车牌自动带出" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机手机">
              <el-input v-model="form.driverPhone" placeholder="司机电话" />
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="转单备注">
              <el-input v-model="form.remark" placeholder="选填转入运单备注信息" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="preservation" style="display: flex; justify-content: center; gap: 12px;">
      <el-button
        v-if="!isBatchMode"
        size="small"
        style="height: 34px; padding: 6px 18px;"
        @click="jumpToAddShipPage"
      >
        带入【录运单】页深度核对
      </el-button>
      <el-button
        size="small"
        class="el-button--save"
        style="background: rgb(79, 119, 203); color: #fff; border-color: rgb(79, 119, 203); height: 34px; padding: 6px 22px;"
        @click="confirmConvert"
      >
        {{ isBatchMode ? `确认批量转入 (${batchList.length} 票)` : '确认直接转入运单' }}
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { OrderRecord } from '@/mock/orderData'
import { useOrderStore } from '@/store/order'
import { useOperationStore } from '@/store/operation'
import { useArchiveStore, VehicleArchive } from '@/store/dictionaryAndArchive'
import { useTagsStore } from '@/store/tags'
import VehiclePopoverInput from '@/views/operation/components/VehiclePopoverInput.vue'

const props = defineProps<{
  modelValue: boolean
  order: (OrderRecord & Record<string, any>) | null
  orders?: (OrderRecord & Record<string, any>)[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'success'): void
}>()

const router = useRouter()
const orderStore = useOrderStore()
const opStore = useOperationStore()
const archiveStore = useArchiveStore()
const tagsStore = useTagsStore()

const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
})

const batchList = computed(() => {
  if (props.orders && props.orders.length > 0) return props.orders
  return props.order ? [props.order] : []
})

const isBatchMode = computed(() => batchList.value.length > 1)
const activeOrder = computed(() => batchList.value[0] || props.order || null)

const batchPreviewList = computed(() => {
  const baseSeq = opStore.shipList.length + 1
  return batchList.value.map((item, idx) => ({
    ...item,
    generatedWaybillNo: `ZB261011${String(baseSeq + idx).padStart(4, '0')}`
  }))
})

const form = reactive({
  waybillNo: '',
  networkName: '总部',
  destGroup: '长沙分部',
  deliveryMode: '送货上门',
  paymentMethod: '现付',
  freight: 0,
  deliveryFee: 0,
  totalFee: 0,
  fCollect: 0,
  plateNo: '',
  driverName: '',
  driverPhone: '',
  salesman: '',
  remark: ''
})

function regenerateNo() {
  const seq = String(opStore.shipList.length + Math.floor(1 + Math.random() * 89)).padStart(4, '0')
  form.waybillNo = `ZB261011${seq}`
}

function recalcTotal() {
  const ord: any = activeOrder.value || {}
  const other = Number(ord.fReceive || 0) + Number(ord.fPremium || 0)
  form.totalFee = Number((Number(form.freight || 0) + Number(form.deliveryFee || 0) + other).toFixed(2))
}

function onSelectVehicle(v: VehicleArchive) {
  form.plateNo = v.plateNo
  form.driverName = v.driverName
  form.driverPhone = v.driverPhone
}

watch(
  () => props.modelValue,
  val => {
    if (val && activeOrder.value) {
      const ord: any = activeOrder.value
      const seq = String(opStore.shipList.length + 1).padStart(4, '0')
      form.waybillNo = `ZB261011${seq}`
      form.networkName = ord.startGroup || ord.openGroup || '总部'
      form.destGroup = ord.destGroup || ord.destName || '长沙分部'
      form.deliveryMode = ord.deliveryType === '自提' ? '网点自提' : '送货上门'
      form.paymentMethod = ord.payType || '现付'
      form.freight = Number(ord.freight ?? ord.freightFee ?? 0)
      form.deliveryFee = Number(ord.fDelivery ?? ord.deliveryFee ?? 0)
      form.totalFee = Number(ord.fTotal ?? ord.totalFee ?? (form.freight + form.deliveryFee))
      form.fCollect = Number(ord.fCollect ?? ord.collectionMoney ?? 0)
      form.plateNo = ord.pickupTruckNo || ''
      form.driverName = ord.pickupDriver || ''
      form.driverPhone = ord.pickupDriverPhone || ''
      form.salesman = ord.salesMan || ord.salesman || '陈静'
      form.remark = ord.remark || ''
    }
  }
)

function convertSingleOrderRecord(ord: any, customForm?: typeof form, waybillNoOverride?: string) {
  const f = customForm || {
    waybillNo: waybillNoOverride || `ZB261011${String(opStore.shipList.length + 1).padStart(4, '0')}`,
    networkName: ord.startGroup || '总部',
    destGroup: ord.destGroup || '长沙分部',
    deliveryMode: ord.deliveryType || '送货上门',
    paymentMethod: ord.payType || '现付',
    freight: Number(ord.freight || 0),
    deliveryFee: Number(ord.fDelivery || 0),
    totalFee: Number(ord.fTotal || 0),
    fCollect: Number(ord.fCollect || 0),
    plateNo: ord.pickupTruckNo || '',
    driverName: ord.pickupDriver || '',
    driverPhone: ord.pickupDriverPhone || '',
    salesman: ord.salesMan || '陈静',
    remark: ord.remark || ''
  }

  const wbNo = f.waybillNo.trim()
  const newShip = opStore.addShipOrder({
    orderNo: wbNo,
    goodsNo: ord.goodsNo || `GH-${wbNo.slice(-4)}-${ord.number || 1}`,
    startGroup: f.networkName || '总部',
    destCity: ord.destCity || ord.endAreaName || '长沙市',
    destGroup: f.destGroup || ord.destGroup || '长沙分部',
    shipper: ord.shipper || ord.consignorName || '',
    shipPhone: ord.shipPhone || ord.consignorMobile || '',
    shipUnit: ord.shipUnit || ord.consignorUnit || '',
    shipAreas: ord.shipAreas || '',
    shipAddress: ord.shipAddress || ord.consignorAddress || '',
    receiver: ord.receiver || ord.consigneeName || '',
    receivePhone: ord.receivePhone || ord.consigneeMobile || '',
    receiveUnit: ord.receiveUnit || ord.consigneeUnit || '',
    receiveAreas: ord.receiveAreas || '',
    receiveAddress: ord.receiveAddress || ord.consigneeAddress || '',
    goodsName: ord.goodsName || ord.cargoName || '普货',
    pack: ord.pack || '纸箱',
    model: ord.model || '标准规',
    numberCount: Number(ord.number || ord.num || 1),
    weightCount: Number(ord.weight || 100),
    volumeCount: Number(ord.volume || 1.2),
    worth: Number(ord.worth || ord.declareValue || 0),
    freight: Number(f.freight || 0),
    fDelivery: Number(f.deliveryFee || 0),
    fReceive: Number(ord.fReceive || 0),
    fPremium: Number(ord.fPremium || 0),
    fTotal: Number(f.totalFee || 0),
    fCash: f.paymentMethod === '现付' ? Number(f.totalFee || 0) : 0,
    fDeliver: f.paymentMethod === '提付' ? Number(f.totalFee || 0) : 0,
    fReceipt: f.paymentMethod === '回单付' ? Number(f.totalFee || 0) : 0,
    fMonth: f.paymentMethod === '月结' ? Number(f.totalFee || 0) : 0,
    fDeduct: f.paymentMethod === '货款扣' ? Number(f.totalFee || 0) : 0,
    fCollect: Number(f.fCollect || 0),
    fcService: Number(ord.fcService || 0),
    payType: f.paymentMethod,
    deliveryType: f.deliveryMode,
    receipt: ord.receipt || ord.receiptRequirement || '签回单',
    plateNo: f.plateNo,
    driverName: f.driverName,
    driverPhone: f.driverPhone,
    salesMan: f.salesman,
    thirdNo: ord.upstreamOrderNo || ord.orderNo,
    remark: f.remark,
    sourceStr: ord.upstreamPlatform ? `上游转入(${ord.upstreamPlatform.slice(0, 6)})` : '订单转入'
  })
  orderStore.markConvertedToWaybill(ord.id, wbNo, newShip.id)
}

function confirmConvert() {
  if (isBatchMode.value) {
    const items = batchPreviewList.value
    for (const item of items) {
      convertSingleOrderRecord(item, undefined, item.generatedWaybillNo)
    }
    ElMessage.success(`已批量将 ${items.length} 票上游订单转入正式运单，并同步至财务/货款/回单中心！`)
    visible.value = false
    emit('success')
    return
  }

  if (!activeOrder.value) return
  if (!form.waybillNo.trim()) {
    ElMessage.warning('请输入生成的运单号')
    return
  }
  convertSingleOrderRecord(activeOrder.value, form)
  ElMessage.success(`订单 ${activeOrder.value.orderNo} 已成功转入正式运单 ${form.waybillNo}！`)
  visible.value = false
  emit('success')
}

function jumpToAddShipPage() {
  if (!activeOrder.value) return
  visible.value = false
  tagsStore.addTag({ path: '/customRoute/addShip', title: '录运单' })
  router.push({
    path: '/customRoute/addShip',
    query: { fromOrderId: activeOrder.value.id, orderNo: activeOrder.value.orderNo }
  })
}
</script>

<style scoped>
.titleBox {
  width: 100%;
  display: flex;
  align-items: center;
}
.titleBox .title {
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}
.convert-body {
  flex: 1;
  overflow-y: auto;
  background: #fff;
}
.summary-banner {
  background: #ecf5ff;
  border-bottom: 1px solid #d9ecff;
  padding: 10px 18px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 20px;
  font-size: 13px;
  color: #303133;
}
.summary-banner .label {
  color: #606266;
}
.summary-banner .val-blue {
  color: #409eff;
}
.preservation {
  text-align: center;
  padding: 10px 0;
  border-top: 1px solid #e8eaec;
  background: #fff;
  flex-shrink: 0;
}
</style>

<style>
.el-dialog.convert-waybill-dialog {
  padding: 0 !important;
  border-radius: 4px !important;
  overflow: hidden !important;
}
.el-dialog.convert-waybill-dialog .el-dialog__header {
  background: #409eff !important;
  padding: 10px 16px !important;
  margin-right: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.el-dialog.convert-waybill-dialog .el-dialog__headerbtn {
  top: 10px !important;
  right: 12px !important;
  width: 24px !important;
  height: 24px !important;
}
.el-dialog.convert-waybill-dialog .el-dialog__headerbtn .el-dialog__close {
  color: #fff !important;
  font-size: 16px !important;
}
.el-dialog.convert-waybill-dialog .el-dialog__body {
  padding: 0 !important;
  height: auto !important;
  max-height: 82vh !important;
  overflow-y: auto !important;
}
</style>
