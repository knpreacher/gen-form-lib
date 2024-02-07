import type {QField} from "quasar";

declare type GenericFormGroup = {
  hideHeader?: boolean,
  label?: string,
  icon?: string,
  fields: GenericFormField[]
}
declare type GenericFormField = QField & {}

declare type GenericFormOptions = {
  name: string,
  fieldDefaults?: Partial<GenericFormField>,
  fieldGroups: GenericFormGroup[]
}