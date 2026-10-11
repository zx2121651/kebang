<template>
  <div class="finance-engine-page">
    <!-- 顶部财务概览 KPI 条 -->
    <div class="fin-kpi-strip">
      <div class="kpi-box">
        <div class="kpi-label">{{ kpiConfig.label1 }}</div>
        <div class="kpi-val primary">¥ {{ kpiConfig.val1 }}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">{{ kpiConfig.label2 }}</div>
        <div class="kpi-val success">¥ {{ kpiConfig.val2 }}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">{{ kpiConfig.label3 }}</div>
        <div class="kpi-val danger">¥ {{ kpiConfig.val3 }}</div>
      </div>
      <div class="kpi-box">
        <div class="kpi-label">当前页单据笔数</div>
        <div class="kpi-val">{{ currentTableData.length }} 笔</div>
      </div>
    </div>

    <!-- 筛选搜索栏 -->
    <div class="fin-filter-card">
      <el-form :inline="true" :model="filterForm" size="small" class="fin-filter-form">
        <el-form-item label="所属网点">
          <el-select v-model="filterForm.network" placeholder="全部网点" clearable style="width: 130px">
            <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键字检索">
          <el-input
            v-model="filterForm.keyword"
            placeholder="单号/客户名称/车牌号/司机/手机号"
            clearable
            style="width: 220px"
            @keyup.enter="handleSearch"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="全部状态" clearable style="width: 120px">
            <el-option label="未结算/未核销" value="未" />
            <el-option label="已结算/已核销" value="已" />
            <el-option label="已审核" value="已审核" />
            <el-option label="未审核" value="未审核" />
          </el-select>
        </el-form-item>
        <el-form-item label="业务日期">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">搜 索</el-button>
          <el-button :icon="RefreshRight" @click="resetFilter">重 置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 动作工具栏 (根据当前子路由动态渲染原版按钮) -->
    <div class="fin-toolbar">
      <div class="left-btns">
        <!-- 1. 出车费用 -->
        <template v-if="pageKey === 'fcar'">
          <el-button size="small" type="primary" :icon="Plus" @click="openCarFeeDialog()">新增出车费</el-button>
          <el-button size="small" :icon="Edit" @click="editSelectedCarFee">修改</el-button>
          <el-button size="small" type="success" :icon="Check" @click="batchAuditCarFee('已审核')">审核</el-button>
          <el-button size="small" type="warning" @click="batchAuditCarFee('未审核')">反审核</el-button>
          <el-button size="small" type="primary" plain @click="openSettleFromCarFee">结算车费</el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="deleteSelectedCarFee">删除</el-button>
        </template>

        <!-- 2. 投保记录 -->
        <template v-else-if="pageKey === 'insurelist'">
          <el-button size="small" type="primary" @click="insureBalanceVisible = true">💰 保险账户余额查询 / 充值</el-button>
          <el-button size="small" type="success" :icon="Plus" @click="openAddInsureDialog">手动补录投保单</el-button>
        </template>

        <!-- 3. 应收账款 / 应付账款 / 6大往来对账 -->
        <template v-else-if="isArApOrReconcilePage">
          <el-button
            v-if="pageKey !== 'fpay' && pageKey !== 'fcarrier' && pageKey !== 'fdriver'"
            size="small"
            type="primary"
            :icon="Check"
            @click="openSettleDialog('收款单')"
          >
            创建收款单 (核销)
          </el-button>
          <el-button
            v-if="pageKey === 'fpay' || pageKey === 'fcarrier' || pageKey === 'fdriver' || pageKey === 'fgroup' || pageKey === 'fgrouptran'"
            size="small"
            type="warning"
            :icon="Check"
            @click="openSettleDialog('付款单')"
          >
            创建付款单 (核销)
          </el-button>
          <el-button size="small" type="success" :icon="Plus" @click="openCreateDzDialog">
            创建对账单
          </el-button>
        </template>

        <!-- 4. 对账单 -->
        <template v-else-if="pageKey === 'fdz'">
          <el-button size="small" type="success" :icon="Check" @click="auditReconcileBill">审核对账单</el-button>
          <el-button size="small" type="primary" @click="settleReconcileBill">一键收付款核销</el-button>
        </template>

        <!-- 5. 交账单 -->
        <template v-else-if="pageKey === 'fjzd'">
          <el-button size="small" type="primary" :icon="Plus" @click="handoverDialogVisible = true">创建营业交账单</el-button>
          <el-button size="small" type="success" :icon="Check" @click="auditHandoverBill">接收并审核交账</el-button>
        </template>

        <!-- 6. 收款单 / 付款单 / 收支明细 -->
        <template v-else-if="pageKey === 'fsk' || pageKey === 'ffk' || pageKey === 'fhk'">
          <el-button
            size="small"
            type="primary"
            :icon="Plus"
            @click="openManualVoucherDialog(pageKey === 'ffk' ? '付款单' : '收款单')"
          >
            {{ pageKey === 'ffk' ? '新增日常付款单' : '新增日常收款单' }}
          </el-button>
        </template>

        <!-- 7. 资金账 -->
        <template v-else-if="pageKey === 'fund'">
          <el-button size="small" type="primary" :icon="Plus" @click="transferDialogVisible = true">💸 内部资金调拨转账</el-button>
          <el-button size="small" type="success" @click="addAccountDialogVisible = true">+ 新增资金账户</el-button>
        </template>

        <el-button size="small" :icon="Printer" @click="handlePrintCurrent">打印凭证/报表</el-button>
        <el-button size="small" :icon="Download" @click="exportCurrentCsv">导出 Excel</el-button>
      </div>

      <div class="right-info">
        <span>已选 <b>{{ selectedRows.length }}</b> 条</span>
      </div>
    </div>

    <!-- 主数据表格 -->
    <div class="fin-table-wrap">
      <!-- A. 出车费用表 -->
      <el-table
        v-if="pageKey === 'fcar'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="batchNo" label="发车批次号" width="135" fixed="left" />
        <el-table-column prop="transType" label="配载类型" width="95" align="center" />
        <el-table-column prop="departDate" label="发车时间" width="150" />
        <el-table-column prop="startNetwork" label="发车网点" width="100" />
        <el-table-column prop="endNetwork" label="到达网点" width="110" />
        <el-table-column prop="plateNo" label="车牌号码" width="115" />
        <el-table-column prop="driverName" label="随车司机" width="90" />
        <el-table-column prop="driverPhone" label="司机电话" width="115" />
        <el-table-column prop="totalDriverFee" label="大车总运费" width="105" align="right" />
        <el-table-column prop="prepayFee" label="预付车费" width="95" align="right" />
        <el-table-column prop="arrivePayFee" label="到付车费" width="95" align="right" />
        <el-table-column prop="oilCardFee" label="油卡费" width="90" align="right" />
        <el-table-column prop="loadFee" label="装卸费" width="85" align="right" />
        <el-table-column prop="settledAmount" label="已结金额" width="95" align="right" />
        <el-table-column prop="unsettledAmount" label="未结余额" width="95" align="right" />
        <el-table-column prop="auditStatus" label="审核状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.auditStatus === '已审核' ? 'success' : 'warning'" size="small">{{ row.auditStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="settleStatus" label="结算状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.settleStatus === '已结清' ? 'success' : row.settleStatus === '部分结算' ? 'primary' : 'danger'" size="small">
              {{ row.settleStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="150" show-overflow-tooltip />
      </el-table>

      <!-- B. 投保记录表 -->
      <el-table
        v-else-if="pageKey === 'insurelist'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="policyNo" label="电子保单号" width="165" fixed="left" />
        <el-table-column prop="shipOrderNo" label="关联运单号" width="135" />
        <el-table-column prop="createTime" label="投保时间" width="155" />
        <el-table-column prop="startNetwork" label="投保网点" width="100" />
        <el-table-column prop="destCity" label="目的地" width="95" />
        <el-table-column prop="shipperName" label="投保发货人" width="100" />
        <el-table-column prop="receiverName" label="收货人" width="100" />
        <el-table-column prop="goodsName" label="保险标的物" width="110" />
        <el-table-column prop="num" label="件数" width="75" align="right" />
        <el-table-column prop="declaredValue" label="声明保额(元)" width="120" align="right" />
        <el-table-column prop="premiumFee" label="实缴保费(元)" width="110" align="right" />
        <el-table-column prop="insureCompany" label="承保保险公司" width="150" />
        <el-table-column prop="status" label="保单状态" width="95" align="center">
          <template #default="{ row }">
            <el-tag type="success" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="previewPolicy(row)">查看电子保单</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- C. 对账单表 -->
      <el-table
        v-else-if="pageKey === 'fdz'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="dzNo" label="对账单号" width="150" fixed="left" />
        <el-table-column prop="dzType" label="对账类型" width="125" />
        <el-table-column prop="targetName" label="往来对账单位/对象" width="210" show-overflow-tooltip />
        <el-table-column prop="targetPhone" label="联系电话" width="125" />
        <el-table-column prop="billCount" label="包含单据(票)" width="110" align="right" />
        <el-table-column prop="totalAmount" label="对账总金额(元)" width="125" align="right" />
        <el-table-column prop="settledAmount" label="已核销金额" width="115" align="right" />
        <el-table-column prop="unsettledAmount" label="未核销余额" width="115" align="right" />
        <el-table-column prop="status" label="状态" width="95" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '已核销' ? 'success' : row.status === '已审核' ? 'primary' : 'warning'" size="small">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="creator" label="制单人" width="90" />
        <el-table-column prop="createTime" label="创建时间" width="155" />
        <el-table-column prop="remark" label="对账说明" min-width="180" show-overflow-tooltip />
      </el-table>

      <!-- D. 交账单表 -->
      <el-table
        v-else-if="pageKey === 'fjzd'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="jzdNo" label="交账单号" width="150" fixed="left" />
        <el-table-column prop="network" label="交账网点" width="115" />
        <el-table-column prop="handoverPerson" label="交账营业员" width="105" />
        <el-table-column prop="acceptPerson" label="接账财务" width="105" />
        <el-table-column prop="orderCount" label="交账票数" width="95" align="right" />
        <el-table-column prop="spotIncome" label="现付运费收入" width="120" align="right" />
        <el-table-column prop="collectPayment" label="收回代收货款" width="120" align="right" />
        <el-table-column prop="outgoExpense" label="日常外发支出" width="120" align="right" />
        <el-table-column prop="netHandoverAmount" label="应交净额(元)" width="125" align="right" />
        <el-table-column prop="status" label="交账状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '已审核' ? 'success' : 'warning'" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="交账时间" min-width="155" />
      </el-table>

      <!-- E. 收款单 / 付款单 / 收支明细 -->
      <el-table
        v-else-if="pageKey === 'fsk' || pageKey === 'ffk' || pageKey === 'fhk'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="voucherNo" label="结算凭证单号" width="155" fixed="left" />
        <el-table-column prop="voucherType" label="收支类型" width="95" align="center">
          <template #default="{ row }">
            <el-tag :type="row.voucherType === '收款单' ? 'success' : 'danger'" size="small">{{ row.voucherType }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="targetName" label="往来单位/结算人" width="210" show-overflow-tooltip />
        <el-table-column prop="feeCategory" label="费用科目" width="135" />
        <el-table-column prop="amount" label="结算金额(元)" width="120" align="right" />
        <el-table-column prop="payMethod" label="支付方式" width="105" align="center" />
        <el-table-column prop="fundAccount" label="入账/出账资金户" width="175" show-overflow-tooltip />
        <el-table-column prop="operator" label="经办人" width="90" />
        <el-table-column prop="auditStatus" label="审核状态" width="95" align="center">
          <template #default="{ row }">
            <el-tag type="success" size="small">{{ row.auditStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="结算时间" width="155" />
        <el-table-column prop="remark" label="摘要说明" min-width="180" show-overflow-tooltip />
      </el-table>

      <!-- F. 资金账表 -->
      <el-table
        v-else-if="pageKey === 'fund'"
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="accountCode" label="账户编码" width="135" fixed="left" />
        <el-table-column prop="accountName" label="资金账户名称" width="195" />
        <el-table-column prop="accountType" label="账户性质" width="110" align="center" />
        <el-table-column prop="bankName" label="开户银行/机构" width="190" show-overflow-tooltip />
        <el-table-column prop="cardNo" label="银行账号/商户号" width="180" />
        <el-table-column prop="network" label="归属网点" width="110" />
        <el-table-column prop="initBalance" label="期初余额(元)" width="125" align="right" />
        <el-table-column prop="periodIncome" label="本期收入(借)" width="125" align="right" />
        <el-table-column prop="periodExpense" label="本期支出(贷)" width="125" align="right" />
        <el-table-column prop="currentBalance" label="期末可用余额(元)" width="140" align="right">
          <template #default="{ row }">
            <b style="color: #409eff">¥ {{ row.currentBalance.toLocaleString() }}</b>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="85" align="center">
          <template #default="{ row }">
            <el-tag type="success" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- G. 默认：应收账款 / 应付账款 / 6大往来对账台账 -->
      <el-table
        v-else
        :data="currentTableData"
        border
        stripe
        size="small"
        height="100%"
        show-summary
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="billNo" label="账款流水号" width="135" fixed="left" />
        <el-table-column prop="shipOrderNo" label="关联单号" width="130" />
        <el-table-column prop="direction" label="方向" width="75" align="center">
          <template #default="{ row }">
            <el-tag :type="row.direction === '应收' ? 'success' : 'warning'" size="small">{{ row.direction }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="targetName" label="往来结算对象" width="200" show-overflow-tooltip />
        <el-table-column prop="targetPhone" label="联系电话" width="120" />
        <el-table-column prop="network" label="发生网点" width="105" />
        <el-table-column prop="destCity" label="到站城市" width="95" />
        <el-table-column prop="feeType" label="费用项目" width="115" />
        <el-table-column prop="payType" label="结算方式" width="90" align="center" />
        <el-table-column prop="totalAmount" label="账款总额(元)" width="115" align="right" />
        <el-table-column prop="settledAmount" label="已核销(元)" width="105" align="right" />
        <el-table-column prop="unsettledAmount" label="未核销余额(元)" width="120" align="right">
          <template #default="{ row }">
            <b :style="{ color: row.unsettledAmount > 0 ? '#f56c6c' : '#67c23a' }">{{ row.unsettledAmount }}</b>
          </template>
        </el-table-column>
        <el-table-column prop="settleStatus" label="核销状态" width="95" align="center">
          <template #default="{ row }">
            <el-tag :type="row.settleStatus === '已核销' ? 'success' : row.settleStatus === '部分核销' ? 'primary' : 'danger'" size="small">
              {{ row.settleStatus }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="goodsName" label="品名" width="100" />
        <el-table-column prop="num" label="件数" width="70" align="right" />
        <el-table-column prop="createTime" label="业务时间" min-width="155" />
      </el-table>
    </div>

    <!-- 弹窗 1：收付款核销弹窗 -->
    <el-dialog v-model="settleDialogVisible" :title="`财务结算核销 - 生成${settleForm.voucherType}`" width="540px" append-to-body>
      <el-form :model="settleForm" label-width="115px" size="small">
        <el-form-item label="核销单据笔数：">
          <el-tag type="primary">{{ selectedRows.length || 1 }} 笔</el-tag>
        </el-form-item>
        <el-form-item label="本次核销金额：">
          <b style="font-size: 18px; color: #f56c6c">¥ {{ settleForm.amount }}</b>
        </el-form-item>
        <el-form-item label="资金结算账户：">
          <el-select v-model="settleForm.accountName" style="width: 100%">
            <el-option
              v-for="acc in entStore.fundAccounts"
              :key="acc.id"
              :label="`${acc.accountName} (余额: ¥${acc.currentBalance})`"
              :value="acc.accountName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="收付结算方式：">
          <el-radio-group v-model="settleForm.payMethod">
            <el-radio label="银行转账">银行转账</el-radio>
            <el-radio label="微信支付">微信支付</el-radio>
            <el-radio label="支付宝">支付宝</el-radio>
            <el-radio label="现金">现金</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="核销备注摘要：">
          <el-input v-model="settleForm.remark" type="textarea" :rows="2" placeholder="输入收付款流水号或摘要说明" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="settleDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmSettleArAp">确认核销并生成{{ settleForm.voucherType }}</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗 2：新增/修改出车费用弹窗 (含车牌号智能联想) -->
    <el-dialog v-model="carFeeDialogVisible" :title="carFeeForm.id ? '修改出车费用' : '新增出车费用'" width="580px" append-to-body>
      <el-form :model="carFeeForm" label-width="110px" size="small">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="发车批次号：">
              <el-input v-model="carFeeForm.batchNo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="配载类型：">
              <el-select v-model="carFeeForm.transType" style="width: 100%">
                <el-option label="干线配载" value="干线配载" />
                <el-option label="短途配载" value="短途配载" />
                <el-option label="送货上门" value="送货上门" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌号码：">
              <VehiclePopoverInput v-model="carFeeForm.plateNo" @select="onSelectCarFeeVehicle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="随车司机：">
              <el-input v-model="carFeeForm.driverName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机手机：">
              <el-input v-model="carFeeForm.driverPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到达网点：">
              <el-select v-model="carFeeForm.endNetwork" style="width: 100%">
                <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大车总运费：">
              <el-input-number v-model="carFeeForm.totalDriverFee" :min="0" :step="100" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付车费：">
              <el-input-number v-model="carFeeForm.prepayFee" :min="0" :step="100" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到付车费：">
              <el-input-number v-model="carFeeForm.arrivePayFee" :min="0" :step="100" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="油卡费用：">
              <el-input-number v-model="carFeeForm.oilCardFee" :min="0" :step="100" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="费用备注：">
          <el-input v-model="carFeeForm.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="carFeeDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveCarFee">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗 3：投保余额查询与充值 -->
    <el-dialog v-model="insureBalanceVisible" title="货运险电子投保账户余额与充值" width="460px" append-to-body>
      <div style="text-align: center; padding: 12px 0 20px">
        <div style="color: #909399; font-size: 13px">当前企业平安/太平洋货运险预存余额</div>
        <div style="font-size: 28px; font-weight: 700; color: #67c23a; margin: 10px 0">
          ¥ {{ entStore.insureAccountBalance.toFixed(2) }}
        </div>
        <el-form inline size="small" style="margin-top: 14px">
          <el-form-item label="充值金额(元)：">
            <el-input-number v-model="rechargeAmount" :min="500" :step="500" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleRechargeInsure">立即充值</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 弹窗 4：内部资金调拨转账 -->
    <el-dialog v-model="transferDialogVisible" title="资金账户内部调拨转账" width="480px" append-to-body>
      <el-form :model="transferForm" label-width="110px" size="small">
        <el-form-item label="转出资金账户：">
          <el-select v-model="transferForm.fromAccount" style="width: 100%">
            <el-option v-for="a in entStore.fundAccounts" :key="a.id" :label="`${a.accountName} (¥${a.currentBalance})`" :value="a.accountName" />
          </el-select>
        </el-form-item>
        <el-form-item label="转入资金账户：">
          <el-select v-model="transferForm.toAccount" style="width: 100%">
            <el-option v-for="a in entStore.fundAccounts" :key="a.id" :label="`${a.accountName} (¥${a.currentBalance})`" :value="a.accountName" />
          </el-select>
        </el-form-item>
        <el-form-item label="调拨金额(元)：">
          <el-input-number v-model="transferForm.amount" :min="100" :step="1000" style="width: 100%" />
        </el-form-item>
        <el-form-item label="调拨摘要：">
          <el-input v-model="transferForm.remark" placeholder="如：营业厅现金缴存银行基本户" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="transferDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmTransferFund">确认调拨</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗 5：创建营业交账单 -->
    <el-dialog v-model="handoverDialogVisible" title="创建日常营业交账单" width="480px" append-to-body>
      <el-form :model="handoverForm" label-width="115px" size="small">
        <el-form-item label="交账网点：">
          <el-select v-model="handoverForm.network" style="width: 100%">
            <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="交账营业员：">
          <el-input v-model="handoverForm.handoverPerson" />
        </el-form-item>
        <el-form-item label="现付运费收入：">
          <el-input-number v-model="handoverForm.spotIncome" :min="0" :step="500" style="width: 100%" />
        </el-form-item>
        <el-form-item label="代收货款收回：">
          <el-input-number v-model="handoverForm.collectPayment" :min="0" :step="1000" style="width: 100%" />
        </el-form-item>
        <el-form-item label="日常外发支出：">
          <el-input-number v-model="handoverForm.outgoExpense" :min="0" :step="100" style="width: 100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="handoverDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveHandoverBill">提交交账单</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search, RefreshRight, Plus, Edit, Delete, Check, Printer, Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useEnterpriseStore, type CarFeeRecord } from '@/store/enterprise'
import { useArchiveStore, type VehicleArchiveItem } from '@/store/dictionaryAndArchive'
import VehiclePopoverInput from '@/views/operation/components/VehiclePopoverInput.vue'

const route = useRoute()
const entStore = useEnterpriseStore()
const archiveStore = useArchiveStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'fincome'
})

const isArApOrReconcilePage = computed(() =>
  ['fincome', 'fpay', 'fshipper', 'freceiver', 'fcarrier', 'fdriver', 'fgroup', 'fgrouptran'].includes(pageKey.value)
)

const filterForm = reactive({
  network: '',
  keyword: '',
  status: '',
  dateRange: [] as string[]
})

const selectedRows = ref<any[]>([])
const onSelectionChange = (rows: any[]) => {
  selectedRows.value = rows
}

const currentTableData = computed(() => {
  const kw = filterForm.keyword.trim().toLowerCase()
  const st = filterForm.status

  if (pageKey.value === 'fcar') {
    return entStore.carFeeList.filter(r => {
      if (filterForm.network && r.startNetwork !== filterForm.network && r.endNetwork !== filterForm.network) return false
      if (st && !r.settleStatus.includes(st) && !r.auditStatus.includes(st)) return false
      if (kw && !`${r.batchNo}${r.plateNo}${r.driverName}${r.driverPhone}`.toLowerCase().includes(kw)) return false
      return true
    })
  }
  if (pageKey.value === 'insurelist') {
    return entStore.insureList.filter(r => {
      if (kw && !`${r.policyNo}${r.shipOrderNo}${r.shipperName}${r.receiverName}`.toLowerCase().includes(kw)) return false
      return true
    })
  }
  if (pageKey.value === 'fdz') {
    return entStore.reconcileBills.filter(r => !kw || `${r.dzNo}${r.targetName}`.toLowerCase().includes(kw))
  }
  if (pageKey.value === 'fjzd') {
    return entStore.handoverBills.filter(r => !kw || `${r.jzdNo}${r.handoverPerson}`.toLowerCase().includes(kw))
  }
  if (pageKey.value === 'fsk') {
    return entStore.settlementVouchers.filter(r => r.voucherType === '收款单' && (!kw || `${r.voucherNo}${r.targetName}`.toLowerCase().includes(kw)))
  }
  if (pageKey.value === 'ffk') {
    return entStore.settlementVouchers.filter(r => r.voucherType === '付款单' && (!kw || `${r.voucherNo}${r.targetName}`.toLowerCase().includes(kw)))
  }
  if (pageKey.value === 'fhk') {
    return entStore.settlementVouchers.filter(r => !kw || `${r.voucherNo}${r.targetName}${r.feeCategory}`.toLowerCase().includes(kw))
  }
  if (pageKey.value === 'fund') {
    return entStore.fundAccounts.filter(r => !kw || `${r.accountName}${r.bankName}`.toLowerCase().includes(kw))
  }

  // 应收 / 应付 / 6大对账过滤
  return entStore.arApList.filter(r => {
    if (pageKey.value === 'fincome' && r.direction !== '应收') return false
    if (pageKey.value === 'fpay' && r.direction !== '应付') return false
    if (pageKey.value === 'fshipper' && r.targetType !== 'shipper') return false
    if (pageKey.value === 'freceiver' && r.targetType !== 'receiver') return false
    if (pageKey.value === 'fcarrier' && r.targetType !== 'carrier') return false
    if (pageKey.value === 'fdriver' && r.targetType !== 'driver') return false
    if ((pageKey.value === 'fgroup' || pageKey.value === 'fgrouptran') && r.targetType !== 'branch' && r.targetType !== 'driver') return false
    if (filterForm.network && r.network !== filterForm.network) return false
    if (st && !r.settleStatus.includes(st) && !r.auditStatus.includes(st)) return false
    if (kw && !`${r.billNo}${r.shipOrderNo}${r.targetName}${r.targetPhone}`.toLowerCase().includes(kw)) return false
    return true
  })
})

const kpiConfig = computed(() => {
  if (pageKey.value === 'fund') {
    const total = entStore.fundAccounts.reduce((s, a) => s + a.currentBalance, 0)
    const inc = entStore.fundAccounts.reduce((s, a) => s + a.periodIncome, 0)
    const exp = entStore.fundAccounts.reduce((s, a) => s + a.periodExpense, 0)
    return { label1: '资金账户期末总余额', val1: total.toLocaleString(), label2: '本期累计总收入', val2: inc.toLocaleString(), label3: '本期累计总支出', val3: exp.toLocaleString() }
  }
  if (pageKey.value === 'insurelist') {
    const totalVal = entStore.insureList.reduce((s, i) => s + i.declaredValue, 0)
    const totalFee = entStore.insureList.reduce((s, i) => s + i.premiumFee, 0)
    return { label1: '累计承保声明总价值', val1: totalVal.toLocaleString(), label2: '保险预存账户可用余额', val2: entStore.insureAccountBalance.toLocaleString(), label3: '累计实缴保费支出', val3: totalFee.toLocaleString() }
  }
  const rows: any[] = currentTableData.value
  const total = rows.reduce((s, r) => s + Number(r.totalAmount || r.totalDriverFee || r.amount || r.netHandoverAmount || 0), 0)
  const settled = rows.reduce((s, r) => s + Number(r.settledAmount || r.amount || r.spotIncome || 0), 0)
  const unsettled = rows.reduce((s, r) => s + Number(r.unsettledAmount || 0), 0)
  return { label1: '本页账款/单据总额', val1: total.toLocaleString(), label2: '已结算/已核销金额', val2: settled.toLocaleString(), label3: '未结算/待核销余额', val3: unsettled.toLocaleString() }
})

const handleSearch = () => {
  ElMessage.success(`已检索【${route.meta.title}】共 ${currentTableData.value.length} 条记录`)
}
const resetFilter = () => {
  filterForm.network = ''
  filterForm.keyword = ''
  filterForm.status = ''
  filterForm.dateRange = []
}

// 1. 出车费用操作
const carFeeDialogVisible = ref(false)
const carFeeForm = reactive<CarFeeRecord>({
  id: '',
  batchNo: 'GX260411008',
  transType: '干线配载',
  departDate: '2026-04-11 10:00:00',
  startNetwork: '总部',
  endNetwork: '衡阳营业部',
  plateNo: '',
  driverName: '',
  driverPhone: '',
  totalDriverFee: 4500,
  prepayFee: 1500,
  arrivePayFee: 2000,
  oilCardFee: 1000,
  returnPayFee: 0,
  loadFee: 200,
  settledAmount: 0,
  unsettledAmount: 4500,
  auditStatus: '未审核',
  settleStatus: '未结算',
  remark: ''
})

const openCarFeeDialog = (row?: CarFeeRecord) => {
  if (row) {
    Object.assign(carFeeForm, row)
  } else {
    carFeeForm.id = ''
    carFeeForm.batchNo = `GX${Date.now().toString().slice(-8)}`
    carFeeForm.plateNo = ''
    carFeeForm.driverName = ''
    carFeeForm.driverPhone = ''
    carFeeForm.totalDriverFee = 4500
    carFeeForm.unsettledAmount = 4500
  }
  carFeeDialogVisible.value = true
}

const onSelectCarFeeVehicle = (v: VehicleArchiveItem) => {
  carFeeForm.plateNo = v.plateNo
  carFeeForm.driverName = v.driverName
  carFeeForm.driverPhone = v.driverPhone
}

const saveCarFee = () => {
  if (!carFeeForm.plateNo) {
    ElMessage.warning('请选择或输入车牌号码')
    return
  }
  carFeeForm.unsettledAmount = Math.max(0, carFeeForm.totalDriverFee - carFeeForm.settledAmount)
  if (carFeeForm.id) {
    const idx = entStore.carFeeList.findIndex(r => r.id === carFeeForm.id)
    if (idx !== -1) entStore.carFeeList[idx] = { ...carFeeForm }
    ElMessage.success('出车费用修改成功')
  } else {
    entStore.carFeeList.unshift({
      ...carFeeForm,
      id: `CF${Date.now().toString().slice(-5)}`
    })
    ElMessage.success('新增出车费用已保存')
  }
  carFeeDialogVisible.value = false
}

const editSelectedCarFee = () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选一条出车费用记录')
    return
  }
  openCarFeeDialog(selectedRows.value[0])
}

const batchAuditCarFee = (status: '已审核' | '未审核') => {
  const targets = selectedRows.value.length ? selectedRows.value : entStore.carFeeList.slice(0, 1)
  targets.forEach((r: CarFeeRecord) => {
    r.auditStatus = status
  })
  ElMessage.success(`已将 ${targets.length} 笔出车费用置为【${status}】`)
}

const openSettleFromCarFee = () => {
  const targets = selectedRows.value.length ? selectedRows.value : entStore.carFeeList.filter(r => r.unsettledAmount > 0).slice(0, 1)
  if (!targets.length) {
    ElMessage.info('当前无可结算的未结出车费')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  let totalSettle = 0
  targets.forEach((r: CarFeeRecord) => {
    totalSettle += r.unsettledAmount
    r.settledAmount = r.totalDriverFee
    r.unsettledAmount = 0
    r.settleStatus = '已结清'
  })
  if (totalSettle > 0) {
    const acc = entStore.fundAccounts.find(a => a.accountName === '工商银行广州白云基本户') || entStore.fundAccounts[0]
    if (acc) {
      acc.periodExpense += totalSettle
      acc.currentBalance -= totalSettle
    }
    const voucherNo = `FK${Date.now().toString().slice(-9)}`
    entStore.settlementVouchers.unshift({
      id: voucherNo,
      voucherNo,
      voucherType: '付款单',
      targetName: targets[0].driverName || '司机大车费用',
      feeCategory: '大车司机车费结算',
      amount: totalSettle,
      payMethod: '银行转账',
      fundAccount: acc.accountName,
      bankCardNo: '-',
      operator: 'admin',
      auditStatus: '已审核',
      createTime: now,
      remark: `大车司机费用结清(${targets.length}笔): ${targets.map(t => t.batchNo).join(', ')}`
    })
  }
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '财务中心',
    actionType: '车费结算',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: targets.map(t => t.batchNo).slice(0, 3).join(','),
    detail: `结清大车费用：${targets.map(t => t.batchNo).join(', ')}，金额 ¥${totalSettle}`,
    costMs: '46ms',
    operTime: now
  })
  ElMessage.success(`已成功结算 ${targets.length} 笔大车费用，并生成付款单流水 ¥${totalSettle.toLocaleString()}`)
}

const deleteSelectedCarFee = () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选要删除的记录')
    return
  }
  const ids = selectedRows.value.map(r => r.id)
  entStore.carFeeList = entStore.carFeeList.filter(r => !ids.includes(r.id))
  ElMessage.success('删除成功')
}

// 2. 投保充值与保单预览
const insureBalanceVisible = ref(false)
const rechargeAmount = ref(2000)
const handleRechargeInsure = () => {
  entStore.insureAccountBalance += rechargeAmount.value
  ElMessage.success(`成功充值 ¥${rechargeAmount.value}，当前可用投保余额 ¥${entStore.insureAccountBalance.toFixed(2)}`)
  insureBalanceVisible.value = false
}

const openAddInsureDialog = () => {
  entStore.insureList.unshift({
    id: `INS${Date.now().toString().slice(-4)}`,
    policyNo: `PAIC${Date.now().toString().slice(-11)}`,
    shipOrderNo: 'KB260410099',
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19),
    startNetwork: '总部',
    destCity: '衡阳市',
    shipperName: '张伟',
    receiverName: '唐建国',
    goodsName: '精密设备',
    num: 10,
    declaredValue: 50000,
    premiumFee: 100,
    insureCompany: '中国平安财产保险',
    status: '已生效'
  })
  entStore.insureAccountBalance = Math.max(0, entStore.insureAccountBalance - 100)
  ElMessage.success('已补录货运险电子保单，自动扣减保费 ¥100.00')
}

const previewPolicy = (row: any) => {
  ElMessageBox.alert(
    `<div style="line-height:1.8;font-size:13px">
      <p><b>电子保单号：</b>${row.policyNo}</p>
      <p><b>承保机构：</b>${row.insureCompany}</p>
      <p><b>关联托运单：</b>${row.shipOrderNo}（${row.startNetwork} → ${row.destCity}）</p>
      <p><b>被保险人：</b>${row.shipperName} / ${row.receiverName}</p>
      <p><b>承保货物：</b>${row.goodsName}（${row.num} 件）</p>
      <p><b>保险金额：</b><span style="color:#409eff;font-weight:bold">¥ ${row.declaredValue.toLocaleString()}</span>（保费：¥${row.premiumFee}）</p>
      <p><b>保单状态：</b><span style="color:#67c23a;font-weight:bold">已生效（全国公路货运一切险）</span></p>
    </div>`,
    '公路货运电子保险单凭证',
    { dangerouslyUseHTMLString: true, confirmButtonText: '确定' }
  )
}

// 3. 应收应付核销与对账单生成
const settleDialogVisible = ref(false)
const settleForm = reactive({
  voucherType: '收款单' as '收款单' | '付款单',
  amount: 0,
  accountName: '工商银行广州白云基本户',
  payMethod: '银行转账' as '银行转账' | '微信支付' | '支付宝' | '现金',
  remark: ''
})

const openSettleDialog = (type: '收款单' | '付款单') => {
  const targets = selectedRows.value.length
    ? selectedRows.value
    : currentTableData.value.filter((r: any) => r.unsettledAmount > 0).slice(0, 1)
  if (!targets.length) {
    ElMessage.warning('请勾选需要核销的未结账款记录')
    return
  }
  selectedRows.value = targets
  settleForm.voucherType = type
  settleForm.amount = targets.reduce((s: number, r: any) => s + Number(r.unsettledAmount || r.totalAmount || 0), 0)
  settleForm.remark = `核销 ${targets.map((r: any) => r.shipOrderNo || r.billNo).join(', ')}`
  settleDialogVisible.value = true
}

const confirmSettleArAp = () => {
  const ids = selectedRows.value.map((r: any) => r.id)
  const settled = entStore.settleArApRecords(ids, settleForm.accountName, settleForm.payMethod, settleForm.remark)
  settleDialogVisible.value = false
  ElMessage.success(`核销成功！已生成${settleForm.voucherType}，金额 ¥${settled.toLocaleString()} 已同步记入【${settleForm.accountName}】`)
}

const openCreateDzDialog = () => {
  const targets = selectedRows.value.length ? selectedRows.value : currentTableData.value.slice(0, 2)
  if (!targets.length) {
    ElMessage.warning('请先选择需要加入对账单的记录')
    return
  }
  const bill = entStore.createReconcileBill(String(route.meta.title || '客户对账'), targets.map((r: any) => r.id))
  if (bill) {
    ElMessage.success(`已成功生成对账单【${bill.dzNo}】，可在“财务中心 -> 对账单”中查看核销`)
  }
}

const auditReconcileBill = () => {
  const targets = selectedRows.value.length ? selectedRows.value : entStore.reconcileBills.slice(0, 1)
  targets.forEach((b: any) => {
    if (b.status === '待确认') b.status = '已审核'
  })
  ElMessage.success('对账单审核通过')
}

const settleReconcileBill = () => {
  const targets = selectedRows.value.length ? selectedRows.value : entStore.reconcileBills.filter(b => b.unsettledAmount > 0).slice(0, 1)
  targets.forEach((b: any) => {
    b.settledAmount = b.totalAmount
    b.unsettledAmount = 0
    b.status = '已核销'
  })
  ElMessage.success('对账单已完成收付款核销')
}

// 4. 交账单与日常收付款凭证
const handoverDialogVisible = ref(false)
const handoverForm = reactive({
  network: '总部',
  handoverPerson: '陈静',
  spotIncome: 5600,
  collectPayment: 12000,
  outgoExpense: 800
})

const saveHandoverBill = () => {
  const net = handoverForm.spotIncome + handoverForm.collectPayment - handoverForm.outgoExpense
  entStore.handoverBills.unshift({
    id: `JZD${Date.now().toString().slice(-4)}`,
    jzdNo: `JZ${Date.now().toString().slice(-9)}`,
    network: handoverForm.network,
    handoverPerson: handoverForm.handoverPerson,
    acceptPerson: '王财务',
    orderCount: 11,
    spotIncome: handoverForm.spotIncome,
    collectPayment: handoverForm.collectPayment,
    outgoExpense: handoverForm.outgoExpense,
    netHandoverAmount: net,
    status: '待交账',
    createTime: new Date().toISOString().replace('T', ' ').slice(0, 19)
  })
  handoverDialogVisible.value = false
  ElMessage.success(`营业交账单已生成，应交净额 ¥${net.toLocaleString()}`)
}

const auditHandoverBill = () => {
  entStore.handoverBills.forEach(b => {
    b.status = '已审核'
  })
  ElMessage.success('全部待交账单已接收并审核入账')
}

const openManualVoucherDialog = (type: '收款单' | '付款单') => {
  settleForm.voucherType = type
  settleForm.amount = 1500
  settleForm.remark = `日常${type}记账`
  selectedRows.value = []
  settleDialogVisible.value = true
}

// 5. 内部资金调拨与新增账户
const transferDialogVisible = ref(false)
const addAccountDialogVisible = ref(false)
const transferForm = reactive({
  fromAccount: '总部营业厅现金柜',
  toAccount: '工商银行广州白云基本户',
  amount: 5000,
  remark: '营业厅每日现金缴存银行基本户'
})

const confirmTransferFund = () => {
  if (transferForm.fromAccount === transferForm.toAccount) {
    ElMessage.warning('转出账户与转入账户不能相同')
    return
  }
  const fromAcc = entStore.fundAccounts.find(a => a.accountName === transferForm.fromAccount)
  const toAcc = entStore.fundAccounts.find(a => a.accountName === transferForm.toAccount)
  if (fromAcc && toAcc) {
    fromAcc.periodExpense += transferForm.amount
    fromAcc.currentBalance -= transferForm.amount
    toAcc.periodIncome += transferForm.amount
    toAcc.currentBalance += transferForm.amount
  }
  transferDialogVisible.value = false
  ElMessage.success(`成功将 ¥${transferForm.amount.toLocaleString()} 从【${transferForm.fromAccount}】调拨至【${transferForm.toAccount}】`)
}

const handlePrintCurrent = () => {
  window.print()
}

import { exportTableToCsv } from '@/utils/exportHelper'

const exportCurrentCsv = () => {
  exportTableToCsv(`财务中心_${String(route.meta.title || '单据台账')}_${new Date().toISOString().slice(0, 10)}`, currentTableData.value)
  ElMessage.success(`已导出【${route.meta.title}】共 ${currentTableData.value.length} 条数据至本地文件`)
}
</script>

<style scoped lang="scss">
.finance-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.fin-kpi-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  .kpi-box {
    background: #fff;
    border-radius: 4px;
    padding: 10px 16px;
    border: 1px solid #e4e7ed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .kpi-label {
      font-size: 13px;
      color: #606266;
    }
    .kpi-val {
      font-size: 18px;
      font-weight: 700;
      color: #303133;
      &.primary { color: #409eff; }
      &.success { color: #67c23a; }
      &.danger { color: #f56c6c; }
    }
  }
}
.fin-filter-card {
  background: #fff;
  padding: 10px 14px 0;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  .fin-filter-form {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
}
.fin-toolbar {
  background: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-btns {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .right-info {
    font-size: 12px;
    color: #606266;
  }
}
.fin-table-wrap {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
}
</style>
