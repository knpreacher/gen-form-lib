<script setup lang="ts" generic="T = any">
import {GenericFormFieldData, GridSizeProps} from "../models.ts";
import {componentMapping} from "../utils/componentMapping.ts";
import {useVModel, VModelEmitter, VModelProps} from "../utils/useVModel.ts";
import {computed} from "vue";
import {joinObjects} from "../utils/jsUtils.ts";
import {getGridClass} from "../utils/formPropsUtils.ts";

const props = defineProps<GenericFormFieldData & VModelProps<T> & {
  defaultGridProps?: GridSizeProps
}>()
const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit)
const componentObject = componentMapping[props.dataType]

const fieldGridProps = computed(() => joinObjects(props.defaultGridProps, props.gridProps))

const gridClasses = computed(() => getGridClass(fieldGridProps.value))
</script>

<template>
  <slot>
    <div class="gen-form-field__container" :class="gridClasses">
      <slot name="field">
        <component
            v-if="componentObject"
            :is="componentObject"
            v-model="model"
            v-bind="props"
        ></component>
        <div v-else>
          -- Unknown input component for data type "<b>{{ dataType }}</b>" --
        </div>
      </slot>
    </div>
  </slot>
</template>

<style scoped>

</style>