<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Money Market</h1>
      </div>
    </div>
      <div class="row justify-content-center">
        <div class="col">
            <h5 class="m-2">Search all securities information </h5>
        </div>
      </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="search">
          <label for="name">Ticker</label>
          <input type="text"
          name="ticker"
          id="ticker"
          class="m-1"
          placeholder="Ticker..."
          v-model="state.ticker">
          <input type="date" name="date" id="date" class="m-1" v-model="state.date">
          <button type="submit" class="m-1 btn btn-dark">Search</button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h1>{{state.stock.symbol}}</h1>
        <h3>Close: {{state.stock.close}}</h3>
        <h3>High: {{state.stock.high}}</h3>
        <h3>Low: {{state.stock.low}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { tickerService } from '../services/TickerService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      stock: computed(() => AppState.prices),
      search: computed(() => AppState.searched),
      ticker: '',
      date: ''
    })
    onMounted(async() => {
    })
    return {
      state,
      async search() {
        try {
          await tickerService.getPrice(state.ticker, state.date)
          await tickerService.getDividends(state.ticker)
          state.ticker = ''
          state.date = ''
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
