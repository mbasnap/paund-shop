<template>
  <div class="form-row mb-2">
      <named-input class="form-control col" name="email" :placeholder="t('email')" :value="value"/>
      <div class="col-3" style="text-align: right;">
            <input type="checkbox" class="form-check-input" id="check"
            :checked="isUser" @change="save().then(() => addUser(value))" :disabled="disabled">
            <label class="form-check-label" for="check">{{ t('user') }}</label>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mix} from './components'
export default {
    mixins: [ mix ],
    props: { value: Object },
    inject: [ 'update', 'save' ],
    computed: {
      ...mapGetters({
          docs: 'klient/docs',
          company: 'company'
      }),
      isUser({ company, value }) {
        return (company.users || []).includes(value._id)
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