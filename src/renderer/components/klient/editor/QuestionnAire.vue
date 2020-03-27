<template>
  <div class="">
    <div class="form-group row m-0 mb-2" v-for="item in Object.keys(items)" :key="item">
      <label class="col-sm-4 col-form-label">{{ t(item) }}</label>
      <select class="col form-control" :value="value[item]" :name="item"
      @change="$emit('input', $event.target)">
        <option v-for="v in items[item]" :key="v" :value="v">{{ t(v) }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: { value: Object },
  data() {
    return {
      items: {
        'objective of referral': ['receive financial credit', 'another'],
        'source of money': ['salary', 'social payments', 'pension', 'another'],
        'average monthly income': ['income1', 'income2', 'income3', 'income4'],
        'financial status type': ['movable and immovable property', 'household saving', 'property rights', 'another'],
        'business reputation': ['positive', 'part in the proceedings', 'measures to influence', 'negative reports'],
        'beneficial': ['do not have third-party benefits', 'have third-party benefits'],
        'public official': ['not public official', 'public official'],
        'information about representative': ['have', 'do not have'],
        'level risk': ['low', 'midle', 'high'],
      }
    }
  },
  computed: {
    model({ value }) {
      return {...value}
    }
  },
  methods: {
    t(v) {
      return this.$t(`questionnaire.${v}`)
    }
  }
}
</script>

<style>

</style>