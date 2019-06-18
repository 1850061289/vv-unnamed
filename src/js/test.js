var funcs = []
// for(var i=0;i<10;i++) {
//   funcs.push(function(){
//     console.log(i);
//   })
// }
// funcs.forEach(func=>{
//   func();// 输出10次10
// })

for(var i=0;i<10;i++) {
  funcs.push(function(value){
    return function(){
    console.log(value);
  }}(i))
}

funcs.forEach(func=>{
  func();// 输出0-9
})



