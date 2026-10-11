import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { INITIAL_ORDERS, enrichOrderRecord, type OrderRecord } from '@/mock/orderData'

export const useOrderStore = defineStore('order', () => {
  const orders = ref<(OrderRecord & Record<string, any>)[]>(
    INITIAL_ORDERS.map(item => enrichOrderRecord(item))
  )

  // 待转入的上游订单数量 (source === 5 && isShip === 0 && !isRejected)
  const pendingUpstreamCount = computed(() =>
    orders.value.filter(o => o.source === 5 && o.isShip === 0 && !o.isRejected).length
  )

  // 根据 ID 查找订单
  function getOrderById(id: string): (OrderRecord & Record<string, any>) | undefined {
    return orders.value.find(o => o.id === id || o.orderNo === id)
  }

  // 生成新订单号
  function generateNewOrderNo(): string {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
    const seq = String(orders.value.length + 1).padStart(3, '0')
    return `DD${dateStr}${seq}`
  }

  // 新增订单
  function addOrder(payload: Record<string, any>): OrderRecord & Record<string, any> {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
    const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
    const seq = String(orders.value.length + 1).padStart(3, '0')

    const baseRecord = {
      id: payload.id || `ORD-${Date.now()}`,
      orderNo: payload.orderNo || `DD${dateStr}${seq}`,
      goodsNo: payload.goodsNo || `${payload.orderNo || `DD${dateStr}${seq}`}-${payload.number || payload.num || 1}`,
      source: payload.source ?? 5,
      sourceName: payload.sourceName || (payload.source === 1 ? '系统录入' : '开放平台API'),
      upstreamPlatform: payload.upstreamPlatform || (payload.source === 1 ? 'PC端自建' : '星云企业互联 · 专线协同'),
      upstreamOrderNo: payload.upstreamOrderNo || `UP-${dateStr}-${seq}`,
      auditStatus: (payload.auditStatus ?? 1) as 1 | 2,
      isShip: 0 as 0 | 1,
      shipNo: '',
      shipId: '',
      orderType: payload.orderType ?? 0,
      deliverType: payload.deliverType ?? 0,
      createByName: payload.creator || payload.createByName || 'aadmin',
      createTime: payload.creationTime || payload.createTime || timeStr,
      consignDate: payload.shippingDate || payload.consignDate || timeStr,
      auditByName: '',
      auditTime: '',
      ...payload
    }

    const newRecord = enrichOrderRecord(baseRecord)
    orders.value.unshift(newRecord)
    return newRecord
  }

  // 修改订单
  function updateOrder(id: string, payload: Record<string, any>): boolean {
    const idx = orders.value.findIndex(o => o.id === id)
    if (idx === -1) return false
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    orders.value[idx] = enrichOrderRecord({
      ...orders.value[idx],
      ...payload,
      modifier: 'aadmin',
      lastModificationTime: timeStr
    })
    return true
  }

  // 批量删除订单 (仅允许删除未转运单的订单)
  function batchDelete(ids: string[]): number {
    const before = orders.value.length
    orders.value = orders.value.filter(o => !ids.includes(o.id))
    return before - orders.value.length
  }

  // 批量审核 / 取消审核 (type: 2=审核通过, 1=取消审核还原为待审核)
  function batchAudit(ids: string[], targetStatus: 1 | 2): number {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, '0')
    const timeStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

    let count = 0
    orders.value = orders.value.map(o => {
      if (ids.includes(o.id)) {
        count++
        return enrichOrderRecord({
          ...o,
          isRejected: false,
          rejectReason: '',
          auditStatus: targetStatus,
          auditByName: targetStatus === 2 ? 'aadmin' : '',
          auditTime: targetStatus === 2 ? timeStr : '',
          modifier: 'aadmin',
          lastModificationTime: timeStr
        })
      }
      return o
    })
    return count
  }

  // 批量指派提货车辆与司机
  function assignPickupVehicle(
    ids: string[],
    payload: { pickupTruckNo: string; pickupDriver: string; pickupDriverPhone: string; remark?: string }
  ): number {
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 19)
    let count = 0
    orders.value = orders.value.map(o => {
      if (ids.includes(o.id)) {
        count++
        return enrichOrderRecord({
          ...o,
          pickupTruckNo: payload.pickupTruckNo,
          pickupDriver: payload.pickupDriver,
          pickupDriverPhone: payload.pickupDriverPhone,
          remark: payload.remark ? `${o.remark ? o.remark + '；' : ''}${payload.remark}` : o.remark,
          modifier: 'aadmin',
          lastModificationTime: timeStr
        })
      }
      return o
    })
    return count
  }

  // 驳回上游订单 / 取消驳回
  function rejectUpstreamOrders(ids: string[], reason: string): number {
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 19)
    let count = 0
    orders.value = orders.value.map(o => {
      if (ids.includes(o.id) && o.isShip === 0) {
        count++
        return enrichOrderRecord({
          ...o,
          isRejected: true,
          rejectReason: reason,
          remark: `【已驳回上游：${reason}】${o.remark || ''}`,
          modifier: 'aadmin',
          lastModificationTime: timeStr
        })
      }
      return o
    })
    return count
  }

  // 转入运单成功标记
  function markConvertedToWaybill(id: string, shipNo: string, shipId: string = ''): boolean {
    const idx = orders.value.findIndex(o => o.id === id || o.orderNo === id)
    if (idx === -1) return false
    const item = orders.value[idx]
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 19)
    orders.value[idx] = enrichOrderRecord({
      ...item,
      isRejected: false,
      isShip: 1,
      shipNo,
      shipId: shipId || `WB-${Date.now()}`,
      auditStatus: 2,
      auditByName: item.auditByName || 'aadmin',
      auditTime: item.auditTime || timeStr,
      modifier: 'aadmin',
      lastModificationTime: timeStr
    })
    return true
  }

  // 批量取消转入运单
  function batchCancelImport(ids: string[]): number {
    let count = 0
    const timeStr = new Date().toISOString().replace('T', ' ').slice(0, 19)
    orders.value = orders.value.map(o => {
      if (ids.includes(o.id) && o.isShip === 1) {
        count++
        return enrichOrderRecord({
          ...o,
          isShip: 0,
          shipNo: '',
          shipId: '',
          modifier: 'aadmin',
          lastModificationTime: timeStr
        })
      }
      return o
    })
    return count
  }

  return {
    orders,
    pendingUpstreamCount,
    getOrderById,
    generateNewOrderNo,
    addOrder,
    updateOrder,
    batchDelete,
    batchAudit,
    assignPickupVehicle,
    rejectUpstreamOrders,
    markConvertedToWaybill,
    batchCancelImport
  }
})
