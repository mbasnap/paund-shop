<template>
    <div>
        <div class="row" style="margin-top: -11px;">
          <div class="col " style="font-size: 14px;">
                <strong>{{company.logo}}</strong>
            </div>
        </div>
        <div class="row border-left border-bottom">
            <div class="col-5 border-top border-right">
                <div class="row ">
                    <div class="col-1 border-right">1</div>
                    <div class="col" >{{ t('data-zaima') }}</div>
                </div>
            </div>
            <div class="col ">{{ bilet.date }}</div>
        </div>
        <div class="row border-left border-bottom">
            <div class="col-5  border-right">
                <div class="row ">
                    <div class="col-1 border-right">2</div>
                    <div class="col pr-0" style="font-size: 14px;" >{{ t('summ-zaima') }}</div>
                </div>
            </div>
            <div class="col ">
                {{ bilet.ocenca }}
                <span style="font-size: 11px; font-style: italic;">{{ t('curency') }}</span>
            </div>
        </div>
        <div class="row border-left">
            <div class="col-5  border-right">
                <div class="row ">
                    <div class="col-1 border-right">3</div>
                    <div class="col" style="font-size: 14px; line-height: 24px;">
                        {{ t('zaiomshik') }}
                    </div>
                </div>
            </div>
            <div class="col p-0 "
            style="font-size: 14px; line-height: 15px;">
                {{ fio }}
            </div>
        </div>

        <div class="row border-bottom border-left" style="height: 20px; line-height: 22px;">
            <span class="pl-1 pr-1" style="font-size: 12px;" >
                {{ t('passport') }}: {{ passport }} {{ issued }} {{ idn }} {{ nationality }}
            </span>
        </div>
        <div class="row border-bottom border-left" style="height: 20px;"> </div>
        <div class="row border-bottom border-left" style="height: 20px; line-height: 22px;">
            <span class="pl-1 pr-1" style="font-size: 12px;" >
                {{ t('address') }}: {{ address }}
            </span>
        </div>
        <div class="row border-bottom border-left" style="height: 20px; line-height: 22px;">
            <span class="pl-1 pr-1" style="font-size: 12px;" >
                {{ t('bithday') }}: {{ bithday }} {{ klient.city }}
            </span>
        </div>
        <div class="row border-bottom border-left" style="height: 20px; line-height: 22px;">
            <span class="pl-1 pr-1" style="font-size: 12px;" >
                {{ phone }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
props: { value: Object },
inject: ['t'],
computed: {
    bilet({ value }) {
        return { ...value }
    },
    company({ bilet }) {
        return { ...bilet.company }
    },
    ssuda({ bilet }) {
        return { ...bilet.ssuda }
    },
    fio({ bilet }) { 
        return bilet.from
    },
    passport({ bilet }) {
        const { seria, number } = { ...bilet.doc}
        return `${seria || ''} ${number || ''}`
    },
    issued({ bilet }) {
        const { issued } = { ...bilet.doc}
        return issued ? `, выдан: ${issued}` : ''
    },
    klient({ bilet }) {
        return { ...bilet.klient}
    },
    idn({ klient }) {
        const { idn } = klient
        return idn ? `, инн: ${idn}` : ''
    },
    address({ klient }) {
        const { post = '', city = '', street = '', home = ''  } = { ...klient.address }
        if ([post, city, street, home].every(v => !v)) return ''
        return `${post} ${city} ${street} ${home}`
    },
    nationality({ klient }) {
        const { nationality } = {...klient.passport}
        return nationality ? `, ${this.t('nationality')} ${nationality}` : ''
    },
    bithday({ klient }) {
        const { bithday = '', cityBith = '' } = klient
        return `${bithday} ${cityBith}`
    },
    phone({ klient }) {
        const { phone } = klient
        return phone ? `тел: ${phone}` : ''
    }
},

methods: {}
}
</script>

<style>

</style>