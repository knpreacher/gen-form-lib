import type {QFieldProps, QInputProps, VueClassProp} from "quasar";
import {NamedColor} from "quasar/dist/types/api/color";
import {VModelProps} from "./utils/useVModel.ts";

declare type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc['length'] : Enumerate<N, [...Acc, Acc['length']]>
declare type IntRange<N1 extends number, N2 extends number> = Exclude<Enumerate<N2>, Enumerate<N1>>
export declare type NoVModel<T extends QFieldProps> = Omit<T, 'modelValue'|'onUpdate:modelValue'>

export declare type DataType = 'string' | 'int' | 'float' | 'boolean' | 'text'

export declare type ComponentMapping<FieldDataType = DataType, ExtraProps = Record<string, any> > = {
  [key in (FieldDataType extends string ? FieldDataType : string)]: any
} & ExtraProps

export declare type ScreenBreakpoint = "xs" | "sm" | "md" | "lg" | "xl"
// export declare type ScreenBreakpointSize = IntRange<1, 12>
export declare type ScreenBreakpointSize = number
export declare type FlexItemsAlign = "center" | "start" | "end" | "stretch" | "baseline"

export declare type GridSizeProps = Partial<Record<ScreenBreakpoint, ScreenBreakpointSize | undefined>> & {
  fw?: boolean
}

export declare type GutterSizeProps = {
  x?: ScreenBreakpoint,
  y?: ScreenBreakpoint,
} | ScreenBreakpoint

export declare type DomExtraProps = Partial<{
  bindAttrs: Record<string, any>,
  itemClass: VueClassProp
}>

//--------------------------------------//
//            Prepare funcs             //
//--------------------------------------//

export declare type PrepareOutModelValue<ValueType = any> = (value: any) => ValueType


export declare type InputToggleProps<
  PositiveValueType = any,
  NegativeValueType = any,
> = {
  positiveValue?: PositiveValueType,
  negativeValue?: NegativeValueType,
}

//--------------------------------------//
//             Typed fields              //
//--------------------------------------//

export declare type DefaultFieldProps = QFieldProps & {placeholder?: string}

export declare type BaseGenericFormFieldData<ValueType = any, FieldDataType = DataType, FieldClassProps = DefaultFieldProps> =
  {
    dataKey: string,
    dataType: FieldDataType,
    defaultValue?: ValueType,
    useToggle?: boolean,
    toggleProps?: InputToggleProps,
    inputProps?: FieldClassProps,
    outValuePrepare?: PrepareOutModelValue<ValueType>
    gridProps?: GridSizeProps
  }
  & DomExtraProps

export declare type StringGenericFormFieldData = BaseGenericFormFieldData<string, 'string', NoVModel<QInputProps>>
export declare type StringGenericFormFieldProps = BaseGenericFormFieldData<string, 'string', NoVModel<QInputProps>> & VModelProps<string|undefined>

export declare type IntGenericFormFieldData = BaseGenericFormFieldData<number, 'int', NoVModel<QInputProps & {placeholder?: string}>>
export declare type IntGenericFormFieldProps = BaseGenericFormFieldData<number, 'int', NoVModel<QInputProps & {placeholder?: string}>> & VModelProps<number|undefined>

export declare type GenericFormFieldData = StringGenericFormFieldData | IntGenericFormFieldData

export declare type GenericFormGroupData = {
  hideHeader?: boolean,
  label?: string,
  icon?: string,
  useSeparator?: boolean,
  color?: NamedColor | string,
  gutter?: GutterSizeProps,
  alignCells?: FlexItemsAlign,
  defaultGridProps?: GridSizeProps,
  fields: GenericFormFieldData[]
} & DomExtraProps

export declare type GenericFormFieldDataDefaults = Partial<Omit<GenericFormFieldData, 'dataKey' | 'dataType'>>
export declare type GenericFormGroupDataDefaults = Partial<Omit<GenericFormGroupData, 'fields'>>

export declare type GenericFormData = {
  // name: string,
  useAsVModel?: boolean,
  fieldDefaults?: GenericFormFieldDataDefaults,
  groupsDefaults?: GenericFormGroupDataDefaults,
  fieldGroups: GenericFormGroupData[],
}