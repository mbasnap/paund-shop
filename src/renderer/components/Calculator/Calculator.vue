<template>
    <div>
        <h1>{{title}}</h1>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            title: 'calkulator/title'
        })
    }
}
</script>

<style>

</style>
