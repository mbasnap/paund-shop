<template>
    <b-nav-item-dropdown :text="model.email" right >
     <b-link class="dropdown-item" @click="logOut">{{ $t('auth.logout') }}</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
computed: {
    ...mapGetters(['user']),
    model({ user }) {
        return {...user }
    }
},
methods: {
    ...mapActions(['logOut'])
}
}
</script>

<style>

</style>
