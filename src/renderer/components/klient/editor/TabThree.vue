<template>
  <div class="form-row mb-2">
    <div class="form-group col">
        <input :class="['form-control', {'is-invalid': errors.email.length }]" :placeholder="t('email')"
        :value="value.email" @input="({ target }) => input({ name: 'email', value: target.value })"/>
        <div class="invalid-feedback" >
          <span v-for="(v) in errors.email" :key="v">{{ v }}</span>
        </div>
    </div>          
      
      <div class="col-3" style="text-align: right;">
        <input type="checkbox" class="form-check-input" id="check"
        :checked="isUser" @change="save(value).then(v => addUser(v)).then(() => close())" :disabled="disabled">
        <label class="form-check-label" for="check">{{ t('user') }}</label>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mix} from './components'
export default {
    mixins: [ mix ],
    props: { value: Object, errors: Object },
    inject: [ 'update', 'save', 'close' ],
    computed: {
      ...mapGetters({
          docs: 'klient/docs',
          company: 'company'
      }),
      isUser({ company, value }) {
        return (company.users || []).includes({...value}._id)
      },
      disabled({ value }){
        const { isValid } = value
        return [isValid ].some(v => !v)
      }
    },
    methods: {
      ...mapActions({
        addUser: 'addUser'
      }),
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      },
      t(v) {
          return this.$t(`klient.${v}`)
      }
    }
}
</script>

<style>

</style>