<template>
  <select :name="name" class="named-input" :placeholder="placeholder"
    :value="value[name]"
    :disabled="readonly()"
    @change="onchange($event)">
    <option v-if="placeholder" value="" disabled selected hidden>{{ placeholder }}</option>
      <option v-for="(item, index) in options" :key="index" :value="options[index]"
       >{{ tostring(item) }}</option>
  </select>
</template>

<script>
// import mix from "./mix"
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
    methods: {
      onchange({ target }) {
        // const { name, options } = this
        // const value = options[selectedIndex -1]
        // console.log(value);
        
        this.change(target)
      }
    }
}
</script>

<style>

</style>