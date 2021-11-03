<template>
  <div class="row vidacha  pt-3">
    <div  class="col-8">
      <div class="row mb-3" >
        <klient ref="klient" class="col" v-model="klient" :disabled="!!klient" :clearable="true"/>
        <div class="vidacha__bilet col">
          <draggable v-if="target" class="target" group="bilet"/>
          <bilet ref="bilet" class="row"
          :err="err" 
          v-model="biletModel"
          @reset="bilet = {}"
          @change-number="(number) => bilet = Object.assign({}, bilet, { number })"/>
          <div class="vidacha__actions" :style="{ position: 'relative' }">
            <button class="btn btn-primary" :disabled="loading || disabled"
              @click="onSave">
            <b-spinner v-if="loading" class="absolute-center"/>
              {{ t('btn', 'save') }}
            </button>
          </div>
        </div>                                 
      </div>        
      <obespechenie ref="obespechenie" v-model="obespechenie" @change="onChange"/>
    </div>
    <kassa ref="kassa" class="col-4" @start="() => target = true" @end="onEnd"/>
  </div>
</template>

<script>
import { Bilet, draggable, mix } from './components'
import { summ, toNumber } from '@/functions'
export default {
components: { Bilet, draggable },
mixins: [ mix ],
data() {
  return {
    loading: false,
    target: false,
    bilet: {}
  }
},
computed: {
  biletModel: {
    get() {
      return this.bilet
    },
    set(v) {
      this.bilet = v
    }
  },
  obespechenie: {
    get({ bilet }) {
      const { obespechenie = [] } = bilet || {}
      return obespechenie.length ? obespechenie : [{}]
    },
    set(obespechenie) {
      this.bilet = {...this.bilet, obespechenie }
    }
  },
  klient: {
    get({ bilet }) {
      return bilet.klient
    },
    set(klient) {
      this.bilet = {...this.bilet, klient }
    }
  },
  model({ klient }) {
    const obespechenie = this.obespechenie.filter(v => toNumber(v.ocenca))
    return { ...this.$refs['bilet'].model, klient, obespechenie }
  },
  ocenca({ obespechenie }) {
    const ocenca = obespechenie.map(v => v.ocenca)
    return summ(...ocenca.map(toNumber))
  },
  err({ bilet, klient, ocenca }) {
    return { 
      ocenca: !(toNumber(ocenca) > 0),
      klient: !klient,
      ocenca_over: toNumber(bilet.ocenca) > toNumber(ocenca)
    }
  },
  disabled({ bilet, err }) {
    const excludes = v => !['ocenca_over'].includes(v)
    return !!bilet._id || Object.keys(err).filter(excludes).some(v => err[v])
  }
},
methods: {
  onEnd([{ toElement }, v]) {
    const { number, _id } = {}
    if (toElement.className === 'target') this.bilet = {...v, number, _id }
    this.$nextTick(() => this.target = false)
  },
  onChange({name, value}) {
    if (this.target) return
    this.bilet = { ...this.bilet, [name]: value }
  },
  async onSave() {
    this.loading = true
    this.bilet = await this.saveBilet(this.model)
    this.loading = false
  }
}
}
</script>

<style scoped>
.vidacha{
  overflow: auto;
  height: 100%;
}
.vidacha >>> .target {
  height: 200px;
  position: absolute;
  z-index: 1000;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.14);
}
.vidacha__bilet {
  position: relative;
}
.vidacha__actions {
  position: absolute !important;
  right: 10px;
  bottom: -5px;
}
</style>

