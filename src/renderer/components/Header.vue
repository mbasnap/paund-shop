
<template>
<div class="main-menu">
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-brand href="#">{{logo}}</b-navbar-brand>

    <div class="container-fluid" v-show="isAuth">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav v-for="(item, index) in menu" :key="index" >
          <b-link  class="nav-link mr-2" :to="'/' + item">{{item}}</b-link>     
        </b-navbar-nav>
      <b-navbar-nav class="ml-auto nav-right">
        <b-nav-form  class="datepicker">
          <datepicker calendar-class="right" v-model="dateModel" :language="lang" :bootstrap-styling="true"/> 
        </b-nav-form>
        <user class="ml-auto right"></user>
      </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Datepicker from 'vuejs-datepicker';
  import User from './User';
  import {ru} from 'vuejs-datepicker/dist/locale'
export default {
  components: { Datepicker, User},
  computed: {
     ...mapGetters(['menu', 'logo', 'isAuth', 'date']),
     dateModel: {
       get () {
         return this.date
       },
       set (v) {this.$store.dispatch('setDate', v)},
     },
     lang () {
       return ru
     }
  },
  methods: {
    ...mapActions['logout']
  }
}
</script>
<style>

.main-menu .nav-right {
  width: 35%;
}
.datepicker .right {
    right: 0;
    left: auto;
}
</style>


