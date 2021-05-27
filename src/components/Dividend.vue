<template>
  <div class="Dividend col-3 mt-1">
    <div class="card">
      <h4><small>Amount: ${{ divProp.amount }}</small></h4>
      <p><small>Date to Expect: {{ divProp.paymentDate.slice(5,7) }}/{{ divProp.paymentDate.slice(8,10)}}</small></p>
      <p><small>Recorded on: {{ divProp.recordDate.slice(5,7) }}/{{divProp.recordDate.slice(8,10)}}</small></p>
      <p><small>Executed on {{ divProp.exDate }}</small></p>

    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  name: 'Dividend',
  props: {
    divProp: { type: String, required: true }
  },
  setup() {
    const state = reactive({
      dividend: computed(() => AppState.dividends)
    })
    return {
      state
    }
  }
}
</script>

<style>
.card {
  border: 2px outset white;
  box-shadow: 4px 8px 8px rgb(153, 152, 152);
  background-image: linear-gradient(180deg, rgb(255, 255, 255), rgb(216, 216, 216));
  border-radius: 11px;
}

</style>
