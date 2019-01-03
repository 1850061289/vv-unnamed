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
        radiusAddMin: 0.02,
        radiusAddMax: 0.03,
        num: 1
      }
    };
  }
};
</script>
