import GenericStringInput from "../components/inputs/GenericStringInput.vue";
import GenericIntInput from "../components/inputs/GenericIntInput.vue";
import type {ComponentMapping} from "../models.ts";



export const componentMapping = Object.freeze<Partial<ComponentMapping>>({
  text: GenericStringInput,
  int: GenericIntInput,
  string: GenericStringInput,
})