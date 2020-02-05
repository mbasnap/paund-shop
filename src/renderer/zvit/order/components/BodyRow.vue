<template>
<div class="row mt-2" style="font-size: 14px;">
    <div class="col-2" >{{ label }}</div>
    <div class="col">
        <div class="row">{{ model.value }}</div>
        <div class="row border-top" style="font-size: 12px;">
            <div class="col p-0" style="text-align: center;">{{ model.name }}</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        label: String,
        value: Object
    },
    computed: {
        model({ value }) {
            return { ...value }
        }
    }

}
</script>

<style>

</style>