<template>
    <div>
      <span>{{user.name}}</span>
      <b-nav-item-dropdown  right>
        <b-link class="dropdown-item" :to="'/login'">login</b-link>
        <b-link class="dropdown-item" @click="logout">logout</b-link>
      </b-nav-item-dropdown>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
computed: {
    ...mapGetters('user', ['user'])
},
methods: {
    ...mapActions('user', ['login', 'logout'])
}
}
</script>

<style>

</style>
