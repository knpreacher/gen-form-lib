<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {IntGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";

const props = defineProps<IntGenericFormFieldProps>()
const emit = defineEmits<VModelEmitter<number|undefined>>()
const {
  model,
  fieldProps,
} = useGenericInput(
    props, emit
)
</script>

<template>
  <q-input v-model.number="model" v-bind="fieldProps"></q-input>
</template>

<style scoped>

</style>