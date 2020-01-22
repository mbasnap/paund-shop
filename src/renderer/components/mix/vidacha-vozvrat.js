import { mapGetters, mapActions } from 'vuex'
// import { toNumber, toDouble, summ, mult, diff, pDiff, moment } from '@/functions'
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
    date() {
        // this.update()
    }
},
computed: {
    ...mapGetters({
        date: 'date',
        klients: 'klient/map',
        settings: 'settings',
        nextNumber: 'reestr/nextNumber',
        nextOrder: 'reestr/nextOrder'
    }),
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
        return settings.procent
    },
    xPen({ settings }) {
        return settings.penalty
    },
    discount({ bilet, discounts }) {
        return bilet.discount || discounts[0] || 10
    },
    order({ klient, nextOrder, type }) {
        const { family, name, sername, passports, passport } = klient
        const from = `${family} ${name} ${sername}`
        const doc = { ...passports[passport] }
        return { [type]: '002', from, doc, type, number: nextOrder[type] } 
    }
},
methods: {
    async save() {
        await this.$refs['klient'].save(this.klient)
        await this.$refs['kassa'].save(this.values)
        return this.update()
    },
    update(v) {
        const { klient, passport, obespechenie } = this.bilet = { ...v }
        this.klient = { ...this.klients[klient], passport }
        this.obespechenie = obespechenie || [ {} ]
    }
}
}