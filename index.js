import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user' // [新增] 引入 UserStore 用于路由守卫

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
        {
            path: '/market',
            name: 'market',
            component: () => import('../views/MarketView.vue'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue')
        },
        {
            path: '/orders',
            name: 'orders',
            component: () => import('../views/OrderListView.vue')
        },
        // [新增] 个人中心路由
        {
            path: '/profile',
            name: 'profile',
            component: () => import('../views/ProfileView.vue'),
            meta: { requiresAuth: true } // 标记需要登录才能访问
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { top: 0 }
    }
})

// [新增] 全局前置守卫：拦截未登录用户访问 Profile
router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // 检查该路由是否需要登录权限
    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        // 未登录则重定向到登录页
        next('/login')
    } else {
        next()
    }
})

export default router