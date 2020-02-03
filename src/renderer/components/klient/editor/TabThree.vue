<template>
            <div class="col" style="text-align: right;">
                <input type="checkbox" :checked="!!value.user" class="form-check-input" id="check"
                @change="input({ name: 'user', value: !value.user})">
                <label class="form-check-label" for="dropdownCheck2">User</label>
            </div>     
</template>

<script>
import { mix} from './components'
export default {
    mixins: [ mix ],
    props: { value: Object },
    inject: [ 'update', 'save' ],
    methods: {
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      }
    }
}
</script>

<style>

</style>