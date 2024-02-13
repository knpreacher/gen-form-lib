<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {BoolToggleGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";

const props = defineProps<BoolToggleGenericFormFieldProps>()
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
  <q-toggle v-model="model" v-bind="fieldProps">
    <template v-for="(_, slot) in ($slots as {})" #[getRealSlot(slot)]="scope">
      <slot :name="slot" v-if="scope" v-bind="scope"></slot>
      <slot :name="slot" v-else></slot>
    </template>
  </q-toggle>
</template>

<style scoped>

</style>