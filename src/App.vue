<template>
  <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="/images/ruspt-logo-xs.png">
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<style lang="scss" scoped>
#nav {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.navbar {
  background-color: black;

  .navbar-item {
    color: #afe6f4;
  }
}

.navbar-item {
  img {
    max-height: 3rem;
  }
}
</style>