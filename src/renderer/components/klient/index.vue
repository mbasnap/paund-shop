<template>
  <div class="klient">
        <div class="form-row mb-2">
            <suggest ref="klients" class="form-control col" name="family"
            :placeholder="t('family')" :format="toTitleCase"
            :suggest="({ family, name, sername }) => `${family} ${name} ${sername}`"       
            v-model="model" :options="options" @select="select" @enter="focus('name')">
                <svg-row-down v-show="!model._id && !disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
            </suggest>
            <div v-if="!disabled" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-reset  width="8px;" style="cursor: pointer;" @click="clear"/>
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
            <named-input ref="bithday" :class="['form-control col', { 'is-invalid': err.bithday }]" name="bithday"
            v-model="model" :placeholder="t('bithday')" :format="toDots" @enter="focus('seria')"/>
        </div>
        <div class="form-row mb-2">
            <named-input ref="seria" class="form-control col-3" :placeholder="t('seria')" name="seria"
            :format="v => (v || '').toUpperCase()" v-model="passport" @enter="focus('passport')"/>
            <div class="col">
                <div class="row m-0">
                    <suggest ref="passport" class="form-control col" name="number" :placeholder="t('number')"
                    :suggest="({ passport }) => `${passport.seria} ${passport.number}`"
                    v-model="passport" :options="passports" @select="select" @enter="focus('idn')">
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
        <named-input ref="idn" class="form-control col" name="idn" :placeholder="t('idn')" v-model="passport"
        />   

        <svg-address-card class="col-2 p-0" style="line-height: 35px; text-align: right;" 
        width="35px;" :disabled="!model._id" @click="showModal('edit klient')"/>
        <b-dropdown class="klient-dropdown col-1 p-0 m-0"  variant="link" :disabled="!model._id" >
            <b-dropdown-item href="#" @click="copy"
            >{{ $t('btn.copy') }}</b-dropdown-item>
            <b-dropdown-item href="#" @click="onRemove"
            >{{ $t('btn.remove') }}</b-dropdown-item>
        </b-dropdown>
        </div>
        <b-tooltip target="tooltip-err" variant="danger" triggers="hover">
            Klient {{ getFio(err.klient_exist) }} exist
        </b-tooltip>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { Editor, Confirm, mix } from './editor/index.js'
import { SvgRowDown, SvgReset, SvgExclamation, SvgAddressCard } from '@/svg'
import { toTitleCase, toDots, isDateFormat } from '@/functions'
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
        group({ docs }) {
            return docs.filter(({ deleted }) => !deleted)
            .reduce((cur, v) => {
                const id =  this.getKey(v)
                return {...cur, [id]: [...(cur[id] || []), v]}
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
            bithday: !isDateFormat(model.bithday),
            klient_exist: this.passportsMap[this.passportId(passport)],
            fio: ['family', 'name', 'sername'].some(v => !model[v]),
            passport: ['seria', 'number'].some(v => !passport[v])
        }
      }
    },
    methods: { toTitleCase, toDots,
        ...mapActions('klient', ['save', 'remove']),
        focus(name) {
            if (name) this.$refs[name].focus()
        },
        getKey({ family, name, sername }) {
            return [family, name, sername]
                .map((v = '') => v.trim())
                    .join('').toLowerCase()
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
            this.$nextTick(() => {
                this.$modal.show(Editor, { title, value: this.model._id }, { height: 'auto' })
            })
        },
        copy() {
            const { _id, passport } = {}
            this.data = {...this.data, _id, passport }
        },
        onRemove() {
            const { family, deleted: description } = this.model
            const t = v => this.$t(`confirm.${v}`)
            const html = `<p>${t('enter')} <strong style='color: red;'>${family}</strong> ${t('to confirm')}</p>`
            const action = (description, title) => this.remove({...this.model, description, title}).then(() => this.select())
            const validate = (v) => family === v
            const value = { title: 'remove', html, description }
            this.$modal.show(Confirm, { value, action, validate })
        },
        select({ _id } = {}) {
            if(!_id) return
            // this.data = {}
            this.$emit('input', _id)
        },
        clear() {
            this.data = {}
            this.$emit('input', '')
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
.klient .klient-dropdown .dropdown-menu {
    left: -130px !important;
}
</style>
