<template>
    <div class="obespechenie">
        <table  class="table  table-sm ">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="(name, index) in fields" :key="index" v-bind:class="name">{{name}}</th>
            </tr>
        </thead>
        <tbody>
            <row v-for="(value, index) in value" :key="index" :value="value" class="items"
            @input="input">
                <td class="index">{{index + 1}}</td>
                <td> <named-input name="title" /> </td>
                <td> <named-input teg="b-form-select" :options="probs" name="proba" /> </td>
                <td> <named-input name="ves" /> </td>
                <td> <named-input name="derty" /> </td>
                <td> <named-input name="ocenca" /> </td>
            </row>
            <tr class="add">
                <td><img :src="imgAdd" @click="add"> </td>
                <td v-for="({name}, f_index) in fields" :key="f_index" class="summ">{{getSumm(name)}}</td>
            </tr>
        </tbody>
        </table> 
      
        <!-- <modal-row :row="row" @ok="save"></modal-row>  -->
          
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imgAdd from '@/assets/img/add.jpg'
import NamedInput from '@/widgets/named-input'
import Row from './Rows'
// import ObespechenieList from '@/components/ObespechenieList.vue'

export default {
    components: { NamedInput, Row },
    props: { value: Array },
    data () {
        return {
            imgAdd,
            row: {},
            fields: [ 'title', 'proba', 'ves', 'derty', 'ocenca' ],
        }
    },
    computed: {
        probs() {
            return ['375', '583', '585']
        }
    },
    methods: {
        // ...mapActions( 'obespechenie', ['save']),
        input(v) {
            this.$emit('input', [...this.value] )
        },
        getSumm (name) {
            const summ = this.fields[name] && this.fields[name].format ? this.summ(name) : false
            return summ !== false ? this.$numberFormat(summ, 2, ',', ' ') : ''
        },
        add() {
            this.$emit('input', [...this.value, {}])
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
    .obespechenie table tr.items td {
        border-right: 1px solid rgba(0, 0, 0, 0.22);
    }
    .obespechenie .index {
        text-align: center;
        width: 10px;
    }
    .obespechenie .title {
        width: 250px;
    }

</style>
