<template>
  <ShuttleStowageEngine
    :biz-type="3"
    biz-title="到货分拨"
    prefix="FB"
    back-route="/operation/arrive/arriveassign"
  />
</template>

<script setup lang="ts">
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
</script>
