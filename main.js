import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 1. 引入原生 Bootstrap 5 CSS 和 Icons
// 基础样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入原生 Bootstrap JS (用于原生 HTML 组件的交互)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// 2. 引入 BootstrapVue Next 组件库
// 这是为了支持 Vue 组件写法 (如 <BModal>, <BButton>)
import { createBootstrap } from 'bootstrap-vue-next'
// 引入组件库专属样式
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

// 3. [关键] 引入自定义全局样式
// 必须放在所有 Bootstrap 样式之后，这样 main.css 中的
// .was-validated (红框) 和 .shake-error (晃动) 才能生效
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// 注册 BootstrapVue Next 插件
app.use(createBootstrap())

app.mount('#app')