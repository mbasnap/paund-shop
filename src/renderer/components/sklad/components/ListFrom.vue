<template>
    <!-- <draggable teg="ul" class="kassa-list small p-0 m-0" :value="model" group="sklad"> -->
        <context  :actions="{ toSklad }">
            <div class="list">
                <div class="header">
                    <p>Filter</p>
                </div>
                <items teg="ul" :items="model" :getString="getString"/>
            </div>
        </context>
    <!-- </draggable> -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import Context from '@/components/Context.vue'
import draggable from 'vuedraggable'
import Items from './Items'
export default {
    components: { Context, draggable, Items },
  computed: {
    ...mapGetters({
        empty: 'reestr/empty',
        klients: 'klient/klients'
    }),
    model: {
        get({ empty }) {
            return Object.values(empty)
        },
        set(v) {
            // console.log(v);
        }
    }
  },
  methods: {
      getString(v) {
          
          const { number, date } = v
          return number + ' ' + date
      },
      toSklad(v) {
          console.log(v);
      }
  }
}
</script>

<style>
    .list .header {
        text-align: center;
        background-color: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>