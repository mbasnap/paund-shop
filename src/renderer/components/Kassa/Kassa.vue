<template>
  <b-card 
          header="OK start"
          header-bg-variant="secondary"
          header-tag="header"
          footer="OK end"
          footer-bg-variant="secondary"
          footer-tag="footer"

  >
<div class="row ">
    <kassa-list class="col bg-success mr-2">Debet</kassa-list>
    <kassa-list class="col bg-success">Kredit</kassa-list>
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

