<template>
    <div class="sbx-google__reset" @click="$emit('reset')">

        <!-- <svg role="img">
            <use xlink:href="#sbx-icon-clear-4"/>
        </svg> -->
        <!-- <svg >
            <symbol xmlns="http://www.w3.org/2000/svg" id="sbx-icon-clear-4" viewBox="0 0 20 20">
            <path d="M11.664 9.877l4.485 4.485-1.542 1.54-4.485-4.485-4.485 4.485-1.54-1.54 4.485-4.485-4.485-4.485 1.54-1.54 4.485 4.484 4.485-4.485 1.54 1.542-4.484 4.485zM10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10z" fill-rule="evenodd"/>
            </symbol>
        </svg> -->

        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down"
          class="svg-inline--fa fa-caret-down fa-w-10" role="img"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
          <path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
          </path>
        </svg>

    </div>

</template>

<script>
export default {

}
</script>

<style>
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
</style>
