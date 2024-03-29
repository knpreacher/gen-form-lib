import {useVModel, VModelEmitterOption, VModelProps} from "./useVModel.ts";
import {computed} from "vue";
import {BaseGenericFormFieldData, SlotDeclaration} from "../models.ts";
import {componentMapping} from "./componentMapping.ts";


// dummy
// type PropsWithDefaults<T, Defaults extends InferDefaults<T>, BKeys extends keyof T> = Readonly<Omit<T, keyof Defaults>> & {
//     readonly [K in keyof Defaults]-?: K extends keyof T ? Defaults[K] extends undefined ? T[K] : NotUndefined<T[K]> : never;
// } & {
//     readonly [K in BKeys]-?: K extends keyof Defaults ? Defaults[K] extends undefined ? boolean | undefined : boolean : boolean;
// };
// export type LooseRequired<T> = {
//     [P in keyof (T & Required<T>)]: T[P];
// };

export function useGenericInput<FieldClass extends BaseGenericFormFieldData, ValueClass = unknown>(
  // props: VModelProps<ValueClass>,
  // props: (FieldClass & VModelProps<ValueClass>) | PropsWithDefaults<LooseRequired<(FieldClass & VModelProps<ValueClass>)>>,
  props: (FieldClass & VModelProps<ValueClass>),
  emit: VModelEmitterOption<ValueClass>
) {
  // console.log('initial model for', props.dataKey, 'is', props.defaultValue)
  // console.log('initial model for', props.dataKey, 'is', props.defaultValue, typeof props.defaultValue)
  const {model} = useVModel<ValueClass>(props, emit);
  // const {model} = useVModel<ValueClass>(props, emit);
  const fieldProps = computed(() => props.inputProps);
  const slotDefs: SlotDeclaration[] = componentMapping[props.dataType]?.slots || []
  const getRealSlot = (slotName: string) => slotName.substring(slotName.lastIndexOf('__') + 2)
  return {
    model, fieldProps, slotDefs, getRealSlot
  }
}