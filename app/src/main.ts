import { createApp } from 'vue'
import './assets/main.css'
import '@/components/tailwindcss/index.css'
import pinia from '@/store'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
