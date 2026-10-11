<template>
  <div class="frequently-container">
    <div class="top">
      <span>常用功能</span>
      <el-button size="large" :icon="Setting" @click="$emit('open-setting')">
        常用功能设置
      </el-button>
    </div>

    <div class="bottom">
      <el-row class="w-100">
        <el-col
          v-for="(item, idx) in list"
          :key="idx"
          :span="6"
          class="p-10 card-panel-col"
        >
          <div class="card-panel" @click="handleClick(item)">
            <svg class="iconFont" aria-hidden="true" style="width: 4em; height: 4em;">
              <use :xlink:href="'#' + item.meta.icon" />
            </svg>
            <div class="card-panel-description">
              <div class="card-panel-text">{{ item.meta.title }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { useTagsStore } from '@/store/tags';

export interface ShortcutItem {
  path: string;
  meta: {
    title: string;
    icon: string;
  };
}

defineProps<{
  list: ShortcutItem[];
}>();

defineEmits<{
  (e: 'open-setting'): void;
}>();

const router = useRouter();
const tagsStore = useTagsStore();

function handleClick(item: ShortcutItem) {
  router.push(item.path);
  tagsStore.addTag({ path: item.path, title: item.meta.title });
}
</script>

<style scoped lang="scss">
/* 100% 复刻线上 assets_index.6c5a8854.css (data-v-5e41b091) */
.p-10 {
  padding: 10px;
}

.w-100 {
  width: 100%;
}

.frequently-container {
  .top {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bottom {
    padding: 0 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;

    .card-panel-col {
      transition: all 0.3s ease-in-out;

      &:hover {
        transform: scale(1.1);
      }
    }

    .card-panel {
      height: 10vh;
      width: 100%;
      cursor: pointer;
      padding: 20px;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        .card-panel-text {
          color: #36a3f7 !important;
        }
      }

      .card-panel-description {
        float: right;
        font-weight: 700;

        .card-panel-text {
          transition: all 0.38s ease-out;
          line-height: 18px;
          margin-right: 15px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
        }
      }
    }
  }
}
</style>
