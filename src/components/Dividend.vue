<template>
  <div class="Dividend col-4 mt-1 mb-1">
    <div class="card">
      <div class="card-header m-0 p-0">
      <h5 class="m-1"><small><b>EPS</b></small></h5>
      <h5>${{ divProp.amount }}</h5>
      </div>
      <p class="mt-2 mb-0"><b>DATES</b></p>
      <p class="m-0"><small><b>{{divProp.recordDate.slice(0,4)}}</b></small></p>
      <p class="m-0"><small>Expect: {{ divProp.paymentDate.slice(5,7) }}/{{ divProp.paymentDate.slice(8,10)}}</small></p>
      <p class="m-0"><small>Recorded: {{ divProp.recordDate.slice(5,7) }}/{{divProp.recordDate.slice(8,10)}}</small></p>
      <p class="m-0 mb-3"><small>Executed {{ divProp.exDate.slice(5,7) }}/{{divProp.exDate.slice(8,10)}}</small></p>
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
  box-shadow: 4px 8px 8px rgb(153, 152, 152);
  background-image: linear-gradient(180deg, rgb(255, 255, 255), rgb(216, 216, 216));
  border-radius: 11px;
  overflow-y: auto;
}
.card-header{
  background-color: lightsalmon;
}
</style>
