<template>
    <div>
        <h1>{{title}}</h1>
        <p>{{isSaved}}</p>
        <p>
        <button @click="save">save</button>
        </p>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    computed: {
        ...mapGetters({
            title: 'klient/title',
            isSaved: 'klient/isSaved'
        })
    },
    methods: {
        ...mapActions({
            save: 'klient/save'
        })
    }

}
</script>

<style>

</style>
