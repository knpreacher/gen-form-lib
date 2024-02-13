import GenericStringInput from "../components/inputs/GenericStringInput.vue";
import GenericIntInput from "../components/inputs/GenericIntInput.vue";
import type {ComponentMapping} from "../models.ts";
import GenericApiObjectInput from "../components/inputs/GenericApiObjectInput.vue";
import GenericDateInput from "../components/inputs/GenericDateInput.vue";
import GenericTimeInput from "../components/inputs/GenericTimeInput.vue";
import GenericDatetimeInput from "../components/inputs/GenericDatetimeInput.vue";
import GenericBoolInput from "../components/inputs/GenericBoolInput.vue";
import GenericBoolToggleInput from "../components/inputs/GenericBoolToggleInput.vue";


// export const componentMapping = Object.freeze<Partial<ComponentMapping>>({
//   text: GenericStringInput,
//   int: GenericIntInput,
//   string: GenericStringInput,
//   api_object: GenericApiObjectInput,
// })

export const componentMapping = Object.freeze<Partial<ComponentMapping>>({
  text: {
    component: GenericStringInput
  },
  int: {
    component: GenericIntInput
  },
  string: {
    component: GenericStringInput,
    slots: [
      {name: "append"},
      {name: "prepend"},
      {name: "hint"},
      {name: "suffix"},
      {name: "prefix"},
      {name: "control"},
      {name: "after"},
      {name: "before"},
      {name: "label"},
      {name: "counter"},
      {name: "hint"},
      {name: "error"}
    ]
  },
  date: {
    component: GenericDateInput
  },
  time: {
    component: GenericTimeInput
  },
  datetime: {
    component: GenericDatetimeInput
  },
  bool: {
    component: GenericBoolInput
  },
  bool_toggle: {
    component: GenericBoolToggleInput
  },
  api_object: {
    component: GenericApiObjectInput
  },
})