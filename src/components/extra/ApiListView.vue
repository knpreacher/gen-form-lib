<script setup lang="ts" generic="Item = any, Response = any">
import {
  ApiListViewProps
} from "../../models.ts";
import {onMounted, ref} from "vue";
import {Ref} from "@vue/reactivity";
import Pass from "../helpers/Pass.vue";

const props = withDefaults(defineProps<ApiListViewProps<Item, Response>>(), {
  height: 300
})

const emit = defineEmits<{
  'itemClick': [item: Item]
}>()

const scrollTargetRef = ref()
const containerRef = ref<Element | undefined>()

function itemToString(item: Item): string {
  return props.itemToString?.(item) ?? (typeof item === 'object' ? JSON.stringify(item) : String(item));
}

function itemEquals(v1: Item, v2: Item): boolean {
  return props.itemEqual?.(v1, v2) ?? v1 === v2
}

function isItemSelected(item: Item): boolean {
  return (props.selectedItems?.filter(t => itemEquals(t, item)).length ?? 0) > 0
}

// const emit = defineEmits<VModelEmitter<Item|undefined>>()

// const {
//   model,
//   fieldProps,
// } = useGenericInput(
//     props, emit
// )

function setContainerSize(w: number, h: number) {
  return {
    'height': `${h}px`,
    'width': `${w}px`,
  }
}

const scrollContainerStyle = ref(setContainerSize(1, props.height))
onMounted(() => {
  scrollContainerStyle.value = setContainerSize(containerRef.value?.scrollWidth ?? 100, props.height)
})

function onBlockResize(size: { width: number, height: number }) {
  scrollContainerStyle.value = setContainerSize(size.width, props.height)
}


// watch(() => containerRef.value?.scrollWidth, (w) => {
//   console.log('w', w)
//   scrollContainerStyle.value = setContainerSize(w ?? 100, props.height)
// })

// const scrollContainerStyle = computed(() => ({
//   ...(props.height ? {
//     'height': `${props.height}px`,
//     // 'width': `${props.height}px`,
//     'width': `${containerRef.value?.clientWidth ?? 100}px`,
//     // 'overflow': 'auto',
//   } : {})
// }))

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
  console.log(index)

  let loaded = loadedData.value.length
  requestData(loaded).then(data => {
    done((loaded + data.results.length) >= data.count)
  })
}

// requestData()
</script>

<template>
  <div ref="containerRef" class="fit gen-form__api-list-view__container" style="overflow-x: hidden">
    <q-resize-observer @resize="onBlockResize"/>
    <q-scroll-area ref="scrollTargetRef" :style="scrollContainerStyle">
      <q-infinite-scroll
          class="fit"
          @load="onMoreDataNeed"
          :offset="250"
      >
        <template v-for="(item, ind) in loadedData">
          <pass :data="{item, selected: isItemSelected(item)}" #default="{selected}">
            <slot name="list_item">
              <q-item
                  :active="selected"
                  :ref="`item__${ind}`"
                  clickable @click="emit('itemClick', item)"
              >
                <q-item-section>
                  {{ itemToString(item) }}
                </q-item-section>
              </q-item>
            </slot>
          </pass>
        </template>
        <template #loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px"/>
          </div>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </div>
</template>

<style scoped>

</style>