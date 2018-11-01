<template>
<div class="mt-3">
    <form>  
     <searcher class="form-group" id="family" placeholder="Family"></searcher> 
    <div class="form-row">
        <div class="form-group col-md-5">
            <input type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group col-md-7">
            <input type="text" class="form-control" id="sername" placeholder="Sername">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-md-3">
            <input type="text" class="form-control" id="seria" placeholder="BA">
        </div>
        <div class="form-group col-md-9">
            <input class="form-control" id="number" placeholder="Passport">
        </div>
    </div> 
    <input class="form-control" id="idn" placeholder="ID">
    </form>
            <button class="btn btn-primary">Cacsel</button>
        <button  class="btn btn-primary">Submit</button>
</div>



</template>

<script>
import {Searcher, DropdownIcon} from "@/components/Widgets"
import {mapGetters, mapActions} from 'vuex'
let temp = {name: 'name', sername: 'sername', family: 'family'}
export default {
    components: {Searcher, DropdownIcon},
    computed: {...mapGetters('klient',['current', 'isSaved'])},
    methods: {...mapActions('klient',['saveCurrent'])}
}
</script>

<style>

</style>
