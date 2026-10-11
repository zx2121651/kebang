<template>
  <div class="customer-autocomplete-wrap" ref="wrapRef">
    <!-- Main Customer Input with 800px Popover -->
    <el-popover
      :visible="popoverVisible"
      placement="bottom-start"
      :width="800"
      popper-class="kb-customer-auto-popper"
      :hide-after="0"
    >
      <template #reference>
        <div class="input-with-icons" @click="onInputFocus">
          <el-input
            ref="inputRef"
            :model-value="modelValue"
            :placeholder="placeholder"
            @update:model-value="onInputChange"
            @focus="onInputFocus"
            @keydown.down.prevent="moveHighlight(1)"
            @keydown.up.prevent="moveHighlight(-1)"
            @keydown.enter.prevent="onEnterKey"
            @keydown.esc="popoverVisible = false"
          />
          <div class="suffix-action-icons">
            <!-- History Records Dialog Trigger -->
            <el-tooltip :content="type === 'shipper' ? '发货历史记录 (双击回填)' : '收货历史记录 (双击回填)'" placement="top">
              <el-icon class="act-icon" @click.stop="openHistoryDialog"><Search /></el-icon>
            </el-tooltip>

            <!-- Smart Address Parse Popover Trigger -->
            <el-popover
              v-model:visible="smartParseVisible"
              placement="bottom-end"
              :width="400"
              trigger="click"
              popper-class="kb-smart-parse-popper"
            >
              <template #reference>
                <el-icon class="act-icon" title="智能地址填写" @click.stop><Setting /></el-icon>
              </template>
              <div class="smart-parse-box">
                <div class="sp-header">
                  <span class="sp-title">智能地址填写 ({{ type === 'shipper' ? '发货方' : '收货方' }})</span>
                  <span class="sp-tip">自动解析姓名、手机、固话、省市区及详细地址</span>
                </div>
                <el-input
                  v-model="smartRawText"
                  type="textarea"
                  :rows="4"
                  placeholder="请粘贴整段地址文本，例如：周建国 13973409988 湖南省衡阳市蒸湘区蔡伦大道66号 衡阳华菱钢管"
                />
                <div class="sp-examples">
                  <span>示例：</span>
                  <el-link type="primary" :underline="false" @click="fillExampleText">填入测试文本</el-link>
                </div>
                <div class="sp-footer">
                  <el-button size="small" @click="smartParseVisible = false">取消</el-button>
                  <el-button size="small" type="primary" @click="handleSmartParse">识别并填充</el-button>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </template>

      <!-- 800px Customer Archive Table Popover -->
      <div class="cust-pop-container" @mousedown.prevent>
        <div class="cust-pop-toolbar">
          <span class="pop-tip">
            支持客户姓名 / 手机号 / 单位 / 拼音首字母联想（共 {{ filteredList.length }} 条匹配，↑↓键切换，Enter选中）
          </span>
          <div class="pop-actions">
            <el-popover placement="bottom-end" :width="200" trigger="click">
              <template #reference>
                <el-button size="small" link type="primary">⚙️ 列设置</el-button>
              </template>
              <div class="col-setting-mini">
                <div class="csm-title">显示列配置</div>
                <el-checkbox v-model="colVisible.name">客户姓名</el-checkbox>
                <el-checkbox v-model="colVisible.phone">手机号码</el-checkbox>
                <el-checkbox v-model="colVisible.tel">座机电话</el-checkbox>
                <el-checkbox v-model="colVisible.unit">客户单位</el-checkbox>
                <el-checkbox v-model="colVisible.region">省市区</el-checkbox>
                <el-checkbox v-model="colVisible.address">详细地址</el-checkbox>
                <el-checkbox v-model="colVisible.idCard">证件号码</el-checkbox>
                <el-checkbox v-model="colVisible.defaultGoods">常发品名</el-checkbox>
              </div>
            </el-popover>
            <el-button size="small" link @click="popoverVisible = false">关闭</el-button>
          </div>
        </div>

        <el-table
          :data="filteredList"
          size="small"
          border
          height="250"
          :row-class-name="tableRowClassName"
          @row-click="selectCustomer"
        >
          <el-table-column type="index" label="#" width="42" align="center" />
          <el-table-column v-if="colVisible.name" prop="name" :label="type === 'shipper' ? '发货方' : '收货方'" width="95" show-overflow-tooltip />
          <el-table-column v-if="colVisible.phone" prop="phone" label="手机号码" width="115" />
          <el-table-column v-if="colVisible.tel" prop="tel" label="座机电话" width="115" show-overflow-tooltip />
          <el-table-column v-if="colVisible.unit" prop="unit" label="客户单位" width="145" show-overflow-tooltip />
          <el-table-column v-if="colVisible.region" label="所在区域" width="150" show-overflow-tooltip>
            <template #default="{ row }">
              {{ [row.province, row.city, row.area].filter(Boolean).join('/') }}
            </template>
          </el-table-column>
          <el-table-column v-if="colVisible.address" prop="address" label="详细地址" min-width="160" show-overflow-tooltip />
          <el-table-column v-if="colVisible.idCard" prop="idCard" label="证件号码" width="150" show-overflow-tooltip />
          <el-table-column v-if="colVisible.defaultGoods" prop="defaultGoodsName" label="常发品名" width="90" show-overflow-tooltip />
        </el-table>
      </div>
    </el-popover>

    <!-- 85% Width Historical Waybill Records Dialog (发货记录 / 收货记录) -->
    <el-dialog
      v-model="historyDialogVisible"
      :title="type === 'shipper' ? '发货记录 (双击行直接回填开单信息)' : '收货记录 (双击行直接回填开单信息)'"
      width="85%"
      top="6vh"
      append-to-body
      destroy-on-close
    >
      <div class="history-filter-bar">
        <el-input
          v-model="historySearchKw"
          placeholder="输入运单号 / 发货方 / 收货方 / 手机号 / 货物名称 快速过滤"
          clearable
          style="width: 340px"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-checkbox v-model="fillWithGoods">回填时同时带入货物名称、包装及结算方式</el-checkbox>
        <span class="history-hint">提示：双击任意历史记录行，即可将该客户的收发货档案一键填入开单界面</span>
      </div>

      <el-table
        :data="historyRecords"
        border
        stripe
        size="small"
        height="420"
        highlight-current-row
        @row-dblclick="onHistoryRowDblClick"
      >
        <el-table-column type="index" label="序号" width="50" align="center" />
        <el-table-column prop="shipOrderNo" label="运单号" width="135" fixed="left" />
        <el-table-column prop="createTime" label="开单时间" width="145" />
        <el-table-column prop="destCity" label="到站城市" width="95" />
        <el-table-column prop="endNetwork" label="终端网点" width="110" />
        <el-table-column prop="shipperName" label="发货方" width="95" />
        <el-table-column prop="shipperMobile" label="发货手机" width="115" />
        <el-table-column prop="shipperUnit" label="发货单位" width="135" show-overflow-tooltip />
        <el-table-column prop="shipperAddress" label="发货地址" width="160" show-overflow-tooltip />
        <el-table-column prop="receiverName" label="收货方" width="95" />
        <el-table-column prop="receiverMobile" label="收货手机" width="115" />
        <el-table-column prop="receiverUnit" label="收货单位" width="135" show-overflow-tooltip />
        <el-table-column prop="receiverAddress" label="收货地址" width="160" show-overflow-tooltip />
        <el-table-column prop="goodsName" label="货物名称" width="105" />
        <el-table-column prop="pack" label="包装" width="70" align="center" />
        <el-table-column prop="num" label="件数" width="65" align="right" />
        <el-table-column prop="weight" label="重量(kg)" width="85" align="right" />
        <el-table-column prop="volume" label="体积(m³)" width="85" align="right" />
        <el-table-column prop="totalFee" label="合计运费" width="90" align="right" />
        <el-table-column prop="payType" label="付款方式" width="85" align="center" />
        <el-table-column label="操作" width="90" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="onHistoryRowDblClick(row)">选择回填</el-button>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button size="small" @click="historyDialogVisible = false">关 闭</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Search, Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useArchiveStore, type CustomerArchiveItem } from '@/store/dictionaryAndArchive'
import { useOperationStore } from '@/store/operation'

const props = withDefaults(defineProps<{
  modelValue: string
  type: 'shipper' | 'receiver'
  destCity?: string
  placeholder?: string
}>(), {
  placeholder: '姓名/首字母/手机号联想'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'select', item: CustomerArchiveItem): void
  (e: 'select-history', row: any, includeGoods: boolean): void
  (e: 'enter-next'): void
}>()

const archiveStore = useArchiveStore()
const opStore = useOperationStore()

const wrapRef = ref<HTMLElement | null>(null)
const inputRef = ref<any>(null)
const popoverVisible = ref(false)
const highlightIndex = ref(0)

const colVisible = reactive({
  name: true,
  phone: true,
  tel: true,
  unit: true,
  region: true,
  address: true,
  idCard: false,
  defaultGoods: true,
})

const filteredList = computed(() => {
  if (props.type === 'shipper') {
    return archiveStore.searchShippers(props.modelValue)
  }
  return archiveStore.searchReceivers(props.modelValue, props.destCity)
})

const onInputFocus = () => {
  highlightIndex.value = 0
  popoverVisible.value = true
}

const onInputChange = (val: string) => {
  emit('update:modelValue', val)
  highlightIndex.value = 0
  popoverVisible.value = true
}

const moveHighlight = (delta: number) => {
  if (!popoverVisible.value) {
    popoverVisible.value = true
    return
  }
  const len = filteredList.value.length
  if (!len) return
  highlightIndex.value = (highlightIndex.value + delta + len) % len
}

const onEnterKey = () => {
  if (popoverVisible.value && filteredList.value.length > 0 && props.modelValue.trim()) {
    const item = filteredList.value[highlightIndex.value] || filteredList.value[0]
    if (item) {
      selectCustomer(item)
      return
    }
  }
  popoverVisible.value = false
  emit('enter-next')
}

const selectCustomer = (item: CustomerArchiveItem) => {
  emit('update:modelValue', item.name)
  emit('select', item)
  popoverVisible.value = false
  emit('enter-next')
}

const tableRowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex === highlightIndex.value ? 'kb-active-suggest-row' : ''
}

// Click outside to close popover
const handleDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!wrapRef.value) return
  if (!wrapRef.value.contains(target) && !target.closest('.kb-customer-auto-popper')) {
    popoverVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleDocClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleDocClick)
})

// Smart Address Parse
const smartParseVisible = ref(false)
const smartRawText = ref('')

const fillExampleText = () => {
  if (props.type === 'shipper') {
    smartRawText.value = '刘志强 13807318899 0731-84456611 湖南省长沙市雨花区万家丽中路一段188号 高桥大市场五金机电城B区12栋'
  } else {
    smartRawText.value = '周建国 13973409988 0734-8823110 湖南省衡阳市蒸湘区蔡伦大道66号 衡阳华菱钢管物流园3号仓'
  }
}

const handleSmartParse = () => {
  if (!smartRawText.value.trim()) {
    ElMessage.warning('请先输入或粘贴需要识别的地址文本')
    return
  }
  const parsed = archiveStore.parseSmartAddressText(smartRawText.value)
  const item: CustomerArchiveItem = {
    id: 'SP-' + Date.now(),
    name: parsed.name || props.modelValue || (props.type === 'shipper' ? '李明' : '张华'),
    pinyin: '',
    phone: parsed.phone || parsed.mobile || '',
    tel: parsed.tel || '',
    unit: parsed.unit || '',
    idCard: '',
    province: parsed.province || '',
    city: parsed.city || '',
    area: parsed.area || '',
    address: parsed.address || parsed.detailAddress || '',
    goodsName: '',
    pack: ''
  }
  emit('update:modelValue', item.name)
  emit('select', item)
  smartParseVisible.value = false
  smartRawText.value = ''
  ElMessage.success('智能地址解析成功，已自动回填字段')
}

// History Dialog
const historyDialogVisible = ref(false)
const historySearchKw = ref('')
const fillWithGoods = ref(true)

const openHistoryDialog = () => {
  popoverVisible.value = false
  historyDialogVisible.value = true
}

const historyRecords = computed(() => {
  const kw = historySearchKw.value.trim().toLowerCase()
  const baseList = (opStore.shipList || []).map((w: any) => ({
    ...w,
    shipOrderNo: w.orderNo || w.shipOrderNo || '',
    createTime: w.shippingDate || w.creationTime || '',
    destCity: w.destCity || '',
    endNetwork: w.destGroup || w.endNetwork || '',
    shipperName: w.shipper || w.shipperName || '',
    shipperMobile: w.shipPhone || w.shipperMobile || '',
    shipperTel: w.shipTel || '',
    shipperUnit: w.shipUnit || w.shipperCompany || '',
    shipperIdCard: w.shipIdCard || '',
    shipperRegion: w.shipAreas || '',
    shipperAddress: w.shipAddress || w.shipperAddress || '',
    receiverName: w.receiver || w.receiverName || '',
    receiverMobile: w.receivePhone || w.receiverMobile || '',
    receiverTel: w.receiveTel || '',
    receiverUnit: w.receiveUnit || w.receiverCompany || '',
    receiverIdCard: w.receiveIdCard || '',
    receiverRegion: w.receiveAreas || '',
    receiverAddress: w.receiveAddress || w.receiverAddress || '',
    goodsName: w.goodsName || '',
    pack: w.pack || '纸箱',
    num: w.numberCount || w.number || 1,
    weight: w.weightCount || w.weight || 0,
    volume: w.volumeCount || w.volume || 0,
    baseFee: w.freight || w.baseFee || 0,
    totalFee: w.fTotal || w.totalFee || 0,
    payType: w.payType || '现付',
  }))
  if (!kw) return baseList
  return baseList.filter((r: any) =>
    r.shipOrderNo.toLowerCase().includes(kw) ||
    r.shipperName.toLowerCase().includes(kw) ||
    r.shipperMobile.includes(kw) ||
    r.receiverName.toLowerCase().includes(kw) ||
    r.receiverMobile.includes(kw) ||
    r.goodsName.toLowerCase().includes(kw)
  )
})

const onHistoryRowDblClick = (row: any) => {
  emit('select-history', row, fillWithGoods.value)
  historyDialogVisible.value = false
  ElMessage.success(`已从历史运单【${row.shipOrderNo}】回填客户信息`)
}

defineExpose({
  focus: () => inputRef.value?.focus?.()
})
</script>

<style scoped lang="scss">
.customer-autocomplete-wrap {
  width: 100%;
}
.input-with-icons {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;

  :deep(.el-input__wrapper) {
    padding-right: 44px !important;
  }

  .suffix-action-icons {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    gap: 4px;
    z-index: 2;

    .act-icon {
      font-size: 13px;
      color: #606266;
      cursor: pointer;
      padding: 2px;
      border-radius: 3px;
      transition: all 0.15s;

      &:hover {
        color: #409eff;
        background: #ecf5ff;
      }
    }
  }
}

.cust-pop-container {
  .cust-pop-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    padding: 0 2px;

    .pop-tip {
      font-size: 12px;
      color: #606266;
    }
    .pop-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}

.col-setting-mini {
  display: flex;
  flex-direction: column;
  gap: 4px;
  .csm-title {
    font-size: 12px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 4px;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 4px;
  }
}

.smart-parse-box {
  .sp-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    .sp-title {
      font-size: 13px;
      font-weight: 600;
      color: #303133;
    }
    .sp-tip {
      font-size: 11px;
      color: #909399;
    }
  }
  .sp-examples {
    margin-top: 6px;
    font-size: 12px;
    color: #909399;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .sp-footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}

.history-filter-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;

  .history-hint {
    margin-left: auto;
    font-size: 12px;
    color: #e6a23c;
  }
}

:deep(.kb-active-suggest-row) {
  background-color: #ecf5ff !important;
  font-weight: 600;
}
</style>
