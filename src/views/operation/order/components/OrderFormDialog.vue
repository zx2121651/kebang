<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="1120px"
    top="3vh"
    class="kb-order-form-dialog"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <!-- 顶部状态与上游溯源横幅 -->
    <div class="order-meta-banner">
      <div class="meta-left">
        <span class="meta-item">
          <span class="meta-label">订单编号：</span>
          <strong class="meta-code">{{ form.orderNo || '保存后自动生成' }}</strong>
        </span>
        <el-tag size="small" :type="form.source === 5 ? 'warning' : 'info'" effect="plain">
          来源：{{ form.sourceName || '系统录入' }}
        </el-tag>
        <span v-if="form.upstreamPlatform" class="meta-item">
          <span class="meta-label">对接平台：</span>
          <span class="meta-val">{{ form.upstreamPlatform }} ({{ form.upstreamOrderNo }})</span>
        </span>
      </div>
      <div class="meta-right">
        <el-tag size="small" :type="form.auditStatus === 2 ? 'success' : 'danger'" effect="dark">
          {{ form.auditStatus === 2 ? '已审核' : '待审核' }}
        </el-tag>
        <el-tag size="small" :type="form.isShip === 1 ? 'primary' : 'info'" effect="dark">
          {{ form.isShip === 1 ? `已转运单 (${form.shipNo})` : '未转运单' }}
        </el-tag>
      </div>
    </div>

    <el-form
      ref="formRef"
      :model="form"
      :disabled="isReadOnly"
      label-width="76px"
      size="small"
      class="kb-high-density-form"
    >
      <!-- 第一部分：路由与基本单据属性 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-indicator"></span>
          <span class="section-title">路由与单据信息</span>
        </div>
        <el-row :gutter="12">
          <el-col :span="5">
            <el-form-item label="始发网点" required>
              <el-select v-model="form.sendCompanyName" placeholder="选择网点" style="width: 100%">
                <el-option v-for="b in BRANCH_LIST" :key="b" :label="b" :value="b" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="发站城市" required>
              <el-input v-model="form.sendAreaName" placeholder="如：广州" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="到站区域" required>
              <el-select v-model="form.endAreaName" filterable allow-create placeholder="选择或输入到站" style="width: 100%" @change="handleEndAreaChange">
                <el-option v-for="c in DEST_CITY_LIST" :key="c" :label="c" :value="c" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="目的网点">
              <el-input v-model="form.destName" placeholder="目的分拨/网点" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="托运时间">
              <el-date-picker
                v-model="form.consignDate"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="托运时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="12">
          <el-col :span="5">
            <el-form-item label="订单类型">
              <el-select v-model="form.orderType" style="width: 100%">
                <el-option :value="0" label="常规订单" />
                <el-option :value="1" label="加急订单" />
                <el-option :value="2" label="项目大票" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="交接方式">
              <el-select v-model="form.deliverType" style="width: 100%">
                <el-option :value="0" label="送货上门" />
                <el-option :value="1" label="网点自提" />
                <el-option :value="2" label="专车直送" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="订单来源">
              <el-select v-model="form.source" style="width: 100%" @change="handleSourceChange">
                <el-option :value="5" label="开放平台API (上游)" />
                <el-option :value="1" label="系统录入" />
                <el-option :value="2" label="微信小程序" />
                <el-option :value="3" label="APP客户端" />
                <el-option :value="4" label="网点端上报" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="上游单号">
              <el-input v-model="form.upstreamOrderNo" placeholder="ERP/OMS源单号" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="业务员">
              <el-input v-model="form.salesman" placeholder="揽件业务员" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <!-- 第二部分：发货方与收货方双栏卡片 -->
      <el-row :gutter="12" class="party-cards-row">
        <el-col :span="12">
          <div class="form-section party-card consignor-card">
            <div class="section-header">
              <span class="party-badge send">发</span>
              <span class="section-title">发货方信息 (Consignor)</span>
              <el-select
                v-if="!isReadOnly"
                v-model="quickConsignor"
                placeholder="快速调取协议发货客户"
                size="small"
                clearable
                style="width: 190px; margin-left: auto"
                @change="applyQuickConsignor"
              >
                <el-option
                  v-for="item in QUICK_CONSIGNORS"
                  :key="item.unit"
                  :label="item.unit"
                  :value="item.unit"
                />
              </el-select>
            </div>
            <el-row :gutter="10">
              <el-col :span="13">
                <el-form-item label="发货单位" required>
                  <el-input v-model="form.consignorUnit" placeholder="发货企业/单位全称" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="发货人" required>
                  <el-input v-model="form.consignorName" placeholder="发货联系人" />
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="联系电话" required>
                  <el-input v-model="form.consignorMobile" placeholder="手机或固话" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="提货地址" required>
                  <el-input v-model="form.consignorAddress" placeholder="详细提货街道/园区/门牌号" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="form-section party-card consignee-card">
            <div class="section-header">
              <span class="party-badge receive">收</span>
              <span class="section-title">收货方信息 (Consignee)</span>
            </div>
            <el-row :gutter="10">
              <el-col :span="13">
                <el-form-item label="收货单位" required>
                  <el-input v-model="form.consigneeUnit" placeholder="收货企业/门店全称" />
                </el-form-item>
              </el-col>
              <el-col :span="11">
                <el-form-item label="收货人" required>
                  <el-input v-model="form.consigneeName" placeholder="收货签收人" />
                </el-form-item>
              </el-col>
              <el-col :span="13">
                <el-form-item label="联系电话" required>
                  <el-input v-model="form.consigneeMobile" placeholder="收货人手机号" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="送货地址" required>
                  <el-input v-model="form.consigneeAddress" placeholder="详细送货地址" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <!-- 第三部分：货物明细动态行表格 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-indicator"></span>
          <span class="section-title">货物明细 (支持多品名动态计费)</span>
          <div class="goods-summary-pill">
            合计：<strong>{{ form.num }}</strong> 件 |
            <strong>{{ Number(form.weight || 0).toFixed(2) }}</strong> kg |
            <strong>{{ Number(form.volume || 0).toFixed(2) }}</strong> m³ |
            基本运费：<strong class="fee-highlight">¥{{ Number(form.freightFee || 0).toFixed(2) }}</strong>
          </div>
          <el-button
            v-if="!isReadOnly"
            type="primary"
            size="small"
            plain
            style="margin-left: auto"
            @click="addGoodsRow"
          >
            + 添加货物品名
          </el-button>
        </div>

        <el-table :data="form.goodsList" border size="small" class="kb-goods-edit-table">
          <el-table-column type="index" label="#" width="42" align="center" />
          <el-table-column label="货物品名 *" min-width="140">
            <template #default="{ row }">
              <el-input v-model="row.cargoName" placeholder="如：变频空调室内机" @change="syncGoodsSummary" />
            </template>
          </el-table-column>
          <el-table-column label="包装" width="105">
            <template #default="{ row }">
              <el-select v-model="row.pack" filterable allow-create>
                <el-option v-for="p in PACK_OPTIONS" :key="p" :label="p" :value="p" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" width="120">
            <template #default="{ row }">
              <el-input v-model="row.variety" placeholder="规格型号" />
            </template>
          </el-table-column>
          <el-table-column label="件数 *" width="95">
            <template #default="{ row }">
              <el-input-number
                v-model="row.num"
                :min="1"
                :precision="0"
                :controls="false"
                style="width: 100%"
                @change="recalcGoodsRow(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="重量(kg) *" width="105">
            <template #default="{ row }">
              <el-input-number
                v-model="row.weight"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
                @change="recalcGoodsRow(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="体积(m³) *" width="105">
            <template #default="{ row }">
              <el-input-number
                v-model="row.volume"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
                @change="recalcGoodsRow(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="计价方式" width="115">
            <template #default="{ row }">
              <el-select v-model="row.priceType" @change="recalcGoodsRow(row)">
                <el-option :value="0" label="按重量(kg)" />
                <el-option :value="1" label="按体积(m³)" />
                <el-option :value="2" label="按件数(件)" />
                <el-option :value="3" label="整车包干" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="单价(元)" width="95">
            <template #default="{ row }">
              <el-input-number
                v-model="row.unitPrice"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
                @change="recalcGoodsRow(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="基本运费(元)" width="110">
            <template #default="{ row }">
              <el-input-number
                v-model="row.freightFee"
                :min="0"
                :precision="2"
                :controls="false"
                style="width: 100%"
                @change="syncGoodsSummary"
              />
            </template>
          </el-table-column>
          <el-table-column label="商品条码" min-width="120">
            <template #default="{ row }">
              <el-input v-model="row.barcode" placeholder="选填条码" />
            </template>
          </el-table-column>
          <el-table-column v-if="!isReadOnly" label="操作" width="60" align="center">
            <template #default="{ $index }">
              <el-button
                type="danger"
                link
                size="small"
                :disabled="form.goodsList.length <= 1"
                @click="removeGoodsRow($index)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 第四部分：费用组成与五方结算平衡 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-indicator"></span>
          <span class="section-title">费用明细与结算方式</span>
          <span class="fee-rule-tip">
            * 科邦财务校验规则：总运费必须等于【现付 + 提付 + 回单付 + 月结 + 货款扣】之和
          </span>
        </div>

        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="基本运费">
              <el-input-number v-model="form.freightFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="送货费">
              <el-input-number v-model="form.deliveryFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="提货费">
              <el-input-number v-model="form.pickupFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="装卸费">
              <el-input-number v-model="form.handlingFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="上楼费">
              <el-input-number v-model="form.upstairFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="叉车费">
              <el-input-number v-model="form.forkliftFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item label="声明价值">
              <el-input-number v-model="form.declareValue" :min="0" :precision="2" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="保价费">
              <el-input-number v-model="form.insuranceFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="代收货款">
              <el-input-number v-model="form.collectionMoney" :min="0" :precision="2" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="代收手续费">
              <el-input-number v-model="form.collectionFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="报关/税金">
              <el-input-number v-model="form.taxFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="其他费用">
              <el-input-number v-model="form.otherFee" :min="0" :precision="2" :controls="false" style="width: 100%" @change="recalcTotalFee" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 结算分配栏 -->
        <div class="payment-allocation-bar">
          <div class="total-fee-box">
            <span class="lbl">应收总运费：</span>
            <span class="val">¥{{ Number(form.totalFee || 0).toFixed(2) }}</span>
          </div>

          <div class="pay-inputs">
            <div class="pay-field">
              <span class="pay-lbl">现付</span>
              <el-input-number v-model="form.payNow" :min="0" :precision="2" :controls="false" size="small" />
            </div>
            <div class="pay-field">
              <span class="pay-lbl">提付</span>
              <el-input-number v-model="form.payArrived" :min="0" :precision="2" :controls="false" size="small" />
            </div>
            <div class="pay-field">
              <span class="pay-lbl">回单付</span>
              <el-input-number v-model="form.payReceipt" :min="0" :precision="2" :controls="false" size="small" />
            </div>
            <div class="pay-field">
              <span class="pay-lbl">月结</span>
              <el-input-number v-model="form.payMonthly" :min="0" :precision="2" :controls="false" size="small" />
            </div>
            <div class="pay-field">
              <span class="pay-lbl">货款扣</span>
              <el-input-number v-model="form.payDeduction" :min="0" :precision="2" :controls="false" size="small" />
            </div>
          </div>

          <div v-if="!isReadOnly" class="pay-quick-btns">
            <el-button size="small" link type="primary" @click="setAllPay('payNow')">全现付</el-button>
            <el-button size="small" link type="primary" @click="setAllPay('payArrived')">全提付</el-button>
            <el-button size="small" link type="primary" @click="setAllPay('payReceipt')">全回单付</el-button>
            <el-button size="small" link type="primary" @click="setAllPay('payMonthly')">全月结</el-button>
          </div>

          <div class="balance-status" :class="{ 'is-error': paymentDiff !== 0 }">
            <template v-if="paymentDiff === 0">
              <span class="status-ok">✓ 结算平衡</span>
            </template>
            <template v-else>
              <span class="status-err">差额: ¥{{ paymentDiff.toFixed(2) }}</span>
            </template>
          </div>
        </div>
      </div>

      <!-- 第五部分：回单、提货车辆与备注 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-indicator"></span>
          <span class="section-title">回单要求、提货派车与备注</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="回单标识">
              <el-select v-model="form.receiptFlag" style="width: 100%">
                <el-option :value="0" label="无需回单" />
                <el-option :value="1" label="回单原件" />
                <el-option :value="2" label="电子回单" />
                <el-option :value="3" label="传真回单" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="回单要求">
              <el-input v-model="form.receiptRequirement" placeholder="如：签字盖章" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="回单份数">
              <el-input-number v-model="form.receiptNum" :min="0" :max="10" :controls="false" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="回单编号">
              <el-input v-model="form.receiptNo" placeholder="回单号" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提货司机">
              <el-input v-model="form.pickupDriver" placeholder="提货司机姓名" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="司机电话">
              <el-input v-model="form.pickupDriverPhone" placeholder="提货司机电话" />
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="提货车牌">
              <el-input v-model="form.pickupTruckNo" placeholder="如：粤A·88219" />
            </el-form-item>
          </el-col>
          <el-col :span="14">
            <el-form-item label="订单备注">
              <el-input v-model="form.remark" placeholder="填写装卸要求、预约入仓号、轻拿轻放等注意事项" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>

    <template #footer>
      <div class="dialog-footer-wrap">
        <div class="footer-left-info">
          <span v-if="form.createTime">制单：{{ form.createByName }} ({{ form.createTime }})</span>
          <span v-if="form.auditTime" style="margin-left: 16px">审核：{{ form.auditByName }} ({{ form.auditTime }})</span>
        </div>
        <div class="footer-right-btns">
          <el-button size="small" @click="dialogVisible = false">
            {{ isReadOnly ? '关 闭' : '取 消' }}
          </el-button>
          <template v-if="isReadOnly">
            <el-button
              v-if="form.isShip !== 1"
              type="primary"
              size="small"
              plain
              @click="switchToEdit"
            >
              修改订单
            </el-button>
            <el-button
              v-if="form.auditStatus === 1"
              type="success"
              size="small"
              @click="handleDirectAudit"
            >
              审核通过
            </el-button>
            <el-button
              v-if="form.isShip !== 1"
              type="primary"
              size="small"
              @click="handleDirectConvert"
            >
              转入运单
            </el-button>
          </template>
          <template v-else>
            <el-button type="primary" size="small" @click="handleSubmit">
              保 存 订 单 (Ctrl+S)
            </el-button>
          </template>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import type { OrderRecord, OrderGoodsItem } from '@/mock/orderData'
import { BRANCH_LIST, DEST_CITY_LIST } from '@/mock/orderData'

export type DialogMode = 'create' | 'edit' | 'detail'

const emit = defineEmits<{
  (e: 'saved', payload: Partial<OrderRecord>, mode: DialogMode): void
  (e: 'audit', id: string): void
  (e: 'convert', row: OrderRecord): void
}>()

const dialogVisible = ref(false)
const currentMode = ref<DialogMode>('create')
const quickConsignor = ref('')

const PACK_OPTIONS = ['纸箱', '木架', '托盘', '木箱', '编织袋', '桶装', '裸装']

const QUICK_CONSIGNORS = [
  {
    unit: '美的集团股份有限公司家用空调事业部',
    name: '周建宏',
    mobile: '13800138661',
    address: '广东省佛山市顺德区北滘镇美的大道6号智能制造物流园B区3号仓'
  },
  {
    unit: '广州立白企业集团有限公司',
    name: '陈志强',
    mobile: '13602889912',
    address: '广东省广州市番禺区沙头街横江工业区立白中心仓A12月台'
  },
  {
    unit: '广汽埃安新能源汽车股份有限公司',
    name: '刘伟铭',
    mobile: '13570223344',
    address: '广东省广州市番禺区化龙镇金山大道东668号埃安总装零件库'
  },
  {
    unit: '佛山市海天调味食品股份有限公司',
    name: '梁嘉豪',
    mobile: '13929901188',
    address: '广东省佛山市高明区沧江工业园东园海天现代物流基地2号门'
  }
]

const createEmptyForm = (defaultSource = 5): Partial<OrderRecord> & { goodsList: OrderGoodsItem[] } => ({
  id: '',
  orderNo: '',
  source: defaultSource,
  sourceName: defaultSource === 5 ? '开放平台API' : '系统录入',
  upstreamPlatform: defaultSource === 5 ? '奇门/EDI接口' : 'PC端自建',
  upstreamOrderNo: '',
  auditStatus: 1,
  isShip: 0,
  shipNo: '',
  shipId: '',
  orderType: 0,
  deliverType: 0,
  sendCompanyName: '广州白云总部',
  sendAreaName: '广州',
  endAreaName: '长沙',
  destName: '长沙分拨中心',
  cargoName: '标准普货',
  pack: '纸箱',
  num: 10,
  weight: 200,
  volume: 1.5,
  unitPrice: 25,
  priceType: 2,
  goodsList: [
    {
      id: `G-${Date.now()}-1`,
      cargoName: '标准普货',
      pack: '纸箱',
      variety: '常规件',
      num: 10,
      weight: 200,
      volume: 1.5,
      unitPrice: 25,
      priceType: 2,
      freightFee: 250,
      barcode: ''
    }
  ],
  totalFee: 250,
  freightFee: 250,
  payNow: 0,
  payArrived: 0,
  payReceipt: 0,
  payMonthly: 250,
  payDeduction: 0,
  deliveryFee: 0,
  pickupFee: 0,
  upstairFee: 0,
  handlingFee: 0,
  forkliftFee: 0,
  customsFee: 0,
  otherFee: 0,
  otherFeeNote: '',
  declareValue: 0,
  insuranceFee: 0,
  collectionMoney: 0,
  collectionFee: 0,
  taxFee: 0,
  rebateFee: 0,
  receiptFlag: 1,
  receiptRequirement: '签字盖章',
  receiptNum: 1,
  receiptNo: '',
  consignorUnit: '',
  consignorName: '',
  consignorMobile: '',
  consignorAddress: '',
  consigneeUnit: '',
  consigneeName: '',
  consigneeMobile: '',
  consigneeAddress: '',
  pickupDriver: '',
  pickupDriverPhone: '',
  pickupTruckNo: '',
  salesman: '陈静',
  remark: '',
  createByName: '管理员(aadmin)',
  createTime: '',
  consignDate: new Date().toISOString().replace('T', ' ').slice(0, 19),
  auditByName: '',
  auditTime: ''
})

const form = ref<Partial<OrderRecord> & { goodsList: OrderGoodsItem[] }>(createEmptyForm())

const isReadOnly = computed(() => currentMode.value === 'detail')

const dialogTitle = computed(() => {
  if (currentMode.value === 'create') return '新增客户订单'
  if (currentMode.value === 'edit') return `修改订单 - ${form.value.orderNo}`
  return `订单详情 - ${form.value.orderNo}`
})

// 结算差额计算
const paymentDiff = computed(() => {
  const total = Number(form.value.totalFee || 0)
  const sumPay =
    Number(form.value.payNow || 0) +
    Number(form.value.payArrived || 0) +
    Number(form.value.payReceipt || 0) +
    Number(form.value.payMonthly || 0) +
    Number(form.value.payDeduction || 0)
  return Number((total - sumPay).toFixed(2))
})

function open(mode: DialogMode, record?: OrderRecord, defaultSource = 5) {
  currentMode.value = mode
  quickConsignor.value = ''
  if (record) {
    form.value = JSON.parse(JSON.stringify(record))
    if (!form.value.goodsList || form.value.goodsList.length === 0) {
      form.value.goodsList = [
        {
          id: `G-${Date.now()}-1`,
          cargoName: record.cargoName || '普货',
          pack: record.pack || '纸箱',
          variety: '标准件',
          num: record.num || 1,
          weight: record.weight || 0,
          volume: record.volume || 0,
          unitPrice: record.unitPrice || 0,
          priceType: record.priceType ?? 2,
          freightFee: record.freightFee || 0,
          barcode: ''
        }
      ]
    }
  } else {
    form.value = createEmptyForm(defaultSource)
  }
  dialogVisible.value = true
}

function switchToEdit() {
  currentMode.value = 'edit'
}

function handleEndAreaChange(val: string) {
  if (val && !form.value.destName) {
    form.value.destName = `${val}分拨中心`
  }
}

function handleSourceChange(val: number) {
  const map: Record<number, string> = {
    1: '系统录入',
    2: '微信小程序',
    3: 'APP客户端',
    4: '网点端上报',
    5: '开放平台API'
  }
  form.value.sourceName = map[val] || '系统录入'
}

function applyQuickConsignor(unitName: string) {
  const found = QUICK_CONSIGNORS.find(c => c.unit === unitName)
  if (found) {
    form.value.consignorUnit = found.unit
    form.value.consignorName = found.name
    form.value.consignorMobile = found.mobile
    form.value.consignorAddress = found.address
  }
}

function addGoodsRow() {
  if (form.value.goodsList.length >= 5) {
    ElMessage.warning('单张订单最多添加 5 行货物品名明细')
    return
  }
  form.value.goodsList.push({
    id: `G-${Date.now()}-${form.value.goodsList.length + 1}`,
    cargoName: '',
    pack: '纸箱',
    variety: '',
    num: 1,
    weight: 10,
    volume: 0.1,
    unitPrice: 0,
    priceType: 2,
    freightFee: 0,
    barcode: ''
  })
  syncGoodsSummary()
}

function removeGoodsRow(index: number) {
  if (form.value.goodsList.length <= 1) return
  form.value.goodsList.splice(index, 1)
  syncGoodsSummary()
}

function recalcGoodsRow(row: OrderGoodsItem) {
  const num = Number(row.num || 0)
  const weight = Number(row.weight || 0)
  const volume = Number(row.volume || 0)
  const price = Number(row.unitPrice || 0)

  if (price > 0) {
    if (row.priceType === 0) {
      row.freightFee = Number((weight * price).toFixed(2))
    } else if (row.priceType === 1) {
      row.freightFee = Number((volume * price).toFixed(2))
    } else if (row.priceType === 2) {
      row.freightFee = Number((num * price).toFixed(2))
    } else {
      row.freightFee = Number(price.toFixed(2))
    }
  }
  syncGoodsSummary()
}

function syncGoodsSummary() {
  const list = form.value.goodsList
  form.value.cargoName = list.map(g => g.cargoName).filter(Boolean).join(' / ') || '普货'
  form.value.pack = list[0]?.pack || '纸箱'
  form.value.num = list.reduce((sum, g) => sum + Number(g.num || 0), 0)
  form.value.weight = Number(list.reduce((sum, g) => sum + Number(g.weight || 0), 0).toFixed(2))
  form.value.volume = Number(list.reduce((sum, g) => sum + Number(g.volume || 0), 0).toFixed(2))
  form.value.freightFee = Number(list.reduce((sum, g) => sum + Number(g.freightFee || 0), 0).toFixed(2))
  recalcTotalFee()
}

function recalcTotalFee() {
  const total =
    Number(form.value.freightFee || 0) +
    Number(form.value.deliveryFee || 0) +
    Number(form.value.pickupFee || 0) +
    Number(form.value.handlingFee || 0) +
    Number(form.value.upstairFee || 0) +
    Number(form.value.forkliftFee || 0) +
    Number(form.value.insuranceFee || 0) +
    Number(form.value.collectionFee || 0) +
    Number(form.value.taxFee || 0) +
    Number(form.value.otherFee || 0)

  form.value.totalFee = Number(total.toFixed(2))
}

function setAllPay(field: 'payNow' | 'payArrived' | 'payReceipt' | 'payMonthly') {
  form.value.payNow = 0
  form.value.payArrived = 0
  form.value.payReceipt = 0
  form.value.payMonthly = 0
  form.value.payDeduction = 0
  form.value[field] = Number(form.value.totalFee || 0)
}

function handleSubmit() {
  if (!form.value.consignorName || !form.value.consignorMobile) {
    ElMessage.error('请填写完整的发货人姓名及联系电话！')
    return
  }
  if (!form.value.consigneeName || !form.value.consigneeMobile) {
    ElMessage.error('请填写完整的收货人姓名及联系电话！')
    return
  }
  if (form.value.goodsList.some(g => !g.cargoName)) {
    ElMessage.error('请填写所有货物明细行的货物品名！')
    return
  }
  // 原系统 custorder 严格费用平衡校验
  if (paymentDiff.value !== 0) {
    ElMessage.error('总运费与付款金额不一致，请结清费用！')
    return
  }

  emit('saved', { ...form.value }, currentMode.value)
  dialogVisible.value = false
}

function handleDirectAudit() {
  if (form.value.id) {
    emit('audit', form.value.id)
    form.value.auditStatus = 2
  }
}

function handleDirectConvert() {
  if (form.value.id) {
    dialogVisible.value = false
    emit('convert', form.value as OrderRecord)
  }
}

defineExpose({
  open
})
</script>

<style scoped lang="scss">
.order-meta-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f3f6fb;
  border: 1px solid #dce5f4;
  border-radius: 4px;
  padding: 6px 12px;
  margin-bottom: 10px;
  font-size: 12px;

  .meta-left {
    display: flex;
    align-items: center;
    gap: 12px;

    .meta-label {
      color: #606266;
    }
    .meta-code {
      color: #4f77cb;
      font-size: 13px;
      font-family: Consolas, Monaco, monospace;
    }
    .meta-val {
      color: #303133;
      font-weight: 500;
    }
  }

  .meta-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.kb-high-density-form {
  :deep(.el-form-item) {
    margin-bottom: 8px;
  }
  :deep(.el-form-item__label) {
    font-size: 12px;
    color: #4a5568;
    padding-right: 6px;
  }
}

.form-section {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 8px 12px 4px;
  margin-bottom: 10px;
  background: #ffffff;

  .section-header {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 8px;
    padding-bottom: 5px;
    border-bottom: 1px dashed #ebeef5;

    .section-indicator {
      width: 3px;
      height: 13px;
      background: #4f77cb;
      border-radius: 2px;
    }

    .section-title {
      font-size: 12.5px;
      font-weight: 600;
      color: #303133;
    }

    .goods-summary-pill {
      margin-left: 16px;
      font-size: 12px;
      color: #606266;
      background: #f8fafc;
      padding: 2px 10px;
      border-radius: 3px;
      border: 1px solid #e2e8f0;

      strong {
        color: #303133;
      }
      .fee-highlight {
        color: #e6a23c;
      }
    }

    .fee-rule-tip {
      margin-left: auto;
      font-size: 11.5px;
      color: #909399;
    }
  }
}

.party-cards-row {
  .party-card {
    .party-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      border-radius: 3px;
      font-size: 11px;
      font-weight: 700;
      color: #fff;

      &.send {
        background: #4f77cb;
      }
      &.receive {
        background: #13ce66;
      }
    }
  }
}

.kb-goods-edit-table {
  margin-bottom: 6px;
  :deep(.el-table__header th) {
    background: #f5f7fa !important;
    color: #303133;
    font-size: 12px;
    padding: 4px 0;
  }
  :deep(.el-table__body td) {
    padding: 3px 0;
  }
}

.payment-allocation-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f8faff;
  border: 1px solid #d9e3f8;
  border-radius: 4px;
  padding: 6px 12px;
  margin: 4px 0 6px;

  .total-fee-box {
    display: flex;
    align-items: baseline;
    min-width: 155px;

    .lbl {
      font-size: 12px;
      color: #606266;
    }
    .val {
      font-size: 16px;
      font-weight: 700;
      color: #f56c6c;
    }
  }

  .pay-inputs {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;

    .pay-field {
      display: flex;
      align-items: center;
      gap: 4px;

      .pay-lbl {
        font-size: 12px;
        color: #606266;
        white-space: nowrap;
      }
      :deep(.el-input-number) {
        width: 86px;
      }
    }
  }

  .pay-quick-btns {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .balance-status {
    font-size: 12px;
    font-weight: 600;
    min-width: 90px;
    text-align: right;

    .status-ok {
      color: #67c23a;
    }
    .status-err {
      color: #f56c6c;
    }
  }
}

.dialog-footer-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .footer-left-info {
    font-size: 12px;
    color: #909399;
  }

  .footer-right-btns {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
</style>
