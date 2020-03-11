<template>
    <div>
        <div class="form-row mb-2">
            <suggest ref="klients" class="form-control col" name="family" :placeholder="t('family')"
            :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
            :disabled="disabled"
            :value="value" :options="options" @select="update">
                <svg-row-down v-show="!disabled" class="reset" @click="$refs['klients'].highlight(0, true)"/>
            </suggest>
            <div v-if="full" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-trash width="12px;" @click="$emit('remove')"/>
            </div>  
            <div v-show="!disabled" class="col-1" style="text-align: right; line-height: 30px;">
                <svg-reset  width="8px;" @click="$emit('reset')"/>
            </div>  
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-5 mr-1" name="name" :placeholder="t('name')" :value="value"/>
            <named-input class="form-control col" name="sername" :placeholder="t('sername')" :value="value"/>
        </div>
        <passport class="mb-2" :value="value" :options="klients" :disabled="disabled"
         :full="full" @change="change"/>
        <div class="form-row mb-2">
            <named-input class="form-control col" name="idn" :placeholder="t('idn')" :value="value"/>   
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Passport, mix} from './components'
import { SvgRowDown, SvgTrash, SvgReset } from '@/svg'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, full: Boolean },
    components: { Passport, SvgRowDown, SvgTrash, SvgReset },
    inject: [ 'update',  'save' ],
    computed: {
      ...mapGetters({
          docs: 'klient/docs',
          company: 'company'
      }),
      klients({ docs, company }) {
          const users = v => !(company.users || []).includes(v._id)
          return docs.filter(users)
      },
      options({ value, klients }) {
          const byFamily = ({ family }) => (family || '').includes(value.family || '')
          return klients.filter(byFamily)
            
      }
    },
    methods: {
      readonly() {
          return this.disabled
      },
      change(v) {
          this.$emit('change')    
      },
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
          if(name === 'family')  this.$refs['klients'].highlight(0)

      },
      t(v) {
          return this.$t(`klient.${v}`)
      }
    }
}
</script>

<style> </style>