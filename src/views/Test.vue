<style>
</style>
<template>
  <div>
    <heart :config="config"></heart>
    <div></div>
  </div>
</template>
<script>
import Heart from "../components/heart/index.vue";
export default {
  components: {
    Heart
  },
  data() {
    return {
      config: {
        num: 1
      }
    };
  }
};
</script>
