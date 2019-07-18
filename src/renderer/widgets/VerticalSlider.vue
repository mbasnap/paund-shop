<template>
    <div class="vertical-slider">
        <input type="range" vertical 
        :min="min"
        :max="max"
        :style="{height: height + 'px'}"
        @change="({target}) => $emit('change', target)"
        v-model="model"/>
        <p class="vertical-slider-output"
            :style="{bottom: bottom + 'px', 'margin-bottom': bottomOffset + '%'}">
            {{model}}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        value: Number,
        height: Number,
        min: String,
        max: String,
        offset: Number
    },
    computed: {

        bottomOffset() {
            return this.model/this.max * this.offset
        },
        bottom() {
            return this.height * this.newPoint
        },
        newPoint() {
            const point = (this.model - this.min) / (this.max - this.min)
            return point > 1 ? this.max : point < 0 ? this.min : point
        },
        model: {
            get() {
                return this.value || this.max
            },
            set(v) {

                this.$emit('input', v)
            }
        }
    },
    methods: {}
}
</script>

<style >
input[type=range][vertical] {
    writing-mode: bt-lr; 
    -webkit-appearance: slider-vertical; 
    width: 8px;
    padding: 0 5px;
}
.vertical-slider input {
    outline: none
}
.vertical-slider {
    position: relative;
}
.vertical-slider-output { 
    position: absolute;
    color: black; 
    left: 20px;
}
.vertical-slider-output:after { 
  position: absolute;
  margin-top: -15px;
}
</style>
