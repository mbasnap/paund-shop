<template>
    <div>
        <table class="table table-sm table-bordered">
        <thead>
            <tr>
            <th scope="col" style="width: 10%">#</th>
            <th scope="col" style="width: 50%">{{t('title')}}</th>
            <th scope="col" style="width: 10%">{{t('proba')}}</th>
            <th scope="col" style="width: 10%">{{t('ves')}}</th>
            <th scope="col" style="width: 10%">{{t('derty')}}</th>
            <th scope="col" style="width: 10%">{{t('ocenca')}}</th>
            </tr>
        </thead>
        <tbody>
            <table-row v-for="index in rows" :key="index-1" :value="value[index-1]" :index="index"/>
        </tbody>
        </table>
        <div class="row">
            <!-- <div class="col-4"></div> -->
            <div class="col" style="font-style: italic;">
                <span class="">{{ t('prinal_kassir') }}</span>
                <span>_________________</span>
                <span>{{ user.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableRow from './TableRow'
export default {
    components: { TableRow },
    props: { value: Array },
    computed: {
        ...mapGetters({
            settings: 'settings',
            user: 'user/user'
        }),
        rows({ settings }) {
            return settings.minRows
        }
    },
    methods: {
        t(v) {
            return this.$t('print.' + v)
        }
    }
}
</script>

<style>

</style>