import type { RequestOptions } from '@/service/request/typing'

const normalConfig: RequestOptions = {
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_TIME_OUT
}

export {
  normalConfig
}
