<template>
  <div class="text-container">
    <!-- 1. 常用功能模块 -->
    <FrequentlyCard
      :list="shortcutList"
      @open-setting="openFrequentlyDialog"
    />

    <!-- 2. 数据展示指标与图表容器 -->
    <div class="showData-container">
      <StatPanel
        :list="statCardList"
        :active-index="activeStatIndex"
        @change="handleStatChange"
        @open-custom="openCustomDialog"
      />

      <!-- 3. 图表区域容器 (折线图 70% + 玫瑰扇形图 30%) -->
      <div class="bottom">
        <TrendLineChart :data="currentTrendData" />
        <RatioPieChart :data="statCardList" />
      </div>
    </div>

    <!-- 弹窗 1：常用功能快捷跳转设置 -->
    <FrequentlyDialog
      ref="frequentlyDialogRef"
      :current-list="shortcutList"
      @saved="loadShortcuts"
    />

    <!-- 弹窗 2：数据展示指标自定义设置 -->
    <StatDialog
      ref="statDialogRef"
      :current-list="statCardList"
      @saved="loadDashboardData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FrequentlyCard from './components/FrequentlyCard.vue';
import FrequentlyDialog from './components/FrequentlyDialog.vue';
import StatPanel from './components/StatPanel.vue';
import StatDialog from './components/StatDialog.vue';
import TrendLineChart from './components/TrendLineChart.vue';
import RatioPieChart from './components/RatioPieChart.vue';
import {
  getDataShowSetting,
  getTrendList,
  getFrequentlySetting
} from '@/api/welcome';
import { StaticCountItem, TrendPoint } from '@/mock/dashboardData';

const shortcutList = ref<any[]>([]);
const statCardList = ref<StaticCountItem[]>([]);
const currentTrendData = ref<TrendPoint[]>([]);
const activeStatIndex = ref(0);

const frequentlyDialogRef = ref<any>(null);
const statDialogRef = ref<any>(null);

async function loadShortcuts() {
  try {
    const res = await getFrequentlySetting();
    if (res.data?.settingValue) {
      shortcutList.value = JSON.parse(res.data.settingValue);
    }
  } catch (e) {
    console.error('加载常用功能异常:', e);
  }
}

import { useOperationStore } from '@/store/operation';

const opStore = useOperationStore();

async function loadDashboardData() {
  try {
    const res = await getDataShowSetting();
    const rawList = res.data || [];

    // 动态结合营运中心实时单据台账数量
    const dynamicCounts: Record<number, number> = {
      1: 120 + opStore.shipList.length,
      10: 80 + opStore.transList.length + opStore.stransList.length,
      20: 70 + opStore.transList.filter(r => r.tStatus === 3 || r.tStatusStr === '已到达').length,
      25: 40 + opStore.sendOutList.length,
      30: 110 + opStore.shipList.filter(r => r.oStatusStr === '已签收').length
    };

    statCardList.value = rawList.map(item => ({
      ...item,
      staticCount: dynamicCounts[item.staticType] ?? item.staticCount
    }));

    if (statCardList.value.length > 0) {
      activeStatIndex.value = 0;
      await loadTrend(statCardList.value[0].staticType);
    }
  } catch (e) {
    console.error('加载指标统计异常:', e);
  }
}

async function loadTrend(type: number) {
  try {
    const res = await getTrendList({ StaticType: type });
    currentTrendData.value = res.data;
  } catch (e) {
    console.error('加载走势异常:', e);
  }
}

function handleStatChange(index: number, type: number) {
  activeStatIndex.value = index;
  loadTrend(type);
}

function openFrequentlyDialog() {
  frequentlyDialogRef.value?.open();
}

function openCustomDialog() {
  statDialogRef.value?.open();
}

onMounted(() => {
  loadShortcuts();
  loadDashboardData();
});
</script>

<style scoped lang="scss">
/* 100% 复刻线上 assets_index.6c5a8854.css (data-v-5e41b091) */
.text-container {
  padding: 20px 0;
  background-color: #f0f2f5;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  .showData-container {
    padding: 10px 20px 0;
    display: flex;
    flex-direction: column;

    .bottom {
      background: #fff;
      padding: 20px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }
  }
}
</style>
