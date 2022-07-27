import request from '@/utils/requestcopy'

export function GetWarehouse(params) {
  return request({
    url: 'api/warehouse/page',
    params
  })
}

/**
 * 修改仓库状态
 * */
export function emidOpenstatus(id, status) {
  return request({
    url: 'ips/warehouse',
    method: 'put',
    data: {
      id,
      status
    }
  })
}

/**
 * 新增仓库
 * */
export function addOpen(data) {
  return request({
    url: 'ips/warehouse',
    method: 'post',
    data
  })
}

/**
 * 新增仓库
 * */
export function addOpenID(data) {
  return request({
    url: 'api/codeFactory/next/CK',
    data
  })
}
