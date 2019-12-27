<template>
    <component class="item" :is="teg">
        <li v-for="(item, key) in items" :key="key"
        @contextmenu.prevent="open($event, item)"
        @mouseleave="({ toElement }) => close(toElement)"  
        >{{ getString(item) }}</li>
    </component>
</template>

<script>
export default {
props: { teg: String, items: Array, getString: Function },
inject: ['open', 'close'],

}
</script>

<style>
.item li {
    display: block;
    padding: 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: none;
}
</style>