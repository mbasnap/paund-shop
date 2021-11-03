<template> 
	<div ref="printer-content">
		<component
		:is="`${type}-order`"
		:title="t(type)" 
		:date="date" 
		:value="model"/>
	</div>
</template>
<script>
import { moment, months } from '@/functions'
import CtOrder from './CtOrder'
import DtOrder from './DtOrder'
export default {
	components: { DtOrder, CtOrder },
	props: ['value'],
	data() {
		return {
			zoom: '85%'
		}
	},
	computed: {
		model() {
			return this.value || {}
		},
		date({ model }) {
			const date = moment(model.date, 'L')
			const day = date.format('DD')
			const month = months.format[date.month()]
			const year = date.format('YYYY')
			return `«${day}» ${month} ${year} г.`
		},
		type() {
			return this.model.type
		},
		printContent({ $refs }) {
			return $refs['printer-content']
		}
	},
	methods: {
		t(v) {
			return this.$t('order.' + v)
		},
		onZoom({ value }) {
			this.zoom = value + ''    
		},
		print({ send }) {
			const { outerHTML: content } = this.printContent
			send("print", { content, zoom: '115%', silent: true})
		}
	}
}
</script>
<style>
.print-only {
	display: none;
}
</style>