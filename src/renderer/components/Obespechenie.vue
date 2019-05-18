<template>
    <div class="obespechenie">
        <table class="table table-sm ">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="({name}, index) in fields" :key="index" v-bind:class="name">{{name}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index" @dblclick="showRow(item, index)">
                <td class="index">{{index + 1}}</td>
                <td v-for="({name, format}, f_index) in fields" :key="f_index" :class="name">{{format ? $numberFormat(item[name], 2, ',', ' ') : item[name]}}</td>
            </tr>
            <tr class="add">
                <td><img :src="imgAdd" @click="showRow()"> </td>
                <td v-for="({name}, f_index) in fields" :key="f_index" class="summ">{{getSumm(name)}}</td>
            </tr>
        </tbody>
        </table> 
      
        <modal-row :row="row" @ok="save"></modal-row> 
          
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imgAdd from '@/assets/img/add.jpg'
import ObespechenieList from '@/components/ObespechenieList.vue'

export default {
    components: { ObespechenieList },
    data () {
        return {
            imgAdd,
            row: {},
            fields: [
                {name: 'title'},
                {name: 'proba'},
                {name: 'ves', format: true},
                {name: 'derty', format: true},
                {name: 'ocenca', format: true}
            ],
        }
    },
    computed: {
        ...mapGetters( 'obespechenie', ['items', 'summ']),
    },
    methods: {
        ...mapActions( 'obespechenie', ['save']),
        getSumm (name) {
            const summ = this.fields[name] && this.fields[name].format ? this.summ(name) : false
            return summ !== false ? this.$numberFormat(summ, 2, ',', ' ') : ''
        },
        showRow(item, index) {
            this.row = {...item, index}
        }
    }
}
</script>

<style>
  .obespechenie  img {
    width: 15px;
    height: 15px;
  }
    .obespechenie table{
        border: 1px solid rgba(0, 0, 0, 0.22);
    }
    .obespechenie .index {
        text-align: center;
        width: 10px;
    }
    .obespechenie .title {
        width: 250px;
    }

</style>
