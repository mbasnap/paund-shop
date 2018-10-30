<template>
    <div>
        <h1>{{klient.title}}</h1>
        <p>
        <button @click="save({logoText:'savedLogo'})">save</button>
        </p>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters(['klient'])
    },
    methods: {
        ...mapActions(['saveSettings'])
    }

}
</script>

<style>

</style>
