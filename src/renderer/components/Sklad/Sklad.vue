<template>
    <div class="sklad row" >
        <div class="col">
            <div ></div> 
            <sklad-left class="border" style="width: 40%;"></sklad-left>
            <div ></div> 
            <sklad-right class="border" style="width: 40%;"></sklad-right> 
            <div></div>           
        </div>
    </div>
</template>
<script>
import SkladLeft from "./components/Left.vue"
import SkladRight from "./components/Right.vue"
export default {
    components: {SkladLeft, SkladRight}
}
</script>
<style>
.sklad {
    padding: 10px;
}

</style>
