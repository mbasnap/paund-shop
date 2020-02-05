import { mapGetters } from 'vuex'
import { Kassa, Klient, Obespechenie } from './imports'
export default {
components: { Kassa, Klient, Obespechenie },
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
        used: 'reestr/used'
    })
},
methods: {
    async save() {
        const { _id: klient, passport } = await this.$refs['klient'].save(this.klient)
        await this.$refs['kassa'].save({ ...this.values, klient, passport })
        return this.update()
    },
    update(v) {
        const { klient, passport, obespechenie, type } = this.bilet = { ...v }        
        this.klient = { ...this.klientMap[klient], passport }
        this.type = type || 'gold'
        this.obespechenie = obespechenie || [ {} ]
    },
    changeType(v) {
        this.type = !v ? 'gold' : 'things'
    },
    onCopy(id) {
        const  bilet = { ...this.reestrMap[id] }
        const ref = this.reestrMap[bilet.ref]
        const { klient, passport, obespechenie, ocenca, days, discount, type } = ref || bilet
        this.update({ klient, passport, obespechenie, ocenca, days, discount, type })
    },
    t(v) {
        return this.$t(v)
    }
}
}