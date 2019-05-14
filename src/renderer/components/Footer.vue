<template>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">{{logo}}</b-navbar-brand>
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
     ...mapGetters(['logo'])
  }
}
</script>

<style>

</style>


