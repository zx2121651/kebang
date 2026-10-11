<template>
  <div class="tms-filter-bar">
    <div class="filter-left">
      <!-- 日期类型下拉 -->
      <el-select v-model="filterModel.dateType" size="small" class="date-type-select">
        <el-option label="托运日期" value="shipDate" />
        <el-option label="开单日期" value="createDate" />
        <el-option label="到货日期" value="arriveDate" />
        <el-option label="签收日期" value="signDate" />
      </el-select>

      <!-- 日期范围选择器 -->
      <el-date-picker
        v-model="filterModel.dateRange"
        type="daterange"
        size="small"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date-range-picker"
      />

      <!-- 始发网点 -->
      <el-select
        v-model="filterModel.startNetwork"
        placeholder="始发网点"
        clearable
        size="small"
        class="network-select"
      >
        <el-option label="全部始发网点" value="" />
        <el-option label="总部" value="总部" />
        <el-option label="广州分拨" value="广州分拨" />
        <el-option label="深圳网点" value="深圳网点" />
        <el-option label="武汉分拨" value="武汉分拨" />
        <el-option label="成都网点" value="成都网点" />
      </el-select>

      <!-- 终端网点 -->
      <el-select
        v-model="filterModel.destNetwork"
        placeholder="终端网点"
        clearable
        size="small"
        class="network-select"
      >
        <el-option label="全部终端网点" value="" />
        <el-option label="北京网点" value="北京网点" />
        <el-option label="上海分拨" value="上海分拨" />
        <el-option label="杭州网点" value="杭州网点" />
        <el-option label="南京网点" value="南京网点" />
        <el-option label="郑州网点" value="郑州网点" />
      </el-select>

      <!-- 批量单号多行搜索 -->
      <div class="bulk-search-box">
        <el-input
          v-model="filterModel.bulkShipNos"
          type="text"
          size="small"
          placeholder="支持运单号批量搜索，多个单号用加号/回车/空格 分隔"
          class="bulk-input"
          clearable
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- 查询按钮 -->
      <el-button type="primary" size="small" class="btn-search" @click="handleSearch">
        <el-icon><Search /></el-icon>
        <span>查询</span>
      </el-button>

      <!-- 高级筛选漏斗按钮 -->
      <div class="funnel-btn" title="高级组合筛选" @click="$emit('toggle-advanced')">
        <el-icon :size="15"><Filter /></el-icon>
      </div>
    </div>

    <!-- 右侧分页与统计信息 -->
    <div class="filter-right">
      <span class="total-text">共 {{ total }} 条</span>
      
      <el-select v-model="pageSize" size="small" class="page-size-select" @change="handlePageChange">
        <el-option label="50条/页" :value="50" />
        <el-option label="100条/页" :value="100" />
        <el-option label="200条/页" :value="200" />
      </el-select>

      <div class="pager-btns">
        <button class="pager-arrow" :disabled="currentPage <= 1" @click="prevPage">&lt;</button>
        <span class="current-page-num">{{ currentPage }}</span>
        <button class="pager-arrow" :disabled="currentPage * pageSize >= total" @click="nextPage">&gt;</button>
      </div>

      <div class="jump-wrap">
        <span>前往</span>
        <input v-model.number="jumpPage" type="text" class="jump-input" @keyup.enter="handleJump" />
        <span>页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Search, Filter } from '@element-plus/icons-vue';

const props = withDefaults(
  defineProps<{
    total?: number;
  }>(),
  {
    total: 0
  }
);

const emit = defineEmits<{
  (e: 'search', params: any): void;
  (e: 'toggle-advanced'): void;
}>();

const pageSize = ref(100);
const currentPage = ref(1);
const jumpPage = ref(1);

const today = new Date().toISOString().slice(0, 10);

const filterModel = reactive({
  dateType: 'shipDate',
  dateRange: [today, today],
  startNetwork: '',
  destNetwork: '',
  bulkShipNos: ''
});

function handleSearch() {
  emit('search', {
    ...filterModel,
    page: currentPage.value,
    pageSize: pageSize.value
  });
}

function handlePageChange() {
  currentPage.value = 1;
  handleSearch();
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
    handleSearch();
  }
}

function nextPage() {
  currentPage.value++;
  handleSearch();
}

function handleJump() {
  if (jumpPage.value > 0) {
    currentPage.value = jumpPage.value;
    handleSearch();
  }
}
</script>

<style scoped lang="scss">
.tms-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #ffffff;
  border-bottom: 1px solid #ebeef5;
  font-size: 12px;

  .filter-left {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;

    .date-type-select {
      width: 100px;
    }

    .date-range-picker {
      width: 220px !important;
    }

    .network-select {
      width: 120px;
    }

    .bulk-search-box {
      width: 320px;
      .bulk-input {
        width: 100%;
      }
    }

    .btn-search {
      padding: 0 14px;
      height: 28px;
      gap: 4px;
      background-color: #3b82f6;
      border-color: #3b82f6;

      &:hover {
        background-color: #2563eb;
        border-color: #2563eb;
      }
    }

    .funnel-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      color: #3b82f6;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background-color: #ecf5ff;
        border-color: #3b82f6;
      }
    }
  }

  .filter-right {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #606266;

    .total-text {
      white-space: nowrap;
    }

    .page-size-select {
      width: 95px;
    }

    .pager-btns {
      display: flex;
      align-items: center;
      gap: 4px;

      .pager-arrow {
        border: 1px solid #dcdfe6;
        background: #fff;
        padding: 2px 7px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 11px;
        color: #606266;

        &:disabled {
          cursor: not-allowed;
          color: #c0c4cc;
        }

        &:not(:disabled):hover {
          color: #3b82f6;
          border-color: #3b82f6;
        }
      }

      .current-page-num {
        padding: 0 6px;
        font-weight: 600;
        color: #303133;
      }
    }

    .jump-wrap {
      display: flex;
      align-items: center;
      gap: 4px;

      .jump-input {
        width: 32px;
        height: 24px;
        text-align: center;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        font-size: 12px;
        outline: none;

        &:focus {
          border-color: #3b82f6;
        }
      }
    }
  }
}
</style>
