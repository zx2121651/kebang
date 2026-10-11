<template>
  <el-dialog
    v-model="visible"
    title="常用跳转设置"
    width="900px"
    class="frequently-dialog"
    destroy-on-close
  >
    <div class="checkbox-container">
      <div v-for="menu in availableMenuGroups" :key="menu.title" class="menu-module-group">
        <p class="module-title">{{ menu.title }}</p>
        <el-checkbox-group v-model="selectedTitles" :min="1" :max="8" class="checkbox-group">
          <el-checkbox
            v-for="sub in menu.children"
            :key="sub.path"
            :label="sub.meta?.title"
            class="checkbox-item"
          >
            {{ sub.meta?.title }}
          </el-checkbox>
        </el-checkbox-group>
      </div>
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
import { ref, computed } from 'vue';
import { Select } from '@element-plus/icons-vue';
import { WHOLE_MENUS, MenuItem } from '@/mock/menuData';
import { saveSetting } from '@/api/welcome';
import { ElMessage } from 'element-plus';

const props = defineProps<{
  currentList: any[];
}>();

const emit = defineEmits<{
  (e: 'saved'): void;
}>();

const visible = ref(false);
const loading = ref(false);
const selectedTitles = ref<string[]>([]);

// 提取可供选择的所有功能项
const availableMenuGroups = computed(() => {
  return WHOLE_MENUS.map(m => {
    const flatItems: MenuItem[] = [];
    if (m.children) {
      m.children.forEach(g => {
        if (g.children) {
          g.children.forEach(sub => {
            flatItems.push(sub);
          });
        }
      });
    }
    return {
      title: m.meta?.title || '模块',
      children: flatItems
    };
  }).filter(g => g.children.length > 0);
});

function open() {
  selectedTitles.value = props.currentList.map(item => item.meta.title);
  visible.value = true;
}

defineExpose({ open });

async function handleSave() {
  loading.value = true;
  try {
    // 匹配出选中的项
    const allItems: any[] = [];
    availableMenuGroups.value.forEach(g => {
      g.children.forEach(c => allItems.push(c));
    });

    const newShortcuts = selectedTitles.value
      .map(t => allItems.find(i => i.meta?.title === t))
      .filter(Boolean);

    await saveSetting({
      settingKey: 'user.functionkeyshortcut.setting',
      settingValue: JSON.stringify(newShortcuts)
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
.frequently-dialog {
  .checkbox-container {
    max-height: 550px;
    overflow-y: auto;
    padding: 10px 16px;

    .menu-module-group {
      margin-bottom: 20px;

      .module-title {
        font-size: 14px;
        font-weight: 700;
        color: #303133;
        margin-bottom: 10px;
        border-left: 3px solid #36a3f7;
        padding-left: 8px;
      }

      .checkbox-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 16px;

        .checkbox-item {
          margin-right: 0;
          min-width: 130px;
        }
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: center;
    padding-top: 10px;

    .el-button {
      padding: 8px 30px;
      font-weight: 600;
    }
  }
}
</style>
