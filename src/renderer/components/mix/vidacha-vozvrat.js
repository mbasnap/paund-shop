import { mapGetters, mapActions } from 'vuex'
import { Kassa, Klient, Obespechenie } from './imports'

export default {
components: { Kassa, Klient, Obespechenie },
computed: {
	...mapGetters({
		klientMap: 'klient/map',
		reestrMap: 'reestr/map',
		used: 'reestr/used',
		date: 'date',
		company: 'company',
		empty: 'reestr/empty'
	}),

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
	},
	deleted({ deleted }) {
		return !deleted
	}
}
}