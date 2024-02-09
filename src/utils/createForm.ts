import {GenericFormData} from "../models.ts";

export function createForm(form: GenericFormData): GenericFormData {
  console.log("Hello from createFrom", form)
  return form
}