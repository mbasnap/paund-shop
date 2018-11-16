<template>
<div >
<button class="btn btn-primary">Cacsel</button>
<button  class="btn btn-primary" :disabled="saveButton">Save</button>
</div>
</template>

<script>
export default {
    props: {
        saveButton: Boolean
    }
}
</script>

<style>

</style>
