<template>
    <tr style="height: 30px; ">
        <td style="font-size: 10px;">{{ value ? index : '' }}</td>
        <td style="font-size: 10px;">
            <div style=" overflow: hidden; max-width: 300px; text-overflow: ellipsis; white-space: nowrap;">
                {{ model.title }}
            </div>
        </td>
        <td style="font-size: 10px;">{{ model.proba }}</td>
        <td style="text-align: right; font-size: 10px;">{{ toDouble(model.ves) }}</td>
        <td style="text-align: right; font-size: 10px;">{{ toDouble(model.derty) }}</td>
        <td style="text-align: right; font-size: 10px;">{{ toDouble(model.total) }}</td>
        <td style="text-align: right; font-size: 10px;">{{ toDouble(model.ocenca) }}</td>
    </tr>
</template>

<script>
import { toDouble, toNumber } from '@/functions'
export default {
props: { value: Object, index: Number },
computed: {
    model({ value }) {
        // console.log(value);
        
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