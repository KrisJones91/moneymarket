import Axios from 'axios'
// import { baseURL } from '../env'
export const api = Axios.create({
  baseURL: 'https://api.polygon.io/v3/reference/',
  timeout: 8000
})
export const apiPrice = Axios.create({
  baseURL: 'https://api.polygon.io/v1/open-close/',
  timeout: 8000
})

export const setBearer = function (bearer) {
  api.defaults.headers.authorization = bearer
}

export const resetBearer = function () {
  api.defaults.headers.authorization = ''
}