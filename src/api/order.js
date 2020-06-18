import request from '@/utils/request'

// order/orderList 订单信息管理列表
export function getOrder(page, limit, searchParams) {
  return request({
    url: `/organization/getOrder/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// order/orderList 查看订单信息按钮
export function getOneOrder(id) {
  return request({
    url: '/organization/getOneOrder',
    method: 'get',
    params: {
      id
    }
  })
}

// order/orderList 发货 按钮
export function updateOrder(id, status) {
  return request({
    url: '/organization/updateOrder',
    method: 'put',
    data: {
      id,
      status
    }
  })
}
