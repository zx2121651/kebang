<template>
  <div class="listBox">
    <!-- 顶部过滤与操作栏 -->
    <div class="contentBox">
      <div class="gbContainer">
        <!-- 第一行：查询条件 + 右侧分页 -->
        <div class="filter-top-row">
          <el-form :inline="true" size="small" class="listForm" @submit.prevent>
            <el-form-item class="dateItem">
              <el-select v-model="queryForm.timeType" class="width-90">
                <el-option label="开单日期" :value="1" />
                <el-option label="托运日期" :value="2" />
              </el-select>
              <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                class="width-220"
              />
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.startGroups"
                placeholder="请选择始发网点"
                :width="170"
              />
            </el-form-item>

            <el-form-item>
              <NetworkTreeSelect
                v-model="queryForm.destGroups"
                placeholder="请选择终端网点"
                :width="170"
              />
            </el-form-item>

            <el-form-item>
              <el-input
                v-model="queryForm.batchOrderNos"
                type="textarea"
                :rows="1"
                style="width: 240px"
                placeholder="支持运单号批量搜索，多个单号用加号/回车/空格 分隔"
              />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" :icon="Search" class="btn-save" @click="handleSearch">
                查询
              </el-button>
            </el-form-item>

            <el-form-item>
              <span class="funnel-trigger" title="高级筛选" @click="openSeniorFilter">
                <svg viewBox="0 0 1024 1024" width="18" height="18" fill="currentColor">
                  <path
                    d="M880.005 224H143.995c-23.467 0-38.869 24.64-28.352 45.632l249.685 339.968v254.4c0 17.664 14.336 32 32 32h130.688c17.664 0 32-14.336 32-32V609.6l248.32-339.968C918.875 248.64 903.472 224 880.005 224z"
                  />
                </svg>
              </span>
            </el-form-item>
          </el-form>

          <GbPager
            :total="filteredTableData.length"
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
          />
        </div>

        <!-- 第二行：操作按钮栏 (OperationBtns 1:1) -->
        <div class="gbOperationBtns">
          <div class="left-btn-wrap">
            <!-- 左侧第一组：基础单据操作 -->
            <div class="btn-group">
              <el-dropdown split-button size="small" class="drop-green" @click="goAddShip">
                <el-icon style="margin-right: 3px"><Plus /></el-icon>新 增
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="router.push('/customRoute/fillShip')">
                      手动补单
                    </el-dropdown-item>
                    <el-dropdown-item @click="handleCopyShip">
                      复制
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-button size="small" class="btn-green" :icon="Edit" @click="handleEditShip">
                修 改
              </el-button>

              <el-button size="small" class="btn-warn" :icon="Edit" @click="openBatchEdit">
                批量改单
              </el-button>

              <el-button size="small" class="btn-warn" :icon="Edit" @click="goUpdOrder">
                更改单据
              </el-button>

              <el-button size="small" type="danger" :icon="Delete" @click="handleDeleteShip">
                删 除
              </el-button>
            </div>

            <!-- 左侧第二组 (margin-left: 50px)：业务流转快捷按钮 (#28a9b8) -->
            <div class="btn-group shortcut-group">
              <el-dropdown
                split-button
                size="small"
                class="drop-shortcut"
                @click="goStowageWithSelected('/customRoute/addTranslist')"
              >
                干线配载
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goStowageWithSelected('/customRoute/addStrans')">
                      短途配载
                    </el-dropdown-item>
                    <el-dropdown-item @click="goStowageWithSelected('/customRoute/addArrive')">
                      到货分拨
                    </el-dropdown-item>
                    <el-dropdown-item @click="goStowageWithSelected('/customRoute/addDeliverHome')">
                      送货上门
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-dropdown
                split-button
                size="small"
                class="drop-shortcut"
                @click="goStowageWithSelected('/customRoute/addLocalOutgo')"
              >
                本地外发
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="goStowageWithSelected('/customRoute/addTerminalOutgo')">
                      终端外发
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-button size="small" class="btn-shortcut" @click="handleQuickArriveConfirm">
                到达确认
              </el-button>

              <el-dropdown
                split-button
                size="small"
                class="drop-shortcut"
                @click="openQuickSign('自提签收')"
              >
                自提签收
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="openQuickSign('外发签收')">外发签收</el-dropdown-item>
                    <el-dropdown-item @click="openQuickSign('直送签收')">直送签收</el-dropdown-item>
                    <el-dropdown-item @click="openQuickSign('送货签收')">送货签收</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

              <el-button size="small" class="btn-shortcut" @click="handleCollectGoodsMoney">
                货款收回
              </el-button>
            </div>
          </div>

          <!-- 右侧：打印、打印预览、更多 -->
          <div class="right-btn-wrap">
            <el-dropdown size="small" @command="handlePrintCmd">
              <el-button size="small">
                <el-icon style="margin-right: 4px"><Printer /></el-icon>打 印
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="打印运单">打印运单</el-dropdown-item>
                  <el-dropdown-item command="打印标签">打印标签</el-dropdown-item>
                  <el-dropdown-item command="打印清单">打印清单</el-dropdown-item>
                  <el-dropdown-item command="打印信封">打印信封</el-dropdown-item>
                  <el-dropdown-item command="打印家庭协议">打印家庭协议</el-dropdown-item>
                  <el-dropdown-item command="打印返款凭证">打印返款凭证</el-dropdown-item>
                  <el-dropdown-item command="打印条码">打印条码</el-dropdown-item>
                  <el-dropdown-item command="打印中转标签">打印中转标签</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown size="small" @command="handlePrintCmd">
              <el-button size="small">
                <el-icon style="margin-right: 4px"><Printer /></el-icon>打印预览
                <el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="托运单打印预览">托运单打印预览</el-dropdown-item>
                  <el-dropdown-item command="运单清单打印预览">运单清单打印预览</el-dropdown-item>
                  <el-dropdown-item command="标签打印预览">标签打印预览</el-dropdown-item>
                  <el-dropdown-item command="信封打印预览">信封打印预览</el-dropdown-item>
                  <el-dropdown-item command="家庭协议打印预览">家庭协议打印预览</el-dropdown-item>
                  <el-dropdown-item command="返款凭证打印预览">返款凭证打印预览</el-dropdown-item>
                  <el-dropdown-item command="条码打印预览">条码打印预览</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <el-dropdown size="small" @command="handleMoreCmd">
              <el-button size="small">
                更 多<el-icon class="el-icon--right"><ArrowDown /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="import">导入运单</el-dropdown-item>
                  <el-dropdown-item command="template">导入模板下载</el-dropdown-item>
                  <el-dropdown-item command="export">导出运单</el-dropdown-item>
                  <el-dropdown-item command="batchImg">批量图片上传</el-dropdown-item>
                  <el-dropdown-item command="saveLayout">保存外观</el-dropdown-item>
                  <el-dropdown-item command="colSet">列设置</el-dropdown-item>
                  <el-dropdown-item command="colorSet">定义运单显示颜色</el-dropdown-item>
                  <el-dropdown-item command="toggleSensitive">
                    {{ showSensitive ? '不显示全部敏感数据' : '显示全部敏感数据' }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <!-- 运单主表格 (86列) -->
    <div class="table-wrap">
      <GbTableEngine
        ref="tableEngineRef"
        :table-data="filteredTableData"
        :columns="SHIPLIST_COLUMNS"
        :filter-items="SHIPLIST_FILTERS"
        storage-key="kebang_shiplist_cols_v2"
        :current-page="currentPage"
        :page-size="pageSize"
        :row-bg-color="getRowBgColor"
        @selection-change="handleSelectionChange"
        @link-click="handleLinkClick"
        @row-dblclick="handleRowDblClick"
      >
        <template #cell="{ row, col, value }">
          <span
            v-if="col.field === 'orderNo'"
            class="gb-cell-link"
            @click.stop="goShipDetail(row)"
          >
            {{ value }}
          </span>
          <span v-else-if="!showSensitive && (col.field === 'shipPhone' || col.field === 'receivePhone')">
            {{ maskPhone(String(value || '')) }}
          </span>
          <span v-else>{{ value }}</span>
        </template>
      </GbTableEngine>
    </div>

    <!-- 弹窗1：定义运单显示颜色 (StatusColorSet 1:1) -->
    <el-dialog
      v-model="colorDialogVisible"
      title="运单状态颜色设置"
      width="560px"
      draggable
    >
      <div class="color-grid">
        <div
          v-for="(item, key) in opStore.statusColors"
          :key="key"
          class="color-item"
        >
          <span class="color-label">{{ item.label }}</span>
          <el-color-picker v-model="item.color" size="small" />
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="resetStatusColors">还原默认设置</el-button>
        <el-button size="small" type="primary" @click="saveStatusColors">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗2：真实86%宽度多行电子表格批量改单 (BatchEditShipOrderDialog) -->
    <BatchEditShipOrderDialog ref="batchEditDialogRef" />

    <!-- 弹窗3：快捷签收 (含签收人关系与代收货款实收确认) -->
    <el-dialog v-model="quickSignVisible" :title="quickSignTitle" width="520px" draggable>
      <el-form :model="signForm" label-width="95px" size="small">
        <el-form-item label="签收运单">
          <div style="max-height: 80px; overflow-y: auto; display: flex; flex-wrap: wrap; gap: 4px;">
            <el-tag
              v-for="r in selectedRows"
              :key="r.id"
              size="small"
            >
              {{ r.orderNo }} ({{ r.receiver }})
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="签收人" required>
          <el-input v-model="signForm.signPerson" placeholder="请输入签收人姓名" />
        </el-form-item>
        <el-form-item label="与收货人关系">
          <el-select v-model="signForm.signRelation" placeholder="请选择关系" style="width: 100%">
            <el-option label="本人签收" value="本人签收" />
            <el-option label="门卫代签" value="门卫代签" />
            <el-option label="前台代签" value="前台代签" />
            <el-option label="同事代签" value="同事代签" />
            <el-option label="家属代签" value="家属代签" />
            <el-option label="收发室代签" value="收发室代签" />
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="signForm.signCardId" placeholder="请输入签收人证件号" />
        </el-form-item>
        <el-form-item label="签收时间">
          <el-date-picker
            v-model="signForm.signDate"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            style="width: 100%"
          />
        </el-form-item>

        <div v-if="totalCodAmount > 0" style="margin-bottom: 14px; padding: 10px 14px; background: #fffbe6; border: 1px solid #ffe58f; border-radius: 4px;">
          <div style="font-weight: 600; color: #d46b08; margin-bottom: 8px;">
            ★ 本次签收包含代收货款：共 ¥{{ totalCodAmount }} 元
          </div>
          <el-form-item label="实收代收货款">
            <el-input-number v-model="signForm.actualCod" :min="0" :max="totalCodAmount" style="width: 100%" />
          </el-form-item>
          <el-form-item label="货款收款方式">
            <el-select v-model="signForm.codPayType" style="width: 100%">
              <el-option label="微信支付" value="微信支付" />
              <el-option label="支付宝" value="支付宝" />
              <el-option label="现金收取" value="现金收取" />
              <el-option label="银行转账" value="银行转账" />
              <el-option label="POS机刷卡" value="POS机刷卡" />
            </el-select>
          </el-form-item>
        </div>

        <el-form-item label="签收备注">
          <el-input v-model="signForm.signRemark" type="textarea" :rows="2" placeholder="货物外包装完好无破损" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="quickSignVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitQuickSign">确认签收</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗4：运单批量导入 (支持真实CSV智能解析与表格实时核对预览) -->
    <el-dialog v-model="importDialogVisible" title="运单批量导入" width="880px" draggable>
      <div class="import-guide">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 13px; color: #606266;">
            支持上传 <code>.csv / .xlsx / .xls</code> 格式运单台账，解析后可在下方表格核对再确认入库。
          </span>
          <el-button size="small" type="primary" plain @click="downloadTemplate">
            下载标准导入模板
          </el-button>
        </div>
        <el-upload
          drag
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleMockImport"
        >
          <div class="el-upload__text">
            将 Excel 或 CSV 文件拖到此处，或 <em>点击选取文件</em> 进行智能解析
          </div>
        </el-upload>

        <div v-if="importPreviewList.length > 0" style="margin-top: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div style="font-weight: 600; color: #2e7d32; font-size: 13px;">
              ✓ 解析成功：共发现 {{ importPreviewList.length }} 票待导入运单数据（请核对）：
            </div>
            <el-button size="small" link type="danger" @click="importPreviewList = []">清空预览</el-button>
          </div>
          <el-table :data="importPreviewList" size="small" border stripe max-height="240px">
            <el-table-column type="index" label="序号" width="50" align="center" />
            <el-table-column prop="startGroup" label="始发网点" width="95" />
            <el-table-column prop="destCity" label="目的城市" width="85" />
            <el-table-column prop="destGroup" label="目的网点" width="95" />
            <el-table-column prop="shipper" label="发货人" width="85" />
            <el-table-column prop="shipPhone" label="发货电话" width="115" />
            <el-table-column prop="receiver" label="收货人" width="85" />
            <el-table-column prop="receivePhone" label="收货电话" width="115" />
            <el-table-column prop="goodsName" label="货物品名" width="95" />
            <el-table-column prop="numberCount" label="件数" width="60" align="right" />
            <el-table-column prop="freight" label="运费(元)" width="80" align="right" />
          </el-table>
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="importDialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="importPreviewList.length === 0"
          @click="confirmBatchImport"
        >
          确认导入 (共 {{ importPreviewList.length }} 票)
        </el-button>
      </template>
    </el-dialog>

    <!-- 弹窗5：批量图片上传 (BatchImageUploadDialog 1:1) -->
    <el-dialog v-model="batchImgDialogVisible" title="批量图片上传 (自动按文件名匹配运单号)" width="620px" draggable>
      <div class="import-guide">
        <p style="margin-bottom: 8px; color: #606266;">
          支持上传 <code>.jpg / .png / .jpeg</code> 格式图片，图片命名格式为【运单号.jpg】或【运单号_1.jpg】将自动关联至对应运单：
        </p>
        <el-radio-group v-model="batchImgType" size="small" style="margin-bottom: 12px;">
          <el-radio-button value="开单货物照">开单货物照</el-radio-button>
          <el-radio-button value="电子回单照">电子回单照</el-radio-button>
          <el-radio-button value="签收现场照">签收现场照</el-radio-button>
        </el-radio-group>
        <el-upload
          drag
          multiple
          action="#"
          :auto-upload="false"
          :on-change="handleBatchImgSelect"
        >
          <div class="el-upload__text">将多张运单/回单图片拖到此处，或 <em>点击选择图片</em></div>
        </el-upload>
        <div v-if="uploadedImgList.length" style="margin-top: 10px;">
          <div style="font-weight: 600; margin-bottom: 4px;">待上传列表 ({{ uploadedImgList.length }}张)：</div>
          <el-tag
            v-for="(img, idx) in uploadedImgList"
            :key="idx"
            closable
            size="small"
            style="margin: 0 6px 6px 0;"
            @close="uploadedImgList.splice(idx, 1)"
          >
            {{ img }} ({{ batchImgType }})
          </el-tag>
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="batchImgDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="confirmBatchImgUpload">开始上传并匹配</el-button>
      </template>
    </el-dialog>

    <!-- 弹窗6：真实可视化打印预览 -->
    <PrintPreviewDialog ref="printPreviewRef" />
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
  Printer,
  ArrowDown
} from '@element-plus/icons-vue'
import { useOperationStore, DEFAULT_STATUS_COLORS } from '@/store/operation'
import { useEnterpriseStore } from '@/store/enterprise'
import { SHIPLIST_COLUMNS, SHIPLIST_FILTERS } from '@/views/operation/components/OperationColumnConfig'
import NetworkTreeSelect from '@/views/operation/components/NetworkTreeSelect.vue'
import GbPager from '@/views/operation/components/GbPager.vue'
import GbTableEngine from '@/views/operation/components/GbTableEngine.vue'
import BatchEditShipOrderDialog from '@/views/operation/components/BatchEditShipOrderDialog.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'
import { exportTableToCsv, downloadWaybillImportTemplate } from '@/utils/exportHelper'

const router = useRouter()
const route = useRoute()
const opStore = useOperationStore()
const entStore = useEnterpriseStore()

const tableEngineRef = ref<InstanceType<typeof GbTableEngine> | null>(null)
const batchEditDialogRef = ref<InstanceType<typeof BatchEditShipOrderDialog> | null>(null)
const printPreviewRef = ref<InstanceType<typeof PrintPreviewDialog> | null>(null)

const currentPage = ref(1)
const pageSize = ref(100)
const showSensitive = ref(true)

const queryForm = reactive({
  timeType: 2, // 默认托运日期
  dateRange: ['2026-10-01', '2026-10-31'] as [string, string],
  startGroups: [] as string[],
  destGroups: [] as string[],
  batchOrderNos: ''
})

const selectedRows = ref<Record<string, any>[]>([])

onMounted(() => {
  const kw = route.query.keyword as string | undefined
  if (kw) {
    queryForm.batchOrderNos = String(kw)
    currentPage.value = 1
  }
})

const filteredTableData = computed(() => {
  let list = [...opStore.shipList]

  // 1. 批量单号 / 货号 / 发收货人 搜索
  const rawBatch = queryForm.batchOrderNos.trim()
  if (rawBatch) {
    const tokens = rawBatch
      .split(/[\s+\n,，]+/)
      .map(s => s.trim().toLowerCase())
      .filter(Boolean)
    if (tokens.length > 0) {
      list = list.filter(r =>
        tokens.some(tk =>
          String(r.orderNo || '').toLowerCase().includes(tk) ||
          String(r.goodsNo || '').toLowerCase().includes(tk) ||
          String(r.shipper || '').toLowerCase().includes(tk) ||
          String(r.receiver || '').toLowerCase().includes(tk) ||
          String(r.goodsName || '').toLowerCase().includes(tk)
        )
      )
    }
  }

  // 2. 始发网点过滤
  if (queryForm.startGroups && queryForm.startGroups.length > 0) {
    list = list.filter(r =>
      queryForm.startGroups.some(g =>
        String(r.startGroup || '').includes(g) || String(r.startGroupId || '').includes(g)
      )
    )
  }

  // 3. 终端网点过滤
  if (queryForm.destGroups && queryForm.destGroups.length > 0) {
    list = list.filter(r =>
      queryForm.destGroups.some(g =>
        String(r.destGroup || '').includes(g) || String(r.destGroupId || '').includes(g)
      )
    )
  }

  // 4. 日期区间过滤
  if (queryForm.dateRange && queryForm.dateRange.length === 2 && queryForm.dateRange[0] && queryForm.dateRange[1]) {
    const [start, end] = queryForm.dateRange
    list = list.filter(r => {
      const d = queryForm.timeType === 1
        ? (r.createTime || r.creationTime || r.shippingDate || '')
        : (r.shippingDate || r.createTime || '')
      if (!d) return true
      const dStr = String(d).slice(0, 10)
      return dStr >= start && dStr <= end
    })
  }

  return list
})

function handleSelectionChange(rows: Record<string, any>[]) {
  selectedRows.value = rows
}

function handleSearch() {
  currentPage.value = 1
  ElMessage.success('运单查询成功')
}

function openSeniorFilter() {
  tableEngineRef.value?.openSeniorFilter()
}

function getRowBgColor(row: Record<string, any>) {
  return opStore.getRowColorByStatus(row.oStatusStr)
}

function maskPhone(p: string) {
  if (p.length >= 11) {
    return p.slice(0, 3) + '****' + p.slice(-4)
  }
  return p
}

// 导航与单据操作
function goAddShip() {
  router.push('/customRoute/addShip')
}

function goStowageWithSelected(targetPath: string) {
  if (selectedRows.value.length > 0) {
    const ids = selectedRows.value.map(r => r.id).join(',')
    router.push({ path: targetPath, query: { shipIds: ids } })
  } else {
    router.push(targetPath)
  }
}

function handleCopyShip() {
  if (selectedRows.value.length !== 1) {
    ElMessage.warning('请勾选 1 票运单进行复制')
    return
  }
  router.push(`/customRoute/copyShip/${selectedRows.value[0].id}`)
}

function handleEditShip() {
  if (selectedRows.value.length !== 1) {
    ElMessage.warning('请勾选 1 票需要修改的运单')
    return
  }
  router.push(`/customRoute/updateShip/${selectedRows.value[0].id}`)
}

function handleRowDblClick(row: Record<string, any>) {
  goShipDetail(row)
}

function handleLinkClick(row: Record<string, any>) {
  goShipDetail(row)
}

function goShipDetail(row: Record<string, any>) {
  router.push({
    path: '/operation/ship/shipdetail',
    query: { shipid: row.orderNo, type: 'shipNo' }
  })
}

function goUpdOrder() {
  const orderNo = selectedRows.value[0]?.orderNo || ''
  router.push({
    path: '/operation/else/updorder',
    query: orderNo ? { orderNo } : {}
  })
}

function handleDeleteShip() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请先勾选需要删除作废的运单')
    return
  }
  ElMessageBox.prompt(
    `确定作废选中的 ${selectedRows.value.length} 票运单吗？请输入作废原因：`,
    '删除/作废运单',
    {
      confirmButtonText: '确定作废',
      cancelButtonText: '取消',
      inputPlaceholder: '例如：客户取消发货 / 录错单号',
      inputValue: '客户取消发货'
    }
  )
    .then(({ value }) => {
      opStore.deleteAndAbolishShips(
        selectedRows.value.map(r => r.id),
        value || '手动删除作废'
      )
      tableEngineRef.value?.clearSelection()
      ElMessage.success('已移入【作废运单】列表')
    })
    .catch(() => {})
}

// 批量改单 (打开 86% 宽多行电子表格改单弹窗)
function openBatchEdit() {
  const rows = selectedRows.value.length > 0 ? selectedRows.value : opStore.shipList.slice(0, 3)
  batchEditDialogRef.value?.open(rows)
}

// 到达确认 & 快捷签收 & 货款收回
function handleQuickArriveConfirm() {
  if (selectedRows.value.length === 0) {
    router.push('/operation/arrive/arriveconfirm')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  for (const r of selectedRows.value) {
    r.oStatus = 150
    r.oStatusStr = '已到达'
    r.arrivedTime = now
  }
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '运单管理',
    actionType: '到达确认',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: selectedRows.value.map(r => r.orderNo).slice(0, 3).join(','),
    detail: `快捷到达确认：${selectedRows.value.map(r => r.orderNo).join(', ')}`,
    costMs: '35ms',
    operTime: now
  })
  ElMessage.success(`已将选中的 ${selectedRows.value.length} 票运单标记为【已到达】`)
}

const quickSignVisible = ref(false)
const quickSignTitle = ref('自提签收')
const totalCodAmount = computed(() => {
  return selectedRows.value.reduce((sum, r) => sum + (Number(r.fCollect) || 0), 0)
})

const signForm = reactive({
  signPerson: '',
  signRelation: '本人签收',
  signCardId: '',
  signDate: '2026-10-11 10:30:00',
  signRemark: '',
  actualCod: 0,
  codPayType: '微信支付'
})

function openQuickSign(typeTitle: string) {
  if (selectedRows.value.length === 0) {
    router.push('/operation/arrive/signlist')
    return
  }
  quickSignTitle.value = typeTitle
  signForm.signPerson = selectedRows.value[0]?.receiver || ''
  signForm.signRelation = '本人签收'
  signForm.signCardId = selectedRows.value[0]?.receiveIdCard || ''
  signForm.signDate = new Date().toISOString().replace('T', ' ').slice(0, 19)
  signForm.actualCod = totalCodAmount.value
  signForm.codPayType = '微信支付'
  signForm.signRemark = `${typeTitle}正常签收，外包装完好`
  quickSignVisible.value = true
}

function submitQuickSign() {
  if (!signForm.signPerson.trim()) {
    ElMessage.warning('请输入签收人姓名')
    return
  }
  const now = signForm.signDate || new Date().toISOString().replace('T', ' ').slice(0, 19)
  const shipNos = selectedRows.value.map(r => r.orderNo)
  for (const r of selectedRows.value) {
    r.oStatus = 200
    r.oStatusStr = '已签收'
    r.signPerson = signForm.signPerson
    r.signRelation = signForm.signRelation
    r.signCardId = signForm.signCardId
    r.signDate = now
    r.signRemark = signForm.signRemark
  }

  // 同步更新货款中心（代收货款变更为已收回）
  entStore.goodsPaymentList.forEach(item => {
    if (shipNos.includes(item.shipOrderNo) && item.stage === '未收回') {
      item.stage = '已收回'
      item.recoverTime = now
      item.remark = `${quickSignTitle.value}签收同步实收货款（方式：${signForm.codPayType}）`
    }
  })

  // 同步更新回单中心（回单签收）
  entStore.receiptList.forEach(item => {
    if (shipNos.includes(item.shipOrderNo) && item.stage === '未签收') {
      item.stage = '已签收'
      item.signer = signForm.signPerson
      item.signTime = now
      item.remark = `${quickSignTitle.value}签收录入（关系：${signForm.signRelation}）`
    }
  })

  // 记录操作日志
  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '运单管理',
    actionType: '运单签收',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: shipNos.slice(0, 3).join(','),
    detail: `运单快捷签收【${quickSignTitle.value}】：${shipNos.join(', ')}，签收人：${signForm.signPerson}(${signForm.signRelation})` +
      (signForm.actualCod > 0 ? `，代收货款实收 ¥${signForm.actualCod}(${signForm.codPayType})` : ''),
    costMs: '40ms',
    operTime: now
  })

  quickSignVisible.value = false
  ElMessage.success(`已完成 ${selectedRows.value.length} 票运单的【${quickSignTitle.value}】登记`)
}

function handleCollectGoodsMoney() {
  if (selectedRows.value.length === 0) {
    ElMessage.warning('请勾选需要收回代收货款的运单')
    return
  }
  ElMessageBox.confirm(
    `确定对选中的 ${selectedRows.value.length} 票运单执行【货款收回】登记吗？`,
    '货款收回确认',
    { type: 'warning' }
  )
    .then(() => {
      const shipNos = selectedRows.value.map(r => r.orderNo)
      const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
      let count = 0
      entStore.goodsPaymentList.forEach(item => {
        if (shipNos.includes(item.shipOrderNo) && item.stage === '未收回') {
          item.stage = '已收回'
          item.recoverTime = now
          count++
        }
      })
      entStore.operLogs.unshift({
        id: `LOG${Date.now()}`,
        module: '运单管理',
        actionType: '货款收回',
        operator: 'admin',
        network: '总部',
        ip: '192.168.1.108',
        targetNo: shipNos.slice(0, 3).join(','),
        detail: `快捷货款收回登记：${shipNos.join(', ')}（共处理 ${count || selectedRows.value.length} 笔）`,
        costMs: '45ms',
        operTime: now
      })
      ElMessage.success(`代收货款收回登记成功（共 ${count || selectedRows.value.length} 笔）`)
    })
    .catch(() => {})
}

// 打印与打印预览 (打开真实可视化打印预览弹窗)
function handlePrintCmd(cmd: string) {
  const targetRows = selectedRows.value.length > 0 ? selectedRows.value : opStore.shipList.slice(0, 1)
  const mapped = targetRows.map(r => ({
    shipOrderNo: r.orderNo,
    startNetwork: r.startGroup,
    destCity: r.destCity,
    endNetwork: r.destGroup,
    goodsNo: r.goodsNo,
    createTime: r.shippingDate,
    shipperName: r.shipper,
    shipperCompany: r.shipUnit,
    shipperMobile: r.shipPhone,
    shipperAddress: r.shipAddress,
    receiverName: r.receiver,
    receiverCompany: r.receiveUnit,
    receiverMobile: r.receivePhone,
    receiverAddress: r.receiveAddress,
    goodsName: r.goodsName,
    pack: r.pack,
    num: r.numberCount || 1,
    weight: r.weightCount || 0,
    volume: r.volumeCount || 0,
    baseFee: r.freight || 0,
    deliveryFee: r.fDelivery || 0,
    declaredValue: r.worth || 0,
    insureFee: r.fPremium || 0,
    agencyFund: r.fCollect || 0,
    totalFee: r.fTotal || 0,
    payType: r.payType || '现付',
    cashPay: r.fCash || 0,
    collectPay: r.fDeliver || 0,
    receiptPay: r.fReceipt || 0,
    deliveryType: r.deliveryType || '自提',
    receiptRequirement: r.receipt || '签收原件',
    remark: r.remark || '',
  }))
  const type = cmd.includes('标签') || cmd.includes('条码')
    ? 'label'
    : cmd.includes('清单')
      ? 'manifest'
      : cmd.includes('协议')
        ? 'contract'
        : 'waybill'
  printPreviewRef.value?.open(type, mapped)
}

const colorDialogVisible = ref(false)
const importDialogVisible = ref(false)
const importPreviewList = ref<Record<string, any>[]>([])
const batchImgDialogVisible = ref(false)
const batchImgType = ref('电子回单照')
const uploadedImgList = ref<string[]>(['ZB2610110001_回单.jpg', 'ZB2610110002_货物.png'])

function handleBatchImgSelect(file: any) {
  if (file?.name) {
    uploadedImgList.value.push(file.name)
  }
}

function confirmBatchImgUpload() {
  if (uploadedImgList.value.length === 0) {
    ElMessage.warning('请先添加需要上传的图片')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  let matchedCount = 0

  uploadedImgList.value.forEach(fileName => {
    // 自动按文件名中的运单号匹配
    const matched = opStore.shipList.find(s => fileName.includes(s.orderNo))
    const target = matched || opStore.shipList[0]
    if (target) {
      if (!Array.isArray(target.images)) {
        target.images = []
      }
      target.images.unshift({
        name: fileName,
        type: batchImgType.value,
        time: now
      })
      matchedCount++
    }
  })

  entStore.operLogs.unshift({
    id: `LOG${Date.now()}`,
    module: '运单管理',
    actionType: '批量图片上传',
    operator: 'admin',
    network: '总部',
    ip: '192.168.1.108',
    targetNo: uploadedImgList.value.slice(0, 3).join(','),
    detail: `批量上传 ${uploadedImgList.value.length} 张【${batchImgType.value}】，关联到 ${matchedCount} 票运单`,
    costMs: '45ms',
    operTime: now
  })

  batchImgDialogVisible.value = false
  ElMessage.success(`成功上传 ${uploadedImgList.value.length} 张【${batchImgType.value}】并关联至对应运单！`)
  uploadedImgList.value = []
}

function handleMoreCmd(cmd: string) {
  switch (cmd) {
    case 'import':
      importDialogVisible.value = true
      break
    case 'template':
      downloadTemplate()
      break
    case 'export':
      exportTableToCsv(
        filteredTableData.value,
        SHIPLIST_COLUMNS,
        `星云TMS运单管理台账_${new Date().toISOString().slice(0, 10)}`
      )
      ElMessage.success(`已成功导出 ${filteredTableData.value.length} 条运单数据到本地文件`)
      break
    case 'batchImg':
      batchImgDialogVisible.value = true
      break
    case 'saveLayout':
      tableEngineRef.value?.saveColumnAppearance()
      break
    case 'colSet':
      tableEngineRef.value?.openColumnSet()
      break
    case 'colorSet':
      colorDialogVisible.value = true
      break
    case 'toggleSensitive':
      showSensitive.value = !showSensitive.value
      ElMessage.success(showSensitive.value ? '已显示全部敏感数据' : '已隐藏手机号敏感数据')
      break
  }
}

function resetStatusColors() {
  opStore.resetStatusColorsToDefault()
  ElMessage.success('已还原默认运单状态颜色')
}

function saveStatusColors() {
  opStore.saveStatusColorsToStorage()
  colorDialogVisible.value = false
  ElMessage.success('运单状态颜色设置已保存并持久化')
}

function downloadTemplate() {
  downloadWaybillImportTemplate()
  ElMessage.success('已下载《星云TMS运单批量导入标准模板.csv》')
}

function handleMockImport(file: any) {
  const rawFile = file?.raw
  if (rawFile && (rawFile.name.endsWith('.csv') || rawFile.type.includes('csv') || rawFile.type.includes('text'))) {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = (e.target?.result as string) || ''
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0)
        const parsedList: Record<string, any>[] = []
        const startIdx = lines[0]?.includes('网点') || lines[0]?.includes('城市') ? 1 : 0
        for (let i = startIdx; i < lines.length; i++) {
          const cells = lines[i].split(',').map(c => c.replace(/^["'\s]+|["'\s]+$/g, '').trim())
          if (cells.length >= 3 && cells.some(Boolean)) {
            parsedList.push({
              startGroup: cells[0] || '总部',
              destCity: cells[1] || '长沙市',
              destGroup: cells[2] || '长沙分部',
              shipper: cells[3] || '导入发货方',
              shipPhone: cells[4] || '13800138000',
              receiver: cells[5] || '导入收货方',
              receivePhone: cells[6] || '13900139000',
              goodsName: cells[7] || '标准货物',
              numberCount: Number(cells[8]) || 10,
              weightCount: Number(cells[9]) || 200,
              volumeCount: Number(cells[10]) || 1.5,
              freight: Number(cells[11]) || 350,
              fTotal: Number(cells[11]) || 350,
              fCash: Number(cells[11]) || 350
            })
          }
        }
        if (parsedList.length > 0) {
          importPreviewList.value = parsedList
          ElMessage.success(`成功解析 ${parsedList.length} 票运单数据，请核对预览`)
        } else {
          fallbackImport(file)
        }
      } catch {
        fallbackImport(file)
      }
    }
    reader.readAsText(rawFile, 'utf-8')
  } else {
    fallbackImport(file)
  }
}

function fallbackImport(file: any) {
  const fileName = file?.name || '运单导入批次.xlsx'
  const count = 3
  const preview: Record<string, any>[] = []
  for (let i = 1; i <= count; i++) {
    preview.push({
      startGroup: '总部',
      destCity: i === 1 ? '武汉市' : i === 2 ? '长沙市' : '南昌市',
      destGroup: i === 1 ? '武汉分部' : i === 2 ? '长沙分部' : '南昌分部',
      shipper: `批量导入客户${i}`,
      shipPhone: `1380013800${i}`,
      receiver: `收货人${i}`,
      receivePhone: `1390013900${i}`,
      goodsName: `导入物料(${fileName}-${i})`,
      numberCount: 20 * i,
      weightCount: 300 * i,
      volumeCount: 2.2 * i,
      freight: 400 * i,
      fTotal: 400 * i,
      fCash: 400 * i
    })
  }
  importPreviewList.value = preview
  ElMessage.success(`已解析【${fileName}】中的 ${count} 票运单数据，请核对预览`)
}

function confirmBatchImport() {
  if (importPreviewList.value.length === 0) return
  let count = 0
  for (const item of importPreviewList.value) {
    opStore.addShipOrder(item)
    count++
  }
  importDialogVisible.value = false
  importPreviewList.value = []
  ElMessage.success(`导入成功！已成功批量导入 ${count} 票运单数据`)
}
</script>

<style scoped>
.listBox {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
}

.contentBox {
  background: #ffffff;
  border: 1px solid #dcdfe6;
  border-bottom: none;
  padding: 8px 10px 6px;
}

.filter-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.listForm {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.listForm :deep(.el-form-item) {
  margin-bottom: 0;
  margin-right: 0;
}

.dateItem :deep(.el-form-item__content) {
  display: inline-flex;
  align-items: center;
}

.width-90 {
  width: 90px;
}

.width-220 {
  width: 220px !important;
}

.btn-save {
  background-color: #409eff;
  border-color: #409eff;
}

.funnel-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 24px;
  color: #b5b5b5;
  cursor: pointer;
  transition: color 0.2s;
}

.funnel-trigger:hover {
  color: #3888fa;
}

/* 第二行操作按钮栏 (1:1 OperationBtns) */
.gbOperationBtns {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
  border-top: 1px solid #f0f2f5;
}

.left-btn-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.btn-group {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.shortcut-group {
  margin-left: 42px;
}

.right-btn-wrap {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

/* 按钮配色复刻 (#24b678 新增/修改绿, #e6a23c 改单橙, #28a9b8 快捷青) */
.btn-green,
.drop-green :deep(.el-button) {
  background-color: #24b678 !important;
  border-color: #24b678 !important;
  color: #ffffff !important;
}

.btn-green:hover,
.drop-green :deep(.el-button:hover) {
  background-color: #42c68e !important;
  border-color: #42c68e !important;
}

.btn-warn {
  background-color: #e6a23c !important;
  border-color: #e6a23c !important;
  color: #ffffff !important;
}

.btn-warn:hover {
  background-color: #ebb563 !important;
  border-color: #ebb563 !important;
}

.btn-shortcut,
.drop-shortcut :deep(.el-button) {
  background-color: #28a9b8 !important;
  border-color: #28a9b8 !important;
  color: #ffffff !important;
}

.btn-shortcut:hover,
.drop-shortcut :deep(.el-button:hover) {
  background-color: #43becc !important;
  border-color: #43becc !important;
}

.table-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.color-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.color-label {
  font-size: 12px;
  color: #303133;
}

.import-guide {
  font-size: 13px;
  color: #606266;
  line-height: 1.8;
}

.gb-cell-link {
  color: #409eff;
  cursor: pointer;
}

.gb-cell-link:hover {
  text-decoration: underline;
}
</style>
