import qs from 'qs'

const { default: apiClient } = require('.')

const conf = {
  paramsSerializer: params => {
    return qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' })
  },
}

export const get = (url, params) => apiClient.get(url, { ...params, ...conf })
export const post = (url, data) => apiClient.post(url, data)
export const put = (url, data) => apiClient.put(url, data)
export const patch = (url, data) => apiClient.patch(url, data)
export const remove = url => apiClient.delete(url)
