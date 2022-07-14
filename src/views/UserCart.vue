<template>
  <FrontNavbar ref="getup"></FrontNavbar>
  <ToastMessage></ToastMessage>
<div
  class="bg-image"
  style="
    background-image: url('https://wallpapers.com/images/high/plain-white-background-rw2ymugeo9xdbrpv.jpg');
    height: auto;
  "
>
  <div
    id="carouselExampleDark"
    class="carousel carousel-dark slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleDark"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="5000">
        <div
          class="d-block w-100"
          style="
            background-image: url('https://cdn.pixabay.com/photo/2016/11/14/05/21/children-1822688_1280.jpg');
            height: 65vh;
            background-size: cover;
            background-position: center;
          "
        >
          <div class="carousel-caption d-none d-md-block">
            <h1 class="text-light">讓運動豐富生活每一天</h1>
          </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="5000">
        <div
          class="d-block w-100"
          style="
            background-image: url('https://images.pexels.com/photos/1152359/pexels-photo-1152359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
            height: 65vh;
            background-size: cover;
            background-position: center;
          "
        >
          <div class="carousel-caption d-none d-md-block">
            <h3 class="text-light">夏日祭典來臨，全館滿額送好禮!!!</h3>
            <h5>意想不到的超值優惠等你/妳來領取</h5>
          </div>
        </div>
      </div>
      <div class="carousel-item" data-bs-interval="5000">
        <div
          class="d-block w-100"
          style="
            background-image: url('https://groupdvcdn.azureedge.net/Content/Uploads/2016/04/maxresdefault-14.jpg');
            height: 65vh;
            background-size: cover;
            background-position: center;
          "
        >
          <div class="carousel-caption d-none d-md-block">
            <h2 class="text-light">MAMBA IS BACK</h2>
            <h5 class="text-light">Kobe系列鞋款即將上架，敬請期待</h5>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleDark"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

  <div class="container table mt-5 ">
    <div class="row">
      <!-- 左邊選單 -->
      <div class="col-md-3">
        <div class="list-group sticky-list mb-4">
          <li class="list-group-item list-group-item-actio">
            <i class="bi bi-chevron-double-right"></i>
            <router-link
              to="/cart/categoryall"
              class="pe-3 fs-5 fw-bold"
              style="text-decoration: none; color: inherit"
            >
              顯示全部</router-link
            >
          </li>
          <li class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-double-right"></i>
            <router-link
              to="/cart/category1"
              class="pe-3 fs-5 fw-bold"
              style="text-decoration: none; color: inherit"
            >
              本月優惠</router-link
            >
          </li>
          <li class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-double-right"></i>
            <router-link
              to="/cart/category2"
              class="pe-3 fs-5 fw-bold"
              style="text-decoration: none; color: inherit"
            >
              店長推薦</router-link
            >
          </li>
          <li class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-double-right"></i>
            <router-link
              to="/cart/category3"
              class="pe-3 fs-5 fw-bold"
              style="text-decoration: none; color: inherit"
            >
              MAMBA Series</router-link
            >
          </li>
        </div>
      </div>
      <!-- 這試左邊選單 結束-->
      <div class="col-md-9">
        <router-view />
      </div>
    </div>
  </div>
  <!-- <div class="container table mt-5">
    <div class="col-md-9">
      <div class="row">
        <div
          class="col-md-6 col-lg-4 mb-4"
          v-for="item in products"
          :key="item.id"
        >
          <div class="gamescard card border-1 shadow-sm">
            <div
              style="
                height: 180px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            ></div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{
                item.category
              }}</span>
              <h5 class="card-title text-dark">
                {{ item.title }}
              </h5>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="item.price">特價 {{ item.price }} 元</div>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="h6" v-if="item.price"
                  >原價 {{ item.origin_price }} 元</del
                >
              </div>
            </div>

            <div class="card-footer d-flex justify-content-around">
              <button
                type="button"
                class="btn btn-outline-success"
                @click="getProduct(item.id)"
              >
                查看詳細
              </button>
              <div></div>
              <button
                type="button"
                class="btn btn-outline-danger"
                :disabled="this.status.loadingItem === item.id"
                @click="addCart(item.id)"
              >
                <div
                  v-if="this.status.loadingItem === item.id"
                  class="spinner-border text-danger spinner-border-sm"
                  role="status"
                >
                  <span class="sr-only"></span>
                </div>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <!-- 頁尾 -->
  <footer class="footer bg-light">
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
</div>
</template>
<script>
import carousel from 'bootstrap/js/dist/carousel'
import ToastMessage from '@/components/ToastMessage.vue'
import FrontNavbar from './FrontNavbar.vue'
import emitter from '@/methods/emitter'
export default {
  data () {
    return {
      name: carousel,
      products: [],
      product: {},
      cart: {},
      status: {
        loadingItem: ''
      }
      // form: {
      //   user: {
      //     name: '',
      //     email: '',
      //     tel: '',
      //     address: ''
      //   },
      //   message: ''
      // },
      // coupon_code: ''
    }
  },
  components: {
    FrontNavbar,
    ToastMessage
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        this.products = res.data.products
        console.log('products', res)
        this.isLoading = false
      })
    },
    getProduct (id) {
      this.$router.push(`/user/product/${id}`)
    },
    addCart (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        this.$httpMessageState(res, '加入購物車')
        this.emitter.emit('resetCart')
      })
    },
    toProducts (e) {
      const path = `/cart/${e.target.value}`
      this.$router.push(path)
    }

    // addCouponCode () {
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
    //   const coupon = {
    //     code: this.coupon_code
    //   }
    //   this.$http.post(url, { data: coupon }).then((res) => {
    //     console.log(res)
    //     this.getCart()
    //   })
    // },
    // createOrder () {
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
    //   this.isLoading = true
    //   const order = this.form
    //   this.$http.post(url, { data: order }).then((res) => {
    //     console.log(res)
    //     const orderId = res.data.orderId
    //     this.isLoading = false
    //     this.$router.push(`./checkout/${orderId}`)
    //   })
    // }
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    this.getProducts()
    // this.getCart()
  }
}
</script>
