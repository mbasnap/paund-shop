<template>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"></label>
        <div class="col-sm-9 p-0 ">
            <div class="form-row mb-2">
                <named-input  class="form-control col-sm-5 " name="bithday" :placeholder="t('bithday')" :value="value"/>
                <div class="col-sm-1"></div>
                <named-input  class="form-control col-sm-6" name="cityBith" :placeholder="t('city')" :value="value"/>
            </div>                                         
        </div>
    </div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object },
    inject: [ 'update' ],
    computed: {},
    methods: {
       input({ name, value }) {
            this.update({ ...this.value, [name]: value })
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }

}
</script>

<style>

</style>