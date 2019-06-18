
<style>
</style>
<template>
  <div>
    <ul class="container"></ul>
  </div>
</template>

<script>
import "../mvvm/observer.js";
export default {
  mounted() {
    const oFrag = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
      var op = document.createElement("li");
      var oText = document.createTextNode(i);
      op.appendChild(oText);

      oFrag.appendChild(op);
    }

    document.querySelector(".container").appendChild(oFrag);

    for (let i = 0; i < 5; i++) {
      var op = document.createElement("li");
      var oText = document.createTextNode(i);
      op.appendChild(oText);
      oFrag.appendChild(op);
    }

    document.querySelector(".container").appendChild(oFrag);

    // oFrag.appendChild(document.querySelector('.container'));
  }
};
</script>


