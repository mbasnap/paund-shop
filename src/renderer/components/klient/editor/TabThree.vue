<template>
    <div>
    <!-- <suggest class="form-control mb-2" name="family" placeholder="Family"
    :value="value" :options="klients.filter(byFamily)"
    :suggest="({ family, name, sername }) => family + ' ' + name + ' ' + sername"
    @select="update">
        <slot></slot>
    </suggest>        -->
    <div class="form-row m-0 mb-2">
        <named-input class="form-control col-5 mr-1" name="name" placeholder="Name"
        :value="value" />
        <named-input class="form-control col" name="sername" placeholder="Sername"
        :value="value" />
    </div>
    <div class="form-row m-0 mb-2">
        <named-input class="form-control col-3 mr-1" name="seria" placeholder="BA"
        :value="value" />
        <named-input class="form-control col" name="nomer" placeholder="01010101"
        :value="value"/>
    </div> 
    <named-input class="form-control" name="idn" placeholder="ID"
    :value="value" />
    </div>
</template>

<script>
import { NamedInput, Suggest } from '@/widgets/named-input/index.js'
export default {
    components: { NamedInput, Suggest },
    props: { value: Object },
}
</script>

<style>

</style>