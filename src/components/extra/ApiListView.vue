<script setup lang="ts" generic="Item = any, Response = any">
import {
  ApiListViewProps
} from "../../models.ts";
import {computed, ref} from "vue";
import {Ref} from "@vue/reactivity";

const props = withDefaults(defineProps<ApiListViewProps<Item, Response>>(), {
  height: 300
})

const scrollTargetRef = ref()
const containerRef = ref<Element | undefined>()

// const emit = defineEmits<VModelEmitter<Item|undefined>>()

// const {
//   model,
//   fieldProps,
// } = useGenericInput(
//     props, emit
// )

const scrollContainerStyle = computed(() => ({
  ...(props.height ? {
    'height': `${props.height}px`,
    // 'width': `${props.height}px`,
    'width': `${containerRef.value?.clientWidth ?? 100}px`,
    // 'overflow': 'auto',
  } : {})
}))

const loadedData: Ref<Item[]> = ref([])
const allCount = ref<number>(0)

async function requestData(offset = 0, limit = 20) {
  let response = await props.fetchOptions.fetchFuncGetter(offset, limit)
  const res = {
    results: props.fetchOptions.fetchItemsGetter(response),
    count: props.fetchOptions.fetchCountGetter(response)
  }
  loadedData.value.push(
      ...props.fetchOptions.fetchItemsGetter(response)
  )
  allCount.value = props.fetchOptions.fetchCountGetter(response)
  return res
}

function onMoreDataNeed(index: number, done: (stop?: boolean) => void): void {
  console.log(index, done)
  // done(false)
  requestData().then(data => {
    done(loadedData.value.length >= data.count)
  })
}

// requestData()
</script>

<template>
  <!--  <q-scroll-area :style="{height: `${height}px`}" style="width: 100%">-->
  <!--  :style="{'max-height': `${height}px`}"
                         style="width: 100%; overflow-y: auto"-->
  <div ref="containerRef" class="full-width">
    <q-scroll-area ref="scrollTargetRef" :style="scrollContainerStyle">
<!--      :scroll-target="scrollTargetRef"-->
      <q-infinite-scroll
          @load="onMoreDataNeed"
          :offset="250"
      >
        <slot>
          <q-item v-for="(item, ind) in loadedData" :ref="`item__${ind}`">
            <q-item-section>
              {{ item }}
            </q-item-section>
          </q-item>
        </slot>
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"/>
          </div>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </div>
  <!--  </q-scroll-area>-->
</template>

<style scoped>

</style>