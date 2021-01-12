<template>
  <div class="sklad-item" >
    <b-card no-body class="mb-1" v-for="(item, key) in items" :key="key">
      <b-card-header class="p-1" >
        <draggable :value="[]" :group="{ name: 'sklad', pull: false }"
        @start="onStart"  @end="onEnd([$event, item])"
        :sort="false" >
            <context  v-b-toggle="`${name}${key}`"
            @action="(key) => actions[key](item)"
            @statment="addStatment(item)">
              <div class=" row m-0" :class="{ danger: !!item.deleted }">
                <div class="col-1 p-0">{{ item.number }}</div>
                <div class="col-2 p-0" style="text-align: right;">{{ getDate(item) }}</div>
                <div v-if="name === 'list-to'"
                class="statment pl-2 d-flex justify-content-center align-items-center">
                  <b-spinner v-if="loading === item._id" small></b-spinner>
                  <select v-else-if="item.statment"
                  :value="item.statment.days"
                  @change="({ target }) => addStatment(item, target.value)">
                  <option v-for="(v, i) in statmentOptions" :key="i">{{ v }}</option>
                  </select>                  
                </div>
                <div class="col">{{ tostring(item) }}</div>
                <div class="col" style="text-align: right;">{{ item.ocenca }}</div>
              </div>
            </context>
        </draggable>
      </b-card-header>
      <b-collapse :id="`${name}${key}`"  accordion="my-accordion">
        <div class="item row m-0" v-for="(i, index) in item.obespechenie" :key="index"
        style="font-size: 14px; text-align: right;">
          <div class="col-6 p-0 ellipsis" >{{i.title}}</div>
          <div v-if="item.type !== 'things'" class="col-3 p-0" style=" text-align: right;">
            <span class="mr-1">{{ i.proba }}</span>
            <span>{{ i.total }}</span>
          </div>
          <div class="col p-0">{{i.ocenca}}</div>
        </div>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import Context from '@/components/Context.vue'
import { moment, firstChar } from '@/functions'
export default {
  props: ['value'],
  components: { draggable, Context },
  inject: ['onStart', 'onEnd', 'name', 'actions'],
  data() {
      return {
        loading: false
      }
  },
  computed: {
    ...mapGetters({
      map: 'reestr/map',
      klient: 'klient/map',
      company: 'company', 
      date: 'date' 
    }),
    items({ value = [], klient: map }) {
      return value.map(v => {
        const { _id } = v.klient
        const klient = _id ? v.klient : map[v.klient]
        return {...v, klient }
      })
    },
    statmentOptions({ company }) {
      const { statment = '' } = company || {}
      return [0, ...statment.split(',').filter(v => v > 0).map(v => Number(v))]
    }
  },
  methods: {
    ...mapActions ({
      save: 'reestr/save'
    }),
    getDate({ date }) {
      return moment(date).format('L')
    },
    tostring({ klient }) {
      const { family, name, sername } = { ...klient}
      return `${family} ${firstChar(name)}. ${firstChar(sername)}.` 
    },
    async addStatment({ _id }, days = 10) {
      this.loading = _id
      const statment = Number(days) && { date: this.date, days }
      await this.save({...this.map[_id], statment })
      this.loading = false
    },
  }
}
</script>

<style scoped>

.sklad-item {
  height: 100%;
}
.sklad-item >>> .context {
  outline: none !important;
}
.sklad-item .danger {
  color: brown;
}
.sklad-item >>> header {
  text-align: left;
  cursor: pointer;
}
.sklad-item .ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.sklad-item >>> .item:hover {
  background-color:  rgba(0, 0, 0, 0.17);
}
.statment >>> select, option {
  outline: none;
    background: #ffffff00;
    border: none;
}
</style>