<template>
    <div class="tabcontent"  >
        <div v-for="({ name, teg, type, format }) in fields" :key="name" class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label">{{ t(name) }}</label>
            <div class="col">
                <component :is="teg" :type="type" :class="['form-control', { 'is-invalid': err[name] }]" :name="name"
                :value="format(value[name])" @input="input($event.target, format)"
                @change="onChange"
                >{{ format(value[name]) }}</component>
                <!-- <div v-show="err[name]" class="invalid-feedback">{{ t('err', err[name]) }}</div> -->
            </div>
        </div>
        <div class="col mb-3"><slot></slot></div>
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
        input({ name, value }, format) {
            // this.$nextTick(() => {
                this.$emit('input', { name, value: format(value) })
            // })
        },
        t(v) {
        return this.$t(`${this.tabname}.${v}`)
        }
    }
}
</script>

<style>

</style>