<template>
    <div class="container-fluid  d-flex ">
      <div class="row flex-fill p-3">
        <router-view class="col-sm-8"></router-view>
        <div class="col-sm-0 v-divider"></div>
        <kassa class="col-sm-4  border"></kassa>
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

