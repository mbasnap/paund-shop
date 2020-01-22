<template>
    <div class="trash" :class="{ disabled }" >
        <span  @click="click">
            <svg :style="'width:'+ width"
              aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash"
              class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path fill="currentColor"
                  d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z">
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

<style >
/* .trash {
  line-height: 20px;
} */
.trash span {
    color: rgba(4, 4, 4, 0.51);
}
.trash.disabled span {
    pointer-events: none;
    color: rgba(20, 20, 21, 0.24);
}
.trash span:hover {
    color: rgba(27, 30, 33, 0.69);
}
</style>
