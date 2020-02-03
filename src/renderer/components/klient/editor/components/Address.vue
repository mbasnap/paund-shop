<template>
    <div class="form-group row">
        <label class="col-sm-3 col-form-label"> {{ t('address') }} </label>
        <div class="col-sm-9 p-0">
            <div class="form-row mb-2">
                <named-input  class="form-control col-sm-5 " name="post" :placeholder="t('post')" :value="model"/>
                <div class="col-sm-1"></div>
                <named-input  class="form-control col-sm-6" name="city" :placeholder="t('city')" :value="model"/>
            </div>
            <div class="form-row mb-2">              
                <named-input  class="form-control col-sm" name="province" :placeholder="t('province')" :value="model"/>                   
            </div>          
            <div class="form-row mb-2">
                <named-input  class="form-control col-sm-8" name="street" :placeholder="t('street')" :value="model"/>
                <div class="col-sm-1"></div>
                <named-input  class="form-control col-sm-3" name="home" :placeholder="t('home')" :value="model"/>
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
    computed: {
        model() {
            return this.value.address || {}
        }
    },
    methods: {
       input({ name, value }) {
            const address = { ...this.model, [name]: value }
            this.update({ ...this.value, address })
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }

}
</script>

<style>

</style>