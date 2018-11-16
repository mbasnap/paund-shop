<template>
<div>
    <div class="main">
      <form novalidate="novalidate"  class="sbx-google">
        <div role="search" class="sbx-google__wrapper">

          <input class='form-control' ref="input"
            v-model='textVal'  :name="name" :placeholder="placeholder"
            @keydown.up.prevent="arrowUp"
            @keydown.down.prevent="arrowDown"
            @keydown.esc.prevent="escape"
            @keydown.enter.prevent="enter" 
          />
           <div class="sbx-google__reset" @click="reset" v-show="isReset">

                <svg role="img">
                  <use xlink:href="#sbx-icon-clear-4"/>
                </svg>

           </div>

             <ul
                v-if="isSuggest" class="vue-instant__suggestions">
                 <li @click="select(getSuggestions[index])" 
                    v-for="(item, index) in getSuggestions" :key="index"
                   :class="highlighted(index)">{{getString(item)}}</li>
             </ul>

        </div>
      </form>
      </div>

    <svg >
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-4" viewBox="0 0 20 20">
        <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"/>
      </symbol>
    </svg>
</div>
</template>
<script>

  export default {
    props: {
      string: Function,
      selected: Object,
      name: String,
      placeholder: String,
      suggestions: Array
    },
    data () {
      return {
        value: '',
        highlightedIndex: -1
      }
    },
    computed: {
      isReset () {
        return  !!this.getSelected
      },
      getString () {
        return item => this.string ? this.string(item) : item[this.name]
      },
      getSuggestions () {
        return this.value ? this.suggestions.filter(item => {
         return item[this.name].startsWith(this.value)
        }) : []
      },
      getSelected () {
        return this.selected[this.name]
      },
      isSuggest () {
        return this.getSuggestions.length > 0 
      },
      textVal: {
        get () { 
          return this.getSelected || this.value
        },
        set (v) {
           if (!this.getSelected) this.value =  v
           this.change(v)
        }
      }
    },
    methods: {

      arrowDown () {
      this.highlightedIndex < (this.suggestions.length - 1) ?  this.highlightedIndex += 1 : this.highlightedIndex = 0       
     },
      arrowUp () {
        this.highlightedIndex > 0 ? this.highlightedIndex -= 1 : this.highlightedIndex = 0
      },
      enter() {
        this.select(this.getSuggestions[this.highlightedIndex])
      },
      reset () {
        this.setValue('', true)
        this.$emit('reset')
      },
      setValue (v, focus) {
        this.value = v
        if (focus) this.$refs.input.focus()
      },
      change (value) {
        let oldV = this.getSelected
        if (value !== oldV) this.$emit('change', {name: this.name, value})
      },
      escape () {
        this.$emit('escape')
      },
      select (selected) {
        this.$emit('select', selected)
      },
      highlighted (index) {
        if (this.highlightedIndex === index) return 'highlighted__google'
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
.sbx-google__reset {
  display: block;
  position: absolute;
  top: 13px;
  right: 10px;
  margin: 0;
  border: 0;
  background: none;
  cursor: pointer;
  fill: rgba(0, 0, 0, 0.5);
}
.sbx-google__reset svg {
  display: block;
  width: 13px;
  height: 13px;
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