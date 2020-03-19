<template>
    <div class="row p-2" @mouseleave="$refs['numbers'].highlight(-1)">
        <suggest v-show="!model._id" ref="numbers" class="col form-control" name="number" :placeholder="t('number')"
            :value="model" :options="options" @select="update">
            <svg-row-down class="reset" @click="$refs['numbers'].highlight(0, true)"/>
        </suggest>
        <div v-show="!!model._id" class="col">
            <strong class="col border-bottom">Билет № {{ model.number }}</strong>
            
        </div>    
    </div>    
</template>

<script>
import { mapGetters } from 'vuex'
import { moment } from '@/functions'
import { SvgRowDown } from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    components: { SvgRowDown },
    props: { value: Object },

    computed: {
        ...mapGetters({
            empty: 'reestr/empty',
            map: 'reestr/map',
            date: 'date'
            }),
        numbers({ empty, date, map }) {   
            return Object.values(empty)
                .filter(v => moment(v.date).isSameOrBefore(date, 'date'))
                    .map(v => map[v._id])
        },
        options({ value, numbers }) {
            const includes = v => (v.number + '').includes(value.number || '')
            return numbers.filter(includes).sort((a, b) => a.number - b.number )
        },
        model({ value }) {
            return { ...value }
        }
    },
    methods: {
        update(v) {
            this.$emit('select', v)
        },
        input({ value: number }) {
            this.$emit('input', { ...this.value, number })
            this.$refs['numbers'].highlight(0)
        },
        t(v) {
            return this.$t(`vozvrat.${v}`)
        }
    } 
}
</script>

<style>

</style>