<template>
  <StransArriveEngine
    :transport-type="2"
    title="短途配载"
    add-route="/customRoute/addStrans"
    edit-route-prefix="/customRoute/editStrans"
  />
</template>

<script setup lang="ts">
import StransArriveEngine from '@/views/operation/components/StransArriveEngine.vue'
</script>
