import GenericStringInput from "../components/inputs/GenericStringInput.vue";
import GenericIntInput from "../components/inputs/GenericIntInput.vue";
import type {ComponentMapping} from "../models.ts";
import GenericApiObjectInput from "../components/inputs/GenericApiObjectInput.vue";


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
  api_object: {
    component: GenericApiObjectInput
  },
})