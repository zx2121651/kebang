<template>
  <div class="gb-table-engine">
    <div class="gb-table-scroll">
      <table class="gb-native-table" :style="{ width: totalTableWidth + 'px' }">
        <thead>
          <!-- 第一层表头：列名 + 排序箭头 -->
          <tr class="gb-thead-title-row">
            <th v-if="isMultiple" class="sticky-col sticky-check" style="width: 40px">
              <input
                type="checkbox"
                class="gb-native-check"
                :checked="isAllSelected"
                :indeterminate.prop="isIndeterminate"
                @change="toggleSelectAll"
              />
            </th>
            <th
              class="sticky-col sticky-seq"
              :style="{ width: '50px', left: isMultiple ? '40px' : '0px' }"
            >
              序号
            </th>
            <th
              v-for="col in visibleColumns"
              :key="'th-' + col.field"
              :class="getStickyClass(col)"
              :style="{
                width: (col.width || 100) + 'px',
                textAlign: col.align || 'left',
                ...getStickyStyle(col, true)
              }"
              @click="col.sortable !== false && toggleSort(col.field)"
            >
              <div
                class="th-title-inner"
                :style="{
                  justifyContent:
                    col.align === 'right'
                      ? 'flex-end'
                      : col.align === 'center'
                        ? 'center'
                        : 'flex-start'
                }"
              >
                <span class="th-title-text">{{ col.title }}</span>
                <span v-if="col.sortable !== false" class="sort-caret-wrap">
                  <i
                    class="sort-caret asc"
                    :class="{ active: sortState.field === col.field && sortState.order === 'asc' }"
                  ></i>
                  <i
                    class="sort-caret desc"
                    :class="{ active: sortState.field === col.field && sortState.order === 'desc' }"
                  ></i>
                </span>
              </div>
            </th>
          </tr>

          <!-- 第二层表头：行内筛选输入框 -->
          <tr v-if="showFilterRow" class="gb-thead-filter-row">
            <th v-if="isMultiple" class="sticky-col sticky-check"></th>
            <th
              class="sticky-col sticky-seq"
              :style="{ left: isMultiple ? '40px' : '0px' }"
            ></th>
            <th
              v-for="col in visibleColumns"
              :key="'flt-' + col.field"
              :class="getStickyClass(col)"
              :style="{
                width: (col.width || 100) + 'px',
                ...getStickyStyle(col, true)
              }"
            >
              <div class="th-filter-cell">
                <input
                  v-model="columnFilters[col.field]"
                  type="text"
                  class="th-filter-input"
                  @input="emitFilterChange"
                />
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="filteredAndSortedRows.length === 0" class="gb-empty-row">
            <td :colspan="visibleColumns.length + (isMultiple ? 2 : 1)" class="gb-empty-td">
              <div class="gb-empty-wrap">暂无数据</div>
            </td>
          </tr>

          <tr
            v-for="(row, rIdx) in filteredAndSortedRows"
            :key="row[rowKey] || rIdx"
            class="gb-tbody-row"
            :class="{
              'is-selected': isRowSelected(row),
              'is-even': rIdx % 2 === 1
            }"
            :style="getRowStyle(row)"
            @click="handleRowClick(row)"
            @dblclick="emit('row-dblclick', row)"
          >
            <td
              v-if="isMultiple"
              class="sticky-col sticky-check"
              :style="getRowStyle(row)"
              @click.stop
            >
              <input
                type="checkbox"
                class="gb-native-check"
                :checked="isRowSelected(row)"
                @change="toggleRowSelect(row)"
              />
            </td>
            <td
              class="sticky-col sticky-seq"
              :style="{ left: isMultiple ? '40px' : '0px', ...getRowStyle(row) }"
            >
              {{ (currentPage - 1) * pageSize + rIdx + 1 }}
            </td>
            <td
              v-for="col in visibleColumns"
              :key="col.field"
              :class="getStickyClass(col)"
              :style="{
                textAlign: col.align || 'left',
                ...getRowStyle(row),
                ...getStickyStyle(col, false)
              }"
            >
              <slot name="cell" :row="row" :col="col" :value="row[col.field]">
                <span
                  v-if="col.params?.isLink"
                  class="gb-cell-link"
                  @click.stop="emit('link-click', row, col)"
                >
                  {{ formatCellValue(row, col) }}
                </span>
                <span v-else class="gb-cell-text" :title="String(formatCellValue(row, col) ?? '')">
                  {{ formatCellValue(row, col) }}
                </span>
              </slot>
            </td>
          </tr>
        </tbody>

        <!-- 底部粘性总计行 -->
        <tfoot v-if="showSummary">
          <tr class="gb-tfoot-row">
            <td v-if="isMultiple" class="sticky-col sticky-check"></td>
            <td
              class="sticky-col sticky-seq"
              :style="{ left: isMultiple ? '40px' : '0px' }"
            >
              总计
            </td>
            <td
              v-for="(col, cIdx) in visibleColumns"
              :key="'sum-' + col.field"
              :class="getStickyClass(col)"
              :style="{
                textAlign: col.align || 'left',
                ...getStickyStyle(col, false)
              }"
            >
              <template v-if="cIdx === 0">
                <span class="sum-count">共 {{ filteredAndSortedRows.length }} 笔</span>
              </template>
              <template v-else-if="col.params?.isTotal">
                <span class="sum-num">{{ calcColumnSum(col.field) }}</span>
              </template>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- 列设置弹窗 -->
    <ColumnSetDialog
      ref="columnSetDialogRef"
      @save="handleSaveColumns"
      @reset="handleResetColumns"
    />

    <!-- 高级筛选弹窗 -->
    <SeniorFilterDialog
      ref="seniorFilterDialogRef"
      :custom-filter-items="filterItems"
      @apply="handleApplySeniorFilter"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { GbColumnConfig } from '@/mock/orderData'
import type { OperationFilterItem } from './OperationColumnConfig'
import ColumnSetDialog from '@/views/operation/order/components/ColumnSetDialog.vue'
import SeniorFilterDialog, {
  type SeniorFilterNode
} from '@/views/operation/order/components/SeniorFilterDialog.vue'

const props = withDefaults(
  defineProps<{
    tableData: Record<string, any>[]
    columns: GbColumnConfig[]
    filterItems?: OperationFilterItem[]
    storageKey: string
    rowKey?: string
    isMultiple?: boolean
    showFilterRow?: boolean
    showSummary?: boolean
    currentPage?: number
    pageSize?: number
    rowBgColor?: (row: Record<string, any>) => string | undefined
  }>(),
  {
    rowKey: 'id',
    isMultiple: true,
    showFilterRow: true,
    showSummary: true,
    currentPage: 1,
    pageSize: 100
  }
)

const emit = defineEmits<{
  (e: 'selection-change', rows: Record<string, any>[]): void
  (e: 'row-click', row: Record<string, any>): void
  (e: 'row-dblclick', row: Record<string, any>): void
  (e: 'link-click', row: Record<string, any>, col: GbColumnConfig): void
  (e: 'total-change', count: number): void
}>()

const allColumns = ref<GbColumnConfig[]>(JSON.parse(JSON.stringify(props.columns)))

onMounted(() => {
  try {
    const saved = localStorage.getItem(props.storageKey)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length === props.columns.length && parsed[0]?.params) {
        allColumns.value = parsed
      }
    }
  } catch {
    // ignore
  }
})

watch(
  () => props.columns,
  newCols => {
    allColumns.value = JSON.parse(JSON.stringify(newCols))
  }
)

const visibleColumns = computed(() =>
  allColumns.value.filter(col => col.params?.isShow === 1)
)

const totalTableWidth = computed(() => {
  const baseW = (props.isMultiple ? 40 : 0) + 50
  const colsW = visibleColumns.value.reduce((s, c) => s + (Number(c.width) || 100), 0)
  return baseW + colsW
})

const leftStickyOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = (props.isMultiple ? 40 : 0) + 50
  for (const col of visibleColumns.value) {
    if (col.params?.isFixed === 'left') {
      map[col.field] = acc
      acc += Number(col.width) || 100
    }
  }
  return map
})

const rightStickyOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = 0
  const rev = [...visibleColumns.value].reverse()
  for (const col of rev) {
    if (col.params?.isFixed === 'right') {
      map[col.field] = acc
      acc += Number(col.width) || 100
    }
  }
  return map
})

function getStickyClass(col: GbColumnConfig) {
  if (col.params?.isFixed === 'left') return 'sticky-col sticky-left'
  if (col.params?.isFixed === 'right') return 'sticky-col sticky-right'
  return ''
}

function getStickyStyle(col: GbColumnConfig, isHeader: boolean) {
  if (col.params?.isFixed === 'left' && leftStickyOffsets.value[col.field] !== undefined) {
    return {
      left: `${leftStickyOffsets.value[col.field]}px`,
      zIndex: isHeader ? 14 : 4
    }
  }
  if (col.params?.isFixed === 'right' && rightStickyOffsets.value[col.field] !== undefined) {
    return {
      right: `${rightStickyOffsets.value[col.field]}px`,
      zIndex: isHeader ? 14 : 4
    }
  }
  return {}
}

function getRowStyle(row: Record<string, any>) {
  if (!props.rowBgColor) return {}
  const bg = props.rowBgColor(row)
  return bg ? { backgroundColor: bg } : {}
}

// 表头行内筛选 + 高级筛选 + 排序
const columnFilters = reactive<Record<string, string>>({})
const seniorConditions = ref<SeniorFilterNode[]>([])
const sortState = reactive<{ field: string; order: 'asc' | 'desc' | '' }>({
  field: '',
  order: ''
})

function toggleSort(field: string) {
  if (sortState.field !== field) {
    sortState.field = field
    sortState.order = 'asc'
  } else if (sortState.order === 'asc') {
    sortState.order = 'desc'
  } else {
    sortState.field = ''
    sortState.order = ''
  }
}

function emitFilterChange() {
  // reactive filter updates automatically
}

function matchSeniorNode(row: Record<string, any>, cond: SeniorFilterNode): boolean {
  if (!cond.field || !cond.value) return true
  const rawVal = row[cond.field]
  const strVal = String(rawVal ?? '').toLowerCase()
  const target = String(cond.value ?? '').toLowerCase()
  const numVal = Number(rawVal)
  const numTarget = Number(cond.value)

  switch (cond.operator) {
    case '0':
      return strVal.includes(target)
    case '1':
      return !strVal.includes(target)
    case '2':
      return strVal === target
    case '3':
      return strVal !== target
    case '4':
      return !isNaN(numVal) && !isNaN(numTarget) && numVal > numTarget
    case '5':
      return !isNaN(numVal) && !isNaN(numTarget) && numVal >= numTarget
    case '6':
      return !isNaN(numVal) && !isNaN(numTarget) && numVal < numTarget
    case '7':
      return !isNaN(numVal) && !isNaN(numTarget) && numVal <= numTarget
    case '8':
      return strVal.startsWith(target)
    case '9':
      return strVal.endsWith(target)
    default:
      return strVal.includes(target)
  }
}

const filteredAndSortedRows = computed(() => {
  let list = [...props.tableData]

  // 1. 表头行内筛选
  for (const [field, kw] of Object.entries(columnFilters)) {
    const trimmed = (kw || '').trim().toLowerCase()
    if (!trimmed) continue
    list = list.filter(row =>
      String(row[field] ?? '')
        .toLowerCase()
        .includes(trimmed)
    )
  }

  // 2. 高级筛选
  if (seniorConditions.value.length > 0) {
    list = list.filter(row => {
      let acc = true
      for (let i = 0; i < seniorConditions.value.length; i++) {
        const c = seniorConditions.value[i]
        const matched = matchSeniorNode(row, c)
        if (i === 0) acc = matched
        else if (c.logic === 0) acc = acc && matched
        else acc = acc || matched
      }
      return acc
    })
  }

  // 3. 排序
  if (sortState.field && sortState.order) {
    const f = sortState.field
    const dir = sortState.order === 'asc' ? 1 : -1
    list.sort((a, b) => {
      const va = a[f]
      const vb = b[f]
      if (typeof va === 'number' && typeof vb === 'number') {
        return (va - vb) * dir
      }
      return String(va ?? '').localeCompare(String(vb ?? ''), 'zh-CN') * dir
    })
  }

  return list
})

watch(
  () => filteredAndSortedRows.value.length,
  len => {
    emit('total-change', len)
  },
  { immediate: true }
)

// 选择状态管理
const selectedKeys = ref<Set<any>>(new Set())

watch(
  () => props.tableData,
  () => {
    const validKeys = new Set(props.tableData.map(r => r[props.rowKey]))
    let changed = false
    for (const k of selectedKeys.value) {
      if (!validKeys.has(k)) {
        selectedKeys.value.delete(k)
        changed = true
      }
    }
    if (changed) emitSelection()
  }
)

function isRowSelected(row: Record<string, any>) {
  return selectedKeys.value.has(row[props.rowKey])
}

const isAllSelected = computed(() => {
  const rows = filteredAndSortedRows.value
  return rows.length > 0 && rows.every(r => selectedKeys.value.has(r[props.rowKey]))
})

const isIndeterminate = computed(() => {
  const rows = filteredAndSortedRows.value
  const count = rows.filter(r => selectedKeys.value.has(r[props.rowKey])).length
  return count > 0 && count < rows.length
})

function emitSelection() {
  const selectedRows = props.tableData.filter(r => selectedKeys.value.has(r[props.rowKey]))
  emit('selection-change', selectedRows)
}

function toggleSelectAll(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (checked) {
    filteredAndSortedRows.value.forEach(r => selectedKeys.value.add(r[props.rowKey]))
  } else {
    filteredAndSortedRows.value.forEach(r => selectedKeys.value.delete(r[props.rowKey]))
  }
  emitSelection()
}

function toggleRowSelect(row: Record<string, any>) {
  const k = row[props.rowKey]
  if (!props.isMultiple) {
    selectedKeys.value.clear()
    selectedKeys.value.add(k)
  } else if (selectedKeys.value.has(k)) {
    selectedKeys.value.delete(k)
  } else {
    selectedKeys.value.add(k)
  }
  emitSelection()
}

function handleRowClick(row: Record<string, any>) {
  toggleRowSelect(row)
  emit('row-click', row)
}

function clearSelection() {
  selectedKeys.value.clear()
  emitSelection()
}

function formatCellValue(row: Record<string, any>, col: GbColumnConfig) {
  const val = row[col.field]
  if (val === undefined || val === null || val === '') return ''
  return val
}

function calcColumnSum(field: string) {
  let sum = 0
  for (const r of filteredAndSortedRows.value) {
    const n = Number(r[field])
    if (!isNaN(n)) sum += n
  }
  return Number.isInteger(sum) ? String(sum) : sum.toFixed(2).replace(/\.00$/, '')
}

// 弹窗控制与外观保存
const columnSetDialogRef = ref<InstanceType<typeof ColumnSetDialog> | null>(null)
const seniorFilterDialogRef = ref<InstanceType<typeof SeniorFilterDialog> | null>(null)

function openColumnSet() {
  columnSetDialogRef.value?.open(allColumns.value)
}

function openSeniorFilter() {
  seniorFilterDialogRef.value?.open()
}

function handleSaveColumns(newCols: GbColumnConfig[]) {
  allColumns.value = JSON.parse(JSON.stringify(newCols))
  localStorage.setItem(props.storageKey, JSON.stringify(allColumns.value))
  ElMessage.success('列设置已更新')
}

function handleResetColumns() {
  allColumns.value = JSON.parse(JSON.stringify(props.columns))
  localStorage.removeItem(props.storageKey)
  ElMessage.success('已恢复默认列设置')
}

function saveColumnAppearance() {
  localStorage.setItem(props.storageKey, JSON.stringify(allColumns.value))
  ElMessage.success('外观保存成功')
}

function handleApplySeniorFilter(payload: { logic: 'AND' | 'OR'; conditions: SeniorFilterNode[] }) {
  seniorConditions.value = payload.conditions
  ElMessage.success('高级筛选已应用')
}

defineExpose({
  openColumnSet,
  openSeniorFilter,
  saveColumnAppearance,
  clearSelection
})
</script>

<style scoped>
.gb-table-engine {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #fff;
  border: 1px solid #dcdfe6;
  overflow: hidden;
}

.gb-table-scroll {
  flex: 1;
  overflow: auto;
  position: relative;
}

.gb-native-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
  font-size: 12px;
  color: #303133;
}

/* 表头第一行：#3888fa 科邦蓝 */
.gb-thead-title-row th {
  position: sticky;
  top: 0;
  z-index: 10;
  height: 30px;
  background-color: #3888fa;
  color: #ffffff;
  font-weight: 600;
  padding: 0 6px;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

/* 表头第二行：行内筛选输入框行 */
.gb-thead-filter-row th {
  position: sticky;
  top: 30px;
  z-index: 10;
  height: 30px;
  background-color: #3888fa;
  padding: 2px 4px;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid #d0d7de;
  box-sizing: border-box;
}

.th-title-inner {
  display: flex;
  align-items: center;
  gap: 3px;
  width: 100%;
  overflow: hidden;
}

.th-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sort-caret-wrap {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 14px;
  width: 10px;
  justify-content: center;
  flex-shrink: 0;
}

.sort-caret {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.sort-caret.asc {
  border-bottom: 5px solid rgba(255, 255, 255, 0.45);
  margin-bottom: 2px;
}

.sort-caret.asc.active {
  border-bottom-color: #ffffff;
}

.sort-caret.desc {
  border-top: 5px solid rgba(255, 255, 255, 0.45);
}

.sort-caret.desc.active {
  border-top-color: #ffffff;
}

.th-filter-cell {
  width: 100%;
  height: 22px;
}

.th-filter-input {
  width: 100%;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  background-color: #ffffff;
  color: #303133;
  font-size: 12px;
  padding: 0 4px;
  outline: none;
  box-sizing: border-box;
}

.th-filter-input:focus {
  border-color: #ffd04b;
}

/* 固定列 */
.sticky-check {
  left: 0;
  text-align: center !important;
  width: 40px;
}

.sticky-seq {
  text-align: center !important;
  width: 50px;
}

.gb-thead-title-row .sticky-col,
.gb-thead-filter-row .sticky-col {
  z-index: 15 !important;
  background-color: #3888fa;
}

.gb-tbody-row td {
  height: 28px;
  padding: 0 6px;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
  background-color: #ffffff;
}

.gb-tbody-row.is-even td {
  background-color: #fafafa;
}

.gb-tbody-row:hover td {
  background-color: #ecf5ff !important;
}

.gb-tbody-row.is-selected td {
  background-color: #d9ecff !important;
}

.gb-tbody-row .sticky-col {
  z-index: 3;
}

.gb-cell-link {
  color: #409eff;
  cursor: pointer;
}

.gb-cell-link:hover {
  text-decoration: underline;
}

.gb-empty-td {
  height: 180px;
  text-align: center;
  color: #909399;
}

/* 底部粘性总计行 */
.gb-tfoot-row td {
  position: sticky;
  bottom: 0;
  z-index: 8;
  height: 28px;
  padding: 0 6px;
  background-color: #fdf5e6;
  color: #303133;
  font-weight: 600;
  border-top: 1px solid #dcdfe6;
  border-right: 1px solid #ebeef5;
  white-space: nowrap;
  box-sizing: border-box;
}

.gb-tfoot-row .sticky-col {
  z-index: 12;
  background-color: #fdf5e6;
}

.sum-count {
  color: #606266;
}

.sum-num {
  color: #e6a23c;
  font-weight: 700;
}

.gb-native-check {
  width: 14px;
  height: 14px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
