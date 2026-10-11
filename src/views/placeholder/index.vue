<template>
  <div class="placeholder-page">
    <el-card shadow="never" class="placeholder-card">
      <template #header>
        <div class="card-header">
          <span class="page-title">{{ route.meta.title || '业务模块' }}</span>
          <el-tag type="success" size="small">运行正常</el-tag>
        </div>
      </template>

      <div class="placeholder-body">
        <el-empty :description="`当前页面【${route.meta.title || route.path}】已就绪，等待业务表单接入`">
          <el-button type="primary" @click="$router.push('/welcome')">返回工作台首页</el-button>
        </el-empty>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped lang="scss">
.placeholder-page {
  padding: 16px 20px;

  .placeholder-card {
    border-radius: 4px;
    border: 1px solid #e4e7ed;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .page-title {
        font-size: 15px;
        font-weight: 700;
        color: #303133;
      }
    }

    .placeholder-body {
      padding: 40px 0;
    }
  }
}
</style>
