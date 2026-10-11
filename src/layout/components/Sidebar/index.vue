<template>
  <div
    class="sidebar-container has-logo"
    :class="{ openMenubar: !isCollapse, 'is-collapse': isCollapse }"
  >
    <Logo :is-collapse="isCollapse" />

    <!-- 100% 复刻原版 el-scrollbar + el-menu(collapse=true) + el-sub-menu(popper-class="sub-menu-popper130") -->
    <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-scrollbar">
      <el-menu
        ref="menuRef"
        :default-active="currentActivePath"
        :collapse="true"
        unique-opened
        :collapse-transition="false"
        mode="vertical"
        class="outer-most"
      >
        <template v-for="item in menuList" :key="item.path">
          <!-- 无子菜单项 (如：上游订单 /prevorder) -->
          <el-menu-item
            v-if="!item.children || item.children.length === 0"
            :index="item.path"
            class="submenu-title-noDropdown outer-most"
            :class="{ 'is-active': currentActivePath === item.path }"
            style="display: flex; align-items: center;"
            @click="handleMenuClick(item)"
          >
            <svg v-if="item.meta?.icon" class="icon iconSvgNav" aria-hidden="true">
              <use :xlink:href="'#' + item.meta.icon" />
            </svg>
            <div
              v-if="!isCollapse"
              class="menu-title-wrap"
            >
              <span class="menu-title-span">{{ item.meta?.title }}</span>
              <span
                v-if="item.path === '/prevorder' && orderStore.pendingUpstreamCount > 0"
                class="prevorder-badge"
              >
                {{ orderStore.pendingUpstreamCount }}
              </span>
            </div>
          </el-menu-item>

          <!-- 含子菜单项 (营运中心、财务中心、货款中心、回单管理等) -->
          <el-sub-menu
            v-else
            :index="item.path"
            class="outer-most"
            :class="{ 'is-active': isChildActive(item) }"
            :popper-class="isCollapse ? 'sub-menu-popper60' : 'sub-menu-popper130'"
            :popper-offset="6"
            :show-timeout="30"
            :hide-timeout="120"
          >
            <template #title>
              <svg v-if="item.meta?.icon" class="icon iconSvgNav" aria-hidden="true">
                <use :xlink:href="'#' + item.meta.icon" />
              </svg>
              <div
                v-if="!isCollapse"
                class="menu-title-wrap"
                :class="{ 'active-bottom-line': item.path === '/operation' }"
              >
                <span
                  class="menu-title-span"
                  :style="{
                    margin: item.path === '/operation' ? '0px 0px 0px 22px' : '0px'
                  }"
                >
                  {{ item.meta?.title }}
                </span>
              </div>
            </template>

            <MegaMenu
              :router-panel-list="item.children"
              @select="(subItem, addBtn) => handleSubSelect(subItem, addBtn, item.path)"
            />
          </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>

    <!-- 底部功能工具栏 .sidebar-diy -->
    <div class="sidebar-diy">
      <span class="el-icon-setting item" title="系统设置" @click="handleToolClick('settings')">
        <el-icon :size="19"><Setting /></el-icon>
      </span>
      <span class="item appHot" title="下载客户端与移动端扫码" @click="handleToolClick('download')">
        <el-icon :size="19"><Download /></el-icon>
      </span>
      <span class="item appHot" title="分享查单/下单链接" @click="handleToolClick('locale')">
        <svg class="globe-svg" viewBox="0 0 1024 1024" width="19" height="19">
          <path
            fill="currentColor"
            d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm375.5 416H696.2c-5.4-112.4-40.8-216.5-98.2-298.8 153.2 41.2 269.6 173.9 289.5 330.8v-32zm-375.5 416c-69.5 0-148.6-127.6-158.8-352h317.6c-10.2 224.4-89.3 352-158.8 352zM353.2 480c10.2-224.4 89.3-352 158.8-352s148.6 127.6 158.8 352H353.2zm73.6-298.8C369.4 263.5 334 367.6 328.6 480H136.5c19.9-156.9 136.3-289.6 290.3-298.8zM136.5 544h192.1c5.4 112.4 40.8 216.5 98.2 298.8C273.6 801.6 156.4 668.9 136.5 544zm460.3 298.8c57.4-82.3 92.8-186.4 98.2-298.8h192.5c-19.9 124.9-137.1 257.6-290.7 298.8z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useTagsStore } from '@/store/tags';
import { useOrderStore } from '@/store/order';
import { WHOLE_MENUS, MenuItem } from '@/mock/menuData';
import { Setting, Download } from '@element-plus/icons-vue';
import Logo from './Logo.vue';
import MegaMenu from './MegaMenu.vue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const tagsStore = useTagsStore();
const orderStore = useOrderStore();

const menuRef = ref<any>(null);
const isCollapse = computed(() => !appStore.sidebarOpened);
const menuList = ref<MenuItem[]>(WHOLE_MENUS);

const currentActivePath = computed(() => route.path);

function isChildActive(item: MenuItem): boolean {
  if (!item.children) return false;
  return item.children.some(
    g => g.path === route.path || g.children?.some(c => c.path === route.path)
  );
}

function handleMenuClick(item: MenuItem) {
  if (!item.children || item.children.length === 0) {
    router.push(item.path);
    tagsStore.addTag({ path: item.path, title: item.meta?.title || '页面' });
  }
}

// 100% 复刻原版 LargePanel w(_, p) 点击与【新建】跳转逻辑
function handleSubSelect(item: MenuItem, addBtn?: number, parentIndex?: string) {
  // 点击后自动收起悬浮子菜单
  if (parentIndex && menuRef.value?.close) {
    try {
      menuRef.value.close(parentIndex);
    } catch {
      // ignore
    }
  }

  if (addBtn) {
    const addJumpMap: Record<string, { path: string; title: string }> = {
      '/operation/order/orderlist': { path: '/operation/order/custorder', title: '创建订单' },
      '/operation/ship/shiplist': { path: '/customRoute/addShip', title: '录运单' },
      '/operation/ship/translist': { path: '/customRoute/addTranslist', title: '新增干线配载' },
      '/operation/ship/stranslist': { path: '/customRoute/addStrans', title: '新增短途配载' },
      '/operation/arrive/arriveassign': { path: '/customRoute/addArrive', title: '新增到货分拨' },
      '/operation/arrive/homelist': { path: '/customRoute/addDeliverHome', title: '新增送货上门' }
    };
    const target = addJumpMap[item.path];
    if (target) {
      router.push(target.path);
      tagsStore.addTag(target);
      return;
    }
  }

  const query = addBtn ? { addBtn: String(addBtn) } : undefined;
  router.push({ path: item.path, query });
  tagsStore.addTag({ path: item.path, title: item.meta?.title || '页面' });
}

function handleToolClick(type: string) {
  if (type === 'settings') {
    router.push('/system/setting/define');
    tagsStore.addTag({ path: '/system/setting/define', title: '自定义设置' });
  } else if (type === 'download') {
    router.push('/system/setting/print');
    tagsStore.addTag({ path: '/system/setting/print', title: '打印设置' });
    ElMessage.success('已进入打印插件与客户端模板管理中心');
  } else if (type === 'locale') {
    const shareUrl = `${window.location.origin}/operation/order/custorder?tenant=777`;
    navigator.clipboard?.writeText(shareUrl).catch(() => {});
    ElMessage.success(`客户自助查单/下单链接已复制：${shareUrl}`);
  }
}
</script>

<style lang="scss">
/* 全局注入线上 sub-menu-popper130 与 el-menu--popup 样式 (源自 index.5da8c92b.css 与 real_layout_theme.css) */
.sub-menu-popper130 {
  left: 136px !important;
  border: none !important;
  background: transparent !important;

  .el-menu--popup {
    padding: 0 !important;
    border-radius: 5px !important;
    background-color: #4F77CB !important;
    box-shadow: 1px 0px 10px #4F77CB !important;
    min-width: 200px;
    border: none !important;
  }
}

.sub-menu-popper60 {
  left: 60px !important;
  border: none !important;
  background: transparent !important;

  .el-menu--popup {
    padding: 0 !important;
    border-radius: 5px !important;
    background-color: #4F77CB !important;
    box-shadow: 1px 0px 10px #4F77CB !important;
    min-width: 200px;
    border: none !important;
  }
}
</style>

<style scoped lang="scss">
/* 100% 复刻线上 index.5da8c92b.css 与 real_layout_theme.css 中 .sidebar-container 样式 */
.sidebar-container {
  transition: width 0.28s;
  width: 130px !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #4F77CB;
  font-size: 0;
  z-index: 1001;
  box-shadow: 0 0 1px #888;
  user-select: none;
  flex-shrink: 0;

  &.is-collapse {
    width: 54px !important;
  }

  .sidebar-scrollbar {
    padding-top: 18px;
    height: calc(100% - 86px);

    :deep(.scrollbar-wrapper) {
      overflow-x: hidden !important;
    }
  }

  :deep(.el-menu) {
    border: none;
    height: 100%;
    width: 100% !important;
    background-color: transparent !important;
  }

  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 50px;
    line-height: 50px;
    padding: 0 0 0 16px !important;
    color: #fff !important;
    background-color: #4F77CB !important;
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
      background-color: #2D71B6 !important;
      color: #fff !important;
    }

    .el-sub-menu__icon-arrow {
      display: none !important;
    }
    .el-menu-tooltip__trigger {
      padding: 0 0 0 16px !important;
      display: flex;
      align-items: center;
    }
  }

  :deep(.el-sub-menu:hover > .el-sub-menu__title),
  :deep(.el-sub-menu.is-opened > .el-sub-menu__title) {
    background-color: #2D71B6 !important;
    color: #fff !important;
  }

  /* 激活项左侧 3px 白色竖条 */
  :deep(.el-menu--collapse .is-active.outer-most.el-sub-menu > .el-sub-menu__title::before),
  :deep(.el-menu--collapse .is-active.submenu-title-noDropdown.outer-most::before) {
    position: absolute;
    top: 0;
    left: 0;
    width: 3px;
    height: 100%;
    content: "";
    background-color: #fff;
    clear: both;
    transition: all 0.2s ease-in-out;
    transform: translateY(0);
  }

  .iconSvgNav {
    width: 24px;
    height: 24px;
    padding-right: 3px;
    fill: currentColor;
    color: #fff;
    flex-shrink: 0;
  }

  .menu-title-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    height: 50px;
    line-height: 51px;
    padding-left: 5px;
    font-weight: 800;

    &.active-bottom-line {
      border-top: 1px solid #f0f2f5;
      margin-right: 20px;
      margin-left: -20px;
    }
  }

  .menu-title-span {
    width: 100px;
    height: 50px;
    line-height: 51px;
    padding-left: 5px;
    font-size: 14px;
    font-weight: 800;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
  }

  /* 上游订单红色数字角标 (100% 复刻 Nn 组件内联样式) */
  .prevorder-badge {
    right: 13px;
    position: absolute;
    top: 2px;
    color: white;
    background: red;
    width: 17px;
    height: 17px;
    line-height: 17px;
    border-radius: 14px;
    display: inline-block;
    text-align: center;
    font-size: 13px;
    font-weight: normal;
  }

  /* 底部 3 个功能图标栏 .sidebar-diy */
  .sidebar-diy {
    height: 38px;
    width: 100%;
    display: flex;
    cursor: pointer;
    background: #4F77CB;

    .item {
      width: 44px !important;
      text-align: center;
      height: 38px;
      display: flex !important;
      align-items: center;
      justify-content: center;
      flex: 1;
      color: #fff;

      &:hover {
        background-color: #2D71B6;
      }
    }

    .globe-svg {
      color: #fff;
    }
  }
}
</style>
