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
            <named-instant nt class="col-md-9" v-model="model" name="nomer" :suggest="klients"/>
        </div> 
        <instant v-model="model" name="vidan" :suggest="klients"></instant>
        <instant v-model="model" name="idn" :suggest="klients"></instant>
      </div>  
      <div class="control row ">
        <div class="col-10">
<button @click="showModal = true">Click</button>
        </div>
        <div class="col-2">
          <div class="row justify-content-center"><img :src="imgList" alt="">  </div>
        </div>
      </div>  


<div v-if="showModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="showModal = false">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>

        </div>
      </div>
    </transition>
  </div>


<alert :show.sync="showRight" placement="top-right" duration="3000" type="success" width="400px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>Well Done!</strong>
  <p>You successfully read this important alert message.</p>
</alert>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {NamedInstant, Instant, Reset} from "@/widgets"
import { alert } from 'vue-strap'
import imgList from '@/assets/img/list.png'
// import KlientBody from './KlientBody.vue'
export default {
    components: {  Instant, Reset, NamedInstant, alert},
    data() {
      return {
        imgList,
        showModal: false
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
