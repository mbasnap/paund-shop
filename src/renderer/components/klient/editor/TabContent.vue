<template>
	<div class="tabcontent">
		<slot name="prepend"></slot>
		<div v-for="({ name, teg, type, format }) in fields" :key="name" class="form-group row m-0 mt-2">
			<label class="col-sm-4 col-form-label">{{ t(name) }}</label>
			<div v-if="value" class="col">
				<component 
					:ref="name" :is="teg" :type="type" :class="['form-control', { 'is-invalid': err && err[name] }]" :name="name"
				:value="format(value[name])" @input="input($event.target, format)"
				@change="onChange" @enter="focus(name)"
				>{{ format(value[name]) }}</component>
			</div>
		</div>
		<div class="col my-3"><slot name="append"></slot></div>
	</div>
</template>

<script>
export default {
	props: { value: Object, tabname: String, err: Object, items: Array,
		format: { type: Function, default: v => v }
	},
	inject: ['onChange'],
	computed: {
		fields({ items }) {
			return items.map(v => {
				const { name = v, teg = 'input', type = 'text', format = this.format } = v
				return { name, teg, type, format }
			})
		}
	},
	methods: {
		focus(name) {
			if (name) this.$refs[name].focus()
		},
		input({ name, value }, format) {
			this.$emit('input', { name, value: format(value) })
		},
		t(v) {
			return this.$t(`${this.tabname}.${v}`)
		}
	}
}
</script>

<style>

</style>