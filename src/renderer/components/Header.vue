
<template>
<div class="main-menu">
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-brand href="#" :style="{color: conn ? 'green' : 'red'}">{{company.logo}}</b-navbar-brand>

    <div class="container-fluid" v-show="isAuth">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav >
        <b-navbar-nav v-for="(item, index) in menu" :key="index" >
          <b-link  class="nav-link mr-2" :to="'/' + item">{{ $t(`menu.${item}`)}}</b-link>     
        </b-navbar-nav>
      <b-navbar-nav class="ml-auto nav-right">
        <b-nav-form >
          <datepicker :value="date" input_class="form-control"
          @input="v => $store.dispatch('setDate', v)"
          /> 
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
  import {Datepicker} from '@/widgets';
  import User from './User';
export default {
  components: { Datepicker, User},
  created() {
    window.addEventListener('online', () => this.conn = true)
    window.addEventListener('offline', () => this.conn = false)
  },
  data() {
    return {
      conn: navigator.onLine
    }
  },
  computed: {
     ...mapGetters(['menu', 'date', 'user', 'company']),
     isAuth({ user }) {
       return !!user
     }

  },
  methods: {
    // ...mapActions['logout']
  }
}
</script>
<style>

.main-menu .nav-right {
  width: 35%;
}
/* .datepicker .right {
    right: 0;
    left: auto;
} */
</style>


