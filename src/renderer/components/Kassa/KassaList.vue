<template>  
<ul class="kassa-list small p-0 m-0 ">
  <li  v-for="index in rows" :key="index"
    @contextmenu.prevent="open($event, data[index -1])"
    @mouseleave="({toElement}) => close(toElement)"  
  >{{getSumm(index-1)}}</li>
</ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { rows: Number, data: Array },
  inject: ['open', 'close'],
  computed: {
    ...mapGetters(['settings'])
  },
  methods: {
    getSumm(index) {
      const item = this.data[index]
      return item ? this.format(item.summ) : ''
    },
    format(v) {
      const format = this.settings.numberFormat
      return this.$numberFormat(v, ...format)
    }
  }
}
</script>
<style>

.kassa-list li {
  display: block;
  padding: 0;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.125);
}
</style>







