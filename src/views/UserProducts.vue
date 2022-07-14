<template>
  <FrontNavbar ref="getup"></FrontNavbar>
  <Loading :active="isLoading"></Loading>
  <div class="container my-5">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <il class="breadcrumb-item active" aria-current="page">{{
          product.title
        }}</il>
      </ol>
    </nav>
    <div class="row justify-content-center">
      <article class="col-7">
        <img
          :src="product.imageUrl"
          alt=""
          class="img-fluid"
          width="600"
          height="700"
        />
      </article>
      <div class="col-5">
        <h2>{{ product.title }}</h2>
        <hr />
        <div>{{ product.content }}</div>
        <br />
        <div>{{ product.description }}</div>
        <br /><br />
        <div class="h3" v-if="product.price">NT${{ product.price }} 元</div>
        <br />
        <a href="#" title="加入收藏" @click.prevent="addFollow(product.id)">
          <i
            class="fas bi bi-heart text-danger fs-4"
            v-if="followData.indexOf(product.id) === -1"
          >
          </i>
          <i class="fas bi bi-heart-fill text-danger fs-4" v-else></i>
        </a>
        <hr />
        <div class="d-flex justify-content-end">
          <select class="fs-5 px-1 py-1" v-model.number="quantity">
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
          <button
            type="button"
            class="btn btn-outline-danger"
            @click="addToCart(product.id)"
          >
            <div
              v-if="this.status.loadingItem === product.id"
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
</template>
<script>
import FrontNavbar from './FrontNavbar.vue'
export default {
  data () {
    return {
      product: {},
      products: [],
      quantity: 1,
      id: '',
      status: {
        loadingItem: ''
      },
      followData: JSON.parse(localStorage.getItem('follow')) || []
    }
  },
  components: {
    FrontNavbar
  },
  methods: {
    getProduct () {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((res) => {
        console.log(res.data)
        if (res.data.success) {
          this.product = res.data.product
          this.isLoading = false
        }
      })
    },
    addToCart (id, qty = this.quantity) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((res) => {
        this.status.loadingItem = ''
        this.$httpMessageState(res, '加入購物車')
        this.emitter.emit('resetCart')
      })
    },
    addFollow (id) {
      const followId = this.followData.indexOf(id)
      if (followId === -1) {
        this.followData.push(id)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '加入收藏成功'
        })
      } else {
        this.followData.splice(followId, 1)
        this.emitter.emit('push-message', {
          style: 'success',
          title: '取消收藏成功'
        })
      }
      localStorage.setItem('follow', JSON.stringify(this.followData))
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
  }
}
</script>
