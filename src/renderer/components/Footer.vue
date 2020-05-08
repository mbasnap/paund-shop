<template>
  <div class="footer">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">{{company.logo}}</b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
     ...mapGetters(['company'])
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


