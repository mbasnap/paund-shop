<template>
    <div>

        <p>
            <input type="text" >
        </p>
        <p>
            <button @click="edit">edit</button>
        </p>
        <p>
        <button  @click="clear">clear</button>
        <button :disabled="isSaved" @click="save">save</button>
        </p>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
let temp = {name: 'name', sername: 'sername', family: 'family'}
export default {
    computed: {
        ...mapGetters('klient', {
            klient: 'getCurrent'
        }),
        isSaved(){
            return this.klient === temp
        }
    },
    methods: {
        edit () {},
        clear() {
            this.$store.dispatch('klient/clear')
        },
        save() {
            this.$store.dispatch('klient/save', temp)
        },
    }
}
</script>

<style>

</style>
