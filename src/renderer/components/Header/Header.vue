<template>
  <div class="header col">
    <router-link to="/lombard/vidacha">Vidacha</router-link>
    <router-link to="/lombard/vozvrat">Vozvtat</router-link>
    <router-link to="/lombard/prixod-rasxod">Prixod/Rasxod</router-link>
    <router-link to="/sklad">Sklad</router-link>
    <router-link to="/zvit">Zvit</router-link>
    <div></div>
    <header-calendar></header-calendar>
    <div></div>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
import HeaderCalendar from "../Calendar"
  export default {
    components: {HeaderCalendar}
  }
</script>

<style >

</style>
