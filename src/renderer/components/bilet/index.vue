<template>
<div class="row bilet">
    <div class="col-9">
        <named-select class='form-control mb-2' name="number" :value="model" :options="emptyNumbers"/>
        <input class='form-control mb-2' :value="toDouble(ssuda)" readonly/>
        <div class=" input-group mb-2" >
            <input  :value="toDouble(model.procent)" class="form-control mb-2" readonly>
            <div class="input-group-append">
            <named-select class="form-control" name="discount" :value="model" :options="settings.discounts"/>
            </div>
        </div>
        <named-input class='form-control' name="ocenca" :value="model" :format="toDouble"/>  
    </div>
    <day-slider class="col-3" name="days" :value="model" :editable="editable" />
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { toDouble, diff, mult } from '@/functions'
import { NamedInput, NamedSelect, mix } from '@/widgets/named-input/index.js'
import DaySlider from './DaySlider'
export default {
components: { NamedInput, NamedSelect, DaySlider },
mixins: [ { provide: mix.provide, methods: mix.methods } ],
props: { value: Object, total: Object, editable: Boolean },
created() {
    this.getBilets()
},
watch: {
    total({ ocenca }) {
        this.update({ ...this.model, ocenca })
    }
},
computed: {
    ...mapGetters({ settings: "settings", emptyNumbers: "bilet/emptyNumbers"}),
    ssuda() {
        const { ocenca, procent } = this.model
        return diff(ocenca, procent)
    },
    model({ value, settings, emptyNumbers }) {
        const number = value.number || emptyNumbers[0]
        const discount = value.discount || settings.discounts[0]
        const days = value.days || settings.maxDays
        return { ...value, number, discount, days }
    }
},
methods: { toDouble,
    ...mapActions({ getBilets: "bilet/update" }),
    readonly() {
        return !this.editable
    },
    update(value) {
        const dayProc = mult(value.ocenca, this.settings.procent) / 100
        const discount = mult(dayProc, value.discount) / 100
        const procent = mult(diff(dayProc, discount), value.days)
        const valid = diff(this.total.ocenca, value.ocenca) >= 0
        this.$emit('input', { ...value, procent, valid })
    },
    change({ name, value }) {
        this.update({ ...this.model, [name]: value })
    }
}
}
</script>

<style>

.bilet .form-control:focus  {
border-color: rgba(56, 61, 65, 0.22);
box-shadow: none;
}

</style>
