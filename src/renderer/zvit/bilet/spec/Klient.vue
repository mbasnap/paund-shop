<template>
    <div>
        <div class="row" style="margin-top: -10px;">
          <div class="col " style="font-size: 18px;">
                <strong>{{company.name}}</strong>
            </div>
        </div>
        <div class="row border-left">
            <div class="col-5 border-top border-right">
                <div class="row ">
                    <div class="col-1 border-right">1</div>
                    <div class="col" >{{ t('data-zaima') }}</div>
                </div>
            </div>
            <div class="col border-bottom">{{ bilet.date }}</div>
        </div>
        <div class="row border-left">
            <div class="col-5 border-top border-right">
                <div class="row ">
                    <div class="col-1 border-right">2</div>
                    <div class="col pr-0" style="font-size: 14px;" >{{ t('summ-zaima') }}</div>
                </div>
            </div>
            <div class="col border-bottom">{{ bilet.ocenca }}</div>
        </div>
        <div class="row border-left">
            <div class="col-5 border-top border-right">
                <div class="row ">
                    <div class="col-1 border-right">3</div>
                    <div class="col" style="font-size: 14px; line-height: 24px;">
                        {{ t('zaiomshik') }}
                    </div>
                </div>
            </div>
            <div class="col p-0 border-bottom"
            style="font-size: 14px; line-height: 24px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                {{ fio }}
            </div>
        </div>
        <div class="row border-left">
            <div class="col-5 border-top border-right" >
                <div class="row ">
                    <div class="col-1 border-right">4</div>
                    <div class="col pr-0" style="font-size: 14px;">{{ t('srok-vozvrata') }}</div>
                </div>
            </div>
            <div class="col border-bottom">{{ bilet.returnDate }}</div>
        </div>
        <div class="row border-left">
            <div class="col-5 border-top border-right">
                <div class="row border-bottom">
                    <div class="col-1 border-right">5</div>
                    <div class="col" >{{ t('srok-zaima') }}</div>
                </div>
            </div>
            <div class="col border-bottom">{{ bilet.days }} дней</div>
        </div>

        <div class="row border-bottom" style="height: 20px;  line-height: 22px;">
            <span class="pr-1" style="font-size: 12px;" >
                {{ t('passport') }}: {{ passport }}, выдан: {{ issued }}, инн: {{ idn }}
            </span>
        </div>
        <div class="row border-bottom" style="height: 20px;"> </div>
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
        const { seria, number, issued, inn } = { ...bilet.doc}
        return `${seria} ${number}`
    },
    issued({ bilet }) {
        return { ...bilet.doc}.issued
    },
    idn({ bilet }) {
        
        return { ...bilet.klient}.idn
    }
},

methods: {}
}
</script>

<style>

</style>