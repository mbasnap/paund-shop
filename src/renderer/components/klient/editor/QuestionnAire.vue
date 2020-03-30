<template>
  <div class="tabcontent">
    <div class="form-group row m-0 mb-2" v-for="item in Object.keys(items)" :key="item">
      <label class="col-sm-4 col-form-label">{{ t(item) }}</label>
      <select class="col form-control" :value="model[item]" :name="item"
      @change="select($event.target)">
        <option v-for="v in items[item]" :key="v" :value="v">{{ t(v) }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: { value: Object },
  inject: ['onChange'],
  data() {
    return {
      items: {
        'objective of referral': ['receive financial credit', 'another'],
        'source of money': ['salary', 'social payments', 'pension', 'another'],
        'average monthly income': ['income1', 'income2', 'income3', 'income4'],
        'financial status type': ['movable and immovable property', 'household saving', 'property rights', 'another'],
        'business reputation': ['positive', 'part in the proceedings', 'measures to influence', 'negative reports'],
        'beneficial': ['do not have third-party benefits', 'have third-party benefits'],
        'public official info': ['not public official', 'public official'],
        'information about representative': ['have', 'do not have'],
        'level risk': ['low', 'midle', 'high'],
      },
      questionnaire: {
        "objective of referral": "receive financial credit",
        "source of money": "salary",
        "average monthly income": "income2",    
        "financial status type": "movable and immovable property",    
        "business reputation": "positive",
        "beneficial": "do not have third-party benefits",
        "public official info": "not public official",
        "information about representative": "have",
        "information about representative": "have",
        "level risk": "low",
      }
    }
  },
  computed: {
    model({ value, questionnaire }) {
      // console.log(value);
      
      return {...questionnaire, ...value}
    }
  },
  methods: {
    select({ name, value }) {
      // const data = { ...this.value, [name]: value }
      
      this.$emit('input', {...this.value, [name]: value })
      this.onChange()
    },
    t(v) {
      return this.$t(`questionnaire.${v}`)
    }
  }
}
</script>

<style>

</style>