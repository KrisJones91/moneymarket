<template>
  <div class="CalendarPage cp container-fluid">
    <div class="row justify-content-center">
      <div class="col-6 text-center">
        <h1 class="mt-4">Money Market</h1>
        <h3 class="text-danger">Closures</h3>
        <p><small>*Nasdaq, S&P, DOW, Rusell*</small></p>
        <div class="card">
          <div class="row justify-content-center">
          <div class="col-4 ml-3" v-if="state.holiday">
            <h5>Holiday</h5>
            <p>{{state.holiday[0].name}}</p>
            <p>{{state.holiday[2].name}}</p>
            <p>{{state.holiday[4].name}}</p>
            <p>{{state.holiday[6].name}}</p>
            <p>{{state.holiday[8].name}}</p>
            <p>{{state.holiday[10].name}}</p>
          </div>
          <div class="col-3 m-0">
            <h5>Date</h5>
            <p>{{state.holiday[0].date}}</p>
            <p>{{state.holiday[2].date}}</p>
            <p>{{state.holiday[4].date}}</p>
            <p>{{state.holiday[6].date}}</p>
            <p>{{state.holiday[8].date}}</p>
            <p>{{state.holiday[10].date}}</p>
          </div>
          <div class="col-3">
            <h5>Status</h5>
            <p>{{state.holiday[0].status}}</p>
            <p>{{state.holiday[2].status}}</p>
            <p>{{state.holiday[4].status}}</p>
            <p>{{state.holiday[6].status}}</p>
            <p>{{state.holiday[8].status}}</p>
            <p>{{state.holiday[10].status}}</p>
          </div>
          <!-- {{state.holiday[0].name}} -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { logger } from '../utils/Logger'
import { tickerService } from '../services/TickerService'
import { AppState } from '../AppState'
export default {
  name: 'CalendarPage',
  setup() {
    const state = reactive({
      holiday: computed(() => AppState.holidays)
    })
    onMounted(async() => {
      try {
        await tickerService.getHolidays()
      } catch (error) {
        logger.log(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>
.cp {
  background-color: rgb(221, 221, 221);
}
</style>
