<template>
  <div class="vozvrat row flex-fill  pt-3">
    <div class="col-8">
      <div class="row mb-3">
        <klient ref="klient" class="col" v-model="klient" :disabled="true"/>
        <div class="vozvrat__bilet col">
          <bilet-number 
            v-model="bilet"
            :disabled="!!bilet._id" 
            :options="numbers"
            :suggest="(v) => suggest(v)"
            :filter="(v) => search(v)"
            @reset="bilet = {}"/>
          <div  class="row m-0" style="line-height: 15px;">                        
            <div v-if="bilet._id" style="width: 100%;">
              <bilet  ref="bilet"  v-model="bilet" :disabled="disabled"/>
            </div>
          </div>
          <div class="vozvrat__actions" :style="{ position: 'relative' }">
            <b-spinner v-if="loading" class="absolute-center"/>
            <b-dropdown 
            split
            variant="primary" 
            :disabled="loading || disabled"
            @click="onSave"
            :text="t('btn','save')">
              <b-dropdown-item href="#" @click="showPerezalog">
                {{ t('btn','perezalog') }}
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>                                 
      </div>        
      <obespechenie :value="bilet.obespechenie || [{}]" :disabled="true"/>
    </div>
    <kassa ref="kassa" class="col-4"></kassa>
    <perezalog ref="perezalog" :value="bilet">

    </perezalog>
  </div>
</template>
<script>
import BiletNumber from '@/components/Number'
import { mapGetters } from 'vuex'
import { Bilet, Perezalog, mix } from './components'
import { moment, shortFio, toSearchString } from '@/functions'
export default {
components: { BiletNumber, Bilet, Perezalog },
mixins: [ mix ],
data() {
  return {
    loading: false,
    biletId: '',
    klientId: '',
    number: ''
  }
},
computed: {
  ...mapGetters('klient', ['map']),
  numbers({ empty, date, reestrMap }) {   
    return Object.values(empty)
      .filter(v => moment(v.date).isSameOrBefore(date, 'date'))
        .map(v => reestrMap[v._id])
          .filter(({ deleted, number, klient }) => {
            if(deleted) return false
            return !this.number || 
              [number, this.map[klient].family]
                .map(toSearchString)
                  .reduce((cur, v) => cur + v, '')
                    .includes(toSearchString(this.number))
          })
  },
  bilet: {
    get({ biletId, reestrMap, number }) {
      return reestrMap[biletId] || { number }
    },
    set({ number, _id }) {
      this.number = number
      this.biletId = _id
    }
  },
  klient: {
    get({ bilet, klientId }) {
      const { _id } = bilet.klient || {}
        return klientId || _id || bilet.klient
    },
    set(v) {
      this.klientId = v
    }
  },
  model({ klient }) {        
    return { ...this.$refs['bilet'].model, klient }
  },
  statment({ bilet }) {
    return {...bilet.statment}
  },
  disabled({ biletId, used }) {
    return !biletId || !!used[biletId]
  }
},
methods: {
  suggest({ number, klient }) {
    return `${number} ${shortFio(this.map[klient])}`
  },
  async onSave() {
    this.loading = true
    await this.saveBilet(this.model)
    this.loading = false
  },
  async showPerezalog() {
    const { total } = this.$refs['bilet']
    const { show, close } = this.$refs['perezalog']
    const value = await show(total)
    await this.saveBilet(this.model)
    await this.saveBilet({...value, date: this.date, _id: undefined})
    close()
  }
}
}
</script>

<style>
.vozvrat{
  overflow: auto;
  height: 100%;
}
.vozvrat__bilet {
  position: relative;
}
.vozvrat__actions {
  position: absolute !important;
  bottom: -5px;
  right: 10px;
  width: fit-content;
}
.klient .btn.edit {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}
</style>

