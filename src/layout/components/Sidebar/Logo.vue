<template>
  <div class="sidebar-logo-container" :class="{ collapse: isCollapse }">
    <transition name="sidebarLogoFade">
      <router-link to="/welcome" class="sidebar-logo-link">
        <div class="brand-icon">
          <svg viewBox="0 0 1024 1024" width="28" height="28">
            <path fill="#ff6600" d="M512 64l384 221.7v443.4L512 950.9 128 729.1V285.7L512 64z" />
            <path fill="#ffffff" d="M512 250l220 127v254L512 758 292 631V377l220-127z" />
            <path fill="#1890ff" d="M512 360l120 70v140L512 640 392 570V430l120-70z" />
          </svg>
        </div>
        <div v-if="!isCollapse" class="brand-text-wrap">
          <h1 class="sidebar-title">科邦智联</h1>
          <p class="sidebar-sub">智慧物流数字化解决方案专家</p>
        </div>
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isCollapse: boolean;
}>();
</script>

<style scoped lang="scss">
.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 48px;
  line-height: 1.2;
  background: #4F77CB;
  text-align: left;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  &.collapse {
    text-align: center;
    .sidebar-logo-link {
      padding: 0;
      justify-content: center;
    }
  }

  .sidebar-logo-link {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0 10px;
    gap: 8px;

    .brand-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }

    .brand-text-wrap {
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .sidebar-title {
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: 0.5px;
        white-space: nowrap;
        margin: 0;
      }

      .sidebar-sub {
        color: rgba(255, 255, 255, 0.8);
        font-size: 10px;
        transform: scale(0.75);
        transform-origin: left center;
        white-space: nowrap;
        margin: 0;
      }
    }
  }
}
</style>
