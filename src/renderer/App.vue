<template>
  <div id="app">
        <app-header></app-header>
        <div class="container-body">
          <router-view ></router-view>
        </div>
        <app-footer></app-footer>
  </div>
</template>

<script>
  const { remote, ipcRenderer } = require('electron')
  import AppHeader from './components/Header.vue'
  import AppFooter from './components/Footer.vue'
  import zvit from './zvit'
  export default {
    name: 'paund-shop',
    components: { AppHeader, AppFooter } ,
    async created () {
      this.$router.push('login')
      // if (localStorage.getItem('settings'))
      // this.$store.dispatch('update').then(() =>{
      //   this.$router.push('login')
      // })
      // else this.$router.push('activate')
      ipcRenderer.on('show-zvit', (e, name) => {
          this.$modal.show(zvit[name], { }, { height: '550px', width: '800px'})
      })
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
html, body, #app{
  height: 100%;
  overflow: hidden;
}
body { 
  font-family: 'Source Sans Pro', sans-serif;
}
.container-body{
  margin-top: 60px;
  /* padding-bottom: 115px; */
  height: 100%;
  padding: 0 20px 115px;
}
.readonly {
    background-color: #e9ecef !important;
    opacity: 1;
}



</style>
