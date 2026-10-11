import { STAT_COUNT_LIST, TREND_DATA_MAP, DEFAULT_SHORTCUTS, StaticCountItem, TrendPoint } from '@/mock/dashboardData';

// 获取数据展示卡片统计
export function getDataShowSetting(): Promise<{ code: number; data: StaticCountItem[] }> {
  return new Promise((resolve) => {
    // 优先读取本地持久化设置
    const cached = localStorage.getItem('user.indexdata.setting');
    let list = STAT_COUNT_LIST;
    if (cached) {
      try {
        const types = JSON.parse(cached).map((i: any) => i.staticType);
        list = STAT_COUNT_LIST.filter(item => types.includes(item.staticType));
      } catch (e) {}
    }
    setTimeout(() => {
      resolve({ code: 200, data: list });
    }, 150);
  });
}

// 获取走势图数据 (按指标类型)
export function getTrendList(params: { StaticType: number }): Promise<{ code: number; data: TrendPoint[] }> {
  return new Promise((resolve) => {
    const list = TREND_DATA_MAP[params.StaticType] || TREND_DATA_MAP[1];
    setTimeout(() => {
      resolve({ code: 200, data: list });
    }, 150);
  });
}

// 获取常用功能配置
export function getFrequentlySetting(): Promise<{ code: number; data: { settingValue: string } }> {
  return new Promise((resolve) => {
    const cached = localStorage.getItem('user.functionkeyshortcut.setting');
    const val = cached || JSON.stringify(DEFAULT_SHORTCUTS);
    setTimeout(() => {
      resolve({
        code: 200,
        data: { settingValue: val }
      });
    }, 100);
  });
}

// 更新配置 (常用功能 / 数据展示)
export function saveSetting(payload: { settingKey: string; settingValue: string }): Promise<{ code: number; msg: string }> {
  return new Promise((resolve) => {
    localStorage.setItem(payload.settingKey, payload.settingValue);
    setTimeout(() => {
      resolve({ code: 200, msg: '保存成功' });
    }, 150);
  });
}
