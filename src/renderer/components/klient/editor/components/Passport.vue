<template>
    <div class="passport">
        <div class="form-row mb-2">
            <named-input class="form-control col-3 mr-1" name="seria" placeholder="AA" :value="model" />
            <named-input class="form-control col" name="number" placeholder="000000" :value="model"/>
        </div> 
        <div v-if="full" class="form-row mb-2">
            <named-textarea class="form-control col" name="issued" placeholder="Issued" :value="model"/>
        </div>
    </div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, full: Boolean },
    inject: [ 'update' ],
    computed: {
        passport() {
            return this.value['passport'] || []
        },
        model() {
            return this.passport[0] || {}
        }
    },
    methods: {
        readonly() {
            return this.disabled
        },
        input({ name, value }) {
            this.value['passport'] = [ { ...this.model, [name]: value} ]
            this.update({ ...this.value })
        }
    }
}
</script>

<style>

</style>