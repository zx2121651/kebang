<template>
  <div class="tms-table-container">
    <el-table
      ref="tableRef"
      :data="filteredData"
      border
      stripe
      size="small"
      height="100%"
      class="tms-custom-table"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <!-- 多选复选框列 -->
      <el-table-column
        v-if="selectable"
        type="selection"
        width="42"
        fixed="left"
        align="center"
      />

      <!-- 序号列 -->
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="50"
        fixed="left"
        align="center"
      />

      <!-- 动态业务列 -->
      <el-table-column
        v-for="col in columns"
        :key="col.prop"
        :prop="col.prop"
        :label="col.label"
        :width="col.width || 120"
        :min-width="col.minWidth || 100"
        :fixed="col.fixed"
        :sortable="col.sortable !== false"
        show-overflow-tooltip
      >
        <!-- 自定义表头：内联搜索输入框 -->
        <template #header>
          <div class="tms-header-cell">
            <span class="header-label">{{ col.label }}</span>
            <input
              v-if="col.filterable !== false"
              v-model="columnFilters[col.prop]"
              type="text"
              class="header-filter-input"
              @click.stop
            />
          </div>
        </template>

        <!-- 自定义单元格内容 -->
        <template #default="scope">
          <!-- 状态标签列 -->
          <template v-if="col.type === 'status'">
            <span class="status-badge" :class="getStatusClass(scope.row[col.prop])">
              {{ scope.row[col.prop] }}
            </span>
          </template>

          <!-- 金额列 -->
          <template v-else-if="col.type === 'money'">
            <span class="money-cell">¥{{ Number(scope.row[col.prop] || 0).toFixed(2) }}</span>
          </template>

          <!-- 运单号可点击高亮 -->
          <template v-else-if="col.prop === 'shipNo'">
            <span class="link-cell" @click.stop="$emit('view-detail', scope.row)">
              {{ scope.row[col.prop] }}
            </span>
          </template>

          <template v-else>
            {{ scope.row[col.prop] }}
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部数据汇总行 -->
    <div class="tms-summary-footer">
      <div class="summary-item">
        <span>合计：</span>
        <strong>共 {{ filteredData.length }} 条</strong>
      </div>
      <div v-if="summaryStats.totalQty" class="summary-item">
        <span>件数合计：</span>
        <strong>{{ summaryStats.totalQty }} 件</strong>
      </div>
      <div v-if="summaryStats.totalWeight" class="summary-item">
        <span>重量合计：</span>
        <strong>{{ summaryStats.totalWeight.toFixed(2) }} kg</strong>
      </div>
      <div v-if="summaryStats.totalVolume" class="summary-item">
        <span>体积合计：</span>
        <strong>{{ summaryStats.totalVolume.toFixed(2) }} m³</strong>
      </div>
      <div v-if="summaryStats.totalAmount" class="summary-item">
        <span>运费合计：</span>
        <strong class="highlight-money">¥{{ summaryStats.totalAmount.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

export interface TmsColumnItem {
  prop: string;
  label: string;
  width?: number;
  minWidth?: number;
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  type?: 'status' | 'money' | 'text';
}

const props = withDefaults(
  defineProps<{
    data: any[];
    columns: TmsColumnItem[];
    selectable?: boolean;
    showIndex?: boolean;
  }>(),
  {
    selectable: true,
    showIndex: false
  }
);

const emit = defineEmits<{
  (e: 'selection-change', selection: any[]): void;
  (e: 'row-click', row: any): void;
  (e: 'view-detail', row: any): void;
}>();

const tableRef = ref<any>(null);
const columnFilters = reactive<Record<string, string>>({});

// 内联列过滤逻辑
const filteredData = computed(() => {
  return props.data.filter(row => {
    for (const [key, val] of Object.entries(columnFilters)) {
      if (val && val.trim() !== '') {
        const cellValue = String(row[key] ?? '').toLowerCase();
        if (!cellValue.includes(val.trim().toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  });
});

// 计算汇总数据
const summaryStats = computed(() => {
  let totalQty = 0;
  let totalWeight = 0;
  let totalVolume = 0;
  let totalAmount = 0;

  filteredData.value.forEach(row => {
    if (row.qty) totalQty += Number(row.qty) || 0;
    if (row.weight) totalWeight += Number(row.weight) || 0;
    if (row.volume) totalVolume += Number(row.volume) || 0;
    if (row.amount) totalAmount += Number(row.amount) || 0;
    if (row.totalFee) totalAmount += Number(row.totalFee) || 0;
  });

  return { totalQty, totalWeight, totalVolume, totalAmount };
});

function handleSelectionChange(selection: any[]) {
  emit('selection-change', selection);
}

function handleRowClick(row: any) {
  emit('row-click', row);
}

function getStatusClass(status: string) {
  switch (status) {
    case '开单': return 'status-draft';
    case '配载中': return 'status-loading';
    case '已发车': return 'status-transit';
    case '已到站': return 'status-arrive';
    case '送货中': return 'status-deliver';
    case '已签收': return 'status-done';
    case '已作废': return 'status-cancel';
    default: return 'status-default';
  }
}
</script>

<style scoped lang="scss">
.tms-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  position: relative;
  overflow: hidden;

  .tms-custom-table {
    flex: 1;
    width: 100%;

    :deep(.el-table__header-wrapper) {
      th {
        background-color: #3b82f6 !important;
        color: #ffffff !important;
        font-weight: 600;
        padding: 4px 0;
        font-size: 12px;
      }
    }

    :deep(.el-table__body) {
      font-size: 12px;
      td {
        padding: 4px 0;
      }
    }
  }

  .tms-header-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 2px 4px;

    .header-label {
      font-size: 12px;
      line-height: 1.2;
      margin-bottom: 4px;
      white-space: nowrap;
    }

    .header-filter-input {
      width: 100%;
      height: 20px;
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 2px;
      background: #ffffff;
      color: #333333;
      padding: 0 4px;
      font-size: 11px;
      outline: none;

      &:focus {
        border-color: #ff9900;
        box-shadow: 0 0 3px rgba(255, 153, 0, 0.5);
      }
    }
  }

  .status-badge {
    display: inline-block;
    padding: 1px 6px;
    border-radius: 2px;
    font-size: 11px;
    font-weight: 500;

    &.status-draft { background: #e6f7ff; color: #1890ff; border: 1px solid #91d5ff; }
    &.status-loading { background: #fffbe6; color: #faad14; border: 1px solid #ffe58f; }
    &.status-transit { background: #e6fffb; color: #13c2c2; border: 1px solid #87e8de; }
    &.status-arrive { background: #f6ffed; color: #52c41a; border: 1px solid #b7eb8f; }
    &.status-deliver { background: #f9f0ff; color: #722ed1; border: 1px solid #d3adf7; }
    &.status-done { background: #f6ffed; color: #389e0d; border: 1px solid #95de64; }
    &.status-cancel { background: #fff1f0; color: #f5222d; border: 1px solid #ffa39e; }
    &.status-default { background: #f5f5f5; color: #595959; }
  }

  .link-cell {
    color: #1890ff;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }

  .money-cell {
    font-family: Consolas, Menlo, monospace;
    font-weight: 600;
    color: #333;
  }

  .tms-summary-footer {
    display: flex;
    align-items: center;
    gap: 20px;
    height: 32px;
    padding: 0 16px;
    background: #f7f9fc;
    border-top: 1px solid #ebeef5;
    font-size: 12px;
    color: #606266;

    .summary-item {
      display: flex;
      align-items: center;
      gap: 4px;

      strong {
        color: #303133;
      }

      .highlight-money {
        color: #f56c6c;
        font-size: 13px;
        font-weight: 700;
      }
    }
  }
}
</style>
