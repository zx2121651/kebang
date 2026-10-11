<template>
  <div class="user-hr-engine-page">
    <!-- 特例页面：修改密码 (/usercenter/usermanage/pwd) -->
    <div v-if="pageKey === 'pwd'" class="pwd-card-wrap">
      <el-card shadow="never" class="pwd-card">
        <template #header>
          <div class="pwd-header">
            <span>🔐 修改当前登录账号密码（当前账号：admin / 王总）</span>
            <el-tag type="success" size="small">安全加密通道已开启</el-tag>
          </div>
        </template>
        <el-form :model="pwdForm" label-width="130px" size="default" style="max-width: 480px; margin: 20px auto">
          <el-form-item label="当前登录账号：">
            <el-input value="admin (星云演示【777】- 总部)" disabled />
          </el-form-item>
          <el-form-item label="原登录密码：" required>
            <el-input v-model="pwdForm.oldPwd" type="password" show-password placeholder="请输入当前密码" />
          </el-form-item>
          <el-form-item label="新登录密码：" required>
            <el-input v-model="pwdForm.newPwd" type="password" show-password placeholder="请输入6-20位新密码" />
          </el-form-item>
          <el-form-item label="密码安全强度：">
            <el-progress :percentage="pwdStrength" :status="pwdStrength >= 80 ? 'success' : 'warning'" style="width: 100%" />
          </el-form-item>
          <el-form-item label="确认新密码：" required>
            <el-input v-model="pwdForm.confirmPwd" type="password" show-password placeholder="请再次输入新密码" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitChangePwd">确认修改密码</el-button>
            <el-button @click="resetPwdForm">重 置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- 常规列表管理页面 (角色管理 / 用户管理 / 在线用户 / 组织架构 / 职位管理 / 员工管理) -->
    <template v-else>
      <div class="uh-toolbar">
        <div class="left-btns">
          <el-input
            v-model="searchKw"
            size="small"
            placeholder="输入名称 / 账号 / 手机号 / 部门 检索"
            clearable
            style="width: 240px"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>

          <el-button v-if="pageKey !== 'onlineuser'" size="small" type="primary" :icon="Plus" @click="openEditDialog()">
            新增{{ currentTitle }}
          </el-button>
          <el-button v-if="pageKey === 'role'" size="small" type="success" :icon="Setting" @click="openPermDrawer()">
            分配角色菜单与按钮权限
          </el-button>
          <el-button v-if="pageKey === 'user'" size="small" type="warning" @click="handleResetUserPwd">
            重置密码
          </el-button>
          <el-button v-if="pageKey === 'onlineuser'" size="small" type="primary" :icon="RefreshRight" @click="refreshOnline">
            刷新在线会话
          </el-button>
        </div>

        <div class="right-info">
          <span>共 <b>{{ currentRows.length }}</b> 条记录</span>
        </div>
      </div>

      <div class="uh-body" :class="{ 'with-left-tree': pageKey === 'organization' || pageKey === 'employee' }">
        <!-- 组织架构/员工管理 左侧部门树 -->
        <div v-if="pageKey === 'organization' || pageKey === 'employee'" class="org-tree-pane">
          <div class="tree-title">🏢 集团组织机构树</div>
          <el-tree
            :data="orgTreeData"
            :props="{ label: 'label', children: 'children' }"
            default-expand-all
            highlight-current
            @node-click="onOrgNodeClick"
          />
        </div>

        <div class="table-pane">
          <!-- 1. 角色管理 -->
          <el-table v-if="pageKey === 'role'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="roleCode" label="角色编码" width="135" />
            <el-table-column prop="roleName" label="角色名称" width="160" />
            <el-table-column prop="dataScope" label="数据权限范围" width="160" />
            <el-table-column prop="userCount" label="关联用户数" width="100" align="center" />
            <el-table-column prop="status" label="状态" width="90" align="center">
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" />
            <el-table-column prop="remark" label="职能权限说明" min-width="220" show-overflow-tooltip />
            <el-table-column label="操作" width="165" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="openPermDrawer(row)">分配权限</el-button>
                <el-button size="small" type="primary" link @click="openEditDialog(row)">修改</el-button>
                <el-button size="small" type="danger" link @click="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 2. 用户管理 -->
          <el-table v-else-if="pageKey === 'user'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="account" label="登录账号" width="125" />
            <el-table-column prop="realName" label="用户姓名" width="110" />
            <el-table-column prop="phone" label="手机号码" width="130" />
            <el-table-column prop="network" label="所属网点" width="120" />
            <el-table-column prop="deptName" label="所属部门" width="130" />
            <el-table-column prop="roleName" label="绑定角色" width="140">
              <template #default="{ row }">
                <el-tag size="small">{{ row.roleName }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="position" label="岗位职务" width="120" />
            <el-table-column prop="status" label="状态" width="85" align="center">
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="lastLogin" label="最后登录时间" min-width="160" />
            <el-table-column label="操作" width="165" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="openEditDialog(row)">编辑</el-button>
                <el-button size="small" type="warning" link @click="handleResetUserPwd(row)">重置密码</el-button>
                <el-button size="small" type="danger" link @click="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 3. 在线用户 -->
          <el-table v-else-if="pageKey === 'onlineuser'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="sessionId" label="会话令牌ID" width="175" />
            <el-table-column prop="account" label="登录账号" width="115" />
            <el-table-column prop="realName" label="姓名" width="100" />
            <el-table-column prop="network" label="当前操作网点" width="120" />
            <el-table-column prop="ip" label="终端IP地址" width="135" />
            <el-table-column prop="location" label="归属地" width="135" />
            <el-table-column prop="browser" label="浏览器内核" width="125" />
            <el-table-column prop="os" label="操作系统" width="115" />
            <el-table-column prop="loginTime" label="登录上线时间" min-width="155" />
            <el-table-column prop="status" label="状态" width="95" align="center">
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="110" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="danger" link @click="forceKickUser(row)">强制下线</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 4. 组织架构 -->
          <el-table v-else-if="pageKey === 'organization'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="orgCode" label="机构编码" width="125" />
            <el-table-column prop="orgName" label="部门/网点名称" width="210" />
            <el-table-column prop="parentName" label="上级机构" width="190" />
            <el-table-column prop="manager" label="负责人" width="95" />
            <el-table-column prop="phone" label="办公电话" width="130" />
            <el-table-column prop="empCount" label="在编人数" width="90" align="center" />
            <el-table-column prop="address" label="办公地址" min-width="220" show-overflow-tooltip />
            <el-table-column label="操作" width="125" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="openEditDialog(row)">修改</el-button>
                <el-button size="small" type="danger" link @click="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 5. 职位管理 -->
          <el-table v-else-if="pageKey === 'position'" :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="posCode" label="职位编码" width="120" />
            <el-table-column prop="posName" label="职位名称" width="165" />
            <el-table-column prop="deptName" label="所属部门序列" width="155" />
            <el-table-column prop="level" label="职级等级" width="120" align="center" />
            <el-table-column prop="empCount" label="在岗人数" width="95" align="center" />
            <el-table-column prop="baseSalary" label="基准月薪(元)" width="120" align="right" />
            <el-table-column prop="status" label="状态" width="90" align="center">
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ row.status }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="岗位职责描述" min-width="220" show-overflow-tooltip />
            <el-table-column label="操作" width="125" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="openEditDialog(row)">修改</el-button>
                <el-button size="small" type="danger" link @click="deleteRow(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 6. 员工管理 -->
          <el-table v-else :data="currentRows" border stripe size="small" height="100%">
            <el-table-column type="index" label="#" width="48" align="center" />
            <el-table-column prop="empNo" label="员工工号" width="105" />
            <el-table-column prop="name" label="员工姓名" width="105" />
            <el-table-column prop="gender" label="性别" width="65" align="center" />
            <el-table-column prop="phone" label="手机号码" width="125" />
            <el-table-column prop="idCard" label="身份证号" width="165" />
            <el-table-column prop="network" label="所属网点" width="115" />
            <el-table-column prop="deptName" label="所属部门" width="150" />
            <el-table-column prop="position" label="担任职位" width="145" />
            <el-table-column prop="entryDate" label="入职日期" width="115" align="center" />
            <el-table-column prop="state" label="在职状态" width="95" align="center">
              <template #default="{ row }">
                <el-tag type="success" size="small">{{ row.state }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="125" fixed="right" align="center">
              <template #default="{ row }">
                <el-button size="small" type="primary" link @click="openEditDialog(row)">编辑</el-button>
                <el-button size="small" type="danger" link @click="deleteRow(row)">离职/删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>

    <!-- 角色权限分配抽屉 -->
    <el-drawer v-model="permDrawerVisible" :title="`分配角色菜单与按钮权限 - ${activeRoleName}`" size="480px" append-to-body>
      <div style="margin-bottom: 10px; font-size: 13px; color: #606266">
        勾选该角色可访问的导航菜单及页面操作按钮：
      </div>
      <el-tree
        :data="permissionTreeData"
        show-checkbox
        node-key="path"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        :props="{ label: 'title', children: 'children' }"
      />
      <template #footer>
        <el-button size="small" @click="permDrawerVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveRolePermissions">保存权限配置</el-button>
      </template>
    </el-drawer>

    <!-- 通用新增/修改弹窗 -->
    <el-dialog v-model="editDialogVisible" :title="`${editForm.id ? '修改' : '新增'}${currentTitle}`" width="520px" append-to-body>
      <el-form :model="editForm" label-width="110px" size="small">
        <el-form-item label="名称 / 姓名：" required>
          <el-input v-model="editForm.name" placeholder="请输入名称或姓名" />
        </el-form-item>
        <el-form-item label="编码 / 账号：">
          <el-input v-model="editForm.code" placeholder="请输入编码或账号" />
        </el-form-item>
        <el-form-item label="所属网点：">
          <el-select v-model="editForm.network" style="width: 100%">
            <el-option v-for="n in archiveStore.networkList" :key="n.id" :label="n.name" :value="n.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="editForm.phone" placeholder="手机或办公电话" />
        </el-form-item>
        <el-form-item label="备注说明：">
          <el-input v-model="editForm.remark" type="textarea" :rows="2" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="saveEditForm">保 存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Plus, Setting, RefreshRight } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useEnterpriseStore } from '@/store/enterprise'
import { useArchiveStore } from '@/store/dictionaryAndArchive'
import { WHOLE_MENUS, type MenuItem } from '@/mock/menuData'

const route = useRoute()
const entStore = useEnterpriseStore()
const archiveStore = useArchiveStore()

const pageKey = computed(() => {
  const segs = route.path.split('/').filter(Boolean)
  return segs[segs.length - 1] || 'role'
})

const currentTitle = computed(() => String(route.meta.title || '记录'))
const searchKw = ref('')

// 修改密码表单
const pwdForm = reactive({
  oldPwd: '123456',
  newPwd: '',
  confirmPwd: ''
})

const pwdStrength = computed(() => {
  const len = pwdForm.newPwd.length
  if (!len) return 20
  if (len < 6) return 45
  if (len < 10) return 75
  return 95
})

const submitChangePwd = () => {
  if (!pwdForm.newPwd || pwdForm.newPwd !== pwdForm.confirmPwd) {
    ElMessage.warning('两次输入的新密码不一致，请检查')
    return
  }
  ElMessage.success('登录密码修改成功！下次登录请使用新密码')
  pwdForm.newPwd = ''
  pwdForm.confirmPwd = ''
}

const resetPwdForm = () => {
  pwdForm.oldPwd = ''
  pwdForm.newPwd = ''
  pwdForm.confirmPwd = ''
}

// 组织机构树
const orgTreeData = [
  {
    label: '星云智联物流总公司 (总部)',
    children: [
      { label: '干线营运调度中心' },
      { label: '财务与货款结算中心' },
      { label: '衡阳直属营业部' },
      { label: '长沙区域分拨分部' },
      { label: '武汉华中分拨分部' },
      { label: '上海华东分拨分部' }
    ]
  }
]

const onOrgNodeClick = (node: any) => {
  if (node.label.includes('总公司')) {
    searchKw.value = ''
  } else {
    searchKw.value = node.label.slice(0, 2)
  }
}

const currentRows = computed(() => {
  const kw = searchKw.value.trim().toLowerCase()
  let list: any[] = []
  if (pageKey.value === 'role') list = entStore.roleList
  else if (pageKey.value === 'user') list = entStore.userList
  else if (pageKey.value === 'onlineuser') list = entStore.onlineUserList
  else if (pageKey.value === 'organization') list = entStore.orgList
  else if (pageKey.value === 'position') list = entStore.positionList
  else list = entStore.employeeList

  if (!kw) return list
  return list.filter(r => JSON.stringify(r).toLowerCase().includes(kw))
})

// 权限树
const permDrawerVisible = ref(false)
const activeRoleName = ref('超级管理员')
const defaultCheckedKeys = ['/prevorder', '/operation', '/finance', '/payment', '/receipt']

function buildPermTree(items: MenuItem[]): any[] {
  return items.map(it => ({
    path: it.path,
    title: it.meta?.title || it.name || it.path,
    children: it.children ? buildPermTree(it.children) : []
  }))
}
const permissionTreeData = computed(() => buildPermTree(WHOLE_MENUS))

const openPermDrawer = (row?: any) => {
  activeRoleName.value = row?.roleName || '营运调度主管'
  permDrawerVisible.value = true
}

const saveRolePermissions = () => {
  permDrawerVisible.value = false
  ElMessage.success(`角色【${activeRoleName.value}】的菜单与按钮权限已更新生效`)
}

const handleResetUserPwd = (row?: any) => {
  ElMessage.success(`已将用户【${row?.realName || '选中用户'}】的登录密码重置为初始密码 888888`)
}

const refreshOnline = () => {
  ElMessage.success('在线会话列表已刷新')
}

const forceKickUser = (row: any) => {
  entStore.onlineUserList = entStore.onlineUserList.filter(u => u.sessionId !== row.sessionId)
  ElMessage.warning(`已强制踢出账号【${row.account}】的在线会话`)
}

// 通用新增/修改
const editDialogVisible = ref(false)
const editForm = reactive({
  id: '',
  name: '',
  code: '',
  network: '总部',
  phone: '13800138999',
  remark: ''
})

const openEditDialog = (row?: any) => {
  if (row) {
    editForm.id = row.id || 'EDIT'
    editForm.name = row.roleName || row.realName || row.orgName || row.posName || row.name || ''
    editForm.code = row.roleCode || row.account || row.orgCode || row.posCode || row.empNo || ''
    editForm.network = row.network || '总部'
    editForm.phone = row.phone || ''
    editForm.remark = row.remark || ''
  } else {
    editForm.id = ''
    editForm.name = ''
    editForm.code = ''
    editForm.remark = ''
  }
  editDialogVisible.value = true
}

const saveEditForm = () => {
  if (!editForm.name) {
    ElMessage.warning('请填写名称或姓名')
    return
  }
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  if (pageKey.value === 'role' && !editForm.id) {
    entStore.roleList.unshift({
      id: `R${Date.now().toString().slice(-3)}`,
      roleCode: editForm.code || 'CUSTOM_ROLE',
      roleName: editForm.name,
      userCount: 1,
      dataScope: '仅所在网点数据',
      status: '启用',
      createTime: now,
      remark: editForm.remark || '自定义业务角色'
    })
  } else if (pageKey.value === 'user' && !editForm.id) {
    entStore.userList.unshift({
      id: `U${Date.now().toString().slice(-3)}`,
      account: editForm.code || 'user01',
      realName: editForm.name,
      phone: editForm.phone,
      network: editForm.network,
      deptName: '营运调度部',
      roleName: '营业厅开单员',
      position: '开单专员',
      status: '启用',
      lastLogin: now
    })
  } else if (pageKey.value === 'employee' && !editForm.id) {
    entStore.employeeList.unshift({
      id: `EMP${Date.now().toString().slice(-3)}`,
      empNo: editForm.code || 'KB1099',
      name: editForm.name,
      gender: '男',
      phone: editForm.phone,
      idCard: '440103199501012233',
      network: editForm.network,
      deptName: '干线营运调度中心',
      position: '前台录单及客服专员',
      entryDate: now.slice(0, 10),
      state: '正式在职'
    })
  }
  editDialogVisible.value = false
  ElMessage.success(`${currentTitle.value}保存成功`)
}

const deleteRow = (row: any) => {
  if (pageKey.value === 'role') entStore.roleList = entStore.roleList.filter(r => r.id !== row.id)
  else if (pageKey.value === 'user') entStore.userList = entStore.userList.filter(r => r.id !== row.id)
  else if (pageKey.value === 'organization') entStore.orgList = entStore.orgList.filter(r => r.id !== row.id)
  else if (pageKey.value === 'position') entStore.positionList = entStore.positionList.filter(r => r.id !== row.id)
  else if (pageKey.value === 'employee') entStore.employeeList = entStore.employeeList.filter(r => r.id !== row.id)
  ElMessage.success('删除成功')
}
</script>

<style scoped lang="scss">
.user-hr-engine-page {
  padding: 10px 12px;
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f0f2f5;
}
.pwd-card-wrap {
  padding: 20px;
  .pwd-card {
    max-width: 680px;
    margin: 0 auto;
    .pwd-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 700;
    }
  }
}
.uh-toolbar {
  background: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-btns { display: flex; align-items: center; gap: 8px; }
  .right-info { font-size: 13px; color: #606266; }
}
.uh-body {
  flex: 1;
  display: flex;
  gap: 10px;
  overflow: hidden;
  &.with-left-tree {
    .org-tree-pane {
      width: 240px;
      background: #fff;
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      padding: 12px;
      flex-shrink: 0;
      .tree-title {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
  .table-pane {
    flex: 1;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    overflow: hidden;
  }
}
</style>
