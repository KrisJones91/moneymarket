<template>
  <div class="home">
    <h2>Money Market</h2>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { tickerService } from '../services/TickerService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      ticker: '',
      date: ''
    })
    onMounted(async() => {
      await tickerService.searchSymbols()
    })
    return {
      state,
      async search() {
        try {
          await tickerService.getPrice(state.ticker, state.date)
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  user-select: none;
  > img {
    height: 200px;
    width: 200px;
  }
}
</style>
