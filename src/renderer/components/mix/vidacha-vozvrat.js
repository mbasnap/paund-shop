import { mapGetters } from 'vuex'
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
computed: {
    ...mapGetters({
        map: 'klient/map',
        order: 'reestr/nextOrder'
    })
},
methods: {
    async save() {
        // console.log(this.values);
        const { _id: klient, passport } = await this.$refs['klient'].save(this.klient)
        await this.$refs['kassa'].save({ ...this.values, klient, passport })
        return this.update()
    },
    update(v) {
        const { klient, passport, obespechenie } = this.bilet = { ...v }
        this.klient = { ...this.map[klient], passport }
        this.obespechenie = obespechenie || [ {} ]
    }
}
}