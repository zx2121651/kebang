<template>
  <div class="kb-add-ship-page" ref="pageRef">
    <!-- Top Edit Mode Banner (shown when editing or copying a waybill) -->
    <div v-if="editModeId" class="edit-mode-banner">
      <span>当前正在修改运单：<b>{{ form.shipOrderNo }}</b>（保存后将自动写入改单历史记录）</span>
      <el-button size="small" type="warning" plain @click="exitEditMode">退出改单并新建运单</el-button>
    </div>

    <div class="ship-card-body">
      <!-- 1. Top Basic Info Row -->
      <div class="top-route-row">
        <div class="tr-cell">
          <label class="tr-label">发站</label>
          <el-input v-model="form.startNetwork" disabled />
        </div>

        <div class="tr-cell">
          <label class="tr-label"><span class="req">*</span>到站城市</label>
          <el-select
            :ref="(el: any) => setFieldRef('destCity', el)"
            v-model="form.destCity"
            filterable
            :filter-method="filterCityMethod"
            placeholder="城市/拼音首字母(如hy)"
            style="width: 100%"
            @change="onDestCityChange"
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

        <div class="tr-cell">
          <label class="tr-label"><span class="req">*</span>运输路线</label>
          <el-select
            :ref="(el: any) => setFieldRef('routeType', el)"
            v-model="form.routeType"
            style="width: 100%"
            @change="onRouteTypeChange"
          >
            <el-option label="专线直达" value="专线直达" />
            <el-option label="本地外发" value="本地外发" />
            <el-option label="整车直送" value="整车直送" />
          </el-select>
        </div>

        <!-- Dynamic Branch / Carrier / Direct Vehicle Fields based on routeType -->
        <template v-if="form.routeType === '专线直达'">
          <div class="tr-cell">
            <label class="tr-label"><span v-if="isReq('endNetwork')" class="req">*</span>终端网点</label>
            <el-select
              :ref="(el: any) => setFieldRef('endNetwork', el)"
              v-model="form.endNetwork"
              filterable
              clearable
              placeholder="请选择网点"
              style="width: 100%"
            >
              <el-option
                v-for="n in archiveStore.networkList"
                :key="n.id"
                :label="n.name"
                :value="n.name"
              />
            </el-select>
          </div>
        </template>

        <template v-else-if="form.routeType === '本地外发'">
          <div class="tr-cell">
            <label class="tr-label"><span class="req">*</span>承运单位</label>
            <CarrierPopoverInput
              v-model="form.carrierName"
              placeholder="承运商/拼音联想"
              @select="onSelectCarrier"
            />
          </div>
          <div class="tr-cell">
            <label class="tr-label">本地电话</label>
            <el-input v-model="form.carrierLocalPhone" placeholder="自动带出" />
          </div>
          <div class="tr-cell">
            <label class="tr-label">提货电话</label>
            <el-input v-model="form.carrierPickPhone" placeholder="自动带出" />
          </div>
        </template>

        <template v-else-if="form.routeType === '整车直送'">
          <div class="tr-cell">
            <label class="tr-label"><span class="req">*</span>随车车牌</label>
            <VehiclePopoverInput
              v-model="form.directPlateNo"
              placeholder="车牌号联想"
              @select="onSelectDirectVehicle"
            />
          </div>
          <div class="tr-cell">
            <label class="tr-label">随车司机</label>
            <el-input v-model="form.directDriverName" placeholder="司机姓名" />
          </div>
          <div class="tr-cell">
            <label class="tr-label">司机手机</label>
            <el-input v-model="form.directDriverPhone" placeholder="司机手机" />
          </div>
        </template>

        <div class="tr-cell">
          <label class="tr-label">货号</label>
          <el-input v-model="form.goodsNo" placeholder="0-0" />
        </div>

        <div class="tr-cell">
          <label class="tr-label"><span class="req">*</span>运单号</label>
          <el-input v-model="form.shipOrderNo" placeholder="自动生成或手输" />
        </div>

        <div class="tr-cell tr-cell-wide">
          <label class="tr-label">开单时间</label>
          <el-date-picker
            v-model="form.createTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </div>

        <div class="tr-cell">
          <label class="tr-label">手动单号</label>
          <el-input
            :ref="(el: any) => setFieldRef('manualNo', el)"
            v-model="form.manualNo"
            placeholder="纸质/手工单号"
            @keydown.enter.prevent="focusNextFrom('manualNo')"
          />
        </div>
      </div>

      <!-- 2. Shipper & Receiver Dual Box -->
      <div class="party-dual-row">
        <!-- Shipper (发货方) -->
        <div class="party-panel">
          <div class="side-badge">发<br />货<br />方</div>
          <div class="party-fields-grid">
            <div class="pf-cell">
              <label class="pf-label"><span v-if="isReq('shipperName')" class="req">*</span>发货方</label>
              <CustomerAutoComplete
                :ref="(el: any) => setFieldRef('shipperName', el)"
                v-model="form.shipperName"
                type="shipper"
                placeholder="姓名/首字母/手机号联想"
                @select="onSelectShipper"
                @select-history="onSelectHistoryWaybill"
                @enter-next="focusNextFrom('shipperName')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label"><span v-if="isReq('shipperMobile')" class="req">*</span>发货手机</label>
              <el-input
                :ref="(el: any) => setFieldRef('shipperMobile', el)"
                v-model="form.shipperMobile"
                placeholder="请输入11位手机号"
                @keydown.enter.prevent="focusNextFrom('shipperMobile')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">发货座机</label>
              <el-input
                :ref="(el: any) => setFieldRef('shipperTel', el)"
                v-model="form.shipperTel"
                placeholder="区号-座机号"
                @keydown.enter.prevent="focusNextFrom('shipperTel')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">发货单位</label>
              <el-input
                :ref="(el: any) => setFieldRef('shipperUnit', el)"
                v-model="form.shipperUnit"
                placeholder="客户公司/商行名称"
                @keydown.enter.prevent="focusNextFrom('shipperUnit')"
              />
            </div>

            <div v-if="archiveStore.uiLayoutConfig.showIdCardField" class="pf-cell">
              <label class="pf-label">发货证件</label>
              <el-input
                :ref="(el: any) => setFieldRef('shipperIdCard', el)"
                v-model="form.shipperIdCard"
                placeholder="身份证/信用代码"
                @keydown.enter.prevent="focusNextFrom('shipperIdCard')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">发货区域</label>
              <RegionCascaderInput v-model="form.shipperRegion" placeholder="省/市/区检索" />
            </div>

            <div class="pf-cell pf-span-2">
              <label class="pf-label">发货地址</label>
              <el-autocomplete
                :ref="(el: any) => setFieldRef('shipperAddress', el)"
                v-model="form.shipperAddress"
                :fetch-suggestions="queryShipperAddressSuggest"
                placeholder="详细街道门牌地址（支持联想）"
                style="width: 100%"
                @keydown.enter.prevent="focusNextFrom('shipperAddress')"
              />
            </div>
          </div>
        </div>

        <!-- Receiver (收货方) -->
        <div class="party-panel">
          <div class="side-badge">收<br />货<br />方</div>
          <div class="party-fields-grid">
            <div class="pf-cell">
              <label class="pf-label"><span v-if="isReq('receiverName')" class="req">*</span>收货方</label>
              <CustomerAutoComplete
                :ref="(el: any) => setFieldRef('receiverName', el)"
                v-model="form.receiverName"
                type="receiver"
                :dest-city="form.destCity"
                placeholder="姓名/首字母/手机号联想"
                @select="onSelectReceiver"
                @select-history="onSelectHistoryWaybill"
                @enter-next="focusNextFrom('receiverName')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label"><span v-if="isReq('receiverMobile')" class="req">*</span>收货手机</label>
              <el-input
                :ref="(el: any) => setFieldRef('receiverMobile', el)"
                v-model="form.receiverMobile"
                placeholder="请输入11位手机号"
                @keydown.enter.prevent="focusNextFrom('receiverMobile')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">收货座机</label>
              <el-input
                :ref="(el: any) => setFieldRef('receiverTel', el)"
                v-model="form.receiverTel"
                placeholder="区号-座机号"
                @keydown.enter.prevent="focusNextFrom('receiverTel')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">收货单位</label>
              <el-input
                :ref="(el: any) => setFieldRef('receiverUnit', el)"
                v-model="form.receiverUnit"
                placeholder="收货公司/门店名称"
                @keydown.enter.prevent="focusNextFrom('receiverUnit')"
              />
            </div>

            <div v-if="archiveStore.uiLayoutConfig.showIdCardField" class="pf-cell">
              <label class="pf-label">收货证件</label>
              <el-input
                :ref="(el: any) => setFieldRef('receiverIdCard', el)"
                v-model="form.receiverIdCard"
                placeholder="身份证/信用代码"
                @keydown.enter.prevent="focusNextFrom('receiverIdCard')"
              />
            </div>

            <div class="pf-cell">
              <label class="pf-label">收货区域</label>
              <RegionCascaderInput v-model="form.receiverRegion" placeholder="省/市/区检索" />
            </div>

            <div class="pf-cell pf-span-2">
              <label class="pf-label"><span v-if="isReq('receiverAddress')" class="req">*</span>收货地址</label>
              <el-autocomplete
                :ref="(el: any) => setFieldRef('receiverAddress', el)"
                v-model="form.receiverAddress"
                :fetch-suggestions="queryReceiverAddressSuggest"
                placeholder="详细送货街道门牌地址（支持联想）"
                style="width: 100%"
                @keydown.enter.prevent="focusNextFrom('receiverAddress')"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Goods Information Section -->
      <div class="section-block">
        <div class="side-badge">货<br />物<br />信<br />息</div>
        <div class="goods-table-area">
          <div class="goods-head-row">
            <div class="g-col g-op"></div>
            <div class="g-col"><span class="req">*</span>货物名称</div>
            <div class="g-col"><span class="req">*</span>包装</div>
            <div class="g-col"><span class="req">*</span>件数</div>
            <div class="g-col"><span class="req">*</span>重量(KG)</div>
            <div class="g-col"><span class="req">*</span>体积(m³)</div>
            <div class="g-col">型号</div>
            <div class="g-col">件数单价</div>
            <div class="g-col">重量单价</div>
            <div class="g-col">体积单价</div>
            <div class="g-col">基本运费</div>
          </div>

          <div
            v-for="(item, idx) in visibleGoodsRows"
            :key="idx"
            class="goods-body-row"
          >
            <div class="g-col g-op">
              <span v-if="idx === 0" class="op-btn plus" title="增加货物行" @click="addGoodsRow">+</span>
              <span v-else class="op-btn minus" title="删除货物行" @click="removeGoodsRow(idx)">-</span>
            </div>

            <div class="g-col">
              <el-autocomplete
                :ref="(el: any) => idx === 0 && setFieldRef('goodsName0', el)"
                v-model="item.goodsName"
                :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('goodsName', q))"
                placeholder="品名/拼音(如wj)"
                style="width: 100%"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('goodsName0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-autocomplete
                :ref="(el: any) => idx === 0 && setFieldRef('pack0', el)"
                v-model="item.pack"
                :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('pack', q))"
                placeholder="包装/拼音(如zx)"
                style="width: 100%"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('pack0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-input
                :ref="(el: any) => idx === 0 && setFieldRef('num0', el)"
                v-model="item.num"
                placeholder="件数"
                @input="onGoodsQtyOrPriceChange(item)"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('num0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-input
                :ref="(el: any) => idx === 0 && setFieldRef('weight0', el)"
                v-model="item.weight"
                placeholder="重量(kg)"
                @input="onGoodsQtyOrPriceChange(item)"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('weight0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-input
                :ref="(el: any) => idx === 0 && setFieldRef('volume0', el)"
                v-model="item.volume"
                placeholder="体积(m³)"
                @input="onGoodsQtyOrPriceChange(item)"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('volume0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-autocomplete
                :ref="(el: any) => idx === 0 && setFieldRef('model0', el)"
                v-model="item.model"
                :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('model', q))"
                placeholder="规格型号"
                style="width: 100%"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('model0') : undefined"
              />
            </div>

            <div class="g-col">
              <el-input v-model="item.piecePrice" placeholder="元/件" @input="onGoodsUnitPriceManualChange(item)" />
            </div>

            <div class="g-col">
              <el-input v-model="item.weightPrice" placeholder="元/kg" @input="onGoodsUnitPriceManualChange(item)" />
            </div>

            <div class="g-col">
              <el-input v-model="item.volumePrice" placeholder="元/m³" @input="onGoodsUnitPriceManualChange(item)" />
            </div>

            <div class="g-col">
              <el-input
                :ref="(el: any) => idx === 0 && setFieldRef('baseFee0', el)"
                v-model="item.baseFee"
                class="red-bold-input"
                placeholder="基本运费"
                @input="syncTotalBaseFee"
                @keydown.enter.prevent="idx === 0 ? focusNextFrom('baseFee0') : undefined"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Freight Information Section -->
      <div class="section-block">
        <div class="side-badge">运<br />费<br />信<br />息</div>
        <div class="fee-grid-area">
          <!-- Row 1 -->
          <div class="fee-cell">
            <label class="fee-label">合计运费</label>
            <el-input :model-value="totalFeeComputed" readonly class="red-bold-input" />
          </div>

          <div class="fee-cell">
            <label class="fee-label"><span class="req">*</span>付款方式</label>
            <el-select
              :ref="(el: any) => setFieldRef('payType', el)"
              v-model="form.payType"
              filterable
              style="width: 100%"
              @change="syncPayDistribution"
            >
              <el-option v-for="p in archiveStore.dictData.payType" :key="p" :label="p" :value="p" />
            </el-select>
          </div>

          <div class="fee-cell">
            <label class="fee-label">现付</label>
            <el-input
              :ref="(el: any) => setFieldRef('cashPay', el)"
              v-model="form.cashPay"
              @keydown.enter.prevent="focusNextFrom('cashPay')"
            />
          </div>

          <div class="fee-cell">
            <label class="fee-label">提付</label>
            <el-input
              :ref="(el: any) => setFieldRef('collectPay', el)"
              v-model="form.collectPay"
              @keydown.enter.prevent="focusNextFrom('collectPay')"
            />
          </div>

          <div class="fee-cell">
            <label class="fee-label">回单付</label>
            <el-input v-model="form.receiptPay" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">月结</label>
            <el-input v-model="form.monthPay" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">货款扣</label>
            <el-input v-model="form.deductPay" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">保价声明</label>
            <el-input
              :ref="(el: any) => setFieldRef('declaredValue', el)"
              v-model="form.declaredValue"
              placeholder="声明价值"
              @input="onDeclaredValueInput"
              @keydown.enter.prevent="focusNextFrom('declaredValue')"
            />
          </div>

          <div class="fee-cell">
            <label class="fee-label">保价费</label>
            <el-input v-model="form.insureFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">送货费</label>
            <el-input
              :ref="(el: any) => setFieldRef('deliveryFee', el)"
              v-model="form.deliveryFee"
              @input="syncPayDistribution"
              @keydown.enter.prevent="focusNextFrom('deliveryFee')"
            />
          </div>

          <!-- Row 2 -->
          <div class="fee-cell">
            <label class="fee-label">接货费</label>
            <el-input
              :ref="(el: any) => setFieldRef('pickupFee', el)"
              v-model="form.pickupFee"
              @input="syncPayDistribution"
              @keydown.enter.prevent="focusNextFrom('pickupFee')"
            />
          </div>

          <div class="fee-cell">
            <label class="fee-label">装卸费</label>
            <el-input v-model="form.loadFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">包装费</label>
            <el-input v-model="form.packFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">代收货款</label>
            <el-input
              :ref="(el: any) => setFieldRef('agencyFund', el)"
              v-model="form.agencyFund"
              @input="onAgencyFundInput"
              @keydown.enter.prevent="focusNextFrom('agencyFund')"
            />
          </div>

          <div class="fee-cell">
            <label class="fee-label">代收手续费</label>
            <el-input v-model="form.agencyFee" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">上楼费</label>
            <el-input v-model="form.upstairsFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">报关费</label>
            <el-input v-model="form.customsFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">其他费</label>
            <el-input v-model="form.otherFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">信息费</label>
            <el-input v-model="form.infoFee" @input="syncPayDistribution" />
          </div>

          <div class="fee-cell">
            <label class="fee-label">开票</label>
            <el-select v-model="form.invoiceType" style="width: 100%">
              <el-option label="不开票" value="不开票" />
              <el-option label="增值税专票" value="增值税专票" />
              <el-option label="普通发票" value="普通发票" />
            </el-select>
          </div>
        </div>
      </div>

      <!-- 5. Service & Remark Section -->
      <div v-if="archiveStore.uiLayoutConfig.showServiceSection" class="section-block">
        <div class="side-badge">服<br />务<br />费<br />用</div>
        <div class="service-grid-area">
          <div class="srv-row-1">
            <div class="fee-cell">
              <label class="fee-label">交接方式</label>
              <el-select
                :ref="(el: any) => setFieldRef('deliveryType', el)"
                v-model="form.deliveryType"
                filterable
                style="width: 100%"
              >
                <el-option v-for="d in archiveStore.dictData.deliveryType" :key="d" :label="d" :value="d" />
              </el-select>
            </div>

            <div class="fee-cell">
              <label class="fee-label">运输方式</label>
              <el-select v-model="form.shippingType" style="width: 100%">
                <el-option v-for="s in archiveStore.dictData.shippingType" :key="s" :label="s" :value="s" />
              </el-select>
            </div>

            <div class="fee-cell">
              <label class="fee-label">回单要求</label>
              <el-select
                :ref="(el: any) => setFieldRef('receiptRequirement', el)"
                v-model="form.receiptRequirement"
                clearable
                style="width: 100%"
              >
                <el-option v-for="r in archiveStore.dictData.receipt" :key="r" :label="r" :value="r" />
              </el-select>
            </div>

            <div class="fee-cell">
              <label class="fee-label">回单份数</label>
              <el-input
                :ref="(el: any) => setFieldRef('receiptNum', el)"
                v-model="form.receiptNum"
                @keydown.enter.prevent="focusNextFrom('receiptNum')"
              />
            </div>

            <div class="fee-cell">
              <label class="fee-label">业务员</label>
              <el-autocomplete
                :ref="(el: any) => setFieldRef('salesman', el)"
                v-model="form.salesman"
                :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('salesMan', q))"
                placeholder="业务员/拼音"
                style="width: 100%"
                @keydown.enter.prevent="focusNextFrom('salesman')"
              />
            </div>

            <div class="fee-cell">
              <label class="fee-label">回扣</label>
              <el-input v-model="form.rebateFee" />
            </div>

            <template v-if="archiveStore.uiLayoutConfig.showExtraFeeRow">
              <div class="fee-cell">
                <label class="fee-label">现返</label>
                <el-input v-model="form.cashRebate" />
              </div>
              <div class="fee-cell">
                <label class="fee-label">欠返</label>
                <el-input v-model="form.debtRebate" />
              </div>
            </template>
          </div>

          <div class="srv-row-2">
            <div class="fee-cell remark-full">
              <label class="fee-label">备注</label>
              <el-autocomplete
                :ref="(el: any) => setFieldRef('remark', el)"
                v-model="form.remark"
                :fetch-suggestions="(q: string, cb: any) => cb(archiveStore.queryDictSuggestions('remark', q))"
                placeholder="输入或选择常用运输备注（支持拼音首字母检索，按Enter直接保存运单）"
                style="width: 100%"
                @keydown.enter.prevent="handleSave(false)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 6. Bottom Action Bar -->
      <div class="bottom-action-bar">
        <div class="print-checks">
          <el-checkbox v-model="printFlags.waybill">打印运单</el-checkbox>
          <el-checkbox v-model="printFlags.label">打印标签</el-checkbox>
          <el-input v-model="printFlags.labelCount" class="label-num-input" />
          <span>件</span>
          <el-checkbox v-model="printFlags.envelope" style="margin-left: 8px">打印信封</el-checkbox>
        </div>

        <div class="main-save-btns">
          <el-button size="small" @click="resetForm">重置表单</el-button>
          <el-button size="small" type="primary" @click="handleSave(false)">保存(F5)</el-button>
          <el-button size="small" type="success" @click="handleSave(true)">保存并打印(F6)</el-button>
        </div>

        <div class="right-gear-wrap">
          <el-dropdown trigger="click" placement="top-end" @command="onSettingCommand">
            <span class="gear-trigger" title="运单页面配置">
              <el-icon><Setting /></el-icon>
            </span>
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

    <!-- Real Settings Drawers & Modals -->
    <WaybillSettingDrawers ref="settingDrawersRef" />

    <!-- Real Visual Print Preview Modal -->
    <PrintPreviewDialog ref="printPreviewRef" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import {
  useArchiveStore,
  type CustomerArchiveItem,
  type CarrierArchiveItem,
  type VehicleArchiveItem
} from '@/store/dictionaryAndArchive'
import { useOperationStore } from '@/store/operation'
import CustomerAutoComplete from '../components/CustomerAutoComplete.vue'
import RegionCascaderInput from '../components/RegionCascaderInput.vue'
import CarrierPopoverInput from '../components/CarrierPopoverInput.vue'
import VehiclePopoverInput from '../components/VehiclePopoverInput.vue'
import WaybillSettingDrawers from '../components/WaybillSettingDrawers.vue'
import PrintPreviewDialog from '../components/PrintPreviewDialog.vue'

const route = useRoute()
const router = useRouter()
const archiveStore = useArchiveStore()
const opStore = useOperationStore()

const settingDrawersRef = ref<InstanceType<typeof WaybillSettingDrawers> | null>(null)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

const editModeId = ref<string | null>(null)

// Field refs for Enter cursor path navigation
const fieldRefs: Record<string, any> = {}
const setFieldRef = (key: string, el: any) => {
  if (el) fieldRefs[key] = el
}

const isReq = (key: string) => archiveStore.requiredFieldKeys.includes(key)

const focusNextFrom = (currentKey: string) => {
  const autoEnter = archiveStore.userBehaviors.find(b => b.key === 'enterNextFocus')?.enabled ?? true
  if (!autoEnter) return
  const keys = archiveStore.cursorPathKeys
  const idx = keys.indexOf(currentKey)
  if (idx >= 0 && idx + 1 < keys.length) {
    const nextKey = keys[idx + 1]
    const target = fieldRefs[nextKey]
    if (target?.focus) {
      target.focus()
    }
  }
}

const nowStr = () => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

interface GoodsRowItem {
  goodsName: string
  pack: string
  num: string
  weight: string
  volume: string
  model: string
  piecePrice: string
  weightPrice: string
  volumePrice: string
  baseFee: string
}

const createEmptyGoodsRow = (): GoodsRowItem => ({
  goodsName: '',
  pack: '',
  num: '',
  weight: '',
  volume: '',
  model: '',
  piecePrice: '',
  weightPrice: '',
  volumePrice: '',
  baseFee: '',
})

const goodsRows = ref<GoodsRowItem[]>([
  createEmptyGoodsRow(),
  createEmptyGoodsRow(),
])

const visibleGoodsRows = computed(() => {
  if (archiveStore.uiLayoutConfig.showSecondGoodsRow) {
    return goodsRows.value
  }
  return goodsRows.value.slice(0, 1)
})

const addGoodsRow = () => {
  goodsRows.value.push(createEmptyGoodsRow())
}

const removeGoodsRow = (idx: number) => {
  if (goodsRows.value.length > 1) {
    goodsRows.value.splice(idx, 1)
    syncTotalBaseFee()
  }
}

const form = reactive({
  startNetwork: '长沙分拨中心',
  destCity: '',
  routeType: '专线直达',
  endNetwork: '',
  carrierName: '',
  carrierLocalPhone: '',
  carrierPickPhone: '',
  directPlateNo: '',
  directDriverName: '',
  directDriverPhone: '',
  goodsNo: '0-0',
  shipOrderNo: archiveStore.generateNewWaybillNo(),
  createTime: nowStr(),
  manualNo: '',

  shipperName: '',
  shipperMobile: '',
  shipperTel: '',
  shipperUnit: '',
  shipperIdCard: '',
  shipperRegion: '湖南省/长沙市/雨花区',
  shipperAddress: '',

  receiverName: '',
  receiverMobile: '',
  receiverTel: '',
  receiverUnit: '',
  receiverIdCard: '',
  receiverRegion: '',
  receiverAddress: '',

  payType: '现付',
  cashPay: '',
  collectPay: '',
  receiptPay: '',
  monthPay: '',
  deductPay: '',
  declaredValue: '',
  insureFee: '',
  deliveryFee: '',
  pickupFee: '',
  loadFee: '',
  packFee: '',
  agencyFund: '',
  agencyFee: '',
  upstairsFee: '',
  customsFee: '',
  otherFee: '',
  infoFee: '',
  invoiceType: '不开票',

  deliveryType: '自提',
  shippingType: '普通汽运',
  receiptRequirement: '',
  receiptNum: '',
  salesman: '',
  rebateFee: '',
  cashRebate: '',
  debtRebate: '',
  remark: '',
})

const printFlags = reactive({
  waybill: false,
  label: false,
  labelCount: '0',
  envelope: false,
})

// Destination City Filter & Linkage
const cityFilterKeyword = ref('')
const filteredCities = computed(() => archiveStore.searchCities(cityFilterKeyword.value))

const filterCityMethod = (val: string) => {
  cityFilterKeyword.value = val
}

const onDestCityChange = (cityName: string) => {
  const matched = archiveStore.cityList.find(c => c.name === cityName)
  if (!matched) return
  form.routeType = matched.routeType
  form.endNetwork = matched.matchedBranch
  if (!form.receiverRegion) {
    const districtVal = (matched as any).district || (matched as any).defaultDistrict || ''
    form.receiverRegion = `${matched.province}/${matched.name}/${districtVal}`
  }
  // Fill default unit prices on Row 0 if empty
  const g0 = goodsRows.value[0]
  if (g0) {
    g0.weightPrice = String(matched.weightPrice)
    g0.volumePrice = String(matched.volumePrice)
    g0.piecePrice = String(matched.piecePrice)
    onGoodsQtyOrPriceChange(g0)
  }
  updateGoodsNo()
}

const onRouteTypeChange = (rt: string) => {
  if (rt === '整车直送') {
    form.deliveryType = '整车直送'
  }
}

const onSelectCarrier = (c: CarrierArchiveItem) => {
  form.carrierName = c.name
  form.carrierLocalPhone = c.localPhone
  form.carrierPickPhone = c.pickPhone
}

const onSelectDirectVehicle = (v: VehicleArchiveItem) => {
  form.directPlateNo = v.plateNo
  form.directDriverName = v.driverName
  form.directDriverPhone = v.driverPhone
}

// Shipper & Receiver Auto-Complete Callbacks
const onSelectShipper = (item: CustomerArchiveItem) => {
  form.shipperName = item.name
  form.shipperMobile = item.phone
  form.shipperTel = item.tel
  form.shipperUnit = item.unit
  form.shipperIdCard = item.idCard
  form.shipperRegion = [item.province, item.city, item.area].filter(Boolean).join('/')
  form.shipperAddress = item.address
  if (item.defaultGoodsName && !goodsRows.value[0].goodsName) {
    goodsRows.value[0].goodsName = item.defaultGoodsName
  }
  if (item.defaultPack && !goodsRows.value[0].pack) {
    goodsRows.value[0].pack = item.defaultPack
  }
}

const onSelectReceiver = (item: CustomerArchiveItem) => {
  form.receiverName = item.name
  form.receiverMobile = item.phone
  form.receiverTel = item.tel
  form.receiverUnit = item.unit
  form.receiverIdCard = item.idCard
  form.receiverRegion = [item.province, item.city, item.area].filter(Boolean).join('/')
  form.receiverAddress = item.address

  const autoSync = archiveStore.userBehaviors.find(b => b.key === 'autoSelectBranchByCity')?.enabled ?? true
  if (autoSync && item.city) {
    form.destCity = item.city
    onDestCityChange(item.city)
  }
}

const onSelectHistoryWaybill = (row: any, includeGoods: boolean) => {
  form.destCity = row.destCity || form.destCity
  form.endNetwork = row.endNetwork || form.endNetwork
  form.shipperName = row.shipperName || ''
  form.shipperMobile = row.shipperMobile || ''
  form.shipperUnit = row.shipperUnit || ''
  form.shipperAddress = row.shipperAddress || ''
  form.receiverName = row.receiverName || ''
  form.receiverMobile = row.receiverMobile || ''
  form.receiverUnit = row.receiverUnit || ''
  form.receiverAddress = row.receiverAddress || ''

  if (includeGoods) {
    goodsRows.value[0].goodsName = row.goodsName || ''
    goodsRows.value[0].pack = row.pack || ''
    goodsRows.value[0].num = String(row.num || '')
    goodsRows.value[0].weight = String(row.weight || '')
    goodsRows.value[0].volume = String(row.volume || '')
    goodsRows.value[0].baseFee = String(row.baseFee || '')
    form.payType = row.payType || '现付'
    form.deliveryType = row.deliveryType || '自提'
    updateGoodsNo()
    syncPayDistribution()
  }
}

// Address Suggestions
const queryShipperAddressSuggest = (q: string, cb: (list: { value: string }[]) => void) => {
  const list = archiveStore.shipperArchives
    .map(s => ({ value: s.address }))
    .filter(a => !q || a.value.includes(q))
  cb(list)
}

const queryReceiverAddressSuggest = (q: string, cb: (list: { value: string }[]) => void) => {
  const list = archiveStore.receiverArchives
    .filter(r => !form.destCity || r.city === form.destCity)
    .map(r => ({ value: r.address }))
    .filter(a => !q || a.value.includes(q))
  cb(list)
}

// Goods & Freight Calculation
const updateGoodsNo = () => {
  const totalNum = goodsRows.value.reduce((s, r) => s + (Number(r.num) || 0), 0)
  printFlags.labelCount = String(totalNum)
  form.goodsNo = archiveStore.generateGoodsNo(form.shipOrderNo, totalNum, form.endNetwork)
}

const onGoodsQtyOrPriceChange = (item: GoodsRowItem) => {
  updateGoodsNo()
  const autoCalc = archiveStore.userBehaviors.find(b => b.key === 'autoCalcFreightByPrice')?.enabled ?? true
  if (!autoCalc) return

  const num = Number(item.num) || 0
  const weight = Number(item.weight) || 0
  const volume = Number(item.volume) || 0

  if (form.destCity) {
    const calc = archiveStore.calcFreightByRoutePrice(form.destCity, num, weight, volume)
    if (calc > 0) {
      item.baseFee = String(calc)
    }
  } else {
    const byP = num * (Number(item.piecePrice) || 0)
    const byW = weight * (Number(item.weightPrice) || 0)
    const byV = volume * (Number(item.volumePrice) || 0)
    const best = Math.max(byP, byW, byV)
    if (best > 0) item.baseFee = String(Math.round(best))
  }
  syncTotalBaseFee()
}

const onGoodsUnitPriceManualChange = (item: GoodsRowItem) => {
  const num = Number(item.num) || 0
  const weight = Number(item.weight) || 0
  const volume = Number(item.volume) || 0
  const byP = num * (Number(item.piecePrice) || 0)
  const byW = weight * (Number(item.weightPrice) || 0)
  const byV = volume * (Number(item.volumePrice) || 0)
  const best = Math.max(byP, byW, byV)
  if (best > 0) {
    item.baseFee = String(Math.round(best))
    syncTotalBaseFee()
  }
}

const syncTotalBaseFee = () => {
  syncPayDistribution()
}

const onDeclaredValueInput = () => {
  const val = Number(form.declaredValue) || 0
  form.insureFee = val > 0 ? String(Math.max(2, Math.round(val * 0.003))) : ''
  syncPayDistribution()
}

const onAgencyFundInput = () => {
  const val = Number(form.agencyFund) || 0
  form.agencyFee = val > 0 ? String(Math.max(5, Math.round(val * 0.005))) : ''
}

const totalBaseFeeNum = computed(() =>
  goodsRows.value.reduce((s, r) => s + (Number(r.baseFee) || 0), 0)
)

const totalFeeNum = computed(() => {
  return (
    totalBaseFeeNum.value +
    (Number(form.insureFee) || 0) +
    (Number(form.deliveryFee) || 0) +
    (Number(form.pickupFee) || 0) +
    (Number(form.loadFee) || 0) +
    (Number(form.packFee) || 0) +
    (Number(form.upstairsFee) || 0) +
    (Number(form.customsFee) || 0) +
    (Number(form.otherFee) || 0) +
    (Number(form.infoFee) || 0)
  )
})

const totalFeeComputed = computed(() => (totalFeeNum.value > 0 ? String(totalFeeNum.value) : ''))

const syncPayDistribution = () => {
  const total = totalFeeNum.value
  const str = total > 0 ? String(total) : ''
  form.cashPay = ''
  form.collectPay = ''
  form.receiptPay = ''
  form.monthPay = ''
  form.deductPay = ''

  if (form.payType === '现付') form.cashPay = str
  else if (form.payType === '提付') form.collectPay = str
  else if (form.payType === '回单付') form.receiptPay = str
  else if (form.payType === '月结') form.monthPay = str
  else if (form.payType === '货款扣') form.deductPay = str
}

// Save & Keyboard Shortcuts (F5 / F6)
const handleSave = (andPrint: boolean) => {
  if (!form.destCity) {
    ElMessage.warning('请选择或输入【到站城市】')
    return
  }
  if (!form.shipperName || !form.shipperMobile) {
    ElMessage.warning('请完整填写【发货方】姓名及手机号')
    return
  }
  if (!form.receiverName || !form.receiverMobile) {
    ElMessage.warning('请完整填写【收货方】姓名及手机号')
    return
  }
  const g0 = goodsRows.value[0]
  if (!g0.goodsName || !g0.num) {
    ElMessage.warning('请填写第一行【货物名称】和【件数】')
    return
  }

  const totalNum = goodsRows.value.reduce((s, r) => s + (Number(r.num) || 0), 0)
  const totalWeight = goodsRows.value.reduce((s, r) => s + (Number(r.weight) || 0), 0)
  const totalVolume = Number(goodsRows.value.reduce((s, r) => s + (Number(r.volume) || 0), 0).toFixed(2))
  const combinedGoodsName = goodsRows.value.map(r => r.goodsName).filter(Boolean).join('/')
  const combinedPack = goodsRows.value.map(r => r.pack).filter(Boolean).join('/') || '纸箱'

  // Auto-save customer archives if behavior enabled
  const autoSaveCust = archiveStore.userBehaviors.find(b => b.key === 'autoSaveCustomerArchive')?.enabled ?? true
  if (autoSaveCust) {
    const [sp, sc, sa] = (form.shipperRegion || '湖南省/长沙市/雨花区').split('/')
    archiveStore.upsertCustomerArchive('shipper', {
      name: form.shipperName,
      phone: form.shipperMobile,
      tel: form.shipperTel,
      unit: form.shipperUnit,
      idCard: form.shipperIdCard,
      province: sp || '湖南省',
      city: sc || '长沙市',
      area: sa || '雨花区',
      address: form.shipperAddress,
      defaultGoodsName: g0.goodsName,
      defaultPack: g0.pack,
    })

    const [rp, rc, ra] = (form.receiverRegion || `湖南省/${form.destCity}/市区`).split('/')
    archiveStore.upsertCustomerArchive('receiver', {
      name: form.receiverName,
      phone: form.receiverMobile,
      tel: form.receiverTel,
      unit: form.receiverUnit,
      idCard: form.receiverIdCard,
      province: rp || '湖南省',
      city: rc || form.destCity,
      area: ra || '',
      address: form.receiverAddress,
    })
  }

  const payload = {
    shipOrderNo: form.shipOrderNo,
    goodsNo: form.goodsNo,
    manualNo: form.manualNo,
    createTime: form.createTime,
    startNetwork: form.startNetwork,
    destCity: form.destCity,
    endNetwork: form.endNetwork || `${form.destCity}营业部`,
    routeLine: `${form.startNetwork}-${form.destCity}`,
    deliveryType: form.deliveryType,
    shippingType: form.shippingType,
    payType: form.payType,
    shipperName: form.shipperName,
    shipperMobile: form.shipperMobile,
    shipperCompany: form.shipperUnit,
    shipperAddress: form.shipperAddress,
    receiverName: form.receiverName,
    receiverMobile: form.receiverMobile,
    receiverCompany: form.receiverUnit,
    receiverAddress: form.receiverAddress,
    goodsName: combinedGoodsName,
    pack: combinedPack,
    num: totalNum,
    weight: totalWeight,
    volume: totalVolume,
    baseFee: totalBaseFeeNum.value,
    deliveryFee: Number(form.deliveryFee) || 0,
    pickupFee: Number(form.pickupFee) || 0,
    insureFee: Number(form.insureFee) || 0,
    declaredValue: Number(form.declaredValue) || 0,
    loadFee: Number(form.loadFee) || 0,
    packFee: Number(form.packFee) || 0,
    otherFee: Number(form.otherFee) || 0,
    totalFee: totalFeeNum.value,
    cashPay: Number(form.cashPay) || 0,
    collectPay: Number(form.collectPay) || 0,
    receiptPay: Number(form.receiptPay) || 0,
    monthPay: Number(form.monthPay) || 0,
    deductPay: Number(form.deductPay) || 0,
    agencyFund: Number(form.agencyFund) || 0,
    agencyFee: Number(form.agencyFee) || 0,
    rebateFee: Number(form.rebateFee) || 0,
    receiptRequirement: form.receiptRequirement || '无需回单',
    receiptNum: Number(form.receiptNum) || 0,
    salesman: form.salesman || '林峰',
    remark: form.remark,
  }

  if (editModeId.value) {
    opStore.updateWaybill(editModeId.value, payload, '创建运单页改单保存')
    ElMessage.success(`运单【${form.shipOrderNo}】修改已保存并记录至改单历史`)
    exitEditMode()
  } else {
    const created = opStore.createWaybill(payload)
    ElMessage.success(`运单【${created.shipOrderNo}】创建成功，已入库待配载`)
    if (andPrint || printFlags.waybill || printFlags.label) {
      const printType = printFlags.label && !printFlags.waybill ? 'label' : 'waybill'
      printPreviewRef.value?.open(printType, [created])
    }
    resetFormAfterSave()
  }
}

const resetFormAfterSave = () => {
  const clearRec = archiveStore.userBehaviors.find(b => b.key === 'autoClearReceiverAfterSave')?.enabled ?? true
  form.shipOrderNo = archiveStore.generateNewWaybillNo()
  form.createTime = nowStr()
  form.manualNo = ''
  form.goodsNo = '0-0'
  if (clearRec) {
    form.receiverName = ''
    form.receiverMobile = ''
    form.receiverTel = ''
    form.receiverUnit = ''
    form.receiverIdCard = ''
    form.receiverAddress = ''
  }
  goodsRows.value = [createEmptyGoodsRow(), createEmptyGoodsRow()]
  syncPayDistribution()
}

const resetForm = () => {
  editModeId.value = null
  form.destCity = ''
  form.endNetwork = ''
  form.shipperName = ''
  form.shipperMobile = ''
  form.shipperTel = ''
  form.shipperUnit = ''
  form.shipperIdCard = ''
  form.shipperAddress = ''
  resetFormAfterSave()
}

const exitEditMode = () => {
  editModeId.value = null
  router.replace('/operation/ship/addShip')
  resetForm()
}

const loadWaybillByQuery = () => {
  const editId = route.query.editId as string | undefined
  const copyId = route.query.copyId as string | undefined
  const targetId = editId || copyId
  if (!targetId) return

  const found = (opStore.shipList as any[]).find(w => w.id === targetId || w.orderNo === targetId || w.shipOrderNo === targetId)
  if (!found) return

  editModeId.value = editId ? found.id : null
  form.shipOrderNo = editId ? (found.orderNo || found.shipOrderNo) : archiveStore.generateNewWaybillNo()
  form.destCity = found.destCity || '长沙'
  form.endNetwork = found.destGroup || found.endNetwork || '长沙分部'
  form.goodsNo = found.goodsNo || ''
  form.manualNo = found.manualNo || ''
  form.shipperName = found.shipper || found.shipperName || ''
  form.shipperMobile = found.shipPhone || found.shipperMobile || ''
  form.shipperUnit = found.shipUnit || found.shipperCompany || ''
  form.shipperAddress = found.shipAddress || found.shipperAddress || ''
  form.receiverName = found.receiver || found.receiverName || ''
  form.receiverMobile = found.receivePhone || found.receiverMobile || ''
  form.receiverUnit = found.receiveUnit || found.receiverCompany || ''
  form.receiverAddress = found.receiveAddress || found.receiverAddress || ''

  if (goodsRows.value[0]) {
    goodsRows.value[0].goodsName = found.goodsName || '普货'
    goodsRows.value[0].pack = found.pack || '纸箱'
    goodsRows.value[0].num = String(found.numberCount || found.num || 1)
    goodsRows.value[0].weight = String(found.weightCount || found.weight || 10)
    goodsRows.value[0].volume = String(found.volumeCount || found.volume || 0.1)
    goodsRows.value[0].baseFee = String(found.freight || found.baseFee || 50)
  }

  form.payType = found.payModeStr || found.payType || '现付'
  form.cashPay = String(found.fCash || found.cashPay || '')
  form.collectPay = String(found.fCollect || found.collectPay || '')
  form.receiptPay = String(found.receiptPay || '')
  form.monthPay = String(found.monthPay || '')
  form.deductPay = String(found.deductPay || '')
  form.deliveryFee = String(found.deliveryFee || '')
  form.pickupFee = String(found.pickupFee || '')
  form.insureFee = String(found.insureFee || '')
  form.declaredValue = String(found.declaredValue || '')
  form.agencyFund = String(found.agencyFund || '')
  form.agencyFee = String(found.agencyFee || '')
  form.deliveryType = found.deliveryType
  form.shippingType = found.shippingType
  form.receiptRequirement = found.receiptRequirement
  form.receiptNum = String(found.receiptNum || '')
  form.salesman = found.salesman
  form.remark = found.remark
}

watch(() => route.query, loadWaybillByQuery, { immediate: true })

const onSettingCommand = (cmd: string) => {
  settingDrawersRef.value?.openSetting(cmd)
}

const handleGlobalKeydown = (e: KeyboardEvent) => {
  if (e.key === 'F5') {
    e.preventDefault()
    handleSave(false)
  } else if (e.key === 'F6') {
    e.preventDefault()
    handleSave(true)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleGlobalKeydown)
})
</script>

<style scoped lang="scss">
.kb-add-ship-page {
  padding: 6px;
  background: #f0f2f5;
  min-height: calc(100vh - 84px);
  font-size: 12px;
  color: #303133;

  :deep(.el-input__wrapper),
  :deep(.el-select__wrapper) {
    min-height: 26px !important;
    height: 26px !important;
    padding: 0 6px !important;
    font-size: 12px !important;
    border-radius: 2px !important;
  }

  :deep(.el-input__inner) {
    height: 24px !important;
    line-height: 24px !important;
    font-size: 12px !important;
  }
}

.edit-mode-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fdf6ec;
  border: 1px solid #f5dab1;
  color: #e6a23c;
  padding: 6px 12px;
  margin-bottom: 6px;
  border-radius: 3px;
}

.ship-card-body {
  background: #fff;
  border: 1px solid #dcdfe6;
  padding: 8px;
}

.req {
  color: #f56c6c;
  margin-right: 2px;
}

/* 1. Top Row */
.top-route-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 8px;

  .tr-cell {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 135px;

    &.tr-cell-wide {
      min-width: 195px;
      flex: 1.3;
    }

    .tr-label {
      white-space: nowrap;
      margin-right: 4px;
      color: #606266;
      font-size: 12px;
    }
  }
}

/* 2. Dual Shipper & Receiver */
.party-dual-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;

  .party-panel {
    display: flex;
    border: 1px solid #dcdfe6;
    background: #fff;

    .party-fields-grid {
      flex: 1;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 10px;
      padding: 8px 10px;

      .pf-cell {
        display: flex;
        align-items: center;

        &.pf-span-2 {
          grid-column: span 2;
        }

        .pf-label {
          width: 62px;
          text-align: right;
          margin-right: 6px;
          white-space: nowrap;
          color: #606266;
          flex-shrink: 0;
        }
      }
    }
  }
}

.side-badge {
  width: 28px;
  background: #ecf5ff;
  border-right: 1px solid #dcdfe6;
  color: #303133;
  font-weight: 700;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.35;
  flex-shrink: 0;
  user-select: none;
}

/* 3. Section Block */
.section-block {
  display: flex;
  border: 1px solid #dcdfe6;
  margin-bottom: 8px;
  background: #fff;
}

.goods-table-area {
  flex: 1;
  display: flex;
  flex-direction: column;

  .goods-head-row,
  .goods-body-row {
    display: grid;
    grid-template-columns: 32px repeat(10, 1fr);
    align-items: center;
  }

  .goods-head-row {
    background: #f5f7fa;
    border-bottom: 1px solid #dcdfe6;
    font-weight: 600;
    color: #303133;

    .g-col {
      padding: 5px 4px;
      text-align: center;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border-right: none;
      }
    }
  }

  .goods-body-row {
    border-bottom: 1px solid #ebeef5;
    &:last-child {
      border-bottom: none;
    }

    .g-col {
      padding: 3px 4px;
      border-right: 1px solid #ebeef5;
      &:last-child {
        border-right: none;
      }
    }

    .g-op {
      display: flex;
      justify-content: center;
      align-items: center;

      .op-btn {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        cursor: pointer;
        font-size: 13px;
        line-height: 1;

        &.plus {
          color: #409eff;
          border: 1px solid #409eff;
          &:hover {
            background: #409eff;
            color: #fff;
          }
        }
        &.minus {
          color: #f56c6c;
          border: 1px solid #f56c6c;
          &:hover {
            background: #f56c6c;
            color: #fff;
          }
        }
      }
    }
  }
}

.fee-grid-area {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 6px 8px;
  padding: 8px 10px;
}

.service-grid-area {
  flex: 1;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  .srv-row-1 {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 8px;
  }

  .srv-row-2 {
    display: flex;
    .remark-full {
      flex: 1;
    }
  }
}

.fee-cell {
  display: flex;
  align-items: center;

  .fee-label {
    white-space: nowrap;
    margin-right: 4px;
    color: #606266;
    min-width: 50px;
    text-align: right;
  }
}

.red-bold-input {
  :deep(.el-input__inner) {
    color: #d9001b !important;
    font-weight: 700 !important;
  }
}

/* 6. Bottom Bar */
.bottom-action-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px 2px;

  .print-checks {
    display: flex;
    align-items: center;
    gap: 6px;

    .label-num-input {
      width: 52px;
    }
  }

  .main-save-btns {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .right-gear-wrap {
    .gear-trigger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 4px;
      cursor: pointer;
      color: #606266;
      font-size: 16px;

      &:hover {
        background: #ecf5ff;
        color: #409eff;
      }
    }
  }
}
</style>
