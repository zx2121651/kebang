<template>
  <div class="listBox">
    <!-- 顶部查询与操作栏容器 (GbContainer + GbOperationBtns) -->
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 右侧分页器 -->
        <el-row :gutter="5" style="width: 100%; margin: 0;">
          <el-col :span="16" style="padding-left: 0;">
            <el-form :inline="true" size="small" class="listForm" @submit.prevent>
              <!-- 日期类型 + 日期范围 -->
              <el-form-item class="dateItem">
                <el-select v-model="queryForm.timeType" class="width-90">
                  <el-option label="开单日期" :value="0" />
                  <el-option label="托运日期" :value="1" />
                </el-select>
                <el-date-picker
                  v-model="queryForm.dateRange"
                  type="daterange"
                  range-separator="~"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="YYYY-MM-DD"
                  class="width-220"
                  :clearable="false"
                />
              </el-form-item>

              <!-- 始发网点树形多选 -->
              <el-form-item label="始发网点">
                <el-popover
                  placement="bottom-start"
                  :width="220"
                  trigger="click"
                  popper-class="network-tree-popper"
                >
                  <template #reference>
                    <div class="down-tree-select width-150">
                      <div class="down-tree-tags">
                        <span v-if="selectedNetworkNames.length === 0" class="placeholder">请选择</span>
                        <template v-else>
                          <span class="net-tag">
                            <span class="net-tag-text">{{ selectedNetworkNames[0] }}</span>
                            <i class="net-tag-close" @click.stop="removeFirstNetwork">×</i>
                          </span>
                          <span v-if="selectedNetworkNames.length > 1" class="net-tag more">
                            +{{ selectedNetworkNames.length - 1 }}
                          </span>
                        </template>
                      </div>
                      <el-icon class="down-tree-arrow"><ArrowDown /></el-icon>
                    </div>
                  </template>
                  <div class="down-tree-panel">
                    <div class="check-all-row">
                      <el-checkbox
                        v-model="checkAllNetworks"
                        :indeterminate="isNetworkIndeterminate"
                        size="small"
                        @change="handleCheckAllNetworks"
                      >
                        全选
                      </el-checkbox>
                    </div>
                    <el-tree
                      ref="networkTreeRef"
                      :data="networkTreeData"
                      node-key="id"
                      show-checkbox
                      default-expand-all
                      :default-checked-keys="queryForm.networkIds"
                      :props="{ label: 'name', children: 'childs' }"
                      @check="handleNetworkTreeCheck"
                    />
                  </div>
                </el-popover>
              </el-form-item>

              <!-- 上游订单专属快捷筛选：转单状态 & 上游来源平台 -->
              <template v-if="props.source === 5">
                <el-form-item label="转单状态">
                  <el-select v-model="queryForm.shipStatus" style="width: 118px;">
                    <el-option label="全部状态" value="all" />
                    <el-option :label="`待转运单 (${orderStore.pendingUpstreamCount})`" value="pending" />
                    <el-option label="已转运单" value="converted" />
                    <el-option label="已驳回" value="rejected" />
                  </el-select>
                </el-form-item>
                <el-form-item label="上游渠道">
                  <el-select v-model="queryForm.platformKw" clearable placeholder="全部渠道" style="width: 145px;">
                    <el-option label="星云企业互联" value="企业互联" />
                    <el-option label="美的集团OMS" value="美的" />
                    <el-option label="立白物流云ERP" value="立白" />
                    <el-option label="广汽埃安JIS" value="广汽" />
                    <el-option label="菜鸟奇门接口" value="菜鸟" />
                    <el-option label="京东大件EDI" value="京东" />
                  </el-select>
                </el-form-item>
              </template>

              <!-- 查询按钮 + 高级筛选漏斗图标 -->
              <el-form-item>
                <el-button
                  size="small"
                  class="el-button--save"
                  style="background: rgb(79, 119, 203); border-color: rgb(79, 119, 203); color: #fff;"
                  :icon="Search"
                  @click="handleSearch"
                >
                  查询
                </el-button>
                <span
                  class="Filter"
                  title="高级筛选"
                  style="color: rgb(79, 119, 203);"
                  @click="openSeniorFilter"
                >
                  <svg viewBox="0 0 1024 1024" width="17" height="17" fill="currentColor" style="vertical-align: -3px;">
                    <path d="M880.005 96H143.995c-26.51 0-48 21.49-48 48 0 11.24 3.947 22.123 11.147 30.763l276.853 332.224v341.013c0 17.673 14.327 32 32 32 5.621 0 11.147-1.483 16.011-4.299l160-92.544c9.888-5.717 15.989-16.277 15.989-27.701V506.987l276.853-332.224C890.053 166.123 894 155.24 894 144c0-26.51-21.49-48-48-48h34.005zM544 484.352v277.312l-96 55.552V484.352L186.667 160h650.666L544 484.352z" />
                  </svg>
                  <i v-if="seniorConditions.length > 0" class="filter-dot" />
                </span>
              </el-form-item>
            </el-form>
          </el-col>

          <!-- 右侧分页器 GbElPager -->
          <el-col :span="8" style="display: flex; align-items: center; justify-content: flex-end; padding-right: 2px;">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[30, 50, 100, 200]"
              :total="filteredOrders.length"
              small
              layout="total, sizes, prev, pager, next, jumper"
              class="gb-el-pager"
            />
          </el-col>
        </el-row>

        <!-- 第二行：操作按钮栏 GbOperationBtns -->
        <div class="topToolBars opBtnName">
          <el-button
            type="success"
            size="small"
            :icon="Plus"
            @click="handleCreateOrder"
          >
            新增
          </el-button>

          <el-button
            type="success"
            size="small"
            :icon="Edit"
            :disabled="!canEdit"
            @click="handleEditOrder"
          >
            修改
          </el-button>

          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            :disabled="!canDelete"
            @click="handleDeleteOrders"
          >
            删除
          </el-button>

          <el-button
            size="small"
            class="el-button--shortcut"
            :disabled="!canAudit"
            @click="handleAuditOrders"
          >
            审核订单
          </el-button>

          <el-button
            type="danger"
            size="small"
            :icon="Plus"
            :disabled="!canCancelAudit"
            @click="handleCancelAudit"
          >
            取消审核
          </el-button>

          <el-button
            size="small"
            class="el-button--shortcut"
            :icon="Edit"
            :disabled="!canTransferShip"
            @click="handleTransferToShip"
          >
            转入运单
          </el-button>

          <el-button
            type="danger"
            size="small"
            :icon="Delete"
            :disabled="!canCancelTransfer"
            @click="handleCancelTransfer"
          >
            取消转入
          </el-button>

          <!-- 上游订单专属协同操作按钮组 -->
          <template v-if="props.source === 5">
            <el-divider direction="vertical" style="height: 18px; margin: 0 8px;" />
            <el-button
              type="primary"
              size="small"
              :icon="RefreshRight"
              @click="openPullModal"
            >
              同步拉取推单
            </el-button>
            <el-button
              size="small"
              class="el-button--shortcut"
              :icon="Van"
              :disabled="!canAssignPickup"
              @click="openPickupModal"
            >
              派车提货
            </el-button>
            <el-button
              type="warning"
              size="small"
              :icon="Warning"
              :disabled="!canRejectUpstream"
              @click="openRejectModal"
            >
              驳回上游
            </el-button>
            <el-button
              size="small"
              :icon="Document"
              :disabled="selectedRows.length === 0 && pagedOrders.length === 0"
              @click="openTraceDrawer(selectedRows[0] || pagedOrders[0])"
            >
              协同报文与轨迹
            </el-button>
          </template>

          <!-- 右侧：锁定外观 + 列设置 -->
          <div class="otherRight">
            <el-button
              type="primary"
              size="small"
              :icon="Lock"
              @click="handleLockAppearance"
            >
              锁定外观
            </el-button>
            <el-button
              type="primary"
              size="small"
              :icon="Setting"
              @click="openColumnSet"
            >
              列设置
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 中部 60 列数据表格区 GbTable (vxe-grid 1:1 复刻) -->
    <div class="tableBox">
      <div class="gb-vxe-grid tableFont-default">
        <!-- 主滚动区（表头 + 表体） -->
        <div
          ref="tableBodyScrollRef"
          class="gb-vxe-scroll-wrapper"
          @scroll="handleBodyScroll"
        >
          <table class="gb-vxe-table" :style="{ width: totalTableWidth + 'px' }">
            <colgroup>
              <col style="width: 40px;" />
              <col style="width: 50px;" />
              <col
                v-for="col in visibleColumns"
                :key="col.field"
                :style="{ width: (col.width || 110) + 'px' }"
              />
            </colgroup>

            <!-- 60px 双层天蓝色表头 -->
            <thead class="gb-vxe-thead">
              <tr>
                <!-- 复选框列 -->
                <th class="gb-vxe-th col-checkbox sticky-col" style="left: 0; width: 40px; z-index: 15;">
                  <div class="vxe-cell-checkbox-wrap">
                    <el-checkbox
                      v-model="isAllPageSelected"
                      :indeterminate="isPageIndeterminate"
                      size="small"
                      @change="toggleSelectAllPage"
                    />
                  </div>
                </th>

                <!-- 序号列 -->
                <th class="gb-vxe-th col-seq sticky-col" style="left: 40px; width: 50px; z-index: 15;">
                  <div class="th-seq-title">序号</div>
                </th>

                <!-- 60个动态业务列 -->
                <th
                  v-for="col in visibleColumns"
                  :key="col.field"
                  class="gb-vxe-th"
                  :class="getStickyClass(col)"
                  :style="getStickyStyle(col, true)"
                >
                  <div class="th-inner">
                    <!-- 第一层：字段标题 + 排序上下三角 -->
                    <div class="th-title-row">
                      <span class="th-title-text" :title="col.title">{{ col.title }}</span>
                      <span
                        v-if="col.sortable"
                        class="vxe-cell--sort"
                        @click.stop="toggleSort(col.field)"
                      >
                        <i
                          class="vxe-sort--asc-btn"
                          :class="{ active: sortState.field === col.field && sortState.order === 'asc' }"
                        />
                        <i
                          class="vxe-sort--desc-btn"
                          :class="{ active: sortState.field === col.field && sortState.order === 'desc' }"
                        />
                      </span>
                    </div>

                    <!-- 第二层：24px 白色直角过滤输入框 -->
                    <div class="th-filter-row">
                      <el-input
                        v-model="columnFilters[col.field]"
                        size="small"
                        clearable
                        class="header-filter-input"
                        @input="handleColumnFilterInput"
                      />
                    </div>
                  </div>
                  <!-- 列宽拖拽手柄 -->
                  <div
                    class="col-resize-handle"
                    @mousedown.stop="startResizeColumn($event, col)"
                  />
                </th>
              </tr>
            </thead>

            <!-- 表体 -->
            <tbody class="gb-vxe-tbody">
              <tr v-if="pagedOrders.length === 0" class="empty-row">
                <td :colspan="visibleColumns.length + 2" class="empty-td">
                  暂无数据
                </td>
              </tr>

              <tr
                v-for="(row, rowIndex) in pagedOrders"
                :key="row.id"
                class="gb-vxe-tr"
                :class="{
                  'row--stripe': rowIndex % 2 === 1,
                  'row--cheched': isRowSelected(row.id)
                }"
                @click="toggleRowSelection(row)"
                @dblclick="openTraceDrawer(row)"
              >
                <!-- 复选框 -->
                <td
                  class="gb-vxe-td col-checkbox sticky-col"
                  style="left: 0; width: 40px;"
                  @click.stop
                >
                  <el-checkbox
                    :model-value="isRowSelected(row.id)"
                    size="small"
                    @change="toggleRowSelection(row)"
                  />
                </td>

                <!-- 序号 -->
                <td class="gb-vxe-td col-seq sticky-col" style="left: 40px; width: 50px;">
                  {{ (currentPage - 1) * pageSize + rowIndex + 1 }}
                </td>

                <!-- 动态业务列 -->
                <td
                  v-for="col in visibleColumns"
                  :key="col.field"
                  class="gb-vxe-td"
                  :class="[getCellColorClass(col.field, row), getStickyClass(col)]"
                  :style="getStickyStyle(col, false)"
                >
                  <div class="cell-ellipsis" :title="formatCellValue(row, col.field)">
                    <!-- 订单号支持蓝字点击进入订单详情 -->
                    <span
                      v-if="col.field === 'orderNo'"
                      class="text_link isLink"
                      @click.stop="openOrderDetail(row)"
                    >
                      {{ row.orderNo }}
                    </span>
                    <!-- 关联运单号支持蓝字点击跳转到运单管理 -->
                    <span
                      v-else-if="col.field === 'shipNo' && row.shipNo"
                      class="text_link isLink"
                      @click.stop="jumpToShipList(row.shipNo)"
                    >
                      {{ row.shipNo }}
                    </span>
                    <!-- 上游原单号点击打开协同报文与轨迹抽屉 -->
                    <span
                      v-else-if="col.field === 'upstreamOrderNo' && row.upstreamOrderNo"
                      class="text_link isLink"
                      @click.stop="openTraceDrawer(row)"
                    >
                      {{ row.upstreamOrderNo }}
                    </span>
                    <span v-else>
                      {{ formatCellValue(row, col.field) }}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 底部发光阴影固定合计栏（支持“已选”+“合计”双行） -->
        <div
          ref="tableFooterScrollRef"
          class="gb-vxe-footer-wrapper"
        >
          <table class="gb-vxe-table gb-vxe-footer-table" :style="{ width: totalTableWidth + 'px' }">
            <colgroup>
              <col style="width: 40px;" />
              <col style="width: 50px;" />
              <col
                v-for="col in visibleColumns"
                :key="col.field"
                :style="{ width: (col.width || 110) + 'px' }"
              />
            </colgroup>
            <tfoot>
              <!-- 勾选行时动态显示第一行：已选 -->
              <tr v-if="selectedRows.length > 0" class="gb-vxe-footer-row selected-summary-row">
                <td class="gb-vxe-ftd col-checkbox sticky-col" style="left: 0; width: 40px;">已选</td>
                <td class="gb-vxe-ftd col-seq sticky-col" style="left: 40px; width: 50px;">{{ selectedRows.length }}条</td>
                <td
                  v-for="col in visibleColumns"
                  :key="col.field"
                  class="gb-vxe-ftd"
                  :class="getStickyClass(col)"
                  :style="getStickyStyle(col, false)"
                >
                  {{ getColumnSum(selectedRows, col) }}
                </td>
              </tr>

              <!-- 常驻合计行 -->
              <tr class="gb-vxe-footer-row total-summary-row">
                <td class="gb-vxe-ftd col-checkbox sticky-col" style="left: 0; width: 40px;">合计</td>
                <td class="gb-vxe-ftd col-seq sticky-col" style="left: 40px; width: 50px;">{{ filteredOrders.length }}条</td>
                <td
                  v-for="col in visibleColumns"
                  :key="col.field"
                  class="gb-vxe-ftd"
                  :class="getStickyClass(col)"
                  :style="getStickyStyle(col, false)"
                >
                  {{ getColumnSum(filteredOrders, col) }}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>

    <!-- 列设置弹窗 GbColumnSet -->
    <ColumnSetDialog
      ref="columnSetDialogRef"
      @change="handleSaveColumns"
    />

    <!-- 高级筛选弹窗 GbSeniorFilter -->
    <SeniorFilterDialog
      ref="seniorFilterDialogRef"
      @apply="handleApplySeniorFilter"
    />

    <!-- 转入运单快捷确认弹窗 (支持单票精细核对 & 多票批量转入) -->
    <ConvertWaybillModal
      v-model="convertModalVisible"
      :order="selectedRows[0] || null"
      :orders="selectedRows"
      @success="handleConvertSuccess"
    />

    <!-- 1. 同步拉取上游推单弹窗 -->
    <el-dialog
      v-model="pullModalVisible"
      title="同步拉取上游平台 / 星云企业互联推单"
      width="680px"
      destroy-on-close
      append-to-body
    >
      <div style="margin-bottom: 12px; background: #f0f7ff; border: 1px solid #d9ecff; border-radius: 4px; padding: 8px 12px; font-size: 12px; color: #303133;">
        <span>⚡ <b>一键载入上游推单报文模板：</b></span>
        <el-button
          v-for="(tpl, idx) in upstreamTemplates"
          :key="idx"
          size="small"
          type="primary"
          plain
          style="margin-left: 6px; padding: 3px 8px; height: 24px; font-size: 12px;"
          @click="applyUpstreamTemplate(tpl)"
        >
          {{ tpl.name }}
        </el-button>
      </div>
      <el-form :model="pullForm" label-width="95px" size="small">
        <el-row :gutter="14">
          <el-col :span="12">
            <el-form-item label="上游来源平台" required>
              <el-select v-model="pullForm.upstreamPlatform" allow-create filterable style="width: 100%;">
                <el-option label="星云企业互联 · 湖南星沙专线" value="星云企业互联 · 湖南星沙专线" />
                <el-option label="星云企业互联 · 湖北大道物流" value="星云企业互联 · 湖北大道物流" />
                <el-option label="美的集团OMS供应链平台" value="美的集团OMS供应链平台" />
                <el-option label="菜鸟网络奇门仓储接口" value="菜鸟网络奇门仓储接口" />
                <el-option label="京东大件家居开放平台EDI" value="京东大件家居开放平台EDI" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上游原单号" required>
              <el-input v-model="pullForm.upstreamOrderNo" placeholder="自动生成上游单号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="始发网点">
              <el-select v-model="pullForm.startGroup" style="width: 100%;">
                <el-option label="总部" value="总部" />
                <el-option label="白云太和网点" value="白云太和网点" />
                <el-option label="顺德北滘网点" value="顺德北滘网点" />
                <el-option label="佛山乐从网点" value="佛山乐从网点" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目的城市/网点">
              <div style="display: flex; gap: 6px; width: 100%;">
                <el-input v-model="pullForm.destCity" placeholder="如 湖南省长沙市" style="width: 52%;" />
                <el-input v-model="pullForm.destGroup" placeholder="如 长沙分拨中心" style="width: 48%;" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发货方及电话" required>
              <div style="display: flex; gap: 6px; width: 100%;">
                <el-input v-model="pullForm.shipper" placeholder="发货人/单位" style="width: 52%;" />
                <el-input v-model="pullForm.shipPhone" placeholder="电话" style="width: 48%;" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货方及电话" required>
              <div style="display: flex; gap: 6px; width: 100%;">
                <el-input v-model="pullForm.receiver" placeholder="收货人/单位" style="width: 52%;" />
                <el-input v-model="pullForm.receivePhone" placeholder="电话" style="width: 48%;" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发货详细地址">
              <el-input v-model="pullForm.shipAddress" placeholder="发货提货详细地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货详细地址">
              <el-input v-model="pullForm.receiveAddress" placeholder="收货派送详细地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货物名称" required>
              <el-input v-model="pullForm.goodsName" placeholder="货物名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="件数/重量/体积">
              <div style="display: flex; gap: 6px; width: 100%;">
                <el-input-number v-model="pullForm.number" :min="1" :controls="false" placeholder="件" style="width: 32%;" />
                <el-input-number v-model="pullForm.weight" :min="1" :controls="false" placeholder="kg" style="width: 34%;" />
                <el-input-number v-model="pullForm.volume" :min="0.1" :controls="false" placeholder="m³" style="width: 34%;" />
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="包装方式">
              <el-input v-model="pullForm.pack" placeholder="如 纸箱/托盘" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协议运费(元)">
              <el-input-number v-model="pullForm.fTotal" :min="0" :controls="false" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结算方式">
              <el-select v-model="pullForm.payMode" style="width: 100%;">
                <el-option label="月结" value="月结" />
                <el-option label="现付" value="现付" />
                <el-option label="到付" value="到付" />
                <el-option label="回单付" value="回单付" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button size="small" @click="pullModalVisible = false">取消</el-button>
        <el-button size="small" type="primary" :loading="pullLoading" @click="confirmPullUpstream">立即推入上游订单池</el-button>
      </template>
    </el-dialog>

    <!-- 2. 上游订单派车提货弹窗 (内置车牌/司机智能联想) -->
    <el-dialog
      v-model="pickupModalVisible"
      :title="`上游订单指派提货车辆（已选 ${selectedRows.length} 票）`"
      width="520px"
      destroy-on-close
      append-to-body
    >
      <el-form :model="pickupForm" label-width="95px" size="small">
        <el-form-item label="提货车牌号" required>
          <VehiclePopoverInput
            v-model="pickupForm.truckNo"
            placeholder="点击或输入车牌/司机联想"
            @select="onSelectPickupVehicle"
          />
        </el-form-item>
        <el-form-item label="随车司机" required>
          <el-input v-model="pickupForm.driverName" placeholder="选择车牌自动带出或手动输入" />
        </el-form-item>
        <el-form-item label="司机手机号" required>
          <el-input v-model="pickupForm.driverPhone" placeholder="司机联系电话" />
        </el-form-item>
        <el-form-item label="预约提货时间">
          <el-input v-model="pickupForm.pickupTime" placeholder="如 2026-10-11 14:30" />
        </el-form-item>
        <el-form-item label="提货调度说明">
          <el-input v-model="pickupForm.remark" type="textarea" :rows="2" placeholder="如：今日14:00前抵达顺德北滘美的3号仓提货" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="pickupModalVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="confirmAssignPickup">确认指派提货车辆</el-button>
      </template>
    </el-dialog>

    <!-- 3. 驳回上游订单弹窗 -->
    <el-dialog
      v-model="rejectModalVisible"
      :title="`异常订单驳回上游平台（已选 ${selectedRows.length} 票）`"
      width="500px"
      destroy-on-close
      append-to-body
    >
      <el-form label-width="85px" size="small">
        <el-form-item label="快捷原因">
          <div style="display: flex; flex-wrap: wrap; gap: 6px;">
            <el-tag
              v-for="r in ['收货地址超区无法派送', '大件体积超限需改整车', '上游结算协议单价不符', '发货方电话空号无法提货']"
              :key="r"
              style="cursor: pointer;"
              @click="rejectReason = r"
            >
              {{ r }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="驳回原因" required>
          <el-input v-model="rejectReason" type="textarea" :rows="3" placeholder="请输入回传给上游平台的具体驳回原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="rejectModalVisible = false">取消</el-button>
        <el-button size="small" type="danger" @click="confirmRejectUpstream">确认驳回并回传上游</el-button>
      </template>
    </el-dialog>

    <!-- 4. 上游订单全息协同轨迹 & EDI原始报文抽屉 -->
    <el-drawer
      v-model="traceDrawerVisible"
      :title="`上游订单全息协同监控 — ${traceOrder?.orderNo || ''}`"
      size="580px"
      append-to-body
    >
      <div v-if="traceOrder" style="padding: 0 6px; font-size: 13px;">
        <!-- 5步协同进度条 -->
        <el-steps
          :active="traceStepActive"
          finish-status="success"
          align-center
          style="margin-bottom: 18px; background: #f8faff; padding: 14px 8px; border-radius: 6px; border: 1px solid #e4edf8;"
        >
          <el-step title="上游推单" :description="traceOrder.createTime?.slice(5, 16)" />
          <el-step title="网关验签" description="奇门/企联通过" />
          <el-step title="网点审核" :description="traceOrder.auditStatus === 2 ? '已审核' : '待审核'" />
          <el-step title="派车提货" :description="traceOrder.pickupTruckNo || '待指派'" />
          <el-step title="转入运单" :description="traceOrder.shipNo || '待转单'" />
        </el-steps>

        <!-- 核心概要卡片 -->
        <el-descriptions :column="2" border size="small" style="margin-bottom: 16px;">
          <el-descriptions-item label="系统订单号"><b>{{ traceOrder.orderNo }}</b></el-descriptions-item>
          <el-descriptions-item label="上游原单号">
            <el-tag size="small" type="warning">{{ traceOrder.upstreamOrderNo }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="上游来源平台" :span="2">{{ (traceOrder as any).upstreamPlatform }}</el-descriptions-item>
          <el-descriptions-item label="运行路由">{{ (traceOrder as any).sendAreaName || (traceOrder as any).startGroup }} → {{ (traceOrder as any).destName || (traceOrder as any).destCity }}</el-descriptions-item>
          <el-descriptions-item label="关联正式运单">
            <span v-if="(traceOrder as any).shipNo" class="text_link isLink" @click="jumpToShipList((traceOrder as any).shipNo)">
              {{ (traceOrder as any).shipNo }} (点击查看)
            </span>
            <span v-else style="color: #909399;">尚未转入运单</span>
          </el-descriptions-item>
          <el-descriptions-item label="发货方">{{ (traceOrder as any).consignorName || (traceOrder as any).shipper }} ({{ (traceOrder as any).consignorMobile || (traceOrder as any).shipPhone }})</el-descriptions-item>
          <el-descriptions-item label="收货方">{{ (traceOrder as any).consigneeName || (traceOrder as any).receiver }} ({{ (traceOrder as any).consigneeMobile || (traceOrder as any).receivePhone }})</el-descriptions-item>
          <el-descriptions-item label="货物及规格" :span="2">
            {{ (traceOrder as any).cargoName || (traceOrder as any).goodsName }} | {{ (traceOrder as any).num || (traceOrder as any).number }}件 | {{ (traceOrder as any).weight }}kg | {{ (traceOrder as any).volume }}m³
          </el-descriptions-item>
        </el-descriptions>

        <!-- 协同状态流转时间轴 -->
        <div style="font-weight: 700; margin-bottom: 10px; color: #303133;">🕒 上游协同状态流转日志</div>
        <el-timeline style="padding-left: 6px; margin-bottom: 16px;">
          <el-timeline-item
            v-for="(log, idx) in traceTimeline"
            :key="idx"
            :timestamp="log.time"
            :type="log.type as any"
          >
            <div style="font-weight: 600;">{{ log.title }}</div>
            <div style="font-size: 12px; color: #606266; margin-top: 2px;">{{ log.desc }}</div>
          </el-timeline-item>
        </el-timeline>

        <!-- EDI / JSON 原始报文 -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-weight: 700; color: #303133;">📦 上游 EDI / OpenAPI 原始推送报文</span>
          <el-button size="small" type="primary" link @click="copyRawJson">复制报文 JSON</el-button>
        </div>
        <pre style="background: #1e293b; color: #e2e8f0; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; line-height: 1.5; max-height: 240px;">{{ formattedRawJson }}</pre>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search,
  Plus,
  Edit,
  Delete,
  Lock,
  Setting,
  ArrowDown,
  RefreshRight,
  Van,
  Warning,
  Document
} from '@element-plus/icons-vue'
import { useOrderStore } from '@/store/order'
import { useTagsStore } from '@/store/tags'
import { VehicleArchive } from '@/store/dictionaryAndArchive'
import {
  OrderRecord,
  GbColumnConfig,
  ORDERLIST_60_COLUMNS,
  PREVORDER_COLUMNS,
  NETWORK_TREE_LIST
} from '@/mock/orderData'
import ColumnSetDialog from './ColumnSetDialog.vue'
import SeniorFilterDialog, { SeniorFilterNode } from './SeniorFilterDialog.vue'
import ConvertWaybillModal from './ConvertWaybillModal.vue'
import VehiclePopoverInput from '@/views/operation/components/VehiclePopoverInput.vue'

const props = defineProps<{
  source?: number
}>()

const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()
const tagsStore = useTagsStore()

const STORAGE_KEY = computed(() =>
  props.source === 5 ? 'kebang_prevorder_columns_v4' : 'kebang_orderlist_columns_v3'
)

const defaultColumnsSource = computed(() =>
  props.source === 5 ? PREVORDER_COLUMNS : ORDERLIST_60_COLUMNS
)

// 1. 顶部查询表单状态（默认当月范围，始发网点默认全选展示“总部”）
const networkTreeRef = ref<any>(null)
const networkTreeData = ref(NETWORK_TREE_LIST)

const allNetworkNodes = [
  { id: 'hq', name: '总部' },
  ...(NETWORK_TREE_LIST[0]?.childs || []).map(c => ({ id: c.id, name: c.name }))
]
const allNetworkIds = allNetworkNodes.map(n => n.id)
const networkIdToName: Record<string, string> = Object.fromEntries(
  allNetworkNodes.map(n => [n.id, n.name])
)

const queryForm = reactive({
  timeType: 0, // 0: 开单日期, 1: 托运日期
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  networkIds: [...allNetworkIds] as string[],
  shipStatus: 'all' as 'all' | 'pending' | 'converted' | 'rejected',
  platformKw: ''
})

const checkAllNetworks = ref(true)
const isNetworkIndeterminate = computed(() => {
  const len = queryForm.networkIds.length
  return len > 0 && len < allNetworkIds.length
})

const selectedNetworkNames = computed(() => {
  // 全选或包含总部时，与线上一致只展示 ['总部'] 标签
  if (queryForm.networkIds.includes('hq')) {
    return ['总部']
  }
  return queryForm.networkIds.map(id => networkIdToName[id]).filter(Boolean)
})

function handleCheckAllNetworks(val: any) {
  const checked = Boolean(val)
  queryForm.networkIds = checked ? [...allNetworkIds] : []
  if (networkTreeRef.value) {
    networkTreeRef.value.setCheckedKeys(queryForm.networkIds)
  }
}

function handleNetworkTreeCheck(_node: any, checkedInfo: { checkedKeys: string[] }) {
  queryForm.networkIds = checkedInfo.checkedKeys
  checkAllNetworks.value = queryForm.networkIds.length === allNetworkIds.length
}

function removeFirstNetwork() {
  if (queryForm.networkIds.length === 0) return
  queryForm.networkIds = []
  checkAllNetworks.value = false
  if (networkTreeRef.value) {
    networkTreeRef.value.setCheckedKeys([])
  }
}

// 2. 60列配置与列宽/冻结/显隐管理 (GbColumnConfig)
const allColumns = ref<GbColumnConfig[]>(
  JSON.parse(JSON.stringify(defaultColumnsSource.value))
)

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY.value)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length === defaultColumnsSource.value.length && parsed[0]?.params) {
        allColumns.value = parsed
      }
    }
  } catch {
    // ignore
  }
})

const visibleColumns = computed(() =>
  allColumns.value.filter(col => col.params?.isShow === 1)
)

const totalTableWidth = computed(() => {
  const colsW = visibleColumns.value.reduce((sum, c) => sum + (Number(c.width) || 110), 0)
  return 90 + colsW
})

// 固定列（左冻结 / 右冻结）偏移量计算
const leftStickyOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = 90 // 40px checkbox + 50px seq
  for (const col of visibleColumns.value) {
    if (col.params?.isFixed === 'left') {
      map[col.field] = acc
      acc += Number(col.width) || 110
    }
  }
  return map
})

const rightStickyOffsets = computed(() => {
  const map: Record<string, number> = {}
  let acc = 0
  const reversed = [...visibleColumns.value].reverse()
  for (const col of reversed) {
    if (col.params?.isFixed === 'right') {
      map[col.field] = acc
      acc += Number(col.width) || 110
    }
  }
  return map
})

function getStickyClass(col: GbColumnConfig) {
  if (col.params?.isFixed === 'left') return 'sticky-col sticky-left'
  if (col.params?.isFixed === 'right') return 'sticky-col sticky-right'
  return ''
}

function getStickyStyle(col: GbColumnConfig, isHeader: boolean) {
  if (col.params?.isFixed === 'left' && leftStickyOffsets.value[col.field] !== undefined) {
    return {
      left: `${leftStickyOffsets.value[col.field]}px`,
      zIndex: isHeader ? 14 : 4
    }
  }
  if (col.params?.isFixed === 'right' && rightStickyOffsets.value[col.field] !== undefined) {
    return {
      right: `${rightStickyOffsets.value[col.field]}px`,
      zIndex: isHeader ? 14 : 4
    }
  }
  return {}
}

// 3. 表头行内筛选、高级筛选、表头排序、分页
const columnFilters = reactive<Record<string, string>>({})
const seniorConditions = ref<SeniorFilterNode[]>([])
const sortState = reactive<{ field: string; order: 'asc' | 'desc' | '' }>({
  field: '',
  order: ''
})

const currentPage = ref(1)
const pageSize = ref(100)

function toggleSort(field: string) {
  if (sortState.field !== field) {
    sortState.field = field
    sortState.order = 'asc'
  } else if (sortState.order === 'asc') {
    sortState.order = 'desc'
  } else {
    sortState.field = ''
    sortState.order = ''
  }
}

function handleColumnFilterInput() {
  currentPage.value = 1
}

function handleSearch() {
  currentPage.value = 1
  ElMessage.success('查询成功')
}

const columnSetDialogRef = ref<InstanceType<typeof ColumnSetDialog> | null>(null)
const seniorFilterDialogRef = ref<InstanceType<typeof SeniorFilterDialog> | null>(null)

function openColumnSet() {
  columnSetDialogRef.value?.open(allColumns.value)
}

function openSeniorFilter() {
  seniorFilterDialogRef.value?.open()
}

function handleApplySeniorFilter(payload: { logic: 'AND' | 'OR'; conditions: SeniorFilterNode[] }) {
  seniorConditions.value = payload.conditions
  currentPage.value = 1
  ElMessage.success('高级筛选已应用')
}

function matchSeniorNode(row: OrderRecord & Record<string, any>, cond: SeniorFilterNode): boolean {
  const rawVal = String(row[cond.field] ?? '').toLowerCase()
  const target = String(cond.value ?? '').trim().toLowerCase()
  if (!target) return true
  switch (cond.operator) {
    case '0': // 包含
      return rawVal.includes(target)
    case '1': // 不包含
      return !rawVal.includes(target)
    case '2': // 等于
      return rawVal === target
    case '3': // 不等于
      return rawVal !== target
    case '4': // 大于
      return Number(rawVal) > Number(target)
    case '5': // 大于等于
      return Number(rawVal) >= Number(target)
    case '6': // 小于
      return Number(rawVal) < Number(target)
    case '7': // 小于等于
      return Number(rawVal) <= Number(target)
    case '8': // 以*开始
      return rawVal.startsWith(target)
    case '9': // 以*结尾
      return rawVal.endsWith(target)
    default:
      return rawVal.includes(target)
  }
}

const filteredOrders = computed(() => {
  let list = [...orderStore.orders]

  // 0) 上游订单专属过滤（source === 5 仅展示上游推单与星云互联订单）
  if (props.source === 5) {
    list = list.filter(item => item.source === 5)

    if (queryForm.shipStatus === 'pending') {
      list = list.filter(item => item.isShip === 0 && !item.isRejected)
    } else if (queryForm.shipStatus === 'converted') {
      list = list.filter(item => item.isShip === 1)
    } else if (queryForm.shipStatus === 'rejected') {
      list = list.filter(item => Boolean(item.isRejected))
    }

    if (queryForm.platformKw) {
      const kw = queryForm.platformKw.toLowerCase()
      list = list.filter(item =>
        String(item.upstreamPlatform || item.orderRemark || '').toLowerCase().includes(kw)
      )
    }
  }

  // 1) 日期范围过滤
  if (queryForm.dateRange && queryForm.dateRange.length === 2) {
    const [start, end] = queryForm.dateRange
    list = list.filter(item => {
      const targetDate =
        queryForm.timeType === 0
          ? (item.creationTime || item.createTime || '').slice(0, 10)
          : (item.shippingDate || item.consignDate || '').slice(0, 10)
      if (!targetDate) return true
      return targetDate >= start && targetDate <= end
    })
  }

  // 2) 始发网点过滤
  if (queryForm.networkIds.length > 0 && !queryForm.networkIds.includes('hq')) {
    const allowedNames = queryForm.networkIds.map(id => networkIdToName[id]).filter(Boolean)
    list = list.filter(item => allowedNames.includes(item.startGroup))
  }

  // 3) 60列表头行内过滤框实时过滤
  for (const [field, kw] of Object.entries(columnFilters)) {
    const trimmed = (kw || '').trim().toLowerCase()
    if (!trimmed) continue
    list = list.filter(item => {
      const cellStr = formatCellValue(item, field).toLowerCase()
      return cellStr.includes(trimmed)
    })
  }

  // 4) 高级筛选弹窗过滤
  if (seniorConditions.value.length > 0) {
    list = list.filter(row => {
      let result = true
      for (let i = 0; i < seniorConditions.value.length; i++) {
        const cond = seniorConditions.value[i]
        const matched = matchSeniorNode(row, cond)
        if (i === 0) {
          result = matched
        } else if (cond.logic === 1) {
          result = result || matched
        } else {
          result = result && matched
        }
      }
      return result
    })
  }

  // 5) 排序
  if (sortState.field && sortState.order) {
    const f = sortState.field
    const dir = sortState.order === 'asc' ? 1 : -1
    list.sort((a, b) => {
      const va = (a as any)[f]
      const vb = (b as any)[f]
      if (typeof va === 'number' && typeof vb === 'number') {
        return (va - vb) * dir
      }
      return String(va ?? '').localeCompare(String(vb ?? ''), 'zh-CN') * dir
    })
  }

  return list
})

const pagedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredOrders.value.slice(start, start + pageSize.value)
})

// 4. 行勾选与顶部操作按钮联动状态（支持单条及批量操作）
const selectedIds = ref<string[]>([])

const selectedRows = computed(() =>
  filteredOrders.value.filter(r => selectedIds.value.includes(r.id))
)

const isAllPageSelected = computed({
  get: () =>
    pagedOrders.value.length > 0 &&
    pagedOrders.value.every(r => selectedIds.value.includes(r.id)),
  set: () => {}
})

const isPageIndeterminate = computed(() => {
  const count = pagedOrders.value.filter(r => selectedIds.value.includes(r.id)).length
  return count > 0 && count < pagedOrders.value.length
})

function isRowSelected(id: string): boolean {
  return selectedIds.value.includes(id)
}

function toggleRowSelection(row: OrderRecord) {
  const idx = selectedIds.value.indexOf(row.id)
  if (idx >= 0) {
    selectedIds.value.splice(idx, 1)
  } else {
    selectedIds.value.push(row.id)
  }
}

function toggleSelectAllPage(val: any) {
  const checked = Boolean(val)
  const pageIds = pagedOrders.value.map(r => r.id)
  if (checked) {
    const merged = new Set([...selectedIds.value, ...pageIds])
    selectedIds.value = Array.from(merged)
  } else {
    selectedIds.value = selectedIds.value.filter(id => !pageIds.includes(id))
  }
}

// 按钮禁用规则：
// 修改：仅勾选 1 条 且 未转运单 (isShip === 0)
const canEdit = computed(
  () => selectedRows.value.length === 1 && selectedRows.value[0].isShip === 0
)
// 删除：勾选 >= 1 条 且 均未转运单
const canDelete = computed(
  () =>
    selectedRows.value.length > 0 &&
    selectedRows.value.every(r => r.isShip === 0)
)
// 审核订单：勾选 >= 1 条 且 均未审核 (auditStatus === 1)
const canAudit = computed(
  () =>
    selectedRows.value.length >= 1 &&
    selectedRows.value.every(r => r.auditStatus === 1)
)
// 取消审核：勾选 >= 1 条 且 已审核 (auditStatus === 2) 且 未转运单
const canCancelAudit = computed(
  () =>
    selectedRows.value.length >= 1 &&
    selectedRows.value.every(r => r.auditStatus === 2 && r.isShip === 0)
)
// 转入运单：勾选 >= 1 条 且 均未转运单 且 未驳回
const canTransferShip = computed(
  () =>
    selectedRows.value.length >= 1 &&
    selectedRows.value.every(r => r.isShip === 0 && !r.isRejected)
)
// 取消转入：勾选 >= 1 条 且 均已转运单 (isShip === 1)
const canCancelTransfer = computed(
  () =>
    selectedRows.value.length > 0 &&
    selectedRows.value.every(r => r.isShip === 1)
)
// 派车提货：勾选 >= 1 条 且 均未驳回
const canAssignPickup = computed(
  () =>
    selectedRows.value.length >= 1 &&
    selectedRows.value.every(r => !r.isRejected)
)
// 驳回上游：勾选 >= 1 条 且 均未转运单 且 未驳回
const canRejectUpstream = computed(
  () =>
    selectedRows.value.length >= 1 &&
    selectedRows.value.every(r => r.isShip === 0 && !r.isRejected)
)

// 5. 按钮动作实现
function handleCreateOrder() {
  const fromKey = route.path.includes('prevorder') ? 'prevorder' : 'orderlist'
  router.push({
    path: '/customRoute/custorder',
    query: { from: fromKey }
  })
}

function handleEditOrder() {
  if (!canEdit.value) return
  const target = selectedRows.value[0]
  const fromKey = route.path.includes('prevorder') ? 'prevorder' : 'orderlist'
  router.push({
    path: `/customRoute/editOrder/${target.id}`,
    query: { from: fromKey }
  })
}

function openOrderDetail(row: OrderRecord) {
  const fromKey = route.path.includes('prevorder') ? 'prevorder' : 'orderlist'
  router.push({
    path: `/customRoute/orderDetail/${row.id}`,
    query: { from: fromKey }
  })
}

function jumpToShipList(shipNo: string) {
  if (!shipNo) return
  tagsStore.addTag({
    path: '/operation/ship/shiplist',
    title: '运单列表'
  })
  router.push({
    path: '/operation/ship/shiplist',
    query: { keyword: shipNo }
  })
}

function handleDeleteOrders() {
  if (!canDelete.value) return
  ElMessageBox.confirm(
    `确定要删除选中的 ${selectedRows.value.length} 条订单吗？`,
    '删除确认',
    { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' }
  )
    .then(() => {
      const count = orderStore.batchDelete(selectedRows.value.map(r => r.id))
      selectedIds.value = []
      ElMessage.success(`成功删除 ${count} 条订单`)
    })
    .catch(() => {})
}

function handleAuditOrders() {
  if (!canAudit.value) return
  const count = orderStore.batchAudit(selectedRows.value.map(r => r.id), 2)
  ElMessage.success(`已审核通过 ${count} 条订单`)
}

function handleCancelAudit() {
  if (!canCancelAudit.value) return
  const count = orderStore.batchAudit(selectedRows.value.map(r => r.id), 1)
  ElMessage.success(`已取消审核 ${count} 条订单`)
}

const convertModalVisible = ref(false)

function handleTransferToShip() {
  if (!canTransferShip.value) return
  convertModalVisible.value = true
}

function handleConvertSuccess() {
  selectedIds.value = []
}

function handleCancelTransfer() {
  if (!canCancelTransfer.value) return
  ElMessageBox.confirm(
    `确定要取消转入选中的 ${selectedRows.value.length} 条订单吗？`,
    '取消转入确认',
    { type: 'warning', confirmButtonText: '确定', cancelButtonText: '取消' }
  )
    .then(() => {
      const count = orderStore.batchCancelImport(selectedRows.value.map(r => r.id))
      selectedIds.value = []
      ElMessage.success(`成功取消转入 ${count} 条订单`)
    })
    .catch(() => {})
}

// 5.1 同步拉取上游推单弹窗逻辑
const pullModalVisible = ref(false)
const pullLoading = ref(false)
const upstreamTemplates = [
  {
    name: '星云企业互联 · 湖南星沙专线',
    upstreamPlatform: '星云企业互联 · 湖南星沙专线',
    prefix: 'XY-HN',
    startGroup: '白云太和网点',
    destCity: '湖南省长沙市长沙县',
    destGroup: '长沙分拨中心',
    shipper: '广州宝洁日化供应链中心',
    shipPhone: '13800138661',
    shipAddress: '广州市黄埔区永和经济区宝洁路1号',
    receiver: '湖南步步高商业连锁中心仓',
    receivePhone: '13974805518',
    receiveAddress: '湖南省长沙市长沙县星沙大道188号',
    goodsName: '洗护日化统配箱',
    pack: '纸箱',
    number: 160,
    weight: 3200,
    volume: 14.5,
    fTotal: 2560,
    payMode: '月结'
  },
  {
    name: '美的集团OMS供应链直连',
    upstreamPlatform: '美的集团OMS供应链平台',
    prefix: 'MD-OMS',
    startGroup: '顺德北滘网点',
    destCity: '江苏省苏州市昆山市',
    destGroup: '华东分拨中心',
    shipper: '美的集团顺德家用空调事业部',
    shipPhone: '0757-26338899',
    shipAddress: '佛山市顺德区北滘镇林港路美的工业城',
    receiver: '苏州京东亚洲一号智能大家电仓',
    receivePhone: '13913108866',
    receiveAddress: '江苏省苏州市昆山市花桥镇顺扬路99号',
    goodsName: '美的变频空调KFR-35GW',
    pack: '纸箱+木托',
    number: 85,
    weight: 3825,
    volume: 28.0,
    fTotal: 4680,
    payMode: '回单付'
  },
  {
    name: '菜鸟网络奇门仓储接口',
    upstreamPlatform: '菜鸟网络奇门仓储接口',
    prefix: 'CN-QM',
    startGroup: '总部',
    destCity: '湖北省武汉市东西湖区',
    destGroup: '武汉分拨中心',
    shipper: '菜鸟华南增城智能骨干仓',
    shipPhone: '020-82886600',
    shipAddress: '广州市增城区新塘镇创优路菜鸟物流园',
    receiver: '天猫超市华中武汉东西湖中心仓',
    receivePhone: '13667109922',
    receiveAddress: '湖北省武汉市东西湖区高桥五路66号',
    goodsName: '猫超快消百货统配托盘',
    pack: '托盘',
    number: 42,
    weight: 6300,
    volume: 36.0,
    fTotal: 5200,
    payMode: '月结'
  },
  {
    name: '京东大件家居开放平台EDI',
    upstreamPlatform: '京东大件家居开放平台EDI',
    prefix: 'JD-EDI',
    startGroup: '佛山乐从网点',
    destCity: '四川省成都市新都区',
    destGroup: '成都网点',
    shipper: '佛山林氏木业总部智造基地',
    shipPhone: '0757-28906688',
    shipAddress: '佛山市顺德区乐从镇家具大道A区12座',
    receiver: '成都新都传化国际家居大件中心',
    receivePhone: '13880907733',
    receiveAddress: '四川省成都市新都区物流大道88号',
    goodsName: '北欧真皮转角沙发套装',
    pack: '木架',
    number: 24,
    weight: 1920,
    volume: 22.8,
    fTotal: 3960,
    payMode: '到付'
  }
]

const pullForm = reactive({
  upstreamPlatform: '',
  upstreamOrderNo: '',
  startGroup: '总部',
  destCity: '',
  destGroup: '长沙分拨中心',
  shipper: '',
  shipPhone: '',
  shipAddress: '',
  receiver: '',
  receivePhone: '',
  receiveAddress: '',
  goodsName: '',
  pack: '纸箱',
  number: 60,
  weight: 1500,
  volume: 8.5,
  fTotal: 1850,
  payMode: '月结'
})

function applyUpstreamTemplate(tpl: typeof upstreamTemplates[number]) {
  const rand = Math.floor(1000 + Math.random() * 9000)
  pullForm.upstreamPlatform = tpl.upstreamPlatform
  pullForm.upstreamOrderNo = `${tpl.prefix}-20261011-${rand}`
  pullForm.startGroup = tpl.startGroup
  pullForm.destCity = tpl.destCity
  pullForm.destGroup = tpl.destGroup
  pullForm.shipper = tpl.shipper
  pullForm.shipPhone = tpl.shipPhone
  pullForm.shipAddress = tpl.shipAddress
  pullForm.receiver = tpl.receiver
  pullForm.receivePhone = tpl.receivePhone
  pullForm.receiveAddress = tpl.receiveAddress
  pullForm.goodsName = tpl.goodsName
  pullForm.pack = tpl.pack
  pullForm.number = tpl.number
  pullForm.weight = tpl.weight
  pullForm.volume = tpl.volume
  pullForm.fTotal = tpl.fTotal
  pullForm.payMode = tpl.payMode
}

function openPullModal() {
  applyUpstreamTemplate(upstreamTemplates[0])
  pullModalVisible.value = true
}

function confirmPullUpstream() {
  if (!pullForm.upstreamOrderNo || !pullForm.goodsName) {
    ElMessage.warning('请填写完整的上游原单号与货物名称')
    return
  }
  pullLoading.value = true
  setTimeout(() => {
    const newOrder = orderStore.addOrder({
      source: 5,
      auditStatus: 1,
      isShip: 0,
      createTime: '2026-10-11 10:42:00',
      consignDate: '2026-10-11 10:42:00',
      upstreamPlatform: pullForm.upstreamPlatform,
      upstreamOrderNo: pullForm.upstreamOrderNo,
      startGroup: pullForm.startGroup,
      startCity: '广东省广州市',
      destCity: pullForm.destCity,
      destGroup: pullForm.destGroup,
      shipper: pullForm.shipper,
      shipPhone: pullForm.shipPhone,
      shipAddress: pullForm.shipAddress,
      receiver: pullForm.receiver,
      receivePhone: pullForm.receivePhone,
      receiveAddress: pullForm.receiveAddress,
      goodsName: pullForm.goodsName,
      pack: pullForm.pack,
      number: pullForm.number,
      weight: pullForm.weight,
      volume: pullForm.volume,
      fTotal: pullForm.fTotal,
      freight: pullForm.fTotal,
      fMonth: pullForm.payMode === '月结' ? pullForm.fTotal : 0,
      fDeliver: pullForm.payMode === '到付' ? pullForm.fTotal : 0,
      fCash: pullForm.payMode === '现付' ? pullForm.fTotal : 0,
      fReceipt: pullForm.payMode === '回单付' ? pullForm.fTotal : 0,
      payMode: pullForm.payMode,
      deliveryMode: '送货',
      orderRemark: `${pullForm.upstreamPlatform}自动推单(${pullForm.upstreamOrderNo})，请核对提货信息后转入正式运单`
    })
    pullLoading.value = false
    pullModalVisible.value = false
    selectedIds.value = [newOrder.id]
    ElMessage.success(`成功从【${pullForm.upstreamPlatform}】拉取推单 ${newOrder.orderNo}（原单号：${pullForm.upstreamOrderNo}）`)
  }, 200)
}

// 5.2 派车提货弹窗逻辑
const pickupModalVisible = ref(false)
const pickupForm = reactive({
  truckNo: '粤A·99681挂',
  driverName: '赵铁柱',
  driverPhone: '13922118899',
  pickupTime: '2026-10-11 14:30',
  remark: '已通知司机前往上游工厂装货月台提货'
})

function openPickupModal() {
  if (!canAssignPickup.value) return
  const first = selectedRows.value[0]
  if (first?.pickupTruckNo) {
    pickupForm.truckNo = first.pickupTruckNo
    pickupForm.driverName = first.pickupDriver || '赵铁柱'
    pickupForm.driverPhone = first.pickupDriverPhone || '13922118899'
  }
  pickupModalVisible.value = true
}

function onSelectPickupVehicle(v: VehicleArchive) {
  pickupForm.truckNo = v.plateNo
  pickupForm.driverName = v.driverName
  pickupForm.driverPhone = v.driverPhone
}

function confirmAssignPickup() {
  if (!pickupForm.truckNo) {
    ElMessage.warning('请选择或输入提货车牌号')
    return
  }
  const count = orderStore.assignPickupVehicle(
    selectedRows.value.map(r => r.id),
    {
      pickupTruckNo: pickupForm.truckNo,
      pickupDriver: pickupForm.driverName,
      pickupDriverPhone: pickupForm.driverPhone,
      remark: pickupForm.remark
    }
  )
  pickupModalVisible.value = false
  ElMessage.success(`成功为 ${count} 笔上游订单指派提货车辆【${pickupForm.truckNo}】`)
}

// 5.3 驳回上游订单弹窗逻辑
const rejectModalVisible = ref(false)
const rejectReason = ref('收货地址超区无法派送')
const quickRejectReasons = [
  '收货地址超区无法派送',
  '上游运费协议价格不符',
  '大件货物超长超重需专车议价',
  '发货人联系电话空号/停机',
  '上游重复推单'
]

function openRejectModal() {
  if (!canRejectUpstream.value) return
  rejectReason.value = '收货地址超区无法派送'
  rejectModalVisible.value = true
}

function confirmRejectUpstream() {
  if (!rejectReason.value.trim()) {
    ElMessage.warning('请输入驳回原因')
    return
  }
  const count = orderStore.rejectUpstreamOrders(
    selectedRows.value.map(r => r.id),
    rejectReason.value.trim()
  )
  rejectModalVisible.value = false
  selectedIds.value = []
  ElMessage.warning(`已驳回 ${count} 笔上游订单，并将原因同步回传至上游平台`)
}

// 5.4 上游订单全息协同轨迹 & EDI原始报文抽屉逻辑
const traceDrawerVisible = ref(false)
const traceOrder = ref<OrderRecord | null>(null)

function openTraceDrawer(row?: OrderRecord) {
  const target = row || selectedRows.value[0] || filteredOrders.value[0]
  if (!target) {
    ElMessage.info('请先选择一条上游订单')
    return
  }
  traceOrder.value = target
  traceDrawerVisible.value = true
}

const traceStepActive = computed(() => {
  const o = traceOrder.value
  if (!o) return 1
  if (o.isShip === 1) return 5
  if (o.pickupTruckNo) return 4
  if (o.auditStatus === 2) return 3
  return 2
})

const traceTimeline = computed(() => {
  const o: any = traceOrder.value
  if (!o) return []
  const goodsStr = o.cargoName || o.goodsName || '普货'
  const qtyStr = o.num || o.number || 1
  const routeStart = o.sendAreaName || o.startGroup || '广州'
  const routeDest = o.destName || o.destCity || o.destGroup || '长沙'
  const logs: Array<{ time: string; title: string; desc: string; type: string }> = [
    {
      time: o.createTime || '2026-10-11 09:00:00',
      title: '上游平台发起推单 (OpenAPI / 奇门网关)',
      desc: `来源渠道：【${o.upstreamPlatform}】，上游原单号：${o.upstreamOrderNo}，货品：${goodsStr} (${qtyStr}件 / ${o.weight}kg)`,
      type: 'primary'
    },
    {
      time: o.createTime || '2026-10-11 09:00:02',
      title: '科邦智联 EDI 网关验签入库成功',
      desc: `自动生成系统预订单号：${o.orderNo}，路由分配至【${routeStart} -> ${routeDest}】`,
      type: 'success'
    }
  ]

  if (o.isRejected) {
    logs.push({
      time: '2026-10-11 10:35:00',
      title: '网点驳回上游推单 (已回传状态码 REJECTED)',
      desc: `驳回原因：${o.rejectReason || '网点退回'}，操作人：管理员`,
      type: 'danger'
    })
    return logs
  }

  if (o.auditStatus === 2) {
    logs.push({
      time: o.auditTime || '2026-10-11 09:15:00',
      title: '网点调度审核通过 (回传状态码 AUDITED)',
      desc: `审核人：${o.auditByName || o.auditor || '管理员'}，核对货物毛重体积与应收运费 ¥${o.totalFee || o.fTotal || 0} 无误`,
      type: 'success'
    })
  } else {
    logs.push({
      time: '待处理',
      title: '等待网点调度审核',
      desc: '可点击顶部工具栏【审核订单】或直接【转入运单】自动完成审核',
      type: 'warning'
    })
  }

  if (o.pickupTruckNo) {
    logs.push({
      time: '2026-10-11 10:10:00',
      title: '已指派短驳提货车辆 (回传状态码 PICKUP_DISPATCHED)',
      desc: `提货车牌：${o.pickupTruckNo}，司机：${o.pickupDriver || '赵铁柱'} (${o.pickupDriverPhone || '13922118899'})`,
      type: 'primary'
    })
  }

  if (o.isShip === 1) {
    logs.push({
      time: o.auditTime || '2026-10-11 10:25:00',
      title: '已正式转入干线运单 (回传状态码 WAYBILL_CREATED)',
      desc: `正式运单号：${o.shipNo}，已同步生成财务应收账款及回单跟踪记录`,
      type: 'success'
    })
  }

  return logs
})

const formattedRawJson = computed(() => {
  const o = traceOrder.value as any
  if (!o) return '{}'
  return JSON.stringify(
    {
      header: {
        appKey: 'KEBANG-OPENAPI-2026',
        channel: o.upstreamPlatform,
        msgType: 'TMS_ORDER_PUSH_REQ',
        signMethod: 'HMAC-SHA256',
        timestamp: o.createTime
      },
      body: {
        upstreamOrderNo: o.upstreamOrderNo,
        kebangOrderNo: o.orderNo,
        status: o.isRejected ? 'REJECTED' : o.isShip === 1 ? 'CONVERTED_TO_WAYBILL' : o.auditStatus === 2 ? 'AUDITED' : 'PENDING_AUDIT',
        linkedWaybillNo: o.shipNo || null,
        route: {
          originBranch: o.startGroup,
          originCity: o.startCity,
          destCity: o.destCity,
          destBranch: o.destGroup
        },
        shipper: {
          name: o.shipper,
          mobile: o.shipPhone,
          address: o.shipAddress
        },
        consignee: {
          name: o.receiver,
          mobile: o.receivePhone,
          address: o.receiveAddress
        },
        cargo: {
          goodsName: o.goodsName,
          packageType: o.pack,
          qty: o.number,
          weightKg: o.weight,
          volumeCbm: o.volume
        },
        settlement: {
          payMode: o.payMode,
          totalFee: o.fTotal,
          codAmount: o.fCollect
        }
      }
    },
    null,
    2
  )
})

function copyRawJson() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(formattedRawJson.value).catch(() => {})
  }
  ElMessage.success('上游原始报文 JSON 已复制到剪贴板')
}

function handleLockAppearance() {
  localStorage.setItem(STORAGE_KEY.value, JSON.stringify(allColumns.value))
  ElMessage.success('锁定外观保存成功')
}

function handleSaveColumns(newCols: GbColumnConfig[]) {
  allColumns.value = newCols
  localStorage.setItem(STORAGE_KEY.value, JSON.stringify(newCols))
}

// 6. 单元格格式化与金额绿字/零值留白规则（100% 复刻线上 GbTable）
const GREEN_MONEY_FIELDS = new Set([
  'worth',
  'fTotal',
  'freight',
  'fCash',
  'fDeliver',
  'fReceipt',
  'fMonth',
  'fDeduct',
  'fCollect',
  'fcService',
  'fReceive',
  'fDelivery',
  'fPremium',
  'fAdvance',
  'fReturn',
  'fDeliveryCost',
  'taxes'
])

function formatCellValue(row: OrderRecord & Record<string, any>, field: string): string {
  const val = row[field]
  if (val === undefined || val === null) return ''
  if (GREEN_MONEY_FIELDS.has(field)) {
    const num = Number(val)
    return num > 0 ? String(num) : ''
  }
  if (field === 'weight' || field === 'volume' || field === 'taxRate') {
    const num = Number(val)
    return num > 0 ? String(num) : ''
  }
  return String(val)
}

function getCellColorClass(field: string, row: OrderRecord & Record<string, any>): string {
  if (GREEN_MONEY_FIELDS.has(field) && Number(row[field]) > 0) {
    return 'text_success'
  }
  if (field === 'auditStatusStr') {
    if (row.isRejected) return 'text_danger'
    return row.auditStatus === 2 ? 'text_success' : 'text_warning'
  }
  if (field === 'isShipStr') {
    return row.isShip === 1 ? 'text_success' : 'text_warning'
  }
  return ''
}

function getColumnSum(rows: (OrderRecord & Record<string, any>)[], col: GbColumnConfig): string {
  if (!col.params?.isTotal) return ''
  const sum = rows.reduce((acc, r) => acc + (Number(r[col.field]) || 0), 0)
  if (sum === 0) return '0'
  return Number.isInteger(sum) ? String(sum) : sum.toFixed(2)
}

// 7. 表体与底部合计栏横向滚动同步 + 列宽拖拽
const tableBodyScrollRef = ref<HTMLElement | null>(null)
const tableFooterScrollRef = ref<HTMLElement | null>(null)

function handleBodyScroll() {
  if (tableBodyScrollRef.value && tableFooterScrollRef.value) {
    tableFooterScrollRef.value.scrollLeft = tableBodyScrollRef.value.scrollLeft
  }
}

function startResizeColumn(e: MouseEvent, col: GbColumnConfig) {
  const startX = e.clientX
  const startW = Number(col.width) || 110

  const onMouseMove = (moveEvent: MouseEvent) => {
    const delta = moveEvent.clientX - startX
    col.width = Math.max(60, startW + delta)
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<style scoped>
/* 100% 复刻线上 extracted_order_css.css 与 extracted_vxe_css.css */
.listBox {
  height: 100%;
  display: flex;
  flex-flow: column;
  background: #f0f2f5;
  overflow: hidden;
}

.listBox .contentBox {
  flex-shrink: 0;
}

.gbContainer {
  background-color: #fff;
  padding: 8px 7px;
  box-shadow: inset 0px 2px 0px 0px #6999dd;
  border-bottom: 1px solid rgba(64, 158, 255, 0.9) !important;
}

.listForm :deep(.el-form-item) {
  margin-right: 15px !important;
  margin-bottom: 9px !important;
  vertical-align: top !important;
}

.listForm :deep(.el-form-item__label) {
  line-height: 30px;
  font-size: 14px;
  color: #606266;
  padding-right: 8px;
}

.width-90 {
  width: 90px;
}

.width-220 {
  width: 220px !important;
}

.width-150 {
  width: 150px;
}

/* 始发网点树形多选框 downTree */
.down-tree-select {
  height: 28px;
  line-height: 26px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
}

.down-tree-select:hover {
  border-color: #c0c4cc;
}

.down-tree-tags {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow: hidden;
  flex: 1;
}

.down-tree-tags .placeholder {
  color: #a8abb2;
}

.net-tag {
  display: inline-flex;
  align-items: center;
  height: 20px;
  line-height: 18px;
  padding: 0 6px;
  background: #f4f4f5;
  border: 1px solid #e9e9eb;
  border-radius: 3px;
  color: #909399;
  font-size: 12px;
  white-space: nowrap;
}

.net-tag-close {
  margin-left: 4px;
  font-style: normal;
  cursor: pointer;
  font-size: 13px;
}

.net-tag-close:hover {
  color: #409eff;
}

.down-tree-arrow {
  color: #c0c4cc;
  font-size: 12px;
  margin-left: 4px;
}

.check-all-row {
  padding: 2px 8px 4px;
  border-bottom: 1px solid #ebeef5;
  margin-bottom: 4px;
}

/* 高级筛选图标 */
.Filter {
  font-size: 18px;
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
  padding-top: 2px;
  position: relative;
  display: inline-flex;
  align-items: center;
}

.filter-dot {
  position: absolute;
  top: -1px;
  right: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f56c6c;
}

/* 右侧分页器 GbElPager */
.gb-el-pager :deep(span) {
  font-size: 13px !important;
}

/* 第二行操作按钮栏 topToolBars */
.topToolBars {
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 0;
}

.topToolBars .otherRight {
  margin-left: auto;
  padding-right: 3px;
}

.gbContainer :deep(.el-button) {
  height: 28px;
  padding: 5px 8px;
  font-size: 14px;
  border-radius: 3px;
}

/* 绿色按钮 (#42b983 / disabled #8aceaf) */
.gbContainer :deep(.el-button--success) {
  background-color: #42b983;
  border-color: #42b983;
  color: #fff;
}

.gbContainer :deep(.el-button--success:hover) {
  background-color: #8aceaf;
  border-color: #8aceaf;
  color: #fff;
}

.gbContainer :deep(.el-button--success.is-disabled) {
  background-color: #8aceaf;
  border-color: #8aceaf;
  color: #fff;
}

/* 青色按钮 (#23C6C8 / disabled #8cd8da) */
.gbContainer :deep(.el-button--shortcut) {
  background: #23c6c8;
  border-color: #23c6c8;
  color: #fff;
}

.gbContainer :deep(.el-button--shortcut:hover) {
  background: #8cd8da;
  border-color: #8cd8da;
  color: #fff;
}

.gbContainer :deep(.el-button--shortcut.is-disabled) {
  background: #8cd8da;
  border-color: #8cd8da;
  color: #fff;
  cursor: not-allowed;
}

/* 蓝色按钮 (#4a9aec / hover #6bacef) */
.gbContainer :deep(.el-button--primary) {
  background-color: #4a9aec;
  border-color: #4a9aec;
  color: #fff;
}

.gbContainer :deep(.el-button--primary:hover) {
  background-color: #6bacef;
  border-color: #6bacef;
  color: #fff;
}

/* 表格区域 tableBox */
.tableBox {
  flex-grow: 1;
  display: flex;
  padding: 0 1px;
  background: #ffffff;
  overflow: hidden;
  min-height: 0;
}

.gb-vxe-grid {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.gb-vxe-scroll-wrapper {
  flex: 1;
  overflow: auto;
  min-height: 0;
  position: relative;
}

.gb-vxe-table {
  border-collapse: separate;
  border-spacing: 0;
  table-layout: fixed;
}

/* 60px 天蓝色表头 rgba(64, 158, 255, 0.9) */
.gb-vxe-thead {
  position: sticky;
  top: 0;
  z-index: 12;
}

.gb-vxe-th {
  height: 60px;
  padding: 4px 5px;
  background-color: #4c9ef4;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  text-align: left;
  border-right: 1px solid #cad5f7;
  border-bottom: 1px solid #cad5f7;
  position: relative;
  box-sizing: border-box;
  user-select: none;
}

.gb-vxe-th.col-checkbox {
  text-align: center;
  padding-left: 11px !important;
}

.gb-vxe-th.col-seq {
  text-align: left;
  padding-left: 6px;
  vertical-align: middle;
}

.th-seq-title {
  line-height: 52px;
  font-size: 13px;
  font-weight: 700;
}

.th-inner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 51px;
}

.th-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 24px;
  line-height: 24px;
  padding-right: 2px;
}

.th-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 排序上下三角按钮 */
.vxe-cell--sort {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 18px;
  cursor: pointer;
  flex-shrink: 0;
}

.vxe-sort--asc-btn {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 5px solid rgba(255, 255, 255, 0.65);
  margin-bottom: 2px;
}

.vxe-sort--asc-btn.active {
  border-bottom-color: #fff;
}

.vxe-sort--desc-btn {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid rgba(255, 255, 255, 0.65);
}

.vxe-sort--desc-btn.active {
  border-top-color: #fff;
}

/* 表头内嵌 24px 直角白色输入框 */
.th-filter-row {
  height: 24px;
  display: flex;
  align-items: center;
}

.header-filter-input :deep(.el-input__wrapper) {
  height: 24px !important;
  line-height: 24px !important;
  border-radius: 0 !important;
  padding: 0 5px !important;
  background: #ffffff !important;
  box-shadow: none !important;
}

.header-filter-input :deep(.el-input__inner) {
  height: 22px !important;
  line-height: 22px !important;
  font-size: 12px !important;
  color: #333 !important;
}

/* 列宽拖拽手柄 */
.col-resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  cursor: col-resize;
  z-index: 2;
}

/* 表体行样式 */
.gb-vxe-tr {
  height: 32px;
  background-color: #ffffff;
  transition: background-color 0.1s;
}

.gb-vxe-tr.row--stripe {
  background-color: #f4f8ff;
}

.gb-vxe-tr:hover,
.gb-vxe-tr.row--cheched {
  background-color: rgba(64, 158, 255, 0.35) !important;
}

.gb-vxe-td {
  height: 32px;
  padding: 0 5px;
  font-size: 13px;
  color: #606266;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gb-vxe-td.col-checkbox {
  text-align: center;
}

.gb-vxe-td.col-seq {
  text-align: left;
  padding-left: 6px;
}

.cell-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

/* 冻结列背景保护 */
.sticky-col {
  position: sticky;
}

.gb-vxe-tr .sticky-col {
  background-color: #ffffff;
  z-index: 3;
}

.gb-vxe-tr.row--stripe .sticky-col {
  background-color: #f4f8ff;
}

.gb-vxe-tr:hover .sticky-col,
.gb-vxe-tr.row--cheched .sticky-col {
  background-color: #b3d8ff !important;
}

/* 蓝字链接与绿字正数金额 */
.text_link {
  color: #409eff;
}

.isLink {
  cursor: pointer;
}

.isLink:hover {
  text-decoration: underline;
}

.text_success {
  color: #13ce66 !important;
  font-weight: 600;
}

.text_warning {
  color: #e6a23c !important;
  font-weight: 600;
}

.text_danger {
  color: #f56c6c !important;
  font-weight: 600;
}

.empty-td {
  height: 180px;
  text-align: center;
  color: #909399;
  font-size: 13px;
}

/* 底部发光蓝色阴影合计栏 */
.gb-vxe-footer-wrapper {
  flex-shrink: 0;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 0 5px #4f77cb;
  position: relative;
  z-index: 8;
}

.gb-vxe-footer-row {
  height: 32px;
  background: #ffffff;
}

.gb-vxe-ftd {
  height: 32px;
  padding: 0 5px;
  font-size: 13px;
  color: #606266;
  border-right: 1px solid #e8eaec;
  border-top: 1px solid #e8eaec;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #ffffff;
}

.gb-vxe-ftd.col-checkbox {
  text-align: center;
}
</style>
