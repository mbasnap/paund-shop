<template>  
  <ul class="kassa-list small p-0 m-0">
    <li v-for="index in rows" :key="index-1"
    @contextmenu.prevent="context($event, model[index-1] || [])"
    @mouseleave="({ toElement }) => close(toElement)">{{summ(model[index-1])}}</li>
  </ul>
</template>

<script>
import { summ } from '@/functions'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { rows: Number, value: Array, type: String },
  inject: ['open', 'close'],
  computed: {
    model({ value }) {      
      return value
    }
  },
  methods: {
    summ(v) {
      return v ? summ( ...v[1].map(v => v.summ)) : ''
    },
    context(e, [_id, values]) {
      this.open(e, { _id, values, type: this.type } )
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







