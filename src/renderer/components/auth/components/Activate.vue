<template>
<div class="col">
  <valid-input type="text" placeholder="token" :isValid="!err.token"
  :value="token" @input="v => onInput('token', v)">{{ err.token }}</valid-input>
  <div v-if="!admin" class="row mb-2">
    <valid-input class="col-5" type="password" placeholder="Password" label="admin"
    :isValid="!err.password" :value="password"
    @input="v => onInput('password', v)">{{ err.password }}</valid-input>
  </div>
  <button class="btn btn-primary mb-3" type="button" :disabled="disabled"
  @click="onActivate">{{$t('auth.activate')}}</button>
  <div v-if="company.active" class="mt-3">
    <a href="#" @click="onLogin" :disabled="true"
    >{{$t('auth.login')}}</a>
  </div>

</div>
</template>


<script>
import { decode } from '@/functions/jwt'
import { mapActions, mapGetters } from 'vuex'
import { ValidInput } from '@/widgets/valid-input'
import ModalActivation from './ModalActivation'
export default {
  components: { ValidInput },
  data() {
    return {
      token: '',
      password: '',
      err: {}
    }
  },
  computed: {
      ...mapGetters({
        company: 'company'
      }),
      disabled({ token, password, admin }) {
        const  no_value = [token, admin || password].some(v => !v)
        return [no_value].some(v => v)
      },
      admin() {
        return localStorage.getItem('admin');
      }
  },
  methods: {
    ...mapActions(['loginAdmin' ]),
    onInput(name, value) {
      this[name] = value
      this.err = {}
    },
    setErr(v) {
      this.err = v
    },
    onLogin() {
      window.location.reload()
    },
    async onActivate() {
      try {
        const token = await decode(this.token)
        if (!token) return this.token = ''
        await this.loginAdmin(this.admin || this.password)
        this.$modal.show(ModalActivation, { token })
      } catch(err) {
        this.setErr(err)
      }
    }
  }

}
</script>

<style>
</style>


