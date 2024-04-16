import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const state = createPinia()
const app = createApp(App)

app.use(state)
app.use(router)
app.mount('#app')
