import request from '@/utils/request'

// 机构登录
export function login(data) {
  return request({
    url: '/organization/login',
    method: "post",
    data
  })
}

// 根据token获取机构信息
export function getData() {
  return request({
    url: '/organization/getData',
    method: 'get'
  })
}

// 分类选择器
export function getClassificationList() {
  return request({
    url: '/organization/getClassificationList',
    method: 'get'
  })
}

// 根据分类id品种选择器
export function getCategoryList(id) {
  return request({
    url: '/organization/getCategoryList',
    method: 'get',
    params: {
      id
    }
  })
}

// 根据分类name品种选择器
export function getCategoryList2(id) {
  return request({
    url: '/organization/getCategoryList2',
    method: 'get',
    params: {
      id
    }
  })
}

// 省份选择器
export function getProvinceList() {
  return request({
    url: '/organization/getProvinceList',
    method: 'get'
  })
}

// 市选择器
export function getCityList(name) {
  return request({
    url: '/organization/getCityList',
    method: 'get',
    params: {
      name
    }
  })
}

