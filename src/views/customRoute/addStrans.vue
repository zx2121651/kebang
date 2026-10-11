<template>
  <ShuttleStowageEngine
    :biz-type="2"
    biz-title="短途配载"
    prefix="DT"
    back-route="/operation/ship/stranslist"
  />
</template>

<script setup lang="ts">
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
</script>
