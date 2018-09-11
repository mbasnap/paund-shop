<template>

    <div>
      <div class="col-sm-8 ">
        <router-view ></router-view>
      </div>
      
      <div class="col-sm-4 ">       
          <kassa class=""></kassa>       
      </div>
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

