<script>
export default {
  name: "App",
  components: {}
};
</script>

<template>
  <router-view ref="preload" v-bind:class="{ preload: this.preload}"></router-view>
</template>

<style scoped>
</style>

<style lang="scss">
  $primary-color: #FD2D01;
  $secondary-color: #FFD7D7;
  $third-color: #4E5166;
  * {
    font-family: "Lato", sans-serif;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  button {
    cursor: pointer;
  }
  #app {
    height: 100vh;
  }
  .preload {
    animation: none;
  }
</style>
