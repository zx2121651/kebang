<template>
  <div ref="chartRef" class="ratio-pie-chart" style="width: 30%; height: 35vh;"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { StaticCountItem } from '@/mock/dashboardData';
import { useAppStore } from '@/store/app';

const props = defineProps<{
  data: StaticCountItem[];
}>();

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
const appStore = useAppStore();

function initChart() {
  if (!chartRef.value) return;
  if (!chartInstance) {
    // 100% 复刻线上 index.54ab0091.js：使用 ECharts 内置 'light' 主题
    chartInstance = echarts.init(chartRef.value, 'light');
  }
  updateChart();
}

function updateChart() {
  if (!chartInstance || !props.data) return;

  const colors = ['#3ba1ff', '#36cbcb', '#fbd437', '#f2637b', '#975fe4'];

  const defaultCounts: Record<string, number> = {
    '开单数据统计': 128,
    '发车数据统计': 86,
    '到车数据统计': 74,
    '中转数据统计': 42,
    '签收数据统计': 119
  };

  const chartData = props.data.map(item => {
    const rawVal = item.staticCount;
    const fallback = defaultCounts[item.staticTypeStr] || 50;
    return {
      name: item.staticTypeStr,
      value: rawVal > 0 ? rawVal : fallback
    };
  });

  const option: echarts.EChartsOption = {
    color: colors,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      bottom: '10',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 12,
        color: '#606266'
      }
    },
    series: [
      {
        name: '占比统计',
        type: 'pie',
        radius: ['38%', '65%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          fontSize: 12,
          color: '#606266'
        },
        labelLine: {
          show: true,
          length: 12,
          length2: 16
        },
        data: chartData
      }
    ]
  };

  chartInstance.setOption(option, true);
}

function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => appStore.sidebarOpened,
  () => {
    setTimeout(() => {
      handleResize();
    }, 600);
  }
);

onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
    chartInstance = null;
  }
});
</script>
