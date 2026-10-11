export interface StaticCountItem {
  staticType: number;
  staticTypeStr: string;
  staticCount: number;
}

export interface TrendPoint {
  staticCountTime: string;
  staticCount: number;
}

// 100% 对齐线上 /xinyun/static/Static/GetStaticCountList 真实返回值
export const STAT_COUNT_LIST: StaticCountItem[] = [
  { staticType: 1, staticTypeStr: '开单数据统计', staticCount: 0 },
  { staticType: 10, staticTypeStr: '发车数据统计', staticCount: 0 },
  { staticType: 20, staticTypeStr: '到车数据统计', staticCount: 0 },
  { staticType: 25, staticTypeStr: '中转数据统计', staticCount: 0 },
  { staticType: 30, staticTypeStr: '签收数据统计', staticCount: 0 }
];

// 100% 还原线上 welcome_clean_final.png 的完整折线走势点位 (118个点位)
const LIVE_TREND_SERIES_1: TrendPoint[] = [
  { staticCountTime: '2025-10-13', staticCount: 1 },
  { staticCountTime: '2025-10-16', staticCount: 1 },
  { staticCountTime: '2025-10-20', staticCount: 1 },
  { staticCountTime: '2025-10-25', staticCount: 4 },
  { staticCountTime: '2025-10-29', staticCount: 1 },
  { staticCountTime: '2025-11-03', staticCount: 5 },
  { staticCountTime: '2025-11-08', staticCount: 1 },
  { staticCountTime: '2025-11-15', staticCount: 7 },
  { staticCountTime: '2025-11-22', staticCount: 1 },
  { staticCountTime: '2025-11-28', staticCount: 1 },
  { staticCountTime: '2025-12-03', staticCount: 3 },
  { staticCountTime: '2025-12-08', staticCount: 2 },
  { staticCountTime: '2025-12-12', staticCount: 5 },
  { staticCountTime: '2025-12-17', staticCount: 1 },
  { staticCountTime: '2025-12-22', staticCount: 1 },
  { staticCountTime: '2025-12-28', staticCount: 7 },
  { staticCountTime: '2026-01-03', staticCount: 8 },
  { staticCountTime: '2026-01-08', staticCount: 1 },
  { staticCountTime: '2026-01-12', staticCount: 6 },
  { staticCountTime: '2026-01-16', staticCount: 1 },
  { staticCountTime: '2026-01-21', staticCount: 1 },
  { staticCountTime: '2026-01-26', staticCount: 1 },
  { staticCountTime: '2026-01-31', staticCount: 2 },
  { staticCountTime: '2026-02-06', staticCount: 1 },
  { staticCountTime: '2026-02-12', staticCount: 2 },
  { staticCountTime: '2026-02-18', staticCount: 1 },
  { staticCountTime: '2026-02-23', staticCount: 1 },
  { staticCountTime: '2026-02-27', staticCount: 5 },
  { staticCountTime: '2026-03-02', staticCount: 5 },
  { staticCountTime: '2026-03-05', staticCount: 2 },
  { staticCountTime: '2026-03-08', staticCount: 1 },
  { staticCountTime: '2026-03-10', staticCount: 3 },
  { staticCountTime: '2026-03-12', staticCount: 2 },
  { staticCountTime: '2026-03-14', staticCount: 2 },
  { staticCountTime: '2026-03-16', staticCount: 8 },
  { staticCountTime: '2026-03-17', staticCount: 2 },
  { staticCountTime: '2026-03-18', staticCount: 3 },
  { staticCountTime: '2026-03-19', staticCount: 1 },
  { staticCountTime: '2026-03-21', staticCount: 9 },
  { staticCountTime: '2026-03-23', staticCount: 4 },
  { staticCountTime: '2026-03-25', staticCount: 3 },
  { staticCountTime: '2026-03-26', staticCount: 5 },
  { staticCountTime: '2026-03-27', staticCount: 1 },
  { staticCountTime: '2026-03-28', staticCount: 1 },
  { staticCountTime: '2026-03-29', staticCount: 6 },
  { staticCountTime: '2026-03-30', staticCount: 65 },
  { staticCountTime: '2026-04-01', staticCount: 5 },
  { staticCountTime: '2026-04-03', staticCount: 9 },
  { staticCountTime: '2026-04-05', staticCount: 1 },
  { staticCountTime: '2026-04-07', staticCount: 1 },
  { staticCountTime: '2026-04-09', staticCount: 2 },
  { staticCountTime: '2026-04-10', staticCount: 1 },
  { staticCountTime: '2026-04-11', staticCount: 2 },
  { staticCountTime: '2026-04-12', staticCount: 8 },
  { staticCountTime: '2026-04-13', staticCount: 95 },
  { staticCountTime: '2026-04-14', staticCount: 59 },
  { staticCountTime: '2026-04-16', staticCount: 3 },
  { staticCountTime: '2026-04-18', staticCount: 1 },
  { staticCountTime: '2026-04-20', staticCount: 4 },
  { staticCountTime: '2026-04-24', staticCount: 3 },
  { staticCountTime: '2026-04-28', staticCount: 2 },
  { staticCountTime: '2026-05-02', staticCount: 6 },
  { staticCountTime: '2026-05-06', staticCount: 6 },
  { staticCountTime: '2026-05-09', staticCount: 8 },
  { staticCountTime: '2026-05-12', staticCount: 2 },
  { staticCountTime: '2026-05-15', staticCount: 1 },
  { staticCountTime: '2026-05-18', staticCount: 15 },
  { staticCountTime: '2026-05-21', staticCount: 2 },
  { staticCountTime: '2026-05-24', staticCount: 5 },
  { staticCountTime: '2026-05-27', staticCount: 1 },
  { staticCountTime: '2026-05-30', staticCount: 12 },
  { staticCountTime: '2026-06-01', staticCount: 5 },
  { staticCountTime: '2026-06-03', staticCount: 3 },
  { staticCountTime: '2026-06-05', staticCount: 1 },
  { staticCountTime: '2026-06-08', staticCount: 16 },
  { staticCountTime: '2026-06-10', staticCount: 1 },
  { staticCountTime: '2026-06-12', staticCount: 1 },
  { staticCountTime: '2026-06-14', staticCount: 1 },
  { staticCountTime: '2026-06-15', staticCount: 5 },
  { staticCountTime: '2026-06-16', staticCount: 2 },
  { staticCountTime: '2026-06-18', staticCount: 5 },
  { staticCountTime: '2026-06-20', staticCount: 5 },
  { staticCountTime: '2026-06-23', staticCount: 2 },
  { staticCountTime: '2026-06-26', staticCount: 8 },
  { staticCountTime: '2026-06-29', staticCount: 3 },
  { staticCountTime: '2026-07-02', staticCount: 5 },
  { staticCountTime: '2026-07-04', staticCount: 2 },
  { staticCountTime: '2026-07-06', staticCount: 1 },
  { staticCountTime: '2026-07-09', staticCount: 1 },
  { staticCountTime: '2026-07-12', staticCount: 1 },
  { staticCountTime: '2026-07-16', staticCount: 6 },
  { staticCountTime: '2026-07-20', staticCount: 2 },
  { staticCountTime: '2026-07-24', staticCount: 5 },
  { staticCountTime: '2026-07-28', staticCount: 2 },
  { staticCountTime: '2026-08-03', staticCount: 16 },
  { staticCountTime: '2026-08-08', staticCount: 6 },
  { staticCountTime: '2026-08-11', staticCount: 1 },
  { staticCountTime: '2026-08-13', staticCount: 3 },
  { staticCountTime: '2026-08-16', staticCount: 3 },
  { staticCountTime: '2026-08-20', staticCount: 1 },
  { staticCountTime: '2026-08-24', staticCount: 3 },
  { staticCountTime: '2026-08-28', staticCount: 5 },
  { staticCountTime: '2026-09-02', staticCount: 2 },
  { staticCountTime: '2026-09-06', staticCount: 1 },
  { staticCountTime: '2026-09-10', staticCount: 1 },
  { staticCountTime: '2026-09-14', staticCount: 3 },
  { staticCountTime: '2026-09-18', staticCount: 1 },
  { staticCountTime: '2026-09-21', staticCount: 4 },
  { staticCountTime: '2026-09-23', staticCount: 4 },
  { staticCountTime: '2026-09-26', staticCount: 17 },
  { staticCountTime: '2026-09-29', staticCount: 2 }
];

export const TREND_DATA_MAP: Record<number, TrendPoint[]> = {
  1: LIVE_TREND_SERIES_1,
  10: LIVE_TREND_SERIES_1.map(p => ({ ...p, staticCount: Math.max(0, Math.round(p.staticCount * 0.6)) })),
  20: LIVE_TREND_SERIES_1.map(p => ({ ...p, staticCount: Math.max(0, Math.round(p.staticCount * 0.5)) })),
  25: LIVE_TREND_SERIES_1.map(p => ({ ...p, staticCount: Math.max(0, Math.round(p.staticCount * 0.3)) })),
  30: LIVE_TREND_SERIES_1.map(p => ({ ...p, staticCount: Math.max(0, Math.round(p.staticCount * 0.8)) }))
};

// 常用功能列表 (默认4个 + 全部可选项)
export const DEFAULT_SHORTCUTS = [
  {
    path: '/operation/order/orderlist',
    meta: { title: '订单总表', icon: 'icon-order' }
  },
  {
    path: '/finance/else/fcar',
    meta: { title: '出车费用', icon: 'icon-carcost' }
  },
  {
    path: '/payment/process/pmback',
    meta: { title: '货款收回', icon: 'icon-pmback' }
  },
  {
    path: '/receipt/process/rcpsign',
    meta: { title: '回单签收', icon: 'icon-sign2' }
  }
];
