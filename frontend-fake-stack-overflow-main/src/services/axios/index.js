import axios from 'axios'
import store from 'store'
import { notification } from 'antd'
import qs, { parse } from 'qs'

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_API_URL}/api` : '/api',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
  cancelToken: axios.CancelToken.source().token,

  paramsSerializer: {
    encode: parse,
    serialize: params => qs.stringify(params, { skipNulls: true, arrayFormat: 'repeat' }),
  },
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    request.headers.AccessToken = accessToken
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  try {
    const { response } = error

    const { data } = response
    if (data) {
      notification.error({
        message: 'Error',
        description: data?.message || 'Something went wrong. Please try again later.',
      })
    }
  } catch (err) {
    notification.error({
      message: 'Error',
      description: 'Something went wrong. Please try again later.',
    })
  }
})

export default apiClient
