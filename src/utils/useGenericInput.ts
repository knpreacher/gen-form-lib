import {useVModel, VModelEmitterOption, VModelProps} from "./useVModel.ts";
import type {GenericFormFieldData} from "../models.ts";
import {computed} from "vue";

export function useGenericInput<FieldClass extends GenericFormFieldData, ValueClass = unknown>(
  // props: VModelProps<ValueClass>,
  props: FieldClass & VModelProps<ValueClass>,
  emit: VModelEmitterOption<ValueClass>
) {
  const {model} = useVModel<ValueClass>(props, emit);
  const fieldProps = computed(()=>props.inputProps);
  return {
    model, fieldProps
  }
}