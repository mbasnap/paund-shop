<template>
        <div class="control row  "> 
            <div class="col-6 ">
                <div class="row justify-content-center">
                    <button class="btn btn-primary" @click="$emit('clear')">clear</button>
                </div>
            </div>
            <div class="col-6">
                <div class="row justify-content-center">
                    <button  class="btn btn-primary" @click="$emit('save')">save</button>
                </div>
            </div>                       
        </div>  
</template>

<script>
export default {

}
</script>

<style>

</style>
