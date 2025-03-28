import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'; 
import 'element-plus/dist/index.css';

createApp(App).use(ElementPlus)
createApp(App).use(router).mount('#app')
