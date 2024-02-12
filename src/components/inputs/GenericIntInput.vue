<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {IntGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";

const props = defineProps<IntGenericFormFieldProps>()
const emit = defineEmits<VModelEmitter<number | undefined>>()
const {
  model,
  fieldProps,
  getRealSlot
} = useGenericInput(
    props, emit
)
</script>

<template>
  <q-input v-model.number="model" v-bind="fieldProps">
    <template v-for="(_, slot) in ($slots as {})" #[getRealSlot(slot)]="scope">
      <slot :name="slot" v-if="scope" v-bind="scope"></slot>
      <slot :name="slot" v-else></slot>
    </template>
  </q-input>
</template>

<style scoped>

</style>