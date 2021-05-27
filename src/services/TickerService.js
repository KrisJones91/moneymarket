
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api, apiPrice } from './AxiosService'

class TickerService {
  async getDividends(ticker) {
    try {
      const res = await api.get(`${ticker}` + '?&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
      logger.log(res)
      AppState.dividends = res.data
      logger.log(res.data)
      // function loop() {
      //   const results = res.data.results
      //   for (let i = 0; i < results.length; i++) {
      //     const all = results[i]
      //     logger.log(all)
      //   }
      // }
      // return loop()
    } catch (error) {
      logger.log(error)
    }
  }

  async getPrice(ticker, date) {
    try {
      const tickers = ticker.toUpperCase()
      const res = await apiPrice.get(`${tickers}` + '/' + `${date}` + '?unadjusted=true&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
      AppState.prices = res.data
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const tickerService = new TickerService()
