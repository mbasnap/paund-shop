<template>
  <div class="login" v-if="users && users.length">
    <form>
      <valid-input
        ref="username"
        label="Логин"
        @enter="onLogin"
        :value.sync="value.username"
        :error.sync="err.username"
        :validate="[requred, noUser]"/>
      <valid-input
        ref="password"
        type="password"
        label="Пароль"
        @enter="onLogin"
        :value.sync="value.password"
        :error.sync="err.password"
        :validate="[requred]"/>
      <valid-input
        ref="confirm"
        v-show="user.active && !user.password"
        type="password"
        label="confirm"
        @enter="onLogin"
        :value.sync="value.confirm"
        :error.sync="err.confirm"
        :validate="[confirmPassword]"/>
    </form>
    <button 
      class="btn btn-primary mt-3"
      type="button"
      :disabled="disabled || loading"
      :loading="loading"
      @click="onLogin"
    >{{$t('auth.login')}}</button>
    <div class="mt-3">
      <a href="#" @click="$router.push('activate')">{{$t('auth.activate')}}</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ValidInput } from '@/widgets/valid-input'
export default {
  components: { ValidInput },
  created() {
    this.$store.dispatch('update')
  },
  data() {
    return {
      value: {},
      err: {},
      loading: false
    }
  },
  computed: {
    ...mapGetters(['usersMap', 'company', 'users']),
    user({ usersMap, value }) {
      return {...usersMap[value.username]}
    },
    disabled({ value, err }) {
      const {length} = Object.values(err).filter(v => !!v)
      return !(value.username && value.password && !length )
    }
  },
  methods: {
    ...mapActions(['logIn', 'updatePassword' ]),
    async onLogin() {
      const { user, value } = this
      if (!this.validate()) return
      try {
        this.loading = true
        !user.password ?  await this.updatePassword({ user, password: value.password })
          : await this.logIn({ user, password: value.password })
      } catch(err) {
        this.err = {...this.err, ...err}
      } finally {
        this.loading = false
      }   
    },
    validate() {
      return !['username', 'password', 'confirm'].some(v => !this.$refs[v]._validate())
    },
    requred(v) {
      return !v && 'Обязательное поле'
    },
    noUser() {
      const { name, active } = this.user
      return [
        !name && 'Пользователь не найден',
        !active && 'Пользаватель не активирован'
      ].filter(v => v)[0]
    },
    confirmPassword() {
      const { password } = this.user
      return !password && this.password !== this.confirm && 'Не совпадает с паролем'
    }
  }

}
</script>
<style scoped>
  .login {
    max-width: 35%;
    margin: 10% auto;
  }
</style>

