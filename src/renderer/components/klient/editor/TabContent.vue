<template>
	<div class="tabcontent">
		<slot name="prepend"></slot>
		<div v-for="({ name, is, type, format = (v) => v, rules, value: text }) in fields" :key="name" class="form-group row m-0 mt-2">
			<label class="col-sm-4 col-form-label">{{ text || t(name) }}</label>
			<div v-if="value" class="col">
				<component 
					:ref="name" 
					:is="is"
					:type="type" 
					:class="['form-control', ...rules.map((rule) => rule(value[name])) ]" 
					:name="name"
					:value="format(value[name])" 
					@input="input($event.target, format)"
					@change="onChange" 
					@enter="focus(name)"
				>{{ format(value[name]) }}</component>
			</div>
		</div>
		<div class="col my-3"><slot name="append"></slot></div>
	</div>
</template>

<script>
export default {
	props: ['value', 'tabname', 'err', 'items', 'format'],
	inject: ['onChange'],
	computed: {
		fields({ items }) {
			return items.map(v => {
				const { name = v, is = 'input', type = 'text', format = this.format, rules = [], value } = v
				return { name, is, type, format, rules, value }
			})
		}
	},
	methods: {
		focus(name) {
			if (name) this.$refs[name].focus()
		},
		validate(rules) {

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

<style scoped>
	.tabcontent .danger {
		color: red;
		border: 1px solid red;
	}
	.tabcontent .warning {
		color: rgb(255, 166, 0);
		border: 1px solid   rgb(255, 166, 0);
	}

</style>