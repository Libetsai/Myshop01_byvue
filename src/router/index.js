import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/Products.vue')
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../views/Orders.vue')
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/Coupons.vue')
      }
    ]
  },
  {
    path: '/user',
    // 此路徑不需要驗證流程
    component: () => import('../views/Userboard.vue'),
    // 用戶端
    children: [
      {
        path: 'product/:productId',
        component: () => import('../views/UserProducts.vue')
        // 單一產品頁面
      },
      {
        path: 'checkout/:orderId',
        component: () => import('../views/UserCheckout.vue')
      },
      {
        path: 'usertotalcheck',
        component: () => import('../views/UserTotalcheck.vue')
      },
      {
        path: 'like',
        component: () => import('../views/Userlike.vue')
      },
      {
        path: 'sellerlogin',
        component: () => import('../views/SellerLogin.vue')
      }
    ]
  },
  {
    path: '/cart',
    component: () => import('../views/UserCart.vue'),
    children: [
      {
        path: 'frontnavbar',
        component: () => import('../views/FrontNavbar.vue')
      },
      {
        path: 'categoryall',
        component: () => import('../views/ProductsCategory/CategoryAll.vue')
      },
      {
        path: 'category1',
        component: () => import('../views/ProductsCategory/Category1.vue')
      },
      {
        path: 'category2',
        component: () => import('../views/ProductsCategory/Category2.vue')
      },
      {
        path: 'category3',
        component: () => import('../views/ProductsCategory/Category3.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

export default router
