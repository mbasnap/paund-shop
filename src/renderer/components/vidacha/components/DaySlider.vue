<template>
    <div :class="[ 'day-slider', 'p-0', { readonly: readonly() } ]">
        <datepicker class="mb-2" v-model="dateModel" :editable="!readonly()"
        format="dd.MM.yyyy" input_class="named-input day-slider-date"
        calendar_class="day-slider-left"/> 
        <vertical-slider :height="130" :offset="-15" v-model="model" :editable="!readonly()"
        :min="settings.minDays" :max="settings.maxDays"/>       
    </div>
</template>

<script>
import { moment } from '@/functions'
import { VerticalSlider, Datepicker } from "@/widgets"
import { mapGetters } from 'vuex'
const name = 'days'
export default {
components: { VerticalSlider, Datepicker },
props: { value: Object, name: String, readonly: Boolean },
inject: [ 'change', 'readonly' ],
computed: {
     ...mapGetters([ "date", "settings" ]),
    dateModel: {
        get({ date, value }) {
            return new Date(moment(date).add(value.days, 'd'))
        },
        set(v) {
            const value = moment(v).diff(this.date, 'd') + 1
            this.change({ name, value })
        }
    },
    model: {
        get({ value }) {
            return Number(value.days)
        },
        set(value) {
            this.change({ name, value })
        }
    }
}
}
</script>

<style>

    .day-slider {
        margin-left: -5px;
    }
    .day-slider-date {
        width: 75px;
        border: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        font-size: 15px;
    }
    .day-slider-left {
        margin-left: -200px;
        width: 250px;
        font-size: 12px;
    }
</style>
