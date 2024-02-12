<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";
import {computed, ref, watch} from "vue";
import {joinObjects} from "../../utils/jsUtils.ts";
import {DatetimeGenericFormFieldProps} from "../../models.ts";
import {joinDateTimeDefault, splitDateTimeDefault} from "../../utils/formUtils.ts";

const props = withDefaults(defineProps<DatetimeGenericFormFieldProps>(), {
  datetimeInputFormat: 'DD.MM.YYYY HH:mm',
  splitDateTime: splitDateTimeDefault,
  joinDateTime: joinDateTimeDefault,
  autoMask: true
})
const emit = defineEmits<VModelEmitter<string | undefined>>()

const inputMask = (props.autoMask ? props.datetimeInputFormat.replace(/[^.:\sT]/ig, '#') : props.inputProps?.mask) || undefined

const {
  model,
  fieldProps,
  getRealSlot
  // slotDefs,
} = useGenericInput(
    props, emit
)

const masks = props.splitDateTime(props.datetimeInputFormat)

const splitModel = computed(() => props.splitDateTime(model.value || ''))

const timeInput = ref(splitModel.value.time)
const dateInput = ref(splitModel.value.date)

watch(splitModel, value => {
  // model.value = joinDateTimeDefault(splitModel.value.date, splitModel.value.time)
  timeInput.value = value.time
  dateInput.value = value.date
})

watch(() => joinDateTimeDefault(dateInput.value, timeInput.value), value => {
  model.value = value
})

const calendarProps = computed(() => joinObjects(
    props.calendarProps, {
      minimal: true,
      mask: masks.date,
      range: false
    })
)

const clockProps = computed(() => joinObjects(
    props.clockProps, {
      format24h: true,
      mask: masks.time,
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
          <q-date v-model="dateInput" v-bind="calendarProps">

          </q-date>
        </q-popup-proxy>
      </q-btn>
      <q-btn dense round :icon="clockIcon" flat>
        <span v-if="!clockIcon">🕑</span>
        <q-popup-proxy>
          <q-time v-model="timeInput" v-bind="clockProps">

          </q-time>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<style scoped>

</style>