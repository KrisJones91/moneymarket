import Axios from 'axios'
// import { baseURL } from '../env'
export const api = Axios.create({
  baseURL: 'https://api.polygon.io/v2/reference/dividends/',
  timeout: 8000
})
export const apiPrice = Axios.create({
  baseURL: 'https://api.polygon.io/v1/open-close/',
  timeout: 8000
})
export const apiInfo = Axios.create({
  baseURL: 'https://api.polygon.io/v1/meta/symbols/',
  timeout: 8000
})
export const apiHoliday = Axios.create({
  baseURL: 'https://api.polygon.io/v1/marketstatus/',
  timeout: 8000
})

export const setBearer = function (bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function () {
  api.defaults.headers.authorization = ''
}
