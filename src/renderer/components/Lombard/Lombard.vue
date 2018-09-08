<template>
    <div id="lombard" >
      <div class="lombard-wraper">
        <router-view  style="width: 70%;"></router-view>
        <hr>
        <kassa style="width: 30%;"></kassa>
      </div>
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
    padding: 10px;
    
    display: flex;
  }
  
  .lombard-wraper {
    flex-grow: 1;
    display: flex;
    border: 1px solid #677067;
  }
</style>

