<template>
  <div class="tms-action-bar">
    <div class="action-left">
      <!-- 新增 -->
      <button class="tms-btn btn-green" @click="$emit('action', 'add')">
        <el-icon><Plus /></el-icon>
        <span>新增</span>
      </button>

      <!-- 修改 -->
      <button class="tms-btn btn-cyan" @click="$emit('action', 'edit')">
        <el-icon><EditPen /></el-icon>
        <span>修改</span>
      </button>

      <!-- 批量改单 -->
      <button class="tms-btn btn-yellow" @click="$emit('action', 'batchEdit')">
        <el-icon><DocumentCopy /></el-icon>
        <span>批量改单</span>
      </button>

      <!-- 更改单据 -->
      <button class="tms-btn btn-orange" @click="$emit('action', 'changeOrder')">
        <el-icon><Tickets /></el-icon>
        <span>更改单据</span>
      </button>

      <!-- 删除 -->
      <button class="tms-btn btn-red" @click="$emit('action', 'delete')">
        <el-icon><Delete /></el-icon>
        <span>删除</span>
      </button>

      <!-- 干线配载 (带下拉) -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-teal">
          <el-icon><Van /></el-icon>
          <span>干线配载</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="transLoad">新增干线配载</el-dropdown-item>
            <el-dropdown-item command="transList">干线配载列表</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 本地外发 (带下拉) -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-teal">
          <el-icon><Promotion /></el-icon>
          <span>本地外发</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="localOutgo">新增本地外发</el-dropdown-item>
            <el-dropdown-item command="destOutgo">终端外发</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 到达确认 -->
      <button class="tms-btn btn-green" @click="$emit('action', 'arriveConfirm')">
        <el-icon><Checked /></el-icon>
        <span>到达确认</span>
      </button>

      <!-- 自提签收 (带下拉) -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-teal">
          <el-icon><DocumentChecked /></el-icon>
          <span>自提签收</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="signDirect">自提签收</el-dropdown-item>
            <el-dropdown-item command="signBatch">批量签收</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 货款收回 -->
      <button class="tms-btn btn-cyan" @click="$emit('action', 'paymentCollect')">
        <el-icon><Coin /></el-icon>
        <span>货款收回</span>
      </button>
    </div>

    <div class="action-right">
      <!-- 打印 -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-blue">
          <el-icon><Printer /></el-icon>
          <span>打印</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="printWaybill">打印运单</el-dropdown-item>
            <el-dropdown-item command="printLabel">打印标签</el-dropdown-item>
            <el-dropdown-item command="printManifest">打印清单</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 打印预览 -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-blue">
          <el-icon><View /></el-icon>
          <span>打印预览</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="previewWaybill">运单套打预览</el-dropdown-item>
            <el-dropdown-item command="previewLabel">标签格式预览</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 更多 -->
      <el-dropdown trigger="click" @command="(cmd: string) => $emit('action', cmd)">
        <button class="tms-btn btn-blue">
          <el-icon><MoreFilled /></el-icon>
          <span>更多</span>
          <el-icon class="arrow-down"><ArrowDown /></el-icon>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="exportExcel">导出Excel</el-dropdown-item>
            <el-dropdown-item command="columnConfig">表格列配置</el-dropdown-item>
            <el-dropdown-item command="cancelWaybill">作废运单</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Plus,
  EditPen,
  DocumentCopy,
  Tickets,
  Delete,
  Van,
  Promotion,
  Checked,
  DocumentChecked,
  Coin,
  Printer,
  View,
  MoreFilled,
  ArrowDown
} from '@element-plus/icons-vue';

const emit = defineEmits<{
  (e: 'action', actionKey: string): void;
}>();
</script>

<style scoped lang="scss">
.tms-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  background-color: #f7f9fc;
  border-bottom: 1px solid #ebeef5;
  gap: 10px;

  .action-left {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }

  .action-right {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .tms-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 26px;
    padding: 0 10px;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    color: #ffffff;
    transition: all 0.2s ease;
    white-space: nowrap;

    .arrow-down {
      font-size: 10px;
      margin-left: 2px;
    }

    &:hover {
      opacity: 0.88;
      transform: translateY(-1px);
    }

    &.btn-green {
      background-color: #52c41a;
    }

    &.btn-cyan {
      background-color: #13c2c2;
    }

    &.btn-yellow {
      background-color: #e6a23c;
    }

    &.btn-orange {
      background-color: #fa8c16;
    }

    &.btn-red {
      background-color: #f56c6c;
    }

    &.btn-teal {
      background-color: #20b2aa;
    }

    &.btn-blue {
      background-color: #3b82f6;
    }
  }
}
</style>
