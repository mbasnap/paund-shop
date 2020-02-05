<template>
    <div>
        <div class="row " v-if="label">
            <div class="col-6 p-0"></div>
            <div class="col border-bottom">{{ label }}</div>
            <div class="col border-bottom"></div>
        </div>
        <div class="row ">
            <div class="col-6 p-0 pt-2 ">
                <div class="row" >
                    <div class="col">
                        <slot></slot>
                    </div>
                </div>
            </div>
            <div class="col" style="font-size: 11px;">
                <div class="row" style="height: 40px;">
                    <div class="col border-bottom border-left">{{kod.name}}</div>
                </div>
                <div class="row" style="height: 55px;">
                    <div class="col border-bottom border-left">{{idn.name}}</div>
                </div>
            </div>
            <div class="col " style="font-size: 11px;">
                <div class="row" style="height: 40px; font-size: 14px;">
                    <div class="col pt-2 border-bottom border-left border-right">{{kod.value}}</div>
                </div>
                <div class="row" style="height: 55px; font-size: 14px;">
                    <div class="col pt-2 border-bottom border-left border-right">{{idn.value}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        label: String,
        value: Object
    },
    computed: {

        kod({ value }) {
            return {
                name: 'код финансового учреждения',
                value: value.kod
            }
        },
        idn({ value }) {
            const { idn, title } = value
            return { name: title, value: idn }
        },
    }

}
</script>

<style>

</style>