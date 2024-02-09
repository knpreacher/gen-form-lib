import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Quasar} from "quasar";
import GenericForm from "./components/GenericForm.vue";
import {createForm} from "./utils/createForm.ts";


// import 'quasar/dist/'

// Import Quasar css
import 'quasar/dist/quasar.css'

const app = createApp(App)
app.use(Quasar, {

})
app.mount('#app')

export {
  GenericForm, createForm
}
