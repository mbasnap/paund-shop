<template>
  <div>
    <b-nav-item-dropdown :text="user.name" right >
      <div class="dropdown-item px-2 pointer" @click="edit">
        <b-icon class="mr-2" icon="person-circle" aria-hidden="true"></b-icon>
        {{ t('tabs', 'profile') }}
      </div>
      <div class="dropdown-item px-2 pointer" @click="logOut()">
        <b-icon class="mr-2"  icon="arrow-left-square" aria-hidden="true" variant="danger"></b-icon>
        <span class="danger">{{ t('tabs', 'logout') }}</span>
      </div>
      
      <b-link v-show="isAdmin" 
      v-for="({ key }, i) in companys" :key="i"
      class="dropdown-item" 
      @click="setCompany(key)">{{ key }}</b-link>
    </b-nav-item-dropdown>
    <!-- <edit-dialog ref="edit-dialog"/> -->
  </div>
</template>

<script>
import { local } from '@/functions/db'
import { mapGetters, mapActions } from 'vuex'
// import EditDialog from './EditDialog'
export default {
  // components: { EditDialog },
  props: ['user'],
  data: () => ({
    companys: []
  }),
  async created() {
    const { rows } = await local('companys').allDocs()
    this.companys = rows.filter(v => v.key !== localStorage.getItem('lombard'))
  },
  computed: {
    ...mapGetters(['isAdmin'])
  },
  methods: {
    ...mapActions(['logOut', 'updateUser', 'updatePassword', 'reload' ]),

    async save(v, { password }) {
      const user = await this.updateUser({ ...this.user, ...v })
      return password ? this.updatePassword({ user, password }) : user
    },
    async edit() {
      // await this.$refs['edit-dialog'].show()
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

<style>
  .pointer {
    cursor: pointer;
  }
  .danger {
    color: brown;
  }
</style>
