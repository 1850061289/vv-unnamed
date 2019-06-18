
<template></template>
<script>
// import {a,b} from '../utils/node.js';
// import obj from '../utils/node.js';

var a = require('../utils/node.js');
export default {
  mounted() {
    setTimeout(()=>{
      console.log(0);
    })
    setTimeout(() => {
      console.log(1);
    }, 0);
    
    new Promise((resolve, reject) => {
      console.log(2);
      resolve(3);
    }).then(val => {
      console.log(val);
    });
    console.log(4);

    // 以上输出2,4,3,1


    console.log(a);

    console.log(b);

    console.log(obj)

  }
};
</script>
