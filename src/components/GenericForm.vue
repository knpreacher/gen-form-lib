<script setup lang="ts" generic="T extends Object">
import type {GenericFormData} from "../models.ts";
import GenericFormInputGroup from "./GenericFormInputGroup.vue";
import {computed} from "vue";
import {getGroupProps} from "../utils/formPropsUtils.ts";
import {useVModel, VModelEmitter, VModelPartialProps} from "../utils/useVModel.ts";

const props = defineProps<{
  formData: GenericFormData
} & VModelPartialProps<T>>()

const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit, props.formData.useAsVModel ? undefined : {} as T)

const fieldGroups = computed(
    () => props.formData.fieldGroups.map(g => getGroupProps(g, props.formData.groupsDefaults))
)

console.log(fieldGroups.value)
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

    </generic-form-input-group>
  </div>
</template>

<style scoped>

</style>