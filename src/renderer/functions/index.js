// import moment from 'moment'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import numberFormat from './numberFormat'
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
export  {
    numberFormat,
    toDouble,
    toNumber,
    summ,
    diff,
    pDiff,
    mult,
    proc,
    moment
}