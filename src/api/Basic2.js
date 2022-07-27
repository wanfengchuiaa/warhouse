import request from '@/utils/requestcopy'

/**
 * 新增仓库
 * */
export function GetReservoir(params) {
  return request({
    url: 'ips/area/pageDetail',
    params
  })
}
