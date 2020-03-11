<template>
    <b-nav-item-dropdown :text="user.name" right >
     <!-- <b-link class="dropdown-item" @click="changeAccount()">Change account</b-link> -->
     <b-link class="dropdown-item" @click="logOut">{{ $t('auth.logout') }}</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {

computed: {
    ...mapGetters(['user'])
},
methods: {
    ...mapActions(['logOut', 'changeAccount'])
}
}
</script>

<style>

</style>
