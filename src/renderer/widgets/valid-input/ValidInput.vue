<template>
  <div class="form-group">
    <label>{{label}}</label>
    <input
      ref="input"
      class="form-control"
      v-on:keyup.enter="$emit('enter')"
      :autocomplete="autocomplete"
      v-model="model" 
      :type="type"
      :autofocus="autofocus"
      :class="error ? 'is-invalid' : isValid "
      :placeholder="placeholder">
    <div class="invalid-feedback">
      <slot>{{ error }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'type', 'placeholder', 'autofocus', 'autocomplete', 'value', 'validate', 'error'],
  // props: {
  //   label: '',
  //   type: '',
  //   placeholder: '',
  //   autofocus: false,
  //   isValid: true,
  //   autocomplete: '',
  //   value: '',
  //   validate: []
  // },

  computed: {
    model: {
      get(){
        return this.value
      },
      set(value){
        this.$emit('update:value', value)
        this.$nextTick(() => {
          const err = !this._validate()
          if(!err) this.$emit('update:error', false)
        })
      }
    },
    isValid({ value }){
      return value ? 'is-valid' : ''
    }
  },
  methods: {
    _validate() {
      return !(this.validate || []).some(func => {
        const err = func(this.value)
        this.$emit('update:error', err)
        this.$refs['input'].focus()
        return !!err
      })
    }
  }
}
</script>
<style scoped>
  .form-group {
    height: 75px;
  }
</style>
