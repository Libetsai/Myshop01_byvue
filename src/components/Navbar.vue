<template>
  <nav class="navbar navbar-expand-lg navbar-secondary bg-secondary">
    <div class="container-fluid">
      <strong class="navbar-brand" href="#">Libe的店鋪</strong>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" @click="logouthome">首頁</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/products"
              >產品</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/orders"
              >訂單</router-link
            >
          </li>
          <li class="nav-itme">
            <router-link class="nav-link" to="/dashboard/coupons"
              >優惠卷</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout">登出logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/user/sellerlogin')
        }
      })
    },
    logouthome () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/cart/categoryall')
        }
      })
    }
  }
}
</script>
