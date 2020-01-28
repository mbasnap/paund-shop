<template>
<div :class="['bilet', { disabled }]">
      <div class=" form-row mb-2" >
        <span class="col-3"> Ocenca </span>
        <div class="value col">
            <span > {{ ocenca }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> Procent </span>
        <div class="value col">
            <span v-show="procent.summ > 0">{{ procent.value }} x {{ Number(procent.days) }} = </span>
            <span > {{ procent.summ }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> Panalty </span>
        <div class="value col">
            <span v-if="Number(penalty.summ) > 0">{{ penalty.value }} x {{ Number(penalty.days) }} = </span>
            <span > {{ penalty.summ }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> Total </span>
        <div class="value col">
            <span > {{ total }} </span>
        </div>
      </div>
    <!-- <div class="form-row m-0 mb-2" >
      <div class="col-1" >
        <input type="checkbox" class="form-check-input ml-0" id="dropdownCheck2"
        @change="showStatment">
      </div>
      <div class="col">
          <div v-if="!showSt" style="text-align: left;">
            <label class="form-check-label" for="dropdownCheck2">Add statment</label>
          </div>
          <div v-else>
            <div style="text-align: center;">
            <span class="pr-2">{{days}}</span>
              <b-form-slider class="pl-2" v-model="days"
              :ticks="[5, 10, 15, 20]"
              :ticks_labels="['5', '10', '15', '20']"
              ticks_tooltip="true"
              :min="5" :max="20" :step="5"></b-form-slider>
            </div>
          </div>
      </div>
    </div> -->
</div>
</template>

<script>
import bFormSlider from 'vue-bootstrap-slider/es/form-slider'
import 'bootstrap-slider/dist/css/bootstrap-slider.css'
import { summ } from '@/functions'
export default {
  components: { bFormSlider },
    props: { value: Object, disabled: Boolean },
    computed: {
      days({ value }) {
        return value.days
      },
      ocenca({ value }) {
        return value.ocenca
      },
      procent({ value }) {
        return { ...value.procent }
      },
      penalty({ value }) {
        return { ...value.penalty }
      },
      total({ value, procent, penalty }) {
          return summ(value.ocenca, procent.summ * -1, penalty.summ)
      }
    },
    methods: {} 
}
</script>

<style>
.bilet.disabled {
  background-color: #e9ecef;
}
</style>