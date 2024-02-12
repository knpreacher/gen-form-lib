<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {StringGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";

const props = defineProps<StringGenericFormFieldProps>()
const emit = defineEmits<VModelEmitter<string | undefined>>()
const {
  model,
  fieldProps,
  getRealSlot
  // slotDefs,
} = useGenericInput(
    props, emit
)
</script>

<template>
  <q-input v-model="model" v-bind="fieldProps">
    <template v-for="(_, slot) in ($slots as {})" #[getRealSlot(slot)]="scope">
      <slot :name="slot" v-if="scope" v-bind="scope"></slot>
      <slot :name="slot" v-else></slot>
    </template>
  </q-input>
</template>

<style scoped>

</style>