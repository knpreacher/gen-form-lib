<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {DateGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";
import {computed} from "vue";
import {joinObjects} from "../../utils/jsUtils.ts";

const props = withDefaults(defineProps<DateGenericFormFieldProps>(), {
  dateInputFormat: 'DD.MM.YYYY',
  autoMask: true
})
const emit = defineEmits<VModelEmitter<string | undefined>>()

const inputMask = (props.autoMask ? props.dateInputFormat.replace(/[^.]/ig, '#') : props.inputProps?.mask) || undefined

const {
  model,
  fieldProps,
  getRealSlot
  // slotDefs,
} = useGenericInput(
    props, emit
)

const calendarProps = computed(() => joinObjects(
    props.calendarProps, {
      minimal: true,
      mask: props.dateInputFormat,
      range: false
    })
)
</script>

<template>
  <q-input v-model="model" v-bind="fieldProps" :mask="inputMask">
    <template v-for="(_, slot) in ($slots as {})" #[getRealSlot(slot)]="scope">
      <slot :name="slot" v-if="scope" v-bind="scope"></slot>
      <slot :name="slot" v-else></slot>
    </template>
    <template #append>
      <q-btn dense round :icon="calendarIcon" flat>
        <span v-if="!calendarIcon">📅</span>
        <q-popup-proxy>
          <q-date v-model="model" v-bind="calendarProps">

          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<style scoped>

</style>