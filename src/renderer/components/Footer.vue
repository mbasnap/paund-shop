<template>
  <div class="footer">
    <b-navbar class="footer__navbar" type="dark" variant="info">
      <b-col>
        <brand-version v-if="company && company.name"/>
      </b-col>
      <b-col v-show="isOutdate" id="enabled-version" class="text-right">
        <b-icon icon="info-circle" variant="light"></b-icon>
        <b-link href="#foo" 
        style="color: white;"
        @click="update"
        >Доступно обновление v-{{ program.version}}</b-link>
      </b-col>
      <b-tooltip
      variant="light"
      target="enabled-version"
      >{{program.description}}</b-tooltip>
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


