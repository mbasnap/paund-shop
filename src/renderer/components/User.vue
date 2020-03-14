<template>
    <b-nav-item-dropdown :text="user.name" right >
     <b-link class="dropdown-item" @click="editProfile">Profile</b-link>
     <b-link class="dropdown-item" @click="logOut">{{ $t('auth.logout') }}</b-link>
     <b-link v-if="isAdmin" class="dropdown-item" @click="changeAccount">Change Account</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Editor from './UserEditor'
export default {

computed: {
    ...mapGetters(['user', 'isAdmin']),
},
methods: {
    ...mapActions(['logOut', 'updateUser', 'changeAccount' ]),
    editProfile() {
        this.showModal('edit profile', this.user)
    },
    async save(user, password) {
        return this.updateUser({ user, password })      
    },
    showModal(title, value) {        
    this.$modal.show(Editor, { title, value, save: this.save }, { height: 'auto' })
    }
}
}
</script>

<style>

</style>
