<template>
<div >
<button class="btn btn-primary">Cacsel</button>
<button  class="btn btn-primary"
         :disabled="$store.getters['klient/saved']"
         >Save</button>
</div>
</template>

<script>
export default {
    props: {}
}
</script>

<style>

</style>
