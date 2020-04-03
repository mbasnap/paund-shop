<template>
<div class="sklad row ">
    <list-to class="col p-0" :value="listTo" 
    :actions="{ toSklad, remove: isAdmin ? remove : false }" name="list-from">
        <div class="row p-2 form-check" style="text-align: left; height: 40px;">
            <input type="checkbox" class="form-check-input m-0" id="dropdownCheck2"
            :checked="showOver" @change="showOver = !showOver"
            style="position: unset;">
            <label class="form-check-label" for="dropdownCheck2"> Просроченные </label>
        </div>
    </list-to>
    <div style="width: 10px;"></div>
    <list-to class="col p-0" :value="listFrom" :actions="{ fromSklad }" name="list-to">
        <div class="row p-2 form-check" style="text-align: left; height: 40px;">
            <div class="col"> На складе </div>
        </div> 
    </list-to>
</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { moment, daysDiff } from '@/functions'
import ListTo from "./components/ListTo"
import { Confirm } from '@/widgets'
export default {
    components: { ListTo },
    data() {
        return {
            showOver: false,
        }
    },
    computed: {
        ...mapGetters({
            map: 'reestr/map',
            empty: 'reestr/empty',
            dt200: 'reestr/dt200',
            date: 'date',
            isAdmin: 'isAdmin'
        }),
        values({ empty, map, isOver }) {
            return Object.values(empty)
                .map(v => ({...map[v._id]}))
        },
        listTo({ showOver, values }) {
            return !showOver ? values
                : values.filter(this.isOver)
        },
        listFrom({ dt200, map }) {
            return dt200.map(v => ({...map[v._id]}))
                .map(v => ({ ...map[v.ref], ...v }))
        }
    },
    methods: {
        ...mapActions({
            fromSklad: 'reestr/fromSklad',
            save: 'reestr/save',
            removeReestr: 'reestr/remove'
        }),
        isOver({ date, days, statment }) {
            const plan = moment(date).add(days, 'd').add({ ...statment}.days, 'd')                       
            return daysDiff(plan, moment(this.date)) + 1 < 0
        },
        toSklad({ _id: ref, klient, ocenca, deleted }) {
            if (deleted) return
            const values = {ref, klient: klient._id, values: [
                { dt: '200', ct: '377', summ: ocenca }
            ]}
            return this.save(values)
        },
        async remove(v) {
            const { number, deleted: description } = {...this.map[v._id]}
            const t = v => this.$t(`confirm.${v}`)
            const html = `<p>${t('enter')} <strong style='color: red;'>${number}</strong> ${t('to confirm')}</p>`
            const action = (description, title) => this.removeReestr({...v, description, title})
            const validate = v => number == v
            const value = { title: 'remove', html, description }
            this.$modal.show(Confirm, { value, action, validate })
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
