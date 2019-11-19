<template>
    <b-nav-item-dropdown :text="user.name" right >
     <b-link class="dropdown-item" @click="logout">logout</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
created() {
    this.update()
},
computed: {
    ...mapGetters('user', ['user'])
},
methods: {
    ...mapActions('user', ['logout', 'update'])
}
}
</script>

<style>

</style>
