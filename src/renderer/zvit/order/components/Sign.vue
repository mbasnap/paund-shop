<template>
<div class="row mt-2" style="font-size: 14px;">
    <div class="col">{{ label }}</div>
    <div class="col pt-1">
        <div class="row mt-3  border-top" style="font-size: 11px;" >
            <div class="col" style="text-align: center;">(подпись)</div>
        </div>
    </div>
    <div class="col-1"></div>
    <div class="col ">
        <div class="row m-0 p-0">{{ value }}</div>
        <div class="row  border-top" style="font-size: 11px;" >
            <div class="col" style="text-align: center;">(фамилия, инициалы)</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        label: String,
        value: String
    },
    computed: {}

}
</script>

<style>

</style>