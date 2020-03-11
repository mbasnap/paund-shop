<template>
    <div class="row" :style="style" >
        <div class="col p-0 border-top"  > {{ name }} </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: { name: String, value: String },
    computed: {
        style() {
            return {
                'color': 'gray',
                'font-size': '10px',
                'margin-top': '25px',
                'text-align': 'center',
                'font-style': 'italic'
            }
        }
    }
}
</script>

<style>

</style>