
<template>
  <div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="/#/">{{settings.logo}}</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav >
      <b-link  class="nav-link" v-for="link in userMenu"
        :key="link.name" 
        :to="link.value "
       >{{link.name}}</b-link>     
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <span>{{user.name}}</span>
      <b-nav-item-dropdown  right>
        <b-link class="dropdown-item" :to="'/login'">login</b-link>
        <b-link class="dropdown-item" @click="logout">logout</b-link>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
     ...mapGetters(['settings', 'user', 'userMenu'])
  },
  data() {
    return {}
  },

  methods: {
    ...mapActions(['logout'])
  }
}
</script>


