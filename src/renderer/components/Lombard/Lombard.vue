<template>
    <div id="lombard">
        <main>
            <div class="left-side">
            <router-view></router-view>
            </div>
            <div class="vr"></div>
            <div class="right-side">
                <kassa></kassa>
            </div>
        </main>
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
    padding: 20px;
  }
  main {
    display: flex;
    border: 1px solid #0d0e0d;
  }

  .left-side {
    display: flex;
    padding: 20px;
    width: 80%;
  }

  .right-side {
    display: flex;
    padding: 20px;
    
  }

</style>

