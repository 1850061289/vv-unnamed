<style>
.tabs {
  display: flex;
}
.tab {
  background: #eee;
  padding: 5px;
}
.tab-active {
  background: #ddd;
}
</style>
<template>
  <div>
    <my-component
      :propA="propA"
      :author="author"
      propC="aaa"
      class="theme-dark"
      :title="doc.title"
      @update:title="doc.title=$event"
    >
      <template v-slot="header">
        <h1>Here might be a page title</h1>
      </template>

      <template #default="slotProps">
        <p>{{slotProps.user.firstName}}</p>
        <p>And another one.</p>
      </template>

      <template v-slot="footer">
        <p>Here's some contact info</p>
      </template>
    </my-component>
    <hr>
    <my-component
      :propA="propA"
      :author="author"
      propC="aaa"
      class="theme-dark"
      :title.sync="doc.title"
    >
      <template v-slot="{user}">{{user.firstName}}</template>
    </my-component>

    <hr>
    <my-component
      :propA="propA"
      :author="author"
      propC="aaa"
      class="theme-dark"
      v-bind.sync="doc"
    >插槽内容覆盖了后备内容</my-component>

    <base-checkbox v-model="lovingVue"></base-checkbox>
    <base-input @focus="onFocus" value="11" @input="onInput"></base-input>

    <div>
      <div class="tabs">
        <div
          class="tab"
          :class="{'tab-active':currentTabComponent==='posts'}"
          @click="changeCurrentTab('posts')"
        >
          <a>Posts</a>
        </div>
        <div
          class="tab"
          :class="{'tab-active':currentTabComponent==='archive'}"
          @click="changeCurrentTab('archive')"
        >
          <a>Archive</a>
        </div>
      </div>
      <keep-alive>
      <component :is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Person from "../utils/person.js";
import MyComponent from "../components/MyComponent.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseInput from "../components/BaseInput.vue";
import Posts from "../components/Posts.vue";
import Archive from "../components/Archive.vue";

export default {
  components: {
    MyComponent,
    BaseCheckbox,
    BaseInput,
    Posts,
    Archive
  },
  data() {
    return {
      propA: "success",
      author: new Person("fang", "wei"),
      lovingVue: true,
      doc: {
        title: "title",
        aaa: "aaa"
      },
      slotProps: {
        user: {
          firstName: "wei",
          lastName: "fang"
        }
      },

      user: {
        firstName: "wei",
        lastName: "fang"
      },

      currentTabComponent: "posts"
    };
  },

  beforeUpdate() {
    console.log(this.lovingVue);
  },

  methods: {
    onFocus() {
      console.log(1111);
    },

    onInput(val) {
      console.log(val);
    },

    changeCurrentTab(tab) {
      this.currentTabComponent = tab;
      console.log(tab);
    }
  }
};
</script>
