import { mapGetters } from 'vuex'
import { summ, toTitleCase } from '@/functions'

import numberToWordsRu from 'number-to-words-ru';

export default {
  props: ['date', 'value'],
  computed: {
    ...mapGetters({
      company: 'company',
      user: 'user',
      usersMap: 'usersMap'
    }),
    toWordsRu() {
      return this.summ && numberToWordsRu.convert(this.summ)
    },
    kassir({ value, usersMap }) {
      const { fio } = {...usersMap[value.user]}
      const { family = '', name = '', sername = '' } = {...fio}
      return `${family} ${name.charAt(0)}.${sername.charAt(0)}.`
    },
    fullName({ value }) {
      return value.from
    },
    order({ value }) {
      return value.order || {}
    },
    docToString({ value, t }) {
      const { seria, number, issued } = value.doc || {}
      return `${t('passport')}: ${seria} ${number} ${t('issued')}: ${issued}`
    },
    iType({ type }) {
      return type === 'dt' ? 'ct' : 'dt'
     },
    accounts({ company, iType }) {
      return company.accounts[iType].reduce((cur, {acc, title}) => {
        return {...cur, [acc]: title }
      }, {})
    },
    purposeOfPayment({ value, iType, accounts }) {
      const number = value.number ? `по залоговому билету № ${value.number}` : ''
      const acc = this.values.map((v) => accounts[v[iType]].toLowerCase()).join(', ')
      const title = value.title || toTitleCase(acc)
      return `${title} ${number}`
    },
    values() {
      const values = this.value.values || []
      return values.filter((v) => v[this.type] === '301')
    },
    summ() {
      return summ( ...this.values.map((v) => v.summ))
    },
  },
  methods: {
    getAccount(value = {}) {
      return `${value[this.iType]}/${this.accounts[value[this.iType]]}`
    },
    short(v) {
      const [ rub, kop ] = v ? v.split('.') : []
      return `${rub} руб. ${kop} коп.`
    },
    t(v) {
      return this.$t(`zvit.${v}`)
    }
  }
}