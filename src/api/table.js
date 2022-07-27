import request from '@/utils/requestcopy'

/**
 * 代办信息
 * */
export function getTodo() {
  return request({
    url: '/ips/home/todo'
  })
}

/**
 * 出入信息
 * */
export function AccessToInformation(dimension) {
  return request({
    url: 'ips/home/sumList',
    params: {
      dimension
    }
  })
}

/**
 * 库存使用情况
 * */
export function InventoryUs() {
  return request({
    url: 'ips/home/stockUseStatus'
  })
}

/**
 * 库区使用情况
 * */
export function Reservoir() {
  return request({
    url: 'ips/home/areaUseStatus'
  })
}
