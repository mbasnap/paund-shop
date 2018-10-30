<template>
    <b-navbar type="dark" variant="info">
<<<<<<< HEAD
      <b-navbar-brand href="#">{{settings.logoText}}</b-navbar-brand>
=======
      <b-navbar-brand href="#">{{settings.logo}}</b-navbar-brand>
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
      <!-- <p>{{mainPath}}</p> -->
    </b-navbar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
<<<<<<< HEAD
    ...mapGetters( ['settings'])
=======
    ...mapGetters('settings', ['settings'])
>>>>>>> 145846c28cbd3d758a0a6c5140c354fd4bef56ff
  }
}
</script>

<style>

</style>


