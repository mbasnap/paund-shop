<template>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">{{company.logo}}</b-navbar-brand>
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
     ...mapGetters(['company'])
  }
}
</script>

<style>

</style>


