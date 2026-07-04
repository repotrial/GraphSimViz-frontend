import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import * as CONFIG from "./Config"
import ApiService from "../services/api.service";
import vuetify from './plugins/vuetify'

ApiService.init(CONFIG.HOST_URL + CONFIG.CONTEXT_PATH)

const app = createApp(App)

app.config.globalProperties.$config = CONFIG
app.config.globalProperties.$http = ApiService

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(vuetify)
app.mount('#app')
