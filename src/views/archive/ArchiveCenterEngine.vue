<template>
  <div class="archive-engine-page">
    <!-- 顶部检索与动作栏 -->
    <div class="arc-toolbar">
      <div class="left-btns">
        <el-input
          v-model="searchKw"
          size="small"
          placeholder="输入姓名 / 单位 / 手机号 / 车牌号 / 城市 / 拼音首字母检索"
          clearable
          style="width: 280px"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <el-button size="small" type="primary" :icon="Plus" @click="openEditModal()">新增{{ pageTitle }}</el-button>
        <el-button size="small" :icon="Edit" @click="handleEditSelected">修改</el-button>
        <el-button size="small" type="danger" :icon="Delete" @click="handleDeleteSelected">删除</el-button>
        <el-button size="small" type="success" :icon="Upload" @click="importModalVisible = true">批量导入</el-button>
        <el-button size="small" :icon="Download" @click="handleExport">导出 Excel</el-button>
      </div>

      <div class="right-tip">
        <el-tag type="info" size="small">
          💡 此处维护的{{ pageTitle }}与【录运单 / 干线配载 / 外发管理】智能联想词库实时双向同步（共 {{ currentList.length }} 条）
        </el-tag>
      </div>
    </div>

    <!-- 主表格 -->
    <div class="arc-table-wrap">
      <!-- A. 发货客户 / 收货客户表 -->
      <el-table
        v-if="pageKey === 'shipper' || pageKey === 'receiver'"
        :data="currentList"
        border
        stripe
        size="small"
        height="100%"
        @selection-change="(rows: any[]) => (selectedRows = rows)"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="id" label="客户编号" width="110" fixed="left" />
        <el-table-column prop="name" :label="pageKey === 'shipper' ? '发货人姓名' : '收货人姓名'" width="110" />
        <el-table-column prop="phone" label="手机号码" width="125" />
        <el-table-column prop="tel" label="座机电话" width="125" />
        <el-table-column prop="unit" label="客户单位名称" width="190" show-overflow-tooltip />
        <el-table-column prop="idCard" label="身份证/信用代码" width="165" />
        <el-table-column label="所在省市区" width="175">
          <template #default="{ row }">
            {{ [row.province, row.city, row.area].filter(Boolean).join('-') }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="详细地址" min-width="210" show-overflow-tooltip />
        <el-table-column prop="goodsName" label="常发品名" width="105" />
        <el-table-column prop="pack" label="常用包装" width="85" align="center" />
        <el-table-column prop="defaultPayType" label="默认结算" width="90" align="center" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openEditModal(row)">编辑</el-button>
            <el-button size="small" type="danger" link @click="deleteOne(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- B. 承运商档案表 -->
      <el-table
        v-else-if="pageKey === 'carrier'"
        :data="currentList"
        border
        stripe
        size="small"
        height="100%"
        @selection-change="(rows: any[]) => (selectedRows = rows)"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="id" label="承运商编码" width="120" fixed="left" />
        <el-table-column prop="name" label="承运商名称" width="195" />
        <el-table-column prop="contactMan" label="负责人" width="100" />
        <el-table-column prop="localPhone" label="本地收货电话" width="135" />
        <el-table-column prop="pickPhone" label="目的站提货电话" width="135" />
        <el-table-column prop="city" label="主营直达城市" width="115" />
        <el-table-column prop="address" label="档口/网点详细地址" min-width="220" show-overflow-tooltip />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openEditModal(row)">编辑</el-button>
            <el-button size="small" type="danger" link @click="deleteOne(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- C. 车辆档案 / 司机档案表 -->
      <el-table
        v-else
        :data="currentList"
        border
        stripe
        size="small"
        height="100%"
        @selection-change="(rows: any[]) => (selectedRows = rows)"
      >
        <el-table-column type="selection" width="42" align="center" />
        <el-table-column type="index" label="#" width="48" align="center" />
        <el-table-column prop="id" label="档案编号" width="105" fixed="left" />
        <el-table-column prop="plateNo" label="车牌号码" width="125" />
        <el-table-column prop="plateColorStr" label="车牌颜色" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.plateColorStr === '黄色' ? 'warning' : row.plateColorStr === '蓝色' ? 'primary' : 'success'" size="small">
              {{ row.plateColorStr || row.plateColor }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="carType" label="车型规格" width="130" />
        <el-table-column prop="driverName" label="随车司机姓名" width="110" />
        <el-table-column prop="driverPhone" label="司机手机号" width="125" />
        <el-table-column prop="carrierName" label="所属车队" width="145" />
        <el-table-column prop="bankName" label="开户银行" width="185" show-overflow-tooltip />
        <el-table-column prop="userName" label="收款开户名" width="100" />
        <el-table-column prop="bankCard" label="银行卡号" min-width="175" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button size="small" type="primary" link @click="openEditModal(row)">编辑</el-button>
            <el-button size="small" type="danger" link @click="deleteOne(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="editModalVisible" :title="`${formModel.id ? '修改' : '新增'}${pageTitle}`" width="580px" append-to-body>
      <!-- 客户表单 -->
      <el-form v-if="pageKey === 'shipper' || pageKey === 'receiver'" :model="formModel" label-width="105px" size="small">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="客户姓名：" required>
              <el-input v-model="formModel.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码：" required>
              <el-input v-model="formModel.phone" placeholder="11位手机号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="座机电话：">
              <el-input v-model="formModel.tel" placeholder="如 020-88880001" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户单位：">
              <el-input v-model="formModel.unit" placeholder="公司或商行名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码：">
              <el-input v-model="formModel.idCard" placeholder="身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常发品名：">
              <el-input v-model="formModel.goodsName" placeholder="如 五金建材" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="所在区域：">
              <RegionCascaderInput v-model="formModel.regionStr" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="详细地址：">
              <el-input v-model="formModel.address" placeholder="街道门牌档口号" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 承运商表单 -->
      <el-form v-else-if="pageKey === 'carrier'" :model="formModel" label-width="110px" size="small">
        <el-form-item label="承运商名称：" required>
          <el-input v-model="formModel.name" placeholder="请输入专线/三方物流名称" />
        </el-form-item>
        <el-form-item label="联系人姓名：">
          <el-input v-model="formModel.contactMan" />
        </el-form-item>
        <el-form-item label="本地电话：" required>
          <el-input v-model="formModel.localPhone" />
        </el-form-item>
        <el-form-item label="提货电话：">
          <el-input v-model="formModel.pickPhone" />
        </el-form-item>
        <el-form-item label="主营城市：">
          <el-input v-model="formModel.city" />
        </el-form-item>
        <el-form-item label="档口地址：">
          <el-input v-model="formModel.address" />
        </el-form-item>
      </el-form>

      <!-- 车辆/司机表单 -->
      <el-form v-else :model="formModel" label-width="110px" size="small">
        <el-row :gutter="12">
          <el-col :span="12">
            <el-form-item label="车牌号码：" required>
              <el-input v-model="formModel.plateNo" placeholder="如 粤A·88991挂" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车牌颜色：">
              <el-select v-model="formModel.plateColorStr" style="width: 100%">
                <el-option label="黄色" value="黄色" />
                <el-option label="蓝色" value="蓝色" />
                <el-option label="黄绿色" value="黄绿色" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机姓名：" required>
              <el-input v-model="formModel.driverName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="司机手机：" required>
              <el-input v-model="formModel.driverPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车型规格：">
              <el-input v-model="formModel.carType" placeholder="如 17.5米高低板" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="所属车队：">
              <el-input v-model="formModel.carrierName" placeholder="如 总部自有车队" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开户银行：">
              <el-input v-model="formModel.bankName" placeholder="如 中国建设银行广州白云支行" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户户名：">
              <el-input v-model="formModel.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行卡号：">
              <el-input v-model="formModel.bankCard" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <el-button size="small" @click="editModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveArchive">保存并同步词库</el-button>
      </template>
    </el-dialog>

    <!-- 批量导入弹窗 -->
    <el-dialog v-model="importModalVisible" :title="`批量导入${pageTitle}`" width="480px" append-to-body>
      <div style="padding: 12px 0; line-height: 1.8; font-size: 13px; color: #606266">
        <p>1. 请先下载标准《{{ pageTitle }}导入模板.xlsx》按列填写数据；</p>
        <p>2. 导入后将自动生成拼音简码并实时同步至开单智能联想库。</p>
      </div>
      <template #footer>
        <el-button size="small" @click="importModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleMockImport">模拟一键导入示例数据</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Plus, Edit, Delete, Upload, Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useArchiveStore } from '@/store/dictionaryAndArchive'
import RegionCascaderInput from '@/views/operation/components/RegionCascaderInput.vue'

const route = useRoute()
const archiveStore = useArchiveStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'shipper'
})

const pageTitle = computed(() => String(route.meta.title || '档案'))
const searchKw = ref('')
const selectedRows = ref<any[]>([])

const currentList = computed(() => {
  const kw = searchKw.value.trim()
  if (pageKey.value === 'shipper') return archiveStore.searchShippers(kw)
  if (pageKey.value === 'receiver') return archiveStore.searchReceivers(kw)
  if (pageKey.value === 'carrier') return archiveStore.searchCarriers(kw)
  return archiveStore.searchVehicles(kw)
})

const editModalVisible = ref(false)
const importModalVisible = ref(false)
const formModel = reactive<Record<string, any>>({
  id: '',
  name: '',
  phone: '',
  tel: '',
  unit: '',
  idCard: '',
  regionStr: '广东省-广州市-白云区',
  address: '',
  goodsName: '五金建材',
  pack: '纸箱',
  contactMan: '',
  localPhone: '',
  pickPhone: '',
  city: '长沙市',
  plateNo: '',
  plateColorStr: '黄色',
  driverName: '',
  driverPhone: '',
  carType: '17.5米高低板',
  carrierName: '总部自有车队',
  bankName: '中国建设银行广州支行',
  userName: '',
  bankCard: ''
})

const openEditModal = (row?: any) => {
  if (row) {
    Object.assign(formModel, row)
    if (row.province && row.city) {
      formModel.regionStr = `${row.province}-${row.city}-${row.area || ''}`
    }
  } else {
    formModel.id = ''
    formModel.name = ''
    formModel.phone = ''
    formModel.tel = ''
    formModel.unit = ''
    formModel.idCard = ''
    formModel.address = ''
    formModel.plateNo = ''
    formModel.driverName = ''
    formModel.driverPhone = ''
  }
  editModalVisible.value = true
}

const handleEditSelected = () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选一条记录')
    return
  }
  openEditModal(selectedRows.value[0])
}

const saveArchive = () => {
  if (pageKey.value === 'shipper' || pageKey.value === 'receiver') {
    if (!formModel.name || !formModel.phone) {
      ElMessage.warning('请填写客户姓名与手机号')
      return
    }
    const parts = (formModel.regionStr || '广东省-广州市-白云区').split('-')
    archiveStore.upsertCustomerArchive(pageKey.value, {
      id: formModel.id || undefined,
      name: formModel.name,
      phone: formModel.phone,
      tel: formModel.tel,
      unit: formModel.unit,
      idCard: formModel.idCard,
      province: parts[0] || '广东省',
      city: parts[1] || '广州市',
      area: parts[2] || '白云区',
      address: formModel.address,
      goodsName: formModel.goodsName || '普货',
      pack: formModel.pack || '纸箱',
      defaultGoodsName: formModel.goodsName || '普货',
      defaultPack: formModel.pack || '纸箱',
      defaultPayType: '现付'
    })
  } else if (pageKey.value === 'carrier') {
    if (!formModel.name) {
      ElMessage.warning('请填写承运商名称')
      return
    }
    if (formModel.id) {
      const idx = archiveStore.carrierArchives.findIndex(c => c.id === formModel.id)
      if (idx !== -1) archiveStore.carrierArchives[idx] = { ...archiveStore.carrierArchives[idx], ...formModel }
    } else {
      archiveStore.carrierArchives.unshift({
        id: `CRR${Date.now().toString().slice(-4)}`,
        name: formModel.name,
        pinyin: formModel.name,
        contactMan: formModel.contactMan || '王经理',
        localPhone: formModel.localPhone || '020-86668888',
        pickPhone: formModel.pickPhone || '0731-85556666',
        city: formModel.city || '长沙市',
        address: formModel.address || '林安物流园B区'
      })
    }
  } else {
    if (!formModel.plateNo || !formModel.driverName) {
      ElMessage.warning('请填写车牌号与随车司机姓名')
      return
    }
    if (formModel.id) {
      const idx = archiveStore.vehicleArchives.findIndex(v => v.id === formModel.id)
      if (idx !== -1) {
        archiveStore.vehicleArchives[idx] = {
          ...archiveStore.vehicleArchives[idx],
          ...formModel,
          plateColor: formModel.plateColorStr,
          bankAccountName: formModel.userName || formModel.driverName,
          bankCardNo: formModel.bankCard
        }
      }
    } else {
      archiveStore.vehicleArchives.unshift({
        id: `CAR${Date.now().toString().slice(-4)}`,
        plateNo: formModel.plateNo,
        plateColor: formModel.plateColorStr,
        plateColorStr: formModel.plateColorStr,
        driverName: formModel.driverName,
        driverPhone: formModel.driverPhone,
        carType: formModel.carType || '17.5米高低板',
        carrierName: formModel.carrierName || '总部自有车队',
        bankName: formModel.bankName || '中国建设银行',
        userName: formModel.userName || formModel.driverName,
        bankAccountName: formModel.userName || formModel.driverName,
        bankCard: formModel.bankCard || '6217003320019999888',
        bankCardNo: formModel.bankCard || '6217003320019999888',
        pinyin: `${formModel.plateNo} ${formModel.driverName}`
      })
    }
  }
  editModalVisible.value = false
  ElMessage.success(`${pageTitle.value}保存成功，已同步至开单智能联想词库！`)
}

const deleteOne = (row: any) => {
  if (pageKey.value === 'shipper') archiveStore.shipperArchives = archiveStore.shipperArchives.filter(i => i.id !== row.id)
  else if (pageKey.value === 'receiver') archiveStore.receiverArchives = archiveStore.receiverArchives.filter(i => i.id !== row.id)
  else if (pageKey.value === 'carrier') archiveStore.carrierArchives = archiveStore.carrierArchives.filter(i => i.id !== row.id)
  else archiveStore.vehicleArchives = archiveStore.vehicleArchives.filter(i => i.id !== row.id)
  ElMessage.success('删除成功')
}

const handleDeleteSelected = () => {
  if (!selectedRows.value.length) {
    ElMessage.warning('请先勾选需要删除的档案')
    return
  }
  selectedRows.value.forEach(r => deleteOne(r))
}

import { exportTableToCsv } from '@/utils/exportHelper'

const handleMockImport = () => {
  const nowId = Date.now().toString().slice(-4)
  if (pageKey.value === 'shipper' || pageKey.value === 'receiver') {
    archiveStore.upsertCustomerArchive(pageKey.value as 'shipper' | 'receiver', {
      id: `CUST${nowId}`,
      name: `批量导入客户${nowId}`,
      pinyin: `BLLR${nowId}`,
      phone: `13800${nowId}00`,
      unit: `批量导入实业${nowId}部`,
      province: '广东省',
      city: '广州市',
      area: '白云区',
      address: '广州白云太和物流园C区8号',
      defaultGoodsName: '精密配件',
      defaultPack: '纸箱'
    })
  } else if (pageKey.value === 'vehicle') {
    archiveStore.vehicleArchives.unshift({
      id: `V${nowId}`,
      plateNo: `粤A·${nowId}挂`,
      plateColor: 1,
      plateColorStr: '黄色',
      driverName: `李司机${nowId}`,
      driverPhone: `13900${nowId}11`,
      carType: '17.5米高栏',
      bankName: '中国工商银行广州支行',
      userName: `李司机${nowId}`,
      bankCard: `62220236020188${nowId}`,
      bankCardNo: `62220236020188${nowId}`,
      pinyin: `YS${nowId}`
    })
  } else if (pageKey.value === 'carrier') {
    archiveStore.carrierArchives.unshift({
      id: `CR${nowId}`,
      name: `批量导入专线车队${nowId}`,
      pinyin: `PLDR${nowId}`,
      contactMan: `陈调度${nowId}`,
      localPhone: '020-36219988',
      pickPhone: '027-83292211',
      city: '广州市',
      address: '广州白云大源物流港'
    })
  }
  importModalVisible.value = false
  ElMessage.success(`成功导入【${pageTitle.value}】数据并实时录入联想库`)
}

const handleExport = () => {
  exportTableToCsv(`星云TMS_${pageTitle.value}_${new Date().toISOString().slice(0, 10)}`, currentList.value)
  ElMessage.success(`已导出【${pageTitle.value}】共 ${currentList.value.length} 条记录至本地文件`)
}
</script>

<style scoped lang="scss">
.archive-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.arc-toolbar {
  background: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-btns {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }
}
.arc-table-wrap {
  flex: 1;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  overflow: hidden;
}
</style>
