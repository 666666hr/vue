<template>
  <BModal
      v-model="isOpen"
      :title="`${globalConfig.appName} 专属客服`"
      centered
      @ok="handleOk"
      ok-title="提交"
      cancel-title="取消"
      :ok-disabled="!message"
  >
    <BFormGroup label="问题描述" label-for="bv-textarea">
      <BFormTextarea
          id="bv-textarea"
          v-model="message"
          placeholder="请输入您的问题 (支持 Markdown)..."
          rows="4"
      />
    </BFormGroup>
  </BModal>
</template>

<script setup>
import { computed, inject, ref } from 'vue'

// 👇👇👇【关键修改】手动引入需要的组件 👇👇👇
import { BModal, BFormGroup, BFormTextarea } from 'bootstrap-vue-next'
// 👆👆👆 这样 Vue 就绝对能找到它们了！👆👆👆

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

// 给 inject 加个默认值，防止 App.vue 没写好导致报错
const globalConfig = inject('globalConfig', { appName: 'PlayPal' })

const message = ref('')

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleOk = (bvModalEvent) => {
  if (!message.value.trim()) {
    bvModalEvent.preventDefault()
    return
  }
  alert('✅ (VIP通道) 反馈已送达！')
  message.value = ''
}
</script>