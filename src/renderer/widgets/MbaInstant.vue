<template>
<div class="sbx-google">
    <input class='form-control' ref="input" v-model="textVal"

        @blur="showSuggests(false)"
        @keydown.up.prevent="arrowUp"
        @keydown.down.prevent="arrowDown"
        @keydown.enter.prevent="enter" 
        @keydown.esc.prevent="showSuggests(false)"
        :placeholder="placeholder"
    />
    <ul
        v-if="isSuggest" class="vue-instant__suggestions">
        <li @mousedown="mousedown(index)" 
            v-for="(item, index) in suggests" :key="index"
            :class="highlighted(index)">{{toString(item)}}
        </li>
    </ul>
    <slot name="rightButton"></slot>
</div>
</template>
<script>

  export default {
    props: {
        value: String,
        placeholder: String,
        toString: Function
    },
    data () {
      return {
          suggests: [],
          highlightedIndex: -1
      }
    },
    computed: {
        textVal: {
            get () {
                return this.value
            },
            set (value) {
                this.setValue(value, (this.showSuggests))
            }
        },
  
        isSuggest() {
            return   this.suggests.length > 0
        }
    },
    methods: {

        setValue(value, showSuggests) {
            this.$emit("input", {value, showSuggests})
            if(!showSuggests) this.showSuggests(false)
        },
        showSuggests(suggests) {
            this.suggests = suggests || []
        },
        arrowDown () {
            this.highlightedIndex < (this.suggests.length - 1) ?  this.highlightedIndex += 1 : this.highlightedIndex = 0       
        },
        arrowUp () {
            this.highlightedIndex > 0 ? this.highlightedIndex -= 1 : this.highlightedIndex = 0
        },
        highlighted (index) {
            if (this.highlightedIndex === index) return 'highlighted__google'
        },
        select (selected) {
            if(!selected) return
            this.setValue(this.toString(selected))
            this.$emit('select', selected)
        },
        mousedown(index) {
            this.select(this.suggests[index])
        },
        enter() {
            this.select(this.suggests[this.highlightedIndex])
        }
    }
}
</script>

<style>
.sbx-google {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 40px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 14px;
}

.sbx-google input {

    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
}
.form-control.sbx-google input {
    padding-right: 25px;
}

.vue-instant__suggestions {
     position: absolute;
     left: 0;
     margin: 0;
     background-color: #fff;
     border: 1px solid #D3DCE6;
     width: 100%;
     padding: 6px 0;
     z-index: 10;
     border-radius: 2px;
     max-height: 280px;
     box-sizing: border-box;
     overflow: auto;
     box-shadow: 0 0 6px 0 rgba(0,0,0,.04), 0 2px 4px 0 rgba(0,0,0,.12);
     margin-top: 40px;
 }
 .vue-instant__suggestions li {
     list-style: none;
     line-height: 30px;
     margin: 0;
     cursor: pointer;
     color: #475669;
     font-size: 14px;
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
 }
 
 .vue-instant__suggestions li.highlighted__google {
     background-color: #EEEEEE;
     color: black;
 }
</style>