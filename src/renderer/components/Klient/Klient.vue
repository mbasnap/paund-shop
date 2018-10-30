<template>
    <div>
<<<<<<< HEAD
        <h1>{{klient.title}}</h1>
        <p>
        <button @click="save({logoText:'savedLogo'})">save</button>
=======
        <h1>{{current.title}}</h1>
        <p>{{isSaved}}</p>
        <p>
        <button @click="saveCurrent({logo: 'asdsad'})">save</button>
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
        </p>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
<<<<<<< HEAD
    computed: {
        ...mapGetters(['klient'])
    },
    methods: {
        ...mapActions(['saveSettings'])
    }

=======
    computed: {...mapGetters('klient',['current', 'isSaved'])},
    methods: {...mapActions('klient',['saveCurrent'])}
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
}
</script>

<style>

</style>
