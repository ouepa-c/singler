import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { RequestOptions } from '@/service/request/typing'
import statusErrorHandler from '@/service/request/utils/status.error.handler'

class Request {
  private instance: AxiosInstance | undefined

  constructor (options: RequestOptions) {
    this.instance = axios.create(options)

    /* global interceptors */
    this.instance.interceptors.request.use(
        (config) => {
          return config
        },
        (error) => statusErrorHandler(error)
    )

    this.instance.interceptors.response.use(
        (response) => {
          return response.data
        },
        (error) => statusErrorHandler(error)
    )

    /* custom interceptors */
    this.instance.interceptors.request.use(
        options.interceptors?.requestOnSuccess,
        options.interceptors?.requestOnFailure
    )

    this.instance.interceptors.response.use(
        options.interceptors?.responseOnSuccess,
        options.interceptors?.responseOnFailure
    )
  }

  request<T, E> (options: RequestOptions<T, E>): Promise<T> {
    const req_s = options.interceptors?.requestOnSuccess
    const req_f = options.interceptors?.requestOnFailure
    const res_s = options.interceptors?.responseOnSuccess

    // 请求拦截器
    req_s && (options = req_s(options as InternalAxiosRequestConfig))

    return new Promise<T>((resolve, reject) => {
      this.instance?.request<any, T>(options).then(response => {
            // 响应拦截器
            res_s && (response = res_s(response))
            resolve(response)
          })
          .catch((err) => {
            // 响应失败
            req_f && (req_f(err))
            reject(err)
          })
    })
  }

  get<T, E> (options: RequestOptions<T, E>): Promise<T> {
    return this.request<T, E>({
      ...options,
      method: 'GET'
    })
  }

  post<T, E> (options: RequestOptions<T, E>): Promise<T> {
    return this.request<T, E>({
      ...options,
      method: 'POST'
    })
  }

  put<T, E> (options: RequestOptions<T, E>): Promise<T> {
    return this.request<T, E>({
      ...options,
      method: 'PUT'
    })
  }

  delete<T, E> (options: RequestOptions<T, E>): Promise<T> {
    return this.request<T, E>({
      ...options,
      method: 'DELETE'
    })
  }

  patch<T, E> (options: RequestOptions<T, E>): Promise<T> {
    return this.request<T, E>({
      ...options,
      method: 'PATCH'
    })
  }
}

export default Request
