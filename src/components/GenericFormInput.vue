<script setup lang="ts" generic="T = any">
import {GenericFormFieldProps, GridSizeProps, SlotDeclaration} from "../models.ts";
import {componentMapping} from "../utils/componentMapping.ts";
import {useVModel, VModelEmitter, VModelProps} from "../utils/useVModel.ts";
import {computed} from "vue";
import {joinObjects} from "../utils/jsUtils.ts";
import {getGridClass} from "../utils/formPropsUtils.ts";

const props = defineProps<GenericFormFieldProps & VModelProps<T> & {
  defaultGridProps?: GridSizeProps
}>()
const emit = defineEmits<VModelEmitter<T>>()

const {model} = useVModel(props, emit)
const componentData = componentMapping[props.dataType]
const slotDefs: SlotDeclaration[] = componentData?.slots || []
const fieldGridProps = computed(() => joinObjects(props.defaultGridProps, props.gridProps))

const gridClasses = computed(() => getGridClass(fieldGridProps.value))

const getRealSlot = (slotName: string) => slotName.substring(slotName.lastIndexOf('__') + 2)
</script>

<template>
  <slot>
    <div class="gen-form-field__container" :class="gridClasses">
      <slot name="field">
        <component
            v-if="componentData && componentData.component"
            :is="componentData.component"
            v-model="model"
            v-bind="props"
        >
          <template v-for="(_, slot) in ($slots as {})" #[getRealSlot(slot)]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </component>
        <div v-else>
          <slot name="no-component">
            -- Unknown input component for data type "<b>{{ dataType }}</b>" --
          </slot>
        </div>
      </slot>
    </div>
  </slot>
</template>

<style scoped>

</style>