<style>
.home {
  padding: 50px 20%;
  position: relative;
}

.home .bubble {
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;
  font-size: 60px;
}

.home .bubble-right {
  background: #bbe27d;
}

.home .bubble-left {
  background: #eee;
}

.home .bubble-right:after {
  content: "";
  border-left: 5px solid #bbe27d;
  border-top: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid transparent;
  position: relative;
  left: 30px;
  display: inline-block;
}

.home .bubble-left:before {
  content: "";
  border-right: 5px solid #eee;
  border-top: 5px solid transparent;
  border-left: 5px solid transparent;
  border-bottom: 5px solid transparent;
  position: relative;
  left: -30px;
  display: inline-block;
}

.home .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.home .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.home .expression {
  max-width: 140px;
}

.home .align-left {
  text-align: left;
  margin-bottom: 20px;
}

.home .align-right {
  text-align: right;
  margin-bottom: 20px;
}

@keyframes tada {
  0% {
    transform: rotate(0);
  }
  10%,
  20% {
    transform: rotate(-3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: rotate(3deg);
  }
  40%,
  60%,
  80% {
    transform: rotate(-3deg);
  }
  100% {
    transform: rotate(0);
  }
}

.tada {
  animation: tada 1s 0.5s ease both infinite;
}

.shake {
  display: inline-block;
}

.twinkle {
  box-shadow: 0 0 20px #f00;
  animation: twinkle 0.3s linear infinite;
}

@keyframes twinkle {
  0% {
    transform: scale(2);
  }
  100% {
    transform: scale(3);
  }
}

.terror-img {
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
<template>
  <div>
    <heart></heart>
    <div class="home">
      <transition name="fade" @after-enter="calculateHeight(1)">
        <div v-if="show[0]" class="align-right">
          <div
            @mouseover="onmouseover(0)"
            @mouseout="onmouseout(0)"
            class="bubble bubble-right animated zoomInRight"
          >
            <span
              class="shake"
              :class="{'tada':isShake[0]}"
              v-for="(item,index) in text1"
              :key="index"
            >{{item}}</span>
          </div>
        </div>
      </transition>
      <transition name="fade" @after-enter="calculateHeight(2)">
        <div v-if="show[1]" class="align-left animated zoomInLeft">
          <img @mouseover="showTerror" class="expression" src="../assets/tiancheng.jpeg">
        </div>
      </transition>
      <transition name="fade" @after-enter="calculateHeight(3)">
        <div v-if="show[2]" class="align-right">
          <div
            @mouseover="onmouseover(1)"
            @mouseout="onmouseout(1)"
            class="bubble bubble-right BBE27D animated zoomInRight"
          >
            <span
              class="shake"
              :class="{'tada':isShake[1]}"
              v-for="(item,index) in text2"
              :key="index"
            >{{item}}</span>
          </div>
        </div>
      </transition>

      <transition name="fade" @after-enter="calculateHeight(4)">
        <div v-if="show[3]" class="align-left animated zoomInLeft">
          <img class="expression" src="../assets/family.jpg">
        </div>
      </transition>

      <transition name="fade" @after-enter="calculateHeight(5)">
        <div v-if="show[4]" class="align-right">
          <div
            @mouseover="onmouseover(2)"
            @mouseout="onmouseout(2)"
            class="bubble bubble-right BBE27D animated zoomInRight"
          >
            <span
              v-for="(item,index) in text3"
              :key="index"
              class="shake"
              :class="{'tada':isShake[2]}"
            >{{item}}</span>
          </div>
        </div>
      </transition>
      <transition name="fade" @after-enter="calculateHeight(6)">
        <div v-if="show[5]" class="align-left animated zoomInLeft">
          <img class="expression" src="../assets/baoman.jpg">
        </div>
      </transition>

      <transition name="fade" @after-enter="calculateHeight(7)">
        <div v-if="show[6]" class="align-right">
          <div
            @mouseover="onmouseover(3)"
            @mouseout="onmouseout(3)"
            class="bubble bubble-right BBE27D animated zoomInRight"
          >
            <span
              v-for="(item,index) in text4"
              :key="index"
              class="shake"
              :class="{'tada':isShake[3]}"
            >{{item}}</span>
          </div>
        </div>
      </transition>

      <transition name="fade" @after-enter="calculateHeight(8)">
        <div v-if="show[7]" class="align-left">
          <div
            @mouseover="onmouseover(4)"
            @mouseout="onmouseout(4)"
            class="bubble bubble-left BBE27D animated zoomInLeft"
          >
            <span
              v-for="(item,index) in text5"
              :key="index"
              class="shake"
              :class="{'tada':isShake[4]}"
            >{{item}}</span>
          </div>
        </div>
      </transition>
    </div>

    <img
      v-if="isTwinkle"
      class="expression terror-img twinkle"
      @click="isTwinkle=false"
      src="../assets/kongbu.jpeg"
    >
  </div>
</template>

<script>
// @ is an alias to /src
import Heart from "@/components/heart/index.vue";

export default {
  name: "home",
  components: {
    Heart
  },

  data() {
    return {
      isShake: [false, false, false, false, false],

      text1: ["我", "是", "谁"],
      text2: ["我", "来", "自", "哪", "里"],
      text3: ["我", "要", "去", "哪", "里"],
      text4: ["我", "要", "做", "什", "么"],
      text5: ["我", "不", "知", "道"],

      show: [false, false, false, false, false, false, false, false],

      isTwinkle: false,
      tianchengUrl: ""
    };
  },

  created() {
    const self = this;
  },

  mounted() {
    const self = this;
    this.show.splice(0, 1, true);
  },

  methods: {
    onmouseover(index) {
      this.isShake = [false, false, false, false];
      this.isShake.splice(index, 0, true);
    },

    onmouseout(index) {
      this.isShake = [false, false, false, false];
      this.isShake.splice(index, 0, false);
    },

    calculateHeight(index) {
      // 可见区域
      const dc = document.documentElement.clientHeight;
      // 文档高度
      const bc = document.body.clientHeight;
      if (bc > dc) {
        // 自动向上滚动
        document.documentElement.scrollTop += bc - dc;
      }
      // 下一条展示
      this.show.splice(index, 1, true);
    },

    showTerror() {
      this.isTwinkle = true;
    }
  }
};
</script>
