<template>
  <div class="avatar">
    <b-avatar class="mr-3" :src="value"/>
    <a class="link mr-3" @click="upload">Загрузить</a>
    <a :class="['link danger', { disabled: !value }]" 
    @click="remove">Удалить</a>
    <b-form-file ref="upload" v-model="image" size="sm" class="display-none"></b-form-file>
  </div>
</template>

<script>
const base64Encode = data =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
export default {
  props: ['name', 'value'],
  data: () => ({
    image: null
  }),
  watch: {
    async image(v) {
      const value = await base64Encode(v)
      const target = { name: this.name, value }
      this.$emit('input', { target })
    }
  },
  methods: {
    upload() {
      this.$refs['upload'].$el.childNodes[0].click()
    },
    remove() {
      const target = { name: this.name, value: null }
      this.$emit('input', { target })
    }
  }
}
</script>

<style scoped>
  .avatar {
    font-size: 13px;
  }
</style>