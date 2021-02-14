<template>
<b-overlay :show="loading" :opacity="0.3" style="height: 100%">
  <div class="sklad row pt-3 pb-3">
    <list-to class="col p-0" :value="listTo" name="list-to"
    :filters="['all', 'overdate', 'gold', 'things']"
    @end="onEndTo" @start="target = 'from'" :target="target === 'to'"
    :actions="{ toSklad, statment: () => {} }">
      <b-form-input placeholder="Поиск" type="search" v-model="searchModel"/>
    </list-to>
    <div style="width: 10px;"></div>
    <list-to class="col p-0" :value="listFrom"  name="list-from"
    :filters="['all', 'gold', 'things']"
    @end="onEndFrom" @start="target = 'to'" :target="target === 'from'"
    :actions="{ fromSklad }">
      <div class="row p-2 form-check" style="text-align: left; height: 40px;">
        <div class="col"> На складе </div>
      </div> 
    </list-to>
  </div>
</b-overlay>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { moment, toSearchString } from '@/functions'
import ListTo from "./components/ListTo"
export default {
  components: { ListTo },
  data() {
    return {
      target: false,
      loading: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters({
      map: 'reestr/map',
      empty: 'reestr/empty',
      dt200: 'reestr/dt200',
      klients: 'klient/map',
    }),
    listTo({ empty, map }) {
      return Object.values(empty)
        .map(v => ({...map[v._id]}))
          .filter(this.searchFilter)
    },
    listFrom({ dt200, map }) {
      return dt200.map(v => ({...map[v._id]}))
        .map(v => ({ ...map[v.ref], ...v }))
    },
    searchModel: {
      get() {
        return this.search
      },
      set(v = '') {
        this.search = v
      }
    }
  },
  methods: {
    ...mapActions({
      save: 'reestr/save'
    }),
    async update(v) {
      this.loading = true
      await this.save(v)
      this.loading = false
    },
      toSklad({ _id: ref, klient = {}, ocenca }) {
      const values = { ref, klient: klient._id, values: [
        { dt: '200', ct: '377', summ: ocenca }
      ]}
      this.update(values)
    },
    fromSklad (v) {
      this.update({ ...v, _deleted: true })
    },
    onEndTo([target, v]) {
      if (target) this.toSklad(v)
      this.target = false
    },
    onEndFrom([target, v]) {
      if (target) this.fromSklad(v)
      this.target = false
    },
    searchFilter({ klient, ssuda, date }) {
      const { family, name, sername } = this.klients[klient]
      const str = [family, name, sername, ssuda, moment(date).format('L')]
        .map(toSearchString).reduce((cur, v) => cur + v, '')
      return !this.search || str.includes(toSearchString(this.search))
    }
  }
}
</script>
<style scoped>
  .sklad {
    height: 100%;
  }
</style>
