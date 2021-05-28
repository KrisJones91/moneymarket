<template>
  <div class="CalendarPage container-fluid">

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

</style>
