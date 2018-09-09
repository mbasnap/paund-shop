<template>
    <div id="zvit" class="col">
        <zvit-left></zvit-left>
        <hr>
        <zvit-right></zvit-right>
    </div>
</template>
<script>
import ZvitLeft from "./components/Left.vue"
import ZvitRight from "./components/Right.vue"
export default {
    components: {ZvitLeft, ZvitRight}
}
</script>
