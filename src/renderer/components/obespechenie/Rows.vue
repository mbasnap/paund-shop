<template>
    <tr><slot ></slot></tr>
</template>

<script>
export default {
props: { value: Object},
provide () {
    const { value, input } = this
    return { value, input }
},
computed: {
    ves() {
        return this.value['proba']
    }
},
methods: {
    input({ name, value }) {
        // this.value[name] = value
        const { ves } = this
        Object.assign(this.value, { [name]: value, ves })
        this.$emit('input')
    }
}
}
</script>

<style>

</style>