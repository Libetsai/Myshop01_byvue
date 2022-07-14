<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-secondary">
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
    </div>
  </nav>
  <!-- Background image -->
  <div
    class="bg-image"
    style="
      background-image: url('https://images.pexels.com/photos/4753898/pexels-photo-4753898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      height: 67vh;
      background-size: cover;
      background-position: center;
    "
  >
    <div class="mask gradient-custom">
      <div class="d-flex justify-content-center align-items-center h-100">
        <div class="position-relative overflow-hidden text-center">
          <div class="col-md-12 mx-auto my-5">
            <div class="d-done d-md-block">
              <br />
              <br />
              <br />
              <h1 class="display-3 font-weight-normal text-light">
                Libe's store
              </h1>
              <p class="lead font-weight-normal text-light">
                Welcome to my online store , We will give you the best service !
              </p>
              <br />
              <router-link
                type="button"
                class="btn btn-success font-weight-normal"
                to="/cart/categoryall"
                >我的賣場</router-link
              >
              <p></p>
              <router-link
                type="button"
                class="btn btn-success font-weight-normal"
                to="/user/sellerlogin"
                >會員登入</router-link
              >
            </div>
          </div>
          <div class="product-device shadow-sm d-none d-md-block"></div>
          <div
            class="product-device product-device-2 shadow-sm d-none d-md-block"
          ></div>
        </div>
      </div>
    </div>
  </div>
  <!-- Background image -->
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
</template>
