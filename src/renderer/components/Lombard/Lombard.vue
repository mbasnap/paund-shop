<template>
    <div id="lombard" class="row">
        <div class="col" style="border: 1px solid #677067;">
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


<style>
  #lombard {
    padding: 10px;
  }

</style>

