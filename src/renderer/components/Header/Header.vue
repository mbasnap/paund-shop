
<template>
  <div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

<<<<<<< HEAD
  <b-navbar-brand href="#">{{settings.logo}}</b-navbar-brand>
=======
  <b-navbar-brand href="#">{{settings.logoText}}</b-navbar-brand>
>>>>>>> 8f6d850bb5da6bb591a6562ec5352c432dd78ebd

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav >
      <b-link  class="nav-link" v-for="link in links"
        :key="link.name" 
        :to="link.value "
       >{{link.name}}</b-link>     
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown 
        @click="alert1"
        right>
        <b-nav-text>asda</b-nav-text>
        <b-link class="dropdown-item" :to="'/vidacha'">vidacha</b-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>
<script>
<<<<<<< HEAD
  import {mapGetters, mapState} from 'vuex'
export default {
  computed: {
     ...mapGetters('settings', ['settings'])
=======
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['settings'])
>>>>>>> 8f6d850bb5da6bb591a6562ec5352c432dd78ebd
  },
  data() {
    return {

      links: [ 
          {
            name: "lombard",
            value: "/lombard"
          },
          {
            name: "kassa",
            value: "/kassa"
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
  },
  methods: {
    alert1(){
      alert("dasdsa")
    }
  }
}
</script>


