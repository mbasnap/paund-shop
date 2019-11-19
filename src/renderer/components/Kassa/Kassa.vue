<template>
  <b-card class="kassa"
          :header="formated(ok)"
          header-tag="header"
          :footer="formated(ok_end)"
          footer-tag="footer"
          body-class="scroll-auto"

  >
<div class="row ">
    <kassa-list class="col" :data="kassa.dt" :rows="rowsLength"/>
    <kassa-list class="col" :data="kassa.ct" :rows="rowsLength"/>

</div>

    
  </b-card>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import KassaList from './KassaList.vue'
export default {
    components: {KassaList},
    created() {
        // console.log(this.data)
    },
    data () {
        return{}
    },
    computed: {
        ...mapGetters('kassa', ['rowsLength', 'ok', 'debet', 'kredit', 'ok_end']),
        ...mapGetters('reestr', ['kassa']),
        
    },
    methods: {
        formated(number) {
            return this.$numberFormat(number, 2, ',', ' ')
        }
    }
}
</script>

<style>
.kassa {
    padding: 0px;
    border: 1px solid rgba(0, 0, 0, 0.3);
}
.kassa .card-body{
    flex: unset;
    padding: 0;
}
.scroll-auto {
    overflow: auto;
    overflow-x:hidden;
    padding-top: 0 !important;
}
.card-header, .card-footer {
    background-color: #eef1f3;
    text-align: right;
    /* height: 50px;
     padding: 0; */
}
</style>


