<template>
  <div class="user">
    <b-dropdown right variant="outline pr-0">
      <template #button-content>
        <b-avatar :src="avatar"></b-avatar>
      </template>
      <b-dropdown-item-button @click="edit(user)">
         <b-icon icon="person-circle" :aria-hidden="true"/>
         {{ t('tabs', 'profile') }}        
      </b-dropdown-item-button>
      <b-dropdown-item-button 
      v-show="isAdmin"
      v-for="({ key }, i) in companys" :key="i"
      @click="setCompany(key)">
      <b-icon icon="shield-lock" :aria-hidden="true" variant=""/>
         {{ key }}       
      </b-dropdown-item-button>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item-button @click="logOut()">
         <b-icon icon="arrow-left-square" :aria-hidden="true" variant="danger"/>
         {{ t('tabs', 'logout') }}
      </b-dropdown-item-button>
    </b-dropdown>
    <edit-dialog ref="edit-dialog" :loading="loading" :value="user"/>
  </div>
</template>

<script>
import { local } from '@/functions/db'
import { mapGetters, mapActions } from 'vuex'
import EditDialog from './EditDialog'
export default {
  components: { EditDialog },
  props: ['user'],
  data: () => ({
    companys: [],
    loading: false
  }),
  async created() {
    const { rows } = await local('companys').allDocs()
    this.companys = rows.filter(v => v.key !== localStorage.getItem('lombard'))
  },
  computed: {
    ...mapGetters(['isAdmin']),
    avatar() {
      const {avatar} = this.user.main || {}
      return avatar && avatar.target.value
    }
  },
  methods: {
    ...mapActions(['logOut', 'updateUser', 'updatePassword', 'reload']),

    async edit(user) {
      const { show, close } = this.$refs['edit-dialog']
      const { main, passport, address, password } = await show(user)
      try {
        this.loading = true
        await this.updateUser({...user, main, passport, address })
        if (password) this.updatePassword({user, password})
        close()
      } catch({message}) {
        console.error(message)
      } finally {
        this.loading = false
      }
      
    },
    showModal(title, value) {        
      this.$modal.show(Editor, { title, value, save: this.save }, { height: 'auto' })
    },
    setCompany(lombard) {
      localStorage.setItem('lombard', lombard)
      this.reload()
    },
    t(name, value) {
      return this.$t(`${name}.${value}`)
    }
  }
}
</script>

<style >
.user  .dropdown-toggle::after {
  color: white !important;
}
  /* .pointer {
    cursor: pointer;
  }
  .danger {
    color: brown;
  } */
</style>
