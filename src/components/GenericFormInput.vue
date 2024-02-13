<script setup lang="ts" generic="T = any">
import {GenericFormFieldProps, GridSizeProps} from "../models.ts";
import {componentMapping} from "../utils/componentMapping.ts";
import {useVModel, VModelEmitter, VModelProps} from "../utils/useVModel.ts";
import {computed, useSlots} from "vue";
import {joinObjects} from "../utils/jsUtils.ts";
import {getGridClass} from "../utils/formUtils.ts";

const props = defineProps<GenericFormFieldProps & VModelProps<T> & {
  defaultGridProps?: GridSizeProps
}>()
const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit)
console.log("gfi props", props)
const componentData = componentMapping[props.dataType]
const fieldGridProps = computed(() => joinObjects(props.defaultGridProps, props.gridProps))

const gridClasses = computed(() => getGridClass(fieldGridProps.value))
const slotNames = Object.keys(useSlots())
const fieldSlotNames = computed(() => slotNames.filter(name => name.startsWith(props.dataKey)))
// const getRealSlot = (slotName: string) => slotName.substring(slotName.lastIndexOf('__') + 2)
</script>

<template>
  <slot>
    <div class="gen-form-field__container" :class="gridClasses">
      {{ props }}
      <slot name="field">
        <component
            v-if="componentData && componentData.component"
            :is="componentData.component"
            v-model="model"
            v-bind="props"
        >
          <template v-for="slot in fieldSlotNames" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </component>
        <div v-else>
          <slot name="no-component">
            -- Unknown input component for data type "<b>{{ dataType }}</b>" --
          </slot>
        </div>
      </slot>
    </div>
  </slot>
</template>

<style scoped>

</style>