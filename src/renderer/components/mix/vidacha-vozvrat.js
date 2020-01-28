import { mapGetters, mapActions } from 'vuex'
import { round, toNumber, toDouble, summ, mult, diff, pDiff, moment } from '@/functions'
import { Kassa, Klient, Obespechenie } from './imports'
export default {
components: { Kassa, Klient, Obespechenie },
data () {
    return {
        klient: {},
        bilet: {},
        obespechenie: [{}],
    }
},
watch: {
    procent({ summ }) {
        // const { ocenca, correct } = this.bilet
        // console.log(summ, ocenca, correct);
        
        // const [main] = oc
        
        // this.update()
    }
},
computed: {
    ...mapGetters({
        date: 'date',
        klients: 'klient/map',
        settings: 'settings',
        nextNumber: 'reestr/nextNumber',
        order: 'reestr/nextOrder'
    }),
    ocenca({ bilet, obespechenie }) {
        const ocenca = toNumber(bilet.ocenca)
            || summ(...obespechenie.map(v => v.ocenca))
        return toDouble(ocenca)
    },
    number({ bilet, nextNumber }) {
        return bilet.number || nextNumber
    },   
    days({ bilet, settings }) {
        return bilet.days || settings.maxDays
    },
    discounts({ settings }) {
        return settings.discounts || []
    },
    xProc({ settings }) {
        return { ...settings.procent }
    },
    xPen({ settings }) {
        return { ...settings.penalty }
    },
    discount({ bilet, discounts }) {
        return bilet.discount || discounts[0]
    },
    type({ bilet }) {
        return bilet.type || 'gold'
    },
    passport({ klient }) {
        console.log(klient);
        
        return klient.passport || 0
    },
    model({ number, passport, order, type, ocenca, days, procent, discount, penalty }) {
        return { number, passport, order, type, ocenca, days, procent, discount, penalty }
    },
},
methods: {
    async save() {
        console.log(this.klient);
        
        const { _id: klient, passport } = await this.$refs['klient'].save(this.klient)
        await this.$refs['kassa'].save({ ...this.values, klient, passport })
        return this.update()
    },
    update(v) {
        const { klient, passport, obespechenie } = this.bilet = { ...v }
        this.klient = { ...this.klients[klient], passport }
        this.obespechenie = obespechenie || [ {} ]
    },
    onInput(v) {
        this.bilet = v
    }
}
}