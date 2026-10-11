<template>
  <div class="app-main-container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.app-main-container {
  flex: 1;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f0f2f5;
  position: relative;
}

/* 页面切换平滑转场 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-10px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
