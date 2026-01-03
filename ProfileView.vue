<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">

        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4 d-flex align-items-center">
            <img
                :src="userStore.user?.avatar || defaultAvatar"
                class="rounded-circle me-4 border border-3 border-light shadow-sm"
                width="80" height="80"
                style="object-fit: cover;"
            >
            <div class="flex-grow-1">
              <h3 class="fw-bold mb-1">{{ userStore.user?.name || '未登录用户' }}</h3>
              <p class="text-muted mb-0">{{ userStore.user?.email || '请先登录' }}</p>
              <span class="badge bg-warning text-dark mt-2">
                <i class="bi bi-star-fill me-1"></i>VIP 玩家
              </span>
            </div>
            <button class="btn btn-outline-secondary btn-sm" disabled>
              <i class="bi bi-gear"></i> 设置
            </button>
          </div>
        </div>

        <div class="card border-0 shadow-sm mb-4 overflow-hidden">
          <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
            <h6 class="mb-0 fw-bold border-start border-4 border-primary ps-2">我的订单</h6>
            <router-link to="/orders" class="text-white-50 text-decoration-none small">
              查看全部 <i class="bi bi-chevron-right"></i>
            </router-link>
          </div>

          <div class="card-body bg-dark text-white p-4">
            <div class="row text-center g-3">
              <div class="col position-relative cursor-pointer" @click="goToOrders">
                <div class="icon-box mb-2">
                  <i class="bi bi-wallet2 fs-3 text-white"></i>
                  <span v-if="tradeStore.orderStats.pending > 0" class="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">
                    {{ tradeStore.orderStats.pending }}
                  </span>
                </div>
                <div class="small opacity-75">待支付</div>
              </div>

              <div class="col position-relative cursor-pointer" @click="goToOrders">
                <div class="icon-box mb-2">
                  <i class="bi bi-check-circle-fill fs-3 text-success"></i>
                  <span v-if="tradeStore.orderStats.paid > 0" class="position-absolute top-0 start-60 translate-middle badge rounded-pill bg-danger">
                    {{ tradeStore.orderStats.paid }}
                  </span>
                </div>
                <div class="small opacity-75">已支付</div>
              </div>

              <div class="col position-relative cursor-pointer">
                <div class="icon-box mb-2">
                  <i class="bi bi-controller fs-3 text-white"></i>
                </div>
                <div class="small opacity-75">服务中</div>
              </div>

              <div class="col position-relative cursor-pointer" @click="goToOrders">
                <div class="icon-box mb-2">
                  <i class="bi bi-clock-history fs-3 text-white"></i>
                </div>
                <div class="small opacity-75">历史订单</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-group shadow-sm border-0 mb-4">
          <button class="list-group-item list-group-item-action p-3 d-flex align-items-center" @click="showNativeModal = true">
            <div class="icon-square bg-light text-primary rounded me-3">
              <i class="bi bi-headset"></i>
            </div>
            <div class="flex-grow-1">
              联系客服
              <span class="badge bg-light text-secondary border ms-2" style="font-size: 0.7em">Channel A</span>
            </div>
            <i class="bi bi-chevron-right text-muted"></i>
          </button>

          <button class="list-group-item list-group-item-action p-3 d-flex align-items-center" @click="showLibModal = true">
            <div class="icon-square bg-light text-success rounded me-3">
              <i class="bi bi-gem"></i>
            </div>
            <div class="flex-grow-1">
              VIP 专属客服
              <span class="badge bg-light text-secondary border ms-2" style="font-size: 0.7em">Channel B</span>
            </div>
            <i class="bi bi-chevron-right text-muted"></i>
          </button>

          <button class="list-group-item list-group-item-action p-3 d-flex align-items-center" @click="showFeedbackModal = true">
            <div class="icon-square bg-light text-info rounded me-3">
              <i class="bi bi-chat-dots"></i>
            </div>
            <div class="flex-grow-1">意见反馈</div>
            <i class="bi bi-chevron-right text-muted"></i>
          </button>
        </div>

        <button class="btn btn-danger bg-gradient w-100 py-3 fw-bold rounded-3 shadow-sm" @click="handleLogout">
          退出登录
        </button>

      </div>
    </div>

    <ContactModal v-model="showNativeModal" />
    <ContactModalVueNext v-model="showLibModal" />

    <Teleport to="body">
      <div v-if="showFeedbackModal" class="modal fade show d-block" style="background: rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">意见反馈</h5>
              <button type="button" class="btn-close" @click="showFeedbackModal = false"></button>
            </div>
            <div class="modal-body">
              <textarea class="form-control" rows="4" v-model="feedbackContent" placeholder="请详细描述..."></textarea>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showFeedbackModal = false">取消</button>
              <button class="btn btn-primary" @click="submitFeedback" :disabled="!feedbackContent">提交</button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useTradeStore } from '@/stores/trade'
// 引入组件
import ContactModal from '@/components/ContactModal.vue'
import ContactModalVueNext from '@/components/ContactModalVueNext.vue'

const router = useRouter()
const userStore = useUserStore()
const tradeStore = useTradeStore()

const defaultAvatar = 'https://placehold.co/100x100/e9ecef/6c757d?text=User'

// 模态框控制状态
const showNativeModal = ref(false)
const showLibModal = ref(false)
const showFeedbackModal = ref(false)
const feedbackContent = ref('')

const submitFeedback = () => {
  setTimeout(() => {
    alert('✅ 意见反馈已提交！')
    showFeedbackModal.value = false
    feedbackContent.value = ''
  }, 300)
}

const handleLogout = () => {
  if(confirm('确定要退出当前账号吗？')) {
    userStore.logout()
    router.push('/login')
  }
}

const goToOrders = () => {
  router.push('/orders')
}
</script>

<style scoped>
.icon-box {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cursor-pointer {
  cursor: pointer;
  transition: opacity 0.2s;
}

.cursor-pointer:hover {
  opacity: 0.8;
}

.icon-square {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}
</style>