<template>
    <div class="plus-circle" :class="{ disabled }" >
        <span  @click="click">
            <svg :style="'width:'+ width"
            aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus-circle" 
            class="svg-inline--fa fa-plus-circle fa-w-16" role="img" 
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z">
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
.plus-circle span {
    color: rgba(4, 4, 4, 0.51);
}
.plus-circle.disabled span {
    pointer-events: none;
    color: rgba(20, 20, 21, 0.24);
}
.plus-circle span:hover {
    color: rgba(27, 30, 33, 0.69);
}
</style>
