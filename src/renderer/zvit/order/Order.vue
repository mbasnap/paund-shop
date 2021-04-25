<template>
<div class="row">
    <div class="col">
        <header-row label="Приложение 2" :value="{ kod: company.kod,
                idn: company.idn, title: 'идентификационный код юр.лица'
            }">
            <div class="row">
                <div class="col" style="text-align: center;">
                    <strong class="border-bottom">{{ company.logo }}</strong>
                </div>
            </div>
            <div class="row" style="font-size: 10px;" >
                <div class="col" style="text-align: center;">
                    (наименование финансового учреждения)
                </div>
            </div>
        </header-row>
        <div class="row mt-1" style="font-size: 18px;">
            <div class="col" style="text-align: center;">
                <strong>{{ title }} № {{ order }}</strong>
            </div>
        </div>
        <div class="row mt-1" style="font-size: 14px;">
            <div class="col" style="text-align: center;">от {{ date }}</div>
            <div class="col" style="text-align: center;"></div>
            <div class="col" style="text-align: center;">время {{ time }}</div>
        </div>
        <div class="row mt-1" style="font-size: 14px;">
            <div class="col-4  border-top border-bottom" style="text-align: center;">
                <div class="row" style="height: 30px;">
                    <div class="col border-bottom border-left">Цифровой код валюты</div>
                </div>
                <div class="row" style="height: 30px;">
                    <div class="col border-bottom border-left">Сумма (рос.руб.)</div>
                </div>
                <div class="row" style="height: 30px;">
                    <div class="col border-left">Сумма прописью</div>
                </div>
            </div>
            <div class="col border-top border-bottom" style="text-align: center;">
                <div class="row" style="height: 30px;">
                    <div class="col border-bottom border-left border-right">{{ acc301}}</div>
                </div>
                <div class="row" style="height: 30px;">
                    <div class="col border-bottom border-left border-right">{{ short(value.summ) }}</div>
                </div>
                <div class="row" style="height: 30px; text-align: left; font-size: 14px;">
                    <div class="col p-0 border-left border-right" style="line-height: 16px;">
                        {{ toWordsRu }}
                    </div>
                </div>
            </div>
        </div>
        <header-row :value="{ kod: company.kod,
                idn: passport.idn, title: 'идентификационный код юридического лица/индивидуальный налоговый номер'
            }">
            <div class="row pl-2" style="font-size: 14px;">
                <div class="col-4 pr-0" >
                    {{ type === 'dt' ? 'Принято от' : 'Выдать' }}
                </div>
                <div class="col p-0" >{{ fullName }}</div>
            </div>
            <div class="row m-0" style="font-size: 9px;" >
                <div class="col border-top" style="text-align: center;">
                    (наименование финансового учрежденияб фамилия, имя, отчество)
                </div>
            </div>
        </header-row>
        <bodys-row label="Назначение платежа" 
        :value="{
            name: '(сбор, подкрепление наличной валюты, выдача кредита, и др.)',
            value: purposeOfPayment
        }"/>
        <sign v-if="type !== 'dt'" label="Руководитель" :value="company.director"/>
        <sign label="Главный бухгалтер" :value="company.bookkeeper"/>
        <sign :label="type === 'dt' ? 'Получил кассовый работник' : 'Выдал кассовый работник'" :value="kassir"/>
        <bodys-row :label="from2" 
        :value="{
            name: '(должность, фамилия, имя, отчество / фамилия, имя, отчество физического лица заёмщика)',
            value: fullName
        }"/>
        <bodys-row :label="type === 'dt' ? 'Паспорт плательщика' : 'Паспорт получателя'"
        :value="{
            name: '(серия, номер, кем и когда выдан)',
            value: docToString
        }"/>

        <div class="row mt-2" style="font-size: 14px; text-align: right;">
            <div class="col">{{ date }}</div>
            <div class="col" >
                {{ type === 'dt' ? 'Подпись плательщика' : 'Подпись получателя' }}
            </div>
            <div class="col border-bottom">
                <div class="row m-0 p-0"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { numberFormat, moment } from '@/functions'
import numberToWordsRu from 'number-to-words-ru'
import { HeaderRow, Sign, BodysRow } from './components'
export default {
    components: { HeaderRow, Sign, BodysRow },
  props: {
    title: String,
    date: String,
    value: Object,
    type: String
  },
  computed: {
    ...mapGetters({
        company: 'company',
        map: 'klient/map',
        // accounts: 'accounts',
        usersMap: 'usersMap'
    }),
    company({ value }) {
        return { ...value.company }
    },
    klient({ value }) {
        return { ...value.klient }
    },
    kassir({ value, usersMap }) {
        const { fio } = {...usersMap[value.user]}
        const { family = '', name = '', sername = '' } = {...fio}
        return `${family} ${name.charAt(0)}.${sername.charAt(0)}.`
    },
    acc301() {
      return '643'
    },
    time({ value }) {
      return { ...value}.time
    },
    values({value}) {
      return value.values || []
    },
    toWordsRu({ value }) {
      return numberToWordsRu.convert(value.summ)
    },
    iType({ type }) {
        return type === 'dt' ? 'ct' : 'dt'
    },
    accounts({ company, iType }) {
        return company.accounts[iType].reduce((cur, {acc, title}) => {
            return {...cur, [acc]: title }
        }, {})
    },
    acc({ value, iType, accounts  }) {
        return accounts[value[iType]]
    },
    purposeOfPayment({ value, acc }) {
        const number = value.number ? `по залоговому билету № ${value.number}` : ''
        return `${value.title || acc} ${number}`
    },
    from2({ type, value }) {
      return type === 'dt' ? 'Плательщик' : 'Получил' 
    },
    fromPassport({ type, value }) {
      return type === 'dt' ? 'Паспорт плательщика' : 'Паспорт получателя' 
    },
    fullName({ value }) {
      return value.from
    },
    order({ value, type }) {
      return value.order[type]
    },
    passport({ value }) {
        return { ...value.doc }
    },
    docToString({ passport, t }) {
      const { seria = '', number = '', issued = '' } = passport || {}
      return `${seria} ${number} ${t('issued')}: ${issued}`
    }
  },
  methods: {
    getAccount({ct}) {
      const { ct: accounts } = this.accounts
      return `${ct}/${accounts[ct]}`
    },
    short(v) {
      const [ rub, kop ] = v.split('.') || []
      return `${rub} руб. ${kop} коп.`
    },
    t(v) {
      return this.$t(`zvit.${v}`)
    }
  }
}
</script>

<style></style>