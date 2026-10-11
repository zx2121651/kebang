# 科邦智联 - 智慧物流数字化管理系统 (TMS)

本项目为 **星云物流TMS（科邦智联）** 的高保真 1:1 纯前端全功能深度复刻系统。

---

## 真实系统账号与演示环境

本项目对标的原系统访问地址与账号信息详见文档：[REAL_SOFTWARE_INFO.md](./REAL_SOFTWARE_INFO.md)

- **系统网址**：[http://xy.561580.com](http://xy.561580.com)
- **企业编号**：`777`
- **登录账号**：`aadmin`
- **登录密码**：`123`

---

## 技术架构

- **核心框架**：Vue 3 + TypeScript + Vite
- **UI 组件库**：Element Plus + 图标库
- **状态管理**：Pinia 全局持久化数据流
- **通用表格引擎**：`GbTableEngine`（支持粘性多冻结列、动态列宽、行内检索过滤、高级组合筛选、外观偏好记忆）
- **打印引擎**：`PrintPreviewDialog`（支持三联单、货物标签、随车清单、运输合同）

---

## 本地启动指南

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器
npm run dev

# 3. 生产打包构建
npm run build
```
