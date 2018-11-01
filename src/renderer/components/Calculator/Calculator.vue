<template>
    <div class="col">
        <div class=" row border-bottom" style="height: 80% !important;">sdadas</div>
        <div class=" row " style="height: 20% !important;">
            <control-panel></control-panel>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {ControlPanel} from '@/components'
export default {
    components: {ControlPanel},
        
    computed: {
        ...mapGetters({
            title: 'calkulator/title'
        })
    }
}
</script>

<style>

</style>
