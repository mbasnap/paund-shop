<template>
    <div class="row ">
        <router-view class="mr-2" style="width: 60%"></router-view>    
        <kassa style="width: 40%"></kassa>       
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

