<style>
.egg-page {
  padding: 30px;
}
.eggs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.eggs__item {
  width: 30%;
}
.egg {
  background: url("../assets/egg.png") center bottom no-repeat;
  background-size: contain;
  height: 90px;
  width: 68px;
  margin-top: 12px;
}

.egg-broken {
  background-image: url("../assets/egg-block.png");
}

.hammer {
  background: url("../assets/hammer.png") no-repeat center;
  background-size: contain;
  width: 60px;
  height: 50px;
  position: relative;
  top: -25px;
  left: 34px;
  transform-origin: 100% 100%;
}
@keyframes smash {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
.smash-enter-active {
  animation: smash 0.5s forwards;
}

/* .test-container {
  background: blue; */
/* line-height: 5px; */ /*使得test-img与test-container无白色间隙 法1*/
/* font-size: 0; */ /*使得test-img与test-container无白色间隙 法2*/
/* } */
/* .test-img {
  width: 100px; */
/* vertical-align: middle */ /*使得test-img与test-container无白色间隙 法3*/
/* display: block;  */ /* 使得test-img与test-container无白色间隙 法4 */
/* } */
/* .test-text { */
/* background: #fff;
} */

/*
 垂直居中
*/
.test-container {
  background: blue;
  line-height: 140px;
  font-size: 0;
}
.test-img {
  width: 100px;
  vertical-align: middle;
}
.test-text {
  background: #fff;
  font-size: 40px;
  display: none;
}

.inline-block {
  display: inline-block;
  width: 150px;
  height: 150px;
  border: 1px solid #cad5eb;
  background-color: #f0f3f9;
}
.inline-block-2 {
  line-height: 0;
}
</style>
<template>
  <div class="egg-page">
    <div class="eggs">
      <div v-for="(item,index) in eggs" :key="index" class="eggs__item">
        <div
          class="egg"
          @click="smash(index)"
          :class="{'egg-broken':isSmashed&&current===item||brokenEggs.includes(item)}"
        >
          <transition name="smash" @after-enter="afterEnter" @after-leave="afterLeave">
            <div v-if="showHammer&&current===item" class="hammer"></div>
          </transition>
        </div>
      </div>
    </div>

    <div class="test-container">
      <img class="test-img" src="../assets/baoman.jpg">
      <span class="test-text">zxx</span>
    </div>

    <span class="inline-block"></span>
    <span class="inline-block inline-block-2">inline-block-2</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isSmashed: false,
      showHammer: false,
      current: 0,
      eggs: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      brokenEggs: [],
      maxTimes: 3
    };
  },
  created() {
    // TODO 判断是否超过24小时

    this.brokenEggs = JSON.parse(localStorage.getItem("brokenEggs") || "[]");
  },
  methods: {
    smash(index) {
      this.current = index;
      // 判断已经砸过的
      if (this.brokenEggs.includes(this.eggs[index])) {
        return;
      }
      // 判断次数
      if (this.brokenEggs.length >= this.maxTimes) {
        alert("次数用完");
        return;
      }
      this.showHammer = true;
      const brokenEggs = JSON.parse(localStorage.getItem("brokenEggs") || "[]");
      brokenEggs.push(this.eggs[index]);
      localStorage.setItem("brokenEggs", JSON.stringify(brokenEggs));
      this.brokenEggs = brokenEggs;
    },

    afterEnter(el) {
      this.showHammer = false;
    },

    afterLeave(el) {
      this.isSmashed = true;
    }
  }
};
</script>
