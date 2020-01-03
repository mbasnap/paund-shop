<template>
  <select :name="name" class="named-input" :placeholder="placeholder"
    :value="value[name]"
    :disabled="readonly()"
    @change="change($event.target)">
    <option v-if="placeholder" value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="(item, index) in options" :key="index" :value="options[index]"
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
        tostring: { type: Function,
          default: v => v
        }
    },
    inject: [ "change", "readonly"],
    methods: {}
}
</script>

<style>

</style>