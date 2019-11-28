import numberFormat from './numberFormat'
const toDouble = v => numberFormat(v > 0 ? v : 0, 2, '.', ' ')
const toNumber = v => Number(numberFormat(v, 2, '.', '')) 
const summ = (...values) => values.reduce((a, b) => a + toNumber(b), 0)
const diff = (a, b) => toNumber(a || 0) - toNumber(b || 0)
// const pDiff = (a, b) => {
//     const res = diff(a, b)
//     return Math.sign(res) ? res : 0
// }
const procent = (v, p) => toNumber(v) * p / 100
export  {
    numberFormat,
    toDouble,
    toNumber,
    summ,
    diff,
    procent
}