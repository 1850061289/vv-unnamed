<style>
.home2 {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div class="home2" :style="{'background-color':bgColor}"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home2",
  components: {
    HelloWorld
  },

  data() {
    return {};
  },

  created() {
    this.bgColor = "hsl(" + Math.random() * 360 + ",100%,97%)";
  },

  mounted() {
    const self = this;
    const arr = [{ a: 1 }, { a: 2 }, { b: 3 }, NaN, 2, +0];
    console.log(arr.includes(NaN)); // true
    console.log(arr.indexOf(NaN)); // -1
    console.log(arr.includes(-0)); // true
    console.log(arr.indexOf(-0)); //5
    console.log(3 ** 2);
    let a = 3;
    a **= 4;
    console.log(a);

    function* helloWorldGenerator() {
      yield "hello";
      yield "world";
      return "ending";
    }
    var hw = helloWorldGenerator();

    hw.next(); // { value: 'hello', done: false }

    hw.next(); // { value: 'world', done: false }

    hw.next(); // { value: 'ending', done: true }

    hw.next(); // { value: undefined, done: true }

    var gen = function*() {
      const f1 = yield self.login();
      const f2 = yield self.getInfo();
    };

    var login = gen();
    login.next();
    login.next();
    login.next();

    async function asyncFunc(params) {
      const result1 = await self.login();
      const result2 = await self.getInfo();

      try {
        await Promise.all([self.login(), self.getInfo()]);
      } catch (err) {
        console.log(err);
      }
    }

    asyncFunc();

    console.log(Object.entries({ a: 1, b: 2 })); // [[a,1],[b,2]]
    console.log(Object.entries([1, 2, 3])); //[["0",1],["1",2],["2",3]]
    console.log(Object.entries({"5":"a",4:"b",2:"c"}));
    
    for(let [k,v] of Object.entries({one:1,two:2})){
      console.log(`${k}:${v}`);
    }

    console.log(Object.values({one:1,tow:2}))
    console.log(Object.values([1,4,2,2]));

    const obj = {
      id:1,
      name:'fangwei',
      get gendor() {
        console.log('gender');
      },
      set grade(g) {
        console.log(g);
      }
    }

    console.log(Object.getOwnPropertyDescriptors(obj));
    console.log(Object.getOwnPropertyDescriptor(obj,'id'));

    let obj1 = {};
    Object.defineProperties(obj1,Object.getOwnPropertyDescriptors(obj));
    console.log(Object.getOwnPropertyDescriptors(obj1));

    obj1.id = 2;

    console.log(Object.assign(obj));
    console.log(obj);

    console.log(Object.getOwnPropertyDescriptors({}))

    console.log(Object.getOwnPropertyDescriptors([1,2,3]))

    console.log(Object.create(Object.getPrototypeOf(obj),Object.getOwnPropertyDescriptors(obj)));
     
    console.log(Object.getPrototypeOf(obj))
  },

  methods: {
    login() {
      console.log("login");
    },

    getInfo() {
      console.log("getInfo");
    }
  }
};
</script>
