<script setup lang="ts">
withDefaults(defineProps<{
  height?: number
}>(), {
  height: 300
})
</script>

<template>
  <q-scroll-area :style="{height: `${height}px`}">
    <q-infinite-scroll>
      <slot>
        <q-item>
          <q-item-section>

          </q-item-section>
        </q-item>
      </slot>
    </q-infinite-scroll>
  </q-scroll-area>
</template>

<style scoped>

</style>