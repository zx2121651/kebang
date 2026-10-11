<template>
  <div v-if="dialogVisible" class="gbSeniorFilter">
    <el-dialog
      v-model="dialogVisible"
      :fullscreen="isFullscreen"
      :show-close="false"
      draggable
      width="50%"
      class="elDialogBox gb-senior-modal"
      @close="closeDialog"
    >
      <template #header>
        <div class="titleBox">
          <span class="title">高级筛选</span>
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
        <div class="senior-tree-table">
          <div class="senior-thead">
            <div class="th-cell col-logic" style="padding-left: 15px">并且 / 或者</div>
            <div class="th-cell col-field">筛选项</div>
            <div class="th-cell col-op">筛选条件</div>
            <div class="th-cell col-val">筛选内容</div>
            <div class="th-cell col-act">操作</div>
          </div>

          <div class="senior-tbody">
            <div
              v-for="row in flattenedRows"
              :key="row.id"
              class="tr-row"
              :class="{ 'is-child': !!row.parentId }"
            >
              <!-- 并且 / 或者 -->
              <div class="td-cell col-logic">
                <span class="tree-line-prefix">{{ row.parentId ? '└┈┈ ' : '┈┈ ' }}</span>
                <span
                  class="cursorPointer"
                  :class="row.logic === 0 ? 'fontBlue' : 'fontRed'"
                  title="点击可切换筛选条件"
                  @click="changeLogic(row)"
                >
                  {{ row.logic === 0 ? '并且' : '或者' }}
                </span>
              </div>

              <!-- 筛选项 -->
              <div class="td-cell col-field">
                <el-select
                  v-model="row.field"
                  size="small"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="(val: string) => changeField(val, row)"
                >
                  <el-option
                    v-for="item in filterItems"
                    :key="item.field"
                    :label="item.title"
                    :value="item.field"
                  />
                </el-select>
              </div>

              <!-- 筛选条件 -->
              <div class="td-cell col-op">
                <el-select
                  v-model="row.operator"
                  size="small"
                  placeholder="请选择"
                  style="width: 100%"
                  @change="row.value = ''"
                >
                  <el-option
                    v-for="op in getOperatorsForRow(row)"
                    :key="op.value"
                    :label="op.label"
                    :value="op.value"
                  />
                </el-select>
              </div>

              <!-- 筛选内容 -->
              <div class="td-cell col-val">
                <el-select
                  v-if="row.sType && row.selectArr && row.selectArr.length > 0"
                  v-model="row.value"
                  size="small"
                  clearable
                  filterable
                  placeholder="请选择"
                  style="width: 100%"
                >
                  <el-option
                    v-for="opt in row.selectArr"
                    :key="opt.value"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
                <el-input
                  v-else
                  v-model="row.value"
                  size="small"
                  style="width: 100%"
                />
              </div>

              <!-- 操作 -->
              <div class="td-cell col-act">
                <button
                  type="button"
                  class="op-icon-btn"
                  title="新增同级"
                  @click="insertRow(row, 'sibling')"
                >
                  <svg viewBox="0 0 1024 1024" width="18" height="18" fill="#409eff">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" />
                  </svg>
                </button>
                <button
                  v-if="!row.parentId"
                  type="button"
                  class="op-icon-btn"
                  title="新增子级"
                  @click="insertRow(row, 'children')"
                >
                  <svg viewBox="0 0 1024 1024" width="18" height="18" fill="#409eff">
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM704 536c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" />
                  </svg>
                </button>
                <button
                  type="button"
                  class="op-icon-btn"
                  title="删除节点"
                  @click="delNode(row)"
                >
                  <svg viewBox="0 0 1024 1024" width="18" height="18" fill="#ff4400">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="preservation">
        <el-button type="primary" :icon="Select" @click="submitFormFilter">
          保 存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { FullScreen, Close, Select } from '@element-plus/icons-vue'
import { ORDERLIST_FILTER_ITEMS } from '@/mock/orderData'

export interface SeniorFilterNode {
  id: number
  parentId: number | null
  logic: 0 | 1
  field: string
  operator: string
  value: string
  type?: number
  sType?: number
  selectArr?: { label: string; value: string }[]
}

const props = defineProps<{
  customFilterItems?: {
    field: string
    title: string
    type: number
    sType?: number
    selectArr?: { label: string; value: string }[]
  }[]
}>()

const emit = defineEmits<{
  (e: 'apply', payload: { logic: 'AND' | 'OR'; conditions: SeniorFilterNode[] }): void
}>()

const dialogVisible = ref(false)
const isFullscreen = ref(false)
const filterItems = computed(() =>
  props.customFilterItems && props.customFilterItems.length > 0
    ? props.customFilterItems
    : ORDERLIST_FILTER_ITEMS
)

const operatorsArr = [
  { label: '包含', value: '0', types: [1] },
  { label: '不包含', value: '1', types: [1] },
  { label: '等于', value: '2', types: [1, 2, 3] },
  { label: '不等于', value: '3', types: [1, 2, 3] },
  { label: '大于', value: '4', types: [2, 3] },
  { label: '大于等于', value: '5', types: [2, 3] },
  { label: '小于', value: '6', types: [2, 3] },
  { label: '小于等于', value: '7', types: [2, 3] },
  { label: '以*开始', value: '8', types: [1] },
  { label: '以*结尾', value: '9', types: [1] }
]

let idSeed = Date.now()
function createEmptyNode(parentId: number | null = null): SeniorFilterNode {
  return {
    id: ++idSeed,
    parentId,
    logic: 0,
    field: '',
    operator: '',
    value: '',
    type: 1,
    sType: undefined,
    selectArr: []
  }
}

const tableData = ref<SeniorFilterNode[]>([createEmptyNode(null)])

const flattenedRows = computed(() => {
  const roots = tableData.value.filter(r => !r.parentId)
  const result: SeniorFilterNode[] = []
  roots.forEach(root => {
    result.push(root)
    const children = tableData.value.filter(c => c.parentId === root.id)
    result.push(...children)
  })
  return result
})

function open() {
  if (tableData.value.length === 0) {
    tableData.value = [createEmptyNode(null)]
  }
  dialogVisible.value = true
}

function closeDialog() {
  dialogVisible.value = false
}

function changeLogic(row: SeniorFilterNode) {
  row.logic = row.logic === 0 ? 1 : 0
}

function changeField(val: string, row: SeniorFilterNode) {
  const found = filterItems.value.find(f => f.field === val)
  if (found) {
    row.type = found.type
    row.sType = found.sType
    row.selectArr = found.selectArr || []
    const ops = getOperatorsForRow(row)
    row.operator = ops[0]?.value || '0'
    row.value = ''
  }
}

function getOperatorsForRow(row: SeniorFilterNode) {
  if (!row.field) return operatorsArr
  if (row.sType && row.sType <= 3) {
    return operatorsArr.filter(o => o.value === '2')
  }
  const t = Number(row.type || 1)
  return operatorsArr.filter(o => o.types.includes(t))
}

function insertRow(row: SeniorFilterNode, mode: 'sibling' | 'children') {
  if (mode === 'sibling') {
    tableData.value.push(createEmptyNode(row.parentId))
  } else {
    tableData.value.push(createEmptyNode(row.id))
  }
}

function delNode(row: SeniorFilterNode) {
  tableData.value = tableData.value.filter(r => r.id !== row.id && r.parentId !== row.id)
  if (tableData.value.length === 0) {
    tableData.value.push(createEmptyNode(null))
  }
}

function submitFormFilter() {
  const activeRows = tableData.value.filter(r => r.field || r.value)
  if (activeRows.length === 0) {
    emit('apply', { logic: 'AND', conditions: [] })
    closeDialog()
    return
  }
  if (activeRows.some(r => !r.field)) {
    ElMessage.warning('存在未选择的筛选项')
    return
  }
  if (activeRows.some(r => r.operator === '' || r.operator === undefined)) {
    ElMessage.warning('存在未选择的筛选条件')
    return
  }
  if (activeRows.some(r => !String(r.value ?? '').trim())) {
    ElMessage.warning('筛选内容不能为空')
    return
  }
  emit('apply', {
    logic: activeRows[0]?.logic === 1 ? 'OR' : 'AND',
    conditions: JSON.parse(JSON.stringify(activeRows))
  })
  closeDialog()
}

defineExpose({
  open
})
</script>

<style scoped>
/* 1:1 复刻 GbDialog + GbSeniorFilter (data-v-fa6d9d96 + data-v-745f33c2) */
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
  font-size: 16px;
  margin-left: 14px;
  cursor: pointer;
}

.dialogBody {
  flex: 1;
  height: 400px;
  overflow-y: auto;
  background: #fff;
}

.senior-tree-table {
  width: 100%;
}

.senior-thead {
  display: flex;
  align-items: center;
  height: 36px;
  background-color: rgba(64, 158, 255, 0.9);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding-left: 5px;
}

.th-cell,
.td-cell {
  padding: 0 8px;
  box-sizing: border-box;
}

.col-logic {
  width: 20%;
}
.col-field {
  width: 20%;
}
.col-op {
  width: 20%;
}
.col-val {
  width: 22%;
}
.col-act {
  width: 18%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tr-row {
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 13px;
}

.tr-row:hover {
  background-color: rgba(64, 158, 255, 0.12);
}

.tr-row.is-child .col-logic {
  padding-left: 28px;
}

.tree-line-prefix {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 2px;
}

.cursorPointer {
  cursor: pointer;
  padding-left: 5px;
  user-select: none;
}

.fontBlue {
  color: #79bbff;
}

.fontRed {
  color: #d43030;
}

.op-icon-btn {
  border: 0;
  background: transparent;
  padding: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  color: #409eff;
}

.font21 {
  font-size: 21px;
}

.danger {
  font-size: 21px;
  color: #f40;
}

.preservation {
  text-align: center;
  padding: 12px 0;
  border-top: solid 1px #e8eaec;
  background: #fff;
}

.preservation .el-button {
  height: 36px;
  padding: 8px 20px;
}
</style>
