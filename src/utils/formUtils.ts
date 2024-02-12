import type {
  GenericFormFieldData,
  GenericFormFieldDataDefaults,
  GenericFormGroupData,
  GenericFormGroupDataDefaults, GridSizeProps
} from "../models.ts";
import {deepJoinObjects} from "./jsUtils.ts";
import {VueClassProp} from "quasar";
import {ScreenBreakpoint} from "../models.ts";

export function getGroupProps(
  groupData: GenericFormGroupData,
  _defaults?: GenericFormGroupDataDefaults,
  _initials?: GenericFormGroupDataDefaults,
) {
  if (!_defaults) return groupData
  return deepJoinObjects(
    _initials as GenericFormGroupData,
    _defaults as GenericFormGroupData,
    groupData
  )
}

export function getFieldProps(
  fieldData: GenericFormFieldData,
  _defaults?: GenericFormFieldDataDefaults,
  _initials?: GenericFormFieldDataDefaults
) {
  if (!_defaults) return fieldData
  return deepJoinObjects(
    _initials as GenericFormFieldData,
    _defaults as GenericFormFieldData,
    fieldData
  )
}

export function getGridClass(gridProps?: GridSizeProps): VueClassProp {
  if (!gridProps) return {};
  if (gridProps?.fw) return {"col-auto": true};
  const resultClass = {} as Record<string, boolean>;
  ["xs", "sm", "md", "lg", "xl"].forEach(prop => {
    let v = (gridProps as GridSizeProps)[prop as ScreenBreakpoint]
    if (v) {
      resultClass[`col-${prop}-${v}`] = true
    }
  })
  return resultClass;
}

export function splitDateTimeDefault(dt: string) {
  let spl = dt.split(' ')
  if (spl.length === 0) {
    return {
      date: '', time: ''
    }
  }
  if (spl.length === 1) {
    return {
      date: spl[0], time: ''
    }
  }
  return {
    date: spl[0], time: spl[1]
  }
}

export function joinDateTimeDefault(date?: string, time?: string) {
  return [date, time].join(' ')
}