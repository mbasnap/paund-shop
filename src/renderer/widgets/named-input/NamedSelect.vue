<template>
  <select :name="name" class="named-input" :placeholder="placeholder"
    :value="value[name]"
    :disabled="disabled || readonly()"
    @change="$nextTick(() => $emit('change', $event.target))"
    @input="input($event.target)">
    <option v-if="placeholder" value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="(item, index) in options" :key="index" :value="tovalue(options[index], index)"
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
    methods: {}
}
</script>

<style>

</style>