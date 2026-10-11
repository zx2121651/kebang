<template>
  <div class="report-engine-page">
    <!-- 顶部过滤与操作条 -->
    <div class="rpt-toolbar">
      <div class="left-filters">
        <el-select v-model="filterNetwork" placeholder="统计网点 (全部)" clearable size="small" style="width: 140px">
          <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          size="small"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="YYYY-MM-DD"
          style="width: 230px"
        />
        <el-input
          v-model="keyword"
          size="small"
          placeholder="输入车次 / 客户 / 网点 / 单号过滤"
          clearable
          style="width: 200px"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-button size="small" type="primary" :icon="RefreshRight" @click="refreshReport">更新统计数据</el-button>
        <el-button size="small" :icon="Download" @click="exportReport">导出分析报表</el-button>
      </div>

      <div class="right-switch">
        <el-switch v-model="showChart" active-text="显示可视化图表" inactive-text="仅看数据表" size="small" />
      </div>
    </div>

    <!-- ECharts 可视化图表区 -->
    <div v-show="showChart" class="rpt-chart-card">
      <div class="chart-header">
        <span class="c-title">📊 {{ reportConfig.title }} - 趋势与结构对比图</span>
        <div class="c-kpis">
          <span v-for="(k, i) in reportConfig.kpis" :key="i" class="kpi-pill">
            {{ k.label }}：<b>{{ k.value }}</b>
          </span>
        </div>
      </div>
      <div ref="chartRef" class="echarts-box"></div>
    </div>

    <!-- 明细分析数据表 -->
    <div class="rpt-table-card">
      <el-table :data="filteredRows" border stripe size="small" height="100%" show-summary>
        <el-table-column type="index" label="排名/序号" width="75" align="center" fixed="left" />
        <el-table-column
          v-for="col in reportConfig.columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth || 115"
          :align="col.align || 'left'"
          show-overflow-tooltip
        >
          <template #default="{ row }">
            <el-tag v-if="col.isRate" :type="parseFloat(row[col.prop]) >= 25 ? 'success' : 'primary'" size="small">
              {{ row[col.prop] }}
            </el-tag>
            <b v-else-if="col.isHighlight" style="color: #409eff">{{ row[col.prop] }}</b>
            <span v-else>{{ row[col.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import * as echarts from 'echarts'
import { Search, RefreshRight, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useArchiveStore } from '@/store/dictionaryAndArchive'

const route = useRoute()
const archiveStore = useArchiveStore()

const filterNetwork = ref('')
const dateRange = ref(['2026-04-01', '2026-04-11'])
const keyword = ref('')
const showChart = ref(true)
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'transportlirun'
})

interface ColDef {
  prop: string
  label: string
  width?: number
  minWidth?: number
  align?: 'left' | 'center' | 'right'
  isRate?: boolean
  isHighlight?: boolean
}

const reportConfig = computed<{
  title: string
  kpis: { label: string; value: string }[]
  columns: ColDef[]
  rows: Record<string, any>[]
  chartX: string[]
  chartSeries1Name: string
  chartSeries1: number[]
  chartSeries2Name: string
  chartSeries2: number[]
}>(() => {
  const key = pageKey.value

  if (key === 'transportlirun') {
    const rows = [
      { batchNo: 'GX260410001', departDate: '2026-04-10', route: '总部 → 衡阳营业部', plateNo: '粤A·99681挂', driver: '刘大柱', orderCount: 18, totalIncome: 8650, carCost: 4500, loadCost: 300, grossProfit: 3850, marginRate: '44.5%' },
      { batchNo: 'GX260410002', departDate: '2026-04-10', route: '总部 → 长沙分部', plateNo: '湘A·77109', driver: '彭建华', orderCount: 24, totalIncome: 11200, carCost: 5200, loadCost: 350, grossProfit: 5650, marginRate: '50.4%' },
      { batchNo: 'GX260409005', departDate: '2026-04-09', route: '总部 → 武汉分部', plateNo: '鄂A·52890挂', driver: '胡国庆', orderCount: 29, totalIncome: 14800, carCost: 7200, loadCost: 450, grossProfit: 7150, marginRate: '48.3%' },
      { batchNo: 'GX260408003', departDate: '2026-04-08', route: '总部 → 上海分部', plateNo: '沪B·90812挂', driver: '沈卫平', orderCount: 35, totalIncome: 19600, carCost: 9800, loadCost: 600, grossProfit: 9200, marginRate: '46.9%' },
      { batchNo: 'GX260407002', departDate: '2026-04-07', route: '总部 → 成都分部', plateNo: '粤A·83520挂', driver: '马志强', orderCount: 31, totalIncome: 18200, carCost: 10500, loadCost: 550, grossProfit: 7150, marginRate: '39.3%' }
    ]
    return {
      title: '单车利润分析表',
      kpis: [
        { label: '发车总车次', value: '5 车次' },
        { label: '随车总营收', value: '¥ 72,450' },
        { label: '大车总成本', value: '¥ 39,450' },
        { label: '累计净毛利', value: '¥ 33,000 (45.5%)' }
      ],
      columns: [
        { prop: 'batchNo', label: '发车批次号', width: 135 },
        { prop: 'departDate', label: '发车日期', width: 110, align: 'center' },
        { prop: 'route', label: '运行区间', width: 155 },
        { prop: 'plateNo', label: '车牌号码', width: 120 },
        { prop: 'driver', label: '随车司机', width: 95 },
        { prop: 'orderCount', label: '配载票数', width: 90, align: 'right' },
        { prop: 'totalIncome', label: '随车总运费(元)', width: 125, align: 'right' },
        { prop: 'carCost', label: '大车车费(元)', width: 115, align: 'right' },
        { prop: 'loadCost', label: '装卸杂费(元)', width: 115, align: 'right' },
        { prop: 'grossProfit', label: '单车净毛利(元)', width: 130, align: 'right', isHighlight: true },
        { prop: 'marginRate', label: '单车毛利率', width: 110, align: 'center', isRate: true }
      ],
      rows,
      chartX: rows.map(r => r.batchNo),
      chartSeries1Name: '随车总运费',
      chartSeries1: rows.map(r => r.totalIncome),
      chartSeries2Name: '单车净毛利',
      chartSeries2: rows.map(r => r.grossProfit)
    }
  }

  if (key === 'customerRanking' || key === 'staticKeHuLiRunSortRsp') {
    const rows = [
      { customerName: '佛山美的家电制造厂 (刘芳)', network: '总部', orderCount: 132, totalNum: 4280, weight: 86500, volume: 412, revenue: 68500, cost: 38200, profit: 30300, marginRate: '44.2%' },
      { customerName: '广州华星电子科技有限公司 (周建军)', network: '总部', orderCount: 85, totalNum: 2150, weight: 42000, volume: 265, revenue: 52400, cost: 28900, profit: 23500, marginRate: '44.8%' },
      { customerName: '中大瑞纺服装批发贸易行 (黄丽娟)', network: '总部', orderCount: 91, totalNum: 3680, weight: 39500, volume: 310, revenue: 46800, cost: 26500, profit: 20300, marginRate: '43.4%' },
      { customerName: '广州博世汽配供应链中心 (陈志强)', network: '总部', orderCount: 64, totalNum: 1590, weight: 51200, volume: 185, revenue: 39200, cost: 22100, profit: 17100, marginRate: '43.6%' },
      { customerName: '广州宏达商贸有限公司 (张伟)', network: '总部', orderCount: 48, totalNum: 1280, weight: 34000, volume: 142, revenue: 28600, cost: 15800, profit: 12800, marginRate: '44.8%' },
      { customerName: '东莞鸿铭家居实业有限公司 (郭振华)', network: '深圳分部', orderCount: 52, totalNum: 980, weight: 28900, volume: 245, revenue: 25400, cost: 14900, profit: 10500, marginRate: '41.3%' }
    ]
    return {
      title: key === 'customerRanking' ? '客户发货量与营业额排名分析' : '客户贡献利润排名分析',
      kpis: [
        { label: '核心活跃客户', value: '6 家' },
        { label: '累计发货票数', value: '472 票' },
        { label: '累计贡献营收', value: '¥ 260,900' },
        { label: '累计贡献毛利', value: '¥ 114,500' }
      ],
      columns: [
        { prop: 'customerName', label: '客户单位及联系人', minWidth: 210 },
        { prop: 'network', label: '所属网点', width: 105 },
        { prop: 'orderCount', label: '发货票数', width: 95, align: 'right' },
        { prop: 'totalNum', label: '总件数', width: 95, align: 'right' },
        { prop: 'weight', label: '总重量(kg)', width: 110, align: 'right' },
        { prop: 'volume', label: '总体积(m³)', width: 110, align: 'right' },
        { prop: 'revenue', label: '贡献营业额(元)', width: 130, align: 'right', isHighlight: true },
        { prop: 'cost', label: '分摊总成本(元)', width: 125, align: 'right' },
        { prop: 'profit', label: '净贡献利润(元)', width: 130, align: 'right', isHighlight: true },
        { prop: 'marginRate', label: '利润率', width: 100, align: 'center', isRate: true }
      ],
      rows,
      chartX: rows.map(r => r.customerName.slice(0, 6)),
      chartSeries1Name: '贡献营业额',
      chartSeries1: rows.map(r => r.revenue),
      chartSeries2Name: '净贡献利润',
      chartSeries2: rows.map(r => r.profit)
    }
  }

  if (key === 'accountsReceivableOverdue' || key === 'accountsReceivableAging') {
    const rows = [
      { customerName: '佛山美的家电制造厂', creditLimit: 100000, totalAr: 38600, currentAr: 28600, days1_30: 10000, days31_60: 0, days61_90: 0, over90: 0, riskLevel: '信用极好' },
      { customerName: '广州华星电子科技有限公司', creditLimit: 80000, totalAr: 26400, currentAr: 18400, days1_30: 8000, days31_60: 0, days61_90: 0, over90: 0, riskLevel: '正常' },
      { customerName: '广州博世汽配供应链中心', creditLimit: 50000, totalAr: 19500, currentAr: 9500, days1_30: 6500, days31_60: 3500, days61_90: 0, over90: 0, riskLevel: '轻度提醒' },
      { customerName: '东莞鸿铭家居实业有限公司', creditLimit: 30000, totalAr: 15800, currentAr: 4800, days1_30: 5000, days31_60: 4000, days61_90: 2000, over90: 0, riskLevel: '需催收' },
      { customerName: '广东科源新材料化工有限公司', creditLimit: 30000, totalAr: 12400, currentAr: 2400, days1_30: 4000, days31_60: 3500, days61_90: 1500, over90: 1000, riskLevel: '重点催收' }
    ]
    return {
      title: key === 'accountsReceivableOverdue' ? '应收账款逾期分析表' : '应收账款账龄结构分析表',
      kpis: [
        { label: '应收账款总额', value: '¥ 112,700' },
        { label: '账期内正常金额', value: '¥ 63,700' },
        { label: '1-30天内待回款', value: '¥ 33,500' },
        { label: '30天以上逾期款', value: '¥ 15,500' }
      ],
      columns: [
        { prop: 'customerName', label: '月结客户名称', minWidth: 190 },
        { prop: 'creditLimit', label: '授信额度(元)', width: 115, align: 'right' },
        { prop: 'totalAr', label: '应收未结总额', width: 120, align: 'right', isHighlight: true },
        { prop: 'currentAr', label: '未逾期(账期内)', width: 120, align: 'right' },
        { prop: 'days1_30', label: '1-30天账龄', width: 110, align: 'right' },
        { prop: 'days31_60', label: '31-60天账龄', width: 110, align: 'right' },
        { prop: 'days61_90', label: '61-90天账龄', width: 110, align: 'right' },
        { prop: 'over90', label: '90天以上逾期', width: 115, align: 'right' },
        { prop: 'riskLevel', label: '风控评级', width: 105, align: 'center' }
      ],
      rows,
      chartX: rows.map(r => r.customerName.slice(0, 6)),
      chartSeries1Name: '应收未结总额',
      chartSeries1: rows.map(r => r.totalAr),
      chartSeries2Name: '账期内正常额',
      chartSeries2: rows.map(r => r.currentAr)
    }
  }

  // 默认通用网点/日期经营汇总报表 (单票综合 / 营业额日报 / 营业额汇总 / 网点毛利 / 现金日报 / 中转运费 / 回单分析)
  const rows = [
    { targetDimension: '广州总部营业厅', orderCount: 168, num: 4820, spotFee: 42600, collectFee: 38500, monthFee: 56200, totalRevenue: 137300, totalCost: 78400, netProfit: 58900, marginRate: '42.9%' },
    { targetDimension: '衡阳营业部', orderCount: 96, num: 2650, spotFee: 24800, collectFee: 21500, monthFee: 18900, totalRevenue: 65200, totalCost: 37100, netProfit: 28100, marginRate: '43.1%' },
    { targetDimension: '长沙分部', orderCount: 124, num: 3490, spotFee: 31200, collectFee: 29800, monthFee: 28400, totalRevenue: 89400, totalCost: 51200, netProfit: 38200, marginRate: '42.7%' },
    { targetDimension: '武汉分部', orderCount: 88, num: 2310, spotFee: 21600, collectFee: 19400, monthFee: 22500, totalRevenue: 63500, totalCost: 36800, netProfit: 26700, marginRate: '42.0%' },
    { targetDimension: '上海分部', orderCount: 112, num: 3120, spotFee: 29500, collectFee: 25600, monthFee: 39800, totalRevenue: 94900, totalCost: 54900, netProfit: 40000, marginRate: '42.1%' },
    { targetDimension: '成都分部', orderCount: 79, num: 1980, spotFee: 18900, collectFee: 17200, monthFee: 21400, totalRevenue: 57500, totalCost: 33900, netProfit: 23600, marginRate: '41.0%' }
  ]

  return {
    title: String(route.meta.title || '经营综合统计表'),
    kpis: [
      { label: '统计总票数', value: '667 票' },
      { label: '累计总营收', value: '¥ 507,800' },
      { label: '累计总成本', value: '¥ 292,300' },
      { label: '综合净毛利', value: '¥ 215,500 (42.4%)' }
    ],
    columns: [
      { prop: 'targetDimension', label: '统计网点 / 维度', minWidth: 150 },
      { prop: 'orderCount', label: '运单票数', width: 95, align: 'right' },
      { prop: 'num', label: '总件数', width: 95, align: 'right' },
      { prop: 'spotFee', label: '现付金额(元)', width: 115, align: 'right' },
      { prop: 'collectFee', label: '提付金额(元)', width: 115, align: 'right' },
      { prop: 'monthFee', label: '月结/回单付(元)', width: 125, align: 'right' },
      { prop: 'totalRevenue', label: '营业额合计(元)', width: 130, align: 'right', isHighlight: true },
      { prop: 'totalCost', label: '直接成本合计(元)', width: 130, align: 'right' },
      { prop: 'netProfit', label: '经营净毛利(元)', width: 130, align: 'right', isHighlight: true },
      { prop: 'marginRate', label: '毛利率', width: 100, align: 'center', isRate: true }
    ],
    rows,
    chartX: rows.map(r => r.targetDimension),
    chartSeries1Name: '营业额合计',
    chartSeries1: rows.map(r => r.totalRevenue),
    chartSeries2Name: '经营净毛利',
    chartSeries2: rows.map(r => r.netProfit)
  }
})

const filteredRows = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  return reportConfig.value.rows.filter(r => {
    if (filterNetwork.value && !JSON.stringify(r).includes(filterNetwork.value)) return false
    if (kw && !JSON.stringify(r).toLowerCase().includes(kw)) return false
    return true
  })
})

const renderChart = () => {
  if (!chartRef.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }
  const cfg = reportConfig.value
  chartInstance.setOption({
    tooltip: { trigger: 'axis' },
    legend: { data: [cfg.chartSeries1Name, cfg.chartSeries2Name], top: 4 },
    grid: { left: 55, right: 30, top: 34, bottom: 26 },
    xAxis: { type: 'category', data: cfg.chartX },
    yAxis: { type: 'value' },
    series: [
      {
        name: cfg.chartSeries1Name,
        type: 'bar',
        barWidth: 28,
        itemStyle: { color: '#4F77CB', borderRadius: [4, 4, 0, 0] },
        data: cfg.chartSeries1
      },
      {
        name: cfg.chartSeries2Name,
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: '#67C23A' },
        lineStyle: { width: 3 },
        data: cfg.chartSeries2
      }
    ]
  })
}

watch(pageKey, () => {
  nextTick(renderChart)
})

const refreshReport = () => {
  renderChart()
  ElMessage.success(`已重新核算【${reportConfig.value.title}】最新数据`)
}

import { exportTableToCsv } from '@/utils/exportHelper'

const exportReport = () => {
  exportTableToCsv(
    `星云TMS_${reportConfig.value.title}_${new Date().toISOString().slice(0, 10)}`,
    filteredRows.value,
    reportConfig.value.columns.map(c => ({ prop: c.prop, label: c.label }))
  )
  ElMessage.success(`已导出《${reportConfig.value.title}》共 ${filteredRows.value.length} 条数据至本地文件`)
}

const handleResize = () => chartInstance?.resize()

onMounted(() => {
  nextTick(renderChart)
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped lang="scss">
.report-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.rpt-toolbar {
  background: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-filters {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
}
.rpt-chart-card {
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  padding: 10px 14px;
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
    .c-title {
      font-size: 14px;
      font-weight: 700;
      color: #303133;
    }
    .c-kpis {
      display: flex;
      gap: 14px;
      font-size: 12px;
      .kpi-pill {
        background: #f4f7ff;
        padding: 3px 10px;
        border-radius: 12px;
        color: #606266;
        b { color: #409eff; }
      }
    }
  }
  .echarts-box {
    width: 100%;
    height: 210px;
  }
}
.rpt-table-card {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
}
</style>
