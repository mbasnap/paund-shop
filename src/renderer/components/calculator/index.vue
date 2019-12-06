<template>
    <div class="calculator">
        <suggest class="form-control mb-2" name="number" placeholder="Number"
        :value="model" :options="options" @select="select">
            <slot></slot>
        </suggest>        
        <computed :value="model"/>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Computed, mix } from './components'

export default {
    mixins: [ mix ],
    components: { Computed },
    props: { value: Object },
    computed: {
        ...mapGetters('bilet', [ 'bilets' ]),
        data() {
            return {
                number: ''
            }
        },
        model({ value }) {
            const number = value.number || this.number
            return { ...value, number }
        },
        options({ number, bilets }) {            
            return Object.values(bilets)
                .filter(v => v.number.includes(number || ''))
        }
    },
    methods: {
        select(v) {
            this.$emit('input', { ...v })
        },
        input({ name, value }) {
            this.number = value
        }
    } 
}
</script>

<style></style>