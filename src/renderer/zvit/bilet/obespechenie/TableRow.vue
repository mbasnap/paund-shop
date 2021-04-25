<template>
    <tr style="height: 30px; font-size: 14px;">
        <td style="">{{ value ? index : '' }}</td>
        <td style="">
            <div style=" overflow: hidden; max-width: 300px; text-overflow: ellipsis; white-space: nowrap;">
                {{ model.title }}
            </div>
        </td>
        <td style="">{{ model.proba }}</td>
        <td style="text-align: right; ">{{ toDouble(model.ves) }}</td>
        <!-- <td style="text-align: right; ">{{ toDouble(model.derty) }}</td> -->
        <td style="text-align: right; ">{{ toDouble(model.total) }}</td>
        <td style="text-align: right; ">{{ toDouble(model.ocenca) }}</td>
    </tr>
</template>

<script>
import { toDouble, toNumber } from '@/functions'
export default {
props: { value: Object, index: Number },
computed: {
    model({ value }) {
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