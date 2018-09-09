<template>
    <div class="left row" >
        <kassa-header></kassa-header>
        <kassa-list :rowCount="rowCount" :data="data" style="height: 90%;"></kassa-list>
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
            data: [],
            rowCount: 0
        }
    }
}
</script>
<style>

</style>
