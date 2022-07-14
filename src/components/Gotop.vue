<template>
  <div
    class="goTop iconfont ml-gotop"
    :class="isTop ? 'goTopAfter' : ''"
    @click="goTop()"
  >
    <i class="bi bi-arrow-up-circle"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      scrollNum: 0,
      isTop: false
    }
  },
  methods: {
    goTop () {
      document.documentElement.scrollTop = 0
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      const top =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      this.scrollNum = top
      if (top >= 100) {
        this.isTop = true
      } else {
        this.isTop = false
      }
    })
  }
}
</script>

<style scoped>
.goTop {
  position: fixed;
  bottom: -75px;
  right: 4%;
  width: 60px;
  height: 60px;
  border-radius: 25px;
  z-index: 10;
  transition: 0.3s ease-in-out;
  font-size: 50px;
  text-align: center;
  line-height: 60px;
  color: #5f5f5f;
  transition: 0.3s ease-in-out;
  cursor: pointer;
}
.goTop:hover {
  transition: 0.3s ease-in-out;
}
.goTopAfter {
  transition: 0.3s ease-in-out;
  bottom: 100px;
}
</style>
