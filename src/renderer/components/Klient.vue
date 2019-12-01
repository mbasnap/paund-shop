<template>
  <div >
      <div class=" col ">
        <suggest class="form-control mb-2" name="family" placeholder="Family"
        :value="value" :options="klients.filter(byFamily)"
        :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
        @select="update">
          <slot></slot>
        </suggest>       
        <div class="form-row m-0 mb-2">
          <named-input class="form-control col-5 mr-1" name="name" placeholder="Name"
          :value="value" />
          <named-input class="form-control col" name="sername" placeholder="Sername"
          :value="value" />
        </div>
        <div class="form-row m-0 mb-2">
          <named-input class="form-control col-3 mr-1" name="seria" placeholder="BA"
          :value="value" />
          <named-input class="form-control col" name="nomer" placeholder="01010101"
          :value="value"/>
        </div> 
        <named-input class="form-control" name="idn" placeholder="ID"
        :value="value" />
      </div>
      <div class="col">
        <span class="btn edit" @click="showModal('edit', value)">edit</span>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { NamedInput, Suggest, mix } from '@/widgets/named-input/index.js'
export default {
    components: {  NamedInput, Suggest },
    mixins: [ { provide: mix.provide, methods: mix.methods } ],
    props: { value: Object, editable: Boolean },
    created() {
      this.getKlients()
    },
    computed: {
      ...mapGetters('klient', [ 'klients' ]),
      byFamily() {
        return ({ family }) => family.includes(this.value.family || '')
      }
    },
    methods: {
      ...mapActions({ getKlients: 'klient/update' }),
      readonly() {
          return !this.editable
      },
      update(value) {
          const { family, name, sername } = value
          const valid = [family, name, sername].every(v => !!v)
          this.$emit('input', { ...value, valid })
      },
      input({ name, value }) {
        this.update({ ...this.value, [name]: value })
      }
    }
}
</script>

<style>
.klient .btn.edit {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
</style>
