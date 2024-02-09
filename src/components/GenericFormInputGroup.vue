<script setup lang="ts" generic="T extends Object">
import {GenericFormFieldDataDefaults, GenericFormGroupData} from "../models.ts";
import GenericFormInput from "./GenericFormInput.vue";
import {computed} from "vue";
import {getFieldProps} from "../utils/formPropsUtils.ts";
import {useVModel, VModelEmitter, VModelProps} from "../utils/useVModel.ts";
import {VueClassProp} from "quasar";

const props = defineProps<GenericFormGroupData & {
  fieldDefaults?: GenericFormFieldDataDefaults
} & VModelProps<T>>()
const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit)

const fields = computed(
    () => props.fields.map(f => getFieldProps(f, props.fieldDefaults))
)
// console.log(fields.value)

const gutterClasses = computed<VueClassProp>(()=>{
  if (!props.gutter) return {}
  if (typeof props.gutter === 'string') return {
    [`q-col-gutter-${props.gutter}`]: true
  }
  return {
    [`q-col-gutter-x-${props.gutter?.x}`]: true,
    [`q-col-gutter-y-${props.gutter?.y}`]: true,
  }
})
</script>

<template>
  <div class="gen-form-group">
    <div class="gen-form-group__header row items-center full-width q-gutter-x-sm">
      <q-icon :color="color" v-if="icon" :name="icon"></q-icon>
      <div v-if="label" v-text="label"></div>
      <q-separator class="col-grow" :color="color" v-if="useSeparator"/>
    </div>
    <div class="row" :class="gutterClasses">
      <generic-form-input
          v-for="(field, index) in fields" :key="`field__${index}`"
          v-bind="field"
          :default-grid-props="defaultGridProps"
          v-model="(model as Record<string,any>)[field.dataKey]"
      >
      </generic-form-input>
    </div>
  </div>
</template>

<style scoped>

</style>