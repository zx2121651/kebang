<template>
  <div class="ship-order-page">
    <div class="ship-order-card">
      <!-- 顶部标题栏：货 物 托 运 单 + 引入订单 -->
      <div class="order-title-bar">
        <div class="title-center-group">
          <span class="main-title">货 物 托 运 单</span>
          <el-tag v-if="pageMode === 'fill'" size="small" type="warning" style="margin-left: 8px">
            手动补单
          </el-tag>
          <el-tag v-else-if="pageMode === 'edit'" size="small" type="success" style="margin-left: 8px">
            修改运单
          </el-tag>
          <el-tag v-else-if="pageMode === 'copy'" size="small" type="info" style="margin-left: 8px">
            复制运单
          </el-tag>
        </div>
      </div>

      <div class="import-order-row">
        <el-button
          type="primary"
          link
          class="import-order-btn"
          @click="importOrderVisible = true"
        >
          引入订单
        </el-button>
      </div>

      <!-- 运单号 + 托运日期 行 -->
      <div class="meta-top-row">
        <div class="meta-left">
          <span class="req-star">*</span>
          <span class="meta-label red-lbl">运单号</span>
          <input
            v-model="form.orderNo"
            type="text"
            class="underline-input width-160"
            placeholder="请输入运单号"
          />
        </div>
        <div class="meta-right">
          <span class="req-star">*</span>
          <span class="meta-label red-lbl">托运日期</span>
          <el-date-picker
            v-model="form.shippingDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            size="small"
            class="meta-date-picker"
          />
        </div>
      </div>

      <!-- 主体蓝框表单 (.el-form-box 1:1) -->
      <div class="el-form-box">
        <!-- 1. 线路与网点行 (.order-editor-traffic) -->
        <div class="order-editor-traffic">
          <div class="traffic-cell">
            <span class="cell-label">始发地</span>
            <el-select v-model="form.startGroup" filterable size="small" class="cell-select">
              <el-option label="总部" value="总部" />
              <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
            </el-select>
          </div>

          <div class="traffic-cell">
            <span class="cell-label red-lbl"><i class="req">*</i>到站城市</span>
            <el-select
              v-model="form.destCity"
              filterable
              allow-create
              :filter-method="filterCityMethod"
              size="small"
              class="cell-select"
              placeholder="城市/拼音(如hy)"
              @change="handleDestCityChange"
            >
              <el-option
                v-for="c in filteredCities"
                :key="c.code"
                :label="c.name"
                :value="c.name"
              >
                <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px">
                  <span><b>{{ c.name }}</b> <em style="color:#909399;font-style:normal">({{ c.pinyin.toUpperCase() }})</em></span>
                  <span style="color:#409eff">{{ c.matchedBranch }}</span>
                </div>
              </el-option>
            </el-select>
          </div>

          <div class="traffic-cell">
            <span class="cell-label red-lbl"><i class="req">*</i>运输路线</span>
            <el-select v-model="form.shippingRouteStr" size="small" class="cell-select">
              <el-option label="专线直达" value="专线直达" />
              <el-option label="本地外发" value="本地外发" />
              <el-option label="广州-长沙专线" value="广州-长沙专线" />
              <el-option label="广州-衡阳专线" value="广州-衡阳专线" />
              <el-option label="广州-武汉专线" value="广州-武汉专线" />
            </el-select>
          </div>

          <template v-if="form.shippingRouteStr === '本地外发'">
            <div class="traffic-cell">
              <span class="cell-label red-lbl"><i class="req">*</i>承运单位</span>
              <CarrierPopoverInput
                v-model="form.carrierName"
                placeholder="承运商/拼音联想"
                @select="onSelectCarrier"
              />
            </div>
          </template>
          <template v-else>
            <div class="traffic-cell">
              <span class="cell-label red-lbl"><i class="req">*</i>终端网点</span>
              <el-select v-model="form.destGroup" filterable size="small" class="cell-select">
                <el-option label="衡阳营业部" value="衡阳营业部" />
                <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
              </el-select>
            </div>
          </template>

          <div class="traffic-cell">
            <span class="cell-label">货号</span>
            <input v-model="form.goodsNo" type="text" class="cell-input blue-val" placeholder="0-1" />
          </div>
        </div>

        <!-- 2. 收发货方双栏行 (.order-editor-person 1:1 2-col per side) -->
        <div class="order-editor-person">
          <!-- 左侧：发货方 -->
          <div class="person-half">
            <div class="person-side-title">
              <span>发货方</span>
            </div>
            <div class="person-grid-2">
              <div class="p-cell">
                <span class="cell-label"><i v-if="isReq('shipperName')" class="req">*</i>发货方</span>
                <CustomerAutoComplete
                  v-model="form.shipper"
                  type="shipper"
                  placeholder="请输入"
                  @select="onSelectShipper"
                  @select-history="onSelectHistoryWaybill"
                />
              </div>
              <div class="p-cell">
                <span class="cell-label"><i v-if="isReq('shipperMobile')" class="req">*</i>发货手机</span>
                <input v-model="form.shipPhone" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">发货座机</span>
                <input v-model="form.shipTel" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">发货单位</span>
                <input v-model="form.shipUnit" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div v-if="archiveStore.uiLayoutConfig.showIdCardField" class="p-cell">
                <span class="cell-label">发货证件</span>
                <input v-model="form.shipIdCard" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">发货区域</span>
                <RegionCascaderInput v-model="form.shipAreas" placeholder="请选择地址" />
              </div>
              <div class="p-cell span-2">
                <span class="cell-label">发货地址</span>
                <el-autocomplete
                  v-model="form.shipAddress"
                  :fetch-suggestions="queryShipperAddressSuggest"
                  placeholder="请输入"
                  class="flat-autocomplete"
                />
              </div>
            </div>
          </div>

          <!-- 右侧：收货方 -->
          <div class="person-half no-right-border">
            <div class="person-side-title">
              <span>收货方</span>
            </div>
            <div class="person-grid-2">
              <div class="p-cell">
                <span class="cell-label"><i v-if="isReq('receiverName')" class="req">*</i>收货方</span>
                <CustomerAutoComplete
                  v-model="form.receiver"
                  type="receiver"
                  :dest-city="form.destCity"
                  placeholder="请输入"
                  @select="onSelectReceiver"
                  @select-history="onSelectHistoryWaybill"
                />
              </div>
              <div class="p-cell">
                <span class="cell-label"><i v-if="isReq('receiverMobile')" class="req">*</i>收货手机</span>
                <input v-model="form.receivePhone" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">收货座机</span>
                <input v-model="form.receiveTel" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">收货单位</span>
                <input v-model="form.receiveUnit" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div v-if="archiveStore.uiLayoutConfig.showIdCardField" class="p-cell">
                <span class="cell-label">收货证件</span>
                <input v-model="form.receiveIdCard" type="text" class="cell-input" placeholder="请输入" />
              </div>
              <div class="p-cell">
                <span class="cell-label">收货区域</span>
                <RegionCascaderInput v-model="form.receiveAreas" placeholder="请选择地址" />
              </div>
              <div class="p-cell span-2">
                <span class="cell-label">收货地址</span>
                <el-autocomplete
                  v-model="form.receiveAddress"
                  :fetch-suggestions="queryReceiverAddressSuggest"
                  placeholder="请输入"
                  class="flat-autocomplete"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 接货车辆与司机信息行 (.order-editor-driver) -->
        <div class="order-editor-driver">
          <div class="driver-cell">
            <span class="cell-label">车号</span>
            <VehiclePopoverInput
              v-model="form.plateNo"
              placeholder="车牌号"
              @select="onSelectDriverVehicle"
            />
          </div>
          <div class="driver-cell">
            <span class="cell-label">司机</span>
            <input v-model="form.driverName" type="text" class="cell-input" placeholder="司机姓名" />
          </div>
          <div class="driver-cell">
            <span class="cell-label">司机电话</span>
            <input v-model="form.driverPhone" type="text" class="cell-input" placeholder="请填写手机号" />
          </div>
          <div class="driver-cell">
            <span class="cell-label">开户行</span>
            <input v-model="form.bankName" type="text" class="cell-input" placeholder="开户银行" />
          </div>
          <div class="driver-cell">
            <span class="cell-label">开户名</span>
            <input v-model="form.userName" type="text" class="cell-input" placeholder="开户人姓名" />
          </div>
          <div class="driver-cell no-right-border">
            <span class="cell-label">银行卡号</span>
            <input v-model="form.bankCard" type="text" class="cell-input" placeholder="银行卡号" />
          </div>
        </div>

        <!-- 4. 货物明细表格 (.order-editor-goods) -->
        <div class="order-editor-goods">
          <table class="goods-table">
            <thead>
              <tr>
                <th style="width: 56px">操作</th>
                <th class="req-th">品名</th>
                <th>包装</th>
                <th>型号</th>
                <th class="req-th">件数</th>
                <th>运费</th>
                <th>重量(公斤)</th>
                <th>体积(立方)</th>
                <th>声明价值</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(g, idx) in goodsRows" :key="idx">
                <td class="op-td">
                  <span v-if="idx === 0" class="rect-btn add" title="添加货物行" @click="addGoodsRow">+</span>
                  <span v-else class="rect-btn del" title="删除货物行" @click="removeGoodsRow(idx)">-</span>
                </td>
                <td>
                  <el-autocomplete
                    v-model="g.goodsName"
                    :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('goodsName', q))"
                    placeholder="请选择"
                    class="flat-autocomplete center-input"
                  />
                </td>
                <td>
                  <el-autocomplete
                    v-model="g.pack"
                    :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('pack', q))"
                    placeholder="请选择"
                    class="flat-autocomplete center-input"
                  />
                </td>
                <td>
                  <el-autocomplete
                    v-model="g.model"
                    :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('model', q))"
                    placeholder="请选择"
                    class="flat-autocomplete center-input"
                  />
                </td>
                <td>
                  <input
                    v-model.number="g.number"
                    type="number"
                    class="goods-input blue-val"
                    @input="onGoodsQtyChange(g)"
                  />
                </td>
                <td>
                  <input
                    v-model.number="g.freight"
                    type="number"
                    class="goods-input blue-val"
                    @input="syncGoodsSummary"
                  />
                </td>
                <td>
                  <input
                    v-model.number="g.weight"
                    type="number"
                    class="goods-input blue-val"
                    @input="onGoodsQtyChange(g)"
                  />
                </td>
                <td>
                  <input
                    v-model.number="g.volume"
                    type="number"
                    class="goods-input blue-val"
                    @input="onGoodsQtyChange(g)"
                  />
                </td>
                <td>
                  <input
                    v-model.number="g.worth"
                    type="number"
                    class="goods-input blue-val"
                    @input="onGoodsWorthChange"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 5. 费用结算三栏区 (.order-editor-fee) -->
        <div class="order-editor-fee">
          <!-- 左栏：应收费用 -->
          <div class="fee-col">
            <div class="fee-col-header">应收费用</div>
            <div class="fee-grid-3">
              <div class="fee-cell">
                <span class="cell-label">基本运费</span>
                <span class="static-fee-val">{{ form.freight }}元</span>
              </div>
              <div class="fee-cell">
                <span class="cell-label">送货费</span>
                <input v-model.number="form.fDelivery" type="number" class="fee-yellow-input" @input="recalcTotal" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">接货费</span>
                <input v-model.number="form.fReceive" type="number" class="fee-yellow-input" @input="recalcTotal" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">保险费</span>
                <input v-model.number="form.fPremium" type="number" class="fee-yellow-input" @input="recalcTotal" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">代收货款</span>
                <input v-model.number="form.fCollect" type="number" class="fee-yellow-input" @input="onCollectMoneyChange" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">货款手续费</span>
                <input v-model.number="form.fcService" type="number" class="fee-yellow-input" />
              </div>
            </div>
          </div>

          <!-- 中栏：应付费用 -->
          <div class="fee-col">
            <div class="fee-col-header">应付费用</div>
            <div class="fee-grid-3">
              <div class="fee-cell">
                <span class="cell-label">接货成本</span>
                <input v-model.number="form.fDeliveryCost" type="number" class="fee-yellow-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">返款</span>
                <input v-model.number="form.fReturn" type="number" class="fee-yellow-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">垫付</span>
                <input v-model.number="form.fAdvance" type="number" class="fee-yellow-input" />
              </div>
              <div class="fee-cell span-3">
                <span class="cell-label">是否返款</span>
                <el-checkbox v-model="form.isReturn" size="small" />
              </div>
            </div>
          </div>

          <!-- 右栏：合计运费与结算方式 -->
          <div class="fee-col no-right-border">
            <div class="fee-col-header total-red-header">
              合计运费: <span>{{ form.fTotal }}</span>元
            </div>
            <div class="fee-grid-3">
              <div class="fee-cell">
                <span class="cell-label red-lbl"><i class="req">*</i>结算方式</span>
                <el-select
                  v-model="form.payType"
                  size="small"
                  class="cell-select"
                  @change="distributeByPayType"
                >
                  <el-option v-for="p in archiveStore.dictData.payType" :key="p" :label="p" :value="p" />
                </el-select>
              </div>
              <div class="fee-cell">
                <span class="cell-label">现付</span>
                <input v-model.number="form.fCash" type="number" class="fee-gray-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">提付</span>
                <input v-model.number="form.fDeliver" type="number" class="fee-gray-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">回单付</span>
                <input v-model.number="form.fReceipt" type="number" class="fee-gray-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">月结</span>
                <input v-model.number="form.fMonth" type="number" class="fee-gray-input" />
              </div>
              <div class="fee-cell">
                <span class="cell-label">货款扣</span>
                <input v-model.number="form.fDeduct" type="number" class="fee-gray-input" />
              </div>
            </div>
          </div>
        </div>

        <!-- 6. 交货方式与扩展属性行 (.order-editor-extra) -->
        <div class="order-editor-extra">
          <div class="extra-cell">
            <span class="cell-label red-lbl"><i class="req">*</i>交货方式</span>
            <el-select v-model="form.deliveryType" size="small" class="cell-select">
              <el-option label="自提" value="自提" />
              <el-option v-for="d in archiveStore.dictData.deliveryType" :key="d" :label="d" :value="d" />
            </el-select>
          </div>
          <div class="extra-cell">
            <span class="cell-label">运输方式</span>
            <el-select v-model="form.shippingType" size="small" class="cell-select">
              <el-option label="普通汽运" value="普通汽运" />
              <el-option v-for="s in archiveStore.dictData.shippingType" :key="s" :label="s" :value="s" />
            </el-select>
          </div>
          <div class="extra-cell receipt-cell">
            <el-checkbox v-model="form.isReceipt" size="small">回单要求</el-checkbox>
            <el-select
              v-model="form.receiptType"
              size="small"
              placeholder="请选择"
              style="width: 110px; margin-left: 6px"
              :disabled="!form.isReceipt"
            >
              <el-option v-for="r in archiveStore.dictData.receipt" :key="r" :label="r" :value="r" />
            </el-select>
          </div>
          <div class="extra-cell">
            <span class="cell-label">入库单号</span>
            <input v-model="form.thirdNo" type="text" class="cell-input" placeholder="请输入入库单号" />
          </div>
          <div class="extra-cell">
            <span class="cell-label">业务员</span>
            <el-autocomplete
              v-model="form.salesMan"
              :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('salesMan', q))"
              placeholder="请选择"
              class="flat-autocomplete"
            />
          </div>
          <div class="extra-cell check-pair no-right-border">
            <el-checkbox v-model="form.isInvoice" size="small">开票</el-checkbox>
            <el-checkbox v-model="form.isWaitPass" size="small">等通知放货</el-checkbox>
          </div>
        </div>

        <!-- 7. 打印份数勾选与备注行 (.last-row) -->
        <div class="last-row">
          <div class="print-checks">
            <label class="print-item">
              <input v-model="printCfg.waybill" type="checkbox" />
              <span>打印运单</span>
              <input v-model.number="printCfg.waybillCount" type="number" class="mini-num-input" />
            </label>
            <label class="print-item">
              <input v-model="printCfg.manifest" type="checkbox" />
              <span>打印运单清单</span>
              <input v-model.number="printCfg.manifestCount" type="number" class="mini-num-input" />
            </label>
            <label class="print-item">
              <input v-model="printCfg.label" type="checkbox" />
              <span>打印标签</span>
              <input v-model.number="printCfg.labelCount" type="number" class="mini-num-input" />
            </label>
            <label class="print-item">
              <input v-model="printCfg.receipt" type="checkbox" />
              <span>打印回执单</span>
            </label>
            <label class="print-item">
              <input v-model="printCfg.rebate" type="checkbox" />
              <span>打印返款凭证</span>
            </label>
          </div>
          <div class="remark-box">
            <el-autocomplete
              v-model="form.remark"
              :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('remark', q))"
              placeholder="请输入备注"
              class="flat-autocomplete"
            />
          </div>
        </div>
      </div>

      <!-- 底部操作栏 (.footer-row 1:1) -->
      <div class="footer-row">
        <div class="footer-left">
          <el-checkbox v-model="form.onlinePay" class="red-check">在线支付</el-checkbox>
          <el-checkbox v-model="form.onlineInsure" class="red-check">在线投保</el-checkbox>
        </div>

        <div class="footer-center">
          <el-button class="btn-royal-save" @click="handleSave(false)">保存 (F5)</el-button>
          <el-button class="btn-royal-save" @click="handleSave(true)">保存并打印 (F6)</el-button>
        </div>

        <div class="footer-right">
          <el-dropdown trigger="click" @command="openSettingModal">
            <el-button size="small" class="btn-setting-gear" :icon="Setting" title="运单录入设置" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="uiLayout">界面布局设置</el-dropdown-item>
                <el-dropdown-item command="cursorPath">光标路径设置</el-dropdown-item>
                <el-dropdown-item command="requiredFields">必填字段设置</el-dropdown-item>
                <el-dropdown-item command="userBehavior">用户行为设置</el-dropdown-item>
                <el-dropdown-item command="waybillNoRule">运单号规则设置</el-dropdown-item>
                <el-dropdown-item command="goodsNoRule">货号规则设置</el-dropdown-item>
                <el-dropdown-item command="totalFeeRule">合计运费设置</el-dropdown-item>
                <el-dropdown-item command="priceSystem">价格体系设置</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>

    <!-- 弹窗1：引入订单 -->
    <el-dialog v-model="importOrderVisible" title="引入客户订单" width="820px" draggable>
      <div style="margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
        <el-input v-model="orderFilterKw" placeholder="搜索订单号 / 发货方 / 收货方 / 品名" size="small" style="width: 280px" clearable />
        <span style="font-size: 12px; color: #909399;">双击任意行或点击右侧【引入】即可将客户订单转为正式运单</span>
      </div>
      <el-table :data="filteredOrders" size="small" border height="320" @row-dblclick="applyOrderToForm">
        <el-table-column prop="orderNo" label="订单号" width="135" />
        <el-table-column prop="consignorName" label="发货方" width="90" />
        <el-table-column prop="consignorMobile" label="发货手机" width="115" />
        <el-table-column prop="consigneeName" label="收货方" width="90" />
        <el-table-column prop="consigneeMobile" label="收货手机" width="115" />
        <el-table-column prop="endAreaName" label="到站城市" width="90" />
        <el-table-column prop="cargoName" label="品名" min-width="120" />
        <el-table-column prop="num" label="件数" width="65" />
        <el-table-column prop="totalFee" label="合计运费" width="85" />
        <el-table-column label="操作" width="75" align="center" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="applyOrderToForm(row)">
              引入
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 真实8项设置抽屉与弹窗 -->
    <WaybillSettingDrawers ref="settingDrawersRef" />

    <!-- 真实可视化打印预览弹窗 -->
    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Setting } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'
import { useOrderStore } from '@/store/order'
import {
  useArchiveStore,
  type CustomerArchiveItem,
  type VehicleArchiveItem,
  type CarrierArchiveItem
} from '@/store/dictionaryAndArchive'
import CustomerAutoComplete from '@/views/operation/components/CustomerAutoComplete.vue'
import RegionCascaderInput from '@/views/operation/components/RegionCascaderInput.vue'
import VehiclePopoverInput from '@/views/operation/components/VehiclePopoverInput.vue'
import CarrierPopoverInput from '@/views/operation/components/CarrierPopoverInput.vue'
import WaybillSettingDrawers from '@/views/operation/components/WaybillSettingDrawers.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'

const route = useRoute()
const router = useRouter()
const opStore = useOperationStore()
const orderStore = useOrderStore()
const archiveStore = useArchiveStore()

const settingDrawersRef = ref<InstanceType<typeof WaybillSettingDrawers> | null>(null)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

const isReq = (key: string) => archiveStore.requiredFieldKeys.includes(key)

const pageMode = computed(() => {
  if (route.path.includes('fillShip')) return 'fill'
  if (route.path.includes('updateShip')) return 'edit'
  if (route.path.includes('copyShip')) return 'copy'
  return 'add'
})

const form = reactive({
  id: '',
  orderNo: '',
  shippingDate: '2026-10-11 08:29:26',
  startGroup: '总部',
  startCity: '广州市',
  destCity: '衡阳市',
  shippingRouteStr: '专线直达',
  destGroup: '衡阳营业部',
  carrierName: '',
  goodsNo: '0-1',
  shipper: '',
  shipPhone: '',
  shipTel: '',
  shipUnit: '',
  shipIdCard: '',
  shipAreas: '',
  shipAddress: '',
  receiver: '',
  receivePhone: '',
  receiveTel: '',
  receiveUnit: '',
  receiveIdCard: '',
  receiveAreas: '',
  receiveAddress: '',
  plateNo: '',
  driverName: '',
  driverPhone: '',
  bankName: '',
  userName: '',
  bankCard: '',
  freight: 0,
  fDelivery: 0,
  fReceive: 0,
  fPremium: 0,
  fCollect: 0,
  fcService: 0,
  ysOtherOne: 0,
  ysOtherTwo: 0,
  ysOtherThree: 0,
  fDeliveryCost: 0,
  fReturn: 0,
  fAdvance: 0,
  isReturn: false,
  yfOtherOne: 0,
  yfOtherTwo: 0,
  yfOtherThree: 0,
  taxRate: 0,
  taxes: 0,
  fTotal: 0,
  payType: '现付',
  fCash: 0,
  fDeliver: 0,
  fReceipt: 0,
  fMonth: 0,
  fDeduct: 0,
  deliveryType: '自提',
  shippingType: '普通汽运',
  isReceipt: false,
  receiptType: '',
  receiptCount: 1,
  thirdNo: '',
  salesMan: '',
  isInvoice: false,
  isWaitPass: false,
  remark: '',
  onlinePay: false,
  onlineInsure: false
})

const goodsRows = ref([
  {
    goodsName: '',
    pack: '',
    model: '',
    number: 1,
    freight: 0,
    weight: 0,
    volume: 0,
    worth: 0
  }
])

const printCfg = reactive({
  waybill: true,
  waybillCount: 2,
  manifest: false,
  manifestCount: 1,
  label: false,
  labelCount: 1,
  receipt: false,
  rebate: false
})

// 到站城市拼音与汉字过滤联想
const cityKw = ref('')
const filteredCities = computed(() => archiveStore.searchCities(cityKw.value))
function filterCityMethod(val: string) {
  cityKw.value = val
}

function handleDestCityChange(city: string) {
  const matched = archiveStore.cityList.find(c => c.name === city || city.includes(c.name.replace('市', '')))
  if (matched) {
    form.shippingRouteStr = matched.routeType
    form.destGroup = matched.matchedBranch
    if (!form.receiveAreas) {
      const dist = (matched as any).district || (matched as any).defaultDistrict || ''
      form.receiveAreas = `${matched.province}/${matched.name}/${dist}`
    }
    onGoodsQtyChange(goodsRows.value[0])
  }
}

function onSelectCarrier(c: CarrierArchiveItem) {
  form.carrierName = c.name
  form.destGroup = c.name
}

// 发货方 & 收货方自动联想填充
function onSelectShipper(item: CustomerArchiveItem) {
  form.shipper = item.name
  form.shipPhone = item.phone
  form.shipTel = item.tel
  form.shipUnit = item.unit
  form.shipIdCard = item.idCard
  form.shipAreas = [item.province, item.city, item.area].filter(Boolean).join('/')
  form.shipAddress = item.address
  if (item.defaultGoodsName && !goodsRows.value[0].goodsName) {
    goodsRows.value[0].goodsName = item.defaultGoodsName
  }
  if (item.defaultPack && !goodsRows.value[0].pack) {
    goodsRows.value[0].pack = item.defaultPack
  }
}

function onSelectReceiver(item: CustomerArchiveItem) {
  form.receiver = item.name
  form.receivePhone = item.phone
  form.receiveTel = item.tel
  form.receiveUnit = item.unit
  form.receiveIdCard = item.idCard
  form.receiveAreas = [item.province, item.city, item.area].filter(Boolean).join('/')
  form.receiveAddress = item.address
  if (item.city) {
    form.destCity = item.city
    handleDestCityChange(item.city)
  }
}

function onSelectHistoryWaybill(row: any, includeGoods: boolean) {
  form.destCity = row.destCity || form.destCity
  form.destGroup = row.endNetwork || form.destGroup
  form.shipper = row.shipperName || ''
  form.shipPhone = row.shipperMobile || ''
  form.shipTel = row.shipperTel || ''
  form.shipUnit = row.shipperUnit || ''
  form.shipIdCard = row.shipperIdCard || ''
  form.shipAreas = row.shipperRegion || form.shipAreas
  form.shipAddress = row.shipperAddress || ''

  form.receiver = row.receiverName || ''
  form.receivePhone = row.receiverMobile || ''
  form.receiveTel = row.receiverTel || ''
  form.receiveUnit = row.receiverUnit || ''
  form.receiveIdCard = row.receiverIdCard || ''
  form.receiveAreas = row.receiverRegion || form.receiveAreas
  form.receiveAddress = row.receiverAddress || ''

  if (includeGoods) {
    goodsRows.value[0].goodsName = row.goodsName || ''
    goodsRows.value[0].pack = row.pack || '纸箱'
    goodsRows.value[0].number = Number(row.num || 1)
    goodsRows.value[0].weight = Number(row.weight || 0)
    goodsRows.value[0].volume = Number(row.volume || 0)
    goodsRows.value[0].freight = Number(row.baseFee || 0)
    form.payType = row.payType || '现付'
    syncGoodsSummary()
  }
}

function queryShipperAddressSuggest(q: string, cb: (list: { value: string }[]) => void) {
  const list = archiveStore.shipperArchives
    .map(s => ({ value: s.address }))
    .filter(a => !q || a.value.includes(q))
  cb(list)
}

function queryReceiverAddressSuggest(q: string, cb: (list: { value: string }[]) => void) {
  const list = archiveStore.receiverArchives
    .filter(r => !form.destCity || r.city === form.destCity)
    .map(r => ({ value: r.address }))
    .filter(a => !q || a.value.includes(q))
  cb(list)
}

// 车辆联想回填
function onSelectDriverVehicle(v: VehicleArchiveItem) {
  form.plateNo = v.plateNo
  form.driverName = v.driverName
  form.driverPhone = v.driverPhone
  form.bankName = v.bankName
  form.userName = v.userName
  form.bankCard = v.bankCard
}

// 货物明细算费与货号联动
function addGoodsRow() {
  goodsRows.value.push({
    goodsName: '',
    pack: '',
    model: '',
    number: 1,
    freight: 0,
    weight: 0,
    volume: 0,
    worth: 0
  })
  syncGoodsSummary()
}

function removeGoodsRow(idx: number) {
  goodsRows.value.splice(idx, 1)
  syncGoodsSummary()
}

function onGoodsQtyChange(g: any) {
  const totalNum = goodsRows.value.reduce((s, r) => s + (Number(r.number) || 0), 0)
  form.goodsNo = `0-${totalNum}`
  printCfg.labelCount = totalNum || 1

  const autoCalc = archiveStore.userBehaviors.find(b => b.key === 'autoCalcFreightByPrice')?.enabled ?? true
  if (autoCalc && form.destCity && (Number(g.weight) > 0 || Number(g.volume) > 0 || Number(g.number) > 1)) {
    const calc = archiveStore.calcFreightByRoutePrice(
      form.destCity,
      Number(g.number) || 0,
      Number(g.weight) || 0,
      Number(g.volume) || 0
    )
    if (calc > 0) {
      g.freight = calc
    }
  }
  syncGoodsSummary()
}

function onGoodsWorthChange() {
  const sumWorth = goodsRows.value.reduce((s, r) => s + (Number(r.worth) || 0), 0)
  form.fPremium = sumWorth > 0 ? Math.max(2, Math.round(sumWorth * 0.003)) : 0
  recalcTotal()
}

function onCollectMoneyChange() {
  const val = Number(form.fCollect) || 0
  form.fcService = val > 0 ? Math.max(5, Math.round(val * 0.005)) : 0
}

function syncGoodsSummary() {
  const sumFreight = goodsRows.value.reduce((s, r) => s + (Number(r.freight) || 0), 0)
  form.freight = sumFreight
  recalcTotal()
}

function recalcTotal() {
  const total =
    (Number(form.freight) || 0) +
    (Number(form.fDelivery) || 0) +
    (Number(form.fReceive) || 0) +
    (Number(form.fPremium) || 0) +
    (Number(form.ysOtherOne) || 0) +
    (Number(form.ysOtherTwo) || 0) +
    (Number(form.ysOtherThree) || 0)
  form.fTotal = Number(total.toFixed(2))
  distributeByPayType()
}

function distributeByPayType() {
  form.fCash = 0
  form.fDeliver = 0
  form.fReceipt = 0
  form.fMonth = 0
  form.fDeduct = 0
  switch (form.payType) {
    case '现付':
      form.fCash = form.fTotal
      break
    case '提付':
      form.fDeliver = form.fTotal
      break
    case '回单付':
      form.fReceipt = form.fTotal
      break
    case '月结':
      form.fMonth = form.fTotal
      break
    case '货款扣':
      form.fDeduct = form.fTotal
      break
  }
}

function handleSave(withPrint: boolean) {
  const firstGoods = goodsRows.value[0]
  if (!firstGoods.goodsName.trim()) {
    ElMessage.warning('请填写货物【品名】')
    return
  }
  const sumNum = goodsRows.value.reduce((s, r) => s + (Number(r.number) || 0), 0)
  const sumWeight = goodsRows.value.reduce((s, r) => s + (Number(r.weight) || 0), 0)
  const sumVolume = goodsRows.value.reduce((s, r) => s + (Number(r.volume) || 0), 0)
  const sumWorth = goodsRows.value.reduce((s, r) => s + (Number(r.worth) || 0), 0)

  const orderNoFinal = form.orderNo.trim() || `ZB261011000${opStore.shipList.length + 1}`

  // 自动沉淀新收发货人至客户档案
  if (form.shipper && form.shipPhone) {
    const [sp, sc, sa] = (form.shipAreas || '湖南省/长沙市/雨花区').split('/')
    archiveStore.upsertCustomerArchive('shipper', {
      name: form.shipper,
      phone: form.shipPhone,
      tel: form.shipTel,
      unit: form.shipUnit,
      idCard: form.shipIdCard,
      province: sp || '湖南省',
      city: sc || '长沙市',
      area: sa || '雨花区',
      address: form.shipAddress,
      defaultGoodsName: firstGoods.goodsName,
      defaultPack: firstGoods.pack || '纸箱',
    })
  }
  if (form.receiver && form.receivePhone) {
    const [rp, rc, ra] = (form.receiveAreas || `湖南省/${form.destCity}/蒸湘区`).split('/')
    archiveStore.upsertCustomerArchive('receiver', {
      name: form.receiver,
      phone: form.receivePhone,
      tel: form.receiveTel,
      unit: form.receiveUnit,
      idCard: form.receiveIdCard,
      province: rp || '湖南省',
      city: rc || form.destCity,
      area: ra || '',
      address: form.receiveAddress,
    })
  }

  const payload = {
    ...form,
    orderNo: orderNoFinal,
    isFill: pageMode.value === 'fill',
    goodsName: goodsRows.value.map(g => g.goodsName).filter(Boolean).join('/'),
    pack: firstGoods.pack || '纸箱',
    model: firstGoods.model,
    numberCount: sumNum,
    weightCount: sumWeight,
    volumeCount: sumVolume,
    worth: sumWorth,
    receipt: form.isReceipt ? `${form.receiptType || '回单原件'} ${form.receiptCount}份` : '无需回单'
  }

  if (pageMode.value === 'edit' && form.id) {
    opStore.updateShipOrder(form.id, payload, '运单修改界面保存')
    ElMessage.success('运单修改已保存并记入改单历史')
  } else {
    const newShip = opStore.addShipOrder(payload)
    if (linkedOrderId.value) {
      orderStore.markConvertedToWaybill(linkedOrderId.value, orderNoFinal, newShip.id)
      linkedOrderId.value = ''
    }
    ElMessage.success(`运单【${orderNoFinal}】创建成功`)
  }

  if (withPrint) {
    printPreviewRef.value?.open('waybill', [
      {
        shipOrderNo: orderNoFinal,
        startNetwork: form.startGroup,
        destCity: form.destCity,
        endNetwork: form.destGroup,
        goodsNo: form.goodsNo,
        createTime: form.shippingDate,
        shipperName: form.shipper,
        shipperCompany: form.shipUnit,
        shipperMobile: form.shipPhone,
        shipperAddress: form.shipAddress,
        receiverName: form.receiver,
        receiverCompany: form.receiveUnit,
        receiverMobile: form.receivePhone,
        receiverAddress: form.receiveAddress,
        goodsName: payload.goodsName,
        pack: payload.pack,
        num: sumNum,
        weight: sumWeight,
        volume: sumVolume,
        baseFee: form.freight,
        deliveryFee: form.fDelivery,
        declaredValue: sumWorth,
        insureFee: form.fPremium,
        agencyFund: form.fCollect,
        totalFee: form.fTotal,
        payType: form.payType,
        cashPay: form.fCash,
        collectPay: form.fDeliver,
        receiptPay: form.fReceipt,
        deliveryType: form.deliveryType,
        receiptRequirement: form.receiptType || '无需回单',
        receiptNum: form.receiptCount,
        remark: form.remark,
      }
    ])
  } else {
    router.push('/operation/ship/shiplist')
  }
}

// 引入订单 / 上游订单带入
const linkedOrderId = ref('')
const importOrderVisible = ref(false)
const orderFilterKw = ref('')
const filteredOrders = computed(() => {
  const kw = orderFilterKw.value.trim().toLowerCase()
  if (!kw) return orderStore.orders
  return orderStore.orders.filter((o: any) =>
    (o.orderNo || '').toLowerCase().includes(kw) ||
    (o.consignorName || '').toLowerCase().includes(kw) ||
    (o.consigneeName || '').toLowerCase().includes(kw) ||
    (o.cargoName || '').toLowerCase().includes(kw)
  )
})

function applyOrderToForm(ord: any) {
  linkedOrderId.value = ord.id || ''
  form.destCity = ord.destCity || ord.endAreaName || '长沙市'
  handleDestCityChange(form.destCity)
  if (ord.destGroup || ord.destName) {
    form.destGroup = ord.destGroup || ord.destName
  }
  form.shipper = ord.shipper || ord.consignorName || ''
  form.shipPhone = ord.shipPhone || ord.consignorMobile || ''
  form.shipUnit = ord.shipUnit || ord.consignorUnit || ''
  form.shipAddress = ord.shipAddress || ord.consignorAddress || ''
  form.receiver = ord.receiver || ord.consigneeName || ''
  form.receivePhone = ord.receivePhone || ord.consigneeMobile || ''
  form.receiveUnit = ord.receiveUnit || ord.consigneeUnit || ''
  form.receiveAddress = ord.receiveAddress || ord.consigneeAddress || ''
  form.freight = Number(ord.freight ?? ord.freightFee ?? 0)
  form.fDelivery = Number(ord.fDelivery ?? ord.deliveryFee ?? 0)
  form.fCollect = Number(ord.fCollect ?? ord.collectionMoney ?? 0)
  form.fPremium = Number(ord.fPremium ?? ord.insuranceFee ?? 0)
  form.payType = ord.payType || '现付'
  form.plateNo = ord.pickupTruckNo || ''
  form.driverName = ord.pickupDriver || ''
  form.driverPhone = ord.pickupDriverPhone || ''
  form.thirdNo = ord.upstreamOrderNo || ord.orderNo || ''
  form.remark = ord.remark || ''
  goodsRows.value = [
    {
      goodsName: ord.goodsName || ord.cargoName || '普货',
      pack: ord.pack || '纸箱',
      model: ord.model || '',
      number: Number(ord.number ?? ord.num ?? 1),
      freight: Number(ord.freight ?? ord.freightFee ?? 0),
      weight: Number(ord.weight || 100),
      volume: Number(ord.volume || 1.0),
      worth: Number(ord.worth ?? ord.declareValue ?? 0)
    }
  ]
  form.goodsNo = ord.goodsNo || `0-${ord.number || ord.num || 1}`
  recalcTotal()
  importOrderVisible.value = false
  ElMessage.success(`已带入订单 ${ord.orderNo} 全部信息，核对无误后保存即可正式转入运单`)
}

// 右下角8项真实设置
function openSettingModal(cmd: string) {
  settingDrawersRef.value?.openSetting(cmd)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'F5') {
    e.preventDefault()
    handleSave(false)
  } else if (e.key === 'F6') {
    e.preventDefault()
    handleSave(true)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  const fromOrderId = String(route.query.fromOrderId || '')
  if (fromOrderId) {
    const foundOrd = orderStore.getOrderById(fromOrderId)
    if (foundOrd) {
      applyOrderToForm(foundOrd)
      return
    }
  }
  const targetId = String(route.params.id || route.query.id || '')
  if (targetId && (pageMode.value === 'edit' || pageMode.value === 'copy')) {
    const found = opStore.shipList.find(r => r.id === targetId || r.orderNo === targetId)
    if (found) {
      Object.assign(form, {
        ...found,
        id: pageMode.value === 'edit' ? found.id : '',
        orderNo:
          pageMode.value === 'edit'
            ? found.orderNo
            : `ZB261011000${opStore.shipList.length + 1}`
      })
      goodsRows.value = [
        {
          goodsName: found.goodsName || '',
          pack: found.pack || '纸箱',
          model: found.model || '',
          number: Number(found.numberCount || 1),
          freight: Number(found.freight || 0),
          weight: Number(found.weightCount || 0),
          volume: Number(found.volumeCount || 0),
          worth: Number(found.worth || 0)
        }
      ]
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.ship-order-page {
  padding: 8px 12px;
  background-color: #ffffff;
  min-height: calc(100vh - 84px);
  box-sizing: border-box;
}

.ship-order-card {
  background: #ffffff;
  padding: 4px 10px 14px;
}

/* 顶部标题栏 (1:1 货 物 托 运 单 双底边线) */
.order-title-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
}

.title-center-group {
  display: inline-flex;
  align-items: center;
}

.main-title {
  font-size: 18px;
  font-weight: 500;
  color: #303133;
  letter-spacing: 6px;
  padding: 0 18px 4px 24px;
  border-bottom: 3px double #303133;
}

.import-order-row {
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}

.import-order-btn {
  font-size: 12px;
}

/* 运单号 + 托运日期 */
.meta-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding: 0 16px;
  font-size: 12px;
}

.meta-left,
.meta-right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.req-star,
.req {
  color: #f56c6c;
  font-style: normal;
  margin-right: 2px;
}

.red-lbl {
  color: #f56c6c !important;
  font-weight: 600;
}

.blue-val {
  color: #4f77cb !important;
}

.underline-input {
  border: none;
  border-bottom: 1px solid #dcdfe6;
  outline: none;
  font-size: 12px;
  color: #303133;
  padding: 2px 4px;
}

.underline-input:focus {
  border-bottom-color: #409eff;
}

.width-160 {
  width: 160px;
}

/* 主体蓝框 (.el-form-box 1:1 #78aadd) */
.el-form-box {
  border: 1px solid #78aadd;
  font-size: 12px;
  color: #303133;
}

/* 1. 线路行 */
.order-editor-traffic {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 1px solid #78aadd;
}

.traffic-cell {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  border-right: 1px solid #78aadd;
  min-width: 0;
}

.traffic-cell:last-child {
  border-right: none;
}

.cell-label {
  color: #303133;
  white-space: nowrap;
  margin-right: 8px;
  flex-shrink: 0;
  font-weight: 500;
}

.cell-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  border: none;
  border-bottom: 1px solid #e4e7ed;
  height: 22px;
  font-size: 12px;
  color: #303133;
  outline: none;
  background: transparent;
}

.cell-input:focus {
  border-bottom-color: #409eff;
}

.cell-select {
  flex: 1;
  min-width: 0;
  width: 100%;
}

:deep(.el-input__wrapper),
:deep(.el-select__wrapper) {
  box-shadow: none !important;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 0 !important;
  padding: 0 4px !important;
  background: transparent !important;
  min-height: 24px !important;
  height: 24px !important;
}

:deep(.el-input__inner) {
  font-size: 12px !important;
  color: #4f77cb;
}

.flat-autocomplete {
  flex: 1;
  width: 100%;
}

.center-input :deep(.el-input__inner) {
  text-align: center;
}

/* 2. 收发货方双栏 (1:1 2-col per side matching live_addShip.png) */
.order-editor-person {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #78aadd;
}

.person-half {
  display: flex;
  border-right: 1px solid #78aadd;
  min-width: 0;
}

.person-side-title {
  width: 58px;
  background-color: #ffffff;
  border-right: 1px solid #78aadd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  font-size: 12px;
  flex-shrink: 0;
}

.person-grid-2 {
  flex: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 4px 12px;
  gap: 2px 18px;
}

.p-cell {
  display: flex;
  align-items: center;
  height: 28px;
  min-width: 0;
}

.p-cell.span-2 {
  grid-column: span 1;
}

/* 3. 接货司机信息行 */
.order-editor-driver {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  border-bottom: 1px solid #78aadd;
  padding: 0 8px;
}

.driver-cell {
  display: flex;
  align-items: center;
  height: 32px;
  padding: 0 8px;
  min-width: 0;
}

/* 4. 货物表格 (.order-editor-goods) */
.order-editor-goods {
  border-bottom: 1px solid #78aadd;
}

.goods-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.goods-table thead th {
  height: 30px;
  background-color: #3888fa;
  color: #ffffff;
  font-weight: 600;
  border-right: 1px solid #78aadd;
  border-bottom: 1px solid #78aadd;
  text-align: center;
}

.goods-table thead th:last-child {
  border-right: none;
}

.goods-table thead th.req-th {
  color: #ff1f1f;
}

.goods-table tbody td {
  height: 34px;
  padding: 2px 8px;
  border-right: 1px solid #78aadd;
}

.goods-table tbody td:last-child {
  border-right: none;
}

.op-td {
  text-align: center;
}

.rect-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 20px;
  border-radius: 2px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
}

.rect-btn.add {
  background-color: #3888fa;
}

.rect-btn.del {
  background-color: #f56c6c;
}

.goods-input {
  width: 100%;
  height: 24px;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  text-align: center;
  font-size: 12px;
  outline: none;
}

.goods-input:focus {
  border-bottom-color: #3888fa;
}

/* 5. 费用三栏区 */
.order-editor-fee {
  display: grid;
  grid-template-columns: 1.1fr 1.1fr 1.1fr;
  border-bottom: 1px solid #78aadd;
}

.fee-col {
  border-right: 1px solid #78aadd;
  min-width: 0;
}

.fee-col-header {
  height: 28px;
  line-height: 28px;
  padding-left: 10px;
  background-color: #cae0f6;
  border-bottom: 1px solid #78aadd;
  font-weight: 600;
  color: #303133;
}

.total-red-header {
  color: #ff0000;
  font-weight: 700;
}

.fee-grid-3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 4px 8px;
  gap: 4px 8px;
}

.fee-cell {
  display: flex;
  align-items: center;
  height: 28px;
  min-width: 0;
}

.fee-cell.span-3 {
  grid-column: span 3;
}

.static-fee-val {
  font-weight: 600;
  color: #303133;
}

.fee-yellow-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 24px;
  background-color: #fcf8e3;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 6px;
  font-size: 12px;
  color: #4f77cb;
  outline: none;
}

.fee-gray-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 24px;
  background-color: #f2f4f8;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  padding: 0 6px;
  font-size: 12px;
  color: #4f77cb;
  outline: none;
}

/* 6. 交货方式与扩展行 */
.order-editor-extra {
  display: grid;
  grid-template-columns: 1fr 1fr 1.4fr 1.1fr 1fr 1fr;
  border-bottom: 1px solid #78aadd;
}

.extra-cell {
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  border-right: 1px solid #78aadd;
}

.mini-num-input {
  width: 52px;
  height: 22px;
  border: none;
  border-bottom: 1px solid #dcdfe6;
  background: #f2f4f8;
  text-align: center;
  font-size: 12px;
  color: #4f77cb;
  margin: 0 4px;
}

.check-pair {
  gap: 12px;
}

/* 7. 打印与备注行 (.last-row) */
.last-row {
  display: flex;
  align-items: center;
  min-height: 34px;
  padding: 0 10px;
}

.print-checks {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  padding-right: 14px;
  border-right: 1px solid #78aadd;
}

.print-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #303133;
}

.remark-box {
  flex: 1;
  padding-left: 10px;
}

/* 底部按钮栏 (.footer-row) */
.footer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 8px;
}

.red-check :deep(.el-checkbox__label) {
  color: #ff0000;
  font-weight: 600;
}

.footer-center {
  display: flex;
  gap: 12px;
}

.btn-royal-save {
  background-color: #4f77cb !important;
  border-color: #4f77cb !important;
  color: #ffffff !important;
  min-width: 100px;
}

.btn-royal-save:hover {
  background-color: #6389d6 !important;
  border-color: #6389d6 !important;
}

.btn-setting-gear {
  background-color: #4f77cb !important;
  border-color: #4f77cb !important;
  color: #ffffff !important;
  padding: 6px 8px !important;
}

.no-right-border {
  border-right: none !important;
}
</style>
