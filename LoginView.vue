<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100" style="margin-top: -50px;">
    <div class="card shadow p-4" style="width: 100%; max-width: 400px;">
      <h3 class="text-center mb-4 text-primary fw-bold">登录 PlayPal</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">电子邮箱</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        <div class="mb-4">
          <label class="form-label">密码</label>
          <input type="password" class="form-control" v-model="password" required>
        </div>
        <button type="submit" class="btn btn-primary w-100 py-2">登录</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const email = ref('demo@playpal.com')
const password = ref('123456')
const router = useRouter()
const userStore = useUserStore()

const handleLogin = () => {
  if (userStore.login(email.value, password.value)) {
    router.push('/market')
  }
}
</script>