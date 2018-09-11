<template>
  <b-card class="h-100"
          header="Card Header"
          header-tag="header"
          footer="Card Footer"
          footer-tag="footer"
          body-class="row  pt-0  pb-0 "
  >

    <kassa-list class="col mr-2" :rowCount="rowCount" :data="debet"></kassa-list>
    <kassa-list class="col" :rowCount="rowCount" :data="kredit"></kassa-list>

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

