<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col">
        <router-link class="link" :to="{ name: 'CalendarPage' }">
          <i class="far fa-calendar-alt fa-3x float-right mt-3"></i>
        </router-link>
      </div>
    </div>
    <div class="row justify-content-center">
      <!-- left side title / search area -->
      <div class="col-10">
        <h1 class="">Money Market</h1>
          <div class="row justify-content-center">
            <div class="col">
              <h5 class="m-2">Search all securities information </h5>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col">
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
        </div>
    </div>
    <!-- card personalized info -->
    <div class="row justify-content-center">
      <div class="col-4 mt-5">
        <div class="card p-3" v-if="state.stock.symbol">
          <h1 class="symbol m-0">{{state.stock.symbol}}</h1>
            <p class="mb-3" v-if="state.stock.from"><em>{{state.stock.from.slice(5,7)}}/{{state.stock.from.slice(8,10)}}/{{state.stock.from.slice(0,4)}}</em></p>
            <h5 v-if="state.stock.close">Close: <b class="closed">{{state.stock.close}}</b></h5>
            <h5 v-if="state.stock.high">High: <b class="high">{{state.stock.high}}</b></h5>
            <h5 v-if="state.stock.low">Low: <b class="low">{{state.stock.low}}</b></h5>
            <h5 v-if="state.stock.volume">Volume: <b class="volume">{{state.stock.volume}}</b></h5>
        </div>
        </div>
        <div class="col-5 m-0 mt-5 text-center">
        <!-- <div class=""> -->
        <div class="row">
          <div class="col text-center m-0 p-0">
            <img class="m-0 p-0 logo" v-if="state.info.logo" :src="state.info.logo" alt="logo">
          </div>
          <div class="col text-left">
            <h4 class="mt-0 pt-0"> {{state.info.name}}</h4>
            <p class="m-0" v-if="state.info.ceo"><b>CEO:</b> {{state.info.ceo}}</p>
            <p class="m-0" v-if="state.info.sector"><b>Sector:</b> {{state.info.sector}}</p>
            <p class="m-0" v-if="state.info.sector"><b>Exchange:</b> {{state.info.exchange}}</p>
            <p class="m-0" v-if="state.info.hq_state"><b>HQ:</b> {{state.info.hq_state}} - {{state.info.hq_country}}</p>
            <p class="m-0" v-if="state.info.listdate"><b>IPO Date:</b> {{state.info.listdate.slice(5,7)}}/{{state.info.listdate.slice(8,10)}}/{{state.info.listdate.slice(0,4)}}</p>
            <a :href="state.info.url" v-if="state.info.url" class="text-center">Website</a>
      </div>
        </div>
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
      await tickerService.getHolidays()
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
  background-color: rgb(221, 221, 221);
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
 color: rgb(27, 27, 27);
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
.volume {
  color:rgb(149, 101, 10);
}
#ticker {
  color: rgb(161, 15, 15);
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
  max-height: 50%;
  max-width: 50%;
  // min-height: 50%;
  // min-width: 50%;
  border-radius: 10%;

}
.logo {
  box-shadow: 3px 5px 10px rgb(78, 78, 78);
  position: absolute;
}
.link {
  color: rgb(130, 148, 228);
  cursor: pointer;

}
.link:hover {
  color: rgb(32, 62, 192);
}
</style>
