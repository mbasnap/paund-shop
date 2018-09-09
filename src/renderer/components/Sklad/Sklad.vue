<template>
    <div id="sklad" class="col">
        <sklad-left></sklad-left>
        <hr>
        <sklad-right></sklad-right>
    </div>
</template>
<script>
import SkladLeft from "./components/Left.vue"
import SkladRight from "./components/Right.vue"
export default {
    components: {SkladLeft, SkladRight}
}
</script>
