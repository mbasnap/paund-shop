
import $toTitleCase from '@/mixins/toTitleCase'
import $numberFormat from '@/mixins/numberFormat'



export default {
    install (Vue, options) {

      Vue.mixin({
          methods: {
            $toTitleCase,
            $numberFormat
          }
      })
    }
}