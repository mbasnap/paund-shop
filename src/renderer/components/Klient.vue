<template>
    <div >
        <!-- <klient-body/> -->
      <div class="body ">
        <instant v-model="model" name="family"  @select="setKlient" :suggest="klients"
                :string="({family, name, sername}) => family + ' ' + name + ' ' + sername">
            <reset slot="rightButton" @reset="setKlient({})"/>
        </instant>           
        <div class="form-row">
            <named-instant v-model="model" name="name" class="col-md-5"/>
            <named-instant v-model="model" name="sername" class="col-md-7"/>
        </div>
        <div class="form-row">
            <named-instant class="col-md-3" v-model="model" name="seria" :suggest="klients"/>
            <named-instant  class="col-md-9" v-model="model" name="nomer" :suggest="klients"/>
        </div> 
        <instant v-model="model" name="idn" :suggest="klients"></instant>
      </div>  
      <div class="control row ">
        <div class="col-10"></div>
        <div class="col-2">
          <div class="row justify-content-center"><img :src="imgList" @click="modalShow = true">  </div>
        </div>
      </div>  
      <b-modal v-model="modalShow"  title="Klient list">
        <klient-list class="klient-list p-3"/>
      </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {NamedInstant, Instant, Reset} from "@/widgets"
// import { alert } from 'vue-strap'
import imgList from '@/assets/img/list.png'
import KlientList from '@/components/KlientList.vue'
export default {
    components: {  Instant, Reset, NamedInstant, KlientList},
    data() {
      return {
        imgList,
        modalShow: false
      }
    },
     computed: {
        ...mapGetters(['klients', 'klient']),
        model: {
            get() {
                return  this.klient
            },
            set({name, value}) {
                this.setKlient({...this.klient, [name]: value})
            }
        }
    },
    methods: {
        ...mapActions(['setKlient']),
    }  
}
</script>

<style> 

  .klient .body {
    /* width: 100%; */
    height: 80%;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0.24) */
  }
  .klient .control {
    padding: 10px;
  }
  .klient .control img {
    width: 30px;
    height: 30px;
  }
</style>
