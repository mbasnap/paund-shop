<template>  
  <ul class="kassa-list small p-0 m-0">
    <li v-for="index in rows" :key="index"
    @contextmenu.prevent="open($event, model[index -1][0])"
    @mouseleave="({ toElement }) => close(toElement)">{{getSumm(index-1)}}</li>
  </ul>
</template>

<script>
import { summ } from '@/functions'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { rows: Number, value: Array },
  inject: ['open', 'close'],
  computed: {
    // ...mapGetters(['settings']),
    model({ value }) {
      // const arr = value.reduce((cur, v) =>
      //   cur.set(v._id, [ ...cur.get(v._id) || [], v]), new Map())          
      return value
    }
  },
  methods: {
    getSumm(index) {
      const item = this.model[index]
      return item ? summ( ...item[1].map(v => v.summ)) : ''
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







