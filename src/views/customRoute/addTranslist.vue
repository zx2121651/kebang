<template>
  <ShuttleStowageEngine
    :biz-type="1"
    biz-title="干线配载"
    prefix="GX"
    back-route="/operation/ship/translist"
  />
</template>

<script setup lang="ts">
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
</script>
