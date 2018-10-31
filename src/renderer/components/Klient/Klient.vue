<template>
<div class="mt-3">
    <form>  
     <div class="form-group form-row">
        <div class="form-group col-md-3">
           <img height="30px" src="@/assets/Logo.png" class="img-circle">
        </div>
         <div class="form-group col-md-9">
            <searcher id="family" placeholder="Family"></searcher>
        </div>       
        
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <input type="text" class="form-control" id="name" placeholder="Name">
        </div>
        <div class="form-group col-md-6">
            <input type="text" class="form-control" id="sername" placeholder="Sername">
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
let temp = {name: 'name', sername: 'sername', family: 'family'}
export default {
    components: {Searcher},
    computed: {...mapGetters('klient',['current', 'isSaved'])},
    methods: {...mapActions('klient',['saveCurrent'])}
}
</script>

<style>

</style>
