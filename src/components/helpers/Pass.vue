<script setup lang="ts" generic="T extends {}">
defineProps<{
  data: T
}>()
</script>

<template>
  <slot v-bind="data"></slot>
</template>

<style scoped>

</style>