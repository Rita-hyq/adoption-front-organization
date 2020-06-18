import request from '@/utils/request'

// 首页dashboard
export function getDashBoard(id) {
  return request({
    url: `/organizationChart/getDashBoard/${id}`,
    method: 'get'
  })
}

// 首页dashboard no
export function getDashBoardNo(id) {
  return request({
    url: `/organizationChart/getDashBoardNo/${id}`,
    method: 'get'
  })
}

// 首页chart
export function getDashBoardChart(id) {
  return request({
    url: `/organizationChart/getDashBoardChart/${id}`,
    method: 'get'
  })
}

// 数据报表 最近6个月的订单数
export function getStatementChart1(id) {
  return request({
    url: `/organizationChart/getStatementChart1/${id}`,
    method: 'get'
  })
}

// 数据报表 查询某月订单数量
export function getStatementChart2(id, value1) {
  return request({
    url: `/organizationChart/getStatementChart2/${id}`,
    method: 'get',
    params: {
      value1
    }
  })
}
