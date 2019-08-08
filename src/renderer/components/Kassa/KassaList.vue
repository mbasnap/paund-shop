<template>  
<ul class="kassa-list small list-group">
  <li class="list-group-item" v-for="index in rows" :key="index" >{{getSumm(index-1)}}</li>
</ul>
</template>

<script>
export default {
  props: {
    rows: Number,
    data: Array
  },
  computed: {

  },
  methods: {
    getSumm(index) {
      const item = this.data[index]
      // console.log(item)
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
  padding: 0;
}
.kassa-list li {
  padding: 0;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;
}
</style>







