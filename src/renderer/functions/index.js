import Moment from 'moment'
import { extendMoment } from 'moment-range'
import numberFormat from './numberFormat'
const moment = extendMoment(Moment)
const toDouble = v => numberFormat(v, 2, '.', ' ')
const toNumber = v => Number(numberFormat(v || 0, 2, '.', '')) 
const summ = (...values) => toDouble(values.reduce((a, b) => a + toNumber(b), 0))
const mult = (a, b) => toNumber(a) * toNumber(b)
const proc = (a, b) => mult(a, b) / 100
const diff = (a, b) => toDouble(toNumber(a) - toNumber(b))
const pDiff = (a, b) => {
  a = toNumber(a)
  b = toNumber(b)
  const res = a - (b > 0 ? b : b * -1)
  return res > 0 ? res : false
}
const round = v => {
  return Number(numberFormat(v))
}
const getOcenca = (v, isAfter, rate ) => {
  const procent = v * rate / 100
  return isAfter(v + procent) ? v : getOcenca(v + procent, isAfter, rate)
}
const getProcent = ({ ocenca, procent, days }) => {
  return proc(ocenca, procent * toNumber(days))
}
const firstChar = (v, add = '') => {
  return v ? (v + '').charAt(0).toUpperCase() + add : ''
}
moment.locale('ru')
const months = {
  format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
  standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
}
const daysDiff = (d1, d2) => {
  if(!d1 || !d2) return
    d1 = moment(d1).startOf('day')
    d2 = moment(d2).startOf('day')
  return moment.duration(d1.diff(d2)).asDays()
}
const toTitleCase = (txt = '') => {
  return txt.charAt(0).toUpperCase() + txt.substr(1)
}
const toSearchString = (v) => {
  return v && (v + '').replace(/[.,\s]/g, '').toLowerCase()
}
const dateFormat = (txt = '') => {
  return txt.split(/[,-/\\]/).join('.')
}
const isDateValid = (v) => !v || moment(v, 'DD.MM.YYYY', true).isValid()

const reduceBy = (key, arr = []) => arr.reduce((cur, v) => ({...cur, [v[key]]: v }), {})

const range = (start, end) => Array(end - start + 1).fill().map((_, idx) => start + idx)

const validDate = (type) => (value) => !moment(value, 'DD.MM.YYYY', true).isValid() && type
const required = (type) => (value) => !value && type

const shortFio = ({ family = '', name = '', sername = '' } = {}) => 
 `${family} ${firstChar(name, '.')} ${firstChar(sername, '.')}` 

export  {
  numberFormat,
  toDouble,
  toNumber,
  summ,
  diff,
  pDiff,
  mult,
  proc,
  moment,
  months,
  getOcenca,
  getProcent,
  round,
  firstChar,
  daysDiff,
  toTitleCase,
  isDateValid,
  dateFormat,
  range,
  toSearchString,
  reduceBy,
  validDate,
  required,
  shortFio
}