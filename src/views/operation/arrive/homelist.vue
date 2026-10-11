<template>
  <StransArriveEngine
    :transport-type="4"
    title="送货上门"
    add-route="/customRoute/addDeliverHome"
    edit-route-prefix="/customRoute/editDeliverHome"
  />
</template>

<script setup lang="ts">
import StransArriveEngine from '@/views/operation/components/StransArriveEngine.vue'
</script>
