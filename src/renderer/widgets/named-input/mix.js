import NamedInput from './NamedInput'
import NamedTextarea from './NamedTextarea'
import Suggest from './Suggest'
import NamedSelect from './NamedSelect.vue'
import CustomSelect from './CustomSelect.vue'
export default {
    components: { NamedInput, Suggest, NamedTextarea, NamedSelect, CustomSelect },
    provide () {
        const { input, change, readonly } = this
        return { input, change, readonly }
    },
    methods: {
        input() {},
        change() {},
        readonly() {},
    }
    }