<template>
  <div class="klient">
    <div class="form-row mb-2">
      <suggest ref="klients" class="form-control col" name="family"
      :placeholder="t('family')" :format="toTitleCase"
      :validate="validate"
      :suggest="(v) => getFio(v)"
      v-model="model" :options="options" @select="select" @enter="focus('name')">
        <svg-row-down v-show="!model._id && !disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
      </suggest>
      <div v-if="clearable" class="col" style="max-width: 30px">
        <svg-reset  @click="clear" width="8px"/>
      </div>
    </div>
    <div class="form-row mb-2">
      <named-input ref="name" class="form-control col-5 mr-1" name="name" :placeholder="t('name')"
      v-model="model" :format="toTitleCase" @enter="focus('sername')"/>
      <named-input ref="sername" class="form-control col" name="sername" :placeholder="t('sername')"
      :format="toTitleCase" v-model="model" @enter="focus('city')"/>
    </div>
    <div class="form-row mb-2">
      <named-input ref="city" class="form-control col mr-1" name="city" :placeholder="t('city')"
      v-model="model" @enter="focus('bithday')"/>
      <named-input 
      ref="bithday"
      :class="['form-control col-4', { 'is-invalid': err.bithday }]" 
      name="bithday"
      v-model="model" :placeholder="t('bithday')" :format="dateFormat" @enter="focus('seria')"/>
    </div>
    <div class="form-row mb-2">
      <named-input ref="seria" class="form-control col-3" :placeholder="t('seria')" name="seria"
      :format="v => (v || '').toUpperCase()" v-model="passport" @enter="focus('passport')"/>
      <div class="col pr-0">
        <suggest ref="passport" class="form-control col" name="number" :placeholder="t('number-passport')"
        :suggest="({ passport = {} }) => `${passport.seria} ${passport.number}`"
        v-model="passport" :options="passports" @select="select" @enter="focus('idn')">
          <svg-row-down v-show="passports.length > 0" class="reset"
          @click="$refs['passport'].highlight(0, true)"/>
        </suggest>
      </div>
    </div>
    <div class="form-row">
    <named-input ref="idn" class="form-control col" name="idn"
    :placeholder="t('idn')" v-model="passport"/>
    <b-button size="sm" class="ml-2"
    :disabled="!valid && !danger(model)"
    @click="edit(model)"
    width="30px"
    style="max-width: 43px"
    :variant="variant">
      <b-spinner v-if="load" small></b-spinner>
      <b-icon v-else icon="person-circle" aria-hidden="true"/>
    </b-button>
    </div>
    <edit-dialog ref="edit-dialog"
    :title="getFio(model)" 
    @add="() => addKlient(model)" 
    @remove="() => removeKlient(model)"
    />
    <remove-dialog 
    ref="remove-dialog"
    :value="getFio(model)" 
    />
  </div>
</template>

<script>
import mix from '@/widgets/named-input/mix.js'
import { mapGetters, mapActions } from 'vuex'
import EditDialog from './editor/EditDialog'
import RemoveDialog from './editor/RemoveDialog'
import { SvgRowDown, SvgReset, SvgExclamation, SvgAddressCard } from '@/svg'
import { toTitleCase, dateFormat, isDateValid } from '@/functions'
export default {
  mixins: [ mix ],
  components: { SvgRowDown, SvgReset, SvgExclamation, SvgAddressCard, EditDialog, RemoveDialog },
  props: ['value', 'clearable', 'disabled' ],
  provide() {
    return { change: this.change }
  },
  data() {
    return {
      load: false,
      data: {},
    }
  },
  computed: {
    ...mapGetters('klient', ['map', 'docs']),
    variant({ readonly, valid, model }) {
      const danger = this.danger(model)
      if (readonly && !valid && !danger) return 'outline'
      if (danger) return 'outline-danger'
      if (valid && this.warning(model)) return 'outline-warning'
      return 'outline-success'
    },
    group({ docs }) {
      return docs
        .reduce((cur, v = {}, index) => {
          const { passport, deleted } = v
          const { seria, number } = v.passport || {}
          const danger = [!passport, deleted, !seria, !number].some(v => v)
          const id =  this.getKey(v, danger ? index + '' : undefined)
          return {...cur, [id]: [...(cur[id] || []), v] }
        }, {})
    },
    options({ model, group }) {
      return Object.keys(group).sort()
        .filter(key => key.includes((model.family || '').toLowerCase()))
          .map(key => group[key][0])
    },
    passports({ group, model }) {
      const passports = group[this.getKey(model)] || []
      return passports.filter(v => v._id !== model._id)
    },
    model: {
      get({ value: id, data }) {
        return {...this.map[id], ...data }
      },
      set({ name, value }) {
        this.data = {...this.data, [name]: value }
        if (name === 'family')  this.$refs['klients'].highlight(0)
      }
    },
    passport: {
      get({ model = {} }) {
        const { nationality = this.t('nationality') } = model.passport || {}
        return {...model.passport, nationality }
      },
      set({ name, value }) {
        const passport = { ...this.passport, [name]: value }
        this.data = {...this.data, passport }
      }
    },
    passportsMap({ model, docs }) {
      return docs.filter(v => !v.deleted && v._id !== model._id)
        .reduce((cur, v) => ({...cur, [this.passportId(v.passport)]: v }), {})
    },
    err({ model }) {
      return {
        bithday: model.bithday && !isDateValid(model.bithday)
      }
    },
    valid() {
      if (['family', 'name'].some(v => !this.model[v])) return false
      if (['seria', 'number'].some(v => !this.passport[v])) return false
      return true
    },

  },
  methods: { 
    toTitleCase, dateFormat,
    ...mapActions('klient', ['save', 'remove']),
    success(v) {
      return v._id && !this.warning(v)
    },
    danger({ _id, family, name, passport, deleted }) {
      if (deleted) return true
      return _id && [family, name, passport.seria, passport.number].some(v => !v)
    },
    warning({ passport, address = {}, bithday }) {
      return !bithday ||
        ['issued', 'date-issue', 'idn'].some(v => !passport[v]) ||
        ['city', 'home'].some(v => !address[v])
    },
    validate(v) {
      return ['danger', 'warning'].filter(method => this[method](v))[0]
    },
    focus(name) {
      if (name) this.$refs[name].focus()
    },
    getKey({ family, name, sername }, uid) {
      return [family, name, sername, uid]
        .map((v = '') => v.trim())
          .join('').toLowerCase()
    },
    readonly() {
      return  this.disabled
    },
    passportId({ seria, number } = {}) {
      return ('' + seria + number).toLowerCase()
    },
    getFio({ family, name, sername = '' } = {}) {
      const noValidName = [family, name].some(v => !v) && 'Не валидное Фамилия Имя'
      return noValidName || `${family} ${name} ${sername}`
    },
    async edit() {
      const klient = !this.model._id && await this.saveKlient(this.model)
      this.$refs['edit-dialog'].show(klient || this.model)
    },
    select(klient) {
      this.data = {}
      this.$emit('input', klient._id)
      this.load = false
      return klient
    },
    clear() {
      this.data = {}
      this.$refs['klients'].highlight(-1)
      this.$emit('input', '')
      this.load = false
    },
    async saveKlient(model) {
      this.load = true
      const klient = await this.save(model)
      return this.select(klient)
    },
    async removeKlient({ _id }) {
      const deleted = await this.$refs['remove-dialog'].show()
      await this.remove({ _id, deleted })
      for (const key of ['edit-dialog', 'remove-dialog']) this.$refs[key].close()
      this.clear()
    },
    t(v) {
      return this.$t(`klient.${v}`)
    },
    async addKlient(model) {
      const { _id, _rev } = {}
      const { idn, nationality } = model.passport
      const passport = { idn, nationality }
      const klient = await this.saveKlient({...model, _id, _rev, passport })
      this.$refs['edit-dialog'].show(klient)
    }
  }
}
</script>

<style scoped>
.klient >>> input[name='bithday']{
  text-align: center;
}
.klient >>> input[name='bithday']::placeholder {
  font-size: 14px;
}
.klient >>> .btn-outline-warning:hover {
  color: #fff !important;
}
.klient >>> .btn-outline-warning:active {
  color: #fff !important;
}
.klient >>> .warning {
  color: #ff7707e3;
}
.klient >>> .danger {
  color: brown;
}

</style>
