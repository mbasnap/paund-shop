<template>
<div class="instant">
    <input class='form-control' ref="input" v-model="textVal"
        :placeholder="getPlaceholder" 
        @blur="showSuggest = false"
        @keydown.up.prevent="arrowUp"
        @keydown.down.prevent="arrowDown"
        @keydown.enter.prevent="enter" 
        @keydown.esc.prevent="showSuggest = false"
    />
    <ul
        v-if="isSuggest" class="vue-instant__suggestions">
        <li @mousedown="select(index)" 
            v-for="(item, index) in suggestions" :key="index"
            :class="highlighted(index)">{{toString(item)}}
        </li>
    </ul>
    <slot name="rightButton"></slot>
</div>
</template>
<script>

  export default {
    props: {
        name: String,
        value: Object,
        suggest: {
            type: Array,
            default: function(){
                return []
            }
        },
        placeholder: String,
        filter: {
            type: Function,
            default(item) {  

                 return item ? item.toLowerCase().startsWith(this.textVal.toLowerCase()) : false
            }
        },
        string: {
            type: Function,
            default(obj) {
                return obj[this.name]
            } 
        }
    },
    data () {
      return {
          showSuggest: false,
          highlightedIndex: -1
      }
    },
    computed: {
        textVal: {
            get () {
                return this.value[this.name] || ''
            },
            set (value) {
                this.showSuggest = !!value.length
                this.$emit("input", {name: this.name, value})
            }
        },
        suggestions() {
            let filter =  item => this.filter.call(this, this.toString(item)),
                suggest =  this.suggest.filter(filter)    
            return suggest
        },
  
        isSuggest() {
            return   this.suggestions.length > 0 && this.showSuggest
        },
        getPlaceholder() {
            return this.$toTitleCase(this.placeholder || this.name)
        }
    },
    methods: {
        toString(obj)  {
            return   this.string.call(this, obj)  
        },
        arrowDown () {
            this.highlightedIndex < (this.suggestions.length - 1) ?  this.highlightedIndex += 1 : this.highlightedIndex = 0       
            this.showSuggest = true
        },
        arrowUp () {
            this.highlightedIndex > 0 ? this.highlightedIndex -= 1 : this.highlightedIndex = 0
        },
        highlighted (index) {
            if (this.highlightedIndex === index) return 'highlighted__google'
        },
        set(v) {
             this.textVal = v
             this.showSuggest = false
        },
        select (index) {
            let selected = this.suggestions[index]
            if(!selected) return
            this.set(selected[this.name])
            this.$emit('select', selected)
        },
        enter() {
            this.select(this.highlightedIndex)
        },
    }
}
</script>

<style>
.instant {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 40px;
  white-space: nowrap;
  box-sizing: border-box;
  font-size: 14px;
}

.instant input {

    position: absolute !important;
    /* left: 0 !important;
    top: 0 !important; */
}
.form-control.instant input {
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