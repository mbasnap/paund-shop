<template>
<div class="col">
<form>
    <valid-input type="text" label="token" placeholder="token" autofocus
       v-model="token" > 
    </valid-input>
</form>

<button class="btn btn-primary mb-3" type="button" 
     @click="activate(token)"
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
            token: ''
        }
    },

    methods: {
        ...mapActions(['activate'])
    }

}
</script>


