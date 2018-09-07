<template>
    <div id="kassa" >
        <div class="kassa-result">Ok start {{ok_start}}</div>
            <div class="kassa-list">
                <kassa-column rows="rows" data="debet"></kassa-column>
                <vr></vr>
                <kassa-column rows="rows" data="kredit"></kassa-column>
            </div>


        <div class="kassa-result">Ok end {{ok_end}}</div>
    </div>
</template>
<script>
import KassaColumn from './components/List.vue'
export default {
    components: {KassaColumn},
    data () {
        return{
            ok_start: 0,
            ok_end: 0
        }
    }
}
</script>


<style>

#kassa {
    /* width: 0px; */
    border: 1px solid black;
}
.kassa-result {
    background: rgb(202, 202, 224);
}
.kassa-list {
    display: flex;
    height: 300px;
    
    justify-content: space-between;
}

</style>

