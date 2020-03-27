<template>
    <div class="tabcontent"  >
        <div v-for="({name, teg, type}) in fields" :key="name" class="form-group row m-0 mt-2">
            <label class="col-sm-4 col-form-label">{{ t(name) }}</label>
            <div class="col">
                <component :is="teg" :type="type" class="form-control" :name="name"
                :value="value[name]" @input="$emit('input', $event.target)">{{ value[name] }}
                </component>
                <!-- <div v-if="err[name]" class="invalid-feedback">{{ t('err', err[name]) }}</div> -->
            </div>
        </div>
        <div class="col mb-3"><slot></slot></div>
    </div>
</template>

<script>
export default {
    props: { value: Object, items: Array, tabname: String },
    computed: {
        fields({ items }) {
            return items.map(v => {
                const { name = v, teg = 'input', type = 'text' } = v
                return { name, teg, type }
            })
        }
    },
    methods: {
        t(v) {
        return this.$t(`${this.tabname}.${v}`)
        }
    }
}
</script>

<style>

</style>