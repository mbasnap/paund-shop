<template>
    <div class="row mx-0 reset" @click="$emit('click')">
      <span  @click="click">
        <svg :style="'width:'+ width"
          aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
          class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512">
          <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z">
          </path>
        </svg>
      </span>
    </div>
</template>
<script>
import mix from './mix'
export default {
  mixins: [mix]

}
</script>

<style scoped>
.reset {
    height: 26px;
    width: 26px;
    margin-top: 6px;
    justify-content: center;
}
.reset:hover {
    border-radius: 15px;
    transition: background-color 0.5s ease;
    background-color: rgba(0, 0, 0, 0.075);
    cursor: pointer;
}
.reset >>> span {
    color: rgba(4, 4, 4, 0.51);
}
.reset.disabled >>> span {
    pointer-events: none;
    color: rgba(20, 20, 21, 0.24);
}
.reset >>> span:hover {
    color: rgba(27, 30, 33, 0.69);
}
</style>
