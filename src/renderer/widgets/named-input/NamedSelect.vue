<template>
  <select :name="name" class="named-input"
    :value="value[name]"
    :disabled="readonly()"
    @change="change($event.target)">
      <option v-for="(item, index) in options" :key="index"
       >{{ item }}</option>
  </select>
</template>

<script>
// import mix from "./mix"
export default {
      props: {
        name: String,
        value: Object,
        options: Array
    },
    inject: [ "change", "readonly" ],
    // mixins: [ { props: mix.props, inject: mix.inject } ],
}
</script>

<style>

</style>