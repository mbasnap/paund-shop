<template>
  <div class="footer">
    <b-navbar class="footer__navbar" type="dark" variant="info">
      <brand-version v-if="company && company.name">
        <button v-show="isOutdate" class="btn" @click="update">update</button>
      </brand-version>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BrandVersion from './BpandVersion'
const { shell } = require('electron')
export default {
  components: { BrandVersion },
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
    update() {
      shell.openExternal(this.program.link)
    }
  }
}
</script>

<style scoped>
  .footer{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .footer__navbar {
    height: 60px;
  }

</style>


