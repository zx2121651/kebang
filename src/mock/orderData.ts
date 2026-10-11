// 科邦智联 TMS 真实订单数据模型（支撑【上游订单 /prevorder】与【订单总表 /operation/order/orderlist】）

export interface OrderGoodsItem {
  id: string
  cargoName: string
  pack: string
  variety: string
  num: number
  weight: number
  volume: number
  unitPrice: number
  /** 0:按重量(kg), 1:按体积(m³), 2:按件数(件), 3:整车包干 */
  priceType: number
  freightFee: number
  barcode: string
}

export interface OrderRecord {
  id: string
  orderNo: string
  /** 1:系统录入, 2:微信小程序, 3:APP客户端, 4:网点端上报, 5:开放平台API(上游订单) */
  source: number
  sourceName: string
  upstreamPlatform: string
  upstreamOrderNo: string
  /** 1:待审核, 2:已审核 */
  auditStatus: 1 | 2
  /** 0:未转运单, 1:已转运单 */
  isShip: 0 | 1
  shipNo: string
  shipId: string
  /** 0:常规订单, 1:加急订单, 2:项目大票 */
  orderType: number
  /** 0:送货上门, 1:网点自提, 2:专车直送 */
  deliverType: number
  sendCompanyName: string
  sendAreaName: string
  endAreaName: string
  destName: string
  cargoName: string
  pack: string
  num: number
  weight: number
  volume: number
  unitPrice: number
  priceType: number
  goodsList: OrderGoodsItem[]
  totalFee: number
  freightFee: number
  payNow: number
  payArrived: number
  payReceipt: number
  payMonthly: number
  payDeduction: number
  deliveryFee: number
  pickupFee: number
  upstairFee: number
  handlingFee: number
  forkliftFee: number
  customsFee: number
  otherFee: number
  otherFeeNote: string
  declareValue: number
  insuranceFee: number
  collectionMoney: number
  collectionFee: number
  taxFee: number
  rebateFee: number
  /** 0:无需回单, 1:回单原件, 2:电子回单, 3:传真回单 */
  receiptFlag: number
  receiptRequirement: string
  receiptNum: number
  receiptNo: string
  consignorUnit: string
  consignorName: string
  consignorMobile: string
  consignorAddress: string
  consigneeUnit: string
  consigneeName: string
  consigneeMobile: string
  consigneeAddress: string
  pickupDriver: string
  pickupDriverPhone: string
  pickupTruckNo: string
  salesman: string
  remark: string
  createByName: string
  createTime: string
  consignDate: string
  auditByName: string
  auditTime: string
}

export const BRANCH_LIST = [
  '广州白云总部',
  '佛山顺德分拨',
  '深圳宝安网点',
  '东莞虎门分拨',
  '中山古镇网点',
  '长沙高桥分拨',
  '武汉东西湖网点',
  '成都传化分拨'
]

export const DEST_CITY_LIST = [
  '北京',
  '上海',
  '长沙',
  '武汉',
  '成都',
  '重庆',
  '杭州',
  '南京',
  '西安',
  '昆明',
  '南宁',
  '郑州',
  '南昌',
  '合肥'
]

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-20261010-001',
    orderNo: 'DD20261010001',
    source: 5,
    sourceName: '开放平台API',
    upstreamPlatform: '美的集团智能供应链OMS',
    upstreamOrderNo: 'MD-OMS-20261010881',
    auditStatus: 1,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 1,
    deliverType: 0,
    sendCompanyName: '佛山顺德分拨',
    sendAreaName: '佛山',
    endAreaName: '长沙',
    destName: '长沙高桥分拨',
    cargoName: '美的变频空调室内机 / 室外机组件',
    pack: '纸箱',
    num: 80,
    weight: 2450,
    volume: 18.6,
    unitPrice: 120,
    priceType: 1,
    goodsList: [
      {
        id: 'G-101',
        cargoName: '美的变频空调室内机',
        pack: '纸箱',
        variety: 'KFR-35GW/N8XHC1',
        num: 40,
        weight: 650,
        volume: 6.6,
        unitPrice: 100,
        priceType: 1,
        freightFee: 660,
        barcode: '6939962788101'
      },
      {
        id: 'G-102',
        cargoName: '美的变频空调室外机组件',
        pack: '木架',
        variety: 'KFR-35W-BP3N1',
        num: 40,
        weight: 1800,
        volume: 12.0,
        unitPrice: 130,
        priceType: 1,
        freightFee: 1560,
        barcode: '6939962788102'
      }
    ],
    totalFee: 2550,
    freightFee: 2220,
    payNow: 0,
    payArrived: 0,
    payReceipt: 0,
    payMonthly: 2550,
    payDeduction: 0,
    deliveryFee: 200,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 80,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 160000,
    insuranceFee: 50,
    collectionMoney: 0,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 1,
    receiptRequirement: '签字加盖收货专用章',
    receiptNum: 2,
    receiptNo: 'HD20261010001',
    consignorUnit: '美的集团股份有限公司家用空调事业部',
    consignorName: '周建宏',
    consignorMobile: '13800138661',
    consignorAddress: '广东省佛山市顺德区北滘镇美的大道6号智能制造物流园B区3号仓',
    consigneeUnit: '湖南苏宁易购家电销售有限公司长沙中心仓',
    consigneeName: '彭志远',
    consigneeMobile: '13973118899',
    consigneeAddress: '湖南省长沙市雨花区高桥大市场现代商贸城家电物流区8栋1-5号',
    pickupDriver: '梁国良',
    pickupDriverPhone: '13726658811',
    pickupTruckNo: '粤E·67128',
    salesman: '陈静',
    remark: '【上游OMS直连】需提前2小时预约入仓号，严禁倒置踩踏',
    createByName: 'EDI接口网关',
    createTime: '2026-10-10 08:42:15',
    consignDate: '2026-10-10 08:40:00',
    auditByName: '',
    auditTime: ''
  },
  {
    id: 'ORD-20261010-002',
    orderNo: 'DD20261010002',
    source: 5,
    sourceName: '开放平台API',
    upstreamPlatform: '立白集团数字化物流云ERP',
    upstreamOrderNo: 'LB-ERP-20261010329',
    auditStatus: 2,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 0,
    deliverType: 0,
    sendCompanyName: '广州白云总部',
    sendAreaName: '广州',
    endAreaName: '武汉',
    destName: '武汉东西湖网点',
    cargoName: '立白大师香氛洗衣液整托装',
    pack: '托盘',
    num: 120,
    weight: 3600,
    volume: 14.4,
    unitPrice: 0.45,
    priceType: 0,
    goodsList: [
      {
        id: 'G-201',
        cargoName: '立白大师香氛洗衣液整托装',
        pack: '托盘',
        variety: '2kg*6瓶/箱',
        num: 120,
        weight: 3600,
        volume: 14.4,
        unitPrice: 0.45,
        priceType: 0,
        freightFee: 1620,
        barcode: '6920174711228'
      }
    ],
    totalFee: 1850,
    freightFee: 1620,
    payNow: 0,
    payArrived: 0,
    payReceipt: 1850,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 150,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 80,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 48000,
    insuranceFee: 0,
    collectionMoney: 0,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 1,
    receiptRequirement: '商超验收单原件返回',
    receiptNum: 1,
    receiptNo: 'HD20261010002',
    consignorUnit: '广州立白企业集团有限公司',
    consignorName: '陈志强',
    consignorMobile: '13602889912',
    consignorAddress: '广东省广州市番禺区沙头街横江工业区立白中心仓A12月台',
    consigneeUnit: '中百仓储超市有限公司武汉生鲜日化配送中心',
    consigneeName: '刘建军',
    consigneeMobile: '13871005566',
    consigneeAddress: '湖北省武汉市东西湖区走马岭街道革新大道中百物流园3号库',
    pickupDriver: '吴建华',
    pickupDriverPhone: '13533221199',
    pickupTruckNo: '粤A·93510',
    salesman: '张宏伟',
    remark: '带木托盘缠绕膜打托，卸货需提供电动叉车',
    createByName: 'EDI接口网关',
    createTime: '2026-10-10 09:18:40',
    consignDate: '2026-10-10 09:15:00',
    auditByName: '管理员(aadmin)',
    auditTime: '2026-10-10 09:35:12'
  },
  {
    id: 'ORD-20261010-003',
    orderNo: 'DD20261010003',
    source: 5,
    sourceName: '开放平台API',
    upstreamPlatform: '广汽埃安JIS汽车零部件协同平台',
    upstreamOrderNo: 'AION-JIS-20261010512',
    auditStatus: 1,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 1,
    deliverType: 2,
    sendCompanyName: '广州白云总部',
    sendAreaName: '广州',
    endAreaName: '成都',
    destName: '成都传化分拨',
    cargoName: '新能源汽车铝合金副车架总成',
    pack: '木箱',
    num: 24,
    weight: 1680,
    volume: 11.2,
    unitPrice: 125,
    priceType: 2,
    goodsList: [
      {
        id: 'G-301',
        cargoName: '新能源汽车铝合金副车架总成',
        pack: '木箱',
        variety: 'AION-Y-SUBFRAME-V2',
        num: 24,
        weight: 1680,
        volume: 11.2,
        unitPrice: 125,
        priceType: 2,
        freightFee: 3000,
        barcode: 'AION882910024'
      }
    ],
    totalFee: 3320,
    freightFee: 3000,
    payNow: 0,
    payArrived: 0,
    payReceipt: 0,
    payMonthly: 3320,
    payDeduction: 0,
    deliveryFee: 200,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 240000,
    insuranceFee: 120,
    collectionMoney: 0,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 2,
    receiptRequirement: '高拍仪电子回单上传',
    receiptNum: 1,
    receiptNo: 'HD20261010003',
    consignorUnit: '广汽埃安新能源汽车股份有限公司',
    consignorName: '刘伟铭',
    consignorMobile: '13570223344',
    consignorAddress: '广东省广州市番禺区化龙镇金山大道东668号埃安总装零件库',
    consigneeUnit: '广汽埃安西南区域售后备件中心库',
    consigneeName: '赵国强',
    consigneeMobile: '13980887766',
    consigneeAddress: '四川省成都市龙泉驿区成龙大道三段汽车城物流中心B区6号',
    pickupDriver: '何大勇',
    pickupDriverPhone: '13922778899',
    pickupTruckNo: '粤A·D8812',
    salesman: '陈静',
    remark: '【JIT急件】汽车精密铝件，严禁碰撞受潮，限48小时内直达成都',
    createByName: 'EDI接口网关',
    createTime: '2026-10-10 10:05:22',
    consignDate: '2026-10-10 10:00:00',
    auditByName: '',
    auditTime: ''
  },
  {
    id: 'ORD-20261010-004',
    orderNo: 'DD20261010004',
    source: 5,
    sourceName: '开放平台API',
    upstreamPlatform: '菜鸟大件家装供应链奇门接口',
    upstreamOrderNo: 'CN-QM-20261009910',
    auditStatus: 2,
    isShip: 1,
    shipNo: 'KB202610090881',
    shipId: 'WB-20261009-881',
    orderType: 0,
    deliverType: 0,
    sendCompanyName: '佛山顺德分拨',
    sendAreaName: '佛山',
    endAreaName: '杭州',
    destName: '杭州传化网点',
    cargoName: '意式极简真皮转角沙发 + 岩板茶几',
    pack: '木架',
    num: 6,
    weight: 420,
    volume: 5.8,
    unitPrice: 180,
    priceType: 1,
    goodsList: [
      {
        id: 'G-401',
        cargoName: '意式极简真皮转角沙发',
        pack: '木架',
        variety: '3.6米左贵妃位',
        num: 4,
        weight: 280,
        volume: 4.5,
        unitPrice: 180,
        priceType: 1,
        freightFee: 810,
        barcode: 'CN992018821'
      },
      {
        id: 'G-402',
        cargoName: '进口亮光雪山石岩板茶几',
        pack: '木箱',
        variety: '1400*800*420mm',
        num: 2,
        weight: 140,
        volume: 1.3,
        unitPrice: 200,
        priceType: 1,
        freightFee: 260,
        barcode: 'CN992018822'
      }
    ],
    totalFee: 1350,
    freightFee: 1070,
    payNow: 1350,
    payArrived: 0,
    payReceipt: 0,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 150,
    pickupFee: 0,
    upstairFee: 100,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 30000,
    insuranceFee: 30,
    collectionMoney: 0,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 2,
    receiptRequirement: '签收拍照回传奇门接口',
    receiptNum: 1,
    receiptNo: 'HD20261009088',
    consignorUnit: '佛山市林氏木业家居电子商务有限公司',
    consignorName: '林佳琪',
    consignorMobile: '13928226600',
    consignorAddress: '广东省佛山市南海区九江镇沙头工业园林氏木业中心仓',
    consigneeUnit: '杭州滨江区江南大道星耀城家居体验馆',
    consigneeName: '沈佳妮',
    consigneeMobile: '13757119988',
    consigneeAddress: '浙江省杭州市滨江区江南大道228号星耀城二期3楼308室',
    pickupDriver: '冯国强',
    pickupDriverPhone: '13825567788',
    pickupTruckNo: '粤E·33910',
    salesman: '张宏伟',
    remark: '包送货上楼入户，大理石岩板小心轻放',
    createByName: '奇门网关',
    createTime: '2026-10-09 16:20:05',
    consignDate: '2026-10-09 16:00:00',
    auditByName: '管理员(aadmin)',
    auditTime: '2026-10-09 16:45:10'
  },
  {
    id: 'ORD-20261010-005',
    orderNo: 'DD20261010005',
    source: 2,
    sourceName: '微信小程序',
    upstreamPlatform: '科邦智联微信寄件小程序',
    upstreamOrderNo: 'WX-MINI-20261010112',
    auditStatus: 1,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 0,
    deliverType: 0,
    sendCompanyName: '深圳宝安网点',
    sendAreaName: '深圳',
    endAreaName: '上海',
    destName: '上海青浦分拨',
    cargoName: '工业级无人机航拍云台及锂电模组',
    pack: '纸箱',
    num: 15,
    weight: 185,
    volume: 1.2,
    unitPrice: 40,
    priceType: 2,
    goodsList: [
      {
        id: 'G-501',
        cargoName: '工业级无人机航拍云台及锂电模组',
        pack: '纸箱',
        variety: '防震航空箱内胆',
        num: 15,
        weight: 185,
        volume: 1.2,
        unitPrice: 40,
        priceType: 2,
        freightFee: 600,
        barcode: 'SZ-DJI-99201'
      }
    ],
    totalFee: 780,
    freightFee: 600,
    payNow: 780,
    payArrived: 0,
    payReceipt: 0,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 80,
    pickupFee: 60,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 80000,
    insuranceFee: 40,
    collectionMoney: 15000,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 1,
    receiptRequirement: '签字盖章原件返回',
    receiptNum: 1,
    receiptNo: 'HD20261010005',
    consignorUnit: '深圳市智航创新智能装备有限公司',
    consignorName: '王鹏飞',
    consignorMobile: '13510889900',
    consignorAddress: '广东省深圳市宝安区石岩街道创维创新谷5栋B座8楼',
    consigneeUnit: '上海张江高科智能测绘技术研究院',
    consigneeName: '陆振华',
    consigneeMobile: '13916002233',
    consigneeAddress: '上海市浦东新区祖冲之路887号张江集电港科技园2号楼',
    pickupDriver: '邓志平',
    pickupDriverPhone: '13688990011',
    pickupTruckNo: '粤B·77120',
    salesman: '李明',
    remark: '带15000元代收货款，见款放货',
    createByName: '微信客户自助',
    createTime: '2026-10-10 11:12:08',
    consignDate: '2026-10-10 11:10:00',
    auditByName: '',
    auditTime: ''
  },
  {
    id: 'ORD-20261010-006',
    orderNo: 'DD20261010006',
    source: 1,
    sourceName: '系统录入',
    upstreamPlatform: 'PC端网点客服自建',
    upstreamOrderNo: 'PC-20261010006',
    auditStatus: 2,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 2,
    deliverType: 1,
    sendCompanyName: '东莞虎门分拨',
    sendAreaName: '东莞',
    endAreaName: '北京',
    destName: '北京大兴分拨',
    cargoName: '秋冬品牌针织服装标准大包',
    pack: '编织袋',
    num: 150,
    weight: 3200,
    volume: 16.5,
    unitPrice: 12,
    priceType: 2,
    goodsList: [
      {
        id: 'G-601',
        cargoName: '秋冬品牌针织服装标准大包',
        pack: '编织袋',
        variety: '防水加厚打包袋',
        num: 150,
        weight: 3200,
        volume: 16.5,
        unitPrice: 12,
        priceType: 2,
        freightFee: 1800,
        barcode: 'DG-HM-202606'
      }
    ],
    totalFee: 1800,
    freightFee: 1800,
    payNow: 0,
    payArrived: 1800,
    payReceipt: 0,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 0,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 60000,
    insuranceFee: 0,
    collectionMoney: 28000,
    collectionFee: 0,
    taxFee: 0,
    rebateFee: 60,
    receiptFlag: 0,
    receiptRequirement: '无需回单',
    receiptNum: 0,
    receiptNo: '',
    consignorUnit: '东莞市虎门富民时装城宏达服饰商行',
    consignorName: '蔡金龙',
    consignorMobile: '13790112233',
    consignorAddress: '广东省东莞市虎门镇银龙路富民服装商务中心C区18档',
    consigneeUnit: '北京大红门新世纪服装商贸城',
    consigneeName: '孙国栋',
    consigneeMobile: '13810556677',
    consigneeAddress: '北京市大兴区西红门镇京开高速东侧新世纪服装物流园',
    pickupDriver: '陈强',
    pickupDriverPhone: '13620001122',
    pickupTruckNo: '粤S·55192',
    salesman: '王芳',
    remark: '大兴网点自提，防水防钩破',
    createByName: '客服林梅',
    createTime: '2026-10-10 11:45:30',
    consignDate: '2026-10-10 11:40:00',
    auditByName: '管理员(aadmin)',
    auditTime: '2026-10-10 12:00:15'
  },
  {
    id: 'ORD-20261011-007',
    orderNo: 'DD20261011007',
    source: 5,
    sourceName: '星云企业互联',
    upstreamPlatform: '星云企业互联 · 湖北大道物流',
    upstreamOrderNo: 'XY-IC-20261011009',
    auditStatus: 1,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 1,
    deliverType: 0,
    sendCompanyName: '广州白云总部',
    sendAreaName: '广州',
    endAreaName: '长沙',
    destName: '长沙高桥分拨',
    cargoName: '精密数控机床伺服电机与减速箱套件',
    pack: '木箱',
    num: 18,
    weight: 1960,
    volume: 6.4,
    unitPrice: 0.85,
    priceType: 0,
    goodsList: [
      {
        id: 'G-701',
        cargoName: '精密数控机床伺服电机与减速箱套件',
        pack: '木箱',
        variety: 'SV-750W-PRO',
        num: 18,
        weight: 1960,
        volume: 6.4,
        unitPrice: 0.85,
        priceType: 0,
        freightFee: 1666,
        barcode: 'XYIC20261011009'
      }
    ],
    totalFee: 1926,
    freightFee: 1666,
    payNow: 0,
    payArrived: 1926,
    payReceipt: 0,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 180,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 80000,
    insuranceFee: 80,
    collectionMoney: 12000,
    collectionFee: 24,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 1,
    receiptRequirement: '回单原件签章返回上游',
    receiptNum: 1,
    receiptNo: 'HD20261011007',
    consignorUnit: '湖北大道物流广州石井联运中心',
    consignorName: '郑国强',
    consignorMobile: '13826109988',
    consignorAddress: '广东省广州市白云区石井大道安发货运市场B栋12档',
    consigneeUnit: '三一重工长沙星沙智能制造产业园',
    consigneeName: '罗建民',
    consigneeMobile: '13974886611',
    consigneeAddress: '湖南省长沙市长沙县星沙三一路1号三一工业城6号备件仓',
    pickupDriver: '',
    pickupDriverPhone: '',
    pickupTruckNo: '',
    salesman: '陈静',
    remark: '【企业互联自动推单】上游网点已装车交接，请核对件数后转入正式运单',
    createByName: '企业互联引擎',
    createTime: '2026-10-11 08:25:10',
    consignDate: '2026-10-11 08:20:00',
    auditByName: '',
    auditTime: ''
  },
  {
    id: 'ORD-20261011-008',
    orderNo: 'DD20261011008',
    source: 5,
    sourceName: '开放平台API',
    upstreamPlatform: '京东大件家居开放平台EDI',
    upstreamOrderNo: 'JD-EDI-20261011066',
    auditStatus: 2,
    isShip: 0,
    shipNo: '',
    shipId: '',
    orderType: 0,
    deliverType: 0,
    sendCompanyName: '佛山顺德分拨',
    sendAreaName: '佛山',
    endAreaName: '武汉',
    destName: '武汉东西湖网点',
    cargoName: '恒洁智能一体卫浴马桶 + 浴室柜套装',
    pack: '木架',
    num: 32,
    weight: 1480,
    volume: 12.8,
    unitPrice: 150,
    priceType: 1,
    goodsList: [
      {
        id: 'G-801',
        cargoName: '恒洁智能一体卫浴马桶 + 浴室柜套装',
        pack: '木架',
        variety: 'HCE-900A智能款',
        num: 32,
        weight: 1480,
        volume: 12.8,
        unitPrice: 150,
        priceType: 1,
        freightFee: 1920,
        barcode: 'JD20261011066'
      }
    ],
    totalFee: 2220,
    freightFee: 1920,
    payNow: 2220,
    payArrived: 0,
    payReceipt: 0,
    payMonthly: 0,
    payDeduction: 0,
    deliveryFee: 240,
    pickupFee: 0,
    upstairFee: 0,
    handlingFee: 0,
    forkliftFee: 0,
    customsFee: 0,
    otherFee: 0,
    otherFeeNote: '',
    declareValue: 60000,
    insuranceFee: 60,
    collectionMoney: 18000,
    collectionFee: 36,
    taxFee: 0,
    rebateFee: 0,
    receiptFlag: 2,
    receiptRequirement: '电子回单回传京东EDI',
    receiptNum: 1,
    receiptNo: 'HD20261011008',
    consignorUnit: '广东恒洁卫浴有限公司佛山三水总仓',
    consignorName: '谢文东',
    consignorMobile: '13928507766',
    consignorAddress: '广东省佛山市三水区乐平镇三水工业园区恒洁物流基地',
    consigneeUnit: '京东居家武汉汉口北直营体验中心',
    consigneeName: '胡敏华',
    consigneeMobile: '13871223344',
    consigneeAddress: '湖北省武汉市黄陂区汉口北大道88号建材大世界D区12号',
    pickupDriver: '刘大柱',
    pickupDriverPhone: '13822119988',
    pickupTruckNo: '粤A·99681挂',
    salesman: '张宏伟',
    remark: '陶瓷卫浴打木架，严禁重压，含代收货款18000元',
    createByName: '京东EDI网关',
    createTime: '2026-10-11 09:12:45',
    consignDate: '2026-10-11 09:10:00',
    auditByName: '管理员(aadmin)',
    auditTime: '2026-10-11 09:20:00'
  }
]

export interface GbColumnConfig {
  sort: number
  align: 'left' | 'center' | 'right'
  field: string
  title: string
  width: number
  sortable?: boolean
  params: {
    isShow: 0 | 1
    columnType: number
    isFixed: '' | 'left' | 'right' | null
    groupKey: string | null
    groupTitle: string | null
    groupSort: number
    isTotal?: boolean
    isLink?: boolean
  }
}

// 1:1 线上原版 60 列完整表头定义 (来自 GetTableColumnInfo?MenuId=938e539f-eae8-11ec-8634-18c04d580c33&Route=orderlist)
export const ORDERLIST_60_COLUMNS: GbColumnConfig[] = [
  { sort: 1, align: 'left', field: 'orderNo', title: '订单号', width: 120, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isLink: true } },
  { sort: 2, align: 'left', field: 'auditStatusStr', title: '状态', width: 85, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 3, align: 'left', field: 'goodsNo', title: '货号', width: 105, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 4, align: 'left', field: 'isShipStr', title: '导入运单', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 5, align: 'left', field: 'startGroup', title: '始发网点', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 6, align: 'left', field: 'destGroup', title: '终端网点', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 7, align: 'left', field: 'destCity', title: '目的地', width: 80, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 8, align: 'left', field: 'shippingDate', title: '托运日期', width: 135, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 9, align: 'left', field: 'orderTypeStr', title: '运单类型', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 10, align: 'left', field: 'openGroup', title: '开单网点', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 11, align: 'left', field: 'sourceStr', title: '运单来源', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 12, align: 'left', field: 'shipper', title: '发货人', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 13, align: 'left', field: 'shipUnit', title: '发货单位', width: 110, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 14, align: 'left', field: 'shipPhone', title: '发货人手机', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 15, align: 'left', field: 'shipTel', title: '发货人电话', width: 90, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 16, align: 'left', field: 'shipIdCard', title: '发货人证件', width: 90, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 17, align: 'left', field: 'shipAreas', title: '发货人区域', width: 120, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 18, align: 'left', field: 'shipAddress', title: '发货人地址', width: 140, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 19, align: 'left', field: 'receiver', title: '收货人', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 20, align: 'left', field: 'receiveUnit', title: '收货单位', width: 110, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 21, align: 'left', field: 'receivePhone', title: '收货人手机', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 22, align: 'left', field: 'receiveTel', title: '收货人电话', width: 90, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 23, align: 'left', field: 'receiveIdCard', title: '收货人证件', width: 90, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 24, align: 'left', field: 'receiveAreas', title: '收货人区域', width: 120, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 25, align: 'left', field: 'receiveAddress', title: '收货人地址', width: 140, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 26, align: 'left', field: 'distance', title: '里程/km', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 27, align: 'left', field: 'creationTime', title: '开单日期', width: 135, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 28, align: 'left', field: 'goodsName', title: '总品名', width: 110, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 29, align: 'left', field: 'pack', title: '总包装', width: 85, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 30, align: 'left', field: 'model', title: '总型号', width: 95, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 31, align: 'left', field: 'number', title: '件数', width: 65, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 32, align: 'left', field: 'weight', title: '重量', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 33, align: 'left', field: 'volume', title: '体积', width: 65, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 34, align: 'left', field: 'worth', title: '价值', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 35, align: 'left', field: 'fTotal', title: '总金额', width: 80, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 36, align: 'left', field: 'freight', title: '基本运费', width: 80, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 37, align: 'left', field: 'fCash', title: '现付', width: 75, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 38, align: 'left', field: 'fDeliver', title: '提付', width: 75, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 39, align: 'left', field: 'fReceipt', title: '回单付', width: 75, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 40, align: 'left', field: 'fMonth', title: '月结', width: 75, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 41, align: 'left', field: 'fDeduct', title: '货款扣', width: 75, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 42, align: 'left', field: 'fCollect', title: '代收货款', width: 80, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 43, align: 'left', field: 'fcService', title: '货款手续费', width: 85, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 44, align: 'left', field: 'fReceive', title: '接货费', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 45, align: 'left', field: 'fDelivery', title: '送货费', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 46, align: 'left', field: 'fPremium', title: '保险费', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 47, align: 'left', field: 'fAdvance', title: '垫付中转费', width: 85, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 48, align: 'left', field: 'fReturn', title: '返款', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 49, align: 'left', field: 'isReturnStr', title: '是否已返', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 50, align: 'left', field: 'fDeliveryCost', title: '接货成本', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 51, align: 'left', field: 'taxRate', title: '税率', width: 65, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 52, align: 'left', field: 'taxes', title: '税金', width: 70, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isTotal: true } },
  { sort: 53, align: 'left', field: 'deliveryType', title: '交货方式', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 54, align: 'left', field: 'shippingType', title: '运输方式', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 55, align: 'left', field: 'onlinePayStatusStr', title: '支付状态', width: 75, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 56, align: 'left', field: 'isWaitPassStr', title: '等通知放货', width: 85, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 57, align: 'left', field: 'creator', title: '开单人', width: 85, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 58, align: 'left', field: 'salesMan', title: '业务员', width: 80, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 59, align: 'left', field: 'modifier', title: '修改人', width: 80, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 60, align: 'left', field: 'lastModificationTime', title: '修改时间', width: 135, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } }
]

// 上游订单专属增强列定义 (在 60 列基础上前置展示上游平台、上游原单号、转入运单号、派车提货状态)
export const PREVORDER_COLUMNS: GbColumnConfig[] = [
  { sort: 1, align: 'left', field: 'orderNo', title: '订单号', width: 120, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isLink: true } },
  { sort: 2, align: 'left', field: 'upstreamPlatform', title: '上游来源平台', width: 165, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 3, align: 'left', field: 'upstreamOrderNo', title: '上游原单号', width: 145, sortable: true, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 4, align: 'left', field: 'auditStatusStr', title: '状态', width: 80, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 5, align: 'left', field: 'isShipStr', title: '导入运单', width: 90, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  { sort: 6, align: 'left', field: 'shipNo', title: '关联运单号', width: 120, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0, isLink: true } },
  { sort: 7, align: 'left', field: 'pickupStatusStr', title: '提货派车', width: 125, params: { isShow: 1, columnType: 0, isFixed: null, groupKey: null, groupTitle: null, groupSort: 0 } },
  ...ORDERLIST_60_COLUMNS.filter(c => !['orderNo', 'auditStatusStr', 'isShipStr'].includes(c.field)).map((c, idx) => ({
    ...c,
    sort: idx + 8
  }))
]

// 1:1 线上原版高级筛选项配置 (来自 GetTableColumnInfo properties search=1)
export const ORDERLIST_FILTER_ITEMS = [
  { field: 'orderNo', title: '订单号', type: 1 },
  { field: 'upstreamPlatform', title: '上游来源平台', type: 1 },
  { field: 'upstreamOrderNo', title: '上游原单号', type: 1 },
  { field: 'auditStatusStr', title: '状态', type: 1, sType: 1, selectArr: [{ label: '未审核', value: '未审核' }, { label: '已审核', value: '已审核' }, { label: '已驳回', value: '已驳回' }] },
  { field: 'goodsNo', title: '货号', type: 1 },
  { field: 'destCity', title: '目的地', type: 1 },
  { field: 'openGroup', title: '开单网点', type: 1, sType: 1, selectArr: BRANCH_LIST.map(b => ({ label: b, value: b })) },
  { field: 'shipper', title: '发货人', type: 1 },
  { field: 'shipPhone', title: '发货人手机', type: 1 },
  { field: 'shipTel', title: '发货人电话', type: 1 },
  { field: 'shipIdCard', title: '发货人证件', type: 1 },
  { field: 'receiver', title: '收货人', type: 1 },
  { field: 'receivePhone', title: '收货人手机', type: 1 },
  { field: 'receiveTel', title: '收货人电话', type: 1 },
  { field: 'receiveIdCard', title: '收货人证件', type: 1 },
  { field: 'deliveryType', title: '交货方式', type: 1, sType: 1, selectArr: [{ label: '自提', value: '自提' }, { label: '送货', value: '送货' }, { label: '送货上楼', value: '送货上楼' }, { label: '送货卸货', value: '送货卸货' }] },
  { field: 'shippingType', title: '运输方式', type: 1, sType: 1, selectArr: [{ label: '普通汽运', value: '普通汽运' }, { label: '专线快运', value: '专线快运' }, { label: '整车直达', value: '整车直达' }, { label: '零担拼车', value: '零担拼车' }] },
  { field: 'onlinePayStatusStr', title: '支付状态', type: 1, sType: 1, selectArr: [{ label: '未支付', value: '未支付' }, { label: '已支付', value: '已支付' }] },
  { field: 'creator', title: '开单人', type: 1 },
  { field: 'salesMan', title: '业务员', width: 80, type: 1 },
  { field: 'modifier', title: '修改人', type: 1 }
]

// 始发网点树结构 (对应原版 downTree 组件)
export const NETWORK_TREE_LIST = [
  {
    id: 'hq',
    name: '总部',
    groupType: 1,
    svgIcon: 'icon-folderOpen',
    childs: BRANCH_LIST.map((name, i) => ({
      id: `net-${i + 1}`,
      name,
      groupType: 2,
      svgIcon: 'icon-wenjianjia',
      childs: []
    }))
  }
]

// 发货方/收货方智能联想档案库 (支撑 custorder 发货方/收货方弹窗选择)
export const CUSTOMER_SHIPPER_ARCHIVES = [
  { id: 'S-01', name: '林建宏', phone: '13802889120', tel: '020-86219901', unit: '广东美的制冷设备有限公司', idCard: '440106198506123319', province: '广东省', city: '广州市', area: '白云区', address: '石井大道大冈物流园A栋108档', goodsName: '变频分体空调室内外机套件', pack: '纸箱' },
  { id: 'S-02', name: '张文博', phone: '13922114588', tel: '0757-28901122', unit: '佛山市顺德区林氏家居电子商务有限公司', idCard: '440606198811204152', province: '广东省', city: '佛山市', area: '顺德区', address: '龙江镇325国道家具产业园C区12仓', goodsName: '北欧实木岩板餐桌椅组合', pack: '木架' },
  { id: 'S-03', name: '梁志强', phone: '13580129980', tel: '0760-22348899', unit: '中山市欧普照明股份有限公司', idCard: '442000199003152218', province: '广东省', city: '中山市', area: '古镇镇', address: '东兴东路国际灯饰物流基地8号仓', goodsName: '商用工程LED平板灯具模组', pack: '纸箱' },
  { id: 'S-04', name: '赵明辉', phone: '13609003311', tel: '020-37216688', unit: '广州立白企业集团有限公司', idCard: '44010319830908113X', province: '广东省', city: '广州市', area: '从化区', address: '经济开发区高技术产业园丰盈路19号', goodsName: '浓缩天然洗衣液整托标准装', pack: '托盘' },
  { id: 'S-05', name: '王鹏飞', phone: '13510889900', tel: '0755-26991188', unit: '深圳市智航创新智能装备有限公司', idCard: '440306199207185512', province: '广东省', city: '深圳市', area: '宝安区', address: '石岩街道创维创新谷5栋B座8楼', goodsName: '工业级无人机航拍云台及锂电模组', pack: '纸箱' }
]

export const CUSTOMER_RECEIVER_ARCHIVES = [
  { id: 'R-01', name: '周志明', phone: '13974812033', tel: '0731-84729900', unit: '湖南苏宁易购物流中心五一广场仓', idCard: '430102198604221811', province: '湖南省', city: '长沙市', area: '雨花区', address: '高桥大市场现代商贸城物流园3栋', goodsName: '变频分体空调室内外机套件', pack: '纸箱' },
  { id: 'R-02', name: '刘芳华', phone: '13618663390', tel: '027-83217766', unit: '武汉居然之家武昌徐东家居广场', idCard: '420106198910142527', province: '湖北省', city: '武汉市', area: '洪山区', address: '徐东大街50号居然之家B1层收货部', goodsName: '北欧实木岩板餐桌椅组合', pack: '木架' },
  { id: 'R-03', name: '唐建国', phone: '13880927711', tel: '028-83115522', unit: '成都富森美家居建材城北门总仓', idCard: '510108198212033115', province: '四川省', city: '成都市', area: '成华区', address: '蓉都大道将军碑路富森美建材物流中心', goodsName: '商用工程LED平板灯具模组', pack: '纸箱' },
  { id: 'R-04', name: '何秀英', phone: '13758220019', tel: '0571-88213300', unit: '浙江世纪联华华东供应链集配中心', idCard: '330106199105194022', province: '浙江省', city: '杭州市', area: '钱塘区', address: '下沙街道盛安路88号联华物流园2号月台', goodsName: '浓缩天然洗衣液整托标准装', pack: '托盘' },
  { id: 'R-05', name: '陆振华', phone: '13916002233', tel: '021-50809911', unit: '上海张江高科智能测绘技术研究院', idCard: '310115198708256119', province: '上海市', city: '上海市', area: '浦东新区', address: '祖冲之路887号张江集电港科技园2号楼', goodsName: '工业级无人机航拍云台及锂电模组', pack: '纸箱' }
]

// 将任意 OrderRecord 自动补齐线上原版 60 列属性，保证表格、高级筛选、创建/修改/详情 100% 互通
export function enrichOrderRecord(rec: any): OrderRecord & Record<string, any> {
  const auditStatus = rec.auditStatus ?? 1
  const isShip = rec.isShip ?? 0
  const isRejected = Boolean(rec.isRejected)
  const orderType = rec.orderType ?? 0
  const deliverType = rec.deliverType ?? 0

  const deliveryTypeMap: Record<number, string> = { 0: '送货', 1: '自提', 2: '送货上楼' }
  const orderTypeMap: Record<number, string> = { 0: '常规单', 1: '加急单', 2: '大票直达' }

  const freight = Number(rec.freight ?? rec.freightFee ?? 0)
  const fDelivery = Number(rec.fDelivery ?? rec.deliveryFee ?? 0)
  const fReceive = Number(rec.fReceive ?? rec.pickupFee ?? 0)
  const fPremium = Number(rec.fPremium ?? rec.insuranceFee ?? 0)
  const fCollect = Number(rec.fCollect ?? rec.collectionMoney ?? 0)
  const fcService = Number(rec.fcService ?? rec.collectionFee ?? 0)
  const fAdvance = Number(rec.fAdvance ?? rec.otherFee ?? 0)
  const fReturn = Number(rec.fReturn ?? rec.rebateFee ?? 0)
  const fDeliveryCost = Number(rec.fDeliveryCost ?? rec.handlingFee ?? 0)
  const taxes = Number(rec.taxes ?? rec.taxFee ?? 0)
  const fTotal = Number(rec.fTotal ?? rec.totalFee ?? (freight + fDelivery + fReceive + fPremium))

  const fCash = Number(rec.fCash ?? rec.payNow ?? 0)
  const fDeliver = Number(rec.fDeliver ?? rec.payArrived ?? 0)
  const fReceipt = Number(rec.fReceipt ?? rec.payReceipt ?? 0)
  const fMonth = Number(rec.fMonth ?? rec.payMonthly ?? 0)
  const fDeduct = Number(rec.fDeduct ?? rec.payDeduction ?? 0)

  const shipper = rec.shipper || rec.consignorName || ''
  const shipUnit = rec.shipUnit || rec.consignorUnit || ''
  const shipPhone = rec.shipPhone || rec.consignorMobile || ''
  const shipTel = rec.shipTel || '020-86219901'
  const shipIdCard = rec.shipIdCard || '440106198805123319'
  const shipAreas = rec.shipAreas || rec.ship_address || `广东省-${rec.sendAreaName || '广州'}市-白云区`
  const shipAddress = rec.shipAddress || rec.consignorAddress || ''

  const receiver = rec.receiver || rec.consigneeName || ''
  const receiveUnit = rec.receiveUnit || rec.consigneeUnit || ''
  const receivePhone = rec.receivePhone || rec.consigneeMobile || ''
  const receiveTel = rec.receiveTel || '0731-84729900'
  const receiveIdCard = rec.receiveIdCard || '430102199008152216'
  const receiveAreas = rec.receiveAreas || rec.receive_address || `${rec.endAreaName || '湖南'}省-${rec.endAreaName || '长沙'}市-市辖区`
  const receiveAddress = rec.receiveAddress || rec.consigneeAddress || ''

  const goodsName = rec.goodsName || rec.cargoName || '普货'
  const pack = rec.pack || '纸箱'
  const model = rec.model || (rec.goodsList && rec.goodsList[0]?.variety) || '标准型'
  const number = Number(rec.number ?? rec.num ?? 1)
  const weight = Number(rec.weight ?? 0)
  const volume = Number(rec.volume ?? 0)
  const worth = Number(rec.worth ?? rec.declareValue ?? 0)

  const pickupTruckNo = rec.pickupTruckNo || ''
  const pickupDriver = rec.pickupDriver || ''
  const pickupDriverPhone = rec.pickupDriverPhone || ''
  const pickupStatusStr = isRejected
    ? '已终止'
    : isShip === 1
      ? '已提回转单'
      : pickupTruckNo
        ? `已派车(${pickupTruckNo})`
        : '待派车提货'

  const detailList = Array.isArray(rec.detailList) && rec.detailList.length > 0
    ? rec.detailList
    : (rec.goodsList || [{ cargoName: goodsName, pack, variety: model, num: number, weight, volume, freightFee: freight }]).map((g: any) => ({
        goodsName: g.goodsName || g.cargoName || goodsName,
        pack: g.pack || pack,
        model: g.model || g.variety || model,
        number: Number(g.number ?? g.num ?? number),
        freight: Number(g.freight ?? g.freightFee ?? freight),
        weight: Number(g.weight ?? weight),
        volume: Number(g.volume ?? volume),
        worth: Number(g.worth ?? worth)
      }))

  return {
    ...rec,
    goodsNo: rec.goodsNo || `${(rec.orderNo || 'DD0001').slice(-4)}-${number}`,
    auditStatus,
    isShip,
    isRejected,
    rejectReason: rec.rejectReason || '',
    auditStatusStr: isRejected ? '已驳回' : auditStatus === 2 ? '已审核' : '未审核',
    isShipStr: isRejected ? '已驳回' : isShip === 1 ? '已转运单' : '未转运单',
    shipNo: rec.shipNo || '',
    upstreamPlatform: rec.upstreamPlatform || (rec.source === 5 ? '开放平台API' : 'PC端自建'),
    upstreamOrderNo: rec.upstreamOrderNo || rec.orderNo,
    pickupTruckNo,
    pickupDriver,
    pickupDriverPhone,
    pickupStatusStr,
    startGroup: rec.startGroup || rec.sendCompanyName || '广州白云总部',
    destGroup: rec.destGroup || rec.destName || '长沙高桥分拨',
    destCity: rec.destCity || rec.endAreaName || '长沙',
    shippingDate: rec.shippingDate || rec.consignDate || rec.createTime || '2026-10-10 09:00:00',
    orderTypeStr: rec.orderTypeStr || orderTypeMap[orderType] || '常规单',
    openGroup: rec.openGroup || rec.sendCompanyName || '广州白云总部',
    sourceStr: rec.sourceStr || rec.sourceName || (rec.source === 5 ? '开放平台API' : '系统录入'),
    shipper,
    shipUnit,
    shipPhone,
    shipTel,
    shipIdCard,
    shipAreas,
    ship_address: shipAreas,
    shipAddress,
    receiver,
    receiveUnit,
    receivePhone,
    receiveTel,
    receiveIdCard,
    receiveAreas,
    receive_address: receiveAreas,
    receiveAddress,
    distance: rec.distance ?? 710,
    creationTime: rec.creationTime || rec.createTime || '2026-10-10 09:00:00',
    goodsName,
    pack,
    model,
    number,
    weight,
    volume,
    worth,
    fTotal,
    freight,
    fCash,
    fDeliver,
    fReceipt,
    fMonth,
    fDeduct,
    fCollect,
    fcService,
    fReceive,
    fDelivery,
    fPremium,
    fAdvance,
    fReturn,
    isReturn: rec.isReturn ?? (fReturn > 0 ? '0' : '0'),
    isReturnStr: rec.isReturn === '1' ? '已返' : '未返',
    fDeliveryCost,
    taxRate: rec.taxRate ?? 0,
    taxes,
    payType: rec.payType || (fCash > 0 ? '现付' : fDeliver > 0 ? '提付' : fReceipt > 0 ? '回单付' : fMonth > 0 ? '月结' : fDeduct > 0 ? '货款扣' : '现付'),
    deliveryType: rec.deliveryType || deliveryTypeMap[deliverType] || '送货',
    shippingType: rec.shippingType || '普通汽运',
    receipt: rec.receipt || rec.receiptRequirement || '签回单',
    onlinePayStatusStr: rec.onlinePayStatusStr || (fCash > 0 ? '已支付' : '未支付'),
    isWaitPass: Boolean(rec.isWaitPass),
    isWaitPassStr: rec.isWaitPass ? '是' : '否',
    creator: rec.creator || rec.createByName || 'aadmin',
    salesMan: rec.salesMan || rec.salesman || '陈静',
    modifier: rec.modifier || rec.auditByName || '',
    lastModificationTime: rec.lastModificationTime || rec.auditTime || '',
    detailList,
    // Keep legacy properties synced
    sendCompanyName: rec.startGroup || rec.sendCompanyName || '广州白云总部',
    endAreaName: rec.destCity || rec.endAreaName || '长沙',
    destName: rec.destGroup || rec.destName || '长沙高桥分拨',
    cargoName: goodsName,
    num: number,
    totalFee: fTotal,
    freightFee: freight,
    payNow: fCash,
    payArrived: fDeliver,
    payReceipt: fReceipt,
    payMonthly: fMonth,
    payDeduction: fDeduct,
    deliveryFee: fDelivery,
    pickupFee: fReceive,
    insuranceFee: fPremium,
    collectionMoney: fCollect,
    collectionFee: fcService,
    declareValue: worth,
    rebateFee: fReturn,
    consignorName: shipper,
    consignorUnit: shipUnit,
    consignorMobile: shipPhone,
    consignorAddress: shipAddress,
    consigneeName: receiver,
    consigneeUnit: receiveUnit,
    consigneeMobile: receivePhone,
    consigneeAddress: receiveAddress,
    salesman: rec.salesMan || rec.salesman || '陈静',
    createTime: rec.creationTime || rec.createTime || '2026-10-10 09:00:00',
    consignDate: rec.shippingDate || rec.consignDate || '2026-10-10 09:00:00'
  }
}

