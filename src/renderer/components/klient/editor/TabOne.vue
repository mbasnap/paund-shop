<template>
    <div>
        <div class="form-row mb-2">
            <suggest class="form-control col" name="family" :placeholder="t('family')"
            :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
            :value="value" :options="options" @select="update"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-5 mr-1" name="name" :placeholder="t('name')" :value="value"/>
            <named-input class="form-control col" name="sername" :placeholder="t('sername')" :value="value"/>
        </div>
        <passport class="mb-2" :value="value" :disabled="disabled" :full="full"/>
        <div class="form-row mb-2">
            <named-input class="form-control col" name="idn" :placeholder="t('idn')" :value="value"/>   
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Passport, mix} from './components'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, full: Boolean },
    components: { Passport },
    inject: [ 'update', 'save' ],
    computed: {
      ...mapGetters({
          klients: 'klient/klients'
      }),
      options({ value, klients }) {
          return klients.filter(({ family }) => (family || '')
            .includes(value.family || ''))
      }
    },
    methods: {
      readonly() {
          return this.disabled
      },
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      },
      t(v) {
          return this.$t(`klient.${v}`)
      }
    }
}
</script>

<style> </style>