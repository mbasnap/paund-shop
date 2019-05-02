<template>
<div >
<button class="btn btn-primary">Cacsel</button>
<button  class="btn btn-primary"
         @click="init"
         >Save</button>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {},
    methods: {
        ...mapActions('klient', ['init']),
    }
}
</script>

<style>

</style>
