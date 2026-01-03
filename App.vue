<template>
  <NavBar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { provide, readonly, onMounted } from 'vue' // [修改] 引入 onMounted
import NavBar from './components/NavBar.vue'

// [教学点] Provide: 向所有子组件提供全局配置
provide('globalConfig', readonly({
  appName: 'PlayPal 电竞',
  version: '2.0.0',
  supportEmail: 'support@playpal.com'
}))

// [新增] 模块 3: 全局表单验证逻辑
// 这段代码会在 App 挂载后运行，监听整个应用中所有的 submit 事件
onMounted(() => {
  document.addEventListener('submit', (event) => {
    const form = event.target

    // 确保目标是 FORM 元素
    if (form.tagName === 'FORM') {
      // 使用浏览器原生 API 检查有效性
      if (!form.checkValidity()) {
        // 1. 阻止默认提交行为
        event.preventDefault()
        event.stopPropagation()

        // 2. 添加 Bootstrap 的验证类 (触发 CSS 红框显示)
        form.classList.add('was-validated')

        // 3. 找到第一个填错的输入框，聚焦并晃动
        const firstInvalid = form.querySelector(':invalid')
        if (firstInvalid) {
          firstInvalid.focus()
          // 添加自定义动画类 (需要在 main.css 中定义 keyframes)
          firstInvalid.classList.add('shake-error')

          // 500ms 动画结束后移除类名，保证下次还能触发动画
          setTimeout(() => {
            firstInvalid.classList.remove('shake-error')
          }, 500)
        }
      }
    }
  }, true) // useCapture = true, 确保在捕获阶段触发，优于子组件的事件
})
</script>

<style>
/* CSS 变量定义主题色 */
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
}

/* 路由过渡动画关键样式 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>