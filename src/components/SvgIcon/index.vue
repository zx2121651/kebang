<template>
  <svg :class="['svg-icon', className]" aria-hidden="true" :style="customStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  iconClass: string;
  className?: string;
  size?: string | number;
  color?: string;
}>();

const iconName = computed(() => {
  if (props.iconClass.startsWith('#')) return props.iconClass;
  return `#${props.iconClass}`;
});

const customStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.size) {
    const s = typeof props.size === 'number' ? `${props.size}px` : props.size;
    style.width = s;
    style.height = s;
  }
  if (props.color) {
    style.fill = props.color;
  }
  return style;
});
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
