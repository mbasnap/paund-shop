<template>
<div >
<button class="btn btn-primary">Cacsel</button>
<button  class="btn btn-primary"
         @click="saveKlient"
         >Save</button>
</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    props: {},
    methods: {
        ...mapActions(['saveKlient']),
    }
}
</script>

<style>

</style>
