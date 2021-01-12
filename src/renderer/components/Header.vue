
<template>
<div class="main-menu">
  <b-navbar toggleable="sm" type="dark" variant="info">
    <b-navbar-brand v-if="company && company.name" class="company" href="#" 
    :style="{color: conn ? 'green' : 'red'}">
      {{ company.logo }}</b-navbar-brand>
    <brand-version v-else />
    <div v-if="user && user.name" class="container-fluid" >
        <b-navbar-nav v-for="(item, index) in menu" :key="index" >
          <b-link  class="nav-link mr-2" :to="'/' + item">{{ $t(`menu.${item}`)}}</b-link>     
        </b-navbar-nav>
      <b-navbar-nav class="ml-auto nav-right">
          <datepicker :value="date" input_class="form-control"
          @input="v => $store.dispatch('setDate', v)"/> 
        <user class="ml-auto right" :user="user"/>
      </b-navbar-nav>
    </div>
  </b-navbar>
</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { Datepicker } from '@/widgets';
  import BrandVersion from './BpandVersion'
  import User from './User';
export default {
  components: { Datepicker, User, BrandVersion },
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
     ...mapGetters(['date', 'company', 'logo', 'user']),
     menu({ company }) {
      const { menu = '' } = company       
       return menu.map ? menu : menu.split(',')
        .filter(v => !!v).map(v => v.trim())
     }
  }
}
</script>
<style scoped>
@media (max-width:950px){
    .company{
        font-size: 15px;
    }
}
.datepicker{
  flex: 1 1;
}
.main-menu{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}
.main-menu .navbar {
  height: 60px;
}
</style>


