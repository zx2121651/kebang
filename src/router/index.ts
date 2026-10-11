import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import Welcome from '@/views/welcome/index.vue'
import PrevOrder from '@/views/prevorder/index.vue'
import OrderList from '@/views/operation/order/orderlist.vue'
import CustOrder from '@/views/operation/order/custorder.vue'
import ShipList from '@/views/operation/ship/shiplist.vue'
import ShipDetail from '@/views/operation/ship/shipdetail.vue'
import TransList from '@/views/operation/ship/translist.vue'
import StransList from '@/views/operation/ship/stranslist.vue'
import CarTrack from '@/views/operation/ship/cartrack.vue'
import ArriveConfirm from '@/views/operation/arrive/arriveconfirm.vue'
import ArriveAssign from '@/views/operation/arrive/arriveassign.vue'
import HomeList from '@/views/operation/arrive/homelist.vue'
import SignList from '@/views/operation/arrive/signlist.vue'
import LocalOutgo from '@/views/operation/outgo/localoutgo.vue'
import TerminalOutgo from '@/views/operation/outgo/terminaloutgo.vue'
import SendOut from '@/views/operation/outgo/sendout.vue'
import OutTrack from '@/views/operation/outgo/outrack.vue'
import UpdOrder from '@/views/operation/else/updorder.vue'
import UpdList from '@/views/operation/else/updlist.vue'
import Abolish from '@/views/operation/else/abolish.vue'
import Stock from '@/views/operation/else/stock.vue'
import AddShip from '@/views/customRoute/addShip.vue'
import AddTranslist from '@/views/customRoute/addTranslist.vue'
import AddStrans from '@/views/customRoute/addStrans.vue'
import AddArrive from '@/views/customRoute/addArrive.vue'
import AddDeliverHome from '@/views/customRoute/addDeliverHome.vue'
import AddSendout from '@/views/customRoute/addSendout.vue'
import FinanceCenterEngine from '@/views/finance/FinanceCenterEngine.vue'
import PaymentCenterEngine from '@/views/payment/PaymentCenterEngine.vue'
import ReceiptCenterEngine from '@/views/receipt/ReceiptCenterEngine.vue'
import ArchiveCenterEngine from '@/views/archive/ArchiveCenterEngine.vue'
import ReportCenterEngine from '@/views/report/ReportCenterEngine.vue'
import UserAndHrEngine from '@/views/hr/UserAndHrEngine.vue'
import SystemCenterEngine from '@/views/system/SystemCenterEngine.vue'
import Placeholder from '@/views/placeholder/index.vue'
import { WHOLE_MENUS, MenuItem } from '@/mock/menuData'

// 明确实现的业务页面字典映射
const EXPLICIT_PAGE_MAP: Record<string, { component: any; title: string }> = {
  '/prevorder': { component: PrevOrder, title: '上游订单' },
  '/operation/order/orderlist': { component: OrderList, title: '订单总表' },
  '/operation/order/custorder': { component: CustOrder, title: '创建订单' },
  '/customRoute/custorder': { component: CustOrder, title: '创建订单' },
  '/operation/ship/shiplist': { component: ShipList, title: '运单管理' },
  '/operation/ship/shipdetail': { component: ShipDetail, title: '运单综合查询' },
  '/operation/ship/shipdetail/shipdetail': { component: ShipDetail, title: '运单查询' },
  '/operation/ship/shipdetail/loaddetail': { component: ShipDetail, title: '配载单查询' },
  '/operation/ship/shipdetail/outdetail': { component: ShipDetail, title: '外发单查询' },
  '/operation/ship/translist': { component: TransList, title: '干线配载' },
  '/operation/ship/stranslist': { component: StransList, title: '短途配载' },
  '/operation/ship/cartrack': { component: CarTrack, title: '车辆跟踪' },
  '/operation/arrive/arriveconfirm': { component: ArriveConfirm, title: '到货确认' },
  '/operation/arrive/arriveassign': { component: ArriveAssign, title: '到货分拨' },
  '/operation/arrive/homelist': { component: HomeList, title: '送货上门' },
  '/operation/arrive/signlist': { component: SignList, title: '签收管理' },
  '/operation/outgo/localoutgo': { component: LocalOutgo, title: '本地外发' },
  '/operation/outgo/terminaloutgo': { component: TerminalOutgo, title: '终端外发' },
  '/operation/outgo/sendout': { component: SendOut, title: '送出外发' },
  '/operation/outgo/outrack': { component: OutTrack, title: '外发跟踪' },
  '/operation/out/localoutgo': { component: LocalOutgo, title: '本地外发' },
  '/operation/out/terminaloutgo': { component: TerminalOutgo, title: '终端外发' },
  '/operation/out/sendout': { component: SendOut, title: '送出外发' },
  '/operation/out/outrack': { component: OutTrack, title: '外发跟踪' },
  '/operation/else/updorder': { component: UpdOrder, title: '更改单据' },
  '/operation/else/updlist': { component: UpdList, title: '改单历史' },
  '/operation/else/abolish': { component: Abolish, title: '作废运单' },
  '/operation/else/stock': { component: Stock, title: '运单库存' },
  '/customRoute/addShip': { component: AddShip, title: '录运单' },
  '/quickOrder': { component: AddShip, title: '录运单' }
}

function resolveComponentForPath(path: string): any {
  if (EXPLICIT_PAGE_MAP[path]) return EXPLICIT_PAGE_MAP[path].component
  if (path.startsWith('/operation/ship/shipdetail')) return ShipDetail
  if (path.startsWith('/finance')) return FinanceCenterEngine
  if (path.startsWith('/payment')) return PaymentCenterEngine
  if (path.startsWith('/receipt')) return ReceiptCenterEngine
  if (path.startsWith('/customer') || path.startsWith('/car')) return ArchiveCenterEngine
  if (path.startsWith('/report')) return ReportCenterEngine
  if (path.startsWith('/usercenter') || path.startsWith('/personnel')) return UserAndHrEngine
  if (path.startsWith('/system')) return SystemCenterEngine
  return Placeholder
}

// 将全量菜单树展平成动态子路由
function flattenRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  const registeredPaths = new Set<string>()

  function traverse(items: MenuItem[]) {
    for (const item of items) {
      if (!item.path || item.path === '/welcome') continue
      if (item.meta?.menuType === 3) continue

      const isExplicit = Boolean(EXPLICIT_PAGE_MAP[item.path])
      const isLeafPage =
        item.meta?.menuType === 2 ||
        !item.children ||
        item.children.length === 0 ||
        item.children.every(c => c.meta?.menuType === 3)

      if (isExplicit || isLeafPage) {
        if (!registeredPaths.has(item.path)) {
          registeredPaths.add(item.path)
          routes.push({
            path: item.path,
            name: item.path.replace(/\//g, '_').replace(/^_/, ''),
            component: resolveComponentForPath(item.path),
            meta: {
              title: item.meta?.title || EXPLICIT_PAGE_MAP[item.path]?.title || '业务模块',
              icon: item.meta?.icon
            }
          })
        }
        continue
      }

      if (item.children && item.children.length > 0) {
        traverse(item.children)
      }
    }
  }

  traverse(menus)

  // 确保 EXPLICIT_PAGE_MAP 中所有页面 100% 注册
  for (const [path, info] of Object.entries(EXPLICIT_PAGE_MAP)) {
    if (!registeredPaths.has(path)) {
      registeredPaths.add(path)
      routes.push({
        path,
        name: path.replace(/\//g, '_').replace(/^_/, ''),
        component: info.component,
        meta: { title: info.title }
      })
    }
  }

  return routes
}

const dynamicSubRoutes = flattenRoutes(WHOLE_MENUS)

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome,
        meta: {
          title: '首页',
          icon: 'icon-mulu'
        }
      },
      // 订单录入/修改/详情
      {
        path: '/customRoute/editOrder/:id?',
        name: 'customRoute_editOrder',
        component: CustOrder,
        meta: { title: '修改订单', icon: 'icon-order' }
      },
      {
        path: '/customRoute/orderDetail/:id?',
        name: 'customRoute_orderDetail',
        component: CustOrder,
        meta: { title: '订单详情', icon: 'icon-order' }
      },
      // 运单补单/修改/复制
      {
        path: '/customRoute/fillShip',
        name: 'customRoute_fillShip',
        component: AddShip,
        meta: { title: '手动补单', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/updateShip/:id?',
        name: 'customRoute_updateShip',
        component: AddShip,
        meta: { title: '修改运单', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/copyShip/:id?',
        name: 'customRoute_copyShip',
        component: AddShip,
        meta: { title: '复制运单', icon: 'icon-shiporder' }
      },
      // 干线配载 新增/修改/补单/改单
      {
        path: '/customRoute/addTranslist',
        name: 'customRoute_addTranslist',
        component: AddTranslist,
        meta: { title: '新增干线配载', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/editTrans/:id?/:type?',
        name: 'customRoute_editTrans',
        component: AddTranslist,
        meta: { title: '修改干线配载', icon: 'icon-shiporder' }
      },
      // 短途配载 新增/修改
      {
        path: '/customRoute/addStrans',
        name: 'customRoute_addStrans',
        component: AddStrans,
        meta: { title: '新增短途配载', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/editStrans/:id?/:type?',
        name: 'customRoute_editStrans',
        component: AddStrans,
        meta: { title: '修改短途配载', icon: 'icon-shiporder' }
      },
      // 到货分拨 新增/修改
      {
        path: '/customRoute/addArrive',
        name: 'customRoute_addArrive',
        component: AddArrive,
        meta: { title: '新增到货分拨', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/editArrive/:id?/:type?',
        name: 'customRoute_editArrive',
        component: AddArrive,
        meta: { title: '修改到货分拨', icon: 'icon-shiporder' }
      },
      // 送货上门 新增/修改
      {
        path: '/customRoute/addDeliverHome',
        name: 'customRoute_addDeliverHome',
        component: AddDeliverHome,
        meta: { title: '新增送货上门', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/editDeliverHome/:id?/:type?',
        name: 'customRoute_editDeliverHome',
        component: AddDeliverHome,
        meta: { title: '修改送货上门', icon: 'icon-shiporder' }
      },
      // 外发快捷路由
      {
        path: '/customRoute/addLocalOutgo',
        name: 'customRoute_addLocalOutgo',
        component: LocalOutgo,
        meta: { title: '新增本地外发', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/addTerminalOutgo',
        name: 'customRoute_addTerminalOutgo',
        component: TerminalOutgo,
        meta: { title: '新增终端外发', icon: 'icon-shiporder' }
      },
      {
        path: '/customRoute/addSendout',
        name: 'customRoute_addSendout',
        component: AddSendout,
        meta: { title: '新增送出外发', icon: 'icon-shiporder' }
      },
      ...dynamicSubRoutes,
      { path: '/finance/:pathMatch(.*)*', component: FinanceCenterEngine, meta: { title: '财务中心' } },
      { path: '/payment/:pathMatch(.*)*', component: PaymentCenterEngine, meta: { title: '货款中心' } },
      { path: '/receipt/:pathMatch(.*)*', component: ReceiptCenterEngine, meta: { title: '回单管理' } },
      { path: '/customer/:pathMatch(.*)*', component: ArchiveCenterEngine, meta: { title: '客户档案' } },
      { path: '/car/:pathMatch(.*)*', component: ArchiveCenterEngine, meta: { title: '车辆档案' } },
      { path: '/report/:pathMatch(.*)*', component: ReportCenterEngine, meta: { title: '报表中心' } },
      { path: '/usercenter/:pathMatch(.*)*', component: UserAndHrEngine, meta: { title: '用户中心' } },
      { path: '/personnel/:pathMatch(.*)*', component: UserAndHrEngine, meta: { title: '人事行政' } },
      { path: '/system/:pathMatch(.*)*', component: SystemCenterEngine, meta: { title: '系统管理' } }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/welcome'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
