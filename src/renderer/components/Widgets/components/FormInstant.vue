<template>
<div>
    <div class="main">
      <form novalidate="novalidate"  class="searchbox sbx-google">
        <div role="search" class="sbx-google__wrapper">
          <input  class="form-control" tabindex="-1" >
          <input class="form-control sbx-google__input" ref="input"
          v-model='textVal' 
          @keyup='onChanget'
          @keydown.up.prevent="arrowUpAction"
          @keydown.down.prevent="arrowDownAction"
          @keydown.esc.prevent="escapeAction"
          @keydown.enter.prevent="enterAction"
          type="search" 
          :name="name" 
          :placeholder="placeholder"
          :disabled="disabled" 
          >
          <button 
            @click="reset"
            class="sbx-google__reset" 
            tabindex="-1"
            v-show="isShowReset"
            >
            <svg role="img" aria-label="Reset">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sbx-icon-clear-4"></use>
            </svg>
          </button>
           <div>
             <ul
                v-if="isShow" class="vue-instant__suggestions">
                 <li @click="selectedAction(similiarData[index])" 
                    v-for="(item, index) in similiarData" :key="index"
                   :class="highlighted(index)">{{item.title}}</li>
             </ul>
          </div>
        </div>
      </form>
      </div>

    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-search-8" viewBox="0 0 40 40">
        <path d="M16 32c8.835 0 16-7.165 16-16 0-8.837-7.165-16-16-16C7.162 0 0 7.163 0 16c0 8.835 7.163 16 16 16zm0-5.76c5.654 0 10.24-4.586 10.24-10.24 0-5.656-4.586-10.24-10.24-10.24-5.656 0-10.24 4.584-10.24 10.24 0 5.654 4.584 10.24 10.24 10.24zM28.156 32.8c-1.282-1.282-1.278-3.363.002-4.643 1.282-1.284 3.365-1.28 4.642-.003l6.238 6.238c1.282 1.282 1.278 3.363-.002 4.643-1.283 1.283-3.366 1.28-4.643.002l-6.238-6.238z"
        fill-rule="evenodd" />
      </symbol>
      <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-4" viewBox="0 0 20 20">
        <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"
        />
      </symbol>
    </svg>
</div>
</template>
<script>

  export default {
    props: {
      value: {
        type: String,
        required: true
      },
      name: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      showReset: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        suggestionsIsVisible: true,
        highlightedIndex: -1,
        similiarData: [],
        disabled: false
      }
    },
    computed: {
      isShowReset () {
        if (this.value.length > 0) return  this.showReset
      },
      showPlaceholder () {
        return this.placeholder.charAt(0).toUpperCase() + string.slice(1)
      },
      isShow () {
        if(this.similiarData.length > 0) return this.suggestionsIsVisible 
      },
      textVal: {
        get () {
          return this.value
        },
        set (v) {
          this.$emit('input', v)
        }
      }
    },
    methods: {
      showSuggestions (suggestions, propName) {
        this.similiarData = suggestions
      },
      arrowDownAction () {
      this.highlightedIndex < (this.similiarData.length - 1) ?  this.highlightedIndex += 1 : this.highlightedIndex = 0       
       this.$emit('action', 'arrowDown', this)
     },
      arrowUpAction () {
        this.highlightedIndex > 0 ? this.highlightedIndex -= 1 : this.highlightedIndex = 0
        this.$emit('action', 'arrowUp', this)
      },
      enterAction () {
        this.selectedAction(this.similiarData[this.highlightedIndex])
      },
      selectedAction (selected) { 
         this.$emit('action','selected', {selected, context: this})
      },
      setValue (value) {
        this.textVal = value
        this.$refs.input.focus()
      },
      highlighted (index) {
        if (this.highlightedIndex === index) return 'highlighted__google'
      },
      sugested (bool) {
        this.suggestionsIsVisible = bool
      },
      reset () {
        this.$emit('action', 'reset', this)
      },
      onChanget (e) {
        this.$emit('action', 'onChanget', this)
      },
      escapeAction () {
        this.$emit('action', 'escape', this)
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

.sbx-google__input {

    position: absolute !important;
    left: 0 !important;
    top: 0 !important;
}
.form-control.sbx-google__input {
    padding-right: 25px;
}
.sbx-google__reset {
  display: none;
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
.sbx-google__input:valid ~ .sbx-google__reset {
  display: block;
  -webkit-animation-name: sbx-reset-in;
          animation-name: sbx-reset-in;
  -webkit-animation-duration: .15s;
          animation-duration: .15s;
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
     margin-top:3px;
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
 
 .el-input-group__append {
   border: 0px !important;
 }

</style>