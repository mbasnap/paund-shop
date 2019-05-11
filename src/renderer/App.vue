<template>
  <div id="app">
        <app-header></app-header>
        <div class="container-fluid d-flex" style="height: 500px;">
          <router-view ></router-view>   
        </div>
        <app-footer></app-footer>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import AppHeader from './components/Header.vue'
  import AppFooter from './components/Footer.vue'
  export default {
    name: 'paund-shop',
    components: { AppHeader, AppFooter },
    created() {
        // this.init()
    } ,
     methods: {
        // ...mapActions(['init']),
     }   
  }
</script>

<style>
 /* @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro'); */

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body { font-family: 'Source Sans Pro', sans-serif; }



</style>
