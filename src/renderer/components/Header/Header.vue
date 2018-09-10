/* eslint no-use-before-define: 0 */  // --> OFF
<template>
  <div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">PS</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav >
      <b-link  class="nav-link" v-for="link in links" :key="link.name" :to="link.value ">{{link.name}}</b-link>     
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Profile</b-dropdown-item>
        <b-dropdown-item href="#">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
          {
            name: "Vidachd",
            value: "/lombard/vidacha"
          },
          {
            name: "vozvrat",
            value: "/lombard/vozvrat"
          },
          {
            name: "prixod-rasxod",
            value: "/lombard/prixod-rasxod"
          },
          {
            name: "sklad",
            value: "/sklad"
          },
          {
            name: "zvit",
            value: "/zvit"
          }
        ]
    }
  }
}
</script>


