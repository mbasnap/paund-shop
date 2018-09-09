<template>
    <div class="row">
        <kassa-header ><span>Ok start: </span><span>{{ok_start}}</span></kassa-header> <hr>
        <div class="col"  style="height: 80%;">
            <kassa-list :rowCount="rowCount" :data="debet"></kassa-list>
            <hr>
            <kassa-list :rowCount="rowCount" :data="kredit"></kassa-list>
        </div> <hr>
        <kassa-header ><span>Ok end: </span><span>{{ok_end}}</span></kassa-header> <hr>
    </div>
</template>
<script>
import {Header, List} from '@/components/List'
export default {
    components: {
        KassaHeader: Header,
        KassaList: List
        },
    data () {
        return{
            ok_start: 0,
            ok_end: 0,
            debet: [],
            kredit: [],
            rowCount: 0
        }
    }
}
</script>


<style>

</style>

