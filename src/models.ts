import type {
  QCheckboxProps,
  QDateProps,
  QFieldProps,
  QInputProps,
  QTimeProps,
  QToggleProps,
  VueClassProp
} from "quasar";
import {NamedColor} from "quasar/dist/types/api/color";
import {VModelProps} from "./utils/useVModel.ts";

declare type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc['length'] : Enumerate<N, [...Acc, Acc['length']]>
declare type IntRange<N1 extends number, N2 extends number> = Exclude<Enumerate<N2>, Enumerate<N1>>
// export declare type NoVModel<T extends QFieldProps> = Omit<T, 'modelValue' | 'onUpdate:modelValue'>
export declare type NoVModel<T extends {
  modelValue?: any
}> = Omit<T, 'modelValue'>

export declare type DataType =
  'string'
  | 'int'
  | 'float'
  | 'bool'
  | 'bool_toggle'
  | 'text'
  | 'api_object'
  | 'date'
  | 'time'
  | 'datetime'

export declare type SlotDeclaration = {
  name: string
  props?: Record<string, any>
}
export declare type ComponentMapping<FieldDataType = DataType, ExtraProps = Record<string, any>> = {
  [key in (FieldDataType extends string ? FieldDataType : string)]: {
    component: any,
    slots?: SlotDeclaration[],
  }
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
//            Fetch requests            //
//--------------------------------------//

export declare type ApiFetchFunc<ResultType = any> = PromiseLike<ResultType>
export declare type ApiFetchItemsGetter<T, Response = any> = (res: Response) => (T[])
export declare type ApiFetchItemsCountGetter<Response = any> = (res: Response) => number
export declare type ApiFetchFuncGetter<ResultType = any> = (
  offset?: number, limit?: number
) => ApiFetchFunc<ResultType>

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

export declare type DefaultFieldProps = QFieldProps & {
  placeholder?: string
}

export declare type BaseGenericFormFieldData<ValueType = any, FieldDataType extends DataType = DataType, FieldClassProps = DefaultFieldProps> =
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

export declare type BoolGenericFormFieldData = BaseGenericFormFieldData<boolean, 'bool', NoVModel<QCheckboxProps>>
export declare type BoolGenericFormFieldProps = BoolGenericFormFieldData & VModelProps<boolean | undefined>

export declare type BoolToggleGenericFormFieldData = BaseGenericFormFieldData<boolean, 'bool_toggle', NoVModel<QToggleProps>>
export declare type BoolToggleGenericFormFieldProps = BoolToggleGenericFormFieldData & VModelProps<boolean | undefined>

export declare type StringGenericFormFieldData = BaseGenericFormFieldData<string, 'string', NoVModel<QInputProps>>
export declare type StringGenericFormFieldProps = StringGenericFormFieldData & VModelProps<string | undefined>

export declare type IntGenericFormFieldData = BaseGenericFormFieldData<number, 'int', NoVModel<QInputProps & {
  placeholder?: string
}>>
export declare type IntGenericFormFieldProps = IntGenericFormFieldData & VModelProps<number | undefined>

export declare type DateGenericFormFieldData = BaseGenericFormFieldData<string, 'date', NoVModel<QInputProps>> & {
  calendarProps?: Omit<QDateProps, 'modelValue'>
  calendarIcon?: string,
  dateInputFormat?: string,
  autoMask?: boolean,
}

export declare type DatetimeGenericFormFieldData =
  BaseGenericFormFieldData<string, 'datetime', NoVModel<QInputProps>>
  & {
  calendarProps?: Omit<QDateProps, 'modelValue'>
  calendarIcon?: string,
  clockProps?: Omit<QTimeProps, 'modelValue'>
  clockIcon?: string,
  datetimeInputFormat?: string,
  splitDateTime?: (dt: string) => {
    date: string,
    time: string
  }
  joinDateTime?: (date?: string, time?: string) => string
  autoMask?: boolean,
}

export declare type TimeGenericFormFieldData = BaseGenericFormFieldData<string, 'time', NoVModel<QInputProps>> & {
  clockProps?: Omit<QTimeProps, 'modelValue'>
  clockIcon?: string,
  timeInputFormat?: string,
  autoMask?: boolean,
}

export declare type DateGenericFormFieldProps = DateGenericFormFieldData & VModelProps<string | undefined>
export declare type DatetimeGenericFormFieldProps = DatetimeGenericFormFieldData & VModelProps<string | undefined>
export declare type TimeGenericFormFieldProps = TimeGenericFormFieldData & VModelProps<string | undefined>

export declare type ApiObjectFetchOptions<Item = any, Response = any> = {
  fetchFuncGetter: ApiFetchFuncGetter<Response>,
  fetchItemsGetter: ApiFetchItemsGetter<Item, Response>,
  fetchCountGetter: ApiFetchItemsCountGetter<Response>,
}

export declare type ApiListViewProps<Item = any, Response = any> = {
  selectedItems?: Item[],
  fetchOptions: ApiObjectFetchOptions<Item, Response>,
  itemToString?: (value: Item) => string,
  itemEqual?: (v1: Item, v2: Item) => boolean,
  height?: number
}

export declare type ApiObjectGenericFormFieldData<Item = any, Response = any> =
  BaseGenericFormFieldData<Item, 'api_object', NoVModel<QFieldProps>>
  & {
  listViewProps: ApiListViewProps<Item, Response>,
}

export declare type ApiObjectGenericFormFieldProps<Item = any, Response = any> =
  ApiObjectGenericFormFieldData<Item, Response>
  & VModelProps<Item | undefined>

export declare type GenericFormFieldData =
  StringGenericFormFieldData
  | IntGenericFormFieldData
  | ApiObjectGenericFormFieldData
  | DateGenericFormFieldData
  | TimeGenericFormFieldData
  | DatetimeGenericFormFieldData
  | BoolGenericFormFieldData
  | BoolToggleGenericFormFieldData

export declare type GenericFormFieldProps = Partial<Omit<GenericFormFieldData, 'dataType' | 'dataKey'>> & {
  dataType: GenericFormFieldData['dataType'],
  dataKey: GenericFormFieldData['dataKey'],
}

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
  fieldDefaults?: Omit<GenericFormFieldDataDefaults, 'defaultValue'>,
  groupsDefaults?: GenericFormGroupDataDefaults,
  fieldGroups: GenericFormGroupData[],
}