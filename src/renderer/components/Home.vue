<template>
  <p>Home</p>
</template>

<script>


  export default {
    name: 'home',
    // components: { AppHeader, AppFooter },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
 
</style>
