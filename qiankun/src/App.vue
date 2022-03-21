<template>
  <div ref="main" id="main-root">
    <Hfooter />
    <div @click="go('/sub1')" >切换sub1</div>
    <div @click="go('/sub2')">切换sub2</div>
    <!-- loading -->
    <div v-if="loading">loading</div>
    <!-- 子应用盒子 -->
    <div id="sub1" class="app-view-box" v-html="content"></div>
    <div id="sub2" class="app-view-box" v-html="content"></div>
  </div>
</template>

<script>
import * as dd from "personal-ui"
console.log(dd,'---------')
export default {
  name: "App",
  props: {
    loading: Boolean,
    content: String,
  },
  components:{
    Hfooter:dd.Hfooter
  },
  created() {
    // dddd(211)
  },
  mounted() {
    // this.setFitData({
    //   dom:this.$refs.main
    // })
  },
    methods:{
      go(url){
        window.location.href = url;
      }
    }
};
</script>

<style></style>
