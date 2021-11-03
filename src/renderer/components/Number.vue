<template>
  <div class="form-row m-0">
    <suggest ref="numbers" class="form-control col" name="number"
      :placeholder="t('number')"
      :disabled="disabled"
      v-model="model" 
      :options="items"
      :suggest="suggest"
      @select="({ number: value, _id, index }) => model = { value, _id, index }">
      <svg-row-down v-if="options && !value._id"  
        class="reset" @click="$refs['numbers'].highlight(0, true)"/>
    </suggest>
    <b-button size="sm" class="col ml-2"
    @click="reset"
    v-if="!editMode"
    :disabled="disabled"
    style="max-width: 42px"
    variant="outline-secondary">
      <b-icon icon="x-circle" aria-hidden="true"/>
    </b-button>
  </div>    
</template>

<script>
import { SvgRowDown, SvgReset } from '@/svg'
import mix from '@/widgets/named-input/mix.js'
export default {
  mixins: [ mix ],
  components: { SvgRowDown, SvgReset },
  props: ['options', 'value', 'disabled', 'suggest', 'highlight', 'editMode'],
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
      set({ value: number, _id, index }) {
        this.$emit('input', { ...this.value, number, _id, index })
        if (this.highlight !== false) this.$refs['numbers'].highlight(0)
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