import instance from '@/api/request'
// import { HttpRequest } from './httpRequest'

export const API = getHttpService(url)

export function getHttpService(httpUrl) {
  let httpObj = {}
  for (let [key, value] of Object.entries(httpUrl)) {
    let { url, method } = value
    httpObj[key] = (params, cb, config = {}) => {
      let requestParams = paramsHandleObj[method](params)
      let requestUrl = cb ? cb(url) : url
      return new Promise((resolve, reject) => {
        instance[method](requestUrl, requestParams, config)
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    }
  }
  return httpObj
}

const paramsHandleObj = {
  get(params) {
    return { params }
  },
  post(params) {
    return params
  },
  delete(params) {
    return { params }
  },
  put(params) {
    return params
  }
}
/** vue中可直接通过this.$API访问 */
// export default API
