<template>
    <div class="klient">
        <!-- <klient-body/> -->
      <div class="body ">
        <instant v-model="model" name='family' :suggest="klients"
          :class="className('family')"
          @select="select"
          :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="clear"/>
        </instant>           
        <div class="form-row">
            <instant :class="className('name')" v-model="model" name="name" class="col-md-5"/>
            <named-instant v-model="model" name="sername" class="col-md-7"/>
        </div>
        <div class="form-row">
            <named-instant class="col-md-3" v-model="model" name="seria" :suggest="klients"/>
            <named-instant  class="col-md-9" v-model="model" name="nomer" :suggest="klients"/>
        </div> 
        <instant v-model="model" name="idn" :suggest="klients"></instant>
      </div>  
      <div class="control">
        <div class="col-2 ">
          <div class="row  justify-content-center">
            <img :src="imgList" @click="showMomal = true">
          </div>
        </div>
        <div class="col-10"></div>
      </div>  
      <!-- <b-modal v-model="showMomal"  title="Klient list">
        <klient-list v-model="model" class="klient-list p-3"/>
      </b-modal> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {NamedInstant, Instant, Reset} from "@/widgets"
// import { alert } from 'vue-strap'
import imgList from '@/assets/img/list.png'
import KlientList from '@/components/KlientList.vue'
export default {
    components: {  Instant, Reset, NamedInstant, KlientList},
    created() {
        this.update()
    },
    data() {
      return {
        imgList,
        showMomal: false
      }
    },
 
    computed: {
      ...mapGetters('klient', ['klients', 'klient', 'edit', 'isSelected']),
      model: {
          get() {
            return  this.klient
          },
          set({name, value}) {
            this.set({[name]: value})
          }
      },

    },
    methods: {
      ...mapActions('klient', ['set', 'select', 'clear', 'update']),
      className(name) {
        return this.isSelected && this.edit[name] ? 'edit' : ''
      }
    }
}
</script>

<style> 

  .klient .body {
    height: 80%;
  }

  .klient .control img {
    width: 30px;
    height: 30px;
  }
  .instant.edit {
    border: 1px solid #f10d0d;
}
</style>
