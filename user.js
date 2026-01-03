import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    // 响应式状态
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)

    // 计算属性
    const isLoggedIn = computed(() => !!user.value)

    // Actions
    function login(email, password) {
        // 模拟登录逻辑
        if (email && password) {
            user.value = {
                id: 999,
                name: '电竞经理人',
                email,
                avatar: 'https://placehold.co/100x100/0d6efd/ffffff?text=U'
            }
            localStorage.setItem('user', JSON.stringify(user.value))
            return true
        }
        return false
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
    }

    return { user, isLoggedIn, login, logout }
})