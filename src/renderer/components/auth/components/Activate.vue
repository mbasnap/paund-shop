<template>
<div class="col">
<div>
    <valid-input type="text" label="token" placeholder="token" 
    :isValid="true" v-model="token"/>
    <div v-if="!auth" class="row mb-2">
    <!-- <valid-input class="form-control col-5 mr-1" v-model="username" :isValid="true"/> -->
    <valid-input class="col-5" type="password" 
    placeholder="Password" label="admin"
    v-model="password" :isValid="true"/>
    </div>
</div>

<button class="btn btn-primary mb-3" type="button" 
     @click="activate({ password, token })"
    > activate
</button>

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
            password: ''
        }
    },
    computed: {
        auth({ password }) {
            return !!localStorage.getItem('admin')
        }
    },
    methods: {
        ...mapActions(['activate']),
        // reload() {
        //     window.location.reload()
        // }
    }

}
</script>


