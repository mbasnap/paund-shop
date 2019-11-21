<template>
    <div class="day-slider">
          <datepicker class="mb-2" v-model="dateModel"
            format="dd.MM.yy" input_class="day-slider-date"
            calendar_class="day-slider-left"
          /> 
         <vertical-slider :height="130" :offset="-22"
         v-model="daysModel"  :min="min" :max="max" />       
    </div>
</template>

<script>
import moment from 'moment'
import { VerticalSlider, Datepicker } from "@/widgets"
import { mapGetters, mapActions } from 'vuex'
export default {
components: {VerticalSlider, Datepicker},
props: {
    value: String,
    min: String,
    max: String
},
watch: {
    value(v) {}
},
data() {
    return {}
},
computed: {
     ...mapGetters(['date']),

    dateModel: {
        get() {
            return new Date(moment(this.date).add(this.value, 'd'))
        },
        set(v) {
            const date = moment(this.date)
            this.update(moment(v).diff(date, 'd') + 1)
        }
    },
    daysModel: {
        get() {
            return Number(this.value)
        },
        set (v) {
            this.update(v)
        }
    }
},
methods: {
    update(v) {
        this.$emit('input', v + '')
    }
}
}
</script>

<style>
    .day-slider-date {
        margin-left: -20px;
        width: 60px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
    .day-slider-left {
        margin-left: -200px;
        width: 250px;
        font-size: 12px;
    }
</style>
