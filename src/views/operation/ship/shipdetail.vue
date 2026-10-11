<template>
  <div class="ship-detail-page">
    <!-- 顶部单号检索栏 -->
    <div class="detail-search-bar">
      <div class="search-left">
        <el-select v-model="searchType" size="small" style="width: 100px">
          <el-option label="运单号" value="shipNo" />
          <el-option label="货号" value="goodsNo" />
          <el-option label="入库单号" value="thirdNo" />
        </el-select>
        <el-input
          v-model="searchKeyword"
          size="small"
          placeholder="请输入运单号/货号回车查询"
          style="width: 220px"
          clearable
          @keyup.enter="handleQueryWaybill"
        />
        <el-button size="small" type="primary" :icon="Search" @click="handleQueryWaybill">
          查询
        </el-button>
      </div>

      <div v-if="currentShip" class="search-right">
        <el-tag size="small" type="primary">运单号：{{ currentShip.orderNo }}</el-tag>
        <el-tag size="small" type="success">{{ currentShip.oStatusStr }}</el-tag>
        <el-tag size="small" type="info">
          {{ currentShip.startGroup }} → {{ currentShip.destGroup }} ({{ currentShip.destCity }})
        </el-tag>
        <el-button
          size="small"
          type="primary"
          plain
          :icon="Edit"
          @click="router.push(`/customRoute/updateShip/${currentShip.id}`)"
        >
          修改运单
        </el-button>
      </div>
    </div>

    <!-- 7大页签 (1:1 线上运单综合查询) -->
    <div class="detail-tabs-box">
      <el-tabs v-model="activeTab" type="card" class="ship-detail-tabs">
        <!-- Tab 1: 运单详情 -->
        <el-tab-pane label="运单详情" name="detail">
          <div v-if="currentShip" class="waybill-sheet">
            <div class="sheet-title">货 物 托 运 单</div>
            <div class="sheet-meta">
              <span><strong>运单号：</strong>{{ currentShip.orderNo }}</span>
              <span><strong>状态：</strong>{{ currentShip.oStatusStr }}</span>
              <span><strong>托运日期：</strong>{{ currentShip.shippingDate }}</span>
              <span><strong>开单网点：</strong>{{ currentShip.openGroup }}</span>
            </div>

            <div class="sheet-box">
              <div class="sheet-row grid-5">
                <div class="s-cell"><label>始发网点：</label>{{ currentShip.startGroup }}</div>
                <div class="s-cell"><label>到站城市：</label>{{ currentShip.destCity }}</div>
                <div class="s-cell"><label>运输线路：</label>{{ currentShip.shippingRouteStr }}</div>
                <div class="s-cell"><label>终端网点：</label>{{ currentShip.destGroup }}</div>
                <div class="s-cell"><label>货号：</label>{{ currentShip.goodsNo }}</div>
              </div>

              <div class="sheet-row grid-2">
                <div class="s-cell">
                  <label>发货方：</label>
                  {{ currentShip.shipper }} / {{ currentShip.shipPhone }} / {{ currentShip.shipUnit }} ({{ currentShip.shipAddress }})
                </div>
                <div class="s-cell">
                  <label>收货方：</label>
                  {{ currentShip.receiver }} / {{ currentShip.receivePhone }} / {{ currentShip.receiveUnit }} ({{ currentShip.receiveAddress }})
                </div>
              </div>

              <div class="sheet-row grid-6">
                <div class="s-cell"><label>接货车号：</label>{{ currentShip.plateNo || '-' }}</div>
                <div class="s-cell"><label>接货司机：</label>{{ currentShip.driverName || '-' }}</div>
                <div class="s-cell"><label>司机电话：</label>{{ currentShip.driverPhone || '-' }}</div>
                <div class="s-cell"><label>品名：</label>{{ currentShip.goodsName }}</div>
                <div class="s-cell"><label>包装/型号：</label>{{ currentShip.pack }} / {{ currentShip.model }}</div>
                <div class="s-cell">
                  <label>件/重/体：</label>
                  {{ currentShip.numberCount }}件 / {{ currentShip.weightCount }}kg / {{ currentShip.volumeCount }}m³
                </div>
              </div>

              <div class="sheet-row grid-6">
                <div class="s-cell"><label>合计运费：</label><b class="red-num">¥{{ currentShip.fTotal }}</b></div>
                <div class="s-cell"><label>基本运费：</label>¥{{ currentShip.freight }}</div>
                <div class="s-cell"><label>送货费：</label>¥{{ currentShip.fDelivery }}</div>
                <div class="s-cell"><label>保价/保险：</label>¥{{ currentShip.fPremium }}</div>
                <div class="s-cell"><label>代收货款：</label>¥{{ currentShip.fCollect }}</div>
                <div class="s-cell"><label>结算方式：</label>{{ currentShip.payType }}</div>
              </div>

              <div class="sheet-row grid-6">
                <div class="s-cell"><label>现付：</label>¥{{ currentShip.fCash }}</div>
                <div class="s-cell"><label>提付：</label>¥{{ currentShip.fDeliver }}</div>
                <div class="s-cell"><label>回单付：</label>¥{{ currentShip.fReceipt }}</div>
                <div class="s-cell"><label>月结：</label>¥{{ currentShip.fMonth }}</div>
                <div class="s-cell"><label>交货方式：</label>{{ currentShip.deliveryType }}</div>
                <div class="s-cell"><label>回单要求：</label>{{ currentShip.receipt }}</div>
              </div>

              <div class="sheet-row grid-2">
                <div class="s-cell"><label>开单人/业务员：</label>{{ currentShip.creator }} / {{ currentShip.salesMan }}</div>
                <div class="s-cell"><label>备注：</label>{{ currentShip.remark || '无' }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- Tab 2: 运单跟踪 -->
        <el-tab-pane label="运单跟踪" name="track">
          <div class="pane-toolbar">
            <el-button size="small" type="primary" :icon="Plus" @click="trackModalVisible = true">
              新增运单跟踪
            </el-button>
          </div>
          <el-table :data="waybillTracks" size="small" border stripe>
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="time" label="跟踪时间" width="165" />
            <el-table-column prop="nodeType" label="操作节点" width="120" />
            <el-table-column prop="group" label="操作网点" width="120" />
            <el-table-column prop="operator" label="操作人" width="100" />
            <el-table-column prop="content" label="跟踪详情描述" min-width="280" />
          </el-table>
        </el-tab-pane>

        <!-- Tab 3: 车辆轨迹 -->
        <el-tab-pane label="车辆轨迹" name="gps">
          <div class="gps-container">
            <div class="gps-info-side">
              <h4>干线承运车辆实时信息</h4>
              <p><strong>车牌号码：</strong>粤A·99681挂</p>
              <p><strong>随车司机：</strong>罗成刚 (13822119900)</p>
              <p><strong>运行线路：</strong>{{ currentShip?.shippingRouteStr || '广州-长沙专线' }}</p>
              <p><strong>当前车速：</strong>78 km/h (北斗/GPS双模在线)</p>
              <p><strong>当前位置：</strong>G4京港澳高速湖南衡阳段 K1682</p>
              <p><strong>预计到达：</strong>2026-10-12 06:00:00</p>
            </div>
            <div class="gps-map-canvas">
              <div class="route-visual">
                <div class="route-stop done">
                  <div class="dot"></div>
                  <div class="stop-name">广州白云总部</div>
                  <div class="stop-time">10-11 08:30 发车</div>
                </div>
                <div class="route-line done"></div>
                <div class="route-stop done">
                  <div class="dot"></div>
                  <div class="stop-name">韶关北互通</div>
                  <div class="stop-time">10-11 11:20 途经</div>
                </div>
                <div class="route-line active"></div>
                <div class="route-stop active">
                  <div class="dot pulse"></div>
                  <div class="stop-name">衡阳服务区 (当前位置)</div>
                  <div class="stop-time">车速 78km/h</div>
                </div>
                <div class="route-line"></div>
                <div class="route-stop">
                  <div class="dot"></div>
                  <div class="stop-name">{{ currentShip?.destGroup || '长沙分部' }}</div>
                  <div class="stop-time">预计明日 06:00 到达</div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>

        <!-- Tab 4: 财务管理 -->
        <el-tab-pane label="财务管理" name="finance">
          <el-table :data="financeRows" size="small" border stripe show-summary>
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="feeType" label="费用类型" width="120" />
            <el-table-column prop="direction" label="收支方向" width="100" />
            <el-table-column prop="amount" label="金额(元)" width="120" />
            <el-table-column prop="settled" label="已结金额" width="120" />
            <el-table-column prop="unsettled" label="未结余额" width="120" />
            <el-table-column prop="status" label="核销状态" width="110">
              <template #default="{ row }">
                <el-tag :type="row.status === '已核销' ? 'success' : 'warning'" size="small">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="财务摘要" min-width="200" />
          </el-table>
        </el-tab-pane>

        <!-- Tab 5: 改单记录 -->
        <el-tab-pane label="改单记录" name="upd">
          <el-table :data="shipUpdLogs" size="small" border stripe>
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="orderNo" label="运单号" width="130" />
            <el-table-column prop="creator" label="改单人" width="100" />
            <el-table-column prop="creationTime" label="改单时间" width="165" />
            <el-table-column prop="bfTotal" label="改单前运费" width="110" />
            <el-table-column prop="efTotal" label="改单后运费" width="110" />
            <el-table-column prop="fDiff" label="运费差额" width="100" />
            <el-table-column prop="content" label="修改内容明细" min-width="260" />
          </el-table>
        </el-tab-pane>

        <!-- Tab 6: 图片管理 (联动运单档案与批量图片上传) -->
        <el-tab-pane label="图片管理" name="images">
          <div class="img-manage-box">
            <el-upload drag action="#" :auto-upload="false" multiple :show-file-list="false" :on-change="handleAddImg">
              <div class="el-upload__text">将回单照片/装车照片拖到此处，或 <em>点击上传照片至本运单</em></div>
            </el-upload>
            <div v-if="uploadedImages.length > 0" class="img-cards">
              <div v-for="(img, idx) in uploadedImages" :key="idx" class="img-card">
                <div class="img-thumb" @click="handlePreviewImage(img)">
                  <div class="img-type-badge">{{ img.type }}</div>
                  <div class="img-icon-mock">📷</div>
                  <div class="img-hover-tip">点击查看大图</div>
                </div>
                <div class="img-meta">
                  <div class="img-name" :title="img.name">{{ img.name }}</div>
                  <div class="sub">{{ img.time }}</div>
                  <div class="card-btns">
                    <el-button size="small" type="primary" link @click="handlePreviewImage(img)">查看</el-button>
                    <el-button size="small" type="danger" link @click="handleDeleteImage(idx)">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="empty-img-tip" style="text-align: center; padding: 24px; color: #909399;">
              暂未关联任何运单照片，请拖拽或点击上方区域上传回单/货物/装车照片
            </div>
          </div>
        </el-tab-pane>

        <!-- Tab 7: 回单及签收 -->
        <el-tab-pane label="回单及签收" name="receipt">
          <el-descriptions :column="3" border size="small">
            <el-descriptions-item label="回单要求">{{ currentShip?.receipt || '回单原件 2份' }}</el-descriptions-item>
            <el-descriptions-item label="回单状态">
              <el-tag size="small" type="success">已寄出</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="回单快递号">SF1429883920112</el-descriptions-item>
            <el-descriptions-item label="签收状态">{{ currentShip?.oStatusStr }}</el-descriptions-item>
            <el-descriptions-item label="签收人">{{ currentShip?.signPerson || currentShip?.receiver }}</el-descriptions-item>
            <el-descriptions-item label="签收关系">{{ currentShip?.signRelation || '本人签收' }}</el-descriptions-item>
            <el-descriptions-item label="签收时间">{{ currentShip?.signDate || '待签收' }}</el-descriptions-item>
            <el-descriptions-item label="签收证件号">{{ currentShip?.signCardId || currentShip?.receiveIdCard }}</el-descriptions-item>
            <el-descriptions-item label="签收网点">{{ currentShip?.destGroup }}</el-descriptions-item>
            <el-descriptions-item label="代收货款实收">
              {{ currentShip?.fCollect > 0 ? `¥${currentShip?.fCollect} (${currentShip?.codPayType || '已收回'})` : '无' }}
            </el-descriptions-item>
            <el-descriptions-item label="签收备注" :span="2">{{ currentShip?.signRemark || '货物外包装完好' }}</el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>

        <!-- Tab 8: 短信发送 (Parity with menuData.ts osms 1:1) -->
        <el-tab-pane label="短信发送" name="sms">
          <div class="sms-pane-box">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card shadow="never" class="sms-sender-card">
                  <template #header>
                    <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                      <span><strong>运单短信快速推送</strong></span>
                      <el-tag size="small" type="info">短信剩余额度：12,580 条</el-tag>
                    </div>
                  </template>

                  <el-form :model="smsForm" label-width="90px" size="small">
                    <el-form-item label="接收对象">
                      <el-radio-group v-model="smsForm.targetType" @change="onSmsTargetChange">
                        <el-radio value="receiver">收货人 ({{ currentShip?.receiver }})</el-radio>
                        <el-radio value="shipper">发货人 ({{ currentShip?.shipper }})</el-radio>
                        <el-radio value="custom">指定手机号</el-radio>
                      </el-radio-group>
                    </el-form-item>

                    <el-form-item label="接收手机" required>
                      <el-input v-model="smsForm.mobile" placeholder="请输入接收人11位手机号码" />
                    </el-form-item>

                    <el-form-item label="预置模板">
                      <el-select
                        v-model="smsForm.templateKey"
                        placeholder="请选择预置短信模板"
                        style="width: 100%"
                        @change="onSmsTemplateChange"
                      >
                        <el-option label="【发货通知】通知客户货物已由始发网点发出" value="tpl_ship" />
                        <el-option label="【到货通知】通知收货人货物已到达终端网点" value="tpl_arrive" />
                        <el-option label="【派送提醒】通知收货人随车司机正在送货" value="tpl_delivery" />
                        <el-option label="【签收提醒】通知发货人运单已被成功签收" value="tpl_sign" />
                        <el-option label="【货款通知】通知发货人代收货款已成功收回" value="tpl_cod" />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="短信内容" required>
                      <el-input
                        v-model="smsForm.content"
                        type="textarea"
                        :rows="4"
                        placeholder="请输入短信正文内容"
                      />
                      <div class="sms-counter" style="margin-top: 6px; font-size: 12px; color: #909399;">
                        当前字数：<b>{{ smsForm.content.length }}</b> 字 | 预估计费：<b>{{ Math.ceil(smsForm.content.length / 70) || 1 }}</b> 条
                      </div>
                    </el-form-item>

                    <el-form-item>
                      <el-button
                        type="primary"
                        :loading="smsSending"
                        @click="handleSendSms"
                      >
                        立即发送短信
                      </el-button>
                      <el-button @click="resetSmsForm">重 置</el-button>
                    </el-form-item>
                  </el-form>
                </el-card>
              </el-col>

              <el-col :span="12">
                <el-card shadow="never" class="sms-log-card">
                  <template #header>
                    <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                      <span><strong>本单短信发送流水</strong></span>
                      <el-tag size="small" type="success">累计发送 {{ smsHistoryList.length }} 条</el-tag>
                    </div>
                  </template>

                  <el-table :data="smsHistoryList" size="small" border stripe max-height="340px">
                    <el-table-column prop="sendTime" label="发送时间" width="140" />
                    <el-table-column prop="mobile" label="接收手机" width="115" />
                    <el-table-column prop="receiverName" label="接收人" width="80" />
                    <el-table-column prop="content" label="短信内容" min-width="180" show-overflow-tooltip />
                    <el-table-column prop="status" label="状态" width="75">
                      <template #default="{ row }">
                        <el-tag :type="row.status === '成功' ? 'success' : 'danger'" size="small">
                          {{ row.status }}
                        </el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 新增运单跟踪弹窗 -->
    <el-dialog v-model="trackModalVisible" title="新增运单跟踪记录" width="460px" draggable>
      <el-form :model="newTrack" label-width="85px" size="small">
        <el-form-item label="操作节点">
          <el-select v-model="newTrack.nodeType" style="width: 100%">
            <el-option label="在途上报" value="在途上报" />
            <el-option label="装车发车" value="装车发车" />
            <el-option label="到达入库" value="到达入库" />
            <el-option label="派送通知" value="派送通知" />
          </el-select>
        </el-form-item>
        <el-form-item label="跟踪内容">
          <el-input v-model="newTrack.content" type="textarea" :rows="3" placeholder="请输入运单跟踪情况" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="trackModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitNewTrack">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 真实大图预览弹窗 -->
    <el-dialog v-model="imagePreviewVisible" :title="previewTargetImg?.name || '图片预览'" width="640px" draggable>
      <div style="text-align: center; padding: 16px; background: #f8fafc; border-radius: 4px;">
        <div style="width: 100%; height: 320px; background: linear-gradient(135deg, #e4edf8 0%, #edf2f7 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px dashed #b8d2eb; border-radius: 4px;">
          <div style="font-size: 48px; margin-bottom: 12px;">🖼️</div>
          <div style="font-size: 16px; font-weight: 600; color: #2c5282;">{{ previewTargetImg?.name }}</div>
          <div style="font-size: 13px; color: #718096; margin-top: 6px;">
            所属分类：<span style="color: #3182ce; font-weight: 600;">{{ previewTargetImg?.type }}</span> | 上传时间：{{ previewTargetImg?.time }}
          </div>
          <div style="font-size: 12px; color: #a0aec0; margin-top: 10px;">
            关联运单：{{ currentShip?.orderNo }} | 始发站：{{ currentShip?.startGroup }} → 目的站：{{ currentShip?.destGroup }}
          </div>
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="imagePreviewVisible = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="ElMessage.success('已将图片另存为本地备份')">下载原图</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search, Edit, Plus } from '@element-plus/icons-vue'
import { useOperationStore } from '@/store/operation'

const route = useRoute()
const router = useRouter()
const opStore = useOperationStore()

const searchType = ref('shipNo')
const searchKeyword = ref('')
const activeTab = ref('detail')

const currentShip = ref<Record<string, any> | null>(opStore.shipList[0] || null)

function syncFromRoute() {
  const qId = String(route.query.shipid || '')
  if (qId) {
    searchKeyword.value = qId
    const found = opStore.shipList.find(
      r => r.orderNo === qId || r.id === qId || r.goodsNo === qId
    )
    if (found) currentShip.value = found
  }
  const tab = String(route.query.tab || '')
  if (tab) {
    activeTab.value = tab
  } else if (route.path.endsWith('/odetail')) {
    activeTab.value = 'detail'
  } else if (route.path.endsWith('/olocus')) {
    activeTab.value = 'gps'
  } else if (route.path.endsWith('/ofinance')) {
    activeTab.value = 'finance'
  } else if (route.path.endsWith('/oupdate')) {
    activeTab.value = 'upd'
  } else if (route.path.endsWith('/oimage')) {
    activeTab.value = 'images'
  } else if (route.path.endsWith('/obacksign')) {
    activeTab.value = 'receipt'
  } else if (route.path.endsWith('/osms')) {
    activeTab.value = 'sms'
  }
}

onMounted(syncFromRoute)
watch(() => [route.query.shipid, route.query.tab, route.path], syncFromRoute)

function handleQueryWaybill() {
  const kw = searchKeyword.value.trim().toLowerCase()
  if (!kw) {
    currentShip.value = opStore.shipList[0] || null
    return
  }
  const found = opStore.shipList.find(
    r =>
      String(r.orderNo || '').toLowerCase().includes(kw) ||
      String(r.goodsNo || '').toLowerCase().includes(kw) ||
      String(r.thirdNo || '').toLowerCase().includes(kw)
  )
  if (found) {
    currentShip.value = found
    ElMessage.success(`已加载运单 ${found.orderNo}`)
  } else {
    ElMessage.warning('未找到匹配的运单号')
  }
}

// 运单跟踪列表
const customTracks = ref<Record<string, any>[]>([])
const waybillTracks = computed(() => {
  const s = currentShip.value
  if (!s) return []
  return [
    ...customTracks.value,
    {
      time: s.creationTime,
      nodeType: '开单入库',
      group: s.openGroup || '总部',
      operator: s.creator || '管理员',
      content: `运单【${s.orderNo}】已开立入库，始发站【${s.startGroup}】发往【${s.destGroup}】，共 ${s.numberCount} 件`
    },
    {
      time: '2026-10-11 09:15:00',
      nodeType: '干线配载',
      group: '总部',
      operator: '调度员罗工',
      content: `已装入干线车次【GX261011001】（车牌：粤A·99681挂，司机：罗成刚）发往【${s.destGroup}】`
    }
  ]
})

const trackModalVisible = ref(false)
const newTrack = reactive({
  nodeType: '在途上报',
  content: ''
})

function submitNewTrack() {
  if (!newTrack.content.trim()) {
    ElMessage.warning('请输入跟踪内容')
    return
  }
  customTracks.value.unshift({
    time: new Date().toISOString().replace('T', ' ').slice(0, 19),
    nodeType: newTrack.nodeType,
    group: '总部',
    operator: '管理员',
    content: newTrack.content
  })
  newTrack.content = ''
  trackModalVisible.value = false
  ElMessage.success('已添加运单跟踪记录')
}

// 财务台账
const financeRows = computed(() => {
  const s = currentShip.value
  if (!s) return []
  return [
    {
      feeType: '基本运费',
      direction: '应收',
      amount: s.freight || 0,
      settled: s.fCash || 0,
      unsettled: (s.freight || 0) - (s.fCash || 0),
      status: s.fCash >= s.freight ? '已核销' : '部分核销',
      remark: `${s.payType}结算`
    },
    {
      feeType: '送货费',
      direction: '应收',
      amount: s.fDelivery || 0,
      settled: s.fDelivery || 0,
      unsettled: 0,
      status: '已核销',
      remark: '终端送货上门费'
    },
    {
      feeType: '代收货款',
      direction: '代收',
      amount: s.fCollect || 0,
      settled: 0,
      unsettled: s.fCollect || 0,
      status: s.fCollect > 0 ? '待收回' : '已核销',
      remark: `货款手续费 ¥${s.fcService || 0}`
    },
    {
      feeType: '大车分摊成本',
      direction: '应付',
      amount: s.cost || 580,
      settled: 300,
      unsettled: (s.cost || 580) - 300,
      status: '部分核销',
      remark: '干线车次分摊运费'
    }
  ]
})

// 改单记录
const shipUpdLogs = computed(() => {
  const s = currentShip.value
  if (!s) return opStore.updList
  const matched = opStore.updList.filter(u => u.orderNo === s.orderNo)
  return matched.length > 0 ? matched : opStore.updList
})

// 图片管理与预览
const imagePreviewVisible = ref(false)
const previewTargetImg = ref<Record<string, any> | null>(null)

const uploadedImages = computed({
  get() {
    if (!currentShip.value) return []
    if (!Array.isArray(currentShip.value.images)) {
      currentShip.value.images = [
        { name: `${currentShip.value.orderNo}_托运单客户签字联.jpg`, type: '开单货物照', time: currentShip.value.creationTime || '2026-10-11 08:33:00' },
        { name: `${currentShip.value.orderNo}_月台装车铅封照片.jpg`, type: '装车照片', time: '2026-10-11 08:50:00' },
        { name: `${currentShip.value.orderNo}_电子回单原件.jpg`, type: '电子回单照', time: '2026-10-11 10:15:00' }
      ]
    }
    return currentShip.value.images
  },
  set(val) {
    if (currentShip.value) {
      currentShip.value.images = val
    }
  }
})

function handleAddImg(file: any) {
  if (!currentShip.value) return
  if (!Array.isArray(currentShip.value.images)) {
    currentShip.value.images = []
  }
  const imgItem = {
    name: file?.name || `运单图片_${Date.now()}.jpg`,
    type: '电子回单照',
    time: new Date().toISOString().replace('T', ' ').slice(0, 19)
  }
  currentShip.value.images.unshift(imgItem)
  ElMessage.success(`已为运单【${currentShip.value.orderNo}】添加图片档案`)
}

function handlePreviewImage(img: Record<string, any>) {
  previewTargetImg.value = img
  imagePreviewVisible.value = true
}

function handleDeleteImage(idx: number) {
  if (currentShip.value && Array.isArray(currentShip.value.images)) {
    currentShip.value.images.splice(idx, 1)
    ElMessage.success('已删除该图片记录')
  }
}

// Tab 8: 短信发送逻辑
const smsForm = reactive({
  targetType: 'receiver',
  mobile: '',
  templateKey: 'tpl_ship',
  content: ''
})

const smsSending = ref(false)
const smsHistoryList = ref<Record<string, any>[]>([
  {
    sendTime: '2026-10-11 08:35:10',
    mobile: '13974812233',
    receiverName: '张向东',
    content: '【星云物流】尊敬的客户，您的货物[变频空调室内机]80件已从广州总部发出，运单号ZB2610110001，可凭单号在线查询。',
    status: '成功'
  }
])

function generateSmsContent(key: string): string {
  const s = currentShip.value || {}
  const shipNo = s.orderNo || 'ZB2610110001'
  const gName = s.goodsName || '货物'
  const num = s.numberCount || 1
  const startG = s.startGroup || '总部'
  const destG = s.destGroup || '终端网点'
  const driver = s.driverName || '罗师傅'
  const driverPhone = s.driverPhone || '13800000000'
  const signer = s.signPerson || s.receiver || '客户'
  const cod = s.fCollect || 0

  switch (key) {
    case 'tpl_ship':
      return `【星云物流】尊敬的客户，您的货物[${gName}]共${num}件已由[${startG}]正式发运，运单号[${shipNo}]，请您留意查收。`
    case 'tpl_arrive':
      return `【星云物流】尊敬的客户，您的运单[${shipNo}]货物已安全到达[${destG}]，请凭收货人有效证件尽快前往提货或保持电话畅通。`
    case 'tpl_delivery':
      return `【星云物流】尊敬的客户，您的运单[${shipNo}]正在由配送员${driver}（${driverPhone}）送货上门，请保持电话畅通。`
    case 'tpl_sign':
      return `【星云物流】尊敬的客户，您的运单[${shipNo}]已由[${signer}]签收完成，感谢您对星云TMS的支持！`
    case 'tpl_cod':
      return `【星云物流】尊敬的客户，您的运单[${shipNo}]代收货款 ¥${cod} 元已由我司财务成功收回并完成核销，请核对账单。`
    default:
      return `【星云物流】尊敬的客户，您的运单[${shipNo}]状态已有更新，详情请联系物流客服。`
  }
}

function onSmsTargetChange() {
  if (smsForm.targetType === 'receiver') {
    smsForm.mobile = currentShip.value?.receivePhone || ''
  } else if (smsForm.targetType === 'shipper') {
    smsForm.mobile = currentShip.value?.shipPhone || ''
  } else {
    smsForm.mobile = ''
  }
}

function onSmsTemplateChange() {
  smsForm.content = generateSmsContent(smsForm.templateKey)
}

function resetSmsForm() {
  smsForm.targetType = 'receiver'
  smsForm.mobile = currentShip.value?.receivePhone || ''
  smsForm.templateKey = 'tpl_ship'
  smsForm.content = generateSmsContent('tpl_ship')
}

watch(
  () => currentShip.value,
  () => {
    resetSmsForm()
  },
  { immediate: true }
)

function handleSendSms() {
  if (!smsForm.mobile.trim()) {
    ElMessage.warning('请输入接收手机号码')
    return
  }
  if (!smsForm.content.trim()) {
    ElMessage.warning('请输入短信正文内容')
    return
  }
  smsSending.value = true
  setTimeout(() => {
    smsSending.value = false
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const recName =
      smsForm.targetType === 'receiver'
        ? currentShip.value?.receiver || '收货人'
        : smsForm.targetType === 'shipper'
        ? currentShip.value?.shipper || '发货人'
        : '指定联系人'

    smsHistoryList.value.unshift({
      sendTime: now,
      mobile: smsForm.mobile,
      receiverName: recName,
      content: smsForm.content,
      status: '成功'
    })
    ElMessage.success(`短信已成功发送至 ${smsForm.mobile}！`)
  }, 300)
}
</script>

<style scoped>
.ship-detail-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 84px);
  padding: 8px;
  background-color: #f0f2f5;
  box-sizing: border-box;
}

.detail-search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  padding: 8px 12px;
  margin-bottom: 8px;
}

.search-left,
.search-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-tabs-box {
  flex: 1;
  background: #ffffff;
  border: 1px solid #dcdfe6;
  padding: 10px 12px;
  overflow: auto;
}

.waybill-sheet {
  padding: 6px;
}

.sheet-title {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 8px;
  margin-bottom: 8px;
}

.sheet-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #606266;
  margin-bottom: 6px;
}

.sheet-box {
  border: 1px solid #78aadd;
  font-size: 12px;
}

.sheet-row {
  display: grid;
  border-bottom: 1px solid #a6c8eb;
}

.sheet-row:last-child {
  border-bottom: none;
}

.grid-5 {
  grid-template-columns: repeat(5, 1fr);
}
.grid-2 {
  grid-template-columns: 1fr 1fr;
}
.grid-6 {
  grid-template-columns: repeat(6, 1fr);
}

.s-cell {
  padding: 8px 10px;
  border-right: 1px solid #dbe8f7;
  color: #303133;
}

.s-cell:last-child {
  border-right: none;
}

.s-cell label {
  color: #606266;
}

.red-num {
  color: #f56c6c;
}

.pane-toolbar {
  margin-bottom: 8px;
}

/* 车辆轨迹可视化 */
.gps-container {
  display: flex;
  gap: 16px;
  min-height: 320px;
}

.gps-info-side {
  width: 280px;
  background: #f8fafc;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 14px;
  font-size: 12px;
  line-height: 2;
}

.gps-info-side h4 {
  margin: 0 0 10px;
  color: #3888fa;
  font-size: 14px;
}

.gps-map-canvas {
  flex: 1;
  background: linear-gradient(135deg, #eef5fe 0%, #f5f9ff 100%);
  border: 1px solid #cde0f5;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.route-visual {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 720px;
}

.route-stop {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 140px;
}

.route-stop .dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #c0c4cc;
  margin-bottom: 6px;
}

.route-stop.done .dot {
  background: #24b678;
}

.route-stop.active .dot {
  background: #3888fa;
  box-shadow: 0 0 0 5px rgba(56, 136, 250, 0.25);
}

.stop-name {
  font-size: 12px;
  font-weight: 600;
  color: #303133;
}

.stop-time {
  font-size: 11px;
  color: #909399;
}

.route-line {
  flex: 1;
  height: 3px;
  background: #dcdfe6;
}

.route-line.done {
  background: #24b678;
}

.route-line.active {
  background: #3888fa;
}

.img-manage-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.img-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.img-card {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
  background: #ffffff;
  transition: all 0.2s;
}

.img-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #409eff;
}

.img-thumb {
  height: 110px;
  background: linear-gradient(135deg, #eef5fe 0%, #f0f7ff 100%);
  color: #3888fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.img-type-badge {
  position: absolute;
  top: 6px;
  left: 6px;
  background: rgba(64, 158, 255, 0.9);
  color: #fff;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 3px;
}

.img-icon-mock {
  font-size: 32px;
}

.img-hover-tip {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 11px;
  text-align: center;
  padding: 3px 0;
  opacity: 0;
  transition: opacity 0.2s;
}

.img-thumb:hover .img-hover-tip {
  opacity: 1;
}

.img-meta {
  padding: 8px 10px;
  font-size: 12px;
}

.img-name {
  font-weight: 600;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-meta .sub {
  color: #909399;
  font-size: 11px;
  margin-top: 2px;
}

.card-btns {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  border-top: 1px dashed #ebeef5;
  padding-top: 4px;
}

.sms-pane-box {
  padding: 4px;
}

.sms-sender-card,
.sms-log-card {
  min-height: 400px;
}
</style>
