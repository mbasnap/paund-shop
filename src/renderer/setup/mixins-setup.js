
import $toTitleCase from '@/mixins/toTitleCase'
import $numberFormat from '@/mixins/numberFormat'
import $isNumber from '@/mixins/isNumber'



export default {
    install (Vue, options) {
      Vue.mixin({
          methods: {
            $toTitleCase,
            $numberFormat,
            $isNumber
          }
      })
    }
}