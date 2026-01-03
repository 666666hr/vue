<template>
  <div class="container main-layout">

    <main class="content-area">

      <div
          id="heroCarousel"
          ref="carouselRef"
          class="carousel slide carousel-fade mb-5 rounded-4 overflow-hidden shadow-sm"
      >
        <div class="carousel-indicators">
          <button
              v-for="(slide, index) in slides"
              :key="'indicator-' + index"
              type="button"
              data-bs-target="#heroCarousel"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
          ></button>
        </div>

        <div class="carousel-inner">
          <div
              v-for="(slide, index) in slides"
              :key="'slide-' + index"
              class="carousel-item"
              :class="{ active: index === 0 }"
          >
            <img :src="slide.image" class="d-block w-100 hero-img" :alt="slide.title">
            <div class="carousel-caption d-flex flex-column justify-content-end align-items-start text-start p-4 p-md-5 hero-caption-overlay">
              <div class="container-fluid px-0">
                <h2 class="display-6 fw-bold mb-2">{{ slide.title }}</h2>
                <p class="lead mb-3 d-none d-md-block fs-6 opacity-75">{{ slide.desc }}</p>
                <button
                    @click="router.push('/market')"
                    class="btn btn-primary rounded-pill px-4 shadow-sm"
                >
                  <i class="bi bi-controller me-2"></i>立即下单
                </button>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      <section class="mb-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold m-0"><i class="bi bi-fire text-danger me-2"></i>热门竞技</h3>
          <button @click="router.push('/market')" class="btn btn-link text-decoration-none text-muted small">查看全部 ></button>
        </div>

        <div class="row row-cols-2 row-cols-md-2 g-3">
          <div class="col" v-for="tag in featuredTags" :key="tag.key">
            <div
                class="card article-card text-center h-100 py-4 cursor-pointer"
                @click="navigateToCategory(tag.key)"
            >
              <div class="card-body">
                <div class="mb-3 icon-wrapper">
                  <i :class="`bi ${tag.icon} display-4 text-primary`"></i>
                </div>
                <h5 class="card-title fw-bold text-dark">{{ tag.title }}</h5>
                <p class="card-text text-muted small">{{ tag.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="p-4 bg-white rounded-4 shadow-sm border border-light">
        <h4 class="fw-bold mb-4">为什么选择 PlayPal?</h4>
        <div class="row g-4">
          <div class="col-md-4 text-center">
            <div class="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
              <i class="bi bi-shield-check fs-4"></i>
            </div>
            <h6 class="fw-bold">官方认证</h6>
            <p class="small text-muted mb-0">严格审核 真人陪玩</p>
          </div>
          <div class="col-md-4 text-center">
            <div class="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
              <i class="bi bi-lightning-charge fs-4"></i>
            </div>
            <h6 class="fw-bold">极速接单</h6>
            <p class="small text-muted mb-0">平均响应 < 2分钟</p>
          </div>
          <div class="col-md-4 text-center">
            <div class="feature-icon bg-primary bg-opacity-10 text-primary rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
              <i class="bi bi-chat-heart fs-4"></i>
            </div>
            <h6 class="fw-bold">贴心陪伴</h6>
            <p class="small text-muted mb-0">提供满分情绪价值</p>
          </div>
        </div>
      </section>
    </main>

    <aside class="sidebar-area">

      <div class="sidebar-widget">
        <h5 class="fw-bold mb-3">⚡ 快速找大神</h5>
        <form novalidate @submit.prevent="handleQuickSearch">
          <div class="mb-3">
            <label class="form-label small text-muted">游戏 ID / 昵称</label>
            <input
                v-model="searchKeyword"
                type="text"
                class="form-control"
                placeholder="输入大神昵称..."
                required
            >
            <div class="invalid-feedback">请输入要搜索的大神昵称</div>
          </div>
          <button type="submit" class="btn btn-dark w-100">
            <i class="bi bi-search me-1"></i>搜索
          </button>
        </form>
      </div>

      <div class="sidebar-widget">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold m-0">🏆 今日红人榜</h5>
          <button @click="fetchAll" class="btn btn-sm btn-link text-decoration-none p-0 text-muted" :disabled="loading">
            <i class="bi bi-arrow-clockwise" :class="{'spin-anim': loading}"></i>
          </button>
        </div>

        <div v-if="loading" class="text-center py-4 text-muted">
          <div class="spinner-border spinner-border-sm text-primary mb-2" role="status"></div>
          <p class="small mb-0">正在寻找大神...</p>
        </div>

        <ul v-else class="list-group list-group-flush">
          <li
              class="list-group-item d-flex align-items-center px-0 bg-transparent border-bottom-0 py-2"
              v-for="(item, index) in topCompanions"
              :key="item.id"
          >
            <span
                class="badge me-2 rounded-pill border"
                :class="index < 3 ? 'bg-warning text-dark border-warning' : 'bg-light text-dark'"
            >
              {{ index + 1 }}
            </span>

            <img :src="item.avatar" class="rounded-circle me-2 object-fit-cover" width="40" height="40" alt="Avatar">

            <div class="flex-grow-1 lh-1">
              <div class="small fw-bold mb-1">{{ item.name }}</div>
              <div class="d-flex align-items-center">
                <span class="badge bg-primary bg-opacity-10 text-primary p-1 me-1 scale-text">{{ item.game }}</span>
              </div>
            </div>

            <button
                @click="openOrderModal(item)"
                class="btn btn-sm btn-outline-primary rounded-pill px-3 ms-2"
                style="font-size: 12px;"
            >
              ¥{{ item.price }}
            </button>
          </li>
        </ul>
      </div>

      <div class="sidebar-widget bg-primary text-white text-center p-4" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <h5 class="fw-bold">新人首单半价</h5>
        <p class="small opacity-75 mb-3">注册即送 50元 优惠券包</p>
        <button class="btn btn-light btn-sm rounded-pill w-100 text-primary fw-bold">立即领取</button>
      </div>

    </aside>

    <Teleport to="body">
      <div v-if="showModal" class="modal fade show d-block" style="background: rgba(0,0,0,0.5)" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">

            <div class="modal-header">
              <h5 class="modal-title fw-bold">预约 {{ currentItem?.name }}</h5>
              <button type="button" class="btn-close" @click="showModal = false"></button>
            </div>

            <div class="modal-body">
              <div class="d-flex align-items-center mb-3">
                <img :src="currentItem?.avatar" class="rounded-circle me-3" width="50" height="50" style="object-fit:cover;">
                <div>
                  <div class="fw-bold">{{ currentItem?.game }}</div>
                  <small class="text-muted">{{ currentItem?.rank }}</small>
                </div>
                <div class="ms-auto fw-bold text-primary">¥{{ currentItem?.price }}/h</div>
              </div>

              <label class="form-label fw-bold">时长 (小时)</label>
              <div class="input-group mb-3">
                <button class="btn btn-outline-secondary" @click="hours > 1 && hours--">-</button>
                <input type="number" class="form-control text-center" v-model.number="hours" readonly>
                <button class="btn btn-outline-secondary" @click="hours++">+</button>
              </div>

              <div class="d-flex justify-content-between pt-3 border-top">
                <span class="text-muted">总价:</span>
                <span class="h3 text-danger fw-bold">¥{{ totalPrice }}</span>
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-primary w-100 rounded-pill" @click="confirmOrder">
                <i class="bi bi-cart-plus me-1"></i> 加入购物车
              </button>
            </div>

          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Carousel } from 'bootstrap' // 引入 JS 确保轮播图自动播放生效
import { useCompanions } from '@/composables/useCompanions'
import { useTradeStore } from '@/stores/trade' // 引入购物车 Store

const router = useRouter()
const tradeStore = useTradeStore()
const carouselRef = ref(null)

// === 1. 获取真实数据 (红人榜) ===
const { companions, loading, fetchAll } = useCompanions()

// 截取前 5 位显示在侧边栏
const topCompanions = computed(() => companions.value.slice(0, 5))

// === 2. 搜索逻辑 (侧边栏) ===
const searchKeyword = ref('')
const handleQuickSearch = () => {
  if (searchKeyword.value.trim()) {
    // 真实跳转：带上参数到市场页
    router.push({
      path: '/market',
      query: { keyword: searchKeyword.value }
    })
  }
}

// === 3. 弹窗下单逻辑 (新增) ===
const showModal = ref(false)
const currentItem = ref(null)
const hours = ref(1)

// 计算总价
const totalPrice = computed(() => (currentItem.value?.price || 0) * hours.value)

// 打开弹窗
const openOrderModal = (item) => {
  currentItem.value = item
  hours.value = 1
  showModal.value = true
}

// 确认加入购物车
const confirmOrder = () => {
  if (currentItem.value) {
    // 调用 trade.js 中的 addToCart(item, hours)
    tradeStore.addToCart(currentItem.value, hours.value)

    // 关闭弹窗
    showModal.value = false

    // 跳转到购物车页面
    router.push('/cart')
  }
}

// === 4. 原有功能保持不变 ===
// 轮播图数据
const slides = ref([
  {
    title: "三角洲行动 (Delta Force)",
    desc: "海陆空全域作战，全新干员战术射击体验。",
    image: "https://playerhub.df.qq.com/playerhub/c4c4de5d-ad43-4704-916d-96c12b7922f6.png"
  },
  {
    title: "英雄联盟 (League of Legends)",
    desc: "峡谷之巅舍我其谁？十年经典 MOBA。",
    image: "https://placehold.co/1920x600/091428/c8aa6e?text=League+of+Legends"
  },
  {
    title: "无畏契约 (VALORANT)",
    desc: "英雄技能与硬核枪法的完美结合。",
    image: "https://www.riotgames.com/darkroom/2880/d0807e131a84f2e42c7a303bda672789:11e28b4d98139a872c497ec046ee0e58/valorant-offwhitelaunch-keyart.jpg"
  },
  {
    title: "CS:GO / CS2",
    desc: "Rush B 不解释！硬核 FPS 竞技体验。",
    image: "https://placehold.co/1920x600/2b2f42/de9b35?text=CS:GO+2"
  }
])

// 特色标签数据
const featuredTags = ref([
  { title: '英雄联盟', key: 'LoL', desc: '峡谷之巅', icon: 'bi-trophy-fill' },
  { title: 'Valorant', key: 'Valorant', desc: '战术博弈', icon: 'bi-crosshair' },
  { title: '三角洲行动', key: '三角洲行动', desc: '战术突袭', icon: 'bi-shield-shaded' },
  { title: 'CS:GO', key: 'CS:GO', desc: '经典传承', icon: 'bi-controller' }
])

const navigateToCategory = (key) => {
  router.push({ path: '/market', query: { game: key } })
}

// === 5. 生命周期 ===
onMounted(() => {
  // 加载红人榜数据
  fetchAll()

  // 确保轮播图 4秒自动切换生效
  if (carouselRef.value) {
    new Carousel(carouselRef.value, {
      interval: 4000,
      ride: 'carousel',
      wrap: true
    })
  }
})
</script>

<style scoped>
/* 保持你原有的样式 */
.hero-img {
  height: 400px;
  object-fit: cover;
  filter: brightness(0.85);
  transition: transform 0.5s ease;
}

.carousel-item:hover .hero-img {
  transform: scale(1.02);
}

.hero-caption-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%);
}

.cursor-pointer {
  cursor: pointer;
}

.article-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(5deg);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* 辅助样式 */
.object-fit-cover {
  object-fit: cover;
}

.scale-text {
  font-size: 0.75rem;
}

.spin-anim {
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>