<template>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="$emit('cansel')">{{ t('cansel') }}</button>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-primary" :disabled="disabled" @click="$emit('ok')" >
        <span>{{ t(ok) }}</span>
        <b-spinner v-show="loading" small  />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['disabled', 'loading', 'ok', 'loading'],
  methods: {
    t(v) {
      return this.$t(`btn.${v}`)
    }    
  }
}
</script>

<style>

</style>