<template>
    <b-nav-item-dropdown :text="user.name" right >
     <b-link class="dropdown-item" @click="editProfile">{{ t('tabs', 'profile')}}</b-link>
     <b-link class="dropdown-item" @click="logOut()">{{ t('tabs', 'logout') }}</b-link>
    </b-nav-item-dropdown>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Editor from './UserEditor'
export default {
props: ['user'],
methods: {
    ...mapActions(['logOut', 'updateUser', 'updatePassword' ]),
    editProfile() {
        this.showModal('edit profile', {...this.user, password: false})
    },
    async save(v, { password }) {
        const user = await this.updateUser({ ...this.user, ...v })
        return password ? this.updatePassword({ user, password }) : user
    },
    showModal(title, value) {        
    this.$modal.show(Editor, { title, value, save: this.save }, { height: 'auto' })
    },
    t(name, value) {
        return this.$t(`${name}.${value}`)
    }
}
}
</script>

<style>

</style>
