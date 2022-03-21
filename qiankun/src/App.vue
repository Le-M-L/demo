<template>
  <div ref="main" id="main-root">
    <!-- loading -->
    <div v-if="loading">loading</div>
    <!-- 子应用盒子 -->
    <div id="sub1" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
// import * as dd from "personal-ui"
import { fitTimeMixin} from "./test"

export default {
  name: "App",
  mixins:[fitTimeMixin],
  props: {
    loading: Boolean,
    content: String,
  },
  created() {
    // dddd(211)
  },
  mounted() {
    this.setFitData({
      dom:this.$refs.main
    })
  },
};
</script>

<style></style>
