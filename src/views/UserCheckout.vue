<template>
  <FrontNavbar ref="getup"></FrontNavbar>
  <Loading :active="isLoading"></Loading>
  <div class="container table mt-4">
    <div class="d-flex justify-content-center align-items-center mb-5">
      <h5 class="fw-bold mb-0 text-black-50">填寫資料</h5>
      <i class="bi bi-arrow-right"></i>
      <h5
        class="fw-bold mb-0 text-black-50"
        :class="{ active: !order.is_paid }"
      >
        確認付款
      </h5>
      <i class="bi bi-arrow-right"></i>
      <h5 class="text-black-50 fw-bold mb-0" :class="{ active: order.is_paid }">
        訂單完成
      </h5>
    </div>
  </div>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="text-end">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td class="text-end">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-success">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
import FrontNavbar from './FrontNavbar.vue'
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false
    }
  },
  components: {
    FrontNavbar
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.isLoading = true
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.isLoading = false
          this.order = res.data.order
        }
      })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.isLoading = true
      this.$http.post(url).then((res) => {
        this.isLoading = false
        if (res.data.success) {
          this.getOrder()
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    console.log(this.orderId)
    this.getOrder()
  }
}
</script>
