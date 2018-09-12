<template>
  <b-card class="h-100"
          header="OK start"
          header-bg-variant="secondary"
          header-tag="header"
          footer="OK end"
          footer-bg-variant="secondary"
          footer-tag="footer"
          body-class="row  pt-0  bg-secondary pb-0 "
  >

    <kassa-list class="col bg-light mr-2" :rowCount="rowCount" :data="debet">Debet</kassa-list>
    <kassa-list class="col bg-light" :rowCount="rowCount" :data="kredit">Kredit</kassa-list>

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

