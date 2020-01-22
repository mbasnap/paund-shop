<template>  
  <ul class="kassa-list small p-0 m-0">
    <li v-for="index in rows" :key="index-1"
    :selected="isSelected(...value[index-1])"
    @contextmenu.prevent="context($event, ...value[index-1])"
    @mouseleave="({ toElement }) => close(toElement)"
    @click="select(...value[index-1])"
    >{{ summ(...value[index-1]) }}</li>
  </ul>
</template>

<script>
import { summ } from '@/functions'
import { mapGetters, mapActions } from 'vuex'
export default {
  props: { value: Array, selected: String, type: String, rows: Number },
  inject: ['open', 'close', 'select' ],
  computed: { },
  methods: {
    isSelected(id) {
      return !!id && id === this.selected
    },
    summ(_id, values) {
      return _id ? summ( ...values.map(v => v.summ)) : ''
    },
    context(e, _id, values) {
      this.select(_id, values)
      this.open(e, { _id, values, type: this.type })
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
.kassa-list li[selected] {
  background-color: rgba(128, 128, 128, 0.11);
}
</style>







