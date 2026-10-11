<template>
  <div class="vehicle-popover-wrap" ref="wrapRef">
    <el-popover
      :visible="popoverVisible"
      placement="bottom-start"
      :width="520"
      popper-class="kb-vehicle-auto-popper"
      :hide-after="0"
    >
      <template #reference>
        <div @click="onFocus">
          <el-input
            ref="inputRef"
            :model-value="modelValue"
            :placeholder="placeholder"
            clearable
            @update:model-value="onInput"
            @focus="onFocus"
            @keydown.down.prevent="moveHighlight(1)"
            @keydown.up.prevent="moveHighlight(-1)"
            @keydown.enter.prevent="onEnter"
            @keydown.esc="popoverVisible = false"
          />
        </div>
      </template>

      <div class="veh-pop-box" @mousedown.prevent>
        <div class="veh-pop-header">
          <span>车辆档案联想（支持车牌号 / 司机姓名 / 手机号 / 拼音检索，↑↓选择 Enter确认）</span>
          <el-button size="small" link @click="popoverVisible = false">关闭</el-button>
        </div>
        <el-table
          :data="filteredVehicles"
          size="small"
          border
          height="220"
          :row-class-name="rowClassName"
          @row-click="selectVehicle"
        >
          <el-table-column prop="plateNo" label="车牌号码" width="105" />
          <el-table-column prop="plateColor" label="车牌颜色" width="75" align="center" />
          <el-table-column prop="driverName" label="随车司机" width="85" />
          <el-table-column prop="driverPhone" label="司机电话" width="115" />
          <el-table-column prop="carType" label="车型" width="90" show-overflow-tooltip />
          <el-table-column prop="bankName" label="开户银行" min-width="110" show-overflow-tooltip />
        </el-table>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useArchiveStore, type VehicleArchiveItem } from '@/store/dictionaryAndArchive'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: '车牌号/司机/拼音联想'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'select', item: VehicleArchiveItem): void
  (e: 'enter-next'): void
}>()

const archiveStore = useArchiveStore()
const wrapRef = ref<HTMLElement | null>(null)
const inputRef = ref<any>(null)
const popoverVisible = ref(false)
const highlightIndex = ref(0)

const filteredVehicles = computed(() => archiveStore.searchVehicles(props.modelValue))

const onFocus = () => {
  highlightIndex.value = 0
  popoverVisible.value = true
}

const onInput = (val: string) => {
  emit('update:modelValue', val)
  highlightIndex.value = 0
  popoverVisible.value = true
}

const moveHighlight = (delta: number) => {
  if (!popoverVisible.value) {
    popoverVisible.value = true
    return
  }
  const len = filteredVehicles.value.length
  if (!len) return
  highlightIndex.value = (highlightIndex.value + delta + len) % len
}

const onEnter = () => {
  if (popoverVisible.value && filteredVehicles.value.length > 0) {
    const item = filteredVehicles.value[highlightIndex.value] || filteredVehicles.value[0]
    if (item) {
      selectVehicle(item)
      return
    }
  }
  popoverVisible.value = false
  emit('enter-next')
}

const selectVehicle = (item: VehicleArchiveItem) => {
  emit('update:modelValue', item.plateNo)
  emit('select', item)
  popoverVisible.value = false
  emit('enter-next')
}

const rowClassName = ({ rowIndex }: { rowIndex: number }) => {
  return rowIndex === highlightIndex.value ? 'kb-active-suggest-row' : ''
}

const handleDocClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!wrapRef.value) return
  if (!wrapRef.value.contains(target) && !target.closest('.kb-vehicle-auto-popper')) {
    popoverVisible.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleDocClick))

defineExpose({
  focus: () => inputRef.value?.focus?.()
})
</script>

<style scoped lang="scss">
.vehicle-popover-wrap {
  width: 100%;
}
.veh-pop-box {
  .veh-pop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    color: #606266;
    margin-bottom: 6px;
  }
}
:deep(.kb-active-suggest-row) {
  background-color: #ecf5ff !important;
  font-weight: 600;
}
</style>
