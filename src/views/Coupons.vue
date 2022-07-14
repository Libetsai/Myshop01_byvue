<template>
  <!-- <Loading :active="isLoading"></Loading> -->
  <div class="text-end mt-4">
    <button class="btn btn-success" type="button" @click="openCouponModal(true)">
      建立新的優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item) in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ item.due_date }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click="openCouponModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal(item)">刪除</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <CouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    @update-coupon="updateCoupon"
  ></CouponModal>
  <DelModal :item="tempCoupon" ref="deleteModal" @del-item="deleteCoupon"/>
</template>

<script>
import CouponModal from '@/components/CouponModal.vue'
import DelModal from '@/components/DelModal.vue'
export default {
  props: {
    config: Object
  },
  data () {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false
    }
  },
  components: {
    CouponModal,
    DelModal
  },
  inject: ['emitter'],
  methods: {
    getCoupons () {
      // this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons`
      this.$http.get(url).then((response) => {
        // this.isLoading = false;
        if (response.data.success) {
          console.log(response)
          this.coupons = response.data.coupons
        }
      })
    },
    openCouponModal (isNew, item) {
      if (isNew) {
        this.tempCoupon = {}
      } else {
        this.tempCoupon = { ...item }
      }
      this.isNew = isNew
      const couponComponent = this.$refs.couponModal
      couponComponent.showModal()
    },
    updateCoupon (item) {
      this.tempCoupon = item
      // 新增
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`
      let httpMethod = 'post'
      // 編輯
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${item.id}`
        httpMethod = 'put'
      }
      const couponComponent = this.$refs.couponModal
      this.$http[httpMethod](api, { data: this.tempCoupon }).then(
        (res) => {
          couponComponent.hideModal()
          if (res.data.success) {
            this.getCoupons()
            this.emitter.emit('push-message', {
              style: 'success',
              title: '更新成功'
            })
          } else {
            this.emitter.emit('push-message', {
              style: 'danger',
              title: '更新失敗',
              content: res.data.message.join('、')
            })
          }
        }
      )
    },
    openDeleteModal (item) {
      this.tempCoupon = { ...item }
      const deleteComponent = this.$refs.deleteModal
      this.isLoading = true
      deleteComponent.showModal()
      this.isLoading = false
    },
    deleteCoupon () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(url).then((response) => {
        console.log(response.data)
        const deleteComponent = this.$refs.deleteModal
        deleteComponent.hideModal()
        this.getCoupons()
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>
