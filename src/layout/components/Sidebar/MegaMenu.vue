<template>
  <div :class="[isNext ? 'nextMenu' : 'link-item-box']">
    <div
      v-for="(k, idx) in filteredList"
      :key="k.path || idx"
      :class="['link-item-top', { itemInvalid: k.meta?.menuType === 2 }]"
    >
      <!-- 分组标题 (menuType == 1) -->
      <div v-if="k.meta?.menuType === 1" class="link-item-label">
        {{ k.meta.title }}
      </div>

      <!-- 菜单页面项 (menuType == 2) -->
      <div
        v-if="k.meta?.menuType === 2"
        class="link-item"
        @click="handleItemClick(k)"
        @mouseenter="handleMouseEnter(k)"
        @mouseleave="handleMouseLeave(k)"
      >
        <svg v-if="k.meta?.icon" class="icon iconPanleNav" aria-hidden="true">
          <use :xlink:href="'#' + k.meta.icon" />
        </svg>
        <span class="menu-part-content">
          <span class="menu-part-txt">
            {{ k.meta.title }}
            <span
              v-show="hoveredPath === k.path && canShowAddBtn(k)"
              class="add-btn-badge"
              @click.stop="handleItemClick(k, k.addBtn)"
            >新建</span>
          </span>
        </span>
      </div>

      <!-- 递归渲染下一级菜单 (LargePanel is-next) -->
      <MegaMenu
        v-if="k.children && k.children.length > 0 && hasValidSubItems(k.children)"
        :router-panel-list="k.children"
        :is-next="true"
        @select="(subItem, addFlag) => emit('select', subItem, addFlag)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { MenuItem } from '@/mock/menuData';

defineOptions({
  name: 'MegaMenu'
});

const props = withDefaults(
  defineProps<{
    routerPanelList?: MenuItem[];
    isNext?: boolean;
  }>(),
  {
    routerPanelList: () => [],
    isNext: false
  }
);

const emit = defineEmits<{
  (e: 'select', item: MenuItem, addBtn?: number): void;
}>();

const hoveredPath = ref<string>('');

// 100% 复刻原版 LargePanel 过滤逻辑：仅保留 menuType == 1 (分组) 或 menuType == 2 (页面)，过滤掉 menuType == 3 (按钮) 和 menuType == 4 (隐藏页如运单综合查询)
const filteredList = computed(() =>
  (props.routerPanelList || []).filter(
    item => item?.meta?.menuType === 1 || item?.meta?.menuType === 2
  )
);

function hasValidSubItems(children: MenuItem[]): boolean {
  return children.some(c => c?.meta?.menuType === 1 || c?.meta?.menuType === 2);
}

// 100% 复刻原版 s = _ => { _.children.find(F => F.name == "insert") && _.addBtn == 1 && (_.isShowAddBtn = 1) }
function canShowAddBtn(item: MenuItem): boolean {
  if (item.addBtn !== 1) return false;
  return Boolean(item.children && item.children.some(c => c.name === 'insert'));
}

function handleMouseEnter(item: MenuItem) {
  hoveredPath.value = item.path;
}

function handleMouseLeave(item: MenuItem) {
  if (hoveredPath.value === item.path) {
    hoveredPath.value = '';
  }
}

function handleItemClick(item: MenuItem, addBtn?: number) {
  emit('select', item, addBtn);
}
</script>

<style scoped lang="scss">
/* 100% 还原线上 index.de2c3366.css [data-v-ede9fc2a] 与 real_layout_theme.css 样式 */
.link-item-box {
  width: 560px;
  height: auto;
  border-radius: 5px;
  padding-bottom: 10px;
  background-color: #fff;
  overflow-y: auto;
  user-select: none;
}

.link-item-top {
  padding-top: 15px;

  .link-item-label {
    height: 14px;
    width: 200px;
    font-size: 14px;
    line-height: 14px;
    text-indent: 7px;
    background: #fdfdfd;
    font-weight: 800;
    position: relative;
    left: 19px;
    top: 7px;
    border-left: 3px solid #4F77CB;
    color: #4F77CB;
  }

  .link-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 18px 5px 12px 0;
    border-bottom: 1px dashed #ddd;

    .iconPanleNav {
      width: 20px;
      height: 20px;
      vertical-align: middle;
      display: inline-block;
      flex-shrink: 0;
    }

    .menu-part-content {
      flex-grow: 1;
      vertical-align: middle;
      display: inline-block;
      overflow: hidden;

      .menu-part-txt {
        font-size: 15px;
        line-height: 20px;
        display: block;
        text-align: left;
        padding-left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #303133;

        .add-btn-badge {
          background: #4F77CB;
          color: #fff;
          width: 24px;
          font-size: 11px;
          margin-left: 5px;
          padding: 3px 3px 2px;
          font-weight: 400;
          line-height: 1;
          vertical-align: middle;
        }
      }
    }
  }
}

.itemInvalid {
  padding-top: 0;
  width: 23%;
  display: inline-block;

  .link-item {
    width: 100%;
  }
}

.nextMenu {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-left: 17px;

  .link-item-top {
    padding-top: 0;
    width: 25%;

    .link-item {
      width: 100%;
    }
  }
}
</style>
