<template>
  <div class="klient">
        <div class="form-row mb-2">
            <suggest ref="klients" class="form-control col" name="family"
            :placeholder="t('family')"
            :suggest="({ family, name, sername }) => `${family} ${name} ${sername}`"       
            v-model="model" :options="options" @select="select">
                <svg-row-down v-show="!value._id && !disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
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
            <input :class="['form-control col', { 'is-invalid': err.bithday }]"
            :placeholder="t('bithday')" @change="change" v-model="bithday">

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
                <svg-address-card width="30px;" :disabled="!value._id" @click="showModal('edit')"/>
            </div>            
            <named-input class="form-control col" name="idn" :placeholder="t('idn')" v-model="model"/>   
        </div>
        <b-tooltip target="tooltip-err" variant="danger" triggers="hover">
            Klient {{ fio(err.klient_exist) }} exist
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
    props: { value: Object, disabled: Boolean },
    provide() {
      return { update: this.update, change: this.change }
    },
    computed: {
      ...mapGetters({
        map: 'klient/map',
        docs: 'klient/docs',
        group: 'klient/group',
      }),
      options({ value, group }) {
          return Object.entries(group).map(([key, [v]]) => ({...v, key}))
              .filter(({ family }) => family.includes(value.family || ''))
      },
      passports({ group, model }) {
          return (group[model.key] || []).filter(v => v._id !== model._id)
      },
      model: {
          get() {
              return {...this.value}
          },
          set({ name, value }) {
              this.update({ ...this.value, [name]: value })
              if(name === 'family')  this.$refs['klients'].highlight(0)              
          }
      },
      bithday: {
          get({ model }) {
              return model.bithday
          },
          set(bithday) {
              this.update({ ...this.value, bithday }) 
          }
      },
      passport: {
          get() {
              return {...this.model.passport}
          },
          set({ name, value }) {
              const passport = { ...this.passport, [name]: value }
              this.update({ ...this.value, passport }) 
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
        ...mapActions({
          save: 'klient/save',
          remove: 'klient/remove',
        }),
      passportId({ seria, number }) {
          return ('' + seria + number).toLowerCase()
      },
      fio({ family, name, sername } = {}) {
          return `${family} ${name} ${sername}`
      },
      showModal(title) {        
        const { value, update, save, remove } = this
        this.$modal.show(Editor, { title, value, save, remove }, { height: 'auto' })
      },
      update(v) {
        this.$emit('input', { ...this.model, ...v })
      },
      select(v) {
        this.$emit('input', {...v })
      },
      change() {
        if (!Object.values(this.err).some(v => v))
        this.save(this.model).then(this.select)
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
