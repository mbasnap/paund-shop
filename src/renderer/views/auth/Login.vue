<template>
<div>
<form>
    <valid-input type="email" :label="$t('auth.email_address')" :placeholder="$t('auth.enter_email')"
       autocomplete="email" autofocus
       v-model="email.value" :isValid="!email.error"
       > {{$t('auth.' + email.error)}}
    </valid-input>
    <valid-input type="password" :label="$t('auth.password')" :placeholder="$t('auth.enter_password')" 
       autocomplete="new-password"
       v-model="password.value" :isValid="!password.error"
       > {{$t('auth.' + password.error)}}
        <a href="#" @click="passwordRecovery(email.value)"
            v-show="password.error === 'incorrect_password'"
            >{{$t('auth.remind_me_password')}}
        </a> 
    </valid-input>
</form>

<button class="btn btn-primary mb-3" type="button" 
    :disabled="formInputs.some(({value, error}) => !value || error)"
     @click="login(userData)"
    > {{$t('auth.login')}}
</button>

<div>
    {{$t('auth.no_account')}} ?
    <a href="/#/register"> {{$t('auth.register')}} </a>
</div>

</div>
</template>

<script>
import {mapActions} from 'vuex'
import { isEmail, isLength} from 'validator'
import {ValidInput, Input} from '@/widgets/valid-input'
import {getValues, setErrors} from './functions'
import decode from 'jwt-decode'
export default {
    components: {ValidInput},
    created() {
        let {email} = this.decoded
        if (email) this.email.value = email
    },
    data() {
        return {
            email: new Input({
                name: 'email',
                onInput: (val) => {
                    let error = !val ? 'field_required' : !isEmail(val) ? 'incorrect_email' : false
                    this.email.error = error
                }
            }),
            password: new Input({
                name: 'password',
                onInput: (val) => {
                    let error = !val ? 'field_required' : false
                    this.password.error = error
                }
            })
        }
    },
    computed: {
        decoded () {
            let token = this.token
            return token ? decode(token) : {}
        },
        token () {
            return this.$route.query.token
        },
        formInputs () {        
            return [this.email, this.password]
        },
        userData () {
            let result = (obj, { name, value }) => ({ ...obj, [name]: value })
             return   this.formInputs.reduce(result, {token: this.token})             
        }
    },
    methods: {
        ...mapActions('user', ['login']), setErrors,
    }

}
</script>


