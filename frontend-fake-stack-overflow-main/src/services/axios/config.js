/* eslint-disable no-shadow */

const { default: apiClient } = require('.')

export const get = (url, params) => {
  return apiClient.get(url, {
    ...params,
    // paramsSerializer: params => {
    //   return qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' })
    // },
  })
}
export const post = (url, data) => apiClient.post(url, data)
export const put = (url, data) => apiClient.put(url, data)
export const patch = (url, data) => apiClient.patch(url, data)
export const remove = url => apiClient.delete(url)
