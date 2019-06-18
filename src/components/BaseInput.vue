<template>
  <label>
    {{ label }}
    <input v-bind="$attrs" v-bind:value="value" v-on="inputListeners">
  </label>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ["value", "label"],
  computed: {
    inputListeners: function() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function(e) {
          vm.$emit("input", e.target.value);
        },

        focus: function(e) {
          vm.$emit("focus", e.target.value);
        }
      });
    }
  }
};
</script>
