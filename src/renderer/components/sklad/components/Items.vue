<template>
    <!-- <component class="item" :is="teg">
        <li v-for="(item, key) in items" :key="key"
        @contextmenu.prevent="open($event, item)"
        @mouseleave="({ toElement }) => close(toElement)"  
        >{{ tostring(item) }}</li>
    </component> -->
  <div class="sklad-item" role="tablist">
    <b-card no-body class="mb-1" v-for="(item, key) in items" :key="key"
    @contextmenu.prevent="open($event, item)"
    @mouseleave="({ toElement }) => close(toElement)" >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <div block class="row m-0" href="#" v-b-toggle="name + key + ''" variant="info">
            <div class="col-2 pr-0">{{ item.number }}</div>
            <div class="col-3 p-0">{{ date(item) }}</div>
            <div class="col p-0">{{ tostring(item) }}</div>
            <div class="col p-0" style="text-align: right;">{{ item.ocenca }}</div>
        </div>
      </b-card-header>
      <b-collapse :id="name + key + ''"  accordion="my-accordion" role="tabpanel">
        <div class="item row m-0" v-for="(i, index) in item.obespechenie" :key="index"
        style="text-align: left;">
          <div class="col-1">{{index + 1}}</div>
          <div class="col">{{i.title}}</div>
          <div class="col p-0" style="font-size: 12px; text-align: right;">
              <div v-show="typeGold(item)" class="row">
                <div class="col">{{i.proba}}</div>
                <div class="col">{{i.total}}</div>
              </div>
          </div>
          <div class="col p-0" style="text-align: right;">{{i.ocenca}}</div>

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
        ddd: 'ddd',
          selected: 0
      }
  },
  computed: {
    items({ value }) {
      return value || []
    }
  },
  methods: {
    typeGold({ type }) {
      return true
    },
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
.sklad-item header {
  text-align: left;
  cursor: pointer;
}
/* .sklad-item header:hover {
  background-color:  rgba(0, 0, 0, 0.17);
} */
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