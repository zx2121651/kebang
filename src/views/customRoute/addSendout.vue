<template>
  <ShuttleStowageEngine
    :biz-type="7"
    biz-title="送出外发"
    prefix="SC"
    back-route="/operation/outgo/sendout"
  />
</template>

<script setup lang="ts">
import ShuttleStowageEngine from '@/views/operation/components/ShuttleStowageEngine.vue'
</script>
