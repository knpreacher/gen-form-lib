<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {StringGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";

const props = defineProps<StringGenericFormFieldProps>()
const emit = defineEmits<VModelEmitter<string|undefined>>()
const {
  model,
  fieldProps,
} = useGenericInput(
    props, emit
)
</script>

<template>
  <q-input v-model="model" v-bind="fieldProps"></q-input>
</template>

<style scoped>

</style>