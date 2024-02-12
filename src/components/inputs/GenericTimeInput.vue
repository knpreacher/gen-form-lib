<script setup lang="ts">
import {useGenericInput} from "../../utils/useGenericInput.ts";
import {TimeGenericFormFieldProps} from "../../models.ts";
import {VModelEmitter} from "../../utils/useVModel.ts";
import {computed} from "vue";
import {joinObjects} from "../../utils/jsUtils.ts";

const props = withDefaults(defineProps<TimeGenericFormFieldProps>(), {
  timeInputFormat: 'HH:mm',
  autoMask: true
})
const emit = defineEmits<VModelEmitter<string | undefined>>()

const inputMask = (props.autoMask ? props.timeInputFormat.replace(/[^:]/ig, '#') : props.inputProps?.mask) || undefined

const {
  model,
  fieldProps,
  getRealSlot
  // slotDefs,
} = useGenericInput(
    props, emit
)

const clockProps = computed(() => joinObjects(
    props.clockProps, {
      format24h: true,
      mask: props.timeInputFormat,
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
      <q-btn dense round :icon="clockIcon" flat>
        <span v-if="!clockIcon">🕑</span>
        <q-popup-proxy>
          <q-time v-model="model" v-bind="clockProps">

          </q-time>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<style scoped>

</style>