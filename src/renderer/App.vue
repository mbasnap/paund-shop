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
a {
  outline: none;
}
.tabs {
    overflow: hidden;
  margin-bottom: 10px;
}
.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}
.tabs a {
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}
/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}
/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}
/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}

.modal-header .row {
    width: 100%;
    justify-content: flex-end;

}
.modal-content {
    height: -webkit-fill-available;
}
.modal-body {
    overflow: auto;
}
.modal-body .content {
    overflow: hidden;
}

</style>
