import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, BottomSheet } from 'quasar'
import router from './router'

import 'quasar/src/css/index.sass'
import '@quasar/extras/material-icons/material-icons.css'

import App from './App.vue'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Quasar, { plugins: {
    BottomSheet
} })

// Auth állapot figyelése
useAuthStore().init()

app.mount('#app')
