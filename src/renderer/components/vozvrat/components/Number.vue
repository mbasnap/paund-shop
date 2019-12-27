<template>
    <suggest class="form-control mb-4" name="number" placeholder="Number"
        :value="model" :options="options" @select="update">
        <slot></slot>
    </suggest>        
</template>

<script>
import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object },

    computed: {
        ...mapGetters({ dt001: 'reestr/dt001', empty: 'reestr/empty' }),
        model({ value }) {
            return { ...value }
        },
        number({ value }) {
            return value.number
        },
        options({ empty, number }) {
            return Object.values(empty)
                .filter(v => (v.number + '').includes(number || ''))
                    .sort((a, b) => a.number > b.number )
        }
    },
    methods: {
        update(v) {
            this.$emit('select', v)
        },
        input({ value: number }) {
            this.$emit('input', { ...this.value, number })
        }
    } 
}
</script>

<style>

</style>