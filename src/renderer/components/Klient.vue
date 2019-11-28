<template>
  <div class="klient">
      <div class="body col ">
        <suggest class="form-control mb-2" name="family" placeholder="Family"
        :value="value" :options="klients.filter(byFamily)"
        :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
        @select="v => $emit('select', v)" >
          <span class="reset" @click="$emit('reset')">x</span>
        </suggest>       
        <div class="form-row m-0 mb-2">
          <named-input class="form-control col-5 mr-1" name="name" placeholder="Name"
          :value="value" />
          <named-input class="form-control col" name="sername" placeholder="Sername"
          :value="value" />
        </div>
        <div class="form-row m-0 mb-2">
          <named-input class="form-control col-3 mr-1" name="seria" placeholder="BA"
          :value="value" :readonly="readonly"/>
          <named-input class="form-control col" name="nomer" placeholder="01010101"
          :value="value"/>
        </div> 
        <named-input class="form-control" name="idn" placeholder="ID"
        :value="value" />
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { NamedInput, Suggest, mix } from '@/widgets/named-input/index.js'
export default {
    components: {  NamedInput, Suggest },
    mixins: [ { provide: mix.provide, methods: mix.methods } ],
    props: { value: Object },

    created() {
        this.update()
    },
    computed: {
      ...mapGetters('klient', [ 'klients' ]),
      byFamily() {
        return ({ family }) => family.includes(this.value.family || '')
      }
    },
    methods: {
      ...mapActions('klient', [ 'update', 'save' ]),
      input({ name, value }) {
        this.$emit('input', { ...this.value, [name]: value })
      },
      readonly() {
        return  !!this.value.id
      }
    }
}
</script>

<style> </style>
