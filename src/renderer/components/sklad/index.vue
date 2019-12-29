<template>

<div class="sklad row">
    <list-from class="col-6"/>
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
  .sklad .list .header {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

</style>
