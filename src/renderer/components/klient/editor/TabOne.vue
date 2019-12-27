<template>
    <div>
        <div class="form-row mb-2">
            <suggest class="form-control col" name="family" placeholder="Family"
            :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
            :value="value" :options="options" @select="update">
                <slot></slot>
            </suggest>
            <named-input v-if="full" class="form-control col-3 ml-1" name="bithday" placeholder="Bithday" :value="value"/>
        </div>
        <div class="form-row mb-2">
            <named-input class="form-control col-5 mr-1" name="name" placeholder="Name" :value="value"/>
            <named-input class="form-control col" name="sername" placeholder="Sername" :value="value"/>
        </div>
        <passport class="mb-2" :value="value" :disabled="disabled" :full="full"/>
        <div class="form-row mb-2">
            <named-input class="form-control col" name="idn" placeholder="ID" :value="value"/>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Passport, mix} from './components'
export default {
    mixins: [ mix ],
    props: { value: Object, disabled: Boolean, full: Boolean },
    components: { Passport },
    inject: [ 'update' ],
    computed: {
      ...mapGetters('klient', [ 'klients' ]),
      options({ value, klients }) {
          return Object.values(klients)
            .filter(({ family }) => family.includes(value.family || ''))
      }
    },
    methods: {
      readonly() {
          return this.disabled
      },
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      }
    }
}
</script>

<style> </style>