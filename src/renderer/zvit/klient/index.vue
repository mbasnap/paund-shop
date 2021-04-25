<template> 
	<modal-editor :title="t('title', 'klient-report')" @print="print" :loading="loading">
	<div class="tabs" >
		<a v-for="(item) in tabs" :key="item" :class="{ active: activetab === item }"
		@click="activetab = item" > {{ t('tabs', item) }} </a>
	</div>
	<div class="content" ref="printer-content">
		<div class="tabcontent" v-show="activetab === 'questionnaire'" >
			<questionnaire  :value="value"/>
		</div>
		<div class="tabcontent" v-show="activetab === 'questionnaire2'" >
			<questionnaire-two  :value="value"/>
		</div>
	</div>
	</modal-editor>
</template>
<script>
const { ipcRenderer } = require('electron')
import ModalEditor from '@/components/ModalPrint'
import Questionnaire from './Questionnaire'
import QuestionnaireTwo from './QuestionnaireTwo'
export default {
	components: { ModalEditor, Questionnaire, QuestionnaireTwo },
	props: { value: Object },
	data() {
		return {
			activetab: 'questionnaire',
			tabs: ['questionnaire', 'questionnaire2'],
			loading: false
		}
	},
	created() {
		ipcRenderer.on('print-end', () => {
			this.loading = false
		})
	},
	methods: {
		get(key, name) {
			return this[key][name]
		},
		t(name, value) {
			return this.$t(`${name}.${value}`)
		},
		print({ send }) {
			this.loading = true
			const { outerHTML: content } = this.$refs['printer-content']
			send("print", { content, zoom: '150%', silent: true  })
		}
	}
}
</script>
<style>
.print-only {
	display: none;
}
</style>