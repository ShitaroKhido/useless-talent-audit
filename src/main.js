import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Keep semantic fallback content in static HTML for crawlers without JS,
// then remove it once the app is interactive.
document.getElementById('crawler-content')?.remove()

createApp(App).mount('#app')
