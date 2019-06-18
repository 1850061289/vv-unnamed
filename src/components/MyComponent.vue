<style>
</style>
<template>
  <div class="form-control">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot :user="user">{{user.lastName}}</slot>
    </main>
    <footer name="footer"></footer>
    <div v-bind="$attrs">{{propA}}</div>
    <div>{{author.lastName}}</div>
    <div>{{title}}</div>
    <div>{{aaa}}</div>

  </div>
</template>
<script>
import Person from "../utils/person.js";
export default {
  name: "MyComponent",
  props: {
    inheritAttrs: false,
    propA: {
      validator: function(value) {
        // 这个值必须匹配下列字符串中的一个
        return ["success", "warning", "danger"].indexOf(value) !== -1;
      }
    },

    author: Person,
    title: String,
    aaa: String
  },
  data() {
    return {
      propB: this.propA,
      user: {
        firstName: "名",


        lastName: "姓"
      },

      person: {
        firstName: "名",
        lastName: "姓"
      }
    };
  },

  created() {
    this.propB = "bbb";
    this.$emit("update:title", "newTitle");
    this.$emit("update:aaa", "aaaaa");
  }
};
</script>
