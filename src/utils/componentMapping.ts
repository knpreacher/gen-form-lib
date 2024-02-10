import GenericStringInput from "../components/inputs/GenericStringInput.vue";
import GenericIntInput from "../components/inputs/GenericIntInput.vue";
import type {ComponentMapping} from "../models.ts";
import GenericApiObjectInput from "../components/inputs/GenericApiObjectInput.vue";


export const componentMapping = Object.freeze<Partial<ComponentMapping>>({
  text: GenericStringInput,
  int: GenericIntInput,
  string: GenericStringInput,
  api_object: GenericApiObjectInput,
})