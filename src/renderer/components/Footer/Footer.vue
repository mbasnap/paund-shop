<template>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">{{settings.logoText}}</b-navbar-brand>
      <!-- <p>{{mainPath}}</p> -->
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters( ['settings'])
  }
}
</script>

<style>

</style>


