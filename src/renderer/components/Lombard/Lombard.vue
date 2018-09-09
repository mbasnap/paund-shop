<template>
    <div class="lombard col">
          <router-view class="border" style="width: 60%;">></router-view>
          <div></div>
          <kassa class="border" style="width: 30%;"></kassa>
    </div>
</template>

<script>
import Kassa from '../Kassa'
export default {
    components: {Kassa}
    }
</script>


<style>
  .lombard  {
    padding: 10px;
  }

</style>

