import numberFormat from './numberFormat'
const toDouble = v => v ? numberFormat(v, 2, ',', ' ') : ''
const toNumber = v => Number(numberFormat(v, 2, '.', '')) 
const summ = (...values) => {
    const res = (prev, curr) => {
        return prev + toNumber(curr)
    }
    return values.reduce(res, 0) 
}
const procent = (v, p) => {
    return toNumber(v) * p / 100
}
export  {
    numberFormat,
    toDouble,
    toNumber,
    summ,
    procent
}