<template>  
<ul class="kassa-list small list-group">
  <li class="list-group-item" v-for="(index) in rows" :key="index" >{{format(data[index-1])}}</li>
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
    format(value) {
      return value ? this.$numberFormat(value, 2, ',', ' ') : ''
    }   
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







