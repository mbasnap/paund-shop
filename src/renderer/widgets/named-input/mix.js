import NamedInput from './NamedInput'
import NamedTextarea from './NamedTextarea'
import Suggest from './Suggest'
import NamedSelect from './NamedSelect.vue'
export default {
    components: { NamedInput, Suggest, NamedTextarea, NamedSelect },
    provide () {
        const { input, change, readonly } = this
        return { input, change, readonly }
    },
    methods: {
        input() {},
        change() {},
        readonly() {}
    }
    }