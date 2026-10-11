<template>
  <div ref="chartRef" class="trend-line-chart" style="width: 70%; height: 35vh;"></div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { TrendPoint } from '@/mock/dashboardData';
import { useAppStore } from '@/store/app';

const props = defineProps<{
  data: TrendPoint[];
}>();

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;
const appStore = useAppStore();

function initChart() {
  if (!chartRef.value) return;
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }
  updateChart();
}

function updateChart() {
  if (!chartInstance || !props.data) return;

  const dates = props.data.map(item => item.staticCountTime);
  const values = props.data.map(item => item.staticCount);

  // 100% 复刻线上 index.fed5bd89.js 配置
  const option: echarts.EChartsOption = {
    xAxis: {
      type: 'category',
      data: dates,
      boundaryGap: false,
      axisLine: {
        show: true,
        lineStyle: {
          color: '#008acd',
          width: 1
        }
      },
      axisTick: {
        show: false
      }
    },
    grid: {
      left: 10,
      right: 10,
      bottom: 20,
      top: 30,
      containLabel: true
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#008acd',
          width: 1
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#f0f0f0'
        }
      }
    },
    legend: {
      data: ['数量']
    },
    series: [
      {
        data: values,
        name: '数量',
        smooth: true,
        type: 'line',
        color: '#3888fa',
        lineStyle: {
          color: '#3888fa',
          width: 2
        }
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [5, 10]
    }
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
