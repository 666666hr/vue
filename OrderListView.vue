<template>
  <div class="container py-5">
    <h2 class="mb-4"><i class="bi bi-receipt me-2"></i>我的订单</h2>

    <div v-if="tradeStore.orders.length === 0" class="text-center py-5">
      <div class="display-1 text-muted mb-3"><i class="bi bi-inbox"></i></div>
      <p class="text-muted">暂无订单记录</p>
      <router-link to="/market" class="btn btn-primary rounded-pill">去下单</router-link>
    </div>

    <div v-else class="row g-4">
      <div v-for="order in tradeStore.orders" :key="order.id" class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-white border-bottom-0 pt-3 px-4 d-flex justify-content-between align-items-center">
            <div>
              <span class="fw-bold me-3">订单号: {{ order.id }}</span>
              <span class="text-muted small">{{ order.date }}</span>
            </div>
            <div>
              <span v-if="order.status === 'pending'" class="badge bg-warning text-dark">待支付</span>

              <span v-else-if="order.status === 'paid'" class="badge bg-success">
                <i class="bi bi-check-circle me-1"></i>已支付
              </span>

              <span v-else class="badge bg-secondary">已取消</span>
            </div>
          </div>

          <div class="card-body px-4">
            <div v-for="(item, idx) in order.items" :key="idx" class="d-flex align-items-center mb-2">
              <img :src="item.companion.avatar" class="rounded me-2" width="30" height="30" style="object-fit: cover;">
              <span class="me-auto">{{ item.companion.name }} ({{ item.companion.game }})</span>
              <span class="text-muted small me-3">x {{ item.hours }}小时</span>
              <span class="fw-bold">¥{{ item.companion.price * item.hours }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-end align-items-center">
              <span class="me-3">总额: <span class="h5 text-danger">¥{{ order.total }}</span></span>

              <div v-if="order.status === 'pending'" class="btn-group">
                <button class="btn btn-outline-secondary btn-sm" @click="tradeStore.cancelOrder(order.id)">取消订单</button>
                <button class="btn btn-primary btn-sm" @click="handlePay(order.id)">立即支付</button>
              </div>

              <button v-else class="btn btn-outline-danger btn-sm" @click="tradeStore.deleteOrder(order.id)">
                <i class="bi bi-trash"></i> 删除记录
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTradeStore } from '@/stores/trade'

const tradeStore = useTradeStore()

const handlePay = (id) => {
  const confirm = window.confirm(`确认支付此订单吗？`)
  if (confirm) {
    tradeStore.payOrder(id)
    alert('支付成功！')
  }
}
</script>