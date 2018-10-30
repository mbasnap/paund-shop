<template>
    <div>
        <h1>{{current.title}}</h1>
        <p>{{isSaved}}</p>
        <p>
        <button @click="saveCurrent({logo: 'asdsad'})">save</button>
        </p>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {...mapGetters('klient',['current', 'isSaved'])},
    methods: {...mapActions('klient',['saveCurrent'])}
}
</script>

<style>

</style>
