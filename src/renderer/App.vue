<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
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
  /* CSS */
</style>
