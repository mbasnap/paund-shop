<template>
    <div class="calculator">   
    <!-- <div class="col-9" > -->
     
        <div class="instant">
        <input  v-model="value.ssuda" class='form-control' placeholder="0,00" readonly/>
        </div>
<div class=" input-group " >
<input  v-model="value.procent" class="form-control" style="width: 70%" placeholder="0,00" readonly>
  <div class="input-group-append " style="width: 30%">
    <input v-model="value.skidka" type="number" class="form-control"/>
  </div>
</div>
        <div class="instant">
        <input  v-model="value.ocenka" class='form-control' placeholder="0,00"/></div>
    </div>
</template>

<script>
// import { Instant, DaySlider } from "@/widgets"

export default {
    // components: { Instant, DaySlider },
    props: {
        value: Object,
        props: Object
    },
        computed: {
            skidka: {
                get() {
                    return this.value.skidka || 0
                },
                set(v) {
                    this.$emit('input', ['skidka', v])
                }
            }
        },
        methods: {}
}
</script>

<style >
.calculator .form-control{
    width: 100%;
}
.calculator .input-group{
    margin-bottom: 6px;
}
.calculator .input-group-append input{
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
}
.calculator .input-group input{
  background-color:#fff;

}

</style>
