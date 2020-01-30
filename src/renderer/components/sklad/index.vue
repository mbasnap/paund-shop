<template>
<div class="sklad row">
    <list-to class="col-6" :value="values" :actions="{ toSklad: toSklad }"
    name="list-from">
        <div class="row m-0 p-2 form-check" style="text-align: left;">
            <input type="checkbox" class="form-check-input m-0" id="dropdownCheck2"
            style="position: unset;">
            <label class="form-check-label" for="dropdownCheck2">
                Show all
            </label>
        </div>        
    </list-to>
    <list-to class="col-6" :value="sklad" :actions="{ fromSklad: remove }"
    name="list-to">
        <div class="row m-0 p-2 form-check" style="text-align: left;">
            <input type="checkbox" class="form-check-input m-0" id="dropdownCheck2"
            style="position: unset;">
            <label class="form-check-label" for="dropdownCheck2">
                Show shings
            </label>
        </div> 
    </list-to>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { moment } from '@/functions'
import ListTo from "./components/ListTo"
export default {
    components: { ListTo },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            empty: 'reestr/empty',
            dt200: 'reestr/dt200',
        }),
        values({ empty, isAfter, map }) {
            return Object.values(empty).filter(isAfter)
                .map(v => ({...map[v._id]}))
        },
        sklad({ dt200, map }) {
            return dt200.map(v => ({...map[v._id]}))
                .map(v => ({ ...map[v.ref], ...v }))
        }
    },
    methods: {
        ...mapActions({
            remove: 'reestr/remove',
            save: 'reestr/save'
        }),
        isAfter(v) {
            return true
        },
        toSklad({ _id: ref, klient, ocenca }) {
            const values = {ref, klient: klient._id, values: [
                { dt: '200', ct: '377', summ: ocenca }
            ]}
            return this.save(values)
        },
        tostring({ date, number, ocenca, klient }) {
            const { family } = { ...this.klients[klient]}
            return `${number} ${moment(date).format('L')} ${family} ${ocenca}`     
        }
    }
}
</script>
<style>
.sklad {
    width: 100%;
    padding: 10px;
}
  .sklad .list .header {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

</style>
