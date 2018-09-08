<template>
  <div id="app" style="height: 600px;">
    <app-header style="height: 10%"></app-header>
    <hr>
    <router-view style="height: 90%;"></router-view>   
    <hr>
    <app-footer style="height: 10%;"></app-footer>
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body { font-family: 'Source Sans Pro', sans-serif; }
  .row {
    display: flex;
    flex-direction: column;
    flex-grow: 1;  
    height: 100%;
  }
  .column {
    display: flex;
    /* flex-direction: row; */
    flex-grow: 1; 
    width: 100%; 
  }
  .app-header {
    background: rgb(195, 195, 228);
    display: flex;
    align-items: center;     /*Центрирование по вертикали */
    padding: 10px
  }

</style>
