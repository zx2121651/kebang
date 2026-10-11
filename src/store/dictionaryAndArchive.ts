import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export interface CustomerArchive {
  id: string
  name: string
  pinyin: string
  phone: string
  tel: string
  unit: string
  idCard: string
  province: string
  city: string
  area: string
  address: string
  goodsName: string
  pack: string
  defaultGoodsName?: string
  defaultPack?: string
  defaultPayType?: string
  historyCount?: number
}
export type CustomerArchiveItem = CustomerArchive

export interface VehicleArchive {
  id: string
  plateNo: string
  plateColor: string | number
  plateColorStr: string
  driverName: string
  driverPhone: string
  carType?: string
  bankName: string
  userName: string
  bankAccountName?: string
  bankCard: string
  bankCardNo?: string
  trailerNo?: string
  vinNo?: string
  carrierName?: string
  pinyin: string
}
export type VehicleArchiveItem = VehicleArchive

export interface CarrierArchive {
  id: string
  name: string
  pinyin: string
  localPhone: string
  pickPhone: string
  contactMan: string
  city: string
  address: string
}
export type CarrierArchiveItem = CarrierArchive

export interface CityInfo {
  code: string
  name: string
  areaName: string
  pinyin: string
  province: string
  city: string
  defaultDistrict: string
  defaultRegion: string
  matchedGroupId: string
  matchedGroupName: string
  matchedBranch: string
  routeType: string
  shippingRoute: number // 1: 专线直达, 2: 本地外发
  weightPrice: number // 元/公斤
  volumePrice: number // 元/立方
  piecePrice: number // 元/件
  minFreight: number // 起步价
}
export type CityRoutePriceItem = CityInfo

export interface NetworkBranch {
  id: string
  code: string
  groupNo: string
  name: string
  groupName: string
  pinyin: string
  city: string
  manager: string
  phone: string
  lockDestGroupId?: string
  lockDestGroup?: string
}
export type NetworkNode = NetworkBranch

export interface DictOption {
  name: string
  value: string
  label?: string
  dicValue?: number
  pinyin: string
  enabled: number
}

export interface LayoutFieldItem {
  value: string
  label: string
  parent: string
  isShow: boolean
  type?: string | number
  isCustom?: boolean
}

export interface UserBehaviorItem {
  id?: string
  key: string
  filed: string
  name: string
  enabled: boolean
  desc: string
  type: '' | '1' | '2'
  value: string
}

export const REGION_TREE = [
  {
    value: '广东省',
    label: '广东省',
    children: [
      {
        value: '广州市',
        label: '广州市',
        children: [
          { value: '白云区', label: '白云区' },
          { value: '天河区', label: '天河区' },
          { value: '黄埔区', label: '黄埔区' },
          { value: '番禺区', label: '番禺区' },
          { value: '花都区', label: '花都区' }
        ]
      },
      {
        value: '深圳市',
        label: '深圳市',
        children: [
          { value: '宝安区', label: '宝安区' },
          { value: '龙岗区', label: '龙岗区' },
          { value: '南山区', label: '南山区' },
          { value: '福田区', label: '福田区' }
        ]
      },
      {
        value: '佛山市',
        label: '佛山市',
        children: [
          { value: '南海区', label: '南海区' },
          { value: '顺德区', label: '顺德区' },
          { value: '禅城区', label: '禅城区' }
        ]
      },
      {
        value: '东莞市',
        label: '东莞市',
        children: [
          { value: '虎门镇', label: '虎门镇' },
          { value: '长安镇', label: '长安镇' },
          { value: '南城街道', label: '南城街道' }
        ]
      }
    ]
  },
  {
    value: '湖南省',
    label: '湖南省',
    children: [
      {
        value: '长沙市',
        label: '长沙市',
        children: [
          { value: '雨花区', label: '雨花区' },
          { value: '长沙县', label: '长沙县' },
          { value: '岳麓区', label: '岳麓区' },
          { value: '芙蓉区', label: '芙蓉区' }
        ]
      },
      {
        value: '衡阳市',
        label: '衡阳市',
        children: [
          { value: '蒸湘区', label: '蒸湘区' },
          { value: '雁峰区', label: '雁峰区' },
          { value: '石鼓区', label: '石鼓区' },
          { value: '珠晖区', label: '珠晖区' }
        ]
      },
      {
        value: '株洲市',
        label: '株洲市',
        children: [
          { value: '芦淞区', label: '芦淞区' },
          { value: '天元区', label: '天元区' }
        ]
      }
    ]
  },
  {
    value: '湖北省',
    label: '湖北省',
    children: [
      {
        value: '武汉市',
        label: '武汉市',
        children: [
          { value: '东西湖区', label: '东西湖区' },
          { value: '黄陂区', label: '黄陂区' },
          { value: '汉阳区', label: '汉阳区' },
          { value: '武昌区', label: '武昌区' }
        ]
      },
      {
        value: '襄阳市',
        label: '襄阳市',
        children: [
          { value: '樊城区', label: '樊城区' },
          { value: '襄州区', label: '襄州区' }
        ]
      }
    ]
  },
  {
    value: '上海市',
    label: '上海市',
    children: [
      {
        value: '上海市',
        label: '上海市',
        children: [
          { value: '嘉定区', label: '嘉定区' },
          { value: '青浦区', label: '青浦区' },
          { value: '闵行区', label: '闵行区' },
          { value: '浦东新区', label: '浦东新区' },
          { value: '松江区', label: '松江区' }
        ]
      }
    ]
  },
  {
    value: '北京市',
    label: '北京市',
    children: [
      {
        value: '北京市',
        label: '北京市',
        children: [
          { value: '大兴区', label: '大兴区' },
          { value: '通州区', label: '通州区' },
          { value: '朝阳区', label: '朝阳区' },
          { value: '顺义区', label: '顺义区' },
          { value: '东城区', label: '东城区' }
        ]
      }
    ]
  },
  {
    value: '四川省',
    label: '四川省',
    children: [
      {
        value: '成都市',
        label: '成都市',
        children: [
          { value: '新都区', label: '新都区' },
          { value: '双流区', label: '双流区' },
          { value: '龙泉驿区', label: '龙泉驿区' },
          { value: '武侯区', label: '武侯区' }
        ]
      }
    ]
  },
  {
    value: '浙江省',
    label: '浙江省',
    children: [
      {
        value: '杭州市',
        label: '杭州市',
        children: [
          { value: '萧山区', label: '萧山区' },
          { value: '余杭区', label: '余杭区' },
          { value: '钱塘区', label: '钱塘区' }
        ]
      },
      {
        value: '宁波市',
        label: '宁波市',
        children: [
          { value: '鄞州区', label: '鄞州区' },
          { value: '北仑区', label: '北仑区' }
        ]
      },
      {
        value: '温州市',
        label: '温州市',
        children: [
          { value: '瓯海区', label: '瓯海区' },
          { value: '鹿城区', label: '鹿城区' }
        ]
      }
    ]
  },
  {
    value: '江苏省',
    label: '江苏省',
    children: [
      {
        value: '苏州市',
        label: '苏州市',
        children: [
          { value: '昆山市', label: '昆山市' },
          { value: '吴中区', label: '吴中区' },
          { value: '姑苏区', label: '姑苏区' }
        ]
      },
      {
        value: '南京市',
        label: '南京市',
        children: [
          { value: '江宁区', label: '江宁区' },
          { value: '栖霞区', label: '栖霞区' }
        ]
      },
      {
        value: '无锡市',
        label: '无锡市',
        children: [
          { value: '锡山区', label: '锡山区' },
          { value: '新吴区', label: '新吴区' }
        ]
      }
    ]
  },
  {
    value: '河南省',
    label: '河南省',
    children: [
      {
        value: '郑州市',
        label: '郑州市',
        children: [
          { value: '管城回族区', label: '管城回族区' },
          { value: '新郑市', label: '新郑市' }
        ]
      }
    ]
  },
  {
    value: '陕西省',
    label: '陕西省',
    children: [
      {
        value: '西安市',
        label: '西安市',
        children: [
          { value: '未央区', label: '未央区' },
          { value: '灞桥区', label: '灞桥区' }
        ]
      }
    ]
  },
  {
    value: '重庆市',
    label: '重庆市',
    children: [
      {
        value: '重庆市',
        label: '重庆市',
        children: [
          { value: '沙坪坝区', label: '沙坪坝区' },
          { value: '九龙坡区', label: '九龙坡区' },
          { value: '巴南区', label: '巴南区' }
        ]
      }
    ]
  }
]

// 扁平化省市区列表供关键字/拼音快速联想
export const FLAT_REGIONS: { fullText: string; pinyin: string; province: string; city: string; area: string }[] = []
REGION_TREE.forEach(p => {
  p.children.forEach(c => {
    c.children.forEach(a => {
      FLAT_REGIONS.push({
        fullText: `${p.value}-${c.value}-${a.value}`,
        pinyin: `${p.value}${c.value}${a.value}`,
        province: p.value,
        city: c.value,
        area: a.value
      })
    })
  })
})

export const useArchiveStore = defineStore('kebang_archive', () => {
  // 1. 网点列表 (始发网点 & 终端网点)
  const networkList = ref<NetworkBranch[]>(
    [
      { id: '100', groupNo: 'ZB', name: '总部', pinyin: 'zb zongbu guangzhou', city: '广州市', manager: '王总', phone: '020-88880001' },
      { id: '101', groupNo: 'HY', name: '衡阳营业部', pinyin: 'hyyub hengyang', city: '衡阳市', manager: '刘成', phone: '0734-8821002' },
      { id: '102', groupNo: 'CS', name: '长沙分部', pinyin: 'csfb changsha', city: '长沙市', manager: '张向阳', phone: '0731-8556001' },
      { id: '103', groupNo: 'WH', name: '武汉分部', pinyin: 'whfb wuhan', city: '武汉市', manager: '周建军', phone: '027-8332009' },
      { id: '104', groupNo: 'SH', name: '上海分部', pinyin: 'shfb shanghai', city: '上海市', manager: '陈卫东', phone: '021-6998011' },
      { id: '105', groupNo: 'BJ', name: '北京分部', pinyin: 'bjfb beijing', city: '北京市', manager: '赵国强', phone: '010-6778022' },
      { id: '106', groupNo: 'CD', name: '成都分部', pinyin: 'cdfb chengdu', city: '成都市', manager: '李明瑞', phone: '028-8551033' },
      { id: '107', groupNo: 'HZ', name: '杭州分部', pinyin: 'hzfb hangzhou', city: '杭州市', manager: '吴俊杰', phone: '0571-8662044' },
      { id: '108', groupNo: 'FS', name: '佛山分部', pinyin: 'fsfb foshan', city: '佛山市', manager: '何耀文', phone: '0757-8223055' },
      { id: '109', groupNo: 'SZ', name: '深圳分部', pinyin: 'szfb shenzhen', city: '深圳市', manager: '林志远', phone: '0755-8339066' },
      { id: '110', groupNo: 'ZZ', name: '郑州分部', pinyin: 'zzfb zhengzhou', city: '郑州市', manager: '孙大伟', phone: '0371-6552077' },
      { id: '111', groupNo: 'XA', name: '西安分部', pinyin: 'xafb xian', city: '西安市', manager: '马振华', phone: '029-8441088' }
    ].map(n => ({ ...n, code: n.groupNo, groupName: n.name }))
  )

  const currentNetwork = ref<NetworkBranch>(networkList.value[0])

  // 2. 全国城市列表 (带拼音、默认省市区、关联终端网点、运输路线、价格体系)
  const cityList = ref<CityInfo[]>(
    [
      { code: '430400', areaName: '衡阳市', pinyin: 'hy hys hengyangshi', province: '湖南省', city: '衡阳市', defaultDistrict: '蒸湘区', matchedGroupId: '101', matchedGroupName: '衡阳营业部', shippingRoute: 1, weightPrice: 0.45, volumePrice: 110, piecePrice: 12, minFreight: 40 },
      { code: '430100', areaName: '长沙市', pinyin: 'cs css changshashi', province: '湖南省', city: '长沙市', defaultDistrict: '雨花区', matchedGroupId: '102', matchedGroupName: '长沙分部', shippingRoute: 1, weightPrice: 0.5, volumePrice: 120, piecePrice: 15, minFreight: 50 },
      { code: '420100', areaName: '武汉市', pinyin: 'wh whs wuhanshi', province: '湖北省', city: '武汉市', defaultDistrict: '东西湖区', matchedGroupId: '103', matchedGroupName: '武汉分部', shippingRoute: 1, weightPrice: 0.6, volumePrice: 140, piecePrice: 18, minFreight: 60 },
      { code: '310100', areaName: '上海市', pinyin: 'sh shs shanghaishi', province: '上海市', city: '上海市', defaultDistrict: '嘉定区', matchedGroupId: '104', matchedGroupName: '上海分部', shippingRoute: 1, weightPrice: 0.8, volumePrice: 180, piecePrice: 22, minFreight: 80 },
      { code: '110100', areaName: '北京市', pinyin: 'bj bjs beijingshi', province: '北京市', city: '北京市', defaultDistrict: '大兴区', matchedGroupId: '105', matchedGroupName: '北京分部', shippingRoute: 1, weightPrice: 0.9, volumePrice: 210, piecePrice: 25, minFreight: 90 },
      { code: '510100', areaName: '成都市', pinyin: 'cd cds chengdushi', province: '四川省', city: '成都市', defaultDistrict: '新都区', matchedGroupId: '106', matchedGroupName: '成都分部', shippingRoute: 1, weightPrice: 0.85, volumePrice: 190, piecePrice: 24, minFreight: 85 },
      { code: '330100', areaName: '杭州市', pinyin: 'hz hzs hangzhoushi', province: '浙江省', city: '杭州市', defaultDistrict: '萧山区', matchedGroupId: '107', matchedGroupName: '杭州分部', shippingRoute: 1, weightPrice: 0.75, volumePrice: 170, piecePrice: 20, minFreight: 70 },
      { code: '440100', areaName: '广州市', pinyin: 'gz gzs guangzhoushi', province: '广东省', city: '广州市', defaultDistrict: '白云区', matchedGroupId: '100', matchedGroupName: '总部', shippingRoute: 1, weightPrice: 0.35, volumePrice: 80, piecePrice: 10, minFreight: 30 },
      { code: '440600', areaName: '佛山市', pinyin: 'fs fss foshanshi', province: '广东省', city: '佛山市', defaultDistrict: '南海区', matchedGroupId: '108', matchedGroupName: '佛山分部', shippingRoute: 1, weightPrice: 0.35, volumePrice: 85, piecePrice: 10, minFreight: 35 },
      { code: '440300', areaName: '深圳市', pinyin: 'sz szs shenzhenshi', province: '广东省', city: '深圳市', defaultDistrict: '宝安区', matchedGroupId: '109', matchedGroupName: '深圳分部', shippingRoute: 1, weightPrice: 0.4, volumePrice: 95, piecePrice: 12, minFreight: 40 },
      { code: '410100', areaName: '郑州市', pinyin: 'zz zzs zhengzhoushi', province: '河南省', city: '郑州市', defaultDistrict: '管城回族区', matchedGroupId: '110', matchedGroupName: '郑州分部', shippingRoute: 1, weightPrice: 0.7, volumePrice: 165, piecePrice: 20, minFreight: 70 },
      { code: '610100', areaName: '西安市', pinyin: 'xa xas xianshi', province: '陕西省', city: '西安市', defaultDistrict: '未央区', matchedGroupId: '111', matchedGroupName: '西安分部', shippingRoute: 1, weightPrice: 0.8, volumePrice: 185, piecePrice: 22, minFreight: 80 },
      { code: '320500', areaName: '苏州市', pinyin: 'sz szs suzhoushi', province: '江苏省', city: '苏州市', defaultDistrict: '昆山市', matchedGroupId: '104', matchedGroupName: '上海分部', shippingRoute: 2, weightPrice: 0.82, volumePrice: 185, piecePrice: 22, minFreight: 80 },
      { code: '320100', areaName: '南京市', pinyin: 'nj njs nanjingshi', province: '江苏省', city: '南京市', defaultDistrict: '江宁区', matchedGroupId: '107', matchedGroupName: '杭州分部', shippingRoute: 2, weightPrice: 0.78, volumePrice: 175, piecePrice: 20, minFreight: 75 },
      { code: '500100', areaName: '重庆市', pinyin: 'cq cqs chongqingshi', province: '重庆市', city: '重庆市', defaultDistrict: '九龙坡区', matchedGroupId: '106', matchedGroupName: '成都分部', shippingRoute: 2, weightPrice: 0.85, volumePrice: 195, piecePrice: 23, minFreight: 85 },
      { code: '441900', areaName: '东莞市', pinyin: 'dg dgs dongguanshi', province: '广东省', city: '东莞市', defaultDistrict: '虎门镇', matchedGroupId: '109', matchedGroupName: '深圳分部', shippingRoute: 1, weightPrice: 0.38, volumePrice: 90, piecePrice: 10, minFreight: 35 },
      { code: '430200', areaName: '株洲市', pinyin: 'zz zzs zhuzhoushi', province: '湖南省', city: '株洲市', defaultDistrict: '芦淞区', matchedGroupId: '102', matchedGroupName: '长沙分部', shippingRoute: 2, weightPrice: 0.52, volumePrice: 125, piecePrice: 15, minFreight: 50 },
      { code: '330200', areaName: '宁波市', pinyin: 'nb nbs ningboshi', province: '浙江省', city: '宁波市', defaultDistrict: '鄞州区', matchedGroupId: '107', matchedGroupName: '杭州分部', shippingRoute: 2, weightPrice: 0.78, volumePrice: 175, piecePrice: 21, minFreight: 75 },
      { code: '420600', areaName: '襄阳市', pinyin: 'xy xys xiangyangshi', province: '湖北省', city: '襄阳市', defaultDistrict: '樊城区', matchedGroupId: '103', matchedGroupName: '武汉分部', shippingRoute: 2, weightPrice: 0.65, volumePrice: 150, piecePrice: 18, minFreight: 65 }
    ].map(c => ({
      ...c,
      name: c.areaName,
      matchedBranch: c.matchedGroupName,
      routeType: c.shippingRoute === 1 ? '专线直达' : '本地外发',
      defaultRegion: `${c.province}-${c.city}-${c.defaultDistrict}`
    }))
  )

  function searchCities(keyword = ''): CityInfo[] {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return cityList.value
    return cityList.value.filter(
      c =>
        c.areaName.toLowerCase().includes(kw) ||
        c.pinyin.toLowerCase().includes(kw) ||
        c.province.toLowerCase().includes(kw) ||
        c.code.includes(kw)
    )
  }

  // 3. 发货方客户档案 (支持姓名/手机/座机/单位/地址/拼音首字母全方位联想)
  const shipperArchives = ref<CustomerArchive[]>(
    [
      {
        id: 'SHP001',
        name: '张伟',
        pinyin: 'zw zhangwei gzhdsm',
        phone: '13800138801',
        tel: '020-86651001',
        unit: '广州宏达商贸有限公司',
        idCard: '440103198605122319',
        province: '广东省',
        city: '广州市',
        area: '白云区',
        address: '石井大道林安物流园A区12栋108号',
        goodsName: '五金建材',
        pack: '木箱',
        defaultPayType: '现付',
        historyCount: 48
      },
      {
        id: 'SHP002',
        name: '刘芳',
        pinyin: 'lf liufang fsmdjd',
        phone: '13922334455',
        tel: '0757-83329900',
        unit: '佛山美的家电制造厂',
        idCard: '440604199008194126',
        province: '广东省',
        city: '佛山市',
        area: '顺德区',
        address: '北滘镇工业大道美的智能物流中心3号门',
        goodsName: '数码家电',
        pack: '纸箱',
        defaultPayType: '月结',
        historyCount: 132
      },
      {
        id: 'SHP003',
        name: '周建军',
        pinyin: 'zjj zhoujianjun gzhxdz',
        phone: '13711223344',
        tel: '020-87712088',
        unit: '广州华星电子科技有限公司',
        idCard: '440106198211035512',
        province: '广东省',
        city: '广州市',
        area: '黄埔区',
        address: '科学城光谱中路19号华星科技园B座',
        goodsName: '电子产品',
        pack: '托盘',
        defaultPayType: '月结',
        historyCount: 85
      },
      {
        id: 'SHP004',
        name: '陈志强',
        pinyin: 'czq chenzhiqiang gzbspj',
        phone: '13688990011',
        tel: '020-36689912',
        unit: '广州博世汽配供应链中心',
        idCard: '44011119880324113X',
        province: '广东省',
        city: '广州市',
        area: '花都区',
        address: '炭步镇汽车城工业园博世中心仓',
        goodsName: '汽车配件',
        pack: '木架',
        defaultPayType: '回单付',
        historyCount: 64
      },
      {
        id: 'SHP005',
        name: '黄丽娟',
        pinyin: 'hlj huanglijuan zsfsfz',
        phone: '13566778899',
        tel: '020-89901122',
        unit: '中大瑞纺服装批发贸易行',
        idCard: '440105199107153321',
        province: '广东省',
        city: '广州市',
        area: '天河区',
        address: '沙河濂泉路服装批发城C栋205档',
        goodsName: '服装纺织',
        pack: '编织袋',
        defaultPayType: '提付',
        historyCount: 91
      },
      {
        id: 'SHP006',
        name: '林国栋',
        pinyin: 'lgd linguodong szbyd',
        phone: '15811882299',
        tel: '0755-89923311',
        unit: '深圳精密仪器设备有限公司',
        idCard: '440306198409102258',
        province: '广东省',
        city: '深圳市',
        area: '宝安区',
        address: '西乡街道铁仔山科技园5栋1楼',
        goodsName: '精密仪器',
        pack: '木箱',
        defaultPayType: '现付',
        historyCount: 37
      },
      {
        id: 'SHP007',
        name: '郭振华',
        pinyin: 'gzh guozhenhua dghmjj',
        phone: '18922887766',
        tel: '0769-85516688',
        unit: '东莞鸿铭家居实业有限公司',
        idCard: '441900198012186614',
        province: '广东省',
        city: '东莞市',
        area: '虎门镇',
        address: '大宁工业区康泰路88号鸿铭家具厂',
        goodsName: '家具家电',
        pack: '木架',
        defaultPayType: '提付',
        historyCount: 52
      },
      {
        id: 'SHP008',
        name: '郑晓明',
        pinyin: 'zxm zhengxiaoming gzkyhg',
        phone: '13455667788',
        tel: '020-82293344',
        unit: '广东科源新材料化工有限公司',
        idCard: '440112198706224417',
        province: '广东省',
        city: '广州市',
        area: '番禺区',
        address: '化龙镇现代产业园科源路6号',
        goodsName: '化工原料',
        pack: '塑料桶',
        defaultPayType: '月结',
        historyCount: 29
      }
    ].map(item => ({ ...item, defaultGoodsName: item.goodsName, defaultPack: item.pack }))
  )

  // 4. 收货方客户档案 (支持姓名/手机/座机/单位/城市/拼音首字母全方位联想，选定后自动联动到站城市与终端网点)
  const receiverArchives = ref<CustomerArchive[]>(
    [
      {
        id: 'RCV001',
        name: '李明',
        pinyin: 'lm liming csxhsm',
        phone: '13907319901',
        tel: '0731-84451122',
        unit: '长沙星辉商贸集团',
        idCard: '430102198504113318',
        province: '湖南省',
        city: '长沙市',
        area: '雨花区',
        address: '高桥大市场现代商贸城4栋112号',
        goodsName: '五金建材',
        pack: '木箱'
      },
      {
        id: 'RCV002',
        name: '唐建国',
        pinyin: 'tjg tangjianguo hyxfls',
        phone: '13807346688',
        tel: '0734-82291100',
        unit: '衡阳湘南机电设备经销部',
        idCard: '430408198109234415',
        province: '湖南省',
        city: '衡阳市',
        area: '蒸湘区',
        address: '华新开发区解放大道58号湘南机电城A区8号',
        goodsName: '机械配件',
        pack: '木箱'
      },
      {
        id: 'RCV003',
        name: '王强',
        pinyin: 'wq wangqiang whJdwl',
        phone: '13602718822',
        tel: '027-83365511',
        unit: '武汉江汉工业园供应链中心',
        idCard: '420103198711192236',
        province: '湖北省',
        city: '武汉市',
        area: '东西湖区',
        address: '走马岭街道革新大道168号京东华中物流园2号库',
        goodsName: '数码家电',
        pack: '纸箱'
      },
      {
        id: 'RCV004',
        name: '孙丽',
        pinyin: 'sl sunli shbhmy',
        phone: '13502117733',
        tel: '021-69918822',
        unit: '上海百联贸易发展有限公司',
        idCard: '310114199203085527',
        province: '上海市',
        city: '上海市',
        area: '嘉定区',
        address: '南翔镇宝翔路888号百联华东配送中心5号月台',
        goodsName: '电子产品',
        pack: '托盘'
      },
      {
        id: 'RCV005',
        name: '赵雷',
        pinyin: 'zl zhaolei cdxdfz',
        phone: '13880015566',
        tel: '028-83392211',
        unit: '成都西南国际商贸城服饰中心',
        idCard: '510104198907146619',
        province: '四川省',
        city: '成都市',
        area: '新都区',
        address: '北星大道一段荷花池国际商贸城3区109号',
        goodsName: '服装纺织',
        pack: '编织袋'
      },
      {
        id: 'RCV006',
        name: '马云飞',
        pinyin: 'myf mayunfei bjdxwl',
        phone: '13910248899',
        tel: '010-67793300',
        unit: '北京京南智联仓储配送中心',
        idCard: '110115198305291134',
        province: '北京市',
        city: '北京市',
        area: '大兴区',
        address: '亦庄经济开发区科创十一街18号院3号库',
        goodsName: '精密仪器',
        pack: '木箱'
      },
      {
        id: 'RCV007',
        name: '沈佳妮',
        pinyin: 'sjn shenjiani hzxsjj',
        phone: '13757126699',
        tel: '0571-82287766',
        unit: '杭州钱江现代家居广场',
        idCard: '330109199310124428',
        province: '浙江省',
        city: '杭州市',
        area: '萧山区',
        address: '通惠南路999号钱江家居物流园C区15号',
        goodsName: '家具家电',
        pack: '木架'
      },
      {
        id: 'RCV008',
        name: '韩立新',
        pinyin: 'hlx hanlixin zzqpzx',
        phone: '13537198800',
        tel: '0371-66689911',
        unit: '郑州中原国际汽配大世界',
        idCard: '410104198402195511',
        province: '河南省',
        city: '郑州市',
        area: '管城回族区',
        address: '航海东路126号中原汽配城B栋18号',
        goodsName: '汽车配件',
        pack: '木箱'
      }
    ].map(item => ({ ...item, defaultGoodsName: item.goodsName, defaultPack: item.pack }))
  )

  function searchShippers(keyword = ''): CustomerArchive[] {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return shipperArchives.value
    return shipperArchives.value.filter(
      item =>
        item.name.toLowerCase().includes(kw) ||
        item.pinyin.toLowerCase().includes(kw) ||
        item.phone.includes(kw) ||
        item.tel.includes(kw) ||
        item.unit.toLowerCase().includes(kw) ||
        item.city.toLowerCase().includes(kw) ||
        item.address.toLowerCase().includes(kw)
    )
  }

  function searchReceivers(keyword = '', destCity = ''): CustomerArchive[] {
    const kw = keyword.trim().toLowerCase()
    const list = [...receiverArchives.value]
    // 若已选到站城市且无关键字，优先把该城市的收货方排在前面
    if (!kw && destCity) {
      list.sort((a, b) => {
        const aMatch = a.city === destCity ? 0 : 1
        const bMatch = b.city === destCity ? 0 : 1
        return aMatch - bMatch
      })
      return list
    }
    if (!kw) return list
    return list.filter(
      item =>
        item.name.toLowerCase().includes(kw) ||
        item.pinyin.toLowerCase().includes(kw) ||
        item.phone.includes(kw) ||
        item.tel.includes(kw) ||
        item.unit.toLowerCase().includes(kw) ||
        item.city.toLowerCase().includes(kw) ||
        item.address.toLowerCase().includes(kw)
    )
  }

  function upsertCustomerArchive(type: 'shipper' | 'receiver', data: Partial<CustomerArchive>) {
    if (!data.name || !data.phone) return
    const targetList = type === 'shipper' ? shipperArchives : receiverArchives
    const idx = targetList.value.findIndex(c => c.name === data.name && c.phone === data.phone)
    if (idx !== -1) {
      targetList.value[idx] = { ...targetList.value[idx], ...data }
      const [item] = targetList.value.splice(idx, 1)
      targetList.value.unshift(item)
    } else {
      targetList.value.unshift({
        id: `${type === 'shipper' ? 'SHP' : 'RCV'}${Date.now().toString().slice(-4)}`,
        name: data.name,
        pinyin: `${data.name} ${data.unit || ''}`,
        phone: data.phone,
        tel: data.tel || '',
        unit: data.unit || '',
        idCard: data.idCard || '',
        province: data.province || '广东省',
        city: data.city || '广州市',
        area: data.area || '白云区',
        address: data.address || '',
        goodsName: data.goodsName || data.defaultGoodsName || '普货',
        pack: data.pack || data.defaultPack || '纸箱',
        defaultGoodsName: data.defaultGoodsName || data.goodsName || '普货',
        defaultPack: data.defaultPack || data.pack || '纸箱',
        historyCount: 1
      })
    }
  }

  // 5. 车辆与司机档案 (支持车牌号、司机姓名、手机号、拼音联想)
  const vehicleArchives = ref<VehicleArchive[]>(
    [
      {
        id: 'CAR001',
        plateNo: '粤A·99681挂',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '刘大柱',
        driverPhone: '13822119988',
        carType: '17.5米高低板',
        bankName: '中国建设银行广州白云支行',
        userName: '刘大柱',
        bankCard: '6217003320018899102',
        trailerNo: '粤A·9968挂',
        vinNo: 'LZZ5ELNB9MN102938',
        carrierName: '总部自有车队',
        pinyin: 'ya99681 ldz liudazhu'
      },
      {
        id: 'CAR002',
        plateNo: '粤A·83520挂',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '马志强',
        driverPhone: '13925003344',
        carType: '13.5米高栏',
        bankName: '中国工商银行广州天河支行',
        userName: '马志强',
        bankCard: '6222023602019928371',
        trailerNo: '粤A·8352挂',
        vinNo: 'LZZ5ELNB8MN556612',
        carrierName: '总部自有车队',
        pinyin: 'ya83520 mzq mazhiqiang'
      },
      {
        id: 'CAR003',
        plateNo: '湘D·66518',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '唐卫国',
        driverPhone: '13707348899',
        carType: '9.6米厢式',
        bankName: '中国农业银行衡阳蒸湘支行',
        userName: '唐卫国',
        bankCard: '6228480638812233445',
        carrierName: '衡阳专线车队',
        pinyin: 'xd66518 twg tangweiguo'
      },
      {
        id: 'CAR004',
        plateNo: '湘A·77109',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '彭建华',
        driverPhone: '13807315522',
        carType: '13.5米飞翼',
        bankName: '招商银行长沙雨花支行',
        userName: '彭建华',
        bankCard: '6225887310029988112',
        carrierName: '宏远干线运输队',
        pinyin: 'xa77109 pjh pengjianhua'
      },
      {
        id: 'CAR005',
        plateNo: '鄂A·52890挂',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '胡国庆',
        driverPhone: '13602719933',
        carType: '17.5米平板',
        bankName: '中国银行武汉东西湖支行',
        userName: '胡国庆',
        bankCard: '6216612700017766554',
        carrierName: '楚天快运车队',
        pinyin: 'ea52890 hgq huguoqing'
      },
      {
        id: 'CAR006',
        plateNo: '粤A·51203',
        plateColor: '蓝色',
        plateColorStr: '蓝色',
        driverName: '陈小虎',
        driverPhone: '13522331100',
        carType: '4.2米轻卡',
        bankName: '平安银行广州流花支行',
        userName: '陈小虎',
        bankCard: '6221558802003344119',
        carrierName: '广州短途接送车队',
        pinyin: 'ya51203 cxh chenxiaohu'
      },
      {
        id: 'CAR007',
        plateNo: '粤A·D30928',
        plateColor: '黄绿色',
        plateColorStr: '黄绿色',
        driverName: '黄家辉',
        driverPhone: '13728009911',
        carType: '4.2米新能源厢车',
        bankName: '中国邮政储蓄银行广州石井支行',
        userName: '黄家辉',
        bankCard: '6221885810028833776',
        carrierName: '广州新能源城配车队',
        pinyin: 'yad30928 hjh huangjiahui'
      },
      {
        id: 'CAR008',
        plateNo: '沪B·90812挂',
        plateColor: '黄色',
        plateColorStr: '黄色',
        driverName: '沈卫平',
        driverPhone: '13902187766',
        carType: '16.5米厢式挂车',
        bankName: '交通银行上海嘉定支行',
        userName: '沈卫平',
        bankCard: '6222600910025544332',
        carrierName: '华东干线快运车队',
        pinyin: 'hb90812 swp shenweiping'
      }
    ].map(v => ({ ...v, bankAccountName: v.userName, bankCardNo: v.bankCard }))
  )

  function searchVehicles(keyword = ''): VehicleArchive[] {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return vehicleArchives.value
    return vehicleArchives.value.filter(
      v =>
        v.plateNo.toLowerCase().includes(kw) ||
        v.driverName.toLowerCase().includes(kw) ||
        v.driverPhone.includes(kw) ||
        v.pinyin.toLowerCase().includes(kw)
    )
  }

  // 6. 外发承运商档案 (用于 本地外发 / 终端外发 / 指派承运商 联想)
  const carrierArchives = ref<CarrierArchive[]>([
    {
      id: 'CRR001',
      name: '顺心捷达快运专线',
      pinyin: 'sxjdky shunxinjieda',
      localPhone: '020-86215588',
      pickPhone: '0731-84429900',
      contactMan: '罗经理',
      city: '长沙市',
      address: '林安物流园B区5栋101-106档'
    },
    {
      id: 'CRR002',
      name: '安能物流三方专线部',
      pinyin: 'anwl annengwuliu',
      localPhone: '020-86217799',
      pickPhone: '027-83391122',
      contactMan: '邓队长',
      city: '武汉市',
      address: '石井安发物流园C区8栋12号'
    },
    {
      id: 'CRR003',
      name: '壹米滴答快运分拨',
      pinyin: 'ymdd yimidida',
      localPhone: '020-36528811',
      pickPhone: '021-69923344',
      contactMan: '许主管',
      city: '上海市',
      address: '太和镇华邦物流园A3栋15号'
    },
    {
      id: 'CRR004',
      name: '德邦大件联运专线',
      pinyin: 'dbdj debangdajian',
      localPhone: '020-95353',
      pickPhone: '010-87726655',
      contactMan: '韩经理',
      city: '北京市',
      address: '白云区太和货运市场D区1-5号'
    },
    {
      id: 'CRR005',
      name: '湘南通达衡阳快线',
      pinyin: 'xntd xiangnantongda hengyang',
      localPhone: '020-86692211',
      pickPhone: '0734-85518899',
      contactMan: '谢老板',
      city: '衡阳市',
      address: '容发物流园B2栋08档'
    },
    {
      id: 'CRR006',
      name: '川渝直达快运物流',
      pinyin: 'cyzd chuanyuzhida chengdu',
      localPhone: '020-86339900',
      pickPhone: '028-85597788',
      contactMan: '敬经理',
      city: '成都市',
      address: '丰和物流园E栋19-22档'
    }
  ])

  function searchCarriers(keyword = ''): CarrierArchive[] {
    const kw = keyword.trim().toLowerCase()
    if (!kw) return carrierArchives.value
    return carrierArchives.value.filter(
      c =>
        c.name.toLowerCase().includes(kw) ||
        c.pinyin.toLowerCase().includes(kw) ||
        c.localPhone.includes(kw) ||
        c.city.toLowerCase().includes(kw)
    )
  }

  // 7. 平台字典项 (品名、包装、型号、结算方式、交货方式、运输方式、回单要求、业务员、备注)
  const dictData = reactive<Record<string, DictOption[]>>({
    goodsName: [
      { name: '电子产品', value: '电子产品', pinyin: 'dzcp dianzichanpin', enabled: 1 },
      { name: '五金建材', value: '五金建材', pinyin: 'wjjc wujinjiancai', enabled: 1 },
      { name: '机械配件', value: '机械配件', pinyin: 'jxpj jixiepeijian', enabled: 1 },
      { name: '汽车配件', value: '汽车配件', pinyin: 'qcpj qichepeijian', enabled: 1 },
      { name: '服装纺织', value: '服装纺织', pinyin: 'fzfz fuzhuangfangzhi', enabled: 1 },
      { name: '数码家电', value: '数码家电', pinyin: 'smjd shumajiadian', enabled: 1 },
      { name: '家具家电', value: '家具家电', pinyin: 'jjjd jiajujiadian', enabled: 1 },
      { name: '食品饮料', value: '食品饮料', pinyin: 'spyl shipinyinliao', enabled: 1 },
      { name: '日用百货', value: '日用百货', pinyin: 'rybh riyongbaihuo', enabled: 1 },
      { name: '化工原料', value: '化工原料', pinyin: 'hgyl huagongyuanliao', enabled: 1 },
      { name: '精密仪器', value: '精密仪器', pinyin: 'jmyq jingmiyiqi', enabled: 1 },
      { name: '塑料制品', value: '塑料制品', pinyin: 'slzp suliaozhipin', enabled: 1 },
      { name: '医药保健', value: '医药保健', pinyin: 'yybj yiyaobaojian', enabled: 1 },
      { name: '办公用品', value: '办公用品', pinyin: 'bgyp bangongyongpin', enabled: 1 }
    ],
    pack: [
      { name: '纸箱', value: '纸箱', pinyin: 'zx zhixiang', enabled: 1 },
      { name: '木箱', value: '木箱', pinyin: 'mx muxiang', enabled: 1 },
      { name: '托盘', value: '托盘', pinyin: 'tp tuopan', enabled: 1 },
      { name: '木架', value: '木架', pinyin: 'mj mujia', enabled: 1 },
      { name: '编织袋', value: '编织袋', pinyin: 'bzd bianzhidai', enabled: 1 },
      { name: '塑料桶', value: '塑料桶', pinyin: 'slt suliaotong', enabled: 1 },
      { name: '铁桶', value: '铁桶', pinyin: 'tt tietong', enabled: 1 },
      { name: '纤袋', value: '纤袋', pinyin: 'xd xiandai', enabled: 1 },
      { name: '缠绕膜', value: '缠绕膜', pinyin: 'crm chanraomo', enabled: 1 },
      { name: '裸装', value: '裸装', pinyin: 'lz luozhuang', enabled: 1 }
    ],
    model: [
      { name: '标准型', value: '标准型', pinyin: 'bzx biaozhunxing', enabled: 1 },
      { name: 'A型', value: 'A型', pinyin: 'ax axing', enabled: 1 },
      { name: 'B型', value: 'B型', pinyin: 'bx bxing', enabled: 1 },
      { name: '大件', value: '大件', pinyin: 'dj dajian', enabled: 1 },
      { name: '小件', value: '小件', pinyin: 'xj xiaojian', enabled: 1 },
      { name: '重货', value: '重货', pinyin: 'zh zhonghuo', enabled: 1 },
      { name: '泡货', value: '泡货', pinyin: 'ph paohuo', enabled: 1 },
      { name: '特规', value: '特规', pinyin: 'tg tegui', enabled: 1 }
    ],
    payType: [
      { name: '现付', value: '现付', dicValue: 1, pinyin: 'xf xianfu', enabled: 1 },
      { name: '提付', value: '提付', dicValue: 2, pinyin: 'tf tifu', enabled: 1 },
      { name: '回单付', value: '回单付', dicValue: 3, pinyin: 'hdf huidanfu', enabled: 1 },
      { name: '月结', value: '月结', dicValue: 4, pinyin: 'yj yuejie', enabled: 1 },
      { name: '货款扣', value: '货款扣', dicValue: 5, pinyin: 'hkk huokuankou', enabled: 1 },
      { name: '多笔付', value: '多笔付', dicValue: 6, pinyin: 'dbf duobifu', enabled: 1 }
    ],
    deliveryType: [
      { name: '自提', value: '自提', dicValue: 1, pinyin: 'zt ziti', enabled: 1 },
      { name: '送货', value: '送货', dicValue: 2, pinyin: 'sh songhuo', enabled: 1 },
      { name: '送货上楼', value: '送货上楼', dicValue: 3, pinyin: 'shsl songhuoshanglou', enabled: 1 },
      { name: '送货进仓', value: '送货进仓', dicValue: 4, pinyin: 'shjc songhuojincang', enabled: 1 },
      { name: '大车直送', value: '大车直送', dicValue: 5, pinyin: 'dczs dachezhisong', enabled: 1 }
    ],
    shippingType: [
      { name: '普通汽运', value: '普通汽运', pinyin: 'ptqy putongqiyun', enabled: 1 },
      { name: '快运专线', value: '快运专线', pinyin: 'kyzx kuaiyunzhuanxian', enabled: 1 },
      { name: '整车运输', value: '整车运输', pinyin: 'zcys zhengcheyunshu', enabled: 1 },
      { name: '冷链运输', value: '冷链运输', pinyin: 'llys lenglianyunshu', enabled: 1 },
      { name: '航空运输', value: '航空运输', pinyin: 'hkys hangkongyunshu', enabled: 1 }
    ],
    receipt: [
      { name: '签回单', value: '签回单', pinyin: 'qhd qianhuidan', enabled: 1 },
      { name: '信封', value: '信封', pinyin: 'xf xinfeng', enabled: 1 },
      { name: '传真', value: '传真', pinyin: 'cz chuanzhen', enabled: 1 },
      { name: '电子回单', value: '电子回单', pinyin: 'dzhd dianzihuidan', enabled: 1 },
      { name: '收条', value: '收条', pinyin: 'st shoutiao', enabled: 1 },
      { name: '原件返回', value: '原件返回', pinyin: 'yjfh yuanjianfanhui', enabled: 1 }
    ],
    salesMan: [
      { name: '张经理', value: '张经理', pinyin: 'zjl zhangjingli', enabled: 1 },
      { name: '李成龙', value: '李成龙', pinyin: 'lcl lichenglong', enabled: 1 },
      { name: '王建国', value: '王建国', pinyin: 'wjg wangjianguo', enabled: 1 },
      { name: '赵敏', value: '赵敏', pinyin: 'zm zhaomin', enabled: 1 },
      { name: '刘洋', value: '刘洋', pinyin: 'ly liuyang', enabled: 1 },
      { name: '陈静', value: '陈静', pinyin: 'cj chenjing', enabled: 1 }
    ],
    remark: [
      { name: '轻拿轻放，切勿倒置', value: '轻拿轻放，切勿倒置', pinyin: 'qnqf qingnaqingfang', enabled: 1 },
      { name: '易碎品，小心轻放', value: '易碎品，小心轻放', pinyin: 'ysp yisuipin', enabled: 1 },
      { name: '防潮防湿，切勿淋雨', value: '防潮防湿，切勿淋雨', pinyin: 'fcfs fangchaofangshi', enabled: 1 },
      { name: '加急件，优先派送', value: '加急件，优先派送', pinyin: 'jjj jiajijian', enabled: 1 },
      { name: '到站自提，电话通知', value: '到站自提，电话通知', pinyin: 'dzzt daozhanziti', enabled: 1 },
      { name: '送货上楼，需提前预约', value: '送货上楼，需提前预约', pinyin: 'shsl songhuoshanglou', enabled: 1 },
      { name: '等通知放货，勿擅自派送', value: '等通知放货，勿擅自派送', pinyin: 'dtzfh dengtongzhifanghuo', enabled: 1 },
      { name: '签回单原件返回', value: '签回单原件返回', pinyin: 'qhdyjfh qianhuidan', enabled: 1 }
    ]
  })

  function queryDictSuggestions(dictKey: string, queryString = '') {
    const aliasMap: Record<string, string> = {
      deliveryMethod: 'deliveryType',
      transportMethod: 'shippingType',
      receiptReq: 'receipt',
      salesman: 'salesMan'
    }
    const realKey = aliasMap[dictKey] || dictKey
    const list = (dictData[realKey] || []).map(item => ({
      ...item,
      label: item.name
    }))
    const kw = (queryString || '').trim().toLowerCase()
    if (!kw) return list
    return list.filter(
      item => item.name.toLowerCase().includes(kw) || item.pinyin.toLowerCase().includes(kw)
    )
  }

  // 8. 智能地址识别解析器 (1:1 复刻 EventMonitor autoParse)
  function parseSmartAddressText(rawText: string) {
    const text = (rawText || '').trim()
    if (!text) {
      return {
        name: '',
        mobile: '',
        phone: '',
        tel: '',
        unit: '',
        province: '',
        city: '',
        area: '',
        region: '',
        regionStr: '',
        address: '',
        detailAddress: ''
      }
    }

    // 匹配手机号或座机
    const phoneMatch = text.match(/(1[3-9]\d{9})/)
    const telMatch = text.match(/(0\d{2,3}-?\d{7,8})/)
    const phone = phoneMatch ? phoneMatch[1] : telMatch ? telMatch[1] : ''

    // 移除电话后切分片段
    const cleaned = text
      .replace(phoneMatch?.[0] || '', ' ')
      .replace(telMatch?.[0] || '', ' ')
      .replace(/[，,；;。|\n\t]+/g, ' ')
      .trim()

    // 尝试匹配省市区
    let matchedRegion = ''
    let province = ''
    let city = ''
    let area = ''
    let detailAddress = cleaned

    for (const reg of FLAT_REGIONS) {
      const cityShort = reg.city.replace('市', '')
      const areaShort = reg.area.replace(/[区县市镇]/g, '')
      if (
        cleaned.includes(reg.city) ||
        cleaned.includes(cityShort) ||
        (areaShort.length >= 2 && cleaned.includes(areaShort))
      ) {
        if (cleaned.includes(reg.area) || (areaShort.length >= 2 && cleaned.includes(areaShort))) {
          matchedRegion = reg.fullText
          province = reg.province
          city = reg.city
          area = reg.area
          break
        } else if (!matchedRegion) {
          matchedRegion = reg.fullText
          province = reg.province
          city = reg.city
          area = reg.area
        }
      }
    }

    const tokens = cleaned.split(/\s+/).filter(Boolean)
    let name = ''
    let unit = ''

    for (const tk of tokens) {
      if (
        tk.length >= 2 &&
        tk.length <= 4 &&
        !tk.includes('省') &&
        !tk.includes('市') &&
        !tk.includes('区') &&
        !tk.includes('路') &&
        !tk.includes('街') &&
        !tk.includes('号') &&
        !tk.includes('公司') &&
        !tk.includes('厂') &&
        !tk.includes('钢')
      ) {
        if (!name) name = tk
      } else if (
        tk.includes('公司') ||
        tk.includes('集团') ||
        tk.includes('厂') ||
        tk.includes('商贸') ||
        tk.includes('部') ||
        tk.includes('中心') ||
        tk.includes('行') ||
        tk.includes('钢管')
      ) {
        if (!unit && tk.length <= 18) unit = tk
      }
    }

    // 整理详细地址
    detailAddress = tokens
      .filter(tk => tk !== name && tk !== unit)
      .join(' ')
      .replace(province, '')
      .replace(city, '')
      .replace(area, '')
      .trim()

    if (!name && tokens.length > 0) {
      name = tokens[0].slice(0, 4)
    }

    const finalPhone = phone || '13800138000'
    const finalRegion = matchedRegion || '广东省-广州市-白云区'
    const finalAddress = detailAddress || cleaned

    return {
      name: name || '张先生',
      mobile: finalPhone,
      phone: finalPhone,
      tel: telMatch ? telMatch[1] : '',
      unit,
      province: province || '广东省',
      city: city || '广州市',
      area: area || '白云区',
      region: finalRegion,
      regionStr: finalRegion,
      address: finalAddress,
      detailAddress: finalAddress
    }
  }

  // 9. 开单界面 8 大设置项状态 (支持实时生效与持久化)
  const uiLayoutConfig = reactive({
    showSecondGoodsRow: true,
    showServiceSection: true,
    showIdCardField: true,
    showExtraFeeRow: false,
    compactMode: false,
    displayDriver: true,
    showUnitPrices: false,
    showExtraIncomeFees: false,
    showExtraPayFees: false,
    personFields: {
      shipper: true,
      shipPhone: true,
      shipTel: true,
      shipUnit: true,
      shipIdCard: true,
      ship_address: true,
      shipAddress: true,
      receiver: true,
      receivePhone: true,
      receiveTel: true,
      receiveUnit: true,
      receiveIdCard: true,
      receive_address: true,
      receiveAddress: true
    }
  })

  // 光标路径字段全集
  const allFocusFields = [
    { key: 'shipOrderNo', name: '运单号', label: '运单号', section: '顶部路由' },
    { key: 'createDate', name: '托运日期', label: '托运日期', section: '顶部路由' },
    { key: 'startNetwork', name: '始发地', label: '始发地', section: '顶部路由' },
    { key: 'destCity', name: '到站城市', label: '到站城市', section: '顶部路由' },
    { key: 'transportRoute', name: '运输路线', label: '运输路线', section: '顶部路由' },
    { key: 'endNetwork', name: '终端网点', label: '终端网点', section: '顶部路由' },
    { key: 'goodsNo', name: '货号', label: '货号', section: '顶部路由' },
    { key: 'shipperName', name: '发货方', label: '发货方', section: '发货方' },
    { key: 'shipperMobile', name: '发货手机', label: '发货手机', section: '发货方' },
    { key: 'shipperTel', name: '发货座机', label: '发货座机', section: '发货方' },
    { key: 'shipperUnit', name: '发货单位', label: '发货单位', section: '发货方' },
    { key: 'shipperIdCard', name: '发货证件', label: '发货证件', section: '发货方' },
    { key: 'shipperRegion', name: '发货区域', label: '发货区域', section: '发货方' },
    { key: 'shipperAddress', name: '发货地址', label: '发货地址', section: '发货方' },
    { key: 'receiverName', name: '收货方', label: '收货方', section: '收货方' },
    { key: 'receiverMobile', name: '收货手机', label: '收货手机', section: '收货方' },
    { key: 'receiverTel', name: '收货座机', label: '收货座机', section: '收货方' },
    { key: 'receiverUnit', name: '收货单位', label: '收货单位', section: '收货方' },
    { key: 'receiverIdCard', name: '收货证件', label: '收货证件', section: '收货方' },
    { key: 'receiverRegion', name: '收货区域', label: '收货区域', section: '收货方' },
    { key: 'receiverAddress', name: '收货地址', label: '收货地址', section: '收货方' },
    { key: 'goodsName1', name: '品名(行1)', label: '品名(行1)', section: '货物明细' },
    { key: 'pack1', name: '包装(行1)', label: '包装(行1)', section: '货物明细' },
    { key: 'model1', name: '型号(行1)', label: '型号(行1)', section: '货物明细' },
    { key: 'num1', name: '件数(行1)', label: '件数(行1)', section: '货物明细' },
    { key: 'weight1', name: '重量(行1)', label: '重量(行1)', section: '货物明细' },
    { key: 'volume1', name: '体积(行1)', label: '体积(行1)', section: '货物明细' },
    { key: 'baseFee1', name: '基本运费(行1)', label: '基本运费(行1)', section: '货物明细' },
    { key: 'payType', name: '结算方式', label: '结算方式', section: '结算与服务' },
    { key: 'deliveryMethod', name: '交货方式', label: '交货方式', section: '结算与服务' },
    { key: 'transportMethod', name: '运输方式', label: '运输方式', section: '结算与服务' },
    { key: 'receiptReq', name: '回单要求', label: '回单要求', section: '结算与服务' },
    { key: 'salesman', name: '业务员', label: '业务员', section: '结算与服务' },
    { key: 'remark', name: '备注', label: '备注', section: '结算与服务' }
  ]

  // 已选光标路径顺序
  const cursorPathKeys = ref<string[]>([
    'destCity',
    'shipperName',
    'shipperMobile',
    'shipperAddress',
    'receiverName',
    'receiverMobile',
    'receiverAddress',
    'goodsName1',
    'pack1',
    'num1',
    'weight1',
    'volume1',
    'baseFee1',
    'payType',
    'deliveryMethod',
    'remark'
  ])

  // 必填字段集合
  const requiredFieldKeys = ref<string[]>([
    'shipOrderNo',
    'createDate',
    'destCity',
    'transportRoute',
    'endNetwork',
    'shipperName',
    'shipperMobile',
    'receiverName',
    'receiverMobile',
    'goodsName1',
    'num1',
    'payType'
  ])

  // 用户行为设置 (保存后各字段的处理方式)
  const userBehaviors = ref<UserBehaviorItem[]>([
    { id: 'ub1', key: 'autoSaveCustomer', filed: '自动保存客户档案', name: '保存运单时自动将新收发货人写入客户档案', enabled: true, desc: '下次开单输入姓名或手机号可直接联想带出', type: '1', value: '1' },
    { id: 'ub2', key: 'autoCalcFreight', filed: '自动计算基本运费', name: '根据到站城市路线价格体系自动计算基本运费', enabled: true, desc: '输入件重体或切换城市时自动按单价与起步价计算', type: '1', value: '1' },
    { id: 'ub3', key: 'autoLinkBranch', filed: '收货方自动联动到站', name: '选中收货人档案后自动联动到站城市与终端网点', enabled: true, desc: '若收货人所在城市有匹配网点则自动填充', type: '1', value: '1' },
    { id: 'ub4', key: 'keepStartNetwork', filed: '保留始发网点', name: '保存运单后保留上一次选择的始发地与运输方式', enabled: true, desc: '适用于同一网点连续批量录单场景', type: '1', value: '总部' },
    { id: 'ub5', key: 'enterJumpNext', filed: '回车光标路径跳转', name: '按下 Enter 键按【光标路径设置】顺序自动跳转下一输入框', enabled: true, desc: '全键盘盲打极速开单模式', type: '1', value: '1' },
    { id: 'ub6', key: 'autoFillDefaultGoods', filed: '带出客户常发品名', name: '选中发货人档案时自动带出其常发品名与包装', enabled: true, desc: '若第一行货物明细为空则自动填入', type: '1', value: '1' }
  ])

  // 单号与货号规则设置
  const numberRules = reactive({
    waybillAutoGenerate: true,
    waybillPrefix: 'KB',
    waybillDateFmt: 'YYMMDD',
    waybillSerialDigits: 4,
    currentSerial: 96,
    goodsNoAutoByNum: true,
    goodsNoPrefix: '0',
    orderNoRuleType: 2, // 0: 手动输入, 1: 纯数字递增, 2: 前缀+日期+流水号
    orderNoPrefix: 'KB',
    orderNoEditable: true,
    goodsNoRuleType: 2, // 0: 不生成, 1: 运单号后4位-件数, 2: 到站网点序号-件数 (如 0-1)
    goodsNoEditable: true,
    autoCalcFreightByPriceSystem: true, // 是否启用价格体系自动计算运费
    premiumRate: 0.002, // 声明价值保费费率 2‰
    collectServiceRate: 0.005, // 代收货款手续费率 5‰
    feeFormulaFields: [
      'freight',
      'fDelivery',
      'fReceive',
      'fPremium',
      'ysOtherOne',
      'ysOtherTwo',
      'ysOtherThree'
    ]
  })

  function generateNewWaybillNo(seq = 1): string {
    const now = new Date()
    const yFull = now.getFullYear().toString()
    const y = numberRules.waybillDateFmt === 'YYYYMMDD' ? yFull : yFull.slice(-2)
    const m = String(now.getMonth() + 1).padStart(2, '0')
    const d = String(now.getDate()).padStart(2, '0')
    numberRules.currentSerial += seq
    const digits = numberRules.waybillSerialDigits || 4
    const serial = String(numberRules.currentSerial).padStart(digits, '0')
    const prefix = numberRules.waybillPrefix || numberRules.orderNoPrefix || 'KB'
    return `${prefix}${y}${m}${d}${serial}`
  }

  function generateGoodsNo(arg1: string, totalPieces: number, _arg3 = ''): string {
    const pcs = Number(totalPieces) > 0 ? Number(totalPieces) : 1
    if (numberRules.goodsNoRuleType === 0 || !numberRules.goodsNoAutoByNum) return ''
    if (numberRules.goodsNoRuleType === 1) {
      const tail = (arg1 || '0001').slice(-4)
      return `${tail}-${pcs}`
    }
    const prefix = numberRules.goodsNoPrefix || '0'
    return `${prefix}-${pcs}`
  }

  // 根据价格体系自动计算单行运费 (支持传入 (destCity, num, weight, volume) 或 (destCity, rowObj))
  function calcFreightByRoutePrice(
    destCity: string,
    arg2: number | { number?: number; weight?: number; volume?: number; numberUnitPrice?: number; weightUnitPrice?: number; volumeUnitPrice?: number },
    arg3?: number,
    arg4?: number
  ): number {
    let n = 0
    let w = 0
    let v = 0
    let upN = 0
    let upW = 0
    let upV = 0
    if (typeof arg2 === 'object' && arg2 !== null) {
      n = Number(arg2.number) || 0
      w = Number(arg2.weight) || 0
      v = Number(arg2.volume) || 0
      upN = Number(arg2.numberUnitPrice) || 0
      upW = Number(arg2.weightUnitPrice) || 0
      upV = Number(arg2.volumeUnitPrice) || 0
    } else {
      n = Number(arg2) || 0
      w = Number(arg3) || 0
      v = Number(arg4) || 0
    }

    // 1. 若填写了件数单价/重量单价/体积单价，优先按单价计算
    if (upN > 0 || upW > 0 || upV > 0) {
      return Number(Math.max(n * upN, w * upW, v * upV).toFixed(2))
    }

    // 2. 若启用了路线价格体系
    const cityCfg = cityList.value.find(c => c.areaName === destCity || c.name === destCity) || cityList.value[0]
    if (cityCfg) {
      const byW = w * cityCfg.weightPrice
      const byV = v * cityCfg.volumePrice
      const byP = n * cityCfg.piecePrice
      const raw = Math.max(byW, byV, byP, cityCfg.minFreight)
      return Math.round(raw)
    }
    return 0
  }

  return {
    networkList,
    currentNetwork,
    cityList,
    searchCities,
    shipperArchives,
    receiverArchives,
    searchShippers,
    searchReceivers,
    upsertCustomerArchive,
    vehicleArchives,
    searchVehicles,
    carrierArchives,
    searchCarriers,
    dictData,
    queryDictSuggestions,
    parseSmartAddressText,
    uiLayoutConfig,
    allFocusFields,
    cursorPathKeys,
    requiredFieldKeys,
    userBehaviors,
    numberRules,
    generateNewWaybillNo,
    generateGoodsNo,
    calcFreightByRoutePrice
  }
})
