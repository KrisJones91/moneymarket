import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api, apiPrice } from './AxiosService'

class TickerService {
  async searchSymbols() {
    try {
      const res = await api.get('tickers?active=true&sort=ticker&order=asc&limit=20000&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
      logger.log(res)
      AppState.tickers = res.data
      logger.log(res.data.results)
    } catch (error) {
      logger.log(error)
    }
  }

  async getPrice() {
    try {
      const ticker = ''
      const date = ''
      const res = await apiPrice.get(`${ticker}` + '/' + `${date}` + '?unadjusted=true&apiKey=zvsoXQZpkLALd_lBxJDzY1d5BpMSh9Oz')
      AppState.activeSymbol = res.data
      logger.log(res.data)
    } catch (error) {
      logger.log(error)
    }
  }
}

export const tickerService = new TickerService()
