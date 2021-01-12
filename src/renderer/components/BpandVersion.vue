<template>
  <b-navbar-brand href="#" @click="reload">
    {{ brand }}<span class="version">-{{ version }}</span>
    <slot></slot>
  </b-navbar-brand>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['brand', 'version'])
  },
  methods: {
    ...mapActions(['reload'])
  }

}
</script>

<style>

</style>