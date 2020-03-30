<template>
<div class="modal-content">
    <div class="modal-header">
    <button type="button" class="close" @click="close">
        <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
        <div v-html="html"></div>
        <input type="text" class="form-control" v-model="confirm">
        <textarea class="form-control mt-2" :placeholder="t('description')" v-model="description"
        ></textarea>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-secondary" @click="close">{{ t('cansel') }}</button>
    <button type="button" :class="['btn btn-primary', {'btn-danger': isDanger }]" @click="action(description, title).then(close)" :disabled="disabled">{{ t(title) }}</button>
    </div>
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
export default {
props: { validate: Function, action: Function, value: Object },
data() {
    return {
        data: {}
    }
},
computed: {
    ...mapGetters({
        isAdmin: 'isAdmin'
    }),
    description: {
        get({ data, value }) {
            return {...value, ...data}.description
        },
        set(description) {
            this.data = {...this.data, description}
        }
    },
    confirm: {
        get({ data, value }) {
            return {...data}.confirm
        },
        set(confirm) {
            this.data = {...this.data, confirm}
        }
    },
    html({ value }) {
        return {...value}.html
    },
    title({value }) {
        const { description, title } = {...value}
        return description ? 'save' : title
    },
    isValid({ confirm = '' }) {
        return this.validate(confirm.trim())
    },
    isDanger({ isValid, isAdmin, title, description = '' }) {
        return [isValid, isAdmin, !description.length, title === 'remove']
            .every(v => v)
    },
    disabled({ isValid, description = '', isAdmin }) {              
        const noValid = !isValid
        const noDescription = !isAdmin ? !description.length : false
        return [noValid, noDescription].some(v => v)
    }
},

methods: {
    t(name) {
        return this.$t(`btn.${name}`)
    },
    save () {
        this.$emit('save', this)
    },
    close () {
        this.$emit('close')
    }
}

}
</script>

<style>

</style>
