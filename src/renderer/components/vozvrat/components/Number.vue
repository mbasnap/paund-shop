<template>
    <suggest class="form-control" name="number" :placeholder="t('number')"
        :value="value" :options="options" @select="update">
        <slot></slot>
    </suggest>        
</template>

<script>
import { mapGetters } from 'vuex'
import { moment } from '@/functions'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
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
        }
    },
    methods: {
        update(v) {
            this.$emit('select', v)
        },
        input({ value: number }) {
            this.$emit('input', { ...this.value, number })
        },
        t(v) {
            return this.$t(`vozvrat.${v}`)
        }
    } 
}
</script>

<style>

</style>