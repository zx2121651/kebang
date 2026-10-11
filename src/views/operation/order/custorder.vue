<template>
  <div class="orderUiBox">
    <div class="ship-content">
      <el-form
        ref="formRef"
        :model="form"
        size="small"
        class="formBody"
        :class="{ 'detail-readonly': isReadOnly }"
        :disabled="isReadOnly"
        @submit.prevent
      >
        <!-- 顶部居中大标题（带双底线） -->
        <el-row type="flex" justify="center" class="header">
          <div class="title">{{ pageTitle }}</div>
        </el-row>

        <!-- 订单号 & 托运日期 -->
        <el-row type="flex" justify="space-between" class="base-info" style="margin-bottom: 3px;">
          <el-col :span="5">
            <el-form-item label="订单号" label-width="68px" class="is-required">
              <el-input v-model="form.orderNo" placeholder="请输入订单号" />
            </el-form-item>
          </el-col>
          <el-col :span="5" style="display: flex; justify-content: flex-end;">
            <el-form-item label="托运日期" label-width="80px" class="is-required" style="width: 245px;">
              <el-date-picker
                v-model="form.shippingDate"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="选择托运日期"
                :clearable="false"
                style="width: 100%;"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 蓝色边框主表单容器 .el-form-box -->
        <div class="el-form-box">
          <!-- 1. 线路与站点行 .order-editor-traffic -->
          <div class="order-editor-traffic">
            <el-form-item label="始发地" label-width="78px">
              <el-select
                v-model="form.startCity"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
              >
                <el-option
                  v-for="city in departureCities"
                  :key="city"
                  :label="city"
                  :value="city"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="到站城市" label-width="88px" class="is-required">
              <el-select
                v-model="form.destCity"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                @change="handleArrivalCityChange"
              >
                <el-option
                  v-for="city in arrivalCities"
                  :key="city"
                  :label="city"
                  :value="city"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="终端网点" label-width="88px" class="is-required">
              <el-select
                v-model="form.destGroup"
                filterable
                allow-create
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="net in terminalNetworkOptions"
                  :key="net"
                  :label="net"
                  :value="net"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="货号" label-width="68px">
              <el-input v-model="form.goodsNo" placeholder="" />
            </el-form-item>
          </div>

          <!-- 2. 发货方 & 收货方 .order-editor-person -->
          <div class="order-editor-person" style="display: flex;">
            <!-- 发货方 -->
            <div class="el-form-item-box">
              <div class="left">
                <svg viewBox="0 0 1024 1024" width="30" height="30" fill="#909090">
                  <path d="M832 320V192H128v576h96c0 53 43 96 96 96s96-43 96-96h256c0 53 43 96 96 96s96-43 96-96h96V512l-128-192zM320 800c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm448 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm128-256H832V384h44.8l83.2 128v32z" />
                </svg>
                <span style="margin-top: 4px; font-size: 13px;">发货方</span>
                <div v-if="!isReadOnly" class="person-Quick-icons">
                  <el-icon title="历史订单记录" @click="openHistoryOrderDialog('shipper')"><Search /></el-icon>
                  <el-popover placement="bottom-start" :width="340" trigger="click">
                    <template #reference>
                      <el-icon title="智能地址解析"><Setting /></el-icon>
                    </template>
                    <div class="smart-parse-box">
                      <div style="font-size: 12px; color: #606266; margin-bottom: 6px;">
                        粘贴整段发货人信息（姓名、电话、公司、地址），自动智能识别填充：
                      </div>
                      <el-input
                        v-model="shipperSmartText"
                        type="textarea"
                        :rows="3"
                        placeholder="例：京东华北仓 张伟 13810248899 北京市大兴区亦庄科创十一街18号"
                      />
                      <div style="text-align: right; margin-top: 8px;">
                        <el-button type="primary" size="small" @click="parseSmartAddress('shipper')">智能解析</el-button>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>

              <div class="person-fields">
                <el-row class="el-row--flex">
                  <el-col :span="8">
                    <el-form-item label="发货单位" label-width="78px">
                      <el-popover
                        placement="bottom-start"
                        :width="520"
                        trigger="click"
                        :disabled="isReadOnly"
                      >
                        <template #reference>
                          <el-input v-model="form.shipUnit" placeholder="输入单位或首字母联想" />
                        </template>
                        <el-table
                          :data="filteredShipperArchives"
                          size="small"
                          border
                          max-height="220"
                          style="cursor: pointer;"
                          @row-click="selectShipperArchive"
                        >
                          <el-table-column prop="unit" label="发货单位" min-width="130" show-overflow-tooltip />
                          <el-table-column prop="name" label="发货人" width="80" />
                          <el-table-column prop="phone" label="联系电话" width="110" />
                          <el-table-column prop="address" label="发货地址" min-width="140" show-overflow-tooltip />
                        </el-table>
                      </el-popover>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发货人" label-width="72px" class="is-required">
                      <CustomerAutoComplete
                        v-model="form.shipper"
                        type="shipper"
                        placeholder="姓名/拼音联想"
                        @select="selectShipperArchive"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="发货人号码" label-width="92px" class="is-required">
                      <el-input v-model="form.shipPhone" placeholder="手机号码" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row class="el-row--flex" style="margin-top: 4px;">
                  <el-col :span="24">
                    <el-form-item label="发货地址" label-width="78px" class="user-addr">
                      <el-input v-model="form.shipAddress" placeholder="详细发货地址" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 收货方 -->
            <div class="el-form-item-box">
              <div class="left">
                <svg viewBox="0 0 1024 1024" width="30" height="30" fill="#909090">
                  <path d="M512 128L128 448h128v384h512V448h128L512 128zm192 640H320V416l192-160 192 160v352z" />
                </svg>
                <span style="margin-top: 4px; font-size: 13px;">收货方</span>
                <div v-if="!isReadOnly" class="person-Quick-icons">
                  <el-icon title="历史订单记录" @click="openHistoryOrderDialog('receiver')"><Search /></el-icon>
                  <el-popover placement="bottom-start" :width="340" trigger="click">
                    <template #reference>
                      <el-icon title="智能地址解析"><Setting /></el-icon>
                    </template>
                    <div class="smart-parse-box">
                      <div style="font-size: 12px; color: #606266; margin-bottom: 6px;">
                        粘贴整段收货人信息（姓名、电话、公司、地址），自动智能识别填充：
                      </div>
                      <el-input
                        v-model="receiverSmartText"
                        type="textarea"
                        :rows="3"
                        placeholder="例：山西晋煤集团 李建国 13934125566 太原市小店区长风街128号"
                      />
                      <div style="text-align: right; margin-top: 8px;">
                        <el-button type="primary" size="small" @click="parseSmartAddress('receiver')">智能解析</el-button>
                      </div>
                    </div>
                  </el-popover>
                </div>
              </div>

              <div class="person-fields">
                <el-row class="el-row--flex">
                  <el-col :span="8">
                    <el-form-item label="收货单位" label-width="78px">
                      <el-popover
                        placement="bottom-start"
                        :width="520"
                        trigger="click"
                        :disabled="isReadOnly"
                      >
                        <template #reference>
                          <el-input v-model="form.receiveUnit" placeholder="输入单位或首字母联想" />
                        </template>
                        <el-table
                          :data="filteredReceiverArchives"
                          size="small"
                          border
                          max-height="220"
                          style="cursor: pointer;"
                          @row-click="selectReceiverArchive"
                        >
                          <el-table-column prop="unit" label="收货单位" min-width="130" show-overflow-tooltip />
                          <el-table-column prop="name" label="收货人" width="80" />
                          <el-table-column prop="phone" label="联系电话" width="110" />
                          <el-table-column prop="address" label="收货地址" min-width="140" show-overflow-tooltip />
                        </el-table>
                      </el-popover>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收货人" label-width="72px" class="is-required">
                      <CustomerAutoComplete
                        v-model="form.receiver"
                        type="receiver"
                        :dest-city="form.destCity"
                        placeholder="姓名/拼音联想"
                        @select="selectReceiverArchive"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收货人号码" label-width="92px" class="is-required">
                      <el-input v-model="form.receivePhone" placeholder="手机号码" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row class="el-row--flex" style="margin-top: 4px;">
                  <el-col :span="24">
                    <el-form-item label="收货地址" label-width="78px" class="user-addr is-required">
                      <el-input v-model="form.receiveAddress" placeholder="详细收货地址" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>

          <!-- 3. 货物明细表格 .order-editor-goods (原生表格1:1复刻，避免 el-table 被外层样式干扰) -->
          <div class="order-editor-goods">
            <table class="goods-native-table">
              <thead>
                <tr>
                  <th style="width: 85px;">操作</th>
                  <th>品名</th>
                  <th>包装</th>
                  <th>件数</th>
                  <th>运费</th>
                  <th>重量(公斤)</th>
                  <th>体积(立方)</th>
                  <th>声明价值</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in goodsRows" :key="rIdx">
                  <td style="text-align: center;">
                    <el-button
                      size="small"
                      :icon="Plus"
                      style="padding: 4px 6px; margin-right: 4px;"
                      :disabled="isReadOnly || goodsRows.length >= 3"
                      @click="addGoodsRow"
                    />
                    <el-button
                      size="small"
                      :icon="Minus"
                      style="padding: 4px 6px; margin-left: 0;"
                      :disabled="isReadOnly || goodsRows.length <= 1"
                      @click="removeGoodsRow(rIdx)"
                    />
                  </td>
                  <td>
                    <el-select
                      v-model="row.goodsName"
                      filterable
                      allow-create
                      default-first-option
                      placeholder=""
                      class="input-center"
                      style="width: 100%;"
                    >
                      <el-option v-for="g in goodsNameOptions" :key="g" :label="g" :value="g" />
                    </el-select>
                  </td>
                  <td>
                    <el-select
                      v-model="row.pack"
                      filterable
                      allow-create
                      default-first-option
                      placeholder=""
                      class="input-center"
                      style="width: 100%;"
                    >
                      <el-option v-for="p in packOptions" :key="p" :label="p" :value="p" />
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      v-model="row.numbers"
                      class="input-center"
                      @input="recalcGoodsTotals"
                    />
                  </td>
                  <td>
                    <el-input
                      v-model="row.freight"
                      class="input-center"
                      @input="syncGoodsFreightToBase"
                    />
                  </td>
                  <td>
                    <el-input
                      v-model="row.weight"
                      class="input-center"
                    />
                  </td>
                  <td>
                    <el-input
                      v-model="row.volume"
                      class="input-center"
                    />
                  </td>
                  <td>
                    <el-input
                      v-model="row.declaredValue"
                      class="input-center"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 4. 费用结算三栏区 .order-editor-fee -->
          <div class="order-editor-fee">
            <!-- 左栏：应收费用 -->
            <div class="order-editor-freight">
              <h3>应收费用</h3>
              <div class="draggable_children fee-grid-2col">
                <div class="colItem">
                  <el-form-item label="回单付" label-width="82px">
                    <el-input v-model="form.fReceipt" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="代收款" label-width="82px">
                    <el-input v-model="form.fCollect" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="基本运费" label-width="82px">
                    <el-input v-model="form.freight" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="现付" label-width="82px">
                    <el-input v-model="form.fCash" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="月结" label-width="82px">
                    <el-input v-model="form.fMonth" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="提付" label-width="82px">
                    <el-input v-model="form.fDeliver" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="欠付" label-width="82px">
                    <el-input v-model="form.fDeduct" class="num-input" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="回扣" label-width="82px">
                    <el-input v-model="form.fReturn" class="num-input" />
                  </el-form-item>
                </div>
              </div>
            </div>

            <!-- 中栏：应付费用 -->
            <div class="order-editor-pay">
              <h3>应付费用</h3>
              <div class="draggable_children fee-grid-2col">
                <div class="colItem">
                  <el-form-item label="送货费" label-width="82px">
                    <el-input v-model="form.fDelivery" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="接货费" label-width="82px">
                    <el-input v-model="form.fReceive" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="装货费" label-width="82px">
                    <el-input v-model="form.loadFee" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="卸货费" label-width="82px">
                    <el-input v-model="form.unloadFee" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="包装费" label-width="82px">
                    <el-input v-model="form.packFee" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="上楼费" label-width="82px">
                    <el-input v-model="form.upStairFee" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="信息费" label-width="82px">
                    <el-input v-model="form.infoFee" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItem">
                  <el-form-item label="手续费" label-width="82px">
                    <el-input v-model="form.fcService" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
              </div>
            </div>

            <!-- 右栏：合计运费 -->
            <div class="order-editor-collect">
              <h3>
                合计运费:
                <span style="color: #ff0000; font-size: 16px; margin: 0 2px;">{{ totalFreight }}</span>元
              </h3>
              <div class="collect-items">
                <div class="colItemFull">
                  <el-form-item label="付款方式" label-width="82px">
                    <el-select v-model="form.payType" placeholder="请选择" @change="handlePaymentMethodChange">
                      <el-option label="现付" value="现付" />
                      <el-option label="到付" value="到付" />
                      <el-option label="回单付" value="回单付" />
                      <el-option label="月结" value="月结" />
                      <el-option label="欠付" value="欠付" />
                      <el-option label="多笔付" value="多笔付" />
                    </el-select>
                  </el-form-item>
                </div>
                <div class="colItemFull">
                  <el-form-item label="其他费" label-width="82px">
                    <el-input v-model="form.fAdvance" class="num-input" @input="recalcTotalFreight" />
                  </el-form-item>
                </div>
                <div class="colItemFull">
                  <el-form-item label="实收运费" label-width="82px">
                    <el-input v-model="form.actualFreight" class="num-input" />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. 附加信息与备注 .order-editor-extra -->
          <div class="order-editor-extra">
            <el-form-item label="录单员" label-width="78px">
              <el-select v-model="form.creator" filterable allow-create>
                <el-option label="aadmin" value="aadmin" />
                <el-option label="王芳" value="王芳" />
                <el-option label="赵敏" value="赵敏" />
                <el-option label="陈静" value="陈静" />
              </el-select>
            </el-form-item>

            <el-form-item label="交货方式" label-width="82px" class="is-required">
              <el-select v-model="form.deliveryType" placeholder="请选择">
                <el-option label="自提" value="自提" />
                <el-option label="送货" value="送货" />
                <el-option label="送货上楼" value="送货上楼" />
                <el-option label="送货卸货" value="送货卸货" />
              </el-select>
            </el-form-item>

            <el-form-item label="回单要求" label-width="82px" class="receipt_input">
              <el-checkbox v-model="form.isReceipt" />
              <el-select v-model="form.receiptRequirement" placeholder="" clearable style="flex: 1;">
                <el-option label="签回单" value="签回单" />
                <el-option label="原单返回" value="原单返回" />
                <el-option label="传真返回" value="传真返回" />
                <el-option label="电子回单" value="电子回单" />
              </el-select>
              <el-input v-model="form.receiptNum" style="width: 44px; text-align: center;" />
              <span style="font-size: 12px; color: #606266; margin-left: 2px;">份</span>
            </el-form-item>

            <el-form-item label="等通知放货" label-width="92px">
              <el-checkbox v-model="form.isWaitPass" />
            </el-form-item>

            <el-form-item label="运输方式" label-width="82px">
              <el-select v-model="form.shippingType" placeholder="">
                <el-option label="普通汽运" value="普通汽运" />
                <el-option label="专线快运" value="专线快运" />
                <el-option label="整车直达" value="整车直达" />
                <el-option label="零担拼车" value="零担拼车" />
              </el-select>
            </el-form-item>

            <el-form-item label="业务员" label-width="72px">
              <el-select v-model="form.salesMan" filterable allow-create clearable placeholder="请选择">
                <el-option label="陈静" value="陈静" />
                <el-option label="张经理" value="张经理" />
                <el-option label="刘洋" value="刘洋" />
              </el-select>
            </el-form-item>

            <!-- 底部备注行 .last-row -->
            <div class="last-row" style="width: 100%;">
              <el-form-item label="备注" label-width="78px" style="width: 100%; border-right: none;">
                <el-select
                  v-model="form.remark"
                  filterable
                  allow-create
                  default-first-option
                  clearable
                  placeholder=""
                  style="width: 100%;"
                >
                  <el-option
                    v-for="r in remarkSuggestions"
                    :key="r"
                    :label="r"
                    :value="r"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>

        <!-- 底部保存按钮栏 -->
        <el-row
          v-if="!isReadOnly"
          type="flex"
          justify="center"
          align="middle"
          class="footer-row"
        >
          <el-button type="primary" size="default" style="padding: 8px 26px; font-size: 14px;" @click="handleSave">
            保 存
          </el-button>
        </el-row>
      </el-form>
    </div>

    <!-- 历史订单记录弹窗 -->
    <el-dialog
      v-model="historyDialogVisible"
      title="历史订单记录（点击行快速带入收发货人信息）"
      width="820px"
      append-to-body
    >
      <el-table
        :data="orderStore.orders"
        border
        stripe
        size="small"
        max-height="360"
        style="cursor: pointer;"
        @row-click="applyHistoryOrder"
      >
        <el-table-column prop="orderNo" label="订单号" width="145" />
        <el-table-column prop="destCity" label="到站城市" width="90" />
        <el-table-column prop="shipUnit" label="发货单位" width="130" show-overflow-tooltip />
        <el-table-column prop="shipper" label="发货人" width="80" />
        <el-table-column prop="shipPhone" label="发货人号码" width="110" />
        <el-table-column prop="receiveUnit" label="收货单位" width="130" show-overflow-tooltip />
        <el-table-column prop="receiver" label="收货人" width="80" />
        <el-table-column prop="receivePhone" label="收货人号码" width="110" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Setting, Plus, Minus } from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'
import { useTagsStore } from '@/store/tags'
import {
  CUSTOMER_SHIPPER_ARCHIVES,
  CUSTOMER_RECEIVER_ARCHIVES
} from '@/mock/orderData'
import CustomerAutoComplete from '@/views/operation/components/CustomerAutoComplete.vue'

const route = useRoute()
const router = useRouter()
const orderStore = useOrderStore()
const tagsStore = useTagsStore()

// 判断当前页面模式：创建订单 / 修改订单 / 订单详情
const pageMode = computed<'create' | 'edit' | 'detail'>(() => {
  if (route.path.includes('/orderDetail')) return 'detail'
  if (route.path.includes('/editOrder')) return 'edit'
  return 'create'
})

const isReadOnly = computed(() => pageMode.value === 'detail')

const pageTitle = computed(() => {
  if (pageMode.value === 'detail') return '订单详情'
  if (pageMode.value === 'edit') return '修改订单'
  return '创建订单'
})

const departureCities = ['北京市', '广州市', '深圳市', '佛山市', '中山市', '东莞市']
const arrivalCities = ['长沙市', '武汉市', '成都市', '杭州市', '上海市', '北京市', '太原市']

const terminalNetworkOptions = [
  '总部',
  '长沙高桥分拨',
  '武汉东西湖分拨',
  '成都新都分拨',
  '杭州传化分拨',
  '上海青浦分拨',
  '北京大兴分拨'
]

const goodsNameOptions = ['配件', '设备', '建材', '服装', '电子产品', '日用品', '食品', '化工原料']
const packOptions = ['纸箱', '木架', '托盘', '编织袋', '裸装', '桶装', '纤袋']
const remarkSuggestions = [
  '轻拿轻放，注意防潮',
  '加急件，请优先配载',
  '等通知放货，勿擅自派送',
  '需客户本人签收并盖章'
]

interface GoodsRowItem {
  goodsName: string
  pack: string
  numbers: number | string
  freight: number | string
  weight: number | string
  volume: number | string
  declaredValue: number | string
}

const goodsRows = ref<GoodsRowItem[]>([
  {
    goodsName: '',
    pack: '',
    numbers: '',
    freight: '',
    weight: '',
    volume: '',
    declaredValue: ''
  }
])

function formatNow(): string {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

const form = reactive({
  id: '',
  orderNo: '',
  shippingDate: formatNow(),
  startCity: '北京市',
  destCity: '',
  destGroup: '',
  goodsNo: '',
  shipUnit: '',
  shipper: '',
  shipPhone: '',
  shipAddress: '',
  receiveUnit: '',
  receiver: '',
  receivePhone: '',
  receiveAddress: '',
  // 应收费用
  fReceipt: '' as number | string,
  fCollect: '' as number | string,
  freight: '' as number | string,
  fCash: '' as number | string,
  fMonth: '' as number | string,
  fDeliver: '' as number | string,
  fDeduct: '' as number | string,
  fReturn: '' as number | string,
  // 应付费用
  fDelivery: '' as number | string,
  fReceive: '' as number | string,
  loadFee: '' as number | string,
  unloadFee: '' as number | string,
  packFee: '' as number | string,
  upStairFee: '' as number | string,
  infoFee: '' as number | string,
  fcService: '' as number | string,
  // 合计栏
  payType: '现付',
  fAdvance: '' as number | string,
  actualFreight: '' as number | string,
  // 底部附加栏
  creator: 'aadmin',
  deliveryType: '自提',
  isReceipt: false,
  receiptRequirement: '',
  receiptNum: '' as number | string,
  isWaitPass: false,
  shippingType: '普通汽运',
  salesMan: '',
  remark: ''
})

const totalFreight = computed(() => {
  const sum =
    (Number(form.freight) || 0) +
    (Number(form.fDelivery) || 0) +
    (Number(form.fReceive) || 0) +
    (Number(form.loadFee) || 0) +
    (Number(form.unloadFee) || 0) +
    (Number(form.packFee) || 0) +
    (Number(form.upStairFee) || 0) +
    (Number(form.infoFee) || 0) +
    (Number(form.fcService) || 0) +
    (Number(form.fAdvance) || 0)
  return sum
})

const filteredShipperArchives = computed(() => {
  const kw = String(form.shipUnit || '').trim()
  if (!kw) return CUSTOMER_SHIPPER_ARCHIVES
  return CUSTOMER_SHIPPER_ARCHIVES.filter(
    item => item.unit.includes(kw) || item.name.includes(kw) || item.phone.includes(kw)
  )
})

const filteredReceiverArchives = computed(() => {
  const kw = String(form.receiveUnit || '').trim()
  if (!kw) return CUSTOMER_RECEIVER_ARCHIVES
  return CUSTOMER_RECEIVER_ARCHIVES.filter(
    item => item.unit.includes(kw) || item.name.includes(kw) || item.phone.includes(kw)
  )
})

function selectShipperArchive(row: typeof CUSTOMER_SHIPPER_ARCHIVES[0]) {
  form.shipUnit = row.unit
  form.shipper = row.name
  form.shipPhone = row.phone
  form.shipAddress = row.address
}

function selectReceiverArchive(row: typeof CUSTOMER_RECEIVER_ARCHIVES[0]) {
  form.receiveUnit = row.unit
  form.receiver = row.name
  form.receivePhone = row.phone
  form.receiveAddress = row.address
  if (row.city && !form.destCity) {
    form.destCity = row.city
    handleArrivalCityChange(row.city)
  }
}

function handleArrivalCityChange(city: string) {
  if (!form.destGroup) {
    const clean = city.replace('市', '')
    const matched = terminalNetworkOptions.find(n => n.includes(clean))
    form.destGroup = matched || '总部'
  }
}

function addGoodsRow() {
  if (goodsRows.value.length >= 3) return
  goodsRows.value.push({
    goodsName: '',
    pack: '',
    numbers: '',
    freight: '',
    weight: '',
    volume: '',
    declaredValue: ''
  })
}

function removeGoodsRow(index: number) {
  if (goodsRows.value.length <= 1) return
  goodsRows.value.splice(index, 1)
  recalcGoodsTotals()
  syncGoodsFreightToBase()
}

function recalcGoodsTotals() {
  const totalNums = goodsRows.value.reduce((s, r) => s + (Number(r.numbers) || 0), 0)
  if (totalNums > 0) {
    form.goodsNo = `${(form.orderNo || 'DD').slice(-4)}-${totalNums}`
  }
}

function syncGoodsFreightToBase() {
  const sumFreight = goodsRows.value.reduce((s, r) => s + (Number(r.freight) || 0), 0)
  form.freight = sumFreight > 0 ? sumFreight : ''
  recalcTotalFreight()
}

function recalcTotalFreight() {
  const tf = totalFreight.value
  form.actualFreight = tf > 0 ? tf : ''
  applyPaymentDistribution(tf)
}

function handlePaymentMethodChange() {
  applyPaymentDistribution(totalFreight.value)
}

function applyPaymentDistribution(tf: number) {
  if (form.payType === '多笔付') return
  form.fCash = ''
  form.fDeliver = ''
  form.fReceipt = ''
  form.fMonth = ''
  form.fDeduct = ''
  if (tf <= 0) return
  if (form.payType === '现付') form.fCash = tf
  else if (form.payType === '到付') form.fDeliver = tf
  else if (form.payType === '回单付') form.fReceipt = tf
  else if (form.payType === '月结') form.fMonth = tf
  else if (form.payType === '欠付') form.fDeduct = tf
}

// 智能地址解析
const shipperSmartText = ref('')
const receiverSmartText = ref('')

function parseSmartAddress(target: 'shipper' | 'receiver') {
  const raw = (target === 'shipper' ? shipperSmartText.value : receiverSmartText.value).trim()
  if (!raw) {
    ElMessage.warning('请先输入或粘贴需要解析的文本')
    return
  }
  const phoneMatch = raw.match(/(1[3-9]\d{9}|\d{3,4}-\d{7,8})/)
  const phone = phoneMatch ? phoneMatch[0] : ''
  const remain = raw.replace(phone, ' ').trim()
  const parts = remain.split(/[\s,，;；]+/).filter(Boolean)

  if (target === 'shipper') {
    if (phone) form.shipPhone = phone
    if (parts.length >= 3) {
      form.shipUnit = parts[0]
      form.shipper = parts[1]
      form.shipAddress = parts.slice(2).join('')
    } else if (parts.length === 2) {
      form.shipper = parts[0]
      form.shipAddress = parts[1]
    } else if (parts.length === 1) {
      form.shipAddress = parts[0]
    }
    ElMessage.success('发货方信息智能解析完成')
  } else {
    if (phone) form.receivePhone = phone
    if (parts.length >= 3) {
      form.receiveUnit = parts[0]
      form.receiver = parts[1]
      form.receiveAddress = parts.slice(2).join('')
    } else if (parts.length === 2) {
      form.receiver = parts[0]
      form.receiveAddress = parts[1]
    } else if (parts.length === 1) {
      form.receiveAddress = parts[0]
    }
    ElMessage.success('收货方信息智能解析完成')
  }
}

// 历史订单记录弹窗
const historyDialogVisible = ref(false)
const historyTarget = ref<'shipper' | 'receiver'>('shipper')

function openHistoryOrderDialog(target: 'shipper' | 'receiver') {
  historyTarget.value = target
  historyDialogVisible.value = true
}

function applyHistoryOrder(row: any) {
  if (historyTarget.value === 'shipper') {
    form.shipUnit = row.shipUnit || ''
    form.shipper = row.shipper || ''
    form.shipPhone = row.shipPhone || ''
    form.shipAddress = row.shipAddress || ''
  } else {
    form.receiveUnit = row.receiveUnit || ''
    form.receiver = row.receiver || ''
    form.receivePhone = row.receivePhone || ''
    form.receiveAddress = row.receiveAddress || ''
    if (row.destCity) {
      form.destCity = row.destCity
    }
    if (row.destGroup) {
      form.destGroup = row.destGroup
    }
  }
  historyDialogVisible.value = false
  ElMessage.success('已带入历史客户信息')
}

// 加载已有订单数据（修改/详情模式）
function loadOrderData() {
  const orderId = (route.params.id as string) || (route.query.id as string)
  if (pageMode.value === 'create' || !orderId) {
    form.id = ''
    form.orderNo = orderStore.generateNewOrderNo()
    form.shippingDate = formatNow()
    return
  }

  const found = orderStore.getOrderById(orderId)
  if (!found) {
    ElMessage.warning('未找到对应订单数据')
    return
  }

  form.id = found.id
  form.orderNo = found.orderNo
  form.shippingDate = found.shippingDate || found.createTime
  form.startCity = found.sendAreaName || '北京市'
  form.destCity = found.destCity || ''
  form.destGroup = found.destGroup || '总部'
  form.goodsNo = found.goodsNo || ''
  form.shipUnit = found.shipUnit || ''
  form.shipper = found.shipper || ''
  form.shipPhone = found.shipPhone || ''
  form.shipAddress = found.shipAddress || ''
  form.receiveUnit = found.receiveUnit || ''
  form.receiver = found.receiver || ''
  form.receivePhone = found.receivePhone || ''
  form.receiveAddress = found.receiveAddress || ''

  form.fReceipt = found.fReceipt || ''
  form.fCollect = found.fCollect || ''
  form.freight = found.freight || ''
  form.fCash = found.fCash || ''
  form.fMonth = found.fMonth || ''
  form.fDeliver = found.fDeliver || ''
  form.fDeduct = found.fDeduct || ''
  form.fReturn = found.fReturn || ''

  form.fDelivery = found.fDelivery || ''
  form.fReceive = found.fReceive || ''
  form.fcService = found.fcService || ''

  form.payType = found.payType || '现付'
  form.fAdvance = found.fAdvance || ''
  form.actualFreight = found.fTotal || ''

  form.creator = found.creator || 'aadmin'
  form.deliveryType = found.deliveryType || '自提'
  form.isReceipt = Number(found.receiptNum) > 0 || Boolean(found.receiptRequirement)
  form.receiptRequirement = found.receiptRequirement || ''
  form.receiptNum = found.receiptNum || ''
  form.isWaitPass = Boolean(found.isWaitPass)
  form.shippingType = found.shippingType || '普通汽运'
  form.salesMan = found.salesMan || ''
  form.remark = found.remark || ''

  goodsRows.value = [
    {
      goodsName: found.goodsName || '',
      pack: found.pack || '',
      numbers: found.number || '',
      freight: found.freight || '',
      weight: found.weight || '',
      volume: found.volume || '',
      declaredValue: found.worth || ''
    }
  ]
}

onMounted(() => {
  loadOrderData()
})

watch(() => route.fullPath, () => {
  loadOrderData()
})

function handleSave() {
  if (!form.orderNo.trim()) {
    ElMessage.error('请输入订单号')
    return
  }
  if (!form.destCity.trim()) {
    ElMessage.error('请选择到站城市')
    return
  }
  if (!form.destGroup) {
    ElMessage.error('请选择终端网点')
    return
  }
  if (!form.shipper.trim() || !form.shipPhone.trim()) {
    ElMessage.error('请完善发货人及发货人号码')
    return
  }
  if (!form.receiver.trim() || !form.receivePhone.trim() || !form.receiveAddress.trim()) {
    ElMessage.error('请完善收货人、收货人号码及收货地址')
    return
  }

  const combinedGoodsName = goodsRows.value.map(r => r.goodsName).filter(Boolean).join('/') || '普货'
  const combinedPack = goodsRows.value.map(r => r.pack).filter(Boolean).join('/') || '纸箱'
  const totalNumbers = goodsRows.value.reduce((s, r) => s + (Number(r.numbers) || 0), 0) || 1
  const totalWeight = goodsRows.value.reduce((s, r) => s + (Number(r.weight) || 0), 0)
  const totalVolume = goodsRows.value.reduce((s, r) => s + (Number(r.volume) || 0), 0)
  const totalDeclared = goodsRows.value.reduce((s, r) => s + (Number(r.declaredValue) || 0), 0)

  const payload = {
    orderNo: form.orderNo,
    goodsNo: form.goodsNo || `${form.orderNo.slice(-4)}-${totalNumbers}`,
    creationTime: form.shippingDate,
    shippingDate: form.shippingDate,
    sendAreaName: form.startCity,
    destCity: form.destCity,
    startGroup: '广州白云总部',
    openGroup: '广州白云总部',
    destGroup: form.destGroup || '总部',
    deliveryType: form.deliveryType,
    shippingType: form.shippingType,
    payType: form.payType,
    shipUnit: form.shipUnit,
    shipper: form.shipper,
    shipPhone: form.shipPhone,
    shipAddress: form.shipAddress,
    receiveUnit: form.receiveUnit,
    receiver: form.receiver,
    receivePhone: form.receivePhone,
    receiveAddress: form.receiveAddress,
    goodsName: combinedGoodsName,
    pack: combinedPack,
    number: totalNumbers,
    weight: totalWeight,
    volume: totalVolume,
    worth: totalDeclared,
    fTotal: totalFreight.value,
    freight: Number(form.freight) || 0,
    fDelivery: Number(form.fDelivery) || 0,
    fReceive: Number(form.fReceive) || 0,
    fcService: Number(form.fcService) || 0,
    fAdvance: Number(form.fAdvance) || 0,
    fCash: Number(form.fCash) || 0,
    fDeliver: Number(form.fDeliver) || 0,
    fReceipt: Number(form.fReceipt) || 0,
    fMonth: Number(form.fMonth) || 0,
    fDeduct: Number(form.fDeduct) || 0,
    fCollect: Number(form.fCollect) || 0,
    fReturn: Number(form.fReturn) || 0,
    receiptRequirement: form.receiptRequirement,
    receiptNum: Number(form.receiptNum) || 0,
    isWaitPass: form.isWaitPass,
    salesMan: form.salesMan,
    creator: form.creator,
    remark: form.remark,
    source: route.query.from === 'prevorder' ? 5 : 1
  }

  if (pageMode.value === 'edit' && form.id) {
    orderStore.updateOrder(form.id, payload)
    ElMessage.success('修改订单成功')
  } else {
    orderStore.addOrder(payload)
    ElMessage.success('创建订单成功')
  }

  // 关闭当前标签并返回列表页
  const currentPath = route.path
  const targetBack = route.query.from === 'orderlist' ? '/operation/order/orderlist' : '/prevorder'
  tagsStore.removeTag(currentPath)
  router.push(targetBack)
}
</script>

<style scoped>
/* 100% 复刻线上 index.a3b087c5.css (data-v-cda3ba64) */
.orderUiBox {
  height: 100%;
  background: #f0f2f5;
  overflow-y: auto;
}

.orderUiBox .ship-content {
  background: #fff;
  padding: 10px 12px;
  min-height: 100%;
}

.orderUiBox .ship-content .header {
  font-size: 20px;
  color: #333;
  letter-spacing: 10px;
  margin-bottom: -5px;
  position: relative;
}

.orderUiBox .ship-content .header .title {
  width: 216px;
  font-size: 24px;
  text-align: center;
  display: inline-block;
  padding: 0 15px;
}

.orderUiBox .ship-content .header .title::after {
  content: "";
  display: block;
  height: 4px;
  margin-top: 6px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
}

/* 输入框 & 下拉框无外框，底部细横线 + 聚焦橙色底边与浅黄背景 */
.orderUiBox :deep(.el-input__wrapper),
.orderUiBox :deep(.el-select__wrapper) {
  background-color: transparent;
  box-shadow: inset 0 -1px #e5e5e5 !important;
  border-radius: 0 !important;
  padding: 0 5px;
  min-height: 26px;
}

.orderUiBox :deep(.el-input__wrapper:hover),
.orderUiBox :deep(.el-select__wrapper:hover) {
  box-shadow: inset 0 -1px #e5e5e5 !important;
}

.orderUiBox :deep(.el-input__wrapper.is-focus),
.orderUiBox :deep(.el-select__wrapper.is-focused) {
  background-color: #fff9db !important;
  box-shadow: inset 0 -2px #fb720e !important;
}

.orderUiBox :deep(.el-input__inner) {
  font-size: 14px;
  color: #333;
  height: 26px;
  line-height: 26px;
}

.orderUiBox :deep(.input-center .el-input__inner),
.orderUiBox :deep(.input-center .el-select__placeholder) {
  text-align: center !important;
}

/* 必填项红色标签 */
.formBody :deep(.is-required > .el-form-item__label) {
  color: red !important;
}

.formBody :deep(.is-required > .el-form-item__label::before) {
  content: "*";
  color: red;
  margin-right: 2px;
}

.orderUiBox :deep(.el-form-item) {
  margin-bottom: 0 !important;
  margin-right: 0 !important;
  display: flex;
  align-items: center;
}

.orderUiBox :deep(.el-form-item__label) {
  padding-right: 5px;
  font-size: 13px;
  color: #606266;
  line-height: 28px;
}

.orderUiBox :deep(.el-form-item__content) {
  flex: 1;
  display: flex;
  align-items: center;
}

.orderUiBox :deep(.el-form-item__content > .el-select),
.orderUiBox :deep(.el-form-item__content > .el-input) {
  width: 100%;
}

/* 蓝色主边框容器 */
.orderUiBox .ship-content .el-form-box {
  border: 1px solid #78aadd;
}

/* 1. 线路与站点行 */
.orderUiBox .order-editor-traffic {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #78aadd;
}

.orderUiBox .order-editor-traffic .el-form-item {
  flex: 1 0 188px;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 10px 0 0 !important;
  border-right: 1px solid #78aadd;
}

.orderUiBox .order-editor-traffic .el-form-item:last-child {
  border-right: none;
}

/* 2. 收发货方区块 */
.orderUiBox .order-editor-person {
  border-bottom: 1px solid #78aadd;
}

.orderUiBox .order-editor-person .el-form-item-box {
  display: flex;
  flex: 1 1 50%;
  border-right: 1px solid #78aadd;
}

.orderUiBox .order-editor-person .el-form-item-box:last-child {
  border-right: none;
}

.orderUiBox .order-editor-person .left {
  display: flex;
  flex-direction: column;
  flex: 0 0 90px;
  border-right: 1px solid #78aadd;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 15px 0;
  color: #909090;
}

.person-Quick-icons {
  position: absolute;
  right: 4px;
  bottom: 3px;
  display: flex;
  gap: 5px;
  font-size: 14px;
  color: #606266;
}

.person-Quick-icons .el-icon {
  cursor: pointer;
}

.person-Quick-icons .el-icon:hover {
  color: #409eff;
}

.person-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6px 16px 6px 0;
}

/* 3. 货物明细表格（原生表格 100% 复刻 #409EFF 表头） */
.goods-native-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.goods-native-table th {
  background: #409eff;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-right: 1px solid #78aadd;
  border-bottom: 1px solid #78aadd;
}

.goods-native-table th:last-child {
  border-right: none;
}

.goods-native-table td {
  height: 34px;
  padding: 2px 6px;
  border-right: 1px solid #78aadd;
  border-bottom: 1px solid #78aadd;
}

.goods-native-table tr:last-child td {
  border-bottom: none;
}

.goods-native-table td:last-child {
  border-right: none;
}

/* 4. 费用结算三栏区 */
.orderUiBox .order-editor-fee {
  display: flex;
  align-items: stretch;
  border-top: 1px solid #78aadd;
  border-bottom: 1px solid #78aadd;
}

.orderUiBox .order-editor-fee > div {
  border-right: 1px solid #78aadd;
}

.orderUiBox .order-editor-fee > div:last-child {
  border-right: none;
}

.orderUiBox .order-editor-fee > div h3 {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  background: #cae0f6;
  border-bottom: 1px solid #78aadd;
  margin: 0;
  padding: 0 10px;
}

.orderUiBox .order-editor-fee .order-editor-freight {
  flex: 1 55%;
}

.orderUiBox .order-editor-fee .order-editor-pay {
  flex: 1 45%;
}

.orderUiBox .order-editor-fee .order-editor-collect {
  flex: 1 20%;
}

.fee-grid-2col {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 2px 8px 4px 0;
}

.fee-grid-2col > .colItem {
  width: 50%;
  display: flex;
  align-items: center;
  height: 34px;
  padding-right: 8px;
}

.collect-items {
  padding: 2px 10px 4px 0;
}

.collect-items > .colItemFull {
  width: 100%;
  display: flex;
  align-items: center;
  height: 34px;
}

/* 5. 底部附加栏 */
.orderUiBox .order-editor-extra {
  display: flex;
  flex-wrap: wrap;
}

.orderUiBox .order-editor-extra > .el-form-item {
  width: 16.666667%;
  display: flex;
  align-items: center;
  height: 38px;
  padding: 0 12px 0 0;
  border-right: 1px solid #78aadd;
  border-bottom: 1px solid #78aadd;
  font-size: 14px;
}

.orderUiBox .order-editor-extra > .el-form-item:nth-child(6) {
  border-right: none;
}

.orderUiBox .receipt_input :deep(.el-form-item__content) {
  flex-wrap: nowrap;
  gap: 4px;
}

.orderUiBox .receipt_input :deep(.el-form-item__content > div) {
  width: auto;
}

.orderUiBox .last-row {
  display: flex;
  height: 38px;
  align-items: center;
  padding-right: 12px;
}

.orderUiBox .footer-row {
  height: 76px;
}

/* 详情只读模式：文字显示为蓝色 #409eff */
.formBody.detail-readonly :deep(.el-input.is-disabled .el-input__wrapper),
.formBody.detail-readonly :deep(.el-select__wrapper.is-disabled) {
  background: #fff !important;
  box-shadow: inset 0 -1px #e5e5e5 !important;
}

.formBody.detail-readonly :deep(.el-input.is-disabled .el-input__inner),
.formBody.detail-readonly :deep(.el-select__wrapper.is-disabled .el-select__selected-item) {
  color: #409eff !important;
  -webkit-text-fill-color: #409eff !important;
}
</style>
