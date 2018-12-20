<style>
  .home2 {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .home2 .text-container {
    font-size: 60px;
    /*animation: text-animation 1s 2s ease-in-out infinite;*/
  }

  @keyframes text-animation {
    0% {
      transform: rotateX(0);
    }

    20% {
      transform: rotateX(40deg);
    }

    100% {
      transform: rotateX(90deg);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
    animation: text-animation 1s ease-in-out
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
<template>
  <div class="home2" :style="{'background-color':bgColor}">
    <transition name="fade" @after-enter="afterEnter1" @after-leave="afterLeave1">
      <div v-if="show1" class="text-container">
        <span v-for="(item,index) in text1" :key="index">{{item}}</span>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="show2" class="text-container">
        <span v-for="(item,index) in text2" :key="index">{{item}}</span>
      </div>
    </transition>

  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'

  export default {
    name: 'home2',
    components: {
      HelloWorld
    },

    data() {
      return {
        text1: ['我', '是', '谁'],
        text2: ['我', '来', '自', '哪', '里'],
        text3: ['我', '要', '去', '哪', '里'],
        text4: ['我', '要', '做', '什', '么'],
        text5: ['我', '不', '知', '道'],

        bgColor: '',

        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
      }
    },

    created() {
      this.bgColor = 'hsl(' + Math.random() * 360 + ',100%,97%)';
    },

    mounted() {
      this.show1 = true
    },

    methods: {
      afterEnter1() {
        this.show1 = false;
      },

      afterLeave1() {
        this.show2 = true;
      }
    }
  }
</script>
