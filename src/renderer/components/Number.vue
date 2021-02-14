<template>
  <div class="form-row m-0">
    <suggest ref="numbers" class="form-control col" name="number"
      :placeholder="t('number')"
      :disabled="disabled"
      v-model="model" 
      :options="items" 
      @select="({ number: value, _id }) => model = { value, _id }">
      <svg-row-down v-if="options && !value._id"  
        class="reset" @click="$refs['numbers'].highlight(0, true)"/>
    </suggest>
    <div class="col" style="max-width: 30px;">
      <svg-reset  width="8px;" @click="reset"/>
    </div>  
  </div>    
</template>

<script>
import { SvgRowDown, SvgReset } from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
  mixins: [ mix ],
  components: { SvgRowDown, SvgReset },
  props: ['options', 'value', 'disabled'],
  data: () => ({
  }),
  computed: {
    items({ options = [] }) {
      return options.sort((a, b) => a.number - b.number)
    },  
    model: {
      get({ value }) {
        return value
      },
      set({ value: number, _id }) {
        this.$emit('input', { ...this.value, number, _id })
        this.$refs['numbers'].highlight(0)
      }
    }
  },
  methods: {
    reset() {
      this.$refs['numbers'].highlight(-1)
      this.$emit('reset')
    },
    t(v) {
      return this.$t(`vozvrat.${v}`)
    }
  } 
}
</script>

<style>

</style>