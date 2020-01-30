<template>
    <tr style="height: 30px; font-size: 14px;">
        <td>{{ value ? index : '' }}</td>
        <td>
            <div style="overflow: hidden; max-width: 300px; text-overflow: ellipsis; white-space: nowrap;">
                {{ model.title }}
            </div>
        </td>
        <td>{{ model.proba }}</td>
        <td>{{ toDouble(model.ves) }}</td>
        <td>{{ toDouble(model.derty) }}</td>
        <td>{{ toDouble(model.total) }}</td>
        <td>{{ toDouble(model.ocenca) }}</td>
    </tr>
</template>

<script>
import { toDouble, toNumber } from '@/functions'
export default {
props: { value: Object, index: Number },
computed: {
    model({ value }) {
        console.log(value);
        
        return { ...value }
    }
},
methods: {
    toDouble(v) {
        return toNumber(v) ? toDouble(v) : ''
    }
}
}
</script>

<style>

</style>