<template>
    <div class="container-fluid  d-flex">
      <!-- <div class="col flex-fill"> -->
        <div class="row flex-fill">
          <!-- <div class="col" ></div> -->
          <router-view class="col-sm-8 "></router-view>
          <div class="col"></div>
          <kassa class="col-sm-4  bg-dark "></kassa>
          <!-- <div class="col"></div> -->
        </div>
      <!-- </div> -->

    </div>
</template>

<script>
import Kassa from '../Kassa'
export default {
    components: {Kassa}
    }
</script>


<style>


</style>

