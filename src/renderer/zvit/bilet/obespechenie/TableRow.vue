<template>
    <tr style="height: 30px; font-size: 14px;">
        <td>{{ value ? index : '' }}</td>
        <td>{{ model.title }}</td>
        <td>{{ model.proba }}</td>
        <td>{{ model.ves }}</td>
        <td>{{ model.derty }}</td>
        <td>{{ model.ocenca }}</td>
    </tr>
</template>

<script>
export default {
props: { value: Object, index: Number },
computed: {
    model({ value }) {
        return { ...value }
    }
}
}
</script>

<style>

</style>