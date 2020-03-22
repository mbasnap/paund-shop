<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="actions">
            <div class="list">
                <div class="row p-0 m-0 header">
                <div class="col"><slot></slot></div>
                <div class="col">
                    <select class="form-control" v-model="type">
                        <option v-for="(item, index) in types" :key="index"
                        :value="index">{{ t(item) }}</option>
                    </select>
                </div>
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
    data() {
        return {
            type: 0,
            types: ['all', 'things', 'gold' ]
        }
    },
    computed: {
        ...mapGetters({
            map: 'klient/map'
        }),
        values({ value, byType, byNumber }) {
            return (value || []).filter(byType).sort(byNumber)
        },
        items({ values, map }) {   
            return values.map(v => ({...v, klient: map[v.klient]}))
        },
        typeValue({ types, type }) {
            return types[type]
        }
    },
    methods: {
        byType({ zalog }) {
            const { types, type } = this
            return this.type ? zalog === this.typeValue : true
        },
        byNumber(a, b) {
            return a.number - b.number
        },
        t(name) {
            return this.$t(`sklad.${name}`)
        }
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