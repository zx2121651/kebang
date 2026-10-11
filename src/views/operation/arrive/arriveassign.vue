<template>
  <StransArriveEngine
    :transport-type="3"
    title="到货分拨"
    add-route="/customRoute/addArrive"
    edit-route-prefix="/customRoute/editArrive"
  />
</template>

<script setup lang="ts">
import StransArriveEngine from '@/views/operation/components/StransArriveEngine.vue'
</script>
