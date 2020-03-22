import { mapGetters, mapActions } from 'vuex'
import { Kassa, Klient, Obespechenie } from './imports'

export default {
components: { Kassa, Klient, Obespechenie },
watch: {
    // date(v) {
    //     const { date } = this.bilet
    //     if (date && !moment(date).isSameOrBefore(v, 'date')) this.update({})
    // },
    // bilet({ _id, number }) {
    //     if (_id && !number) this.update({})
        
    // }
},
data () {
    return {}
},
computed: {
    ...mapGetters({
        klientMap: 'klient/map',
        reestrMap: 'reestr/map',
        used: 'reestr/used',
        date: 'date',
        company: 'company'
    })
},
methods: {
    ...mapActions({
        save: 'reestr/save'
    }),
    saveBilet(v) {
        return this.$refs['kassa'].save(v)
    },
    t(name, value) {
        return this.$t(`${name}.${value}`)
    }
}
}