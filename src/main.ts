import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'
import VueAxios from "vue-axios";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

loadFonts()

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .use(VueAxios, axios)
    .mount('#app')