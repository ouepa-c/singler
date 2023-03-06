import Request from '@/service/request'
import { normalConfig } from '@/service/request_config'

const $http = new Request(normalConfig)

export {
  $http
}
