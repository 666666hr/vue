import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTradeStore = defineStore('trade', () => {
    // --- State ---
    const cart = ref(JSON.parse(localStorage.getItem('playpal_cart')) || [])
    const orders = ref(JSON.parse(localStorage.getItem('playpal_orders')) || [])

    // --- Getters ---
    const cartCount = computed(() => cart.value.length)

    const cartTotal = computed(() => {
        return cart.value.reduce((sum, item) => sum + (item.companion.price * item.hours), 0)
    })

    // [新增] 订单状态统计 Getter (用于个人中心仪表盘)
    const orderStats = computed(() => {
        const stats = {
            pending: 0,   // 待支付
            paid: 0,      // 待接单/进行中
            completed: 0, // 待评价
            history: 0    // 已完成/历史
        }
        orders.value.forEach(order => {
            if (order.status === 'pending') stats.pending++
            else if (order.status === 'paid') stats.paid++
            else if (order.status === 'completed') stats.completed++
            else stats.history++
        })
        return stats
    })

    // --- Actions ---

    // 1. 加入购物车
    function addToCart(companion, hours = 1) {
        const existingItem = cart.value.find(item => item.companion.id === companion.id)
        if (existingItem) {
            existingItem.hours += hours
        } else {
            cart.value.push({ companion, hours })
        }
        saveData()
    }

    // 2. 移除购物车商品
    function removeFromCart(index) {
        cart.value.splice(index, 1)
        saveData()
    }

    // 3. 清空购物车
    function clearCart() {
        cart.value = []
        saveData()
    }

    // 4. 创建订单 (结算)
    function createOrder() {
        if (cart.value.length === 0) return null

        const newOrder = {
            id: 'ORD-' + Date.now(),
            date: new Date().toLocaleString(),
            items: [...cart.value],
            total: cartTotal.value,
            status: 'pending' // pending, paid, cancelled
        }

        orders.value.unshift(newOrder)
        clearCart()
        saveData()
        return newOrder.id
    }

    // 5. 支付订单
    function payOrder(orderId) {
        const order = orders.value.find(o => o.id === orderId)
        if (order && order.status === 'pending') {
            order.status = 'paid'
            saveData()
            return true
        }
        return false
    }

    // 6. 取消订单
    function cancelOrder(orderId) {
        const order = orders.value.find(o => o.id === orderId)
        if (order && order.status === 'pending') {
            order.status = 'cancelled'
            saveData()
        }
    }

    // 7. 删除订单 (仅历史记录)
    function deleteOrder(orderId) {
        const index = orders.value.findIndex(o => o.id === orderId)
        if (index !== -1) {
            orders.value.splice(index, 1)
            saveData()
        }
    }

    // 持久化存储
    function saveData() {
        localStorage.setItem('playpal_cart', JSON.stringify(cart.value))
        localStorage.setItem('playpal_orders', JSON.stringify(orders.value))
    }

    return {
        cart, orders, cartCount, cartTotal, orderStats, // 记得导出 orderStats
        addToCart, removeFromCart, createOrder, payOrder, cancelOrder, deleteOrder
    }
})