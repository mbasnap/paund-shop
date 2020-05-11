<template>
  <div class="footer">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#" @click="reload"
      >PShop<span class="version">-{{ version }}</span></b-navbar-brand>
      <button v-show="isOutdate" class="btn" @click="update">update</button>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const { shell } = require('electron')
export default {
  computed: {
     ...mapGetters(['company', 'version']),
     program({ company }) {
       return {...company.program }
     },
     isOutdate({ program, version }){
       return !!program.version && Number(program.version) > Number(version)
     }
  },
  methods: {
    ...mapActions(['reload']),
    update() {
      shell.openExternal(this.program.link)
    }
  }
}
</script>

<style  scoped>
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

</style>


