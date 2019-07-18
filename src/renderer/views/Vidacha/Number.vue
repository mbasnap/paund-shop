<template>
<div class="row number">
    <div class="col-8">
        <b-form-select  v-model="value" :options="numbers"/>
    </div>
    <div class="col">
          <datepicker position="right" v-model="date"
          @change="v => $store.dispatch('setDate', v)"
          /> 
    </div>
</div>
</template>

<script>
import {Datepicker} from '@/widgets';
export default {
props: {
    value: String,
    numbers: Array,
    date: String
}

}
</script>

<style>

</style>
