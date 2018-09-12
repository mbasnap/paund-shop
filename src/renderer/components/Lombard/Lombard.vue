<template>
    <div>
        <router-view class="col-sm-8 "></router-view>    
        <kassa class="col-sm-4 "></kassa>       
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

