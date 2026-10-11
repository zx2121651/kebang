<template>
  <div>
    <div class="top">
      <span>数据展示</span>
      <el-button size="large" :icon="Setting" @click="$emit('open-custom')">
        自定义
      </el-button>
    </div>

    <div class="middle">
      <div
        v-for="(item, idx) in list"
        :key="item.staticType"
        class="dis-panel-col"
        :class="{ active: activeIndex === idx }"
        @click="handleSelect(idx, item.staticType)"
      >
        <div class="dis-panel-icon-wrapper">
          <div class="dis-panel-text">{{ item.staticTypeStr }}</div>
        </div>
        <div class="dis-panel-description">
          <CountTo :end-val="item.staticCount" :duration="2000" class="dis-panel-num" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue';
import CountTo from '@/components/CountTo/index.vue';
import { StaticCountItem } from '@/mock/dashboardData';

defineProps<{
  list: StaticCountItem[];
  activeIndex: number;
}>();

const emit = defineEmits<{
  (e: 'change', index: number, type: number): void;
  (e: 'open-custom'): void;
}>();

function handleSelect(index: number, type: number) {
  emit('change', index, type);
}
</script>

<style scoped lang="scss">
/* 100% 复刻线上 assets_index.6c5a8854.css (data-v-5e41b091) */
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.middle {
  display: flex;
  width: 100%;
  margin-bottom: 20px;

  .dis-panel-col {
    transition: all 0.3s ease;
    border: 1px solid #e8e8e8;
    width: 20%;
    cursor: pointer;
    padding: 20px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &.active {
      border-color: #36a3f7;
      color: #36a3f7 !important;
    }

    &:hover {
      color: #36a3f7 !important;
    }

    .dis-panel-icon-wrapper {
      display: flex;
      align-items: center;

      .dis-panel-text {
        font-size: 16px;
        margin-left: 15px;
      }
    }

    .dis-panel-description {
      text-align: right;

      .dis-panel-num {
        font-size: 32px;
        font-weight: 400;
      }
    }
  }
}
</style>
