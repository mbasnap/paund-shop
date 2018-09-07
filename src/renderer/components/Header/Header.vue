<template>
  <div id="header">
    <router-link to="/lombard/vidacha">Vidacha</router-link>
    <router-link to="/lombard/vozvrat">Vozvtat</router-link>
    <router-link to="/lombard/sklad">Sklad</router-link>
    <router-link to="/">Hame</router-link>
  </div>
</template>

<script>


  export default {

  }
</script>

<style>
#header {
  /* line-height: 3em; */
  height: 50px;
  background: rgb(195, 195, 228);
  display: flex;
  align-items: center;     /*Центрирование по вертикали */

}
#header a {
  padding: 10px
  
}
</style>
