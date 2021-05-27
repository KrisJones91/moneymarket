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
    <div class="row justify-content-center">
      <div class="col text-center">
        <form @submit.prevent="search">
          <label for="name">Ticker:</label>
          <input type="text"
          name="ticker"
          id="ticker"
          class="m-1"
          placeholder="Search..."
          v-model="state.ticker">
          <br>
          <label for="name">Dates: </label>
          <input type="date" name="date" id="date" class="m-1" v-model="state.date">
          <br>
          <button type="submit" class="m-1 btn btn-dark">Search</button>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-6 mt-5">
        <div class="card p-3" v-if="state.stock.symbol">
          <h1 class="symbol m-0">{{state.stock.symbol}}</h1>
            <p class="mb-3" v-if="state.stock.from"><em>{{state.stock.from.slice(5,7)}}/{{state.stock.from.slice(8,10)}}/{{state.stock.from.slice(0,4)}}</em></p>
            <h5 v-if="state.stock.close">Close: <b class="closed">{{state.stock.close}}</b></h5>
            <h5 v-if="state.stock.high">High: <b class="high">{{state.stock.high}}</b></h5>
            <h5 v-if="state.stock.low">Low: <b class="low">{{state.stock.low}}</b></h5>
        </div>
      </div>
      <div class="col-4 mt-5">
        <!-- <div class="card-img-top img-fluid"> -->
          <p><img class="m-3 logo" v-if="state.info.logo" :src="state.info.logo" alt="logo"> {{state.info.name}}</p>
          <p class="m-0" v-if="state.info.ceo">CEO: {{state.info.ceo}}</p>
          <p class="m-0" v-if="state.info.sector">Sector: {{state.info.sector}}</p>
          <p class="m-0" v-if="state.info.logo">Market Cap: ${{state.info.marketcap}}</p>
          <!-- <p class="m-0">{{state.info.name}}</p> -->
          <a href="http://www.apple.com">Website</a>

        <!-- </div> -->
      </div>
    </div>
    <div class="row justify-content-center pt-4 pb-0" v-if="state.dividends != false">
      <h2>Dividend History</h2>
    </div>
    <div class="row pt-0 mt-0 divs" v-if="state.dividends != false">
      <Dividend v-for="dividend in state.dividends" :key="dividend.id" :div-prop="dividend" />
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
      dividends: computed(() => AppState.dividends),
      stock: computed(() => AppState.prices),
      search: computed(() => AppState.searched),
      info: computed(() => AppState.info),
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
          await tickerService.getInfo(state.ticker)
          state.ticker = ''
          state.date = ''
        } catch (error) {
          logger.log(error)
        }
      }
    }
  },
  components: {
    // Dividend
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
.card {
  // border-radius: 12px;
  border: 2px outset white;
  // color: white;
  // box-shadow: 1px 5px 12px gray;
  box-shadow: 4px 8px 12px rgb(153, 152, 152);
  background-image: linear-gradient(180deg, rgb(255, 255, 255), rgb(197, 197, 197));
  // border: none;
  border-radius: 15px;
}
.symbol {
 color: rgb(75, 75, 75);
 text-shadow: 3px 5px 7px rgb(168, 168, 168);
}
.closed {
  color: blue;
}
.high {
  color: green;
}
.low {
  color: red;
}
#ticker {
  color: rgb(15, 139, 161);
}
#date {
  color: rgb(161, 15, 15);
}
.divs {
  max-height: 350px;
  overflow-y: auto;
  border: outset 2px rgb(167, 167, 167);
  // background-color: rgba(224, 224, 224, 0.349);
  border-radius: 10px;
  margin: 5%;
  box-shadow: 4px 8px 12px rgb(153, 152, 152);
}
img {
  max-height: 20%;
  max-width: 20%;
  // min-height: 50%;
  // min-width: 50%;
  border-radius: 10%;
}
.logo {
  box-shadow: 1px 2px 10px black;
}
</style>
