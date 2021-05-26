import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class TickerService {
  async searchSymbols() {
    try {
      const res = await api.get('tickers?active=true&sort=ticker&order=asc&limit=10&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
      logger.log(res)
      AppState.tickers = res.data
      logger.log(res.data.results)
    } catch (error) {
      logger.log(error)
    }
  }

  // async getPrice() {
  //   let symbol = ''
  //   const res = await apiPrice.get( `${symbol}` + '/2020-10-14?unadjusted=true&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
  //   logger.log(res)
  //   AppState.activeSymbol
  // }
}

export const tickerService = new TickerService()
