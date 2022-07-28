import request from '@/utils/requestcopy'

/**
 * 分页查询库位详细信息
 * */
export function QueryLocation(params) {
  return request({
    url: 'api/location/pageDetail',
    params
  })
}

/**
 * 修改库位状态
 * */
export function emidQueryLocation(data) {
  return request({
    url: 'api/location',
    method: 'put',
    data
  })
}

/**
 * 查询库区信息
 * */
export function getemidQueryLocation() {
  return request({
    url: 'api/warehouse/list',
    params: {
      status: 1
    }
  })
}
