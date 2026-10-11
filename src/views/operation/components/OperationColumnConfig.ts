// 自动提取自线上 GetTableColumnInfo 接口 (1:1 真实列配置与高级筛选项)
import type { GbColumnConfig } from '@/mock/orderData'

export interface OperationFilterItem {
  field: string
  title: string
  type: number
  sType?: number
  selectArr?: { label: string; value: string }[]
}

export const SHIPLIST_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "oStatusStr",
    "title": "状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "destCity",
    "title": "到站城市",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 1,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "shipper",
    "title": "发货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "shipPhone",
    "title": "发货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "shipTel",
    "title": "发货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "shipAreas",
    "title": "发货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "shipAddress",
    "title": "发货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "receiver",
    "title": "收货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "receivePhone",
    "title": "收货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "receiveTel",
    "title": "收货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "receiveAreas",
    "title": "收货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "creationTime",
    "title": "开单日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "goodsName",
    "title": "品名",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "pack",
    "title": "包装",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "model",
    "title": "型号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "numberCount",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "weightCount",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "volumeCount",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "worth",
    "title": "声明价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "fTotal",
    "title": "合计运费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "fCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "fReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "fMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 47,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 48,
    "align": "left",
    "field": "fPremium",
    "title": "保险费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 49,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 50,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "isReturnStr",
    "title": "是否返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "isReceiptStr",
    "title": "是否签回单",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 52,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 53,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 54,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 55,
    "align": "left",
    "field": "plateNo",
    "title": "车号",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 56,
    "align": "left",
    "field": "driverName",
    "title": "司机",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 57,
    "align": "left",
    "field": "driverPhone",
    "title": "司机电话t",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 58,
    "align": "left",
    "field": "bankName",
    "title": "开户行t",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 59,
    "align": "left",
    "field": "userName",
    "title": "开户名t",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 60,
    "align": "left",
    "field": "bankCard",
    "title": "数量",
    "width": 110,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 61,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 62,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 63,
    "align": "left",
    "field": "thirdNo",
    "title": "入库单号",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 64,
    "align": "left",
    "field": "onlinePayStatusStr",
    "title": "支付状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 65,
    "align": "left",
    "field": "isWaitPassStr",
    "title": "等通知放货",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 66,
    "align": "left",
    "field": "creator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 67,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 68,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 69,
    "align": "left",
    "field": "lastModificationTime",
    "title": "修改时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ysOtherOne",
    "title": "三轮车收入",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ysOtherTwo",
    "title": "应收其它费用二",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ysOtherThree",
    "title": "应收汽油",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yfOtherOne",
    "title": "应付包装费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yfOtherTwo",
    "title": "应付大车费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yfOtherThree",
    "title": "应付其它费用三",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "isInvoiceStr",
    "title": "是否开票",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "weight",
    "title": "重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 71,
    "align": "left",
    "field": "weightUnitPrice",
    "title": "重量单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 72,
    "align": "left",
    "field": "volume",
    "title": "体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 73,
    "align": "left",
    "field": "volumeUnitPrice",
    "title": "体积单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 74,
    "align": "left",
    "field": "number",
    "title": "件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 75,
    "align": "left",
    "field": "numberUnitPrice",
    "title": "件数单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 76,
    "align": "left",
    "field": "payType",
    "title": "结算方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "shipOrderPrintCount",
    "title": "打印次数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const SHIPLIST_FILTERS: OperationFilterItem[] = [
  {
    "field": "orderNo",
    "title": "运单号",
    "type": 1
  },
  {
    "field": "shippingDate",
    "title": "托运日期",
    "type": 1
  },
  {
    "field": "oStatusStr",
    "title": "状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "goodsNo",
    "title": "货号",
    "type": 1
  },
  {
    "field": "destCity",
    "title": "目的地",
    "type": 1
  },
  {
    "field": "orderTypeStr",
    "title": "运单类型",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shippingRouteStr",
    "title": "运输线路",
    "type": 1,
    "sType": 1
  },
  {
    "field": "openGroup",
    "title": "开单网点",
    "type": 1,
    "sType": 3
  },
  {
    "field": "sourceStr",
    "title": "运单来源",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shipper",
    "title": "发货方",
    "type": 1
  },
  {
    "field": "shipPhone",
    "title": "发货手机",
    "type": 1
  },
  {
    "field": "shipTel",
    "title": "发货座机",
    "type": 1
  },
  {
    "field": "shipIdCard",
    "title": "发货证件",
    "type": 1
  },
  {
    "field": "shipAddress",
    "title": "发货地址",
    "type": 1
  },
  {
    "field": "receiver",
    "title": "收货方",
    "type": 1
  },
  {
    "field": "receivePhone",
    "title": "收货手机",
    "type": 1
  },
  {
    "field": "receiveTel",
    "title": "收货座机",
    "type": 1
  },
  {
    "field": "receiveIdCard",
    "title": "收货证件",
    "type": 1
  },
  {
    "field": "receiveAddress",
    "title": "收货地址",
    "type": 1
  },
  {
    "field": "goodsName",
    "title": "品名",
    "type": 1
  },
  {
    "field": "pack",
    "title": "包装",
    "type": 1
  },
  {
    "field": "model",
    "title": "型号",
    "type": 1
  },
  {
    "field": "deliveryType",
    "title": "交货方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "shippingType",
    "title": "运输方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "thirdNo",
    "title": "入库单号",
    "type": 1
  },
  {
    "field": "onlinePayStatusStr",
    "title": "支付状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "creator",
    "title": "开单人",
    "type": 1
  },
  {
    "field": "salesMan",
    "title": "业务员",
    "type": 1
  },
  {
    "field": "modifier",
    "title": "修改人",
    "type": 1
  },
  {
    "field": "auditStatusStr",
    "title": "审核状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "isReceiptStr",
    "title": "是否签回单",
    "type": 1
  }
]

export const TRANSLIST_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "tStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "sendType",
    "title": "运输类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机号123123",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "count",
    "title": "总票数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fTotal",
    "title": "总运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "fRouteArrive",
    "title": "途径到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "fInfo",
    "title": "信息费",
    "width": 75,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "askArriveTime",
    "title": "要求到达时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "arrivedTime",
    "title": "实际到达时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "routeGroup",
    "title": "途径网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "auditPerson",
    "title": "审核人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "auditTime",
    "title": "审核时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "yfTotal",
    "title": "合计运费(单)",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "yfreight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "transportZDYField14",
    "title": "自定义字段14",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "transportZDYField13",
    "title": "自定义字段13",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "transportZDYField12",
    "title": "自定义字段12",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "transportZDYField11",
    "title": "自定义字段11",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "carInfo",
    "title": "车辆信息",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "transportZDYField7",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "transportZDYField1",
    "title": "电卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "transportZDYField4",
    "title": "卸货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "transportZDYField3",
    "title": "其他费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "transportZDYField2",
    "title": "装货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "transportZDYField5",
    "title": "吊叉车费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "transportZDYField6",
    "title": "过磅费1",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  }
]

export const TRANSLIST_FILTERS: OperationFilterItem[] = []

export const TRANS_APPORTION_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "transportZDYField4",
    "title": "卸货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "transportZDYField2",
    "title": "装货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "fInfo",
    "title": "信息费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "transportZDYField3",
    "title": "其他费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "transportZDYField6",
    "title": "过磅费1",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "fRouteArrive",
    "title": "途径到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "transportZDYField7",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "transportZDYField5",
    "title": "吊叉车费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "transportZDYField1",
    "title": "电卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机号123123",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "carInfo",
    "title": "车辆信息",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "transportZDYField14",
    "title": "自定义字段14",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "transportZDYField13",
    "title": "自定义字段13",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "transportZDYField12",
    "title": "自定义字段12",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "transportZDYField11",
    "title": "自定义字段11",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const TRANS_APPORTION_FILTERS: OperationFilterItem[] = []

export const SHUTTLE_WAYBILL_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "isArrivedBuStr",
    "title": "补单",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "oStatusStr",
    "title": "状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destCity",
    "title": "目的地",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipper",
    "title": "发货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipPhone",
    "title": "发货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipTel",
    "title": "发货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipAreas",
    "title": "发货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipAddress",
    "title": "发货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiver",
    "title": "收货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receivePhone",
    "title": "收货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveTel",
    "title": "收货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveAreas",
    "title": "收货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creationTime",
    "title": "开单日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "goodsName",
    "title": "品名",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "pack",
    "title": "包装",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "model",
    "title": "型号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "number",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "weight",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "volume",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "worth",
    "title": "声明价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fTotal",
    "title": "合计运费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fPremium",
    "title": "保险费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "cost",
    "title": "分摊成本",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const SHUTTLE_WAYBILL_FILTERS: OperationFilterItem[] = [
  {
    "field": "orderNo",
    "title": "运单号",
    "type": 1
  },
  {
    "field": "oStatusStr",
    "title": "状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "goodsNo",
    "title": "货号",
    "type": 1
  },
  {
    "field": "destCity",
    "title": "目的地",
    "type": 1
  },
  {
    "field": "orderTypeStr",
    "title": "运单类型",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shippingRouteStr",
    "title": "运输线路",
    "type": 1,
    "sType": 1
  },
  {
    "field": "openGroup",
    "title": "开单网点",
    "type": 1,
    "sType": 3
  },
  {
    "field": "CurrGroup",
    "title": "库存网点",
    "type": 1,
    "sType": 3
  },
  {
    "field": "sourceStr",
    "title": "运单来源",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shipper",
    "title": "发货方",
    "type": 1
  },
  {
    "field": "shipUnit",
    "title": "发货单位",
    "type": 1
  },
  {
    "field": "shipPhone",
    "title": "发货手机",
    "type": 1
  },
  {
    "field": "shipTel",
    "title": "发货座机",
    "type": 1
  },
  {
    "field": "shipIdCard",
    "title": "发货证件",
    "type": 1
  },
  {
    "field": "receiver",
    "title": "收货方",
    "type": 1
  },
  {
    "field": "receivePhone",
    "title": "收货手机",
    "type": 1
  },
  {
    "field": "receiveTel",
    "title": "收货座机",
    "type": 1
  },
  {
    "field": "receiveIdCard",
    "title": "收货证件",
    "type": 1
  },
  {
    "field": "deliveryType",
    "title": "交货方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "shippingType",
    "title": "运输方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "onlinePayStatusStr",
    "title": "支付状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "creator",
    "title": "开单人",
    "type": 1
  },
  {
    "field": "salesMan",
    "title": "业务员",
    "type": 1
  },
  {
    "field": "modifier",
    "title": "修改人",
    "type": 1
  },
  {
    "field": "auditStatusStr",
    "title": "审核状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shippingDate",
    "title": "托运日期",
    "type": 1
  }
]

export const STRANSLIST_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "tStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "transportTypeStr",
    "title": "运输类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "count",
    "title": "总票数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fTotal",
    "title": "总运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "auditPerson",
    "title": "审核人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "auditTime",
    "title": "审核时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const STRANSLIST_FILTERS: OperationFilterItem[] = []

export const CARTRACK_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 0,
    "align": "left",
    "field": "tStatusStr",
    "title": "车辆状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "trackCount",
    "title": "跟踪次数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "trackCreator",
    "title": "最后跟踪人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "trackingTime",
    "title": "最后跟踪时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "transportTypeStr",
    "title": "配载类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "sendType",
    "title": "运输类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机号123123",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "askArriveTime",
    "title": "要求到达时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "fTotal",
    "title": "总运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "fRouteArrive",
    "title": "途径到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "fInfo",
    "title": "信息费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "routeGroup",
    "title": "途径网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "isInsureStr",
    "title": "是否投保",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "isInvoiceStr",
    "title": "是否开票",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "transportZDYField1",
    "title": "电卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "transportZDYField2",
    "title": "装货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "transportZDYField3",
    "title": "其他费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "transportZDYField4",
    "title": "卸货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "transportZDYField5",
    "title": "吊叉车费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "transportZDYField6",
    "title": "过磅费1",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "transportZDYField7",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "transportZDYField8",
    "title": "应付8",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "transportZDYField9",
    "title": "应付9",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "transportZDYField10",
    "title": "应付10",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "transportZDYField14",
    "title": "自定义字段14",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "transportZDYField13",
    "title": "自定义字段13",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "transportZDYField12",
    "title": "自定义字段12",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "transportZDYField11",
    "title": "自定义字段11",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "carInfo",
    "title": "车辆信息",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const CARTRACK_FILTERS: OperationFilterItem[] = [
  { field: 'transportNo', title: '发车批次', type: 1 },
  { field: 'licenseNo', title: '车牌号码', type: 1 },
  { field: 'driverName', title: '司机姓名', type: 1 },
  { field: 'driverMobile', title: '司机手机号', type: 1 },
  { field: 'tStatusStr', title: '车辆状态', type: 1, sType: 1 },
  { field: 'startGroup', title: '始发网点', type: 1 },
  { field: 'destGroup', title: '终端网点', type: 1 },
  { field: 'supplierName', title: '承运公司', type: 1 },
  { field: 'contractNo', title: '合同编号', type: 1 },
  { field: 'trackCreator', title: '最后跟踪人', type: 1 },
  { field: 'trackingTime', title: '最后跟踪时间', type: 1 },
  { field: 'sendType', title: '运输类型', type: 1 },
  { field: 'routeGroup', title: '途径网点', type: 1 },
  { field: 'openGroup', title: '开单网点', type: 1 }
]

export const ARRIVECONFIRM_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "tStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "sendType",
    "title": "运输类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机号123123",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "count",
    "title": "总票数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fTotal",
    "title": "总运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "fRouteArrive",
    "title": "途径到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "fInfo",
    "title": "信息费",
    "width": 75,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "askArriveTime",
    "title": "要求到达时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "arrivedTime",
    "title": "实际到达时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "routeGroup",
    "title": "途径网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "auditPerson",
    "title": "审核人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "auditTime",
    "title": "审核时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "yfTotal",
    "title": "合计运费(单)",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "yfreight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "transportZDYField14",
    "title": "自定义字段14",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "transportZDYField13",
    "title": "自定义字段13",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "transportZDYField12",
    "title": "自定义字段12",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "transportZDYField11",
    "title": "自定义字段11",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "carInfo",
    "title": "车辆信息",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "transportZDYField7",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "transportZDYField1",
    "title": "电卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "transportZDYField4",
    "title": "卸货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "transportZDYField3",
    "title": "其他费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "transportZDYField2",
    "title": "装货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "transportZDYField5",
    "title": "吊叉车费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "transportZDYField6",
    "title": "过磅费1",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  }
]

export const ARRIVECONFIRM_FILTERS: OperationFilterItem[] = []

export const ARRIVEASSIGN_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "tStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "transportTypeStr",
    "title": "运输类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "count",
    "title": "总票数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fTotal",
    "title": "总运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "fPrepare",
    "title": "预付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "fArrive",
    "title": "到付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "fBack",
    "title": "回付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "fOilCard",
    "title": "油卡付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "price",
    "title": "单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "auditPerson",
    "title": "审核人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "auditTime",
    "title": "审核时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const ARRIVEASSIGN_FILTERS: OperationFilterItem[] = []

export const HOMELIST_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "transportNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "tStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "contractNo",
    "title": "合同编号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "transportTypeStr",
    "title": "运输类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "supplierName",
    "title": "承运公司",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "shipTime",
    "title": "起运时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "count",
    "title": "总票数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "fTotal",
    "title": "送货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "distance",
    "title": "里程",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "auditPerson",
    "title": "审核人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "auditTime",
    "title": "审核时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "fee1",
    "title": "服务费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "else1",
    "title": "等待时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const HOMELIST_FILTERS: OperationFilterItem[] = []

export const LOCALOUTGO_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "oStatusStr",
    "title": "运单状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "typeStr",
    "title": "中转类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "carrierName",
    "title": "承运公司",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "switchNo",
    "title": "中转单号",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "switchTime",
    "title": "中转时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "localPhone",
    "title": "本地电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "takePhone",
    "title": "提货电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "fSwTotal",
    "title": "中转成本",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "fSwCash",
    "title": "中转现付",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "fSwReceipt",
    "title": "中转回单付",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "fSwMonth",
    "title": "中转月结",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "fSwitchReturn",
    "title": "返中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "isReturn",
    "title": "是否已返",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "swNumber",
    "title": "中转件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "swWeight",
    "title": "中转重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "swVolume",
    "title": "中转体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "groupName",
    "title": "中转网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "switchPerson",
    "title": "中转操作员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "remark",
    "title": "中转备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "signPerson",
    "title": "签收人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "signDate",
    "title": "签收时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "signCardId",
    "title": "签收人证件",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "signGroup",
    "title": "签收网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "signRemark",
    "title": "签收备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "destCity",
    "title": "目的地",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "shipper",
    "title": "发货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "shipPhone",
    "title": "发货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "shipTel",
    "title": "发货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "shipAreas",
    "title": "发货人区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "shipAddress",
    "title": "发货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "receiver",
    "title": "收货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 47,
    "align": "left",
    "field": "receivePhone",
    "title": "收货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 48,
    "align": "left",
    "field": "receiveTel",
    "title": "收货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 49,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 50,
    "align": "left",
    "field": "receiveAreas",
    "title": "收货人区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 52,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 53,
    "align": "left",
    "field": "creationTime",
    "title": "开单日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 54,
    "align": "left",
    "field": "goodsName",
    "title": "总品名",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 55,
    "align": "left",
    "field": "pack",
    "title": "总包装",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 56,
    "align": "left",
    "field": "model",
    "title": "总型号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 57,
    "align": "left",
    "field": "numberCount",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 58,
    "align": "left",
    "field": "weightCount",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 59,
    "align": "left",
    "field": "volumeCount",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 60,
    "align": "left",
    "field": "worth",
    "title": "价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 61,
    "align": "left",
    "field": "FTotal",
    "title": "总金额",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 62,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 63,
    "align": "left",
    "field": "FCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 64,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 65,
    "align": "left",
    "field": "FReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 66,
    "align": "left",
    "field": "FMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 67,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 68,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 69,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 71,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 72,
    "align": "left",
    "field": "fPremium",
    "title": "保险费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 73,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 74,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 75,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 76,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 77,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 78,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 79,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 80,
    "align": "left",
    "field": "creator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 81,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 81,
    "align": "left",
    "field": "fee1",
    "title": "装货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 82,
    "align": "left",
    "field": "fee2",
    "title": "卸货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  }
]

export const LOCALOUTGO_FILTERS: OperationFilterItem[] = []

export const TERMINALOUTGO_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "oStatusStr",
    "title": "运单状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "typeStr",
    "title": "中转类型",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "carrierName",
    "title": "承运公司",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "switchNo",
    "title": "中转单号",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "switchTime",
    "title": "中转时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "localPhone",
    "title": "本地电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "takePhone",
    "title": "提货电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "fSwTotal",
    "title": "中转成本",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "fSwCash",
    "title": "中转现付",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "fSwReceipt",
    "title": "中转回单付",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "fSwMonth",
    "title": "中转月结",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "fSwitchReturn",
    "title": "返中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "isReturn",
    "title": "是否已返",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "swNumber",
    "title": "中转件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "swWeight",
    "title": "中转重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "swVolume",
    "title": "中转体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "groupName",
    "title": "中转网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "switchPerson",
    "title": "中转操作员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "remark",
    "title": "中转备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "signPerson",
    "title": "签收人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "signDate",
    "title": "签收时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "signCardId",
    "title": "签收人证件",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "signGroup",
    "title": "签收网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "signRemark",
    "title": "签收备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "destCity",
    "title": "目的地",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "shipper",
    "title": "发货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "shipPhone",
    "title": "发货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "shipTel",
    "title": "发货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "shipAreas",
    "title": "发货人区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "shipAddress",
    "title": "发货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "receiver",
    "title": "收货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 47,
    "align": "left",
    "field": "receivePhone",
    "title": "收货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 48,
    "align": "left",
    "field": "receiveTel",
    "title": "收货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 49,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 50,
    "align": "left",
    "field": "receiveAreas",
    "title": "收货人区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 52,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 53,
    "align": "left",
    "field": "creationTime",
    "title": "开单日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 54,
    "align": "left",
    "field": "goodsName",
    "title": "总品名",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 55,
    "align": "left",
    "field": "pack",
    "title": "总包装",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 56,
    "align": "left",
    "field": "model",
    "title": "总型号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 57,
    "align": "left",
    "field": "NumberCount",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 58,
    "align": "left",
    "field": "WeightCount",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 59,
    "align": "left",
    "field": "VolumeCount",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 60,
    "align": "left",
    "field": "worth",
    "title": "价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 61,
    "align": "left",
    "field": "FTotal",
    "title": "总金额",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 62,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 63,
    "align": "left",
    "field": "FCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 64,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 65,
    "align": "left",
    "field": "FReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 66,
    "align": "left",
    "field": "FMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 67,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 68,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 69,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 71,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 72,
    "align": "left",
    "field": "fPremium",
    "title": "保险费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 73,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 74,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 75,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 76,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 77,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 78,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 79,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 80,
    "align": "left",
    "field": "creator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 81,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const TERMINALOUTGO_FILTERS: OperationFilterItem[] = []

export const SENDOUT_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "sendOutNo",
    "title": "发车批次",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "sStatusStr",
    "title": "状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "groupName",
    "title": "送出网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "creationTime",
    "title": "创建时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "sendOutDate",
    "title": "送出时间",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "licenseNo",
    "title": "车牌号码",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "driverName",
    "title": "司机姓名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "driverMobile",
    "title": "司机手机",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "fTotalCost",
    "title": "送出外发成本",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "creator",
    "title": "创建人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const SENDOUT_FILTERS: OperationFilterItem[] = []

export const OUTRACK_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 0,
    "align": "left",
    "field": "typeStr",
    "title": "中转类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "trackCount",
    "title": "跟踪次数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "trackCreator",
    "title": "最后跟踪人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "trackingTime",
    "title": "最后跟踪时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "carrierName",
    "title": "承运公司",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 6,
    "align": "left",
    "field": "switchNo",
    "title": "中转单号",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "switchTime",
    "title": "中转时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "localPhone",
    "title": "本地电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "takePhone",
    "title": "提货电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "fSwTotal",
    "title": "中转成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "fSwCash",
    "title": "中转现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "fSwReceipt",
    "title": "中转回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "fSwMonth",
    "title": "中转月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "fSwitchReturn",
    "title": "返中转费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "swNumber",
    "title": "中转件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "swWeight",
    "title": "中转重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "swVolume",
    "title": "中转体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "bz",
    "title": "跟踪备注",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "destCity",
    "title": "到站城市",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "shipper",
    "title": "发货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "shipPhone",
    "title": "发货人手机",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "shipTel",
    "title": "发货人电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货人身份证",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "receiver",
    "title": "收货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "receivePhone",
    "title": "收货人手机",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "receiveTel",
    "title": "收货人电话",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "receiveIdCard",
    "title": "发货人身份证",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "customerDetail",
    "title": "收发货人详细信息",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "distance",
    "title": "距离",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "payType",
    "title": "结算方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "fTotal",
    "title": "总金额",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "freight",
    "title": "运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "fCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "fReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "fMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "fCService",
    "title": "代收货款服务费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 47,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 48,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 49,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 50,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "fPremium",
    "title": "保价费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 52,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 53,
    "align": "left",
    "field": "receipt",
    "title": "回单要求",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 54,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 55,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 56,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 57,
    "align": "left",
    "field": "goodsName",
    "title": "总品名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 58,
    "align": "left",
    "field": "number",
    "title": "总件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 59,
    "align": "left",
    "field": "numberCount",
    "title": "总件数统计",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 60,
    "align": "left",
    "field": "weightCount",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 61,
    "align": "left",
    "field": "volumeCount",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 62,
    "align": "left",
    "field": "weight",
    "title": "总重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 63,
    "align": "left",
    "field": "volume",
    "title": "总体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 64,
    "align": "left",
    "field": "worth",
    "title": "总价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 65,
    "align": "left",
    "field": "shipAddress",
    "title": "发货人地址",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 66,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货人详细地址",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 67,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 68,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 69,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输路线",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 71,
    "align": "left",
    "field": "oStatusStr",
    "title": "运单状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 72,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 73,
    "align": "left",
    "field": "arriver",
    "title": "确认到达人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 74,
    "align": "left",
    "field": "arrivedTime",
    "title": "确认到达时间",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 75,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const OUTRACK_FILTERS: OperationFilterItem[] = []

export const UPDLIST_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "oStatusStr",
    "title": "运单状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destCity",
    "title": "目的地",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "oCreationTime",
    "title": "开单时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "oCreator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creator",
    "title": "改单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creationTime",
    "title": "改单时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "bfTotal",
    "title": "改单前运费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "efTotal",
    "title": "改单后运费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDiff",
    "title": "运费差额",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "content",
    "title": "修改内容",
    "width": 300,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const UPDLIST_FILTERS: OperationFilterItem[] = []

export const ABOLISH_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "oStatusStr",
    "title": "状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creationTime",
    "title": "作废时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "creator",
    "title": "作废人",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "reason",
    "title": "作废原因",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "destCity",
    "title": "目的地",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipper",
    "title": "发货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipPhone",
    "title": "发货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipTel",
    "title": "发货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shipAddress",
    "title": "发货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiver",
    "title": "收货人",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receivePhone",
    "title": "收货人手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveTel",
    "title": "收货人电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货人证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货人地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "goodsName",
    "title": "品名",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "number",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "weight",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "volume",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "worth",
    "title": "价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fTotal",
    "title": "总金额",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 1,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const ABOLISH_FILTERS: OperationFilterItem[] = [
  {
    "field": "orderNo",
    "title": "运单号",
    "type": 1
  },
  {
    "field": "oStatusStr",
    "title": "状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "goodsNo",
    "title": "货号",
    "type": 1
  },
  {
    "field": "destCity",
    "title": "目的地",
    "type": 1
  },
  {
    "field": "orderTypeStr",
    "title": "运单类型",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shippingRouteStr",
    "title": "运输线路",
    "type": 1,
    "sType": 1
  },
  {
    "field": "openGroup",
    "title": "开单网点",
    "type": 1,
    "sType": 3
  },
  {
    "field": "sourceStr",
    "title": "运单来源",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shipper",
    "title": "发货人",
    "type": 1
  },
  {
    "field": "shipPhone",
    "title": "发货人手机",
    "type": 1
  },
  {
    "field": "shipTel",
    "title": "发货人电话",
    "type": 1
  },
  {
    "field": "shipIdCard",
    "title": "发货人证件",
    "type": 1
  },
  {
    "field": "receiver",
    "title": "收货人",
    "type": 1
  },
  {
    "field": "receivePhone",
    "title": "收货人手机",
    "type": 1
  },
  {
    "field": "receiveTel",
    "title": "收货人电话",
    "type": 1
  },
  {
    "field": "receiveIdCard",
    "title": "收货人证件",
    "type": 1
  },
  {
    "field": "deliveryType",
    "title": "交货方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "shippingType",
    "title": "运输方式",
    "type": 1,
    "sType": 2
  }
]

export const STOCK_COLUMNS: GbColumnConfig[] = [
  {
    "sort": 1,
    "align": "left",
    "field": "orderNo",
    "title": "运单号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": true
    }
  },
  {
    "sort": 2,
    "align": "left",
    "field": "oStatusStr",
    "title": "状态",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 3,
    "align": "left",
    "field": "goodsNo",
    "title": "货号",
    "width": 85,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 4,
    "align": "left",
    "field": "startGroup",
    "title": "始发网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 5,
    "align": "left",
    "field": "destGroup",
    "title": "终端网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 7,
    "align": "left",
    "field": "destCity",
    "title": "到站城市",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 8,
    "align": "left",
    "field": "shippingDate",
    "title": "托运日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 9,
    "align": "left",
    "field": "orderTypeStr",
    "title": "运单类型",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 10,
    "align": "left",
    "field": "shippingRouteStr",
    "title": "运输线路",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 11,
    "align": "left",
    "field": "tags",
    "title": "标签",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 12,
    "align": "left",
    "field": "openGroup",
    "title": "开单网点",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 13,
    "align": "left",
    "field": "sourceStr",
    "title": "运单来源",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 14,
    "align": "left",
    "field": "shipper",
    "title": "发货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 15,
    "align": "left",
    "field": "shipUnit",
    "title": "发货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 16,
    "align": "left",
    "field": "shipPhone",
    "title": "发货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 17,
    "align": "left",
    "field": "shipTel",
    "title": "发货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 18,
    "align": "left",
    "field": "shipIdCard",
    "title": "发货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 19,
    "align": "left",
    "field": "shipAreas",
    "title": "发货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 20,
    "align": "left",
    "field": "shipAddress",
    "title": "发货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 21,
    "align": "left",
    "field": "receiver",
    "title": "收货方",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 22,
    "align": "left",
    "field": "receiveUnit",
    "title": "收货单位",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 23,
    "align": "left",
    "field": "receivePhone",
    "title": "收货手机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 24,
    "align": "left",
    "field": "receiveTel",
    "title": "收货座机",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 25,
    "align": "left",
    "field": "receiveIdCard",
    "title": "收货证件",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 26,
    "align": "left",
    "field": "receiveAreas",
    "title": "收货区域",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 27,
    "align": "left",
    "field": "receiveAddress",
    "title": "收货地址",
    "width": 120,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 28,
    "align": "left",
    "field": "distance",
    "title": "里程/km",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 29,
    "align": "left",
    "field": "creationTime",
    "title": "开单日期",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 30,
    "align": "left",
    "field": "goodsName",
    "title": "品名",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 31,
    "align": "left",
    "field": "pack",
    "title": "包装",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 32,
    "align": "left",
    "field": "model",
    "title": "型号",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 33,
    "align": "left",
    "field": "numberCount",
    "title": "件数",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 34,
    "align": "left",
    "field": "weightCount",
    "title": "重量",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 35,
    "align": "left",
    "field": "volumeCount",
    "title": "体积",
    "width": 60,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 36,
    "align": "left",
    "field": "worth",
    "title": "声明价值",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 37,
    "align": "left",
    "field": "fTotal",
    "title": "合计运费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 38,
    "align": "left",
    "field": "freight",
    "title": "基本运费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 39,
    "align": "left",
    "field": "fCash",
    "title": "现付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 40,
    "align": "left",
    "field": "fDeliver",
    "title": "提付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 41,
    "align": "left",
    "field": "fReceipt",
    "title": "回单付",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 42,
    "align": "left",
    "field": "fMonth",
    "title": "月结",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 43,
    "align": "left",
    "field": "fDeduct",
    "title": "货款扣",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 44,
    "align": "left",
    "field": "fCollect",
    "title": "代收货款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 45,
    "align": "left",
    "field": "fcService",
    "title": "货款手续费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 46,
    "align": "left",
    "field": "fReceive",
    "title": "接货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 47,
    "align": "left",
    "field": "fDelivery",
    "title": "送货费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 48,
    "align": "left",
    "field": "fPremium",
    "title": "保险费",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 49,
    "align": "left",
    "field": "fAdvance",
    "title": "垫付中转费",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 50,
    "align": "left",
    "field": "fReturn",
    "title": "返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "isReturnStr",
    "title": "是否返款",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 51,
    "align": "left",
    "field": "isReceiptStr",
    "title": "是否签回单",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 52,
    "align": "left",
    "field": "fDeliveryCost",
    "title": "接货成本",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 53,
    "align": "left",
    "field": "taxRate",
    "title": "税率",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 54,
    "align": "left",
    "field": "taxes",
    "title": "税金",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 55,
    "align": "left",
    "field": "plateNo",
    "title": "接货车牌",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 56,
    "align": "left",
    "field": "driverName",
    "title": "接货司机",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 57,
    "align": "left",
    "field": "driverPhone",
    "title": "司机电话",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 58,
    "align": "left",
    "field": "bankName",
    "title": "开户行",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 59,
    "align": "left",
    "field": "userName",
    "title": "开户名",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 60,
    "align": "left",
    "field": "bankCard",
    "title": "银行卡号",
    "width": 110,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 61,
    "align": "left",
    "field": "deliveryType",
    "title": "交货方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 62,
    "align": "left",
    "field": "shippingType",
    "title": "运输方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 63,
    "align": "left",
    "field": "thirdNo",
    "title": "入库单号",
    "width": 90,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 64,
    "align": "left",
    "field": "onlinePayStatusStr",
    "title": "支付状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 65,
    "align": "left",
    "field": "isWaitPassStr",
    "title": "等通知放货",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 66,
    "align": "left",
    "field": "creator",
    "title": "开单人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 67,
    "align": "left",
    "field": "salesMan",
    "title": "业务员",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 68,
    "align": "left",
    "field": "modifier",
    "title": "修改人",
    "width": 80,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 69,
    "align": "left",
    "field": "lastModificationTime",
    "title": "修改时间",
    "width": 130,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "auditStatusStr",
    "title": "审核状态",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ySOtherOne",
    "title": "三轮车收入",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ySOtherTwo",
    "title": "应收其它费用二",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "ySOtherThree",
    "title": "应收其它费用三",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yFOtherOne",
    "title": "应付1",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yFOtherTwo",
    "title": "应付二",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "yFOtherThree",
    "title": "应付其它费用三",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "isInvoiceStr",
    "title": "是否开票",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 70,
    "align": "left",
    "field": "weight",
    "title": "库存重量",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 71,
    "align": "left",
    "field": "weightUnitPrice",
    "title": "重量单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 72,
    "align": "left",
    "field": "volume",
    "title": "库存体积",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 73,
    "align": "left",
    "field": "volumeUnitPrice",
    "title": "体积单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 74,
    "align": "left",
    "field": "number",
    "title": "库存件数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 75,
    "align": "left",
    "field": "numberUnitPrice",
    "title": "件数单价",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 76,
    "align": "left",
    "field": "payType",
    "title": "结算方式",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 1,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "shipOrderPrintCount",
    "title": "打印次数",
    "width": 70,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": true,
      "isLink": false
    }
  },
  {
    "sort": 0,
    "align": "left",
    "field": "remark",
    "title": "备注",
    "width": 100,
    "sortable": true,
    "params": {
      "isShow": 0,
      "columnType": 0,
      "isFixed": null,
      "groupKey": null,
      "groupTitle": null,
      "groupSort": 0,
      "isTotal": false,
      "isLink": false
    }
  }
]

export const STOCK_FILTERS: OperationFilterItem[] = [
  {
    "field": "orderNo",
    "title": "运单号",
    "type": 1
  },
  {
    "field": "shippingDate",
    "title": "托运日期",
    "type": 1
  },
  {
    "field": "oStatusStr",
    "title": "状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "goodsNo",
    "title": "货号",
    "type": 1
  },
  {
    "field": "destCity",
    "title": "目的地",
    "type": 1
  },
  {
    "field": "orderTypeStr",
    "title": "运单类型",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shippingRouteStr",
    "title": "运输线路",
    "type": 1,
    "sType": 1
  },
  {
    "field": "openGroup",
    "title": "开单网点",
    "type": 1,
    "sType": 3
  },
  {
    "field": "sourceStr",
    "title": "运单来源",
    "type": 1,
    "sType": 1
  },
  {
    "field": "shipper",
    "title": "发货方",
    "type": 1
  },
  {
    "field": "shipPhone",
    "title": "发货手机",
    "type": 1
  },
  {
    "field": "shipTel",
    "title": "发货座机",
    "type": 1
  },
  {
    "field": "shipIdCard",
    "title": "发货证件",
    "type": 1
  },
  {
    "field": "shipAddress",
    "title": "发货地址",
    "type": 1
  },
  {
    "field": "receiver",
    "title": "收货方",
    "type": 1
  },
  {
    "field": "receivePhone",
    "title": "收货手机",
    "type": 1
  },
  {
    "field": "receiveTel",
    "title": "收货座机",
    "type": 1
  },
  {
    "field": "receiveIdCard",
    "title": "收货证件",
    "type": 1
  },
  {
    "field": "receiveAddress",
    "title": "收货地址",
    "type": 1
  },
  {
    "field": "goodsName",
    "title": "品名",
    "type": 1
  },
  {
    "field": "pack",
    "title": "包装",
    "type": 1
  },
  {
    "field": "model",
    "title": "型号",
    "type": 1
  },
  {
    "field": "deliveryType",
    "title": "交货方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "shippingType",
    "title": "运输方式",
    "type": 1,
    "sType": 2
  },
  {
    "field": "thirdNo",
    "title": "入库单号",
    "type": 1
  },
  {
    "field": "onlinePayStatusStr",
    "title": "支付状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "creator",
    "title": "开单人",
    "type": 1
  },
  {
    "field": "salesMan",
    "title": "业务员",
    "type": 1
  },
  {
    "field": "modifier",
    "title": "修改人",
    "type": 1
  },
  {
    "field": "auditStatusStr",
    "title": "审核状态",
    "type": 1,
    "sType": 1
  },
  {
    "field": "isReceiptStr",
    "title": "是否签回单",
    "type": 1
  }
]

