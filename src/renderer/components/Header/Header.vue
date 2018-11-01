
<template>
  <div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">{{settings.logo}}</b-navbar-brand>

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
        <b-link class="dropdown-item" :to="'/vidacha'">vidacha</b-link>
        <b-link class="dropdown-item" :to="'/vidacha'">vidacha</b-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>
<script>
  import {mapGetters, mapState} from 'vuex'
export default {
  computed: {
     ...mapGetters('settings', {
       settings: 'getSettings'
     })
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


