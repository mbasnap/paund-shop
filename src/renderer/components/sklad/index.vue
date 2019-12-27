<template>

<div class="sklad row">
    <list-from class="col-6"/>
    <!-- <div class="control col-2">
        <div class="row">
            <span class="col-1">l</span>
            <span class="col-1">r</span>
        </div>
    </div> -->
    <list-to class="col-6"/>
</div>
</template>
<script>

import { ListFrom, ListTo } from "./components"
export default {
    components: { ListFrom, ListTo }
}
</script>
<style>
.sklad {
    width: 100%;
    padding: 10px;
}

</style>
