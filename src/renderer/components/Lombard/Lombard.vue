<template>
    <div class="row ">
        <router-view class="mr-2" style="width: 70%"></router-view>    
        <kassa style="width: 30%"></kassa>       
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

