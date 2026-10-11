<template>
  <div class="multi-tags-container">
    <div class="nav-arrow left" @click="scrollLeft">
      <el-icon :size="12"><ArrowLeft /></el-icon>
    </div>

    <div ref="scrollContainer" class="tags-scroll-wrapper">
      <div
        v-for="tag in tagsStore.tags"
        :key="tag.path"
        class="tag-item"
        :class="{ active: currentPath === tag.path }"
        @click="selectTag(tag)"
      >
        <span class="tag-title">{{ tag.title }}</span>
        <el-icon
          v-if="tag.closable"
          class="tag-close-icon"
          @click.stop="closeTag(tag.path)"
        >
          <Close />
        </el-icon>
      </div>
    </div>

    <div class="nav-arrow right" @click="scrollRight">
      <el-icon :size="12"><ArrowRight /></el-icon>
    </div>

    <!-- 快捷操作区 -->
    <div class="tags-actions">
      <div class="action-icon" title="刷新页面" @click="refreshPage">
        <el-icon :size="13"><RefreshRight /></el-icon>
      </div>
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="action-icon" title="标签操作">
          <el-icon :size="13"><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeOthers">关闭其他</el-dropdown-item>
            <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTagsStore, TagItem } from '@/store/tags';
import {
  ArrowLeft,
  ArrowRight,
  RefreshRight,
  ArrowDown,
  Close
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const tagsStore = useTagsStore();

const currentPath = computed(() => route.path);
const scrollContainer = ref<HTMLElement | null>(null);

watch(
  () => route.path,
  () => {
    if (route.meta?.title && route.path !== '/redirect') {
      tagsStore.addTag({
        path: route.path,
        title: (route.meta.title as string) || '页面',
        closable: route.path !== '/welcome'
      });
      tagsStore.setCurrent(route.path);
    }
  },
  { immediate: true }
);

function selectTag(tag: TagItem) {
  router.push(tag.path);
  tagsStore.setCurrent(tag.path);
}

function closeTag(path: string) {
  tagsStore.removeTag(path);
  if (route.path === path) {
    router.push(tagsStore.currentPath);
  }
}

function scrollLeft() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft -= 150;
  }
}

function scrollRight() {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += 150;
  }
}

function refreshPage() {
  router.replace({ path: '/redirect' + route.fullPath }).catch(() => {
    router.push(route.fullPath);
  });
}

function handleCommand(cmd: string) {
  if (cmd === 'closeOthers') {
    tagsStore.closeOthers(route.path);
  } else if (cmd === 'closeAll') {
    tagsStore.closeAll();
    router.push('/welcome');
  }
}
</script>

<style scoped lang="scss">
.multi-tags-container {
  display: flex;
  align-items: center;
  height: 39px;
  background-color: #ffffff;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 1px 4px 0;
  position: relative;
  z-index: 800;

  .nav-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 100%;
    color: #909399;
    cursor: pointer;
    flex-shrink: 0;

    &:hover {
      color: #4F77CB;
      background-color: #f2f6fc;
    }
  }

  .tags-scroll-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 0 4px;

    &::-webkit-scrollbar {
      display: none;
    }

    .tag-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 28px;
      line-height: 28px;
      padding: 0 10px;
      border-radius: 3px 3px 0 0;
      background-color: #F5F5F5;
      color: #606266;
      font-size: 13px;
      cursor: pointer;
      white-space: nowrap;
      box-shadow: 0 0 1px #888888;
      transition: all 0.2s;

      &:hover {
        background-color: #e9edf5;
        color: #303133;
      }

      &.active {
        background-color: #4F77CB !important;
        color: #ffffff !important;
        font-weight: 500;

        .tag-close-icon {
          color: #ffffff;
          &:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
        }
      }

      .tag-close-icon {
        font-size: 11px;
        border-radius: 50%;
        padding: 1px;
        color: #909399;
        transition: all 0.15s;

        &:hover {
          background-color: #c0c4cc;
          color: #ffffff;
        }
      }
    }
  }

  .tags-actions {
    display: flex;
    align-items: center;
    height: 100%;
    border-left: 1px solid #ebeef5;
    padding-left: 4px;

    .action-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 3px;
      color: #909399;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: #4F77CB;
        background-color: #f2f6fc;
      }
    }
  }
}
</style>
