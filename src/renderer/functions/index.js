import numberFormat from './numberFormat'
const toDouble = v => numberFormat(v, 2, '.', ' ')
const toNumber = v => Number(numberFormat(v || 0, 2, '.', '')) 
const summ = (...values) => toDouble(values.reduce((a, b) => a + toNumber(b), 0))
const mult = (a, b) => toDouble(toNumber(a) * toNumber(b))
const diff = (a, b) => toDouble(toNumber(a) - toNumber(b))
const pDiff = (a, b) => {
    const res = diff(a, b)
    return res > 0 ? res : 0.00
}

export  {
    numberFormat,
    toDouble,
    toNumber,
    summ,
    diff,
    pDiff,
    mult,
    // procent
}