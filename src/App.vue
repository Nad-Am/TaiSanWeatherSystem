<template>
  <div class="appContainer">
    <lay-out-vue></lay-out-vue>
  </div>
</template>

<script>
import LayOutVue from './component/LayOut.vue'

export default {
  name: 'App',
  components: {
    LayOutVue
  }
}
</script>

<style scoped>
.appContainer {
  width: 100vw;
  height: 100vh;
}
</style>
