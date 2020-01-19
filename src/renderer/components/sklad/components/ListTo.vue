<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="actions">
            <div class="list">
                <div class="header">
                    <p>Filter</p>
                </div>
                <items teg="ul" :items="value" :tostring="tostring"/>
                <!-- <ul class="item">
                    <li v-for="(item, key) in value" :key="key"
                    @contextmenu.prevent="open($event, item)"
                    @mouseleave="({ toElement }) => close(toElement)"  
                    >{{ tostring(item) }}</li>
                </ul> -->
            </div>
        </context>
    <!-- </draggable> -->
</template>

<script>

import Context from '@/components/Context.vue'
import Items from './Items.vue'
import draggable from 'vuedraggable'
export default {
    components: { Context, draggable, Items },
    props: { value: Array, actions: Object },
    inject: ['tostring'],
  computed: {},
  methods: {

  }
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