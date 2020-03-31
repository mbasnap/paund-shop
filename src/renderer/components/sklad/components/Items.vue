<template>
  <div class="sklad-item" role="tablist">
    <b-card no-body class="mb-1" v-for="(item, key) in items" :key="key"
    @contextmenu.prevent="open($event, item)"
    @mouseleave="({ toElement }) => close(toElement)" >
      <b-card-header header-tag="header" :class="['p-1', { danger: !!item.deleted }]" role="tab">
        <div block class="row m-0" href="#" v-b-toggle="name + key + ''" variant="info"
        style="font-size: 14px;">
            <div class="col-2 p-0">{{ item.number }}</div>
            <div class="col-3 pr-0 " >{{ date(item) }}</div>
            <div class="col-5 p-0">{{ tostring(item) }}</div>
            <div class="col p-0" style="text-align: right;">{{ item.ocenca }}</div>
        </div>
      </b-card-header>
      <b-collapse :id="name + key + ''"  accordion="my-accordion" role="tabpanel">
        <div class="item row m-0" v-for="(i, index) in item.obespechenie" :key="index"
        style="font-size: 12px; text-align: left;">
          <div style="width: 15px;">{{index + 1}}</div>
          <div class="col-6 pl-0 ellipsis" >{{i.title}}</div>
          <div v-if="item.type !== 'things'" class="col-3 p-0" style=" text-align: right;">
              <div class="row">
                <div class="col p-0" style="max-width: 20px;">{{ i.proba }}</div>
                <div class="col-5 p-0" >{{ i.price }}</div>
                <div class="col p-0" style="max-width: 30px;">{{ i.total }}</div>
              </div>
          </div>
          <div class="col-2 p-0" style="text-align: right;">{{i.ocenca}}</div>

        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { moment, firstChar } from '@/functions'
export default {
props: { name: String, value: Array },
  inject: ['open', 'close'],
  data() {
      return {
          selected: 0
      }
  },
  computed: {
    items({ value }) {
      return value || []
    }
  },
  methods: {
    date({ date }) {
      return moment(date).format('L')
    },
    tostring({ klient }) {
      const { family, name, sername } = { ...klient}
      return `${family} ${firstChar(name)}. ${firstChar(sername)}.` 
    }
  }
}
</script>

<style>
.card-header.danger {
  color: brown;
}
.sklad-item header {
  text-align: left;
  cursor: pointer;
}
.sklad-item .ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sklad-item .item:hover {
  background-color:  rgba(0, 0, 0, 0.17);
}
.item li {
    display: block;
    padding: 0;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-top: none;
}
</style>