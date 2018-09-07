<template>
    <div id="lombard" class="flex">
      <router-view class="flex" style="width: 70%;"></router-view>
      <vr style="margin: -10px 10px;"></vr>
      <kassa style="width: 30%;"></kassa>
    </div>

</template>

<script>
import Kassa from '../Kassa'
export default {
    components: {Kassa}
    }
</script>


<style >
  /* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */

  #lombard {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );   
    border: 1px solid #0d0e0d; 
    padding: 10px;
  }
</style>

