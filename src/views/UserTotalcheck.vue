<template>
  <FrontNavbar />
  <Loading :active="isLoading"></Loading>
  <div class="container-fluid d-flex justify-content-center table mt-4">
    <div class="col-md-8">
      <div class="d-flex justify-content-center">
        <h1 class="fs-2 fw-bold">購物車清單</h1>
      </div>
      <div class="table-responsive-md mt-4">
        <table class="table align-middle">
          <thead class="table-success text-center">
            <tr class="table-nowrap">
              <th width="100"></th>
              <th width="200">品名</th>
              <th width="150" class="text-center">數量</th>
              <th width="200" class="text-center">單價</th>
            </tr>
          </thead>
          <tbody class="text-center">
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
                      class="form-control text-end"
                      min="1"
                      :disabled="item.id === status.loadingItem"
                      @change="updateCart(item)"
                      v-model.number="item.qty"
                    />
                    <div class="input-group-text">
                      / {{ item.product.unit }}
                    </div>
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
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-success"
              type="button"
              @click="addCouponCode(cart.id)"
            >
              <div
                v-if="this.status.loadingItem === cart.id"
                class="spinner-border text-success spinner-border-sm"
                role="status"
              >
                <span class="sr-only"></span>
              </div>
              套用優惠券
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <hr class="link-top" />
  <!-- 以下是表單以下是表單以下是表單以下是表單 -->
  <div class="container">
    <div class="d-flex justify-content-center align-items-center mb-5">
      <h5 class="fw-bold mb-0 active">填寫資料</h5>
      <i class="bi bi-arrow-right"></i>
      <h5 class="text-black-50 fw-bold mb-0">確認付款</h5>
      <i class="bi bi-arrow-right"></i>
      <h5 class="text-black-50 fw-bold mb-0">訂單完成</h5>
    </div>
  </div>

  <div class="row justify-content-center">
    <Form class="col-md-6" v-slot="{ errors }" @submit="createOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="numeric|required"
          v-model="form.user.tel"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          name=""
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button class="btn btn-outline-success">送出訂單</button>
      </div>
    </Form>
  </div>
</template>

<script>
import FrontNavbar from './FrontNavbar.vue'
export default {
  data () {
    return {
      cart: {},
      coupon_code: '',
      status: {
        loadingItem: '' // 對應品項 id
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  components: {
    FrontNavbar
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        this.cart = response.data.data
        this.isLoading = false
      })
    },
    updateCart (item) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      this.isLoading = true
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log(res)
        this.getCart()
      })
    },
    removeCartItem (id) {
      this.status.loadingItem = id
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = ''
        this.getCart()
        this.emitter.emit('removeCart')
        this.isLoading = false
      })
    },
    addCouponCode (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon`
      this.status.loadingItem = id
      const coupon = {
        code: this.coupon_code
      }
      this.$http.post(url, { data: coupon }).then((response) => {
        this.status.loadingItem = ''
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order }).then((res) => {
        this.$router.push(`checkout/${res.data.orderId}`)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
