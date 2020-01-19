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
  const { remote, ipcRenderer } = require('electron');
 
// import PouchVue from 'pouch-vue';

  // const ipcRenderer = require("electron").ipcRenderer
  import AppHeader from './components/Header.vue'
  import AppFooter from './components/Footer.vue'
  import zvit from './zvit'
  export default {
    name: 'paund-shop',
    components: { AppHeader, AppFooter } ,
    async created () {
      // const currentWindow = remote.getCurrentWindow();
      // const { db } = currentWindow.custom
      // console.log( await this.$bucket.db('ps').get('asaas'));
      // this.$pouch.sync('ps', 'http://localhost:5984/ps');
      

// console.log(id);

// db.info().then(function (info) {
//   console.log(info);
// })

      this.$store.dispatch('update')
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
body { 
  font-family: 'Source Sans Pro', sans-serif;
}
.readonly {
    background-color: #e9ecef !important;
    opacity: 1;
}



</style>
