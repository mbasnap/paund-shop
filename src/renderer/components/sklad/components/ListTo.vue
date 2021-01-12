<template>
  <div class="list_to">
    <draggable v-if="target" class="target" group="sklad"/>
    <div class="list">
      <div class="list__header row m-0">
      <div class="col">
        <slot></slot>
      </div>
      <div class="col">
        <select class="form-control" v-model="type">
          <option v-for="(v, i) in filters" :key="i"
          :value="i">{{ t(v) }}</option>
        </select>
      </div>
      </div>
      <items class="list__content" :value="items" @end="v => $emit('end', v)"/>
    </div>
  </div>
</template>

<script>

import { isOver } from '@/functions/filters'
import draggable from 'vuedraggable'
import Items from './Items.vue'
import { mapGetters } from 'vuex'
export default {
    components: { Items, draggable },
    props: ['value', 'name', 'target', 'filters', 'actions'],
    provide() {
      const onStart = () => this.$emit('start')
      const onEnd = ([{originalEvent}, v]) => {
        const { target } = originalEvent || {}
          this.$emit('end', [target.className === 'target', v])
      }
      return { onStart, onEnd, name: this.name, actions: this.actions }
    },
    data: () => ({
      type: 0,
    }),
    computed: {
        ...mapGetters({
          date: 'date'
        }),
        items({ value = [], filters, type }) {
          return value.filter(this[filters[type]])
            .sort((a, b) => a.number - b.number)
        },
    },
    methods: {
      all: () => true,
      gold: ({ zalog }) => zalog === 'gold',
      things: ({ zalog }) => zalog === 'things',
      overdate(v){
        return isOver(v, this.date)
      },
      t(v) {
        return this.$t(`sklad.${v}`)
      }
    }
}
</script>

<style scoped>
.list {
  height: 100%;
}
.list_to {
  height: calc(100% - 45px)
}
.list_to >>> .target {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.14);
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.list__content{
  overflow: auto;
}

.list__header {
  height: 50px;
  align-items: center;
  background-color: rgb(214, 213, 213);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

</style>