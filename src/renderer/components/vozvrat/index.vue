<template>
    <div class="vozvrat row flex-fill  pt-3">
        <div class="col-8">
            <div class="row" style="height: 300px">
                <klient ref="klient" class="col" v-model="klient" :disabled="true"/>
                <div class="vozvrat__bilet col">
                    <bilet-number 
                        v-model="bilet"
                        :disabled="!!bilet._id" 
                        :options="numbers"/>
                    <div  class="row m-0" style="line-height: 15px;">                        
                        <div v-if="bilet._id" style="width: 100%;">
                            <bilet  ref="bilet"  v-model="bilet" :disabled="disabled"/>
                            <!-- <svg-calculator width="20px" style="text-align: right;"
                            :disabled="disabled" @click="showModal(bilet)"/> -->
                        </div>
                    </div>
                    <div class="vozvrat__actions">
                        <b-spinner v-if="loading" variant="primary"></b-spinner>
                        <b-dropdown v-else  split variant="primary" :disabled="disabled"
                        :text="t('btn','save')" >
                            <b-dropdown-item href="#" @click="showModal(bilet)">
                            {{ t('btn','perezalog') }}</b-dropdown-item>
                        </b-dropdown>
                        <!-- <button v-else class="btn btn-primary" :disabled="disabled"
                        @click="onSave">{{ t('btn','save') }}
                        </button> -->
                    </div>
                </div>                                 
            </div>        
            <obespechenie :value="bilet.obespechenie || []" :disabled="true"/>
        </div>
        <kassa ref="kassa" class="col-4"></kassa> 
    </div>
</template>
<script>
import BiletNumber from '@/components/Number'
import { Bilet, Editor, mix } from './components'
// import { SvgCalculator } from '@/svg'
import { moment } from '@/functions'
export default {
components: { BiletNumber, Bilet, Editor },
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
    numbers({ empty, date, reestrMap }) {   
      return Object.values(empty)
          .filter(v => moment(v.date).isSameOrBefore(date, 'date'))
            .map(v => reestrMap[v._id])
                .filter(({ deleted, number }) => 
                    !deleted && !this.number || (number + '').includes(this.number + ''))
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
    // select({ _id } = {}) {
    //   this.biletId = _id
    // },

    showModal(value) {
      const title = 'Perezalog'
      const { bilet, model: vozvrat, saveBilet: save } = this
      this.$modal.show(Editor, { title, value: { bilet, vozvrat }, save }, { width: '800px', height: 'auto' })
    },
    async onSave() {
        this.loading = true
        const { _id } = await this.saveBilet(this.model)
        this.loading = false
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
    bottom: 10px;
    right: 10px;
}
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>

