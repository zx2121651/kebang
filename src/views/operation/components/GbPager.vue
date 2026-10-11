<template>
  <div class="gb-pager">
    <span class="pager-total">Total {{ total }}</span>
    <el-select
      :model-value="pageSize"
      size="small"
      class="pager-size-select"
      @update:model-value="(val: number) => emit('update:pageSize', val)"
    >
      <el-option label="50/page" :value="50" />
      <el-option label="100/page" :value="100" />
      <el-option label="200/page" :value="200" />
      <el-option label="500/page" :value="500" />
    </el-select>
    <button
      type="button"
      class="pager-btn"
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
    >
      &lt;
    </button>
    <button type="button" class="pager-num active">{{ currentPage }}</button>
    <button
      type="button"
      class="pager-btn"
      :disabled="currentPage >= maxPage"
      @click="changePage(currentPage + 1)"
    >
      &gt;
    </button>
    <span class="pager-goto">
      Go to
      <input
        v-model="jumpVal"
        type="text"
        class="pager-jump-input"
        @keyup.enter="handleJump"
        @blur="handleJump"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    total: number
    currentPage?: number
    pageSize?: number
  }>(),
  {
    total: 0,
    currentPage: 1,
    pageSize: 100
  }
)

const emit = defineEmits<{
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
}>()

const jumpVal = ref(String(props.currentPage))
const maxPage = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

watch(
  () => props.currentPage,
  val => {
    jumpVal.value = String(val)
  }
)

function changePage(p: number) {
  const next = Math.max(1, Math.min(maxPage.value, p))
  emit('update:currentPage', next)
}

function handleJump() {
  const n = parseInt(jumpVal.value, 10)
  if (!isNaN(n)) {
    changePage(n)
  } else {
    jumpVal.value = String(props.currentPage)
  }
}
</script>

<style scoped>
.gb-pager {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #606266;
  user-select: none;
  white-space: nowrap;
}
.pager-total {
  color: #606266;
}
.pager-size-select {
  width: 92px;
}
.pager-btn,
.pager-num {
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #606266;
  font-size: 12px;
  border-radius: 2px;
  cursor: pointer;
  line-height: 22px;
}
.pager-btn:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background: #f5f7fa;
}
.pager-num.active {
  color: #409eff;
  border-color: #409eff;
  font-weight: 600;
}
.pager-goto {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #606266;
}
.pager-jump-input {
  width: 38px;
  height: 22px;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  text-align: center;
  font-size: 12px;
  color: #606266;
  outline: none;
}
.pager-jump-input:focus {
  border-color: #409eff;
}
</style>
