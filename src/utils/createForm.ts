import {GenericFormData, GenericFormFieldData} from "../models.ts";
import {computed, ref} from "vue";

function createInitialData(fields: GenericFormFieldData[]): Record<string, any> {
  let res = {} as Record<string, any>
  for (const field of fields) {
    res[field.dataKey] = field.defaultValue
  }
  return res
}

export function createForm(form: GenericFormData): GenericFormData {
  console.log("Hello from createFrom", form)
  return form
}

export function useGenericDataForm<FormValueType extends Record<string, any>>(formData: GenericFormData) {
  const allFields = computed(() => formData.fieldGroups.map(g => g.fields).flat(1))
  const initialData = createInitialData(allFields.value) as FormValueType
  const model = ref<FormValueType>(initialData)

  return {
    formData,
    allFields, initialData, model
  }
}