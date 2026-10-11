<template>
  <el-popover
    placement="bottom-start"
    :width="Math.max(width || 170, 200)"
    trigger="click"
    popper-class="network-tree-popper"
  >
    <template #reference>
      <div class="down-tree-select" :style="{ width: (width || 170) + 'px' }">
        <div class="down-tree-tags">
          <span v-if="displayLabels.length === 0" class="placeholder">{{ placeholder || '请选择' }}</span>
          <template v-else>
            <span class="net-tag">
              <span class="net-tag-text">{{ displayLabels[0] }}</span>
              <i class="net-tag-close" @click.stop="clearSelection">×</i>
            </span>
            <span v-if="displayLabels.length > 1" class="net-tag more">
              +{{ displayLabels.length - 1 }}
            </span>
          </template>
        </div>
        <el-icon class="down-tree-arrow"><ArrowDown /></el-icon>
      </div>
    </template>
    <div class="down-tree-panel">
      <div class="check-all-row">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          size="small"
          @change="handleCheckAll"
        >
          全选
        </el-checkbox>
      </div>
      <el-tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="modelValue"
        :props="{ label: 'name', children: 'childs' }"
        @check="handleTreeCheck"
      />
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { NETWORK_TREE_LIST } from '@/mock/orderData'

const props = withDefaults(
  defineProps<{
    modelValue: string[]
    placeholder?: string
    width?: number
  }>(),
  {
    modelValue: () => [],
    placeholder: '请选择',
    width: 170
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', val: string[]): void
  (e: 'change', val: string[]): void
}>()

const treeRef = ref<any>(null)
const treeData = ref(NETWORK_TREE_LIST)

const allNodes = [
  { id: 'hq', name: '总部' },
  ...(NETWORK_TREE_LIST[0]?.childs || []).map(c => ({ id: c.id, name: c.name }))
]
const allIds = allNodes.map(n => n.id)
const idToName: Record<string, string> = Object.fromEntries(allNodes.map(n => [n.id, n.name]))

const checkAll = ref(props.modelValue.length >= allIds.length || props.modelValue.includes('hq'))
const isIndeterminate = computed(() => {
  const len = props.modelValue.length
  return len > 0 && len < allIds.length && !props.modelValue.includes('hq')
})

const displayLabels = computed(() => {
  if (props.modelValue.includes('hq') || props.modelValue.length === allIds.length) {
    return ['总部']
  }
  return props.modelValue.map(id => idToName[id] || id).filter(Boolean)
})

watch(
  () => props.modelValue,
  val => {
    checkAll.value = val.length >= allIds.length || val.includes('hq')
    if (treeRef.value) {
      treeRef.value.setCheckedKeys(val.includes('hq') ? allIds : val)
    }
  }
)

function handleCheckAll(val: any) {
  const next = val ? [...allIds] : []
  emit('update:modelValue', next)
  emit('change', next)
  if (treeRef.value) {
    treeRef.value.setCheckedKeys(next)
  }
}

function handleTreeCheck(_node: any, checkedInfo: { checkedKeys: string[] }) {
  emit('update:modelValue', checkedInfo.checkedKeys)
  emit('change', checkedInfo.checkedKeys)
}

function clearSelection() {
  emit('update:modelValue', [])
  emit('change', [])
  if (treeRef.value) {
    treeRef.value.setCheckedKeys([])
  }
}
</script>

<style scoped>
.down-tree-select {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  background: #fff;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 12px;
  line-height: 22px;
  vertical-align: middle;
}
.down-tree-select:hover {
  border-color: #c0c4cc;
}
.down-tree-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  flex: 1;
}
.down-tree-tags .placeholder {
  color: #a8abb2;
  font-size: 12px;
  white-space: nowrap;
}
.net-tag {
  display: inline-flex;
  align-items: center;
  height: 18px;
  padding: 0 5px;
  background-color: #f0f2f5;
  border: 1px solid #e9e9eb;
  border-radius: 2px;
  color: #909399;
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
}
.net-tag-close {
  margin-left: 4px;
  font-style: normal;
  font-size: 12px;
  cursor: pointer;
  color: #909399;
}
.net-tag-close:hover {
  color: #409eff;
}
.down-tree-arrow {
  color: #a8abb2;
  font-size: 12px;
  margin-left: 4px;
  flex-shrink: 0;
}
.down-tree-panel {
  max-height: 260px;
  overflow-y: auto;
}
.check-all-row {
  padding: 2px 8px 6px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 4px;
}
</style>
