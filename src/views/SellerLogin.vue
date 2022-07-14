<template>
  <FrontNavbar ref="getup"></FrontNavbar>
  <div class="container mt-5">
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="user.username"
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
        </div>
        <label>
          <input type="checkbox" v-model="checked" value="remember-me" />
          記住帳號
        </label>
        <div class="text-end mt-4">
          <button class="btn btn-lg btn-success btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>
  <!-- 橫線 -->
  <hr class="link-top" />
  <!-- 頁尾 -->
  <footer class="footer bg-light mt-3 mt-md-5">
    <div class="container py-4">
      <ul class="list-inline text-center">
        <li class="list-inline-item text-dark">© Copright 2022 Libe's store</li>
      </ul>
      <ul class="list-inline text-center">
        <li class="list-inline-item text-dark">個人練習作品，非商業用途</li>
      </ul>
      <ul class="list-inline text-center mb-0">
        <li class="list-inline-item">
          <a class="text-dark" href="#" @click.prevent="">
            <i class="bi bi-facebook"></i>
          </a>
        </li>
        <li class="list-inline-item ms-2">
          <a class="text-dark" href="#" @click.prevent="">
            <i class="bi bi-instagram"></i>
          </a>
        </li>
        <li class="list-inline-item ms-2">
          <a
            class="text-dark"
            href="https://github.com/Libetsai"
            target="_blank"
          >
            <i class="bi bi-github"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
  <!-- 頁尾結束 -->
</template>

<script>
import FrontNavbar from './FrontNavbar.vue'
export default {
  data () {
    return {
      checked: 'false',
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    FrontNavbar
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`
          this.$router.push('/dashboard/products')
        }
      })
      this.checkaccount()
    },
    checkaccount () {
      if (this.checked === true) {
        this.setcookie(this.user.username)
      } else {
        this.delCookie()
      }
    },
    setcookie (name) {
      const exp = new Date()
      document.cookie = `myname=${name}; expires=${exp}`
    },
    getcookie () {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split(';')
        arr.forEach((item) => {
          const arr2 = item.split('=')
          if (arr2[0] === 'myname') {
            const account = arr2[1]
            this.user.username = account
          }
        })
      }
    },
    delCookie () {
      this.setcookie('', '', -1)
    }
  },
  mounted () {
    this.getcookie()
  }
}
</script>
