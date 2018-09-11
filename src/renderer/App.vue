<template>
  <div id="app">
        <app-header></app-header>
        <router-view class="p-3" style="height: -webkit-fill-available;"></router-view>   
        <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/Header'
  import AppFooter from './components/Footer'
  export default {
    name: 'paund-shop',
    components: { AppHeader, AppFooter },
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
