<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="actions">
            <div class="list">
                <div class="header">
                    <slot></slot>
                </div>
                <items :name="name" :value="items"/>
            </div>
        </context>
    <!-- </draggable> -->
</template>

<script>

import Context from '@/components/Context.vue'
import Items from './Items.vue'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
    components: { Context, draggable, Items },
    props: { value: Array, actions: Object, name: String },
    computed: {
        ...mapGetters({
            map: 'klient/map'
        }),
        items({ value, map }) {   
            const compareNumbers = (a, b) => a.number > b.number       
            return (value || [])
                .sort(compareNumbers)
                    .map(v => ({...v, klient: map[v.klient]}))
        }
    },
    methods: {}
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