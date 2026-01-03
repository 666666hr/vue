<template>
  <div class="container py-5">
    <h2 class="mb-4"><i class="bi bi-cart3 me-2"></i>我的购物车</h2>

    <div v-if="tradeStore.cartCount === 0" class="text-center py-5 bg-white rounded shadow-sm">
      <i class="bi bi-cart-x display-1 text-muted"></i>
      <p class="mt-3 lead text-muted">购物车空空如也</p>
      <router-link to="/market" class="btn btn-primary rounded-pill px-4">去逛逛</router-link>
    </div>

    <div v-else class="row g-4">
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-0">
            <div class="list-group list-group-flush">

              <TransitionGroup name="list">
                <div
                    v-for="(item, index) in tradeStore.cart"
                    :key="item.companion.id"
                    class="list-group-item p-4 d-flex align-items-center"
                >
                  <img :src="item.companion.avatar" class="rounded-circle me-3" width="60" height="60" style="object-fit: cover;">

                  <div class="flex-grow-1">
                    <h5 class="mb-1">{{ item.companion.name }} <span class="badge bg-light text-dark border">{{ item.companion.game }}</span></h5>
                    <small class="text-muted">单价: ¥{{ item.companion.price }}/小时</small>
                  </div>

                  <div class="d-flex align-items-center mx-3">
                    <span class="badge bg-secondary me-2">{{ item.hours }} 小时</span>
                  </div>

                  <div class="fw-bold fs-5 me-4">¥{{ item.companion.price * item.hours }}</div>

                  <button class="btn btn-outline-danger btn-sm rounded-circle" @click="tradeStore.removeFromCart(index)">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </TransitionGroup>

            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm bg-light">
          <div class="card-body">
            <h4 class="card-title mb-4">订单摘要</h4>
            <div class="d-flex justify-content-between mb-3">
              <span>商品数量</span>
              <span>{{ tradeStore.cartCount }} 件</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-4">
              <span class="h5">总计</span>
              <span class="h4 text-danger fw-bold">¥{{ tradeStore.cartTotal }}</span>
            </div>
            <button class="btn btn-dark w-100 py-3 rounded-pill" @click="handleCheckout">
              提交订单
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTradeStore } from '@/stores/trade'
import { useRouter } from 'vue-router'

const tradeStore = useTradeStore()
const router = useRouter()

const handleCheckout = () => {
  const orderId = tradeStore.createOrder()
  if (orderId) {
    alert('订单创建成功！请前往订单中心支付。')
    router.push('/orders')
  }
}
</script>

<style scoped>
/* [教学点] 列表动画 CSS */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
/* 确保离开的元素脱离文档流，让下方元素平滑上移 */
.list-leave-active {
  position: absolute;
  width: 100%;
}
</style>