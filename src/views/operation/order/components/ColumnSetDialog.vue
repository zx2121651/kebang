<template>
  <div v-if="dialogVisible" class="gb-dialog-wrapper">
    <el-dialog
      v-model="dialogVisible"
      :fullscreen="isFullscreen"
      :show-close="false"
      draggable
      width="1040px"
      class="elDialogBox gb-colset-modal"
      @close="closeDialog"
    >
      <template #header>
        <div class="titleBox">
          <span class="title">列设置</span>
          <div class="icons">
            <el-icon class="header-act-icon" @click="isFullscreen = !isFullscreen">
              <FullScreen />
            </el-icon>
            <el-icon class="header-act-icon" @click="closeDialog">
              <Close />
            </el-icon>
          </div>
        </div>
      </template>

      <div class="dialogBody">
        <div class="column-set-dialog">
          <!-- 左侧：显示列 -->
          <div class="column-panel">
            <div class="panel-head">
              <div class="panel-title-group">
                <span class="panel-title">显示列</span>
                <span class="panel-count">{{ visibleCountText }}</span>
              </div>
              <el-input
                v-model="visibleSearchText"
                class="panel-search"
                size="small"
                placeholder="搜索列名"
                :prefix-icon="Search"
                clearable
              />
            </div>

            <div
              class="column-list"
              @dragover.prevent
              @drop="onDropToVisible($event)"
            >
              <section class="column-group-section">
                <div class="column-group-list">
                  <div
                    v-for="(col, idx) in filteredVisibleColumns"
                    :key="col.field"
                    class="column-item"
                    draggable="true"
                    @dragstart="onDragStart($event, col, 'visible', idx)"
                    @dragover.prevent
                    @drop.stop="onDropOnVisibleItem($event, idx)"
                  >
                    <span
                      class="column-drag-handle"
                      title="组内拖动排序（双击可移至未显示列）"
                      @dblclick="moveToHidden(col)"
                    >
                      <i class="grid-dots-icon">⠿</i>
                    </span>

                    <button
                      type="button"
                      class="column-pin-button"
                      :disabled="getVisibleIndex(col) === 0"
                      @click.stop="moveVisibleColumnToTop(col)"
                    >
                      置顶
                    </button>

                    <span class="column-sort">{{ getVisibleIndex(col) + 1 }}</span>

                    <div class="column-main">
                      <div class="column-title-input column-native-input">
                        <input v-model="col.title" type="text" />
                      </div>
                    </div>

                    <el-select
                      v-if="activeFixedField === col.field"
                      v-model="col.params.isFixed"
                      class="fixed-select"
                      size="small"
                      placeholder="冻结"
                      clearable
                      @visible-change="(v: boolean) => !v && (activeFixedField = '')"
                    >
                      <el-option value="left" label="左" />
                      <el-option value="right" label="右" />
                    </el-select>
                    <div
                      v-else
                      class="fixed-select fixed-select-proxy"
                      :class="{ 'has-value': !!col.params.isFixed }"
                      role="button"
                      tabindex="0"
                      @click.stop="activeFixedField = col.field"
                    >
                      <span>{{ getFixedLabel(col) }}</span>
                      <span
                        v-if="col.params.isFixed"
                        class="fixed-select-clear"
                        title="清除冻结"
                        @click.stop="col.params.isFixed = null"
                      >
                        ×
                      </span>
                      <span class="fixed-select-caret" />
                    </div>

                    <div class="width-editor">
                      <div class="column-width-input column-native-input">
                        <input v-model.number="col.width" type="text" />
                      </div>
                      <span>px</span>
                    </div>
                  </div>

                  <div v-if="filteredVisibleColumns.length === 0" class="group-empty-text">
                    {{ visibleSearchText ? '本区域无匹配列' : '从右侧同一区域拖入以显示' }}
                  </div>
                </div>
              </section>
            </div>
          </div>

          <!-- 右侧：未显示列 -->
          <div class="column-panel">
            <div class="panel-head">
              <div class="panel-title-group">
                <span class="panel-title">未显示列</span>
                <span class="panel-count">{{ hiddenCountText }}</span>
              </div>
              <el-input
                v-model="hiddenSearchText"
                class="panel-search"
                size="small"
                placeholder="搜索列名"
                :prefix-icon="Search"
                clearable
              />
            </div>

            <div
              class="column-list"
              @dragover.prevent
              @drop="onDropToHidden($event)"
            >
              <section class="column-group-section">
                <div class="column-group-list">
                  <div
                    v-for="(col, idx) in filteredHiddenColumns"
                    :key="col.field"
                    class="column-item hidden-item"
                    draggable="true"
                    @dragstart="onDragStart($event, col, 'hidden', idx)"
                  >
                    <span
                      class="column-drag-handle"
                      title="拖到左侧同组以显示（双击可恢复显示）"
                      @dblclick="moveToVisible(col)"
                    >
                      <i class="grid-dots-icon">⠿</i>
                    </span>

                    <span class="column-sort muted" style="cursor: pointer" @click="moveToVisible(col)">
                      隐藏
                    </span>

                    <div class="column-main">
                      <div class="column-title-input column-native-input">
                        <input v-model="col.title" type="text" />
                      </div>
                    </div>

                    <div class="width-editor">
                      <div class="column-width-input column-native-input">
                        <input v-model.number="col.width" type="text" />
                      </div>
                      <span>px</span>
                    </div>
                  </div>

                  <div v-if="filteredHiddenColumns.length === 0" class="group-empty-text">
                    {{ hiddenSearchText ? '本区域无匹配列' : '从左侧同一区域拖入以隐藏' }}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      <div class="preservation">
        <el-button class="el-button--save" :icon="Select" @click="submitFormSet">
          保 存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { FullScreen, Close, Search, Select } from '@element-plus/icons-vue'
import type { GbColumnConfig } from '@/mock/orderData'

const emit = defineEmits<{
  (e: 'change', cols: GbColumnConfig[]): void
  (e: 'reset'): void
}>()

const dialogVisible = ref(false)
const isFullscreen = ref(false)
const visibleColumnList = ref<GbColumnConfig[]>([])
const hiddenColumnList = ref<GbColumnConfig[]>([])
const visibleSearchText = ref('')
const hiddenSearchText = ref('')
const activeFixedField = ref('')

let dragItem: { col: GbColumnConfig; from: 'visible' | 'hidden'; index: number } | null = null

function open(currentCols: GbColumnConfig[]) {
  const cloned: GbColumnConfig[] = JSON.parse(JSON.stringify(currentCols))
  visibleColumnList.value = cloned.filter(c => c.params?.isShow === 1)
  hiddenColumnList.value = cloned.filter(c => c.params?.isShow !== 1)
  visibleSearchText.value = ''
  hiddenSearchText.value = ''
  activeFixedField.value = ''
  dialogVisible.value = true
}

function closeDialog() {
  dialogVisible.value = false
}

function matchesSearch(col: GbColumnConfig, q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return (col.title || '').toLowerCase().includes(s) || (col.field || '').toLowerCase().includes(s)
}

const filteredVisibleColumns = computed(() =>
  visibleColumnList.value.filter(c => matchesSearch(c, visibleSearchText.value))
)

const filteredHiddenColumns = computed(() =>
  hiddenColumnList.value.filter(c => matchesSearch(c, hiddenSearchText.value))
)

const visibleCountText = computed(() =>
  visibleSearchText.value.trim()
    ? `${filteredVisibleColumns.value.length}/${visibleColumnList.value.length}`
    : `${visibleColumnList.value.length}`
)

const hiddenCountText = computed(() =>
  hiddenSearchText.value.trim()
    ? `${filteredHiddenColumns.value.length}/${hiddenColumnList.value.length}`
    : `${hiddenColumnList.value.length}`
)

function getVisibleIndex(col: GbColumnConfig) {
  return visibleColumnList.value.findIndex(c => c.field === col.field)
}

function getFixedLabel(col: GbColumnConfig) {
  if (col.params?.isFixed === 'left') return '左'
  if (col.params?.isFixed === 'right') return '右'
  return '冻结'
}

function moveVisibleColumnToTop(col: GbColumnConfig) {
  const idx = getVisibleIndex(col)
  if (idx <= 0) return
  const [item] = visibleColumnList.value.splice(idx, 1)
  visibleColumnList.value.unshift(item)
}

function moveToHidden(col: GbColumnConfig) {
  const idx = visibleColumnList.value.findIndex(c => c.field === col.field)
  if (idx > -1) {
    const [item] = visibleColumnList.value.splice(idx, 1)
    item.params.isShow = 0
    hiddenColumnList.value.push(item)
  }
}

function moveToVisible(col: GbColumnConfig) {
  const idx = hiddenColumnList.value.findIndex(c => c.field === col.field)
  if (idx > -1) {
    const [item] = hiddenColumnList.value.splice(idx, 1)
    item.params.isShow = 1
    visibleColumnList.value.push(item)
  }
}

function onDragStart(_e: DragEvent, col: GbColumnConfig, from: 'visible' | 'hidden', index: number) {
  dragItem = { col, from, index }
}

function onDropOnVisibleItem(_e: DragEvent, targetIdx: number) {
  if (!dragItem) return
  if (dragItem.from === 'visible') {
    const fromIdx = visibleColumnList.value.findIndex(c => c.field === dragItem!.col.field)
    if (fromIdx > -1 && fromIdx !== targetIdx) {
      const [moved] = visibleColumnList.value.splice(fromIdx, 1)
      visibleColumnList.value.splice(targetIdx, 0, moved)
    }
  } else {
    const fromIdx = hiddenColumnList.value.findIndex(c => c.field === dragItem!.col.field)
    if (fromIdx > -1) {
      const [moved] = hiddenColumnList.value.splice(fromIdx, 1)
      moved.params.isShow = 1
      visibleColumnList.value.splice(targetIdx, 0, moved)
    }
  }
  dragItem = null
}

function onDropToVisible(_e: DragEvent) {
  if (!dragItem) return
  if (dragItem.from === 'hidden') {
    moveToVisible(dragItem.col)
  }
  dragItem = null
}

function onDropToHidden(_e: DragEvent) {
  if (!dragItem) return
  if (dragItem.from === 'visible') {
    moveToHidden(dragItem.col)
  }
  dragItem = null
}

function submitFormSet() {
  visibleColumnList.value.forEach((c, i) => {
    c.params.isShow = 1
    c.sort = i + 1
  })
  hiddenColumnList.value.forEach((c, i) => {
    c.params.isShow = 0
    c.sort = visibleColumnList.value.length + i + 1
  })
  const all = [...visibleColumnList.value, ...hiddenColumnList.value]
  emit('change', all)
  ElMessage.success('保存成功')
  closeDialog()
}

defineExpose({
  open
})
</script>

<style scoped>
/* 1:1 复刻 GbDialog + GbColumnSet (data-v-fa6d9d96 + data-v-1db13f96) */
.titleBox {
  width: 100%;
  display: flex;
  align-items: center;
}
.titleBox .title {
  min-width: 40px;
  flex-shrink: 0;
  color: #fff;
  font-size: 16px;
}
.titleBox .icons {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.titleBox .icons .header-act-icon {
  color: #fff;
  display: block;
  margin: 0 7px;
  font-size: 18px;
  cursor: pointer;
}

.dialogBody {
  display: flex;
  height: 400px;
  min-height: 0;
  flex-direction: column;
  gap: 12px;
  padding: 12px 12px 0;
  box-sizing: border-box;
}

.column-set-dialog {
  display: grid;
  min-height: 0;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
}

.column-panel {
  min-width: 0;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  height: 48px;
  padding: 0 12px;
  color: #303133;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
  flex-shrink: 0;
}

.panel-title-group {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
}

.panel-title {
  font-weight: 600;
  font-size: 14px;
}

.panel-count {
  min-width: 26px;
  height: 20px;
  padding: 0 6px;
  line-height: 20px;
  text-align: center;
  color: #409eff;
  border-radius: 10px;
  background: #ecf5ff;
  font-size: 13px;
}

.panel-search {
  width: 180px;
}

.column-list {
  height: calc(100% - 48px);
  padding: 8px;
  overflow-y: auto;
  box-sizing: border-box;
}

.column-group-list {
  min-height: 48px;
  padding: 6px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fafcff;
}

.column-group-list > .column-item:last-of-type {
  margin-bottom: 0;
}

.group-empty-text {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  color: #a8abb2;
  font-size: 12px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  background: #fff;
}

.column-item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 6px 8px;
  margin-bottom: 6px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
}

.hidden-item {
  background: #fafafa;
}

.column-drag-handle {
  flex-shrink: 0;
  color: #909399;
  cursor: move;
  user-select: none;
}

.grid-dots-icon {
  font-style: normal;
  font-size: 16px;
  letter-spacing: -1px;
}

.column-pin-button {
  flex-shrink: 0;
  min-width: 48px;
  padding: 0;
  color: #409eff;
  font-size: 14px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.column-pin-button:disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}

.column-sort {
  flex-shrink: 0;
  width: 34px;
  color: #606266;
  text-align: center;
  font-size: 14px;
}

.column-sort.muted {
  width: 42px;
  color: #909399;
}

.column-main {
  min-width: 0;
  flex: 1;
}

.column-native-input {
  width: 100%;
}

.column-native-input input {
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  padding: 0 11px;
  color: #606266;
  font-size: 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  background: #fff;
  transition: border-color 0.2s;
}

.column-native-input input:hover {
  border-color: #c0c4cc;
}

.column-native-input input:focus {
  border-color: #409eff;
}

.fixed-select {
  flex-shrink: 0;
  width: 72px;
}

.fixed-select-proxy {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 32px;
  padding: 0 10px;
  overflow: hidden;
  color: #c0c4cc;
  font-size: 14px;
  line-height: 30px;
  white-space: nowrap;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.2s;
}

.fixed-select-proxy.has-value {
  color: #606266;
}

.fixed-select-caret {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin: -3px 1px 0 8px;
  border-right: 1px solid #c0c4cc;
  border-bottom: 1px solid #c0c4cc;
  transform: rotate(45deg);
}

.fixed-select-clear {
  display: none;
  flex-shrink: 0;
  margin-left: 6px;
  color: #c0c4cc;
  font-size: 16px;
  line-height: 1;
}

.fixed-select-proxy.has-value:hover .fixed-select-clear {
  display: inline;
}

.fixed-select-proxy.has-value:hover .fixed-select-caret {
  display: none;
}

.width-editor {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 4px;
  width: 96px;
  color: #606266;
  font-size: 14px;
}

.column-width-input {
  width: 66px;
}

.preservation {
  text-align: center;
  padding: 12px 0;
  border-top: solid 1px #e8eaec;
  background: #fff;
}

.el-button--save {
  background-color: #4f77cb !important;
  border-color: #4f77cb !important;
  color: #fff !important;
  height: 36px;
  padding: 8px 20px;
}

.el-button--save:hover {
  background-color: #6999dd !important;
  border-color: #6999dd !important;
}
</style>
