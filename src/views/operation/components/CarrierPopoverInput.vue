<template>
  <div class="carrier-popover-wrap" ref="wrapRef">
    <el-popover
      :visible="popoverVisible"
      placement="bottom-start"
      :width="560"
      popper-class="kb-carrier-auto-popper"
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

      <div class="carrier-pop-box" @mousedown.prevent>
        <div class="carrier-pop-header">
          <span>承运商档案联想（支持名称 / 拼音首字母 / 电话 / 城市检索，↑↓选择 Enter确认）</span>
          <el-button size="small" link @click="popoverVisible = false">关闭</el-button>
        </div>
        <el-table
          :data="filteredCarriers"
          size="small"
          border
          height="210"
          :row-class-name="rowClassName"
          @row-click="selectCarrier"
        >
          <el-table-column prop="name" label="承运单位名称" width="145" show-overflow-tooltip />
          <el-table-column prop="localPhone" label="本地电话" width="120" />
          <el-table-column prop="pickPhone" label="提货电话" width="120" />
          <el-table-column prop="contactMan" label="联系人" width="75" />
          <el-table-column prop="city" label="城市" width="75" />
        </el-table>
      </div>
    </el-popover>
  </div>
</template>

<script setup="ts" lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useArchiveStore, type CarrierArchiveItem } from '@/store/dictionaryAndArchive'

const props = withDefaults(defineProps<{
  modelValue: string
  placeholder?: string
}>(), {
  placeholder: '承运单位/拼音检索'
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'select', item: CarrierArchiveItem): void
  (e: 'enter-next'): void
}>()

const archiveStore = useArchiveStore()
const wrapRef = ref<HTMLElement | null>(null)
const inputRef = ref<any>(null)
const popoverVisible = ref(false)
const highlightIndex = ref(0)

const filteredCarriers = computed(() => archiveStore.searchCarriers(props.modelValue))

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
  const len = filteredCarriers.value.length
  if (!len) return
  highlightIndex.value = (highlightIndex.value + delta + len) % len
}

const onEnter = () => {
  if (popoverVisible.value && filteredCarriers.value.length > 0) {
    const item = filteredCarriers.value[highlightIndex.value] || filteredCarriers.value[0]
    if (item) {
      selectCarrier(item)
      return
    }
  }
  popoverVisible.value = false
  emit('enter-next')
}

const selectCarrier = (item: CarrierArchiveItem) => {
  emit('update:modelValue', item.name)
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
  if (!wrapRef.value.contains(target) && !target.closest('.kb-carrier-auto-popper')) {
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
.carrier-popover-wrap {
  width: 100%;
}
.carrier-pop-box {
  .carrier-pop-header {
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
