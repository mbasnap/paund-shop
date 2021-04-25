<template>  
  <ul class="kassa-list small p-0 mb-0" :class="type">
    <context  teg="li" v-for="([id, v], i) in items" :key="i" 
    :class="['kassa-list__item', { active: id && value === id}]"
    :disabled="{ remove: !id }"
    @remove="actions.remove(id)"
    @addOrder="actions.addOrder(type)"
    @click="$emit('input', id)">
      <draggable :group="{ name: 'bilet', pull: false }"  @start="onStart" 
        @end="onEnd([$event, map[id]])">
        <div :class="{ deleted: map[id] && map[id].deleted }" 
        style="text-align: center;">
          {{ id && summ(v) }}
        </div>
      </draggable>
     </context>
  </ul>
</template>

<script>

import Draggable from 'vuedraggable'
import Context from '@/components/Context'
import { summ } from '@/functions'
import { mapGetters } from 'vuex'
export default {
  props: ['rows', 'type', 'value'],
  components: { Draggable, Context },
  inject: ['onStart', 'onEnd', 'grope', 'actions'],
  computed: {
    ...mapGetters({ map: 'reestr/map' }),
    items({ type }) {
      const items = this.grope(type)
      return [...Array(this.rows).keys()].map((_, i) => items[i] || [])
    }
   },
  methods: {
    summ(values) {
      return summ( ...values.map(v => v.summ))
    }
  }
}
</script>
<style scoped>

.kassa-list.ct {
  margin-left: -1px;
}
.kassa-list__item {
  display: block;
  padding: 0;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.kassa-list__item:hover {
  background-color: rgba(0, 0, 0, 0.034);
}
.kassa-list__item .deleted {
  color: #ad0a0afa;
}
.kassa-list__item.active {
  border: 1px solid #17a2b8;
}
.kassa-list__item.border-right-none {
  border-right: none !important;
}
.kassa-list__item[selected] {
  background-color: rgba(128, 128, 128, 0.11);
}
</style>







