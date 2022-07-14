<template>
  <Loading :active="isLoading"></Loading>
  <div class="col-md-12">
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
              <!-- <div class="h5" v-if="item.price">特價 {{ item.price }} 元</div>
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div> -->
              <div class="h5" v-if="item.price">
                原價 {{ item.origin_price }} 元
              </div>
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
  <Gotop/>
</template>

<script>
import Gotop from '@/components/Gotop.vue'
export default {
  data () {
    return {
      products: [],
      product: {},
      pagination: {},
      status: {
        loadingItem: ''
      }
    }
  },
  components: {
    Gotop
  },
  inject: ['emitter'],
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          res.data.products.forEach((item) => {
            if (item.category === '曼巴') {
              this.products.push(item)
            }
          })
          this.isLoading = false
        }
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
      const path = `/user/${e.target.value}`
      this.$router.push(path)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
