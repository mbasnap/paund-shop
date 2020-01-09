// import moment from 'moment'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import numberFormat from './numberFormat'
// import'./numberToString'
const moment = extendMoment(Moment)
const toDouble = v => numberFormat(v, 2, '.', ' ')
const toNumber = v => Number(numberFormat(v || 0, 2, '.', '')) 
const summ = (...values) => toDouble(values.reduce((a, b) => a + toNumber(b), 0))
const mult = (a, b) => {
    return toNumber(a) * toNumber(b)
}
const proc = (a, b) => mult(a, b) / 100
const diff = (a, b) => toDouble(toNumber(a) - toNumber(b))
const pDiff = (a, b) => {
    const res = diff(a, b)
    return res > 0 ? res : 0.00
}
moment.locale('ru')
const months = {
    format: 'января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря'.split('_'),
    standalone: 'январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_')
}
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
    months
}