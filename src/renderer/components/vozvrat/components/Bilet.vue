<template>
    <div :class="['bilet', { disabled }]">
      <div class=" form-row mb-2" >
        <span class="col-3"> Procent </span>
        <div class="value col">
            <span v-show="procent.summ > 0">{{ procent.procent }} x {{ Number(procent.days) }} = </span>
            <span > {{ procent.summ }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> Panalty </span>
        <div class="value col">
            <span v-if="Number(penalty.summ) > 0">{{ penalty.penalty }} x {{ Number(penalty.days) }} = </span>
            <span > {{ penalty.summ }} </span>
        </div>
      </div>
      <div class=" form-row mb-2" >
        <span class="col-3"> Total </span>
        <div class="value col">
            <span > {{ total }} </span>
        </div>
      </div>
    </div>
</template>

<script>
import { summ } from '@/functions'
export default {
    props: { value: Object, disabled: Boolean },
    computed: {
      ssuda({ value }) {
        return value.ssuda || {}
      },
      procent({ value }) {
        return value.procent || {}
      },
      penalty({ value }) {
        return value.penalty || {}
      },
      total({ ssuda, procent, penalty }) {
          return summ( ssuda.summ, procent.summ, penalty.summ )
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