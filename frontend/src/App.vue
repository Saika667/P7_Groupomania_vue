<script>
export default {
  name: "App",
};
</script>

<template>
  <router-view ref="preload" v-bind:class="{ preload: this.preload}"></router-view>
</template>

<style scoped>
</style>

<style lang="scss">

  * {
    font-family: "Lato", sans-serif;
    margin: 0;
  }
  a {
    text-decoration: none;
  }
  #app {
    position: relative;
  }
  button {
    cursor: pointer;
  }
  .preload {
    animation: none;
  }
</style>
