<style>
.wrapper {
  display: grid;
  /* grid-template-columns: repeat(3,1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto); */
}
.wrapper div {
  border: 1px solid orchid
}
/* .one {
  grid-column: 1 / 3;
  grid-row: 1;
}
.two { 
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.three {
  grid-row: 2 / 5;
  grid-column: 1;
}
.four {
  grid-column: 3;
  grid-row: 3;
}
.five {
  grid-column: 2;
  grid-row: 4;
}
.six {
  grid-column: 3;
  grid-row: 4;
} */
</style>

<template>
<div class="wrapper">
  <div class="one">1</div>
  <div class="two">2</div>
  <div class="three">3</div>
  <div class="four">4</div>
  <div class="five">5</div>
  <div class="six">6</div>
</div>
</template>
<script>
export default {
//   created() {
//     const f = function() {
//       this.a = 1;
//       this.b = 2;
//     };

//     const o = new f();

//     f.prototype.b = 3;
//     f.prototype.c = 4;

//     console.log(
//       o.__proto__,
//       o.__proto__.__proto__,
//       o.__proto__.__proto__.__proto__
//     );

//     console.log(o.a, o.b, o.c, o.d);

//     function Graph() {
//       this.vertices = [];
//       this.edges = [];
//     }

//     Graph.prototype = {
//       addVertex: function(v) {
//         this.vertices.push(v);
//       }
//     };

//     var g = new Graph();

//     // const a = { a: 1 };
//     // const b = Object.create(a);
//     // console.log(b.__proto__, "b:", b, "b.a", b.a);

//     // B继承自A
//     function A(a) {
//       this.varA = a;
//     }

//     // 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
//     // 那么将 varA 加入到原型（prototype）中的目的是什么？
//     A.prototype = {
//       varA: null,
//       /*
// 既然它没有任何作用，干嘛不将 varA 从原型（prototype）去掉 ? 
// 也许作为一种在隐藏类中优化分配空间的考虑 ?
// https://developers.google.com/speed/articles/optimizing-javascript 
// 如果varA并不是在每个实例中都被初始化，那这样做将是有效果的。
// */
//       doSomething: function() {
//         // ...
//       }
//     };

//     function B(a, b) {
//       A.call(this, a);
//       this.varB = b;
//     }

//     B.prototype = Object.create(A.prototype, {
//       varB: {
//         value: null,
//         enumerable: true,
//         configurable: true,
//         writable: true
//       },
//       doSomething: {
//         value: function() {
//           // override
//           A.prototype.doSomething.apply(this, arguments);
//           // call super
//           // ...
//         },
//         enumerable: true,
//         configurable: true,
//         writable: true
//       }
//     });
//     B.prototype.constructor = B;

//     var b = new B();
//     b.doSomething();
//   },

  mounted() {
    function Person(name) {
      this.name = name;
    }
    Person.prototype.sayName = function() {
      console.log(this.name);
    }
    var person1 = new Person('aaaa');

    // Person.prototype = {
    //   sayName: function() {
    //     console.log(this.name);
    //   }
    // };
    Person.prototype.sayName = function() {
      console.log(this.name);
    }

    var person2 = new Person('bbb');

    // 直接修改prototype={}
    // console.log(person1.constructor == Person); // true
    // console.log(Person.constructor == Person); // false
    // console.log(person2.constructor == Person); // false
    // console.log(Person.prototype.constructor);

    // 修改方式prototype.sayName=...
    console.log(person1.__proto__ == Person.prototype); // true
    console.log(person2.__proto__ == Person.prototype); // true

  }
};
</script>
