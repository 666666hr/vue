<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm" style="z-index: 9999;">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-controller me-2"></i>PlayPal
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首页</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/market">陪玩市场</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center gap-3">
          <router-link to="/cart" class="btn btn-outline-light position-relative border-0" title="购物车">
            <i class="bi bi-cart3 fs-5"></i>
            <span
                v-if="tradeStore.cartCount > 0"
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style="font-size: 0.6rem;"
            >
              {{ tradeStore.cartCount }}
            </span>
          </router-link>

          <template v-if="userStore.isLoggedIn">
            <router-link to="/orders" class="btn btn-outline-light border-0" title="我的订单">
              <i class="bi bi-receipt fs-5"></i>
            </router-link>

            <div class="dropdown" :class="{ show: isDropdownOpen }">
              <a
                  class="nav-link dropdown-toggle text-white d-flex align-items-center cursor-pointer"
                  @click.prevent="toggleDropdown"
                  role="button"
              >
                <img
                    :src="userStore.user.avatar || 'https://placehold.co/100'"
                    class="rounded-circle me-2 border border-white"
                    width="30" height="30"
                    style="object-fit: cover;"
                >
                {{ userStore.user.name }}
              </a>

              <ul
                  class="dropdown-menu dropdown-menu-end shadow-lg border-0"
                  :class="{ show: isDropdownOpen }"
                  style="margin-top: 10px;"
              >
                <li>
                  <router-link class="dropdown-item" to="/profile" @click="closeDropdown">
                    <i class="bi bi-person me-2"></i>个人中心
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item text-danger cursor-pointer" @click="handleLogout">
                    <i class="bi bi-box-arrow-right me-2"></i>退出登录
                  </a>
                </li>
              </ul>
            </div>
          </template>

          <template v-else>
            <router-link to="/login" class="btn btn-outline-light btn-sm px-4">登录</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <div v-if="isDropdownOpen" class="fixed-top w-100 h-100" style="z-index: 9998;" @click="closeDropdown"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTradeStore } from '@/stores/trade'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const tradeStore = useTradeStore()
const router = useRouter()

// === [新增] 手动控制下拉菜单状态 ===
const isDropdownOpen = ref(false)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleLogout = () => {
  closeDropdown() // 先关菜单
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

/* 确保下拉菜单动画平滑 */
.dropdown-menu {
  display: none; /* 默认隐藏 */
  animation: fadeIn 0.2s ease;
}

/* 当添加了 .show 类时显示 */
.dropdown-menu.show {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>