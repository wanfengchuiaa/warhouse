import request from '@/utils/requestcopy'
import { data } from 'autoprefixer'

export function GetWarehouse(params) {
  return request({
    url: 'api/warehouse/page',
    params
  })
}

/**
 * 修改仓库状态
 * */
export function emidOpenstatus(data) {
  return request({
    url: 'api/warehouse',
    method: 'put',
    data: data
  })
}

/**
 * 新增仓库
 * */
export function addOpen(data) {
  return request({
    url: 'api/warehouse',
    method: 'post',
    data
  })
}

/**
 * 新增仓库请求CODE
 * */
export function addOpenID(data) {
  return request({
    url: 'api/codeFactory/next/CK',
    data
  })
}
