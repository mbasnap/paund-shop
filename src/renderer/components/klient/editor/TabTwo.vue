<template>
    <div>
        <bith-day :value="value" class="border-bottom"></bith-day>
        <address-input :value="value" class="border-bottom"></address-input>
        <klient-phone :value="value" ></klient-phone>
    </div> 
</template>

<script>
import { AddressInput, BithDay, KlientPhone, mix} from './components'

export default {
    mixins: [ mix ],
    props: { value: Object, editable: { type: Boolean, default: true } },
    components: { AddressInput, BithDay, KlientPhone },
    inject: [ 'update', 'save' ],
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