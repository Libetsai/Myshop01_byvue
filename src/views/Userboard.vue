<template>
    <ToastMessage></ToastMessage>
    <router-view></router-view>
</template>
<script>
import emitter from '@/methods/emitter'
import ToastMessage from '@/components/ToastMessage.vue'
export default {
  components: {
    ToastMessage
  },
  provide () {
    return {
      emitter
    }
  }
}
</script>
