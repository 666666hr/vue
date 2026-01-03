<template>
  <div class="container py-4">
    <div class="row g-3 mb-4 align-items-center">
      <div class="col-md-6">
        <div class="input-group shadow-sm">
          <span class="input-group-text bg-white"><i class="bi bi-search"></i></span>
          <input v-model="searchText" type="text" class="form-control border-start-0" placeholder="搜索陪玩师或游戏...">
        </div>
      </div>
      <div class="col-md-6">
        <div class="d-flex gap-2 overflow-auto">
          <button
              v-for="cat in categories" :key="cat"
              class="btn btn-sm rounded-pill text-nowrap"
              :class="selectedCat === cat ? 'btn-primary' : 'btn-outline-secondary'"
              @click="selectedCat = selectedCat === cat ? '' : cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div v-else class="row g-4">
      <CompanionCard
          v-for="item in filteredList"
          :key="item.id"
          :info="item"
          @book="openBookingModal"
      />

      <div v-if="filteredList.length === 0" class="text-center text-muted py-5">
        暂无符合条件的陪玩师
      </div>
    </div>

    <Teleport to="body">
      <div v-if="showModal" class="modal fade show d-block" style="background: rgba(0,0,0,0.5)">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">预约 {{ currentItem?.name }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>
            <div class="modal-body">
              <p>游戏项目: <span class="badge bg-secondary">{{ currentItem?.game }}</span></p>
              <div class="mb-3">
                <label class="form-label">时长 (小时)</label>
                <input type="number" class="form-control" v-model.number="hours" min="1">
              </div>
              <div class="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <span>总价:</span>
                <span class="h4 text-danger mb-0">¥{{ totalPrice }}</span>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showModal = false">再看看</button>
              <button class="btn btn-primary bg-gradient" @click="confirmOrder">
                <i class="bi bi-cart-plus me-1"></i>加入购物车并结算
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router' // 1. 引入 useRouter 用于跳转
import { useCompanions } from '@/composables/useCompanions'
import { useTradeStore } from '@/stores/trade' // 2. 引入交易状态库
import CompanionCard from '@/components/CompanionCard.vue'

const route = useRoute() // 获取当前路由参数 (query)
const router = useRouter() // 获取路由实例 (push)
const tradeStore = useTradeStore() // 初始化 Store
const { companions, loading, categories, fetchAll } = useCompanions()

// 本地状态
const searchText = ref('')
const selectedCat = ref('')
const showModal = ref(false)
const currentItem = ref(null)
const hours = ref(1)

// 筛选逻辑 (Computed)
const filteredList = computed(() => {
  return companions.value.filter(c => {
    const matchText = c.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
        c.game.toLowerCase().includes(searchText.value.toLowerCase())
    const matchCat = !selectedCat.value || c.game === selectedCat.value
    return matchText && matchCat
  })
})

const totalPrice = computed(() => (currentItem.value?.price || 0) * hours.value)

// 打开模态框
const openBookingModal = (item) => {
  currentItem.value = item
  hours.value = 1
  showModal.value = true
}

// 核心修改：确认下单逻辑
const confirmOrder = () => {
  if (currentItem.value) {
    // 1. 调用 Store 将商品加入购物车
    tradeStore.addToCart(currentItem.value, hours.value)

    // 2. 关闭弹窗
    showModal.value = false

    // 3. 直接跳转到购物车页面
    router.push('/cart')
  }
}

// 生命周期
onMounted(async () => {
  // 1. 先加载数据
  await fetchAll()

  // 2. 检查 URL 是否有 game 参数 (如 /market?game=LoL) 并自动筛选
  if (route.query.game) {
    if (categories.value.includes(route.query.game)) {
      selectedCat.value = route.query.game
    }
  }
})
</script>