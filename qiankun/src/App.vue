<template>
  <div id="main-root">
    <!-- loading -->
    <div v-if="loading">loading</div>
    <!-- 子应用盒子 -->
    <div id="sub1" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
import * as dd from "personal-ui"
console.log(dd);

export default {
  name: "App",
  props: {
    loading: Boolean,
    content: String,
  },
  created() {
    // dddd(211)
  },
};
</script>

<style></style>
