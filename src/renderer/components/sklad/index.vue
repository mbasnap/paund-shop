<template>
<b-overlay :show="loading" :opacity="0.3" style="height: 100%">
  <div class="sklad row pt-3 pb-3">
    <list-to class="col p-0" :value="listTo" name="list-to"
    :filters="['all', 'overdate', 'gold', 'things']"
    @end="onEndTo" @start="target = 'from'" :target="target === 'to'"
    :actions="{ toSklad, statment: () => {} }">
      <!-- <div class="sklad__header row p-2 form-check" style="text-align: left; height: 40px;">
        <input type="checkbox" class="form-check-input m-0" id="dropdownCheck2"
        :checked="showOver" @change="showOver = !showOver"
        style="position: unset;">
        <label class="form-check-label" for="dropdownCheck2"> Просроченные </label>
      </div> -->
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
import ListTo from "./components/ListTo"
import { Confirm } from '@/widgets'
export default {
    components: { ListTo },
    data() {
      return {
        target: false,
        loading: false
      }
    },
    computed: {
      ...mapGetters({
        map: 'reestr/map',
        empty: 'reestr/empty',
        dt200: 'reestr/dt200',
        
      }),
      listTo({ empty, map, isOver }) {
        return Object.values(empty).map(v => ({...map[v._id]}))
      },
      listFrom({ dt200, map }) {
        return dt200.map(v => ({...map[v._id]}))
            .map(v => ({ ...map[v.ref], ...v }))
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
       toSklad({ _id: ref, klient = {}, ocenca, deleted }) {
        const values = { ref, klient: klient._id, values: [
            { dt: '200', ct: '377', summ: ocenca }
        ]}
        this.update(values)
      },
      fromSklad (v) {
        this.update({ ...v, _deleted: true })
      },
      // async statment({ _id }, days = 10) {
      //   this.loading = _id
      //   const statment = Number(days) && { date: this.date, days }
      //   await this.save({...this.map[_id], statment })
      //   this.loading = false
      // },
      onEndTo([target, v]) {
        if (target) this.toSklad(v)
        this.target = false
      },
      onEndFrom([target, v]) {
        if (target) this.fromSklad(v)
        this.target = false
      }
    }
}
</script>
<style scoped>
  .sklad {
    height: 100%;
  }
</style>
