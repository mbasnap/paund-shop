<template>
    <b-nav-item-dropdown :text="user.name" right >
     <b-link class="dropdown-item" @click="editProfile">Profile</b-link>
     <b-link class="dropdown-item" @click="logOut">{{ $t('auth.logout') }}</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Editor from './UserEditor'
export default {

computed: {
    ...mapGetters(['user'])
},
methods: {
    ...mapActions(['logOut', 'updateUser', 'changePassword']),
    editProfile() {
        const { fio, passport, address } = this.user
        this.showModal('edit profile', { fio, passport, address })
    },
    save(name, value) {
        const { name: user } = this.user
        const metadata = { [name]: value }
        const password = name === 'password' ? value : false
        this.updateUser({ user, metadata, password })      
    },
    showModal(title, value) {        
    this.$modal.show(Editor, { title, value, save: this.save }, { height: 'auto' })
    }
}
}
</script>

<style>

</style>
