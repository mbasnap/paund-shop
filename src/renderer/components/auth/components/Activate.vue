<template>
<div class="col">
  <valid-input
  ref="token"
  type="text" 
  placeholder="token"
  :value.sync="value.token"
  :error.sync="err.token"
  :validate="[requred]"
  @enter="onActivate(value)"/>
  <valid-input
  style="width: 40%;"
  ref="password"
  type="password" 
  placeholder="Password" 
  label="admin"
  :validate="[requred]"
  :value.sync="value.password"
  :error.sync="err.password"
  @enter="onActivate(value)"/>
  <button 
  class="btn btn-primary mb-3" 
  type="button" 
  :disabled="disabled"
  :loading="loading"
  @click="onActivate(value)">{{$t('auth.activate')}}</button>
  <div v-if="company.active" class="mt-3">
    <a href="#" @click="onLogin" :disabled="true"
    >{{$t('auth.login')}}</a>
  </div>
  <modal-activation ref="modal-activation"/>
</div>
</template>

<script>
import { decode } from '@/functions/jwt'
import { mapActions, mapGetters } from 'vuex'
import { ValidInput } from '@/widgets/valid-input'
import ModalActivation from './ModalActivation.vue'
export default {
  components: { ValidInput, ModalActivation },
  data() {
    return {
      value: {},
      err: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters({ company: 'company' }),
    disabled({ value }) {
      const  no_value = [value.token, value.password].some(v => !v)
      return [no_value].some(v => v)
    }
  },
  methods: {
    ...mapActions(['loginAdmin' ]),
    requred(v) {
      return !v && 'Обязательное поле'
    },
    onLogin() {
      window.location.reload()
    },
    async onActivate({ token, password }) {
      if (['token', 'password'].some(v => !this.$refs[v]._validate())) return
      try {
        this.loading = true
        const decoded = await decode(token)
        if (!decoded) return this.err.token = 'bad_token'
        await this.loginAdmin({url: decoded.local, password})
        await this.$refs['modal-activation'].show(decoded, password)
        for (const key of ['lombard', 'company', 'remote', 'local']) 
          localStorage.setItem(key, decoded[key])
        window.location.reload()        
      } catch(err) {
        console.error(err);
        this.err = {...this.err, ...err}
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style>
</style>


