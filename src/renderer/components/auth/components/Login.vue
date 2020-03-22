<template>
<div>
<form>
    <valid-input type="email" label="name" :isValid="!userErr"
    :value="username" @input="v => onInput('username', v)">{{ userErr }}</valid-input>
    <valid-input type="password" :label="$t('auth.password')" :isValid="!err.password"
    :value="password" @input="v => onInput('password', v)">{{ err.password }}</valid-input>
    <valid-input v-show="user.active && !user.password" type="password" label="confirm" :isValid="!confirmErr"
    v-model="confirm" >{{ confirmErr }}</valid-input>
</form>

<button class="btn btn-primary mt-3" type="button" :disabled="disabled"
@click="onLogin(user, password).catch(setErr)"> {{$t('auth.login')}}</button>

<div class="mt-3">
    <a href="#" @click="$router.push('activate')"> {{$t('auth.change_account')}}</a>
</div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { isEmail, isLength } from 'validator'
import { ValidInput } from '@/widgets/valid-input'
export default {
    components: { ValidInput },
    data() {
        return {
            username: '',
            password: '',
            confirm: '',
            passwordErr: '',
            err: {}
        }
    },
    computed: {
        ...mapGetters(['usersMap', 'company']),
        user({ usersMap, username }) {
            return {...usersMap[username] }
        },
        active({ user }) {
            return user.name && user.active
        },
        userErr({ username, company, user, active }) {
            const err = { company_not_active: !company.active, not_active: !user.active, no_found: !user.name }
            return username ? ['company_not_active', 'no_found', 'not_active']
                .filter(v => err[v])[0] : false
        },
        confirmErr({ password, confirm }) {
            const err = { not_mached: password !== confirm }
            return password && confirm ? ['not_mached']
                .filter(v => err[v])[0] : false
        },
        mached({ user, password, confirm }) {
            return user.password || password === confirm
        },
        disabled({ password, userErr, passwordErr, confirmErr }) {
            const length = password.length > 0           
            return [ !length, userErr, passwordErr, confirmErr ]
                .some(v => v)
        }
    },
    methods: {
        ...mapActions(['logIn', 'updatePassword' ]),
        onLogin(user, password) {
            return !user.password ?  this.updatePassword({ user, password })
                : this.logIn({ user, password })                   
        },
        setErr(err) {
            this.err = err
            
        },
        onInput(name, value) {
            this[name] = value
            this.passwordErr = ''
        }
    }

}
</script>


