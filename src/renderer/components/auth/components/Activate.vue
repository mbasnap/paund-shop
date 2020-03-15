<template>
<div class="col">
    <valid-input type="text" placeholder="token" :isValid="!err.token"
    :value="token" @input="v => onInput('token', v)">{{ err.token }}</valid-input>
    <div class="row mb-2">
        <valid-input class="col-5" type="password" placeholder="Password" label="admin"
        :isValid="!err.password" :value="password"
        @input="v => onInput('password', v)">{{ err.password }}</valid-input>
    </div>
    <button class="btn btn-primary mb-3" type="button" :disabled="disabled"
    @click="loginAdmin(password).then(() => activate(token)).catch(setErr)"> activate</button>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidInput } from '@/widgets/valid-input'
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
        // auth({ password }) {
        //     return !!localStorage.getItem('admin')
        // }
        disabled({ token, password }) {
            const  no_value = [token, password].some(v => !v)
            return [no_value].some(v => v)
        }
    },
    methods: {
        ...mapActions(['loginAdmin', 'activate']),
        onInput(name, value) {
            // window.location.reload()
            this[name] = value
            this.err = {}
        },
        setErr(v) {
            console.log(v);
            
            this.err = v
        }
    }

}
</script>


