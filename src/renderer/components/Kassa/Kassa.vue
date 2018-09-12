<template>
  <b-card class="h-100"
          header="OK start"
          header-bg-variant="secondary"
          header-tag="header"
          footer="OK end"
          footer-bg-variant="secondary"
          footer-tag="footer"

  >
<div class="row ">
    <kassa-list class="col "></kassa-list>
    <kassa-list class="col"></kassa-list>

</div>

    
  </b-card>
</template>
<script>
import KassaList from './KassaList.vue'
export default {
    components: {KassaList},
    data () {
        return{
            ok_start: 0,
            ok_end: 0,
            debet: [],
            kredit: [],
            rowCount: 0
        }
    }
}
</script>

