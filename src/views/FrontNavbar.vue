<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary sticky-top">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <strong class="navbar-brand" href="#">Libe的店鋪</strong>
          <li class="nav-item">
            <a class="nav-link a-hover" aria-current="page" href="#">首頁</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link a-hover"
              aria-current="page"
              href="#/cart/categoryall"
              >商品</a
            >
          </li>
        </ul>
      </div>
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
      <div class="d-flex d-none d-lg-block pt-1 me-4">
        <a class="navbar-brand text-dark a-hover" href="#/user/sellerlogin">
          <i class="bi bi-person-lines-fill"></i>
        </a>
        <a
          class="navbar-brand text-dark me-0 a-hover"
          href="#"
          @click.prevent=""
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-cart-fill"></i>
          <span class="badge text-light bg-danger"></span>
        </a>
        <div
          class="dropdown-menu dropdown-menu-end a-hover"
          aria-labelledby="navbarDropdownMenuLink"
        >
          <div>
            <table class="table align-middle">
              <thead>
                <tr>
                  <th></th>
                  <th>品名</th>
                  <th class="text-center" style="width: 110px">數量</th>
                  <th>單價</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="cart.carts">
                  <tr v-for="item in cart.carts" :key="item.id">
                    <td>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm"
                        :disabled="status.loadingItem === item.id"
                        @click="removeCartItem(item.id)"
                      >
                        <i class="bi bi-x"></i>
                      </button>
                    </td>
                    <td>
                      {{ item.product.title }}
                      <div class="text-success" v-if="item.coupon">
                        已套用優惠券
                      </div>
                    </td>
                    <td>
                      <div class="input-group input-group-sm">
                        <input
                          type="number"
                          class="form-control text-center"
                          min="1"
                          :disabled="item.id === status.loadingItem"
                          @change="updateCart(item)"
                          v-model.number="item.qty"
                        />
                      </div>
                    </td>
                    <td class="text-end">
                      <small
                        v-if="cart.final_total !== cart.total"
                        class="text-success"
                        >折扣價：</small
                      >
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </template>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" class="text-end">總計</td>
                  <td class="text-end">{{ $filters.currency(cart.total) }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-end text-success">折扣價</td>
                  <td class="text-end text-success">
                    {{ $filters.currency(cart.final_total) }}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <h5 class="fw-bold text-center mb-3" v-if="carts.length == 0">
            產品尚未加入購物車!
          </h5>
          <div class="d-flex justify-content-end">
            <button
              type="button"
              class="btn btn-dark btn-hover rounded-0"
              @click="goCart"
              v-if="carts.length > 0"
            >
              <i class="fas fa-shopping-cart"></i> 結帳去
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import Dropdown from 'bootstrap/js/dist/dropdown'
export default {
  name: {
    Dropdown
  },
  data () {
    return {
      cart: {},
      carts: {},
      status: {
        loadingItem: '' // 對應品項 id
      }
    }
  },
  inject: ['emitter'],
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        console.log(res)
        this.cart = res.data.data
        this.carts = res.data.data.carts
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      this.status.loadingItem = item.id
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.status.loadingItem = ''
        this.getCart()
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((res) => {
        this.$httpMessageState(res, '移除購物車')
        this.status.loadingItem = ''
        this.getCart()
        this.isLoading = false
      })
    },
    goCart () {
      this.$router.push('/user/usertotalcheck')
    }
  },
  created () {
    this.getCart()
    this.emitter.on('resetCart', this.getCart)
  }
}
</script>
