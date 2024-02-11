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
      <slot name="selected" v-bind="{value: model}">
        {{ model }}
      </slot>
    </template>
    <q-menu fit>
      <!--      <q-card class="full-width" style="max-width: 500px; min-width: 200px">-->
      <api-list-view
          @item-click="model = $event"
          v-bind="listViewProps"
      />
      <!--      </q-card>-->
    </q-menu>
  </q-field>
</template>

<style scoped>

</style>