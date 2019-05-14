
<template>
<b-navbar  type="dark" variant="info">
    <b-navbar-brand href="/#/">{{logo}}</b-navbar-brand>
  <div v-show="isActive">
    <b-navbar-nav >
      <b-link  class="nav-link" v-for="link in menu"
        :key="link.name" 
        :to="link.value "
       >{{link.name}}</b-link>     
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <datepicker v-model="dateModel" :language="lang" :bootstrap-styling="true"/> 
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto"> <user/> </b-navbar-nav>
  </div>
</b-navbar>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  import Datepicker from 'vuejs-datepicker';
  import User from './User';
  import {ru} from 'vuejs-datepicker/dist/locale'
export default {
  components: { Datepicker, User},
  computed: {
     ...mapGetters(['menu', 'logo', 'date', 'isActive']),
     dateModel: {
       get () {
         return this.date
       },
       set (v) {this.$store.dispatch('setDate', v)},
     },
     lang () {
       return ru
     }
  }
}
</script>


