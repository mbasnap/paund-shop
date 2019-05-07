<template>
    <div class="obespechenie col">
        <table class="table table-sm ">
        <thead >
            <tr>
                <th class="index">#</th>
                <th v-for="(item, index) in fields" :key="index" v-bind:class="item">{{item}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in obespechenie" :key="index">
                <td class="index">{{index + 1}}</td>
                <td v-for="(name, f_index) in fields" :key="f_index" :class="name">{{format(item[name],name)}}</td>
            </tr>
            <tr class="add">
                <td><a class="btn btn-primary" href="#" role="button">add</a></td>
                <td v-for="(name, f_index) in fields" :key="f_index" class="summ">{{getSumm(name)}}</td>
            </tr>
        </tbody>
        </table>       
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
const items = [

]
export default {
    data () {
        return {
            fields: ['title', 'proba','ves','derty','ocenca'], 
            format_ves: true,          
            format_derty: true,          
            format_ocenca: true,          
        }
    },
    computed: {
        ...mapGetters(['obespechenie', 'summ_ves', 'summ_derty']),
    },
    methods: {
        // ...mapActions(['save']),
        getSumm (name) {
            const summ = this['summ_' + name]
            return summ ? this.$numberFormat(summ, 2, ',', ' ') : ''
        },
        format(item, name) {
            return this['format_' + name] ?  this.$numberFormat(item, 2, ',', ' ') : item
        }
    }
}
</script>

<style>

    .obespechenie table{
        border: 1px solid rgba(0, 0, 0, 0.22);
    }
    .obespechenie th{
        /* text-align: center; */
    }
    .obespechenie .index {
        text-align: center;
        width: 10px;
    }
    .obespechenie .title {
        width: 250px;
    }

</style>
