import request from '@/utils/requestcopy'

export function GetWarehouse(params) {
  return request({
    url: '/api/area/pageDetail',
    params
  })
}

// /**
//  * 新增仓库
//  * */
// export function GetReservoir(params) {
//   return request({
//     url: 'ips/area/pageDetail',
//     params
//   })
// }
/**
 * 新增仓库
 * */
export function GetReservoir(data) {
  return request({
    url: 'api/area',
    method: 'post',
    data
  })
}

/**
 * 修改库仓状态
 * */

export function GetemidReservoir(data) {
  return request({
    url: '/api/area',
    method: 'put',
    data
  })
}

/**
 * 查询全部仓库
 * */
export function GoodsInquiryList() {
  return request({
    url: 'api/warehouse/list',
    params: {
      status: 1
    }
  })
}

/**
 * 新增库区请求CODE
 * */
export function addReservoirID(data) {
  return request({
    url: 'api/codeFactory/next/KQ',
    data
  })
}

/**
 * 修改库区渲染
 * */
export function emidReservoirID(id) {
  return request({
    url: `/api/area/${id}`
  })
}
