<template>
    <div id="kassa" class="row">
        <div class="app-header" style="height: 10%;">Ok start {{ok_start}}</div>
            <div class="column" style="height: 80%;">
                <kassa-column rows="rows" data="debet"></kassa-column>
                <hr>
                <kassa-column rows="rows" data="kredit"></kassa-column>
            </div>


        <div class="app-header" style="height: 10%;">Ok end {{ok_end}}</div>
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




</style>

