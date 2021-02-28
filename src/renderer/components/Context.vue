<template>
  <component :is="teg || 'div'" class="context"
  @mouseleave="close()"
  @click="$emit('click')"
  @contextmenu.prevent="onContext($event)" 
  >
    <slot ></slot>
    <vue-context ref="context"  class="vue-context" >
       <!-- @mouseleave="close()" -->
      <li v-for="action in model" :key="action" 
      class="pl-2" @click="onAction(action)"> {{ $t(`context.${action}`) }}
      </li>
    </vue-context>   
  </component>
</template>

<script>

import { VueContext } from 'vue-context'
export default {
components: { VueContext },
props: ['teg', 'disabled'],
inject: ['actions'],
provide () {
    return { open: this.open, close: this.close }
},
computed: {
    model({ actions }) {
      return Object.keys(actions)
    },
    context () {
        return this.$refs['context']
    }
},
methods: {
    open(e, v) {
      // console.log(v);
        this.context.open(e, v)
        return this
    },
    close(toElement) {
        return toElement && toElement.className.includes('vue-context')
          || this.context.close()
    },
    onContext(e) {
      if (!this.disabled)
      this.$emit('context', this.open(e))
    },
    onAction(action) {
      this.$emit('action', action)
      this.$emit(action)
    }
}
}
</script>

<style>
.v-context {
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  /* border: 1px solid rgba(0, 0, 0, 0.15); */
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: block;
  margin: 0;
  padding: 10px 0;
  min-width: 10rem;
  z-index: 1500;
  position: fixed;
  list-style: none;
  box-sizing: border-box;
}
.v-context > li {
  margin: 0;
}
.v-context > li:hover {
   background: #dedbdb40;
}
.v-context > li > a {
  display: block;
  padding: 0.5rem 1.5rem;
  font-weight: 400;
  color: #212529;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}
.v-context > li > a:hover, .v-context > li > a:focus {
  text-decoration: none;
  color: #212529;
  background-color: #f8f9fa;
}
.v-context > li > a:focus {
  outline: 0;
}
.v-context:focus {
  outline: 0;
}

.context  ul li {
    cursor: pointer;
}
</style>