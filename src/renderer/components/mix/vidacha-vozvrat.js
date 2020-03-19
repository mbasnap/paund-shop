import { mapGetters } from 'vuex'
import { Kassa, Klient, Obespechenie } from './imports'
import { moment } from '@/functions'

export default {
components: { Kassa, Klient, Obespechenie },
watch: {
    date(v) {
        const { date } = this.bilet
        if (date && !moment(date).isSameOrBefore(v, 'date')) this.update({})
    },
    bilet({ _id, number }) {
        if (_id && !number) this.update({})
        
    }
},
data () {
    return {
        klient: {},
        bilet: {},
        obespechenie: [{}],
        type: 'gold'

    }
},
computed: {
    ...mapGetters({
        klientMap: 'klient/map',
        reestrMap: 'reestr/map',
        used: 'reestr/used',
        date: 'date'
    })
},
methods: {
 
    saveBilet(v) {
        return this.$refs['kassa'].save(v)
    },
    update(v) {
        const { klient, obespechenie, zalog: type } = this.bilet = { ...v }        
        this.klient = { ...this.klientMap[klient] }
        this.type = type || 'gold'
        this.obespechenie = obespechenie || [ {} ]
    },
    changeType(v) {
        this.type = !v ? 'gold' : 'things'
    },
    onCopy(id) {
        const  bilet = { ...this.reestrMap[id] }
        const ref = this.reestrMap[bilet.ref]
        const { klient, passport, obespechenie, ocenca, days, discount, zalog: type } = ref || bilet
        this.update({ klient, passport, obespechenie, ocenca, days, discount, type })
    },
    t(v) {
        return this.$t(v)
    }
}
}