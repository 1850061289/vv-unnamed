<style>
#heart {
  position: fixed;
  left: 0;
}
</style>

<template>
  <canvas id="heart"></canvas>
</template>
<script>
import { Shapes } from "./index.js";
export default {
  name: "Heart",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    const a = new Shapes({
      elem: document.querySelector("#heart"),
      config: this.config
    });
  }
};
</script>
