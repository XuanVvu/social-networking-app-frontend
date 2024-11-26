import callApi from '@/services/api'
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './routes'
import ElementPlus from 'element-plus'
import i18n from './i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'

const pinia = createPinia()
const app = createApp(App)
app.use(i18n)
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.config.globalProperties.$api = callApi
app.mount('#app')
