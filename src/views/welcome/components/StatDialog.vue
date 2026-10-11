<template>
  <el-dialog
    v-model="visible"
    title="数据展示设置"
    width="550px"
    class="custom-stat-dialog"
    destroy-on-close
  >
    <div class="checkbox-container">
      <el-checkbox-group v-model="selectedNames" :min="1" class="stat-checkbox-group">
        <el-checkbox
          v-for="item in ALL_STATS"
          :key="item.staticType"
          :label="item.staticTypeStr"
          class="checkbox-item"
        >
          {{ item.staticTypeStr }}
        </el-checkbox>
      </el-checkbox-group>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :icon="Select" :loading="loading" @click="handleSave">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Select } from '@element-plus/icons-vue';
import { STAT_COUNT_LIST, StaticCountItem } from '@/mock/dashboardData';
import { saveSetting } from '@/api/welcome';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  currentList: StaticCountItem[];
}>();

const emit = defineEmits<{
  (e: 'saved'): void;
}>();

const visible = ref(false);
const loading = ref(false);
const selectedNames = ref<string[]>([]);
const ALL_STATS = STAT_COUNT_LIST;

function open() {
  selectedNames.value = props.currentList.map(item => item.staticTypeStr);
  visible.value = true;
}

defineExpose({ open });

async function handleSave() {
  loading.value = true;
  try {
    const chosen = selectedNames.value
      .map(name => ALL_STATS.find(s => s.staticTypeStr === name))
      .filter(Boolean);

    await saveSetting({
      settingKey: 'user.indexdata.setting',
      settingValue: JSON.stringify(chosen)
    });

    ElMessage.success('保存成功');
    emit('saved');
    visible.value = false;
  } catch (e: any) {
    ElMessage.error(e?.message || '保存失败');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
.custom-stat-dialog {
  .checkbox-container {
    padding: 24px 20px;

    .stat-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      gap: 16px 20px;

      .checkbox-item {
        margin-right: 0;
        font-size: 14px;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    padding-top: 10px;

    .el-button {
      padding: 8px 32px;
      font-weight: 600;
    }
  }
}
</style>
