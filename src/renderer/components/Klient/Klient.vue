<template>
<div class="mt-3">
    <form>  
    <div class="form-group">
        <searcher id="family" placeholder="Family"></searcher>
    </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <input type="text" class="form-control" id="name" placeholder="Email">
            </div>
            <div class="form-group col-md-6">
                <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Cacsel</button>
            <button  class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>



</template>

<script>
import {Searcher} from "@/components/Widgets"
import {mapGetters, mapActions} from 'vuex'
export default {
    components: {Searcher},
    computed: {...mapGetters('klient',['current', 'isSaved'])},
    methods: {...mapActions('klient',['saveCurrent'])}
}
</script>

<style>

</style>
