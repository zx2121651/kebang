import { defineStore } from 'pinia';

export interface TagItem {
  path: string;
  title: string;
  closable?: boolean;
}

export const useTagsStore = defineStore('tags', {
  state: () => ({
    tags: [
      { path: '/welcome', title: '首页', closable: false }
    ] as TagItem[],
    currentPath: '/welcome'
  }),
  actions: {
    addTag(tag: TagItem) {
      if (!this.tags.some(t => t.path === tag.path)) {
        this.tags.push({ ...tag, closable: tag.path !== '/welcome' });
      }
      this.currentPath = tag.path;
    },
    removeTag(path: string) {
      if (path === '/welcome') return;
      const index = this.tags.findIndex(t => t.path === path);
      if (index !== -1) {
        this.tags.splice(index, 1);
        if (this.currentPath === path) {
          const next = this.tags[index] || this.tags[index - 1];
          this.currentPath = next ? next.path : '/welcome';
        }
      }
    },
    setCurrent(path: string) {
      this.currentPath = path;
    },
    closeOthers(path: string) {
      this.tags = this.tags.filter(t => t.path === '/welcome' || t.path === path);
      this.currentPath = path;
    },
    closeAll() {
      this.tags = [{ path: '/welcome', title: '首页', closable: false }];
      this.currentPath = '/welcome';
    }
  }
});
