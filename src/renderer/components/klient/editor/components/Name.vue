<template>
    <div class="name"> 

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mix from '@/widgets/named-input/mix.js'
export default {
    mixins: [ mix ],
    props: { value: Object, editable: Boolean, full: Boolean },
    inject: [ 'update' ],
    computed: {
      ...mapGetters('klient', [ 'klients' ]),
      options({ value, klients }) {
          return klients .filter(({ family }) => family.includes(value.family || ''))
      }
    },
    methods: {
        readonly() {
            return !this.editable
        },
        input({ name, value }) {
            this.update({ ...this.model, [name]: value})
        }
    }
}
</script>

<style>

</style>