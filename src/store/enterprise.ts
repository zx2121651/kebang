import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface CarFeeRecord {
  id: string
  batchNo: string
  transType: '干线配载' | '短途配载' | '送货上门'
  departDate: string
  startNetwork: string
  endNetwork: string
  plateNo: string
  driverName: string
  driverPhone: string
  totalDriverFee: number
  prepayFee: number
  arrivePayFee: number
  oilCardFee: number
  returnPayFee: number
  loadFee: number
  settledAmount: number
  unsettledAmount: number
  auditStatus: '未审核' | '已审核'
  settleStatus: '未结算' | '部分结算' | '已结清'
  remark: string
}

export interface InsureRecord {
  id: string
  policyNo: string
  shipOrderNo: string
  createTime: string
  startNetwork: string
  destCity: string
  shipperName: string
  receiverName: string
  goodsName: string
  num: number
  declaredValue: number
  premiumFee: number
  insureCompany: string
  status: '已生效' | '已理赔' | '已退保'
}

export interface ArApRecord {
  id: string
  billNo: string
  shipOrderNo: string
  direction: '应收' | '应付'
  category: '客户运费' | '承运商中转费' | '大车司机车费' | '网点对账款'
  targetType: 'shipper' | 'receiver' | 'carrier' | 'driver' | 'branch'
  targetName: string
  targetPhone: string
  network: string
  destCity: string
  feeType: string
  payType: string
  totalAmount: number
  settledAmount: number
  unsettledAmount: number
  settleStatus: '未核销' | '部分核销' | '已核销'
  auditStatus: '未审核' | '已审核'
  createTime: string
  goodsName: string
  num: number
  weight: number
  volume: number
}

export interface ReconcileBill {
  id: string
  dzNo: string
  dzType: string
  targetName: string
  targetPhone: string
  billCount: number
  totalAmount: number
  settledAmount: number
  unsettledAmount: number
  status: '待确认' | '已审核' | '已核销'
  creator: string
  createTime: string
  remark: string
}

export interface HandoverBill {
  id: string
  jzdNo: string
  network: string
  handoverPerson: string
  acceptPerson: string
  orderCount: number
  spotIncome: number
  collectPayment: number
  outgoExpense: number
  netHandoverAmount: number
  status: '待交账' | '已接收' | '已审核'
  createTime: string
}

export interface SettlementVoucher {
  id: string
  voucherNo: string
  voucherType: '收款单' | '付款单'
  targetName: string
  feeCategory: string
  amount: number
  payMethod: '银行转账' | '微信支付' | '支付宝' | '现金' | '油卡抵扣'
  fundAccount: string
  bankCardNo: string
  operator: string
  auditStatus: '已审核' | '待审核'
  createTime: string
  remark: string
}

export interface FundAccount {
  id: string
  accountCode: string
  accountName: string
  accountType: '银行账户' | '现金账户' | '第三方支付'
  bankName: string
  cardNo: string
  network: string
  initBalance: number
  periodIncome: number
  periodExpense: number
  currentBalance: number
  status: '启用' | '冻结'
}

export interface GoodsPaymentItem {
  id: string
  shipOrderNo: string
  createTime: string
  startNetwork: string
  endNetwork: string
  destCity: string
  shipperName: string
  shipperMobile: string
  receiverName: string
  receiverMobile: string
  goodsName: string
  num: number
  codAmount: number // 代收货款
  codServiceFee: number // 货款手续费
  deductFreight: number // 货款扣运费
  actualPayAmount: number // 应付客户实发金额
  bankName: string
  bankAccountName: string
  bankCardNo: string
  stage: '未收回' | '已收回' | '已汇出' | '已到账' | '已发放'
  opStatus: '正常' | '已变更' | '已取消'
  recoverTime?: string
  remitTime?: string
  accountTime?: string
  grantTime?: string
  remark: string
}

export interface ReceiptRecord {
  id: string
  shipOrderNo: string
  createTime: string
  startNetwork: string
  endNetwork: string
  destCity: string
  shipperName: string
  shipperMobile: string
  receiverName: string
  receiverMobile: string
  goodsName: string
  num: number
  receiptReq: string
  receiptCount: number
  receiptNo: string
  stage: '未签收' | '已签收' | '已寄回' | '已接收' | '已返厂'
  signer: string
  signTime?: string
  expressCompany?: string
  expressNo?: string
  sendBackTime?: string
  receiveTime?: string
  returnFactoryTime?: string
  remark: string
}

export const useEnterpriseStore = defineStore('kebang_enterprise', () => {
  // ==================== 1. 财务中心数据 ====================
  const insureAccountBalance = ref(12680.0)

  const carFeeList = ref<CarFeeRecord[]>([
    {
      id: 'CF01',
      batchNo: 'GX260410001',
      transType: '干线配载',
      departDate: '2026-04-10 19:30:00',
      startNetwork: '总部',
      endNetwork: '衡阳营业部',
      plateNo: '粤A·99681挂',
      driverName: '刘大柱',
      driverPhone: '13822119988',
      totalDriverFee: 4500,
      prepayFee: 1500,
      arrivePayFee: 2000,
      oilCardFee: 1000,
      returnPayFee: 0,
      loadFee: 300,
      settledAmount: 1500,
      unsettledAmount: 3000,
      auditStatus: '已审核',
      settleStatus: '部分结算',
      remark: '广州发衡阳专线大车'
    },
    {
      id: 'CF02',
      batchNo: 'GX260410002',
      transType: '干线配载',
      departDate: '2026-04-10 21:00:00',
      startNetwork: '总部',
      endNetwork: '长沙分部',
      plateNo: '湘A·77109',
      driverName: '彭建华',
      driverPhone: '13807315522',
      totalDriverFee: 5200,
      prepayFee: 2000,
      arrivePayFee: 2200,
      oilCardFee: 1000,
      returnPayFee: 0,
      loadFee: 350,
      settledAmount: 0,
      unsettledAmount: 5200,
      auditStatus: '未审核',
      settleStatus: '未结算',
      remark: '长沙干线夜班车次'
    },
    {
      id: 'CF03',
      batchNo: 'DB260410001',
      transType: '短途配载',
      departDate: '2026-04-10 14:20:00',
      startNetwork: '总部',
      endNetwork: '佛山分部',
      plateNo: '粤A·51203',
      driverName: '陈小虎',
      driverPhone: '13522331100',
      totalDriverFee: 680,
      prepayFee: 680,
      arrivePayFee: 0,
      oilCardFee: 0,
      returnPayFee: 0,
      loadFee: 80,
      settledAmount: 680,
      unsettledAmount: 0,
      auditStatus: '已审核',
      settleStatus: '已结清',
      remark: '白云至佛山短驳接货'
    },
    {
      id: 'CF04',
      batchNo: 'SH260410003',
      transType: '送货上门',
      departDate: '2026-04-10 09:15:00',
      startNetwork: '衡阳营业部',
      endNetwork: '衡阳营业部',
      plateNo: '粤A·D30928',
      driverName: '黄家辉',
      driverPhone: '13728009911',
      totalDriverFee: 420,
      prepayFee: 0,
      arrivePayFee: 420,
      oilCardFee: 0,
      returnPayFee: 0,
      loadFee: 50,
      settledAmount: 0,
      unsettledAmount: 420,
      auditStatus: '已审核',
      settleStatus: '未结算',
      remark: '市内派送专车'
    }
  ])

  const insureList = ref<InsureRecord[]>([
    {
      id: 'INS01',
      policyNo: 'PAIC2026041088901',
      shipOrderNo: 'KB260410091',
      createTime: '2026-04-10 10:15:22',
      startNetwork: '总部',
      destCity: '衡阳市',
      shipperName: '张伟',
      receiverName: '唐建国',
      goodsName: '精密仪器',
      num: 12,
      declaredValue: 80000,
      premiumFee: 160,
      insureCompany: '中国平安财产保险',
      status: '已生效'
    },
    {
      id: 'INS02',
      policyNo: 'CPIC2026041088902',
      shipOrderNo: 'KB260410092',
      createTime: '2026-04-10 11:32:10',
      startNetwork: '总部',
      destCity: '长沙市',
      shipperName: '刘芳',
      receiverName: '李明',
      goodsName: '数码家电',
      num: 45,
      declaredValue: 120000,
      premiumFee: 240,
      insureCompany: '太平洋货运险',
      status: '已生效'
    },
    {
      id: 'INS03',
      policyNo: 'PAIC2026040977310',
      shipOrderNo: 'KB260409085',
      createTime: '2026-04-09 16:40:05',
      startNetwork: '总部',
      destCity: '武汉市',
      shipperName: '周建军',
      receiverName: '王强',
      goodsName: '电子产品',
      num: 28,
      declaredValue: 50000,
      premiumFee: 100,
      insureCompany: '中国平安财产保险',
      status: '已生效'
    }
  ])

  const arApList = ref<ArApRecord[]>([
    {
      id: 'AR01',
      billNo: 'YS260410001',
      shipOrderNo: 'KB260410091',
      direction: '应收',
      category: '客户运费',
      targetType: 'shipper',
      targetName: '广州宏达商贸有限公司 (张伟)',
      targetPhone: '13800138801',
      network: '总部',
      destCity: '衡阳市',
      feeType: '现付运费',
      payType: '现付',
      totalAmount: 1280,
      settledAmount: 0,
      unsettledAmount: 1280,
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 09:20:00',
      goodsName: '五金建材',
      num: 30,
      weight: 1850,
      volume: 6.5
    },
    {
      id: 'AR02',
      billNo: 'YS260410002',
      shipOrderNo: 'KB260410092',
      direction: '应收',
      category: '客户运费',
      targetType: 'shipper',
      targetName: '佛山美的家电制造厂 (刘芳)',
      targetPhone: '13922334455',
      network: '总部',
      destCity: '长沙市',
      feeType: '月结运费',
      payType: '月结',
      totalAmount: 3650,
      settledAmount: 1000,
      unsettledAmount: 2650,
      settleStatus: '部分核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 10:45:00',
      goodsName: '数码家电',
      num: 60,
      weight: 2400,
      volume: 18.2
    },
    {
      id: 'AR03',
      billNo: 'YS260410003',
      shipOrderNo: 'KB260410093',
      direction: '应收',
      category: '客户运费',
      targetType: 'receiver',
      targetName: '衡阳湘南机电设备经销部 (唐建国)',
      targetPhone: '13807346688',
      network: '衡阳营业部',
      destCity: '衡阳市',
      feeType: '提付运费',
      payType: '提付',
      totalAmount: 960,
      settledAmount: 0,
      unsettledAmount: 960,
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 11:15:00',
      goodsName: '机械配件',
      num: 15,
      weight: 1200,
      volume: 4.0
    },
    {
      id: 'AR04',
      billNo: 'YS260410004',
      shipOrderNo: 'KB260410094',
      direction: '应收',
      category: '客户运费',
      targetType: 'receiver',
      targetName: '长沙星辉商贸集团 (李明)',
      targetPhone: '13907319901',
      network: '长沙分部',
      destCity: '长沙市',
      feeType: '提付运费',
      payType: '提付',
      totalAmount: 1520,
      settledAmount: 1520,
      unsettledAmount: 0,
      settleStatus: '已核销',
      auditStatus: '已审核',
      createTime: '2026-04-09 15:30:00',
      goodsName: '五金建材',
      num: 25,
      weight: 1600,
      volume: 5.8
    },
    {
      id: 'AP01',
      billNo: 'YF260410001',
      shipOrderNo: 'KB260410095',
      direction: '应付',
      category: '承运商中转费',
      targetType: 'carrier',
      targetName: '顺心捷达快运专线',
      targetPhone: '020-86215588',
      network: '总部',
      destCity: '长沙市',
      feeType: '外发中转费',
      payType: '月结',
      totalAmount: 820,
      settledAmount: 0,
      unsettledAmount: 820,
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 13:10:00',
      goodsName: '汽车配件',
      num: 18,
      weight: 950,
      volume: 3.6
    },
    {
      id: 'AP02',
      billNo: 'YF260410002',
      shipOrderNo: 'KB260410096',
      direction: '应付',
      category: '承运商中转费',
      targetType: 'carrier',
      targetName: '安能物流三方专线部',
      targetPhone: '020-86217799',
      network: '总部',
      destCity: '武汉市',
      feeType: '外发中转费',
      payType: '现付',
      totalAmount: 640,
      settledAmount: 0,
      unsettledAmount: 640,
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 14:25:00',
      goodsName: '服装纺织',
      num: 40,
      weight: 680,
      volume: 7.2
    },
    {
      id: 'AP03',
      billNo: 'YF260410003',
      shipOrderNo: 'GX260410001',
      direction: '应付',
      category: '大车司机车费',
      targetType: 'driver',
      targetName: '刘大柱 (粤A·99681挂)',
      targetPhone: '13822119988',
      network: '总部',
      destCity: '衡阳市',
      feeType: '干线大车到付',
      payType: '到付',
      totalAmount: 3000,
      settledAmount: 0,
      unsettledAmount: 3000,
      settleStatus: '未核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 19:30:00',
      goodsName: '整车配载货品',
      num: 185,
      weight: 16500,
      volume: 68.5
    },
    {
      id: 'AR05',
      billNo: 'WD260410001',
      shipOrderNo: 'KB260410091',
      direction: '应收',
      category: '网点对账款',
      targetType: 'branch',
      targetName: '衡阳营业部',
      targetPhone: '0734-8821002',
      network: '总部',
      destCity: '衡阳市',
      feeType: '网点提付上缴款',
      payType: '内部往来',
      totalAmount: 4280,
      settledAmount: 1280,
      unsettledAmount: 3000,
      settleStatus: '部分核销',
      auditStatus: '已审核',
      createTime: '2026-04-10 16:00:00',
      goodsName: '干线分拨汇总',
      num: 120,
      weight: 9800,
      volume: 42.0
    }
  ])

  const reconcileBills = ref<ReconcileBill[]>([
    {
      id: 'DZ01',
      dzNo: 'DZ20260410001',
      dzType: '发货客户对账',
      targetName: '佛山美的家电制造厂 (刘芳)',
      targetPhone: '13922334455',
      billCount: 12,
      totalAmount: 18600,
      settledAmount: 8600,
      unsettledAmount: 10000,
      status: '已审核',
      creator: 'admin',
      createTime: '2026-04-10 10:00:00',
      remark: '4月上旬美的家电月结运费对账单'
    },
    {
      id: 'DZ02',
      dzNo: 'DZ20260410002',
      dzType: '承运商对账',
      targetName: '顺心捷达快运专线',
      targetPhone: '020-86215588',
      billCount: 8,
      totalAmount: 6420,
      settledAmount: 0,
      unsettledAmount: 6420,
      status: '待确认',
      creator: 'admin',
      createTime: '2026-04-10 11:30:00',
      remark: '外发长沙/株洲中转费月度对账'
    },
    {
      id: 'DZ03',
      dzNo: 'DZ20260409005',
      dzType: '网点对账',
      targetName: '衡阳营业部',
      targetPhone: '0734-8821002',
      billCount: 26,
      totalAmount: 32800,
      settledAmount: 32800,
      unsettledAmount: 0,
      status: '已核销',
      creator: '王财务',
      createTime: '2026-04-09 17:20:00',
      remark: '总部与衡阳营业部干线往来结算单'
    }
  ])

  const handoverBills = ref<HandoverBill[]>([
    {
      id: 'JZD01',
      jzdNo: 'JZ20260410001',
      network: '总部',
      handoverPerson: '张经理',
      acceptPerson: '王财务',
      orderCount: 18,
      spotIncome: 12580,
      collectPayment: 6400,
      outgoExpense: 1850,
      netHandoverAmount: 17130,
      status: '已审核',
      createTime: '2026-04-10 17:30:00'
    },
    {
      id: 'JZD02',
      jzdNo: 'JZ20260410002',
      network: '衡阳营业部',
      handoverPerson: '刘成',
      acceptPerson: '王财务',
      orderCount: 14,
      spotIncome: 6820,
      collectPayment: 15200,
      outgoExpense: 920,
      netHandoverAmount: 21100,
      status: '待交账',
      createTime: '2026-04-10 18:05:00'
    }
  ])

  const settlementVouchers = ref<SettlementVoucher[]>([
    {
      id: 'SK01',
      voucherNo: 'SK20260410001',
      voucherType: '收款单',
      targetName: '广州宏达商贸有限公司 (张伟)',
      feeCategory: '现付运费收款',
      amount: 3280,
      payMethod: '微信支付',
      fundAccount: '微信企业收款户',
      bankCardNo: 'WX-MCH-889901',
      operator: 'admin',
      auditStatus: '已审核',
      createTime: '2026-04-10 11:20:00',
      remark: '营业厅扫码现付运费'
    },
    {
      id: 'SK02',
      voucherNo: 'SK20260410002',
      voucherType: '收款单',
      targetName: '佛山美的家电制造厂 (刘芳)',
      feeCategory: '月结对账收款',
      amount: 8600,
      payMethod: '银行转账',
      fundAccount: '工商银行广州白云基本户',
      bankCardNo: '6222023602018888999',
      operator: '王财务',
      auditStatus: '已审核',
      createTime: '2026-04-10 14:10:00',
      remark: '美的家电对账单部分回款'
    },
    {
      id: 'FK01',
      voucherNo: 'FK20260410001',
      voucherType: '付款单',
      targetName: '刘大柱 (粤A·99681挂)',
      feeCategory: '干线大车预付车费',
      amount: 1500,
      payMethod: '银行转账',
      fundAccount: '建设银行广州物流结算户',
      bankCardNo: '6217003320018899102',
      operator: '王财务',
      auditStatus: '已审核',
      createTime: '2026-04-10 19:35:00',
      remark: 'GX260410001发车预付'
    },
    {
      id: 'FK02',
      voucherNo: 'FK20260410002',
      voucherType: '付款单',
      targetName: '陈小虎 (粤A·51203)',
      feeCategory: '短驳车费结算',
      amount: 680,
      payMethod: '现金',
      fundAccount: '总部营业厅现金柜',
      bankCardNo: '-',
      operator: 'admin',
      auditStatus: '已审核',
      createTime: '2026-04-10 15:00:00',
      remark: 'DB260410001短驳车费结清'
    }
  ])

  const fundAccounts = ref<FundAccount[]>([
    {
      id: 'FA01',
      accountCode: 'ACC-ICBC-01',
      accountName: '工商银行广州白云基本户',
      accountType: '银行账户',
      bankName: '中国工商银行广州白云支行',
      cardNo: '3602018809200199888',
      network: '总部',
      initBalance: 350000,
      periodIncome: 128600,
      periodExpense: 64200,
      currentBalance: 414400,
      status: '启用'
    },
    {
      id: 'FA02',
      accountCode: 'ACC-CCB-02',
      accountName: '建设银行广州物流结算户',
      accountType: '银行账户',
      bankName: '中国建设银行广州林安支行',
      cardNo: '4400149010505300991',
      network: '总部',
      initBalance: 180000,
      periodIncome: 85400,
      periodExpense: 52300,
      currentBalance: 213100,
      status: '启用'
    },
    {
      id: 'FA03',
      accountCode: 'ACC-WX-03',
      accountName: '微信企业收款户',
      accountType: '第三方支付',
      bankName: '微信财付通商户号',
      cardNo: 'WX-MCH-160928371',
      network: '总部',
      initBalance: 42000,
      periodIncome: 36800,
      periodExpense: 12000,
      currentBalance: 66800,
      status: '启用'
    },
    {
      id: 'FA04',
      accountCode: 'ACC-CASH-04',
      accountName: '总部营业厅现金柜',
      accountType: '现金账户',
      bankName: '总部财务中心',
      cardNo: 'CASH-ZB-001',
      network: '总部',
      initBalance: 15000,
      periodIncome: 18500,
      periodExpense: 9600,
      currentBalance: 23900,
      status: '启用'
    },
    {
      id: 'FA05',
      accountCode: 'ACC-ABC-05',
      accountName: '衡阳营业部农行结算户',
      accountType: '银行账户',
      bankName: '中国农业银行衡阳蒸湘支行',
      cardNo: '6228480638819900112',
      network: '衡阳营业部',
      initBalance: 65000,
      periodIncome: 42300,
      periodExpense: 19800,
      currentBalance: 87500,
      status: '启用'
    }
  ])

  // ==================== 2. 货款中心数据 ====================
  const goodsPaymentList = ref<GoodsPaymentItem[]>([
    {
      id: 'PM01',
      shipOrderNo: 'KB260410091',
      createTime: '2026-04-10 09:20:00',
      startNetwork: '总部',
      endNetwork: '衡阳营业部',
      destCity: '衡阳市',
      shipperName: '张伟',
      shipperMobile: '13800138801',
      receiverName: '唐建国',
      receiverMobile: '13807346688',
      goodsName: '五金建材',
      num: 30,
      codAmount: 15000,
      codServiceFee: 75,
      deductFreight: 0,
      actualPayAmount: 14925,
      bankName: '中国工商银行广州白云支行',
      bankAccountName: '张伟',
      bankCardNo: '6222023602016655101',
      stage: '未收回',
      opStatus: '正常',
      remark: '见款放货'
    },
    {
      id: 'PM02',
      shipOrderNo: 'KB260410092',
      createTime: '2026-04-10 10:45:00',
      startNetwork: '总部',
      endNetwork: '长沙分部',
      destCity: '长沙市',
      shipperName: '刘芳',
      shipperMobile: '13922334455',
      receiverName: '李明',
      receiverMobile: '13907319901',
      goodsName: '数码家电',
      num: 60,
      codAmount: 28000,
      codServiceFee: 140,
      deductFreight: 0,
      actualPayAmount: 27860,
      bankName: '中国建设银行佛山顺德支行',
      bankAccountName: '刘芳',
      bankCardNo: '6217003320017788202',
      stage: '已收回',
      opStatus: '正常',
      recoverTime: '2026-04-10 15:10:00',
      remark: '长沙分部POS机刷卡收回'
    },
    {
      id: 'PM03',
      shipOrderNo: 'KB260409085',
      createTime: '2026-04-09 11:20:00',
      startNetwork: '总部',
      endNetwork: '武汉分部',
      destCity: '武汉市',
      shipperName: '周建军',
      shipperMobile: '13711223344',
      receiverName: '王强',
      receiverMobile: '13602718822',
      goodsName: '电子产品',
      num: 28,
      codAmount: 9600,
      codServiceFee: 48,
      deductFreight: 0,
      actualPayAmount: 9552,
      bankName: '招商银行广州黄埔支行',
      bankAccountName: '周建军',
      bankCardNo: '6225882001993344556',
      stage: '已汇出',
      opStatus: '正常',
      recoverTime: '2026-04-09 17:30:00',
      remitTime: '2026-04-10 09:00:00',
      remark: '武汉分部已上缴总部'
    },
    {
      id: 'PM04',
      shipOrderNo: 'KB260408072',
      createTime: '2026-04-08 14:15:00',
      startNetwork: '总部',
      endNetwork: '上海分部',
      destCity: '上海市',
      shipperName: '陈志强',
      shipperMobile: '13688990011',
      receiverName: '孙丽',
      receiverMobile: '13502117733',
      goodsName: '汽车配件',
      num: 22,
      codAmount: 18500,
      codServiceFee: 92.5,
      deductFreight: 0,
      actualPayAmount: 18407.5,
      bankName: '中国农业银行广州花都支行',
      bankAccountName: '陈志强',
      bankCardNo: '6228480028991122334',
      stage: '已到账',
      opStatus: '正常',
      recoverTime: '2026-04-09 11:00:00',
      remitTime: '2026-04-09 16:00:00',
      accountTime: '2026-04-10 10:00:00',
      remark: '总部财务已确认到账，待打款给发货人'
    },
    {
      id: 'PM05',
      shipOrderNo: 'KB260407061',
      createTime: '2026-04-07 09:50:00',
      startNetwork: '总部',
      endNetwork: '成都分部',
      destCity: '成都市',
      shipperName: '黄丽娟',
      shipperMobile: '13566778899',
      receiverName: '赵雷',
      receiverMobile: '13880015566',
      goodsName: '服装纺织',
      num: 50,
      codAmount: 12000,
      codServiceFee: 60,
      deductFreight: 450,
      actualPayAmount: 11490,
      bankName: '平安银行广州天河支行',
      bankAccountName: '黄丽娟',
      bankCardNo: '6221558802009988776',
      stage: '已发放',
      opStatus: '正常',
      recoverTime: '2026-04-08 10:00:00',
      remitTime: '2026-04-08 15:00:00',
      accountTime: '2026-04-09 09:30:00',
      grantTime: '2026-04-09 14:20:00',
      remark: '银企直联已打款成功'
    }
  ])

  // ==================== 3. 回单管理数据 ====================
  const receiptList = ref<ReceiptRecord[]>([
    {
      id: 'RCP01',
      shipOrderNo: 'KB260410091',
      createTime: '2026-04-10 09:20:00',
      startNetwork: '总部',
      endNetwork: '衡阳营业部',
      destCity: '衡阳市',
      shipperName: '张伟',
      shipperMobile: '13800138801',
      receiverName: '唐建国',
      receiverMobile: '13807346688',
      goodsName: '五金建材',
      num: 30,
      receiptReq: '签回单',
      receiptCount: 2,
      receiptNo: 'HD260410091',
      stage: '未签收',
      signer: '',
      remark: '需盖收货方公章'
    },
    {
      id: 'RCP02',
      shipOrderNo: 'KB260410092',
      createTime: '2026-04-10 10:45:00',
      startNetwork: '总部',
      endNetwork: '长沙分部',
      destCity: '长沙市',
      shipperName: '刘芳',
      shipperMobile: '13922334455',
      receiverName: '李明',
      receiverMobile: '13907319901',
      goodsName: '数码家电',
      num: 60,
      receiptReq: '原件返回',
      receiptCount: 1,
      receiptNo: 'HD260410092',
      stage: '已签收',
      signer: '李明',
      signTime: '2026-04-10 14:20:00',
      remark: '客户已正常签字确认'
    },
    {
      id: 'RCP03',
      shipOrderNo: 'KB260409085',
      createTime: '2026-04-09 11:20:00',
      startNetwork: '总部',
      endNetwork: '武汉分部',
      destCity: '武汉市',
      shipperName: '周建军',
      shipperMobile: '13711223344',
      receiverName: '王强',
      receiverMobile: '13602718822',
      goodsName: '电子产品',
      num: 28,
      receiptReq: '签回单',
      receiptCount: 2,
      receiptNo: 'HD260409085',
      stage: '已寄回',
      signer: '王强',
      signTime: '2026-04-09 16:00:00',
      expressCompany: '顺丰速运',
      expressNo: 'SF1429883710293',
      sendBackTime: '2026-04-09 18:30:00',
      remark: '随班车文件袋寄回总部'
    },
    {
      id: 'RCP04',
      shipOrderNo: 'KB260408072',
      createTime: '2026-04-08 14:15:00',
      startNetwork: '总部',
      endNetwork: '上海分部',
      destCity: '上海市',
      shipperName: '陈志强',
      shipperMobile: '13688990011',
      receiverName: '孙丽',
      receiverMobile: '13502117733',
      goodsName: '汽车配件',
      num: 22,
      receiptReq: '签回单',
      receiptCount: 1,
      receiptNo: 'HD260408072',
      stage: '已接收',
      signer: '孙丽',
      signTime: '2026-04-09 09:20:00',
      expressCompany: '中通快递',
      expressNo: 'ZT782910023912',
      sendBackTime: '2026-04-09 15:00:00',
      receiveTime: '2026-04-10 09:30:00',
      remark: '总部客服已接收，待通知客户领取'
    },
    {
      id: 'RCP05',
      shipOrderNo: 'KB260407061',
      createTime: '2026-04-07 09:50:00',
      startNetwork: '总部',
      endNetwork: '成都分部',
      destCity: '成都市',
      shipperName: '黄丽娟',
      shipperMobile: '13566778899',
      receiverName: '赵雷',
      receiverMobile: '13880015566',
      goodsName: '服装纺织',
      num: 50,
      receiptReq: '电子回单',
      receiptCount: 1,
      receiptNo: 'HD260407061',
      stage: '已返厂',
      signer: '赵雷',
      signTime: '2026-04-08 10:15:00',
      sendBackTime: '2026-04-08 14:00:00',
      receiveTime: '2026-04-09 09:00:00',
      returnFactoryTime: '2026-04-09 16:40:00',
      remark: '已返还发货人签收归档'
    }
  ])

  // ==================== 4. 用户中心 & 人事行政数据 ====================
  const roleList = ref([
    { id: 'R01', roleCode: 'ADMIN', roleName: '超级管理员', userCount: 3, dataScope: '全部网点数据', status: '启用', createTime: '2025-01-01 09:00:00', remark: '拥有系统全模块最高管理权限' },
    { id: 'R02', roleCode: 'OP_DISPATCH', roleName: '营运调度主管', userCount: 6, dataScope: '本网点及下属网点', status: '启用', createTime: '2025-02-15 10:30:00', remark: '负责开单、干线配载、短驳发车与外发调度' },
    { id: 'R03', roleCode: 'FIN_MANAGER', roleName: '财务结算专员', userCount: 4, dataScope: '全部网点数据', status: '启用', createTime: '2025-03-10 14:20:00', remark: '负责应收应付、往来对账、代收货款发放及资金账' },
    { id: 'R04', roleCode: 'BILL_CLERK', roleName: '营业厅开单员', userCount: 15, dataScope: '仅所在网点数据', status: '启用', createTime: '2025-04-05 08:30:00', remark: '负责日常录运单、标签打印、回单签收与寄回' },
    { id: 'R05', roleCode: 'ARRIVE_SIGN', roleName: '到货客服及签收员', userCount: 9, dataScope: '仅所在网点数据', status: '启用', createTime: '2025-05-12 11:00:00', remark: '负责到车卸货确认、送货上门派工及客户签收' }
  ])

  const userList = ref([
    { id: 'U01', account: 'admin', realName: '王总', phone: '13800138000', network: '总部', deptName: '总经办', roleName: '超级管理员', position: '总经理', status: '启用', lastLogin: '2026-04-10 09:30:12' },
    { id: 'U02', account: 'zhangjl', realName: '张经理', phone: '13822109901', network: '总部', deptName: '营运调度部', roleName: '营运调度主管', position: '调度主管', status: '启用', lastLogin: '2026-04-10 08:45:00' },
    { id: 'U03', account: 'wangcw', realName: '王财务', phone: '13922108802', network: '总部', deptName: '财务结算部', roleName: '财务结算专员', position: '主办会计', status: '启用', lastLogin: '2026-04-10 09:05:44' },
    { id: 'U04', account: 'liucheng', realName: '刘成', phone: '13707348801', network: '衡阳营业部', deptName: '衡阳营业部', roleName: '营运调度主管', position: '网点经理', status: '启用', lastLogin: '2026-04-10 08:15:30' },
    { id: 'U05', account: 'zhangxy', realName: '张向阳', phone: '13907316602', network: '长沙分部', deptName: '长沙分部', roleName: '营运调度主管', position: '网点经理', status: '启用', lastLogin: '2026-04-10 08:50:19' },
    { id: 'U06', account: 'chenjing', realName: '陈静', phone: '13522197733', network: '总部', deptName: '客服回单部', roleName: '营业厅开单员', position: '高级开单客服', status: '启用', lastLogin: '2026-04-10 09:12:05' }
  ])

  const onlineUserList = ref([
    { sessionId: 'SES-20260410-9901', account: 'admin', realName: '王总', network: '总部', ip: '113.108.221.45', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 11', loginTime: '2026-04-10 08:30:12', status: '在线活跃' },
    { sessionId: 'SES-20260410-9902', account: 'zhangjl', realName: '张经理', network: '总部', ip: '113.108.221.46', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 10', loginTime: '2026-04-10 08:45:00', status: '在线活跃' },
    { sessionId: 'SES-20260410-9903', account: 'liucheng', realName: '刘成', network: '衡阳营业部', ip: '220.168.55.102', location: '湖南省衡阳市', browser: 'Edge 123.0', os: 'Windows 10', loginTime: '2026-04-10 08:15:30', status: '在线活跃' },
    { sessionId: 'SES-20260410-9904', account: 'wangcw', realName: '王财务', network: '总部', ip: '113.108.221.48', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 11', loginTime: '2026-04-10 09:05:44', status: '在线活跃' }
  ])

  const orgList = ref([
    { id: 'ORG01', orgCode: 'KB-HQ', orgName: '星云智联物流总公司 (总部)', parentName: '顶级集团', manager: '王总', phone: '020-88880001', empCount: 46, address: '广州市白云区石井大道林安物流园中心大楼', status: '正常' },
    { id: 'ORG02', orgCode: 'KB-DEPT-OP', orgName: '干线营运调度中心', parentName: '星云智联物流总公司 (总部)', manager: '张经理', phone: '020-88880002', empCount: 18, address: '广州市白云区林安物流园A区调度大厅', status: '正常' },
    { id: 'ORG03', orgCode: 'KB-DEPT-FIN', orgName: '财务与货款结算中心', parentName: '星云智联物流总公司 (总部)', manager: '王财务', phone: '020-88880003', empCount: 8, address: '广州市白云区林安物流园中心大楼3楼', status: '正常' },
    { id: 'ORG04', orgCode: 'KB-BR-HY', orgName: '衡阳直属营业部', parentName: '星云智联物流总公司 (总部)', manager: '刘成', phone: '0734-8821002', empCount: 12, address: '湖南省衡阳市蒸湘区华新开发区物流园8栋', status: '正常' },
    { id: 'ORG05', orgCode: 'KB-BR-CS', orgName: '长沙区域分拨分部', parentName: '星云智联物流总公司 (总部)', manager: '张向阳', phone: '0731-8556001', empCount: 16, address: '湖南省长沙市雨花区高桥现代物流园2区', status: '正常' },
    { id: 'ORG06', orgCode: 'KB-BR-WH', orgName: '武汉华中分拨分部', parentName: '星云智联物流总公司 (总部)', manager: '周建军', phone: '027-8332009', empCount: 15, address: '湖北省武汉市东西湖区走马岭物流园', status: '正常' }
  ])

  const positionList = ref([
    { id: 'POS01', posCode: 'GM', posName: '总经理', deptName: '总经办', level: 'L1-高管层', empCount: 1, baseSalary: '25000', status: '启用', remark: '全面主持公司战略与经营管理' },
    { id: 'POS02', posCode: 'BR_MGR', posName: '网点营业部经理', deptName: '各直属分部', level: 'L2-管理层', empCount: 11, baseSalary: '12000', status: '启用', remark: '负责分支网点日常收发货、派送与回款' },
    { id: 'POS03', posCode: 'DISPATCHER', posName: '干线配载调度员', deptName: '干线营运调度中心', level: 'L3-骨干层', empCount: 6, baseSalary: '8500', status: '启用', remark: '负责大车调配、装车配载及在途跟踪' },
    { id: 'POS04', posCode: 'ACCOUNTANT', posName: '物流结算会计', deptName: '财务与货款结算中心', level: 'L3-骨干层', empCount: 5, baseSalary: '8000', status: '启用', remark: '负责应收应付核销、代收货款发放及网点对账' },
    { id: 'POS05', posCode: 'ORDER_CLERK', posName: '前台录单及客服专员', deptName: '各直属分部', level: 'L4-执行层', empCount: 22, baseSalary: '6000', status: '启用', remark: '负责开单制票、客户接听与回单收发' },
    { id: 'POS06', posCode: 'FORKLIFT', posName: '仓管装卸及叉车工', deptName: '干线营运调度中心', level: 'L4-执行层', empCount: 18, baseSalary: '6800', status: '启用', remark: '负责库房盘点、装车卸车作业' }
  ])

  const employeeList = ref([
    { id: 'EMP01', empNo: 'KB1001', name: '王总', gender: '男', phone: '13800138000', idCard: '440103198001011234', network: '总部', deptName: '总经办', position: '总经理', entryDate: '2020-03-01', state: '正式在职' },
    { id: 'EMP02', empNo: 'KB1002', name: '张经理', gender: '男', phone: '13822109901', idCard: '440106198605123319', network: '总部', deptName: '干线营运调度中心', position: '干线配载调度员', entryDate: '2021-06-15', state: '正式在职' },
    { id: 'EMP03', empNo: 'KB1003', name: '王财务', gender: '女', phone: '13922108802', idCard: '440111198909204428', network: '总部', deptName: '财务与货款结算中心', position: '物流结算会计', entryDate: '2021-09-01', state: '正式在职' },
    { id: 'EMP04', empNo: 'KB1004', name: '刘成', gender: '男', phone: '13707348801', idCard: '430408198511082215', network: '衡阳营业部', deptName: '衡阳直属营业部', position: '网点营业部经理', entryDate: '2022-02-18', state: '正式在职' },
    { id: 'EMP05', empNo: 'KB1005', name: '张向阳', gender: '男', phone: '13907316602', idCard: '430102198704225517', network: '长沙分部', deptName: '长沙区域分拨分部', position: '网点营业部经理', entryDate: '2022-05-10', state: '正式在职' },
    { id: 'EMP06', empNo: 'KB1006', name: '陈静', gender: '女', phone: '13522197733', idCard: '440104199407196621', network: '总部', deptName: '干线营运调度中心', position: '前台录单及客服专员', entryDate: '2023-03-12', state: '正式在职' }
  ])

  // ==================== 5. 系统管理数据 ====================
  const routeLineList = ref([
    { id: 'RL01', lineCode: 'GZ-HY-01', lineName: '广州总部 → 衡阳专线', startNetwork: '总部', viaNetworks: '清远站', endNetwork: '衡阳营业部', distanceKm: 520, transitHours: 8, defaultCarFee: 4500, status: '启用' },
    { id: 'RL02', lineCode: 'GZ-CS-02', lineName: '广州总部 → 长沙干线', startNetwork: '总部', viaNetworks: '衡阳营业部', endNetwork: '长沙分部', distanceKm: 680, transitHours: 10, defaultCarFee: 5200, status: '启用' },
    { id: 'RL03', lineCode: 'GZ-WH-03', lineName: '广州总部 → 武汉快线', startNetwork: '总部', viaNetworks: '长沙分部', endNetwork: '武汉分部', distanceKm: 980, transitHours: 14, defaultCarFee: 7200, status: '启用' },
    { id: 'RL04', lineCode: 'GZ-SH-04', lineName: '广州总部 → 上海华东线', startNetwork: '总部', viaNetworks: '杭州分部', endNetwork: '上海分部', distanceKm: 1450, transitHours: 20, defaultCarFee: 9800, status: '启用' },
    { id: 'RL05', lineCode: 'GZ-CD-05', lineName: '广州总部 → 成都西南线', startNetwork: '总部', viaNetworks: '重庆站', endNetwork: '成都分部', distanceKm: 1620, transitHours: 24, defaultCarFee: 10800, status: '启用' }
  ])

  const subjectList = ref([
    { id: 'SUB01', code: '1001', name: '基本运费收入', direction: '收入类', parentSubject: '主营业务收入', autoLinkField: 'freight', status: '启用', remark: '开单货物基本运费自动归集科目' },
    { id: 'SUB02', code: '1002', name: '送货上门费收入', direction: '收入类', parentSubject: '主营业务收入', autoLinkField: 'fDelivery', status: '启用', remark: '开单送货费归集科目' },
    { id: 'SUB03', code: '1003', name: '保价保险费收入', direction: '收入类', parentSubject: '其他业务收入', autoLinkField: 'fPremium', status: '启用', remark: '货物保价费归集科目' },
    { id: 'SUB04', code: '2001', name: '干线大车运输成本', direction: '成本支出类', parentSubject: '主营业务成本', autoLinkField: 'driverFee', status: '启用', remark: '干线配载大车运费分摊成本' },
    { id: 'SUB05', code: '2002', name: '三方外发中转成本', direction: '成本支出类', parentSubject: '主营业务成本', autoLinkField: 'outgoFee', status: '启用', remark: '本地外发与终端外发中转费支出' },
    { id: 'SUB06', code: '2003', name: '客户返款及回扣支出', direction: '成本支出类', parentSubject: '销售费用', autoLinkField: 'fReturn', status: '启用', remark: '开单返款/回扣费用科目' },
    { id: 'SUB07', code: '3001', name: '代收货款往来负债', direction: '往来负债类', parentSubject: '其他应付款', autoLinkField: 'fCollect', status: '启用', remark: '代收货款收回与发放专项核算' }
  ])

  const auditRuleList = ref([
    { id: 'AUD01', moduleName: '运单改单审批', triggerCondition: '已发车或已签收运单修改运费/代收货款', approverRole: '财务结算专员 + 营运调度主管', enabled: true, autoPassUnderAmount: 100, remark: '涉及金额变动超100元需双岗审批' },
    { id: 'AUD02', moduleName: '代收货款变更审批', triggerCondition: '在途或到站运单申请变更/取消代收货款', approverRole: '财务结算专员', enabled: true, autoPassUnderAmount: 0, remark: '所有代收货款变更必须经财务审核并验证发货人授权' },
    { id: 'AUD03', moduleName: '大车车费超标审批', triggerCondition: '单车干线运费超过线路标准运费 15% 以上', approverRole: '超级管理员 (总经理)', enabled: true, autoPassUnderAmount: 500, remark: '防范异常高额配载车费支出' },
    { id: 'AUD04', moduleName: '作废运单审批', triggerCondition: '开单超过24小时后申请作废运单', approverRole: '营运调度主管', enabled: true, autoPassUnderAmount: 0, remark: '确保运单号段连续性与货物库存准确' },
    { id: 'AUD05', moduleName: '月结客户超授信开单审批', triggerCondition: '月结客户未结应收账款超过授信额度', approverRole: '财务结算专员', enabled: false, autoPassUnderAmount: 50000, remark: '开启后超额度客户开单将自动拦截转审批' }
  ])

  const printTemplateList = ref([
    { id: 'PT01', tplCode: 'TPL-WAYBILL-3', tplName: '科邦标准三联针式托运单 (241×140mm)', tplType: '托运单打印', paperSize: '241mm × 140mm', printerName: 'Epson LQ-630K 针式打印机', isDefault: true, updateTime: '2026-04-01 10:00:00' },
    { id: 'PT02', tplCode: 'TPL-LABEL-80', tplName: '热敏不干胶货物标签 (80×60mm含条码)', tplType: '货物标签打印', paperSize: '80mm × 60mm', printerName: 'Gprinter GP-1324D 热敏标签机', isDefault: true, updateTime: '2026-04-02 15:20:00' },
    { id: 'PT03', tplCode: 'TPL-MANIFEST-A4', tplName: '干线配载随车装车清单 (A4横向)', tplType: '配载清单打印', paperSize: 'A4 (297mm × 210mm)', printerName: 'HP LaserJet Pro M404dn', isDefault: true, updateTime: '2026-03-28 09:30:00' },
    { id: 'PT04', tplCode: 'TPL-CONTRACT-A4', tplName: '整车干线公路货物运输合同 (A4纵向)', tplType: '运输合同打印', paperSize: 'A4 (210mm × 297mm)', printerName: 'HP LaserJet Pro M404dn', isDefault: true, updateTime: '2026-03-25 11:10:00' }
  ])

  const interconnectList = ref([
    { id: 'IC01', tenantCode: '778801', companyName: '湖南湘通快运物流有限公司', contactMan: '贺总', phone: '13907318899', bindRoutes: '长沙市、株洲市、湘潭市', autoSyncWaybill: true, autoSyncTrack: true, bindStatus: '已互联互通', bindTime: '2025-11-12 10:00:00' },
    { id: 'IC02', tenantCode: '665502', companyName: '湖北楚天三方联运集团', contactMan: '周总', phone: '13802716688', bindRoutes: '武汉市、襄阳市、宜昌市', autoSyncWaybill: true, autoSyncTrack: true, bindStatus: '已互联互通', bindTime: '2026-01-08 14:30:00' },
    { id: 'IC03', tenantCode: '991103', companyName: '长三角百联专线联盟', contactMan: '沈总', phone: '13702119900', bindRoutes: '上海市、苏州市、杭州市', autoSyncWaybill: false, autoSyncTrack: true, bindStatus: '待对方确认', bindTime: '2026-04-09 16:20:00' }
  ])

  const systemMessages = ref([
    { id: 'MSG01', type: '货款提醒', title: '代收货款到账待发放提醒 (KB260408072)', content: '运单 KB260408072 代收货款 ¥18,500.00 已由上海分部汇入总部账户，请及时核对并发放给发货人陈志强。', sender: '系统财务引擎', createTime: '2026-04-10 10:02:00', isRead: false },
    { id: 'MSG02', type: '到车通知', title: '干线车次 GX260410001 发车通知', content: '广州总部发往衡阳营业部车次 GX260410001（车牌：粤A·99681挂，司机：刘大柱）已确认发车，随车共 12 票运单。', sender: '总部调度室', createTime: '2026-04-10 09:35:00', isRead: false },
    { id: 'MSG03', type: '上游订单', title: '新增 3 笔上游企业协同订单待处理', content: '企业互联通道收到 3 笔新上游订单，请前往【上游订单】模块审核并转入运单。', sender: '企业互联网关', createTime: '2026-04-10 08:50:00', isRead: true },
    { id: 'MSG04', type: '系统公告', title: '星云TMS V3.8 智能联想与自动算费引擎升级公告', content: '本次升级全面开放收发货客户800px多维联想、智能地址解析及路线价格体系自动算费功能。', sender: '科邦智联研发中心', createTime: '2026-04-09 18:00:00', isRead: true }
  ])

  const loginLogs = ref([
    { id: 'LL01', account: 'admin', realName: '王总', network: '总部', ip: '113.108.221.45', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 11', status: '登录成功', msg: '密码验证通过，颁发JWT令牌', loginTime: '2026-04-10 08:30:12' },
    { id: 'LL02', account: 'zhangjl', realName: '张经理', network: '总部', ip: '113.108.221.46', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 10', status: '登录成功', msg: '密码验证通过', loginTime: '2026-04-10 08:45:00' },
    { id: 'LL03', account: 'liucheng', realName: '刘成', network: '衡阳营业部', ip: '220.168.55.102', location: '湖南省衡阳市', browser: 'Edge 123.0', os: 'Windows 10', status: '登录成功', msg: '密码验证通过', loginTime: '2026-04-10 08:15:30' },
    { id: 'LL04', account: 'wangcw', realName: '王财务', network: '总部', ip: '113.108.221.48', location: '广东省广州市', browser: 'Chrome 124.0', os: 'Windows 11', status: '登录成功', msg: '密码验证通过', loginTime: '2026-04-10 09:05:44' },
    { id: 'LL05', account: 'test01', realName: '未知访客', network: '-', ip: '58.62.109.12', location: '广东省深圳市', browser: 'Chrome 122.0', os: 'Windows 10', status: '登录失败', msg: '账号或密码错误 (剩余重试4次)', loginTime: '2026-04-09 22:18:09' }
  ])

  const operLogs = ref([
    { id: 'OL01', module: '营运中心-录运单', actionType: '新增运单', operator: 'admin (王总)', network: '总部', ip: '113.108.221.45', targetNo: 'KB260410091', detail: '创建托运单 KB260410091，到站：衡阳市，发货方：张伟，合计运费：¥1280', costMs: '38ms', operTime: '2026-04-10 09:20:02' },
    { id: 'OL02', module: '营运中心-干线配载', actionType: '确认发车', operator: 'zhangjl (张经理)', network: '总部', ip: '113.108.221.46', targetNo: 'GX260410001', detail: '干线配载车次 GX260410001 确认发车，车牌：粤A·99681挂，大车运费：¥4500', costMs: '52ms', operTime: '2026-04-10 09:34:50' },
    { id: 'OL03', module: '财务中心-收款单', actionType: '核销收款', operator: 'wangcw (王财务)', network: '总部', ip: '113.108.221.48', targetNo: 'SK20260410002', detail: '对佛山美的家电制造厂核销月结收款 ¥8,600.00，入账：工商银行基本户', costMs: '41ms', operTime: '2026-04-10 14:10:05' },
    { id: 'OL04', module: '货款中心-货款收回', actionType: '货款收回', operator: 'zhangxy (张向阳)', network: '长沙分部', ip: '118.249.33.19', targetNo: 'KB260410092', detail: '收回代收货款 ¥28,000.00（收货方：李明）', costMs: '29ms', operTime: '2026-04-10 15:10:00' },
    { id: 'OL05', module: '系统管理-价格体系', actionType: '修改配置', operator: 'admin (王总)', network: '总部', ip: '113.108.221.45', targetNo: '衡阳市专线价', detail: '更新衡阳市路线价格标准：重货 0.45元/kg，轻货 110元/m³，起步价 40元', costMs: '19ms', operTime: '2026-04-10 09:50:12' }
  ])

  const updateNewsList = ref([
    {
      version: 'V3.8.0 (当前线上版本)',
      releaseDate: '2026-04-10',
      tag: '重大升级',
      highlights: [
        '【智能联想引擎】新增收发货客户 800px 多维浮动表格联想，支持拼音首字母、手机号、单位检索与历史运单双击回填',
        '【智能地址识别】新增自然语言地址一键拆解（自动提取姓名、手机、座机、省市区三级级联与详细地址）',
        '【路线价格体系】新增按到站城市自动联动运输路线、终端网点、货号生成，并根据重货/轻货/件数单价自动计算运费',
        '【全模块闭环】打通营运、财务、代收货款、回单、档案、报表、权限与系统管理全链路可交互工作台'
      ]
    },
    {
      version: 'V3.7.2',
      releaseDate: '2026-03-15',
      tag: '功能优化',
      highlights: [
        '【干线配载】新增多途径网点分段到付车费与中途装卸费明细配置弹窗',
        '【批量改单】支持勾选多张运单在同一弹窗内表头批量同值填充与逐行精细改单，自动写入改单历史',
        '【打印中心】升级标准三联托运单、热敏条码标签、配载随车清单与整车运输合同可视化打印预览'
      ]
    },
    {
      version: 'V3.6.0',
      releaseDate: '2026-02-01',
      tag: '架构升级',
      highlights: [
        '【银企直联】代收货款发放接入网银批量代发接口，支持手续费自动扣减与货款扣运费对冲',
        '【企业互联】上线上下游三方物流企业订单协同推送与一键转运单能力'
      ]
    }
  ])

  // ==================== 6. 核心业务动作 ====================
  // 财务核销：对选中的应收/应付记录生成收款单或付款单，并更新资金账户余额
  function settleArApRecords(
    ids: string[],
    accountName: string,
    payMethod: SettlementVoucher['payMethod'],
    remark = ''
  ) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    let totalSettled = 0
    let direction: '应收' | '应付' = '应收'
    let firstTarget = ''

    arApList.value.forEach(item => {
      if (ids.includes(item.id) && item.unsettledAmount > 0) {
        direction = item.direction
        if (!firstTarget) firstTarget = item.targetName
        totalSettled += item.unsettledAmount
        item.settledAmount = item.totalAmount
        item.unsettledAmount = 0
        item.settleStatus = '已核销'
      }
    })

    if (totalSettled > 0) {
      const isIncome = direction === '应收'
      const voucherNo = `${isIncome ? 'SK' : 'FK'}${Date.now().toString().slice(-9)}`
      settlementVouchers.value.unshift({
        id: voucherNo,
        voucherNo,
        voucherType: isIncome ? '收款单' : '付款单',
        targetName: firstTarget + (ids.length > 1 ? ` 等${ids.length}笔` : ''),
        feeCategory: isIncome ? '应收账款核销' : '应付账款核销',
        amount: totalSettled,
        payMethod,
        fundAccount: accountName,
        bankCardNo: '-',
        operator: 'admin',
        auditStatus: '已审核',
        createTime: now,
        remark: remark || `批量核销 ${ids.length} 笔账款`
      })

      const acc = fundAccounts.value.find(a => a.accountName === accountName) || fundAccounts.value[0]
      if (acc) {
        if (isIncome) {
          acc.periodIncome += totalSettled
          acc.currentBalance += totalSettled
        } else {
          acc.periodExpense += totalSettled
          acc.currentBalance -= totalSettled
        }
      }
    }
    return totalSettled
  }

  // 创建对账单
  function createReconcileBill(dzType: string, ids: string[], remark = '') {
    const matched = arApList.value.filter(i => ids.includes(i.id))
    if (!matched.length) return null
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    const total = matched.reduce((s, r) => s + r.totalAmount, 0)
    const settled = matched.reduce((s, r) => s + r.settledAmount, 0)
    const bill: ReconcileBill = {
      id: `DZ${Date.now().toString().slice(-6)}`,
      dzNo: `DZ${Date.now().toString().slice(-9)}`,
      dzType,
      targetName: matched[0].targetName,
      targetPhone: matched[0].targetPhone,
      billCount: matched.length,
      totalAmount: total,
      settledAmount: settled,
      unsettledAmount: total - settled,
      status: '待确认',
      creator: 'admin',
      createTime: now,
      remark: remark || `${dzType}自动生成对账单`
    }
    reconcileBills.value.unshift(bill)
    return bill
  }

  // 货款流转动作
  function advancePaymentStage(ids: string[], targetStage: GoodsPaymentItem['stage'], extraRemark = '') {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    let count = 0
    goodsPaymentList.value.forEach(item => {
      if (ids.includes(item.id)) {
        item.stage = targetStage
        if (targetStage === '已收回') item.recoverTime = now
        if (targetStage === '已汇出') item.remitTime = now
        if (targetStage === '已到账') item.accountTime = now
        if (targetStage === '已发放') item.grantTime = now
        if (extraRemark) item.remark = extraRemark
        count++
      }
    })
    return count
  }

  // 回单流转动作
  function advanceReceiptStage(
    ids: string[],
    targetStage: ReceiptRecord['stage'],
    info?: { signer?: string; expressCompany?: string; expressNo?: string; remark?: string }
  ) {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
    let count = 0
    receiptList.value.forEach(item => {
      if (ids.includes(item.id)) {
        item.stage = targetStage
        if (targetStage === '已签收') {
          item.signTime = now
          item.signer = info?.signer || item.receiverName
        }
        if (targetStage === '已寄回') {
          item.sendBackTime = now
          item.expressCompany = info?.expressCompany || '顺丰速运'
          item.expressNo = info?.expressNo || `SF${Date.now().toString().slice(-10)}`
        }
        if (targetStage === '已接收') item.receiveTime = now
        if (targetStage === '已返厂') item.returnFactoryTime = now
        if (info?.remark) item.remark = info.remark
        count++
      }
    })
    return count
  }

  return {
    insureAccountBalance,
    carFeeList,
    insureList,
    arApList,
    reconcileBills,
    handoverBills,
    settlementVouchers,
    fundAccounts,
    goodsPaymentList,
    receiptList,
    roleList,
    userList,
    onlineUserList,
    orgList,
    positionList,
    employeeList,
    routeLineList,
    subjectList,
    auditRuleList,
    printTemplateList,
    interconnectList,
    systemMessages,
    loginLogs,
    operLogs,
    updateNewsList,
    settleArApRecords,
    createReconcileBill,
    advancePaymentStage,
    advanceReceiptStage
  }
})
