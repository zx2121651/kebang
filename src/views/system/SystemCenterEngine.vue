<template>
  <div class="system-engine-page">
    <!-- 特例 1：更新日志时间轴 (/system/log/updataNews) -->
    <div v-if="pageKey === 'updataNews'" class="news-timeline-wrap">
      <el-card shadow="never">
        <template #header>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <span style="font-weight: 700; font-size: 15px">🚀 科邦智联 · 星云TMS SaaS 版本更新日志</span>
            <el-tag type="success">当前生产版本：V3.8.0</el-tag>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="ver in entStore.updateNewsList"
            :key="ver.version"
            :timestamp="ver.releaseDate"
            placement="top"
            type="primary"
            size="large"
          >
            <el-card shadow="hover">
              <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px">
                <b style="font-size: 15px; color: #303133">{{ ver.version }}</b>
                <el-tag size="small" type="danger">{{ ver.tag }}</el-tag>
              </div>
              <ul style="margin: 0; padding-left: 18px; line-height: 1.9; font-size: 13px; color: #606266">
                <li v-for="(hl, idx) in ver.highlights" :key="idx">{{ hl }}</li>
              </ul>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>

    <!-- 特例 2：自定义设置工作台 (/system/setting/define) -->
    <div v-else-if="pageKey === 'define'" class="define-workbench">
      <div class="def-header">
        <div class="dh-title">⚙️ 系统全局开单与业务规则自定义中心</div>
        <div class="dh-sub">点击下方任一配置模块，即可实时修改录运单布局、Enter光标路径、必填项、单号规则与路线价格表：</div>
      </div>
      <div class="def-grid">
        <div v-for="card in defineCards" :key="card.key" class="def-card" @click="openSettingDrawer(card.key)">
          <div class="dc-title">{{ card.title }}</div>
          <div class="dc-desc">{{ card.desc }}</div>
          <el-button size="small" type="primary" plain>立即配置 →</el-button>
        </div>
      </div>
      <WaybillSettingDrawers ref="settingDrawersRef" />
    </div>

    <!-- 常规系统管理页面 -->
    <template v-else>
      <div class="sys-toolbar">
        <div class="left-btns">
          <el-input
            v-model="searchKw"
            size="small"
            placeholder="输入名称 / 编码 / 城市 / 关键字检索"
            clearable
            style="width: 240px"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>

          <el-button
            v-if="!['loginlog', 'operlog', 'audit'].includes(pageKey)"
            size="small"
            type="primary"
            :icon="Plus"
            @click="openAddModal"
          >
            新增{{ currentTitle }}
          </el-button>

          <el-button v-if="pageKey === 'city'" size="small" type="success" @click="openSettingDrawer('priceSystem')">
            💰 批量维护路线价格体系
          </el-button>

          <el-button v-if="pageKey === 'print'" size="small" type="success" :icon="Printer" @click="printPreviewVisible = true">
            可视化模板打印预览
          </el-button>

          <el-button
            v-if="pageKey === 'messageCenter' || pageKey === 'messageManager'"
            size="small"
            type="success"
            :icon="Check"
            @click="markAllMessagesRead"
          >
            全部标为已读
          </el-button>
        </div>

        <div class="right-info">
          <el-tag type="info" size="small">共 {{ currentRows.length }} 条配置项</el-tag>
        </div>
      </div>

      <div class="sys-body" :class="{ 'with-left-nav': pageKey === 'dict' }">
        <!-- 数据字典左侧分类导航 -->
        <div v-if="pageKey === 'dict'" class="dict-cat-pane">
          <div class="cat-head">📚 平台数据字典分类</div>
          <div
            v-for="cat in dictCategories"
            :key="cat.key"
            class="cat-item"
            :class="{ active: activeDictKey === cat.key }"
            @click="activeDictKey = cat.key"
          >
            <span>{{ cat.label }}</span>
            <el-tag size="small" round>{{ (archiveStore.dictData[cat.key] || []).length }}</el-tag>
          </div>
        </div>

        <div class="sys-table-pane">
          <!-- 1. 网点管理 -->
          <el-table v-if="pageKey === 'network'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="groupNo" label="网点代码" width="110" />
            <el-table-column prop="name" label="网点名称" width="160" />
            <el-table-column prop="city" label="所在城市" width="120" />
            <el-table-column prop="manager" label="网点负责人" width="110" />
            <el-table-column prop="phone" label="服务热线" width="150" />
            <el-table-column prop="pinyin" label="拼音助记码" min-width="180" />
            <el-table-column label="状态" width="95" align="center">
              <template #default><el-tag type="success" size="small">正常营业</el-tag></template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="danger" link @click="deleteNetwork(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 2. 自定义城市与路线运价 -->
          <el-table v-else-if="pageKey === 'city'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="code" label="行政区划代码" width="115" />
            <el-table-column prop="areaName" label="到站城市名称" width="120" />
            <el-table-column prop="province" label="所属省份" width="110" />
            <el-table-column prop="defaultDistrict" label="默认区县" width="110" />
            <el-table-column prop="matchedGroupName" label="绑定终端网点" width="130" />
            <el-table-column prop="routeType" label="默认运输路线" width="110" align="center">
              <template #default="{ row }">
                <el-tag :type="row.shippingRoute === 1 ? 'success' : 'warning'" size="small">{{ row.routeType }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="weightPrice" label="重货单价(元/kg)" width="125" align="right" />
            <el-table-column prop="volumePrice" label="轻货单价(元/m³)" width="125" align="right" />
            <el-table-column prop="piecePrice" label="按件单价(元/件)" width="125" align="right" />
            <el-table-column prop="minFreight" label="最低起步价(元)" min-width="120" align="right" />
          </el-table>

          <!-- 3. 数据字典 -->
          <el-table v-else-if="pageKey === 'dict'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="50" align="center" />
            <el-table-column prop="name" label="字典项名称 (开单下拉候选项)" width="220" />
            <el-table-column prop="value" label="存储字典值" width="180" />
            <el-table-column prop="pinyin" label="拼音首字母联想码" min-width="220" />
            <el-table-column label="启用状态" width="110" align="center">
              <template #default="{ row }">
                <el-switch v-model="row.enabled" :active-value="1" :inactive-value="0" size="small" />
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="danger" link @click="deleteDictItem(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 4. 网点线路 -->
          <el-table v-else-if="pageKey === 'route'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="lineCode" label="线路编码" width="125" />
            <el-table-column prop="lineName" label="干线标准线路名称" width="210" />
            <el-table-column prop="startNetwork" label="始发网点" width="115" />
            <el-table-column prop="viaNetworks" label="标准途经站" width="130" />
            <el-table-column prop="endNetwork" label="终点网点" width="120" />
            <el-table-column prop="distanceKm" label="标准里程(km)" width="115" align="right" />
            <el-table-column prop="transitHours" label="标准时效(h)" width="110" align="right" />
            <el-table-column prop="defaultCarFee" label="标准大车费(元)" min-width="125" align="right" />
            <el-table-column prop="status" label="状态" width="90" align="center">
              <template #default="{ row }"><el-tag type="success" size="small">{{ row.status }}</el-tag></template>
            </el-table-column>
          </el-table>

          <!-- 5. 科目管理 -->
          <el-table v-else-if="pageKey === 'subject'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="code" label="会计科目代码" width="125" />
            <el-table-column prop="name" label="费用科目名称" width="180" />
            <el-table-column prop="direction" label="收支方向" width="115" align="center">
              <template #default="{ row }">
                <el-tag :type="row.direction === '收入类' ? 'success' : row.direction === '成本支出类' ? 'danger' : 'warning'" size="small">
                  {{ row.direction }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="parentSubject" label="上级归属总账科目" width="150" />
            <el-table-column prop="autoLinkField" label="自动绑定开单字段" width="150" />
            <el-table-column prop="remark" label="核算说明" min-width="240" show-overflow-tooltip />
          </el-table>

          <!-- 6. 审批设置 -->
          <el-table v-else-if="pageKey === 'audit'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="moduleName" label="管控业务模块" width="175" />
            <el-table-column prop="triggerCondition" label="触发审批条件" width="260" show-overflow-tooltip />
            <el-table-column prop="approverRole" label="指定审批角色" width="200" />
            <el-table-column label="启用强制审批" width="120" align="center">
              <template #default="{ row }">
                <el-switch v-model="row.enabled" size="small" @change="() => ElMessage.success('审批规则状态已更新')" />
              </template>
            </el-table-column>
            <el-table-column label="免审豁免金额(元)" width="150" align="center">
              <template #default="{ row }">
                <el-input-number v-model="row.autoPassUnderAmount" :min="0" :step="100" size="small" style="width: 115px" />
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="风控说明" min-width="220" show-overflow-tooltip />
          </el-table>

          <!-- 7. 打印设置 -->
          <el-table v-else-if="pageKey === 'print'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="tplCode" label="模板编号" width="155" />
            <el-table-column prop="tplName" label="打印模板名称" width="260" />
            <el-table-column prop="tplType" label="适用单据" width="125" align="center" />
            <el-table-column prop="paperSize" label="纸张规格" width="145" />
            <el-table-column prop="printerName" label="绑定默认打印机" width="210" />
            <el-table-column label="默认模板" width="100" align="center">
              <template #default="{ row }">
                <el-switch v-model="row.isDefault" size="small" />
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="最后更新时间" min-width="155" />
            <el-table-column label="操作" width="120" fixed="right" align="center">
              <template #default>
                <el-button size="small" type="primary" link @click="printPreviewVisible = true">设计/预览</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 8. 企业互联 -->
          <el-table v-else-if="pageKey === 'enconnect'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="tenantCode" label="对方星云租户号" width="135" />
            <el-table-column prop="companyName" label="互联物流企业名称" width="220" />
            <el-table-column prop="contactMan" label="对接负责人" width="100" />
            <el-table-column prop="phone" label="联系电话" width="130" />
            <el-table-column prop="bindRoutes" label="协同承运城市线路" min-width="190" />
            <el-table-column label="自动推送运单" width="115" align="center">
              <template #default="{ row }"><el-switch v-model="row.autoSyncWaybill" size="small" /></template>
            </el-table-column>
            <el-table-column label="自动回传轨迹" width="115" align="center">
              <template #default="{ row }"><el-switch v-model="row.autoSyncTrack" size="small" /></template>
            </el-table-column>
            <el-table-column prop="bindStatus" label="互联状态" width="120" align="center">
              <template #default="{ row }">
                <el-tag :type="row.bindStatus === '已互联互通' ? 'success' : 'warning'" size="small">{{ row.bindStatus }}</el-tag>
              </template>
            </el-table-column>
          </el-table>

          <!-- 9. 消息中心 / 消息管理 -->
          <el-table v-else-if="pageKey === 'messageCenter' || pageKey === 'messageManager'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="type" label="消息类型" width="110" align="center">
              <template #default="{ row }"><el-tag size="small">{{ row.type }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="title" label="消息标题" width="260" show-overflow-tooltip />
            <el-table-column prop="content" label="详细内容" min-width="320" show-overflow-tooltip />
            <el-table-column prop="sender" label="发送源" width="130" />
            <el-table-column prop="createTime" label="发送时间" width="155" />
            <el-table-column label="阅读状态" width="95" align="center">
              <template #default="{ row }">
                <el-tag :type="row.isRead ? 'info' : 'danger'" size="small">{{ row.isRead ? '已读' : '未读' }}</el-tag>
              </template>
            </el-table-column>
          </el-table>

          <!-- 10. 登录日志 -->
          <el-table v-else-if="pageKey === 'loginlog'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="account" label="登录账号" width="115" />
            <el-table-column prop="realName" label="用户姓名" width="105" />
            <el-table-column prop="network" label="所属网点" width="115" />
            <el-table-column prop="ip" label="客户端IP" width="135" />
            <el-table-column prop="location" label="IP归属地" width="140" />
            <el-table-column prop="browser" label="浏览器" width="120" />
            <el-table-column prop="os" label="操作系统" width="120" />
            <el-table-column prop="status" label="登录状态" width="100" align="center">
              <template #default="{ row }">
                <el-tag :type="row.status === '登录成功' ? 'success' : 'danger'" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="msg" label="认证详情" min-width="210" show-overflow-tooltip />
            <el-table-column prop="loginTime" label="登录时间" width="160" />
          </el-table>

          <!-- 11. 操作日志 -->
          <el-table v-else :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="module" label="业务模块" width="145" />
            <el-table-column prop="actionType" label="操作动作" width="105" align="center">
              <template #default="{ row }"><el-tag size="small">{{ row.actionType }}</el-tag></template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人" width="125" />
            <el-table-column prop="network" label="操作网点" width="105" />
            <el-table-column prop="targetNo" label="关联单据号" width="140" />
            <el-table-column prop="detail" label="操作变更明细" min-width="280" show-overflow-tooltip />
            <el-table-column prop="ip" label="终端IP" width="130" />
            <el-table-column prop="costMs" label="耗时" width="75" align="center" />
            <el-table-column prop="operTime" label="操作时间" width="160" />
          </el-table>
        </div>
      </div>
    </template>

    <!-- 通用新增配置弹窗 -->
    <el-dialog v-model="addModalVisible" :title="`新增${currentTitle}`" width="500px" append-to-body>
      <el-form :model="addForm" label-width="115px" size="small">
        <el-form-item label="名称 / 标题：" required>
          <el-input v-model="addForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="代码 / 编码：">
          <el-input v-model="addForm.code" placeholder="请输入编码或拼音简码" />
        </el-form-item>
        <el-form-item label="归属城市/网点：">
          <el-input v-model="addForm.city" placeholder="如：长沙市 / 衡阳营业部" />
        </el-form-item>
        <el-form-item label="附加说明/电话：">
          <el-input v-model="addForm.extra" placeholder="请输入说明或联系电话" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="addModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveAddItem">确认保存</el-button>
      </template>
    </el-dialog>

    <!-- 复用开单 8 大设置抽屉 & 可视化打印预览 -->
    <WaybillSettingDrawers ref="settingDrawersRef" />
    <PrintPreviewDialog v-model="printPreviewVisible" :waybills="opStore.shipList.slice(0, 1)" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Plus, Check, Printer } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEnterpriseStore } from '@/store/enterprise'
import { useArchiveStore } from '@/store/dictionaryAndArchive'
import { useOperationStore } from '@/store/operation'
import WaybillSettingDrawers from '@/views/operation/components/WaybillSettingDrawers.vue'
import PrintPreviewDialog from '@/views/operation/components/PrintPreviewDialog.vue'

const route = useRoute()
const entStore = useEnterpriseStore()
const archiveStore = useArchiveStore()
const opStore = useOperationStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'network'
})

const currentTitle = computed(() => String(route.meta.title || '配置项'))
const searchKw = ref('')
const activeDictKey = ref('goodsName')
const settingDrawersRef = ref<any>(null)
const printPreviewVisible = ref(false)

const dictCategories = [
  { key: 'goodsName', label: '常见品名' },
  { key: 'pack', label: '货物包装' },
  { key: 'model', label: '规格型号' },
  { key: 'payType', label: '结算方式' },
  { key: 'deliveryType', label: '交货方式' },
  { key: 'shippingType', label: '运输方式' },
  { key: 'receipt', label: '回单要求' },
  { key: 'salesMan', label: '业务员名单' },
  { key: 'remark', label: '常用开单备注' }
]

const defineCards = [
  { key: 'uiLayout', title: '1. 界面布局设置', desc: '控制录运单页面货物第2行、收发货人证件号、服务区块等显隐' },
  { key: 'cursorPath', title: '2. 光标路径设置', desc: '配置开单时按下 Enter 回车键的焦点顺序跳转路径' },
  { key: 'requiredFields', title: '3. 必填字段设置', desc: '配置保存运单时强制校验非空的必填字段与红星提示' },
  { key: 'userBehavior', title: '4. 用户行为设置', desc: '配置新客户自动存档、收货方反向联动到站等智能习惯' },
  { key: 'waybillNoRule', title: '5. 运单号规则设置', desc: '配置运单号字母前缀、日期格式与自动递增流水位数' },
  { key: 'goodsNoRule', title: '6. 货号规则设置', desc: '配置货号前缀网点代码及随件数变化自动生成规则' },
  { key: 'totalFeeRule', title: '7. 合计运费设置', desc: '配置哪些附加费用科目自动汇总计入运单合计运费' },
  { key: 'priceSystem', title: '8. 路线价格体系设置', desc: '维护全国各到站城市的重货、轻货、按件单价与起步价' }
]

const openSettingDrawer = (key: string) => {
  settingDrawersRef.value?.openSetting?.(key)
}

const currentRows = computed(() => {
  const kw = searchKw.value.trim().toLowerCase()
  let list: any[] = []
  if (pageKey.value === 'network') list = archiveStore.networkList
  else if (pageKey.value === 'city') list = archiveStore.cityList
  else if (pageKey.value === 'dict') list = archiveStore.dictData[activeDictKey.value] || []
  else if (pageKey.value === 'route') list = entStore.routeLineList
  else if (pageKey.value === 'subject') list = entStore.subjectList
  else if (pageKey.value === 'audit') list = entStore.auditRuleList
  else if (pageKey.value === 'print') list = entStore.printTemplateList
  else if (pageKey.value === 'enconnect') list = entStore.interconnectList
  else if (pageKey.value === 'messageCenter' || pageKey.value === 'messageManager') list = entStore.systemMessages
  else if (pageKey.value === 'loginlog') list = entStore.loginLogs
  else list = entStore.operLogs

  if (!kw) return list
  return list.filter(r => JSON.stringify(r).toLowerCase().includes(kw))
})

const addModalVisible = ref(false)
const addForm = reactive({
  name: '',
  code: '',
  city: '',
  extra: ''
})

const openAddModal = () => {
  addForm.name = ''
  addForm.code = ''
  addForm.city = ''
  addForm.extra = ''
  addModalVisible.value = true
}

const saveAddItem = () => {
  if (!addForm.name) {
    ElMessage.warning('请输入名称')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  if (pageKey.value === 'network') {
    const code = addForm.code || 'NEW'
    archiveStore.networkList.push({
      id: String(Date.now()).slice(-4),
      code,
      groupNo: code,
      name: addForm.name,
      groupName: addForm.name,
      pinyin: `${code.toLowerCase()} ${addForm.name}`,
      city: addForm.city || '广州市',
      manager: '张店长',
      phone: addForm.extra || '020-88889999'
    })
  } else if (pageKey.value === 'city') {
    archiveStore.cityList.unshift({
      code: addForm.code || '430300',
      name: addForm.name,
      areaName: addForm.name,
      pinyin: addForm.code || addForm.name,
      province: '湖南省',
      city: addForm.name,
      defaultDistrict: '市辖区',
      defaultRegion: `湖南省-${addForm.name}-市辖区`,
      matchedGroupId: '102',
      matchedGroupName: addForm.city || '长沙分部',
      matchedBranch: addForm.city || '长沙分部',
      routeType: '专线直达',
      shippingRoute: 1,
      weightPrice: 0.5,
      volumePrice: 120,
      piecePrice: 15,
      minFreight: 50
    })
  } else if (pageKey.value === 'dict') {
    archiveStore.dictData[activeDictKey.value].unshift({
      name: addForm.name,
      value: addForm.name,
      label: addForm.name,
      pinyin: addForm.code || addForm.name,
      enabled: 1
    })
  } else if (pageKey.value === 'route') {
    entStore.routeLineList.unshift({
      id: `RL${Date.now().toString().slice(-3)}`,
      lineCode: addForm.code || 'GZ-NEW-09',
      lineName: addForm.name,
      startNetwork: '总部',
      viaNetworks: '-',
      endNetwork: addForm.city || '长沙分部',
      distanceKm: 600,
      transitHours: 9,
      defaultCarFee: 4800,
      status: '启用'
    })
  } else if (pageKey.value === 'enconnect') {
    entStore.interconnectList.unshift({
      id: `IC${Date.now().toString().slice(-3)}`,
      tenantCode: addForm.code || '889900',
      companyName: addForm.name,
      contactMan: '李总',
      phone: addForm.extra || '13800138000',
      bindRoutes: addForm.city || '湖南省全境',
      autoSyncWaybill: true,
      autoSyncTrack: true,
      bindStatus: '已互联互通',
      bindTime: now
    })
  } else if (pageKey.value === 'messageCenter' || pageKey.value === 'messageManager') {
    entStore.systemMessages.unshift({
      id: `MSG${Date.now().toString().slice(-3)}`,
      type: '系统公告',
      title: addForm.name,
      content: addForm.extra || addForm.name,
      sender: 'admin (总部)',
      createTime: now,
      isRead: false
    })
  }
  addModalVisible.value = false
  ElMessage.success(`新增【${addForm.name}】已保存并全局生效`)
}

const deleteNetwork = (row: any) => {
  archiveStore.networkList = archiveStore.networkList.filter(n => n.id !== row.id)
  ElMessage.success('网点已删除')
}

const deleteDictItem = (row: any) => {
  archiveStore.dictData[activeDictKey.value] = archiveStore.dictData[activeDictKey.value].filter(i => i.name !== row.name)
  ElMessage.success('字典项已删除')
}

const markAllMessagesRead = () => {
  entStore.systemMessages.forEach(m => {
    m.isRead = true
  })
  ElMessage.success('全部系统消息已标为已读')
}
</script>

<style scoped lang="scss">
.system-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.news-timeline-wrap {
  overflow-y: auto;
  padding: 8px;
}
.define-workbench {
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  height: 100%;
  .def-header {
    margin-bottom: 20px;
    .dh-title { font-size: 16px; font-weight: 700; color: #303133; margin-bottom: 6px; }
    .dh-sub { font-size: 13px; color: #606266; }
  }
  .def-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    .def-card {
      border: 1px solid #e4e7ed;
      border-radius: 6px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s;
      background: #fafcff;
      &:hover {
        border-color: #409eff;
        box-shadow: 0 4px 12px rgba(64, 158, 255, 0.12);
        transform: translateY(-2px);
      }
      .dc-title { font-size: 14px; font-weight: 700; color: #303133; margin-bottom: 8px; }
      .dc-desc { font-size: 12px; color: #606266; line-height: 1.6; margin-bottom: 14px; min-height: 38px; }
    }
  }
}
.sys-toolbar {
  background: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-btns { display: flex; align-items: center; gap: 8px; }
}
.sys-body {
  flex: 1;
  display: flex;
  gap: 10px;
  overflow: hidden;
  &.with-left-nav {
    .dict-cat-pane {
      width: 210px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      padding: 10px;
      flex-shrink: 0;
      .cat-head {
        font-size: 13px;
        font-weight: 700;
        padding-bottom: 8px;
        margin-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
      }
      .cat-item {
        padding: 8px 10px;
        border-radius: 4px;
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        margin-bottom: 4px;
        &:hover { background: #f5f7fa; }
        &.active {
          background: #ecf5ff;
          color: #409eff;
          font-weight: 700;
        }
      }
    }
  }
  .sys-table-pane {
    flex: 1;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    overflow: hidden;
  }
}
</style>
