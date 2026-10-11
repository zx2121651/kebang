<template>
  <ShuttleStowageEngine
    :biz-type="4"
    biz-title="送货上门"
    prefix="SH"
    back-route="/operation/arrive/homelist"
  />
</template>

<script setup lang="ts">
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
</script>
