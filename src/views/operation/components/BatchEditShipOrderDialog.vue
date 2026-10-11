<template>
  <el-dialog
    v-model="visible"
    title="批量改单 (支持表头一键同值填充与逐行精细修改)"
    width="86%"
    top="5vh"
    append-to-body
    destroy-on-close
  >
    <!-- Top Batch Fill Bar -->
    <div class="batch-fill-toolbar">
      <span class="bft-label">快捷批量赋值：</span>
      <el-select v-model="quickField" size="small" style="width: 130px">
        <el-option label="到站城市" value="destCity" />
        <el-option label="终端网点" value="destGroup" />
        <el-option label="交货方式" value="deliveryType" />
        <el-option label="结算方式" value="payType" />
        <el-option label="回单要求" value="receipt" />
        <el-option label="业务员" value="salesMan" />
        <el-option label="备注说明" value="remark" />
      </el-select>
      <el-input v-model="quickVal" size="small" placeholder="输入统一修改后的值" style="width: 190px" />
      <el-button size="small" type="primary" plain @click="applyQuickFill">应用至全部选中行</el-button>
      <span class="bft-tip">当前共选中 <b>{{ editRows.length }}</b> 票运单，修改后将自动生成改单历史流水</span>
    </div>

    <!-- Editable Spreadsheet Table -->
    <el-table :data="editRows" border size="small" height="430">
      <el-table-column type="index" label="#" width="45" align="center" fixed="left" />
      <el-table-column prop="orderNo" label="运单号" width="135" fixed="left" />

      <el-table-column label="到站城市" width="130">
        <template #default="{ row }">
          <el-select v-model="row.destCity" filterable size="small" @change="(v: string) => onRowCityChange(row, v)">
            <el-option v-for="c in archiveStore.cityList" :key="c.code" :label="c.name" :value="c.name" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="终端网点" width="140">
        <template #default="{ row }">
          <el-select v-model="row.destGroup" filterable size="small">
            <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="发货方" width="115">
        <template #default="{ row }">
          <el-input v-model="row.shipper" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="发货手机" width="125">
        <template #default="{ row }">
          <el-input v-model="row.shipPhone" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="收货方" width="115">
        <template #default="{ row }">
          <el-input v-model="row.receiver" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="收货手机" width="125">
        <template #default="{ row }">
          <el-input v-model="row.receivePhone" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="收货地址" width="180">
        <template #default="{ row }">
          <el-input v-model="row.receiveAddress" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="货物名称" width="120">
        <template #default="{ row }">
          <el-input v-model="row.goodsName" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="包装" width="95">
        <template #default="{ row }">
          <el-input v-model="row.pack" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="件数" width="85">
        <template #default="{ row }">
          <el-input v-model.number="row.numberCount" type="number" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="重量(kg)" width="95">
        <template #default="{ row }">
          <el-input v-model.number="row.weightCount" type="number" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="体积(m³)" width="95">
        <template #default="{ row }">
          <el-input v-model.number="row.volumeCount" type="number" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="基本运费" width="100">
        <template #default="{ row }">
          <el-input v-model.number="row.freight" type="number" size="small" @input="recalcRowTotal(row)" />
        </template>
      </el-table-column>

      <el-table-column label="送货费" width="95">
        <template #default="{ row }">
          <el-input v-model.number="row.fDelivery" type="number" size="small" @input="recalcRowTotal(row)" />
        </template>
      </el-table-column>

      <el-table-column prop="fTotal" label="合计运费" width="95" align="right" />

      <el-table-column label="结算方式" width="115">
        <template #default="{ row }">
          <el-select v-model="row.payType" size="small" @change="recalcRowTotal(row)">
            <el-option v-for="p in archiveStore.dictData.payType" :key="p" :label="p" :value="p" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="交货方式" width="115">
        <template #default="{ row }">
          <el-select v-model="row.deliveryType" size="small">
            <el-option v-for="d in archiveStore.dictData.deliveryType" :key="d" :label="d" :value="d" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="回单要求" width="115">
        <template #default="{ row }">
          <el-select v-model="row.receipt" size="small">
            <el-option v-for="r in archiveStore.dictData.receipt" :key="r" :label="r" :value="r" />
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="业务员" width="100">
        <template #default="{ row }">
          <el-input v-model="row.salesMan" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="备注" min-width="150">
        <template #default="{ row }">
          <el-input v-model="row.remark" size="small" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="70" fixed="right" align="center">
        <template #default="{ $index }">
          <el-button size="small" type="danger" link @click="editRows.splice($index, 1)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <template #footer>
      <el-button size="small" @click="visible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmBatchSave">保存批量修改 ({{ editRows.length }}票)</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useArchiveStore } from '@/store/dictionaryAndArchive'
import { useOperationStore } from '@/store/operation'

const archiveStore = useArchiveStore()
const opStore = useOperationStore()

const visible = ref(false)
const editRows = ref<Record<string, any>[]>([])
const quickField = ref('destGroup')
const quickVal = ref('')

const emit = defineEmits<{
  (e: 'saved'): void
}>()

const open = (rows: Record<string, any>[]) => {
  editRows.value = rows.map(r => ({
    ...r,
    orderNo: r.orderNo || r.shipOrderNo,
    destGroup: r.destGroup || r.endNetwork,
    shipper: r.shipper || r.shipperName,
    shipPhone: r.shipPhone || r.shipperMobile,
    receiver: r.receiver || r.receiverName,
    receivePhone: r.receivePhone || r.receiverMobile,
    receiveAddress: r.receiveAddress || r.receiverAddress,
    numberCount: r.numberCount ?? r.num ?? 1,
    weightCount: r.weightCount ?? r.weight ?? 0,
    volumeCount: r.volumeCount ?? r.volume ?? 0,
    freight: r.freight ?? r.baseFee ?? 0,
    fDelivery: r.fDelivery ?? r.deliveryFee ?? 0,
    fTotal: r.fTotal ?? r.totalFee ?? 0,
  }))
  quickVal.value = ''
  visible.value = true
}

const onRowCityChange = (row: Record<string, any>, cityName: string) => {
  const city = archiveStore.cityList.find(c => c.name === cityName)
  if (city) {
    row.destGroup = city.matchedBranch
    row.shippingRouteStr = city.routeType
  }
}

const recalcRowTotal = (row: Record<string, any>) => {
  row.fTotal =
    (Number(row.freight) || 0) +
    (Number(row.fDelivery) || 0) +
    (Number(row.fReceive) || 0) +
    (Number(row.fPremium) || 0)
  if (row.payType === '现付') {
    row.fCash = row.fTotal
    row.fDeliver = 0
  } else if (row.payType === '提付') {
    row.fDeliver = row.fTotal
    row.fCash = 0
  }
}

const applyQuickFill = () => {
  if (!quickVal.value.trim()) {
    ElMessage.warning('请先输入批量填充值')
    return
  }
  editRows.value.forEach((r: any) => {
    r[quickField.value] = quickVal.value.trim()
    if (quickField.value === 'destCity') {
      onRowCityChange(r, quickVal.value.trim())
    }
  })
  ElMessage.success(`已将【${quickVal.value}】批量应用至 ${editRows.value.length} 票运单`)
}

const confirmBatchSave = () => {
  editRows.value.forEach(edited => {
    opStore.updateShipOrder(edited.id, edited, '运单列表批量改单')
  })
  visible.value = false
  emit('saved')
  ElMessage.success(`成功批量修改 ${editRows.value.length} 票运单并记入改单历史`)
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.batch-fill-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 12px;

  .bft-label {
    font-weight: 600;
    color: #303133;
  }

  .bft-tip {
    margin-left: auto;
    color: #606266;
  }
}
</style>
