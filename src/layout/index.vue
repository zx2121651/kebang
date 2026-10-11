<template>
  <div class="app-layout-wrapper layout-theme-default">
    <!-- 左侧菜单侧边栏 -->
    <Sidebar />

    <!-- 右侧主体内容容器 -->
    <div class="main-container">
      <!-- 顶部 Header 导航栏 -->
      <Navbar />

      <!-- 多标签页 MultiTags 导航栏 -->
      <MultiTags />

      <!-- 主视图载体区域 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue';
import Navbar from './components/Navbar/index.vue';
import MultiTags from './components/MultiTags/index.vue';
import AppMain from './components/AppMain/index.vue';
</script>

<style scoped lang="scss">
.app-layout-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f0f2f5;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
}
</style>
