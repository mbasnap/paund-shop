<template>
<div>
<form>
    <valid-input type="string" :label="$t('auth.name')" :placeholder="$t('auth.name')" autofocus
      autocomplete="name"  v-model="name.value" :isValid="!name.error"> {{$t('auth.' + name.error)}}
    </valid-input>

    <valid-input type="email" :label="$t('auth.email_address')" :placeholder="$t('auth.enter_email')"
      autocomplete="email"  v-model="email.value" :isValid="!email.error"> {{$t('auth.' + email.error)}}
    </valid-input>

    <valid-input type="password" :label="$t('auth.password')" :placeholder="$t('auth.enter_password')" 
       autocomplete="new-password"  v-model="password.value" :isValid="!password.error"> {{$t('auth.' + password.error)}}
    </valid-input>

    <valid-input type="password" :label="$t('auth.confirm_password')" :placeholder="$t('auth.confirm_password')" 
        autocomplete="new-password" v-model="password2.value" :isValid="!password2.error"> {{$t('auth.' + password2.error)}}
    </valid-input>
</form>

<button class="btn btn-primary mb-3" type="button"
    :disabled="formInputs.some(({value, error}) => !value || error)"
    @click="register(userData)"
    > {{$t('auth.register')}}
</button>

<div> {{$t('auth.have_account')}} ?
    <a href="#" @click="$router.push('login')"> {{$t('auth.login')}}</a>
</div>

</div>
</template>

<script>
import {mapActions} from 'vuex'
import {isEmail, isLength, equals} from 'validator'
import {ValidInput, Input} from '@/widgets/valid-input'
import {getValues, setErrors} from './functions'

export default {
    components: {ValidInput},
    data() {
        return {
            name: new Input({
                name: 'name',
                onInput: (val) => {
                    let error = !val ? 'field_required' : false
                    this.name.error = error
                }
            }),
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
                   let error = !val ? 'field_required' 
                    : !isLength(val, {min: 6, max: 30}) ?  'incorrect_length' : false
                    this.password.error = error
                }
            }),
            password2: new Input({
                name: 'password2',
                onInput: (val) => {
                    let error = !equals(val, this.password.value) ?  'password_not_equal' : false
                    this.password2.error = error
                }
            })
        }
    },
    computed: {
        formInputs () {
            return [this.name, this.email, this.password, this.password2]
        },
        userData () {
            let result = (obj, { name, value }) => ({ ...obj, [name]: value })
             return   this.formInputs.reduce(result, {})             
        }
    },
    methods: {
        ...mapActions({
            register: 'register'
        }), getValues, setErrors,

        // onRegister(info) {
        //     this.register(this.userData).then(res => {
        //         console.log(res)
        //     })
        //     // this.router.push({ path: 'info', params: info })
        // }
    }
}
</script>

