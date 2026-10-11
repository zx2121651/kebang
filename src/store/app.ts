import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    tenantName: '星云演示【777】',
    groupName: '总部',
    userName: 'admin',
    themeColor: '#36a3f7'
  }),
  getters: {
    getSidebarStatus: (state) => state.sidebarOpened
  },
  actions: {
    toggleSidebar() {
      this.sidebarOpened = !this.sidebarOpened;
    },
    setSidebar(opened: boolean) {
      this.sidebarOpened = opened;
    }
  }
});
