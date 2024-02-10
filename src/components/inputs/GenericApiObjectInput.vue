<script setup lang="ts" generic="Item = any, Response = any">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {ApiObjectGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";
import ApiListView from "../extra/ApiListView.vue";

const props = defineProps<ApiObjectGenericFormFieldProps<Item, Response>>()
const emit = defineEmits<VModelEmitter<Item | undefined>>()
const {
  model,
  fieldProps,
} = useGenericInput(
    props, emit
)
</script>

<template>
  <q-field v-model="model" v-bind="fieldProps">
    <template #control>

    </template>
    <q-popup-proxy>
      <q-card style="width: 100%; min-width: 250px; max-width: 500px">
        <api-list-view
            :fetch-options="props.fetchOptions"
        />
      </q-card>
    </q-popup-proxy>
  </q-field>
</template>

<style scoped>

</style>