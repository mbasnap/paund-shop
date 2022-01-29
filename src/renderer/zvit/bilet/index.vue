<template> 
	<div ref="print-content" :style="{ zoom: zoom + '%' }">
		<div class="mt-3 mb-3">
			<spec :value="bilet" class="mb-3" />
			<obespechenie :value="bilet"/>
			<div class="row m-0" style="font-style: italic;">
				<span class="pl-4 pr-5"><strong>М.П.</strong></span>
				<span class="p-1" style="border: 2px solid;">
					{{t('short-phone')}}
					<strong>{{ bilet.company.phone }}</strong>
				</span>
				<div class="col" style="text-align: right; font-size: 10px;">{{ t('prinal_kassir') }}</div>
				<sign class="col-3" style="margin-top: 20px;" :name="t('kassir_sign')"/>
				<span style="font-size: 10px;">{{ kassir }}</span>
			</div>
		</div>
		<div class="mt-5 mb-5" style="border: 1px dashed;"></div>
		<div class="mt-3 ">
			<spec :value="bilet" class="mb-3"/>
			<div class="row">
				<obespechenie class="col-9" :value="bilet" style="font-size: 10px;"/>
				<div class="col-3" style="border-top: 1px dashed; border-left: 1px dashed;">
					<control-tiket  :value="bilet"/>
				</div>
			</div>
			<div class="row m-0" style="font-style: italic;">
				<div class="col-9">
					<div class="row">
						<span class="pl-4 pr-5"><strong>М.П.</strong></span>
						<div class="col-5" style="text-align: right; font-size: 10px;">{{ t('prinal_kassir') }}</div>
						<sign class="col" style="margin-top: 15px;" :name="t('kassir_sign')">
							<div class="col" style="margin-top: -15px; text-align: left;">{{ kassir }}</div>
						</sign>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { moment } from '@/functions'
import { mapGetters } from 'vuex'
import ModalEditor from '@/components/ModalPrint'
import Obespechenie from './obespechenie'
import Spec from './spec'
import ControlTiket from './control-tiket'
import Sign from './Sign'
export default {
	components: { ModalEditor, Spec, Obespechenie, ControlTiket, Sign },
	props: ['value'],
	provide() {
		return { t: this.t }
	},
	data() {
		return {
			zoom: '90'
		}
	},
	computed: {
		...mapGetters({
			reestr: 'reestr/map',
			usersMap: 'usersMap'
		}),
		bilet() {
			const value = this.value.ref ? this.reestr[this.value.ref] : this.value || {}
      const { klient, doc, from, company } = this.value
			const date = moment(value.date).isValid() ? moment(value.date).format('L') : value.date
			const returnDate = moment(date, 'L').add(value.days, 'd').format('L')
			return { ...value, klient, doc, from, date, returnDate, company }
		},
		kassir({ value, usersMap }) {
			const { fio } = {...usersMap[value.user]}
			const { family = '', name = '', sername = '' } = fio || {}
			return `${family} ${name.charAt(0)}.${sername.charAt(0)}.`
		},
		printContent({ $refs }) {
			return $refs['print-content']
		}
	},
	methods: {
		t(v) {
			return this.$t('zvit.' + v)
		},
		print({ send }) {
			const { outerHTML: content } = this.printContent
			return send("print", { content, zoom: '149%', silent: true })
		},
		onZoom({ value }) {
			this.zoom = value + ''  
		}
	}
}
</script>
<style>
.print-only {
    display: none;
}
</style>