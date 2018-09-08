<template>
  <div id="app" class="row" style="height: 600px">
    <app-header></app-header>
    <hr>
    <router-view style="height: 80%;"></router-view>   
    <hr>
    <app-footer ></app-footer>
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
 @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body { font-family: 'Source Sans Pro', sans-serif; }
  .row {
    display: flex;
    flex-direction: column;
  }
  .row div {
    flex: auto;
  }
  .col {
    display: flex;
  }
  .app-header {
    background: rgb(195, 195, 228);
  }
  .app-header * {
    padding: 10px;
  }
</style>
