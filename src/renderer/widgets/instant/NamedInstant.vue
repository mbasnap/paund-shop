<template>
<instant  @select="onSelect"
    />
    
</template>

<script>
import Instant from './Instant.vue'
export default {
components: {Instant},
props: {
    name: String,
    value: Object,
    suggests: Array,
    toString: Function
}
}
</script>

<style>

</style>
