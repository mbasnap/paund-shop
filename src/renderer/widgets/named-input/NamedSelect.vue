<template>
  <select :name="name" class="named-input" :placeholder="placeholder"
    :value="model"
    :disabled="disabled || readonly()"
    @change="$emit('change', $event.target)"
    @input="input($event.target)">
    <option value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="(item, index) in options" :key="index" :value="tovalue(options[index], index) "
       >{{ tostring(item) }}</option>
  </select>
</template>

<script>
export default {
      props: {
        name: String,
        value: Object,
        options: Array,
        placeholder: String,
        disabled: Boolean,
        tostring: { type: Function,
          default: v => v
        },
        tovalue: { type: Function,
          default: v => v
        }
    },
    inject: [ "input", "readonly"],
    computed: {
      model({ value, name }) {
        return value[name]
      }
    },
    methods: {}
}
</script>

<style>

.named-input.form-control[readonly]{
    background-color: initial;
}

</style>