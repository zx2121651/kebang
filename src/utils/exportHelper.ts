/**
 * 真实导出表格数据为 CSV/Excel 文件并在浏览器触发物理下载 (含 UTF-8 BOM，Excel 双击直接打开不乱码)
 * 支持双重签名：
 * 1) exportTableToCsv(filename, data, columns)
 * 2) exportTableToCsv(data, columns, filename)
 */
export function exportTableToCsv(
  param1: string | Record<string, any>[],
  param2?: Record<string, any>[] | any[] | string,
  param3?: any[] | string
) {
  let filename = '星云TMS数据台账'
  let data: Record<string, any>[] = []
  let rawColumns: any[] | undefined

  if (typeof param1 === 'string') {
    filename = param1
    data = (Array.isArray(param2) ? param2 : []) as Record<string, any>[]
    rawColumns = Array.isArray(param3) ? param3 : undefined
  } else if (Array.isArray(param1)) {
    data = param1
    if (Array.isArray(param2)) {
      rawColumns = param2
      filename = typeof param3 === 'string' ? param3 : '星云TMS数据台账'
    } else if (typeof param2 === 'string') {
      filename = param2
      rawColumns = Array.isArray(param3) ? param3 : undefined
    }
  }

  const columns: { prop: string; label: string }[] =
    rawColumns && rawColumns.length > 0
      ? rawColumns.map((c: any) => ({
          prop: c.prop || c.key || c.field || '',
          label: c.label || c.title || c.prop || c.key || ''
        })).filter(c => c.prop)
      : (data[0] ? Object.keys(data[0]).map(k => ({ prop: k, label: k })) : [])

  if (columns.length === 0) {
    console.warn('无可导出表头或数据')
    return
  }

  // 表头行
  const headerRow = columns.map(c => `"${String(c.label || c.prop).replace(/"/g, '""')}"`).join(',')

  // 数据行
  const bodyRows = data.map(row => {
    return columns
      .map(c => {
        const val = row[c.prop]
        const str = val === null || val === undefined ? '' : String(val)
        return `"${str.replace(/"/g, '""')}"`
      })
      .join(',')
  })

  // UTF-8 BOM 避免 Excel 中文乱码
  const csvContent = '\uFEFF' + [headerRow, ...bodyRows].join('\r\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const finalName = filename.endsWith('.csv') || filename.endsWith('.xlsx')
    ? filename
    : `${filename}.csv`

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', finalName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 真实下载《星云TMS运单批量导入标准模板.csv》
 */
export function downloadWaybillImportTemplate() {
  const templateHeaders = [
    { prop: 'startGroup', label: '始发网点*' },
    { prop: 'destCity', label: '到站城市*' },
    { prop: 'destGroup', label: '终端网点' },
    { prop: 'deliveryType', label: '交接方式(网点自提/送货上门)' },
    { prop: 'payType', label: '付款方式(现付/提付/回单付/月结)' },
    { prop: 'shipper', label: '发货人*' },
    { prop: 'shipPhone', label: '发货人手机*' },
    { prop: 'shipUnit', label: '发货单位' },
    { prop: 'shipAddress', label: '发货地址' },
    { prop: 'receiver', label: '收货人*' },
    { prop: 'receivePhone', label: '收货人手机*' },
    { prop: 'receiveUnit', label: '收货单位' },
    { prop: 'receiveAddress', label: '收货详细地址' },
    { prop: 'goodsName', label: '货物名称*' },
    { prop: 'pack', label: '包装' },
    { prop: 'numberCount', label: '件数*' },
    { prop: 'weightCount', label: '重量(kg)' },
    { prop: 'volumeCount', label: '体积(m³)' },
    { prop: 'freight', label: '基本运费(元)*' },
    { prop: 'fDelivery', label: '送货费' },
    { prop: 'fCollect', label: '代收货款' },
    { prop: 'worth', label: '声明价值' },
    { prop: 'receipt', label: '回单要求(签收原件/无需回单)' },
    { prop: 'remark', label: '运单备注' }
  ]

  const sampleData = [
    {
      startGroup: '总部',
      destCity: '长沙市',
      destGroup: '长沙分部',
      deliveryType: '送货上门',
      payType: '现付',
      shipper: '广州数码电器厂',
      shipPhone: '13822119988',
      shipUnit: '数码电器有限公司',
      shipAddress: '广州市白云区太和物流园A区18号',
      receiver: '湖南湘通商贸',
      receivePhone: '13973112233',
      receiveUnit: '湘通商贸发展部',
      receiveAddress: '长沙市雨花区高桥大市场西大门8号',
      goodsName: '变频空调内机',
      pack: '纸箱',
      numberCount: 20,
      weightCount: 650,
      volumeCount: 4.8,
      freight: 1200,
      fDelivery: 100,
      fCollect: 3500,
      worth: 30000,
      receipt: '签回单原件',
      remark: '轻放勿压'
    },
    {
      startGroup: '总部',
      destCity: '武汉市',
      destGroup: '武汉分部',
      deliveryType: '网点自提',
      payType: '提付',
      shipper: '佛山五金建材厂',
      shipPhone: '13700112233',
      shipUnit: '佛山建材实业',
      shipAddress: '佛山市南海区大沥工业区',
      receiver: '武汉汉口机电配件部',
      receivePhone: '13688992211',
      receiveUnit: '汉口机电',
      receiveAddress: '武汉市硚口区舵落口大市场',
      goodsName: '高强度紧固件',
      pack: '木托',
      numberCount: 15,
      weightCount: 1200,
      volumeCount: 2.2,
      freight: 1450,
      fDelivery: 0,
      fCollect: 0,
      worth: 15000,
      receipt: '无需回单',
      remark: '自提货物，到货短信通知'
    }
  ]

  exportTableToCsv('星云TMS运单批量导入标准模板', sampleData, templateHeaders)
}

/**
 * 真实下载《星云TMS干线配载计划批量导入模板.csv》
 */
export function downloadTranslistImportTemplate() {
  const templateHeaders = [
    { prop: 'transportNo', label: '发车批次*' },
    { prop: 'contractNo', label: '合同编号' },
    { prop: 'startGroup', label: '始发网点*' },
    { prop: 'destGroup', label: '终端网点*' },
    { prop: 'supplierName', label: '承运公司' },
    { prop: 'licenseNo', label: '车牌号码*' },
    { prop: 'driverName', label: '随车司机*' },
    { prop: 'driverMobile', label: '司机手机*' },
    { prop: 'shipTime', label: '起运时间' },
    { prop: 'askArriveTime', label: '要求到达时间' },
    { prop: 'fTotal', label: '大车总运费(元)*' },
    { prop: 'fPrepare', label: '预付车费(元)' },
    { prop: 'fArrive', label: '到付车费(元)' },
    { prop: 'fBack', label: '回付车费(元)' },
    { prop: 'fOilCard', label: '油卡金额(元)' },
    { prop: 'routeGroup', label: '途经网点' },
    { prop: 'remark', label: '配载备注' }
  ]

  const sampleData = [
    {
      transportNo: 'GX2610110008',
      contractNo: 'HT-GX-2026101108',
      startGroup: '总部',
      destGroup: '长沙分部',
      supplierName: '广州粤通物流车队',
      licenseNo: '粤A·88910挂',
      driverName: '张建军',
      driverMobile: '13822119933',
      shipTime: '2026-10-11 12:00:00',
      askArriveTime: '2026-10-12 08:00:00',
      fTotal: 3200,
      fPrepare: 1200,
      fArrive: 2000,
      fBack: 0,
      fOilCard: 0,
      routeGroup: '韶关分拨 -> 衡阳营业部',
      remark: '急运大车直达，限时8小时到达'
    },
    {
      transportNo: 'GX2610110009',
      contractNo: 'HT-GX-2026101109',
      startGroup: '总部',
      destGroup: '武汉分部',
      supplierName: '顺达干线集运车队',
      licenseNo: '鄂A·33891挂',
      driverName: '李大鹏',
      driverMobile: '13988220011',
      shipTime: '2026-10-11 14:00:00',
      askArriveTime: '2026-10-12 12:00:00',
      fTotal: 4500,
      fPrepare: 2000,
      fArrive: 2500,
      fBack: 0,
      fOilCard: 200,
      routeGroup: '长沙星沙分拨',
      remark: '京港澳高速干线甩挂运输'
    }
  ]

  exportTableToCsv('星云TMS干线配载计划批量导入模板', sampleData, templateHeaders)
}

/**
 * 下载《星云TMS短途配载计划批量导入模板.csv》
 */
export function downloadStranslistImportTemplate() {
  const templateHeaders = [
    { prop: 'transportNo', label: '短途配载批次号*' },
    { prop: 'contractNo', label: '合同编号' },
    { prop: 'startGroup', label: '始发网点*' },
    { prop: 'destGroup', label: '目的网点*' },
    { prop: 'supplierName', label: '承运车队' },
    { prop: 'licenseNo', label: '车牌号码*' },
    { prop: 'driverName', label: '司机姓名*' },
    { prop: 'driverMobile', label: '司机手机*' },
    { prop: 'shipTime', label: '起运时间' },
    { prop: 'askArriveTime', label: '要求到达时间' },
    { prop: 'fTotal', label: '短途车费' },
    { prop: 'fPrepare', label: '预付车费' },
    { prop: 'fArrive', label: '到付车费' },
    { prop: 'fBack', label: '回付车费' },
    { prop: 'fOilCard', label: '油卡金额' },
    { prop: 'routeGroup', label: '途径网点' },
    { prop: 'remark', label: '备注说明' }
  ]

  const sampleData = [
    {
      transportNo: 'DT2610110005',
      contractNo: 'HT-DT-2026101105',
      startGroup: '佛山分部',
      destGroup: '总部',
      supplierName: '佛山短途接驳车队',
      licenseNo: '粤E·66120',
      driverName: '周志强',
      driverMobile: '13726618890',
      shipTime: '2026-10-11 08:30:00',
      askArriveTime: '2026-10-11 11:30:00',
      fTotal: 450,
      fPrepare: 200,
      fArrive: 250,
      fBack: 0,
      fOilCard: 0,
      routeGroup: '南海营业部',
      remark: '广佛同城短途同城分拨接驳'
    },
    {
      transportNo: 'DT2610110006',
      contractNo: 'HT-DT-2026101106',
      startGroup: '总部',
      destGroup: '黄埔分部',
      supplierName: '广州同城车队',
      licenseNo: '粤A·33219',
      driverName: '黄立军',
      driverMobile: '13602881177',
      shipTime: '2026-10-11 09:30:00',
      askArriveTime: '2026-10-11 12:00:00',
      fTotal: 380,
      fPrepare: 150,
      fArrive: 230,
      fBack: 0,
      fOilCard: 0,
      routeGroup: '',
      remark: '市区短途转运'
    }
  ]

  exportTableToCsv('星云TMS短途配载计划批量导入模板', sampleData, templateHeaders)
}


