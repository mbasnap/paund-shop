<template>
<div>
<form>
    <valid-input type="email" :label="$t('auth.email_address')" :isValid="true"
    v-model="username" > </valid-input>
    <valid-input type="password" :label="$t('auth.password')" :isValid="true"
    v-model="password" > </valid-input>
    <valid-input v-show="user.active && !user.password" type="password" label="confirm" :isValid="true"
    v-model="confirm" > </valid-input>
</form>

<button class="btn btn-primary mb-3" type="button" :disabled="disabled"
@click="onLogin(user, password)"> {{$t('auth.login')}}</button>

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
            confirm: ''
        }
    },
    computed: {
        ...mapGetters(['usersMap']),
        user({ usersMap, username }) {
            return {...usersMap[username] }
        },
        active({ user }) {
            return user.active
        },
        mached({ user, password, confirm }) {
            return user.password || password === confirm
        },
        disabled({ active, mached, password }) {
            return [active, mached, password.length ].some(v => !v)
        }
    },
    methods: {
        ...mapActions(['logIn', 'updateUser' ]),
        onLogin(user, password) {
            return !user.password ? this.updateUser({ user, password })
            : this.logIn({ user, password })
        }
    }

}
</script>


