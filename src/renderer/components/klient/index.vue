<template>
  <div class="klient">
        <div class="form-row mb-2">
            <suggest ref="klients" class="form-control col" name="family"
            :placeholder="t('family')"
            :suggest="({ family, name, sername }) => `${family} ${name} ${sername}`"       
            v-model="model" :options="options" @select="select">
                <svg-row-down v-show="!model._id && !disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
            </suggest>
            <div v-if="!disabled" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-reset  width="8px;" @click="select()"/>
            </div>  
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-5 mr-1" name="name" :placeholder="t('name')" v-model="model"/>
            <named-input class="form-control col" name="sername" :placeholder="t('sername')" v-model="model"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col mr-1" name="city" :placeholder="t('city')" v-model="model"/>           
            <named-input :class="['form-control col', { 'is-invalid': err.bithday }]" name="bithday"
            v-model="model" :placeholder="t('bithday')"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-3" :placeholder="t('seria')" name="seria" v-model="passport"/>
            <div class="col">
                <div class="row m-0">
                    <suggest ref="passport" class="form-control col" name="number"
                    :placeholder="t('number')"
                    :suggest="({ passport }) => `${passport.seria} ${passport.number}`"
                    v-model="passport" :options="passports" @select="select">
                    <svg-row-down v-show="passports.length > 0" class="reset"
                    @click="$refs['passport'].highlight(0, true)"/>
                    </suggest>          
                    <div v-show="err.klient_exist" id="tooltip-err" class="border-0 form-control col-1">
                        <svg-exclamation  width="8px;" @click="select(err.klient_exist)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-row mb-2">
            <div class="col-2" style="line-height: 35px;">
                <svg-address-card width="30px;" :disabled="!value"
                @click="showModal('edit klient')"/>
            </div>            
            <named-input class="form-control col" name="idn" :placeholder="t('idn')" v-model="passport"/>   
        </div>
        <b-tooltip target="tooltip-err" variant="danger" triggers="hover">
            Klient {{ getFio(err.klient_exist) }} exist
        </b-tooltip>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { Editor, mix } from './editor/index.js'
import { SvgRowDown, SvgReset, SvgExclamation, SvgAddressCard } from '@/svg'
export default {
    mixins: [ mix ],
    components: { SvgRowDown, SvgReset, SvgExclamation, SvgAddressCard },
    props: { value: String, disabled: Boolean },
    provide() {
      return { change: this.change }
    },
    data() {
        return {
            data: {}
        }
    },
    computed: {
      ...mapGetters('klient', ['map', 'docs']),
        group({docs}) {
            return docs.reduce((cur, v) => {
                const id =  this.getKey(v)
                return {...cur, [id]: [...(cur[id] || []), v]}
            }, {})
        },
        options({ model, group }) {
            return Object.keys(group)
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
          get() {
              return {...this.model.passport}
          },
          set({ name, value }) {
              const passport = { ...this.passport, [name]: value }
               this.data = {...this.data, passport }
          }
      },
      passportsMap({ model, docs }) {
          return docs.filter(v => v._id !== model._id)
              .reduce((cur, v) => ({...cur, [this.passportId(v.passport)]: v }), {})
      },
      err({ model, passport }) {
        return {
            klient_exist: this.passportsMap[this.passportId(passport)],
            fio: ['family', 'name', 'sername'].some(v => !model[v]),
            passport: ['seria', 'number'].some(v => !passport[v])
        }
      }
    },
    methods: {
        ...mapActions('klient', ['save']),
        getKey({ family, name, sername }) {
            return [family, name, sername].join('').toLowerCase()
        },
        readonly() {
            return this.disabled
        },
        passportId({ seria, number }) {
            return ('' + seria + number).toLowerCase()
        },
        getFio({ family, name, sername } = {}) {
            return `${family} ${name} ${sername}`
        },
        showModal(title) {        
            this.$modal.show(Editor, { title, value: this.model }, { height: 'auto' })
        },
        select({ _id } = {}) {
            this.data = {}
            this.$emit('input', _id)
        },
        async change() {
            if (!Object.values(this.err).some(v => v))
            this.select(await this.save(this.model))
        },
        t(v) {
            return this.$t(`klient.${v}`)
        }
    }
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>
