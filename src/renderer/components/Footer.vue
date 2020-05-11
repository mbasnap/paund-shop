<template>
  <div class="footer">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#" @click="reload"
      >PShop-<span class="version">{{ version }}</span></b-navbar-brand>
      <button class="btn" @click="update">update</button>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
const { shell } = require('electron')
export default {
  computed: {
     ...mapGetters(['company', 'version'])
  },
  methods: {
    ...mapActions(['reload']),
    update() {
      shell.openExternal('https://yadi.sk/d/aO9fvQ4hGGwP_w')
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
  .version{
    font-size: 14px;
    font-style: italic;
    line-height: 10px;
  }
</style>


