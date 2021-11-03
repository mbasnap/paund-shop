<template> 
	<modal-editor :title="'Печать'" @print="print" :loading="loading">
		<div >
			<div class="tabs" >
				<a v-for="({ name }, i) in tabs" :key="i" :class="{ active: activetab === i }"
				@click="activetab = i" > {{ name }} </a>
			</div>
			<div class="content" ref="print-content">
				<component v-for="({ tag, value }, i) in tabs" :key="i" 
				:is="tag" 
				class="tabcontent"
				v-show="activetab === i" :value="value">
				</component>
			</div> 
		</div>
	</modal-editor>
</template>
<script>
const { ipcRenderer } = require('electron')
import { mapGetters } from 'vuex'
import ModalEditor from '@/components/ModalPrint'
import Bilet from './bilet'
import Order from './order'
export default {
	components: { ModalEditor, Bilet, Order },
	props: ['value'],
	data() {
		return {
			activetab: 0,
			zoom: '85%',
			loading: false
		}
	},
	created() {
		ipcRenderer.on('print-end', () => {
			this.loading = false
		})
	},
	computed: {
		...mapGetters({
			settings: 'settings',
		}),
		model() {
			return this.value || {}
		},
		tabs({ model }) {
			const { number } = model
			const {order} = this.value
			const dt = order.dt && { tag:'Order', name: `ПКО № ${order.dt}`, value: {...this.model, type: 'dt'} }
			const ct = order.ct && { tag:'Order', name: `РКО № ${order.dt}`, value: {...this.model, type: 'ct'} }
			const bilet = { tag: 'Bilet', name: number ? `${this.t('bilet')} № ${number}` : false, value: this.model }     
			return [bilet, dt, ct].filter((v) => v)
		},
		tabName({ activetab, tabs }) {
			const { tag } = tabs[activetab]
			return tag.toLowerCase()
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
			this.loading = true
			const { zoom, silent } = this.settings[this.tabName]
			const { outerHTML: content } = this.$refs['print-content']
			send("print", { content, zoom, silent })
		}
	}
}
</script>
<style>
.print-only {
    display: none;
}
</style>