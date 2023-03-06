import type { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

interface ExtraInterceptor<R, E> {
  requestOnSuccess: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
  requestOnFailure: (err: any) => any,
  responseOnSuccess: (result: R) => R,
  responseOnFailure: (err: E) => E
}

export interface RequestOptions<Response = AxiosResponse, E = any> extends AxiosRequestConfig {
  interceptors?: Partial<ExtraInterceptor<Response, E>>
  headers?: AxiosRequestHeaders
}
