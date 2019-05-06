<template>
    <div class="input-group ">
        <input  
            :id="id"
            :placeholder="placeholder"
            class="form-control " type="text"
            aria-label="Search"
        >
        <div class="input-group-append">
            <span class="input-group-text lime lighten-2" id="basic-text1"><i class="fa fa-search text-grey"
            aria-hidden="true"></i></span>
        </div>
    </div>    
</template>

<script>
export default {
   props: {
       id: String,
       placeholder: String
   }
}
</script>

<style>

</style>
