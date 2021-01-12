<template>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="$emit('cansel')">{{ t('cansel') }}</button>
    <div class="d-flex justify-content-center" style="width: 100px;">
      <b-spinner v-if="loading"  variant="primary"></b-spinner>
      <button v-else type="button" class="btn btn-primary" :disabled="disabled"
      @click="$emit('ok')" >{{ t(ok) }}</button>
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