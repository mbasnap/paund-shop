<template>
  <b-card class=""
          header="OK start"
          header-bg-variant="secondary"
          header-tag="header"
          footer="OK end"
          footer-bg-variant="secondary"
          footer-tag="footer"

  >
<div class="row ">
    <!-- <div class="col "></div> -->
    <kassa-list class="col "></kassa-list>
    <kassa-list class="col"></kassa-list>
    <!-- <div class="col "></div> -->
</div>

    
  </b-card>
</template>
<script>
import {List} from '@/components/List'
export default {
    components: {
        KassaList: List
        },
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

