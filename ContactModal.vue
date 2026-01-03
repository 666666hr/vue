<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5)">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ globalConfig.appName }} 客服</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">问题描述</label>
              <textarea
                  class="form-control"
                  rows="4"
                  v-model="message"
                  placeholder="请详细描述您遇到的问题，我们会尽快联系您..."
              ></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">取消</button>
            <button type="button" class="btn btn-primary" @click="send" :disabled="!message">
              <i class="bi bi-send me-1"></i> 提交反馈
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { inject, ref } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const globalConfig = inject('globalConfig', { appName: 'PlayPal' })
const message = ref('') // 绑定输入框内容

const close = () => {
  emit('update:modelValue', false)
}

// 提交逻辑
const send = () => {
  if (!message.value.trim()) {
    alert('请输入问题描述')
    return
  }

  // 模拟提交过程
  setTimeout(() => {
    alert('✅ 客服反馈提交成功！我们将在 24 小时内回复。')
    message.value = '' // 清空输入
    close() // 关闭弹窗
  }, 300)
}
</script>