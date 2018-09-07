<template>
    <div id="lombard">
        <router-view></router-view>
    </div>

</template>

<style >
  /* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */




  #lombard {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

</style>

