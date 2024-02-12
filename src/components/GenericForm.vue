<script setup lang="ts" generic="T extends Object">
import type {GenericFormData} from "../models.ts";
import GenericFormInputGroup from "./GenericFormInputGroup.vue";
import {computed, useSlots} from "vue";
import {getGroupProps} from "../utils/formUtils.ts";
import {useVModel, VModelEmitter, VModelPartialProps} from "../utils/useVModel.ts";

const props = defineProps<{
  formData: GenericFormData
} & VModelPartialProps<T>>()

const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit, props.formData.useAsVModel ? undefined : {} as T)

const fieldGroups = computed(
    () => props.formData.fieldGroups.map(g => getGroupProps(g, props.formData.groupsDefaults))
)

const allFields = computed(() => props.formData.fieldGroups.map(g => g.fields).flat(1))
// defineSlots<{
//
// }>()
// const slots = useSlots()
//
// const slotNames = computed<string[]>(()=>{
//   const names = []
//   for (const field of allFields.value) {
//     for (const slot of Object.keys(slots)) {
//       names.push(`${field.dataKey}__${slot}`)
//     }
//   }
//   return names
// })
</script>

<template>
  <div>
    <div>
      {{ fieldGroups }}
    </div>
    <div>
      <pre>{{ model }}</pre>
    </div>
    <generic-form-input-group
        v-for="(group, index) in fieldGroups" :key="`group__${index}`"
        :field-defaults="formData.fieldDefaults"
        v-bind="group" v-model="model"
    >
      <!--      <template v-for="field in group.fields" :key="`fs__${field.dataKey}`">-->
      <template v-for="(_, slot) in ($slots as {})" #[slot]="scope">
        <slot :name="slot" v-bind="scope"></slot>
      </template>
      <!--      </template>-->
    </generic-form-input-group>
  </div>
</template>

<style scoped>

</style>