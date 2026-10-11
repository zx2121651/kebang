<template>
  <div>
    <!-- 1. 界面布局设置 -->
    <el-dialog v-model="visibleMap.uiLayout" title="界面布局设置" width="520px" append-to-body>
      <div class="setting-desc">勾选或取消以下区块，实时调整创建运单页面的显示布局：</div>
      <el-form label-width="170px" size="small">
        <el-form-item label="显示货物明细第2行：">
          <el-switch v-model="archiveStore.uiLayoutConfig.showSecondGoodsRow" />
        </el-form-item>
        <el-form-item label="显示服务与附加费区块：">
          <el-switch v-model="archiveStore.uiLayoutConfig.showServiceSection" />
        </el-form-item>
        <el-form-item label="显示收发货人证件号字段：">
          <el-switch v-model="archiveStore.uiLayoutConfig.showIdCardField" />
        </el-form-item>
        <el-form-item label="显示回扣/交账扩展费项：">
          <el-switch v-model="archiveStore.uiLayoutConfig.showExtraFeeRow" />
        </el-form-item>
        <el-form-item label="紧凑表单行距模式：">
          <el-switch v-model="archiveStore.uiLayoutConfig.compactMode" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="visibleMap.uiLayout = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('界面布局设置已生效')">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 2. 光标路径设置 (Right Drawer Shuttle) -->
    <el-drawer v-model="visibleMap.cursorPath" title="光标路径设置 (Enter键跳转顺序)" size="680px" append-to-body>
      <div class="drawer-shuttle-wrap">
        <div class="setting-desc">
          配置在开单页面按下 <b>Enter 回车键</b> 时的焦点跳转顺序。左侧为未启用字段，右侧为已启用的跳转顺序：
        </div>
        <div class="shuttle-grid">
          <div class="shuttle-pane">
            <div class="pane-head">未加入跳转字段 ({{ unselectedCursorFields.length }})</div>
            <div class="pane-list">
              <div
                v-for="f in unselectedCursorFields"
                :key="f.key"
                class="pane-item"
                @click="addCursorField(f.key)"
              >
                <span>{{ f.section }} - {{ f.label }}</span>
                <el-button size="small" type="primary" link>+ 加入</el-button>
              </div>
            </div>
          </div>

          <div class="shuttle-pane">
            <div class="pane-head">已启用 Enter 跳转路径 ({{ archiveStore.cursorPathKeys.length }})</div>
            <div class="pane-list">
              <div
                v-for="(key, idx) in archiveStore.cursorPathKeys"
                :key="key"
                class="pane-item active-item"
              >
                <span>{{ idx + 1 }}. {{ getFieldLabel(key) }}</span>
                <div class="item-ops">
                  <el-button size="small" link :disabled="idx === 0" @click="moveCursorField(idx, -1)">↑</el-button>
                  <el-button size="small" link :disabled="idx === archiveStore.cursorPathKeys.length - 1" @click="moveCursorField(idx, 1)">↓</el-button>
                  <el-button size="small" type="danger" link @click="removeCursorField(idx)">移除</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="visibleMap.cursorPath = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('光标路径设置已保存')">保存设置</el-button>
      </template>
    </el-drawer>

    <!-- 3. 必填字段设置 (Right Drawer Shuttle) -->
    <el-drawer v-model="visibleMap.requiredFields" title="必填字段设置" size="650px" append-to-body>
      <div class="drawer-shuttle-wrap">
        <div class="setting-desc">
          配置开单保存（F5/F6）时必须填写的字段，右侧字段将在表单上显示红色星号 <code>*</code> 并进行非空校验：
        </div>
        <div class="shuttle-grid">
          <div class="shuttle-pane">
            <div class="pane-head">选填字段 ({{ optionalFields.length }})</div>
            <div class="pane-list">
              <div
                v-for="f in optionalFields"
                :key="f.key"
                class="pane-item"
                @click="addRequiredField(f.key)"
              >
                <span>{{ f.section }} - {{ f.label }}</span>
                <el-button size="small" type="primary" link>设为必填 →</el-button>
              </div>
            </div>
          </div>

          <div class="shuttle-pane">
            <div class="pane-head">必填校验字段 ({{ archiveStore.requiredFieldKeys.length }})</div>
            <div class="pane-list">
              <div
                v-for="(key, idx) in archiveStore.requiredFieldKeys"
                :key="key"
                class="pane-item active-item"
              >
                <span><b style="color:#f56c6c">*</b> {{ getFieldLabel(key) }}</span>
                <el-button size="small" type="danger" link @click="removeRequiredField(idx)">设为选填</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <el-button size="small" @click="visibleMap.requiredFields = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('必填字段校验规则已更新')">保存设置</el-button>
      </template>
    </el-drawer>

    <!-- 4. 用户行为设置 -->
    <el-dialog v-model="visibleMap.userBehavior" title="用户行为设置" width="680px" append-to-body>
      <el-table :data="archiveStore.userBehaviors" border size="small">
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="name" label="行为配置项" width="240" />
        <el-table-column label="启用状态" width="95" align="center">
          <template #default="{ row }">
            <el-switch v-model="row.enabled" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="功能说明" min-width="230" show-overflow-tooltip />
      </el-table>
      <template #footer>
        <el-button size="small" @click="visibleMap.userBehavior = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('用户行为配置已保存')">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 5. 运单号规则设置 -->
    <el-dialog v-model="visibleMap.waybillNoRule" title="运单号规则设置" width="500px" append-to-body>
      <el-form label-width="140px" size="small">
        <el-form-item label="自动生成运单号：">
          <el-switch v-model="archiveStore.numberRules.waybillAutoGenerate" />
        </el-form-item>
        <el-form-item label="单号字母前缀：">
          <el-input v-model="archiveStore.numberRules.waybillPrefix" style="width: 180px" />
        </el-form-item>
        <el-form-item label="日期格式段：">
          <el-select v-model="archiveStore.numberRules.waybillDateFmt" style="width: 180px">
            <el-option label="YYMMDD (如 260410)" value="YYMMDD" />
            <el-option label="YYYYMMDD (如 20260410)" value="YYYYMMDD" />
          </el-select>
        </el-form-item>
        <el-form-item label="流水号位数：">
          <el-input-number v-model="archiveStore.numberRules.waybillSerialDigits" :min="3" :max="6" />
        </el-form-item>
        <el-form-item label="当前流水序号：">
          <el-input-number v-model="archiveStore.numberRules.currentSerial" :min="1" :max="99999" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="visibleMap.waybillNoRule = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('运单号生成规则已更新')">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 6. 货号规则设置 -->
    <el-dialog v-model="visibleMap.goodsNoRule" title="货号规则设置" width="500px" append-to-body>
      <el-form label-width="150px" size="small">
        <el-form-item label="件数变化自动生成：">
          <el-switch v-model="archiveStore.numberRules.goodsNoAutoByNum" />
        </el-form-item>
        <el-form-item label="货号前缀网点代码：">
          <el-input v-model="archiveStore.numberRules.goodsNoPrefix" style="width: 180px" />
        </el-form-item>
        <el-form-item label="实时预览示例：">
          <el-tag type="success">{{ archiveStore.generateGoodsNo('KB260410089', 15, '衡阳营业部') }}</el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="visibleMap.goodsNoRule = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('货号规则设置已保存')">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 7. 合计运费设置 -->
    <el-dialog v-model="visibleMap.totalFeeRule" title="合计运费计算项设置" width="520px" append-to-body>
      <div class="setting-desc">以下选中的费用科目将自动汇总计入【合计运费】：</div>
      <div class="fee-check-grid">
        <el-checkbox v-model="feeRuleChecks.baseFee" disabled>基本运费 (必选)</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.insureFee">保价费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.deliveryFee">送货费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.pickupFee">接货费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.loadFee">装卸费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.packFee">包装费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.upstairsFee">上楼费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.customsFee">报关费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.otherFee">其他费</el-checkbox>
        <el-checkbox v-model="feeRuleChecks.infoFee">信息费</el-checkbox>
      </div>
      <template #footer>
        <el-button size="small" @click="visibleMap.totalFeeRule = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('合计运费计算公式已保存')">保 存</el-button>
      </template>
    </el-dialog>

    <!-- 8. 价格体系设置 -->
    <el-dialog v-model="visibleMap.priceSystem" title="路线价格体系设置 (开单自动算费标准)" width="820px" append-to-body>
      <div class="setting-desc">
        修改各到站城市的重货、轻货、按件单价及最低一票起步价后，开单输入件重体将自动按此价格表计算基本运费：
      </div>
      <el-table :data="archiveStore.cityList" border size="small" height="360">
        <el-table-column prop="name" label="到站城市" width="95" fixed="left" />
        <el-table-column prop="matchedBranch" label="对应终端网点" width="120" />
        <el-table-column prop="routeType" label="默认运输路线" width="95" align="center" />
        <el-table-column label="重货单价(元/kg)" width="130">
          <template #default="{ row }">
            <el-input-number v-model="row.weightPrice" :step="0.05" :min="0" size="small" style="width:105px" />
          </template>
        </el-table-column>
        <el-table-column label="轻货单价(元/m³)" width="130">
          <template #default="{ row }">
            <el-input-number v-model="row.volumePrice" :step="10" :min="0" size="small" style="width:105px" />
          </template>
        </el-table-column>
        <el-table-column label="按件单价(元/件)" width="125">
          <template #default="{ row }">
            <el-input-number v-model="row.piecePrice" :step="1" :min="0" size="small" style="width:100px" />
          </template>
        </el-table-column>
        <el-table-column label="起步价(元)" min-width="115">
          <template #default="{ row }">
            <el-input-number v-model="row.minFreight" :step="5" :min="0" size="small" style="width:95px" />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-button size="small" @click="visibleMap.priceSystem = false">关 闭</el-button>
        <el-button size="small" type="primary" @click="saveSetting('路线价格体系已实时生效')">保存价格表</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useArchiveStore } from '@/store/dictionaryAndArchive'

const archiveStore = useArchiveStore()

const visibleMap = reactive<Record<string, boolean>>({
  uiLayout: false,
  cursorPath: false,
  requiredFields: false,
  userBehavior: false,
  waybillNoRule: false,
  goodsNoRule: false,
  totalFeeRule: false,
  priceSystem: false,
})

const feeRuleChecks = reactive({
  baseFee: true,
  insureFee: true,
  deliveryFee: true,
  pickupFee: true,
  loadFee: true,
  packFee: true,
  upstairsFee: true,
  customsFee: true,
  otherFee: true,
  infoFee: true,
})

const getFieldLabel = (key: string) => {
  const found = archiveStore.allFocusFields.find(f => f.key === key)
  return found ? `${found.section} - ${found.label}` : key
}

const unselectedCursorFields = computed(() =>
  archiveStore.allFocusFields.filter(f => !archiveStore.cursorPathKeys.includes(f.key))
)

const addCursorField = (key: string) => {
  if (!archiveStore.cursorPathKeys.includes(key)) {
    archiveStore.cursorPathKeys.push(key)
  }
}

const removeCursorField = (idx: number) => {
  archiveStore.cursorPathKeys.splice(idx, 1)
}

const moveCursorField = (idx: number, delta: number) => {
  const target = idx + delta
  if (target < 0 || target >= archiveStore.cursorPathKeys.length) return
  const temp = archiveStore.cursorPathKeys[idx]
  archiveStore.cursorPathKeys[idx] = archiveStore.cursorPathKeys[target]
  archiveStore.cursorPathKeys[target] = temp
}

const optionalFields = computed(() =>
  archiveStore.allFocusFields.filter(f => !archiveStore.requiredFieldKeys.includes(f.key))
)

const addRequiredField = (key: string) => {
  if (!archiveStore.requiredFieldKeys.includes(key)) {
    archiveStore.requiredFieldKeys.push(key)
  }
}

const removeRequiredField = (idx: number) => {
  archiveStore.requiredFieldKeys.splice(idx, 1)
}

const saveSetting = (msg: string) => {
  Object.keys(visibleMap).forEach(k => (visibleMap[k] = false))
  ElMessage.success(msg)
}

const openSetting = (command: string) => {
  if (command in visibleMap) {
    visibleMap[command] = true
  }
}

defineExpose({
  openSetting
})
</script>

<style scoped lang="scss">
.setting-desc {
  font-size: 12px;
  color: #606266;
  background: #f4f8ff;
  border: 1px solid #d9ecff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.shuttle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  height: 460px;

  .shuttle-pane {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .pane-head {
      background: #f5f7fa;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 600;
      color: #303133;
      border-bottom: 1px solid #ebeef5;
    }

    .pane-list {
      flex: 1;
      overflow-y: auto;
      padding: 6px;

      .pane-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 10px;
        font-size: 12px;
        border-bottom: 1px dashed #ebeef5;
        cursor: pointer;

        &:hover {
          background: #f0f7ff;
        }

        .item-ops {
          display: flex;
          gap: 4px;
        }
      }
    }
  }
}

.fee-check-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 8px 4px;
}
</style>
