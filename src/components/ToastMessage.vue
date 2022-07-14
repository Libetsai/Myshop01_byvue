<template>
  <div class="toastcontainer">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>
<style lang="scss" scoped>
  .toastcontainer{
    position: fixed;
    top: 100px;
    left: 85%;
    transform: translate(-50%, -50%);
    z-index: 3;
  }
</style>
<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast },
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'],
  mounted () {
    // message是外部傳來的資訊
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message
      this.messages.push({ style, title, content })
    })
  }
}
</script>
