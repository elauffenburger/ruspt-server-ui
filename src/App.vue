<template>
  <div id="app">

    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="/images/ruspt-logo-xs.png">
        </a>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
          <router-link class="navbar-item" to="/about">About</router-link>
        </div>
      </div>
    </nav>

    <div class="container router-view-container">
      <router-view />
    </div>
  </div>
</template>

<script>
const MOCK_DATA_ENABLED = false;

export default {
  name: "App",
  data: () => {
    return {
      hasMockedData: false
    };
  },
  mounted() {
    if (MOCK_DATA_ENABLED && !this.hasMockedData) {
      this.hasMockedData = true;

      this.mockData();
    }
  },
  methods: {
    mockData() {
      const FAKE_CODE_SUBMISSIONS = [
        `(do (def x (+ 2 2)))`,
        `(do (defn x (+ 2 2)))`
      ];

      for (const code of FAKE_CODE_SUBMISSIONS) {
        this.$store.dispatch("sandbox/submitCode", code);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: black;

  .navbar-item {
    color: #afe6f4;

    img {
      max-height: 3rem;
    }
  }
}

.router-view-container {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>