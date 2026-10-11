<template>
  <span class="count-to-number">{{ displayValue }}</span>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    startVal?: number;
    endVal: number;
    duration?: number;
    decimals?: number;
  }>(),
  {
    startVal: 0,
    duration: 1500,
    decimals: 0
  }
);

const displayValue = ref<number | string>(props.startVal);

function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

function animate() {
  const start = props.startVal;
  const end = props.endVal;
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / props.duration, 1);
    const easedProgress = easeOutQuad(progress);
    const current = start + (end - start) * easedProgress;

    displayValue.value = props.decimals > 0 ? current.toFixed(props.decimals) : Math.round(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      displayValue.value = end;
    }
  }

  requestAnimationFrame(update);
}

watch(() => props.endVal, () => {
  animate();
});

onMounted(() => {
  animate();
});
</script>

<style scoped>
.count-to-number {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
</style>
