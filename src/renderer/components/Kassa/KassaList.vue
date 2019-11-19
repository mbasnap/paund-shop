<template>  
<ul class="kassa-list small p-0 m-0 ">
  <li  v-for="index in rows" :key="index"
    @contextmenu.prevent="open($event, data[index -1])"
    @mouseleave="({toElement}) => close(toElement)"  
  >{{getSumm(index-1)}}</li>
</ul>
</template>

<script>
export default {
  props: { rows: Number, data: Array },
  inject: ['open', 'close'],
  computed: { },
  methods: {
    getSumm(index) {
      const item = this.data[index]
      return item ? this.$numberFormat(item.summ, 2, ',', ' ') : ''
    },
    // format(value) {
    //   return value ? this.$numberFormat(value, 2, ',', ' ') : ''
    // }   
  }
}
</script>
<style>
.kassa-list {
  /* padding: 0; */
}
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







