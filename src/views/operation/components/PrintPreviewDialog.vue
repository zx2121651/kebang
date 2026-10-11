<template>
  <el-dialog
    v-model="visible"
    :title="`单据打印预览 - ${printTypeLabel}`"
    width="860px"
    top="5vh"
    append-to-body
    destroy-on-close
  >
    <div class="print-toolbar">
      <el-radio-group v-model="currentType" size="small">
        <el-radio-button value="waybill">标准三联运单</el-radio-button>
        <el-radio-button value="label">热敏货物标签 ({{ totalLabelCount }}张)</el-radio-button>
        <el-radio-button value="manifest">配载随车清单</el-radio-button>
        <el-radio-button value="contract">整车运输合同</el-radio-button>
      </el-radio-group>
      <div class="pt-right">
        <span>打印机：</span>
        <el-select v-model="selectedPrinter" size="small" style="width: 190px">
          <el-option label="EPSON LQ-630K 针式打印机" value="epson" />
          <el-option label="Gprinter GP-1324D 标签机" value="gprinter" />
          <el-option label="HP LaserJet Pro M404n" value="hp" />
        </el-select>
      </div>
    </div>

    <div class="print-canvas-wrap">
      <!-- 1. 标准三联运单 -->
      <div v-if="currentType === 'waybill'" class="waybill-paper">
        <div class="wb-head">
          <div class="wb-logo">
            <div class="comp-name">湖南科邦快运有限公司 · 货物托运单</div>
            <div class="comp-sub">全国客服热线：400-8856-158 | 查单网址：xy.561580.com</div>
          </div>
          <div class="wb-barcode">
            <div class="bars">||||||||||||||||||||||||||||||</div>
            <div class="no-text">运单号：{{ activeRecord.shipOrderNo || 'KB260410089' }}</div>
          </div>
        </div>

        <div class="wb-meta-row">
          <span>发站网点：{{ activeRecord.startNetwork || '长沙分拨中心' }}</span>
          <span>到站城市：<b>{{ activeRecord.destCity || '衡阳市' }}</b></span>
          <span>终端网点：<b>{{ activeRecord.endNetwork || '衡阳营业部' }}</b></span>
          <span>货号：<b>{{ activeRecord.goodsNo || '0-10' }}</b></span>
          <span>托运日期：{{ activeRecord.createTime || '2026-04-10 10:30' }}</span>
        </div>

        <table class="wb-grid-table">
          <tbody>
            <tr>
              <td class="lbl" rowspan="2">发货方</td>
              <td class="lbl-sm">姓名/单位</td>
              <td>{{ activeRecord.shipperName }} ({{ activeRecord.shipperCompany || '个人' }})</td>
              <td class="lbl-sm">联系电话</td>
              <td>{{ activeRecord.shipperMobile }}</td>
              <td class="lbl" rowspan="2">收货方</td>
              <td class="lbl-sm">姓名/单位</td>
              <td><b>{{ activeRecord.receiverName }}</b> ({{ activeRecord.receiverCompany || '个人' }})</td>
              <td class="lbl-sm">联系电话</td>
              <td><b>{{ activeRecord.receiverMobile }}</b></td>
            </tr>
            <tr>
              <td class="lbl-sm">发货地址</td>
              <td colspan="3">{{ activeRecord.shipperAddress || '湖南省长沙市雨花区高桥大市场' }}</td>
              <td class="lbl-sm">收货地址</td>
              <td colspan="3">{{ activeRecord.receiverAddress || '湖南省衡阳市蒸湘区解放大道88号' }}</td>
            </tr>
          </tbody>
        </table>

        <table class="wb-grid-table" style="margin-top: -1px">
          <thead>
            <tr>
              <th>货物名称</th>
              <th>包装</th>
              <th>规格型号</th>
              <th>件数</th>
              <th>重量(kg)</th>
              <th>体积(m³)</th>
              <th>基本运费</th>
              <th>送货费</th>
              <th>保价声明</th>
              <th>保价费</th>
              <th>代收货款</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><b>{{ activeRecord.goodsName || '五金配件' }}</b></td>
              <td>{{ activeRecord.pack || '纸箱' }}</td>
              <td>标准件</td>
              <td><b>{{ activeRecord.num || 10 }}</b></td>
              <td>{{ activeRecord.weight || 200 }}</td>
              <td>{{ activeRecord.volume || 1.2 }}</td>
              <td>¥{{ activeRecord.baseFee || 180 }}</td>
              <td>¥{{ activeRecord.deliveryFee || 0 }}</td>
              <td>¥{{ activeRecord.declaredValue || 0 }}</td>
              <td>¥{{ activeRecord.insureFee || 0 }}</td>
              <td><b>¥{{ activeRecord.agencyFund || 0 }}</b></td>
            </tr>
          </tbody>
        </table>

        <table class="wb-grid-table" style="margin-top: -1px">
          <tbody>
            <tr>
              <td class="lbl-sm">合计运费</td>
              <td style="font-size:14px;font-weight:700;color:#d9001b">¥{{ activeRecord.totalFee || 180 }} 元</td>
              <td class="lbl-sm">付款方式</td>
              <td><b>{{ activeRecord.payType || '现付' }}</b></td>
              <td class="lbl-sm">现付/提付/回单付</td>
              <td>现:¥{{ activeRecord.cashPay || 0 }} / 提:¥{{ activeRecord.collectPay || 0 }} / 回:¥{{ activeRecord.receiptPay || 0 }}</td>
              <td class="lbl-sm">交接方式</td>
              <td><b>{{ activeRecord.deliveryType || '自提' }}</b></td>
              <td class="lbl-sm">回单要求</td>
              <td>{{ activeRecord.receiptRequirement || '签收原件' }} ({{ activeRecord.receiptNum || 1 }}份)</td>
            </tr>
            <tr>
              <td class="lbl-sm">备注说明</td>
              <td colspan="9">{{ activeRecord.remark || '轻拿轻放，请勿倒置' }}</td>
            </tr>
          </tbody>
        </table>

        <div class="wb-sign-row">
          <span>制单人：{{ activeRecord.creator || '林峰' }}</span>
          <span>托运人签字：__________________</span>
          <span>收货人签字：__________________</span>
          <span>第一联：存根联（白） 第二联：客户联（红） 第三联：提货联（蓝）</span>
        </div>
      </div>

      <!-- 2. 热敏货物标签 -->
      <div v-else-if="currentType === 'label'" class="thermal-label-card">
        <div class="tl-top">
          <span class="tl-brand">科邦快运</span>
          <span class="tl-city">{{ activeRecord.startNetwork || '长沙' }} ➔ {{ activeRecord.destCity || '衡阳市' }}</span>
        </div>
        <div class="tl-mid">
          <div class="tl-goods-no">货号：{{ activeRecord.goodsNo || '0-10' }} (第1/{{ totalLabelCount }}件)</div>
          <div class="tl-row">运单号：<b>{{ activeRecord.shipOrderNo || 'KB260410089' }}</b></div>
          <div class="tl-row">收货人：<b>{{ activeRecord.receiverName || '周建国' }} ({{ activeRecord.receiverMobile || '13973409988' }})</b></div>
          <div class="tl-row">货物品名：{{ activeRecord.goodsName || '五金配件' }} ({{ activeRecord.pack || '纸箱' }}) | {{ activeRecord.deliveryType || '自提' }}</div>
          <div class="tl-row">收货地址：{{ activeRecord.receiverAddress || '湖南省衡阳市蒸湘区解放大道88号' }}</div>
        </div>
        <div class="tl-barcode">||||||||||||||||||||||||||||||||||||</div>
      </div>

      <!-- 3. 配载随车清单 -->
      <div v-else-if="currentType === 'manifest'" class="waybill-paper">
        <div class="wb-head">
          <div class="wb-logo">
            <div class="comp-name">湖南科邦快运有限公司 · 干线配载随车发车清单</div>
            <div class="comp-sub">发车批次：PZ260410001 | 车牌号：湘A·88561 | 随车司机：张建军 (13807316688)</div>
          </div>
        </div>
        <table class="wb-grid-table">
          <thead>
            <tr>
              <th>序号</th>
              <th>运单号</th>
              <th>到站城市</th>
              <th>收货方</th>
              <th>收货电话</th>
              <th>货物名称</th>
              <th>件数</th>
              <th>重量(kg)</th>
              <th>体积(m³)</th>
              <th>提付运费</th>
              <th>代收货款</th>
              <th>交接方式</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in recordList" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>{{ item.shipOrderNo }}</td>
              <td>{{ item.destCity }}</td>
              <td>{{ item.receiverName }}</td>
              <td>{{ item.receiverMobile }}</td>
              <td>{{ item.goodsName }}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.volume }}</td>
              <td>¥{{ item.collectPay || 0 }}</td>
              <td>¥{{ item.agencyFund || 0 }}</td>
              <td>{{ item.deliveryType }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 4. 整车运输合同 -->
      <div v-else class="waybill-paper">
        <div class="wb-head">
          <div class="wb-logo">
            <div class="comp-name">公路货物整车运输服务合同</div>
            <div class="comp-sub">合同编号：HT-{{ activeRecord.shipOrderNo || 'KB260410089' }}</div>
          </div>
        </div>
        <div class="contract-body">
          <p><b>甲方（托运方）：</b>湖南科邦快运有限公司（长沙分拨中心）</p>
          <p><b>乙方（承运司机）：</b>张建军（车牌号：湘A·88561，联系电话：13807316688）</p>
          <p>1. 运输起止路线：自 <b>{{ activeRecord.startNetwork || '长沙分拨中心' }}</b> 发往 <b>{{ activeRecord.endNetwork || '衡阳营业部' }}</b>。</p>
          <p>2. 随车货物总计：共 <b>{{ recordList.length }}</b> 票，总件数 <b>{{ totalLabelCount }}</b> 件。</p>
          <p>3. 乙方须保证货物完好无损、防雨防潮，并于规定时效内安全送达指定卸货网点，凭回单原件结算尾款。</p>
          <div class="wb-sign-row" style="margin-top: 32px">
            <span>甲方签章：__________________</span>
            <span>乙方（司机）签字按手印：__________________</span>
            <span>签约日期：2026-04-10</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <el-button size="small" @click="visible = false">取 消</el-button>
      <el-button size="small" type="primary" @click="triggerBrowserPrint">立即打印</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const visible = ref(false)
const currentType = ref<'waybill' | 'label' | 'manifest' | 'contract'>('waybill')
const selectedPrinter = ref('epson')
const recordList = ref<any[]>([])

const activeRecord = computed(() => recordList.value[0] || {})

const totalLabelCount = computed(() => {
  return recordList.value.reduce((s, r) => s + (Number(r.num) || 1), 0) || 10
})

const printTypeLabel = computed(() => {
  const map: Record<string, string> = {
    waybill: '标准三联运单',
    label: '热敏货物标签',
    manifest: '配载发车清单',
    contract: '整车运输合同',
  }
  return map[currentType.value] || '单据打印'
})

const open = (type: 'waybill' | 'label' | 'manifest' | 'contract', rows: any[]) => {
  currentType.value = type
  recordList.value = rows && rows.length ? rows : [{}]
  visible.value = true
}

const triggerBrowserPrint = () => {
  try {
    window.print()
  } catch (err) {
    console.warn('Native print dialog invocation:', err)
  }
  ElMessage.success(`已发送【${printTypeLabel.value}】任务至打印机 (${selectedPrinter.value})`)
  visible.value = false
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.print-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;

  .pt-right {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #606266;
  }
}

.print-canvas-wrap {
  background: #f0f2f5;
  padding: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
}

.waybill-paper {
  width: 100%;
  background: #fff;
  border: 2px solid #303133;
  padding: 14px 18px;
  color: #1f2937;
  font-size: 12px;

  .wb-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px double #303133;
    padding-bottom: 8px;
    margin-bottom: 8px;

    .comp-name {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 1px;
    }
    .comp-sub {
      font-size: 11px;
      color: #606266;
      margin-top: 2px;
    }
    .wb-barcode {
      text-align: right;
      .bars {
        font-family: monospace;
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 1;
      }
      .no-text {
        font-weight: 700;
        font-size: 12px;
        margin-top: 2px;
      }
    }
  }

  .wb-meta-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 12px;
  }

  .wb-grid-table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      border: 1px solid #303133;
      padding: 5px 6px;
      font-size: 12px;
      text-align: left;
    }
    th {
      background: #f5f7fa;
      text-align: center;
      font-weight: 600;
    }
    .lbl {
      width: 28px;
      text-align: center;
      font-weight: 700;
      background: #f5f7fa;
    }
    .lbl-sm {
      width: 78px;
      background: #fafafa;
      font-weight: 600;
    }
  }

  .wb-sign-row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 11px;
    color: #303133;
  }

  .contract-body {
    line-height: 1.9;
    font-size: 13px;
    padding: 8px 4px;
  }
}

.thermal-label-card {
  width: 420px;
  background: #fff;
  border: 2px solid #111827;
  border-radius: 6px;
  padding: 14px;

  .tl-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #111827;
    padding-bottom: 8px;

    .tl-brand {
      font-size: 16px;
      font-weight: 800;
    }
    .tl-city {
      font-size: 20px;
      font-weight: 800;
      color: #d9001b;
    }
  }

  .tl-mid {
    padding: 10px 0;
    .tl-goods-no {
      font-size: 18px;
      font-weight: 800;
      margin-bottom: 6px;
    }
    .tl-row {
      font-size: 12px;
      line-height: 1.7;
    }
  }

  .tl-barcode {
    text-align: center;
    font-family: monospace;
    font-size: 22px;
    letter-spacing: 3px;
    border-top: 1px dashed #606266;
    padding-top: 8px;
  }
}
</style>
