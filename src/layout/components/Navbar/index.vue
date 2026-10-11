<template>
  <div class="navbar-container">
    <!-- 左侧：折叠按钮与系统企业名称 -->
    <div class="navbar-left">
      <div class="toggle-icon-wrap" @click="toggleSidebar">
        <el-icon :size="18">
          <Fold v-if="appStore.sidebarOpened" />
          <Expand v-else />
        </el-icon>
      </div>

      <div class="tenant-title">
        <span>{{ appStore.tenantName }}</span>
      </div>
    </div>

    <!-- 中部：全局快速搜索（支持运单号/收发货人/手机号/功能菜单实时联想） -->
    <div class="navbar-center">
      <el-popover
        :visible="searchPopVisible"
        placement="bottom-start"
        :width="380"
        :hide-after="0"
      >
        <template #reference>
          <div class="search-input-box" @click="searchPopVisible = true">
            <el-icon class="left-icon"><Setting /></el-icon>
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="请输入任意关键字(单号/姓名/菜单/拼音)"
              class="custom-search-input"
              @focus="searchPopVisible = true"
              @input="searchPopVisible = true"
              @keyup.enter="handleSearchEnter"
            />
            <el-icon class="search-icon" @click="handleSearchEnter"><Search /></el-icon>
          </div>
        </template>

        <div class="global-search-pop" @mousedown.prevent>
          <div class="gsp-head">
            <span>全局智能检索联想</span>
            <el-button size="small" link @click="searchPopVisible = false">关闭</el-button>
          </div>

          <div v-if="matchedMenus.length" class="gsp-section">
            <div class="gsp-sec-title">功能菜单</div>
            <div
              v-for="m in matchedMenus"
              :key="m.path"
              class="gsp-item"
              @click="goMenu(m)"
            >
              <el-tag size="small" type="primary">菜单</el-tag>
              <span class="gsp-main">{{ m.title }}</span>
              <span class="gsp-sub">{{ m.path }}</span>
            </div>
          </div>

          <div v-if="matchedWaybills.length" class="gsp-section">
            <div class="gsp-sec-title">匹配运单 ({{ matchedWaybills.length }})</div>
            <div
              v-for="w in matchedWaybills"
              :key="w.id"
              class="gsp-item"
              @click="goWaybillDetail(w)"
            >
              <el-tag size="small" type="success">{{ w.oStatusStr }}</el-tag>
              <span class="gsp-main">{{ w.orderNo }}</span>
              <span class="gsp-sub">{{ w.shipper }} ➔ {{ w.receiver }} ({{ w.destCity }})</span>
            </div>
          </div>

          <div v-if="!matchedMenus.length && !matchedWaybills.length" class="gsp-empty">
            未找到匹配「{{ searchKeyword }}」的单据或菜单
          </div>
        </div>
      </el-popover>
    </div>

    <!-- 右侧：快捷业务操作与用户状态 -->
    <div class="navbar-right">
      <!-- 快捷动作：录运单 -->
      <button class="action-btn" @click="handleAction('createShip')">
        <el-icon><DocumentAdd /></el-icon>
        <span>录运单</span>
      </button>

      <!-- 快捷动作：切换网点 (真实网点下拉切换) -->
      <el-dropdown trigger="click" @command="handleSwitchBranch">
        <button class="action-btn">
          <el-icon><Refresh /></el-icon>
          <span>切换网点</span>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="总部">总部【001】</el-dropdown-item>
            <el-dropdown-item
              v-for="net in archiveStore.networkList"
              :key="net.id"
              :command="net.name"
            >
              {{ net.name }}【{{ net.code }}】
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 消息通知 (真实通知面板) -->
      <el-popover placement="bottom-end" :width="320" trigger="click">
        <template #reference>
          <div class="nav-icon-btn" title="消息通知">
            <el-badge :value="3" :max="9" is-dot>
              <el-icon :size="17"><Bell /></el-icon>
            </el-badge>
          </div>
        </template>
        <div class="notice-pop">
          <div class="np-head">系统业务通知 (3条未读)</div>
          <div class="np-item" @click="router.push('/operation/arrive/arriveconfirm')">
            <div class="np-title">【干线到车提醒】粤A·99681挂 已发车前往长沙分部</div>
            <div class="np-time">10分钟前 · 点击前往到货确认</div>
          </div>
          <div class="np-item" @click="router.push('/prevorder')">
            <div class="np-title">【上游订单提醒】新增 1 笔待受理客户订单</div>
            <div class="np-time">25分钟前 · 点击前往上游订单</div>
          </div>
          <div class="np-item" @click="router.push('/operation/ship/shiplist')">
            <div class="np-title">【回单预警】运单 ZB2610110001 需收回单原件 2 份</div>
            <div class="np-time">1小时前 · 点击查看运单</div>
          </div>
        </div>
      </el-popover>

      <!-- 用户信息与下拉 -->
      <el-dropdown trigger="click" @command="handleUserCommand">
        <div class="user-profile-wrap">
          <img class="user-avatar" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="avatar" />
          <div class="user-meta">
            <span class="user-name">{{ appStore.userName }}</span>
            <span class="user-group">{{ appStore.groupName }}</span>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="pwd">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 全屏切换 -->
      <div class="nav-icon-btn" title="全屏" @click="toggleFullScreen">
        <el-icon :size="17"><FullScreen /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/store/app';
import { useTagsStore } from '@/store/tags';
import { useOperationStore } from '@/store/operation';
import { useArchiveStore } from '@/store/dictionaryAndArchive';
import {
  Fold,
  Expand,
  Search,
  Setting,
  DocumentAdd,
  Refresh,
  Bell,
  FullScreen
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

const router = useRouter();
const appStore = useAppStore();
const tagsStore = useTagsStore();
const opStore = useOperationStore();
const archiveStore = useArchiveStore();

const searchKeyword = ref('');
const searchPopVisible = ref(false);

const quickMenuCatalog = [
  { title: '录运单 / 创建运单', path: '/customRoute/addShip', pinyin: 'lyd cjyd' },
  { title: '运单管理', path: '/operation/ship/shiplist', pinyin: 'ydgl' },
  { title: '运单综合查询', path: '/operation/ship/shipdetail', pinyin: 'ydzhcx' },
  { title: '上游订单', path: '/prevorder', pinyin: 'sydd' },
  { title: '创建订单', path: '/operation/order/custorder', pinyin: 'cjdd' },
  { title: '订单总表', path: '/operation/order/orderlist', pinyin: 'ddzb' },
  { title: '干线配载', path: '/operation/ship/translist', pinyin: 'gxpz' },
  { title: '短途配载', path: '/operation/ship/stranslist', pinyin: 'dtpz' },
  { title: '车辆跟踪', path: '/operation/ship/cartrack', pinyin: 'clgz' },
  { title: '到货确认', path: '/operation/arrive/arriveconfirm', pinyin: 'dhqr' },
  { title: '到货分拨', path: '/operation/arrive/arriveassign', pinyin: 'dhfb' },
  { title: '送货上门', path: '/operation/arrive/homelist', pinyin: 'shsm' },
  { title: '签收管理', path: '/operation/arrive/signlist', pinyin: 'qsgl' },
  { title: '本地外发', path: '/operation/outgo/localoutgo', pinyin: 'bdwf' },
  { title: '终端外发', path: '/operation/outgo/terminaloutgo', pinyin: 'zdwf' },
  { title: '送出外发', path: '/operation/outgo/sendout', pinyin: 'scwf' },
  { title: '外发跟踪', path: '/operation/outgo/outrack', pinyin: 'wfgz' },
  { title: '更改单据', path: '/operation/else/updorder', pinyin: 'ggdj' },
  { title: '改单历史', path: '/operation/else/updlist', pinyin: 'gdls' },
  { title: '作废运单', path: '/operation/else/abolish', pinyin: 'zfyd' },
  { title: '运单库存', path: '/operation/else/stock', pinyin: 'ydkc' },
];

const matchedMenus = computed(() => {
  const kw = searchKeyword.value.trim().toLowerCase();
  if (!kw) return quickMenuCatalog.slice(0, 4);
  return quickMenuCatalog.filter(
    m => m.title.toLowerCase().includes(kw) || m.pinyin.includes(kw) || m.path.toLowerCase().includes(kw)
  ).slice(0, 5);
});

const matchedWaybills = computed(() => {
  const kw = searchKeyword.value.trim().toLowerCase();
  if (!kw) return opStore.shipList.slice(0, 3);
  return opStore.shipList.filter(
    w =>
      String(w.orderNo || '').toLowerCase().includes(kw) ||
      String(w.shipper || '').toLowerCase().includes(kw) ||
      String(w.shipPhone || '').includes(kw) ||
      String(w.receiver || '').toLowerCase().includes(kw) ||
      String(w.receivePhone || '').includes(kw) ||
      String(w.destCity || '').toLowerCase().includes(kw)
  ).slice(0, 5);
});

function goMenu(m: { title: string; path: string }) {
  searchPopVisible.value = false;
  router.push(m.path);
  tagsStore.addTag({ path: m.path, title: m.title.split(' ')[0] });
}

function goWaybillDetail(w: Record<string, any>) {
  searchPopVisible.value = false;
  router.push({
    path: '/operation/ship/shipdetail',
    query: { shipid: w.orderNo, type: 'shipNo' }
  });
}

function handleSearchEnter() {
  if (matchedWaybills.value.length > 0 && searchKeyword.value.trim()) {
    goWaybillDetail(matchedWaybills.value[0]);
  } else if (matchedMenus.value.length > 0 && searchKeyword.value.trim()) {
    goMenu(matchedMenus.value[0]);
  }
}

function handleDocClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (!target.closest('.navbar-center') && !target.closest('.global-search-pop')) {
    searchPopVisible.value = false;
  }
}

onMounted(() => document.addEventListener('mousedown', handleDocClick));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleDocClick));

function toggleSidebar() {
  appStore.toggleSidebar();
}

function handleAction(type: string) {
  if (type === 'createShip') {
    router.push('/customRoute/addShip');
    tagsStore.addTag({ path: '/customRoute/addShip', title: '录运单' });
  }
}

function handleSwitchBranch(branchName: string) {
  appStore.groupName = branchName;
  ElMessage.success(`当前作业网点已切换为：【${branchName}】`);
}

function handleUserCommand(cmd: string) {
  if (cmd === 'logout') {
    ElMessage.success('已安全退出登录');
  } else {
    ElMessage.info(`已打开: ${cmd === 'profile' ? '个人中心' : '修改密码'}`);
  }
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
</script>

<style scoped lang="scss">
.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: linear-gradient(to right, #FFFFFF, #FFFFFF 50%);
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  position: relative;
  z-index: 900;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .toggle-icon-wrap {
      cursor: pointer;
      color: #2f4554;
      display: flex;
      align-items: center;
      padding: 4px;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        color: #4F77CB;
        background-color: #f2f6fc;
      }
    }

    .tenant-title {
      font-size: 14px;
      font-weight: 700;
      color: #2f4554;
      letter-spacing: 0.3px;
    }
  }

  .navbar-center {
    flex: 1;
    max-width: 260px;
    margin: 0 20px;

    .search-input-box {
      display: flex;
      align-items: center;
      background-color: #ffffff;
      border: 1px solid #dcdfe6;
      border-radius: 16px;
      padding: 0 10px;
      height: 30px;
      transition: all 0.2s;

      &:hover, &:focus-within {
        border-color: #4F77CB;
      }

      .left-icon {
        color: #909399;
        margin-right: 6px;
        font-size: 13px;
      }

      .search-icon {
        color: #909399;
        margin-left: 6px;
        font-size: 13px;
        cursor: pointer;
      }

      .custom-search-input {
        border: none;
        outline: none;
        background: transparent;
        width: 100%;
        font-size: 12px;
        color: #606266;

        &::placeholder {
          color: #a8abb2;
        }
      }
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 10px;

    .action-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      height: 28px;
      padding: 0 10px;
      border-radius: 3px;
      border: 1px solid #dcdfe6;
      background-color: #ffffff;
      color: #606266;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #4F77CB;
        color: #4F77CB;
        background-color: #f0f7ff;
      }
    }

    .nav-icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      color: #606266;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        color: #4F77CB;
        background-color: #f2f6fc;
      }
    }

    .user-profile-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 2px 6px;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f2f6fc;
      }

      .user-avatar {
        width: 28px;
        height: 28px;
        border-radius: 50%;
      }

      .user-meta {
        display: flex;
        flex-direction: column;
        line-height: 1.1;

        .user-name {
          font-size: 12px;
          font-weight: 600;
          color: #2f4554;
        }

        .user-group {
          font-size: 10px;
          color: #909399;
        }
      }
    }
  }
}

.global-search-pop {
  font-size: 12px;
  .gsp-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    color: #303133;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 6px;
    margin-bottom: 6px;
  }
  .gsp-section {
    margin-bottom: 8px;
    .gsp-sec-title {
      font-size: 11px;
      color: #909399;
      margin-bottom: 4px;
    }
    .gsp-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 5px 6px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        background: #ecf5ff;
      }
      .gsp-main {
        font-weight: 600;
        color: #303133;
      }
      .gsp-sub {
        margin-left: auto;
        font-size: 11px;
        color: #909399;
      }
    }
  }
  .gsp-empty {
    text-align: center;
    color: #909399;
    padding: 12px 0;
  }
}

.notice-pop {
  font-size: 12px;
  .np-head {
    font-weight: 600;
    color: #303133;
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 6px;
    margin-bottom: 6px;
  }
  .np-item {
    padding: 6px;
    border-bottom: 1px dashed #ebeef5;
    cursor: pointer;
    &:hover {
      background: #f5f7fa;
    }
    .np-title {
      color: #303133;
      line-height: 1.4;
    }
    .np-time {
      font-size: 11px;
      color: #909399;
      margin-top: 2px;
    }
  }
}
</style>
