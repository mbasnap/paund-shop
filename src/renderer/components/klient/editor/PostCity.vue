<template>
  <div class="row m-0 p-0">
      <input type="text" class="form-control col-5" name="post"
      :value="model.post" @input="input">
      <input type="text" class="form-control col" name="city"
      :value="model.city" @input="input">
  </div>
</template>

<script>
export default {
props: { value: Object },
computed: {
    model() {
        return {...this.value}
    }
},
methods: {
    input({ target }) {
        this.$emit('input', target)
    }
}
}
</script>

<style>

</style>