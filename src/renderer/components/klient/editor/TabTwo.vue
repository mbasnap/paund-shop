<template>
    <div>
        <address-input :value="value"></address-input>
    </div> 
</template>

<script>
import { AddressInput, mix} from './components'

export default {
    mixins: [ mix ],
    props: { value: Object, editable: { type: Boolean, default: true } },
    components: { AddressInput },
    inject: [ 'update' ],
    methods: {
      readonly() {
          return !this.editable
      },
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      }
    }
}
</script>

<style></style>