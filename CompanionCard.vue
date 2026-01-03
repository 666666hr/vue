<template>
  <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="card h-100 shadow-sm border-0 companion-card">
      <div class="position-relative">
        <img :src="info.avatar" class="card-img-top" :alt="info.name" style="height: 200px; object-fit: cover;">
        <span class="badge bg-dark bg-opacity-75 position-absolute top-0 end-0 m-2 rounded-pill">
          {{ info.game }}
        </span>
      </div>
      <div class="card-body d-flex flex-column">
        <h5 class="card-title d-flex justify-content-between align-items-center">
          {{ info.name }}
          <span class="text-primary fs-6">¥{{ info.price }}/h</span>
        </h5>
        <p class="card-text text-muted small">
          <i class="bi bi-trophy-fill text-warning"></i> {{ info.rank }}
        </p>
        <button class="btn btn-outline-primary w-100 mt-auto" @click="$emit('book', info)">
          立即下单
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ info: Object })
defineEmits(['book'])
</script>

<style scoped>
.companion-card { transition: transform 0.2s; cursor: pointer; }
.companion-card:hover { transform: translateY(-5px); }
</style>