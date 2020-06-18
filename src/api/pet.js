import request from '@/utils/request'

// /pet/information 宠物信息管理列表
export function getPet(page, limit, searchParams) {
  return request({
    url: `/organization/getPet/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /pet/information 修改基础信息按钮
export function getOnePet(id) {
  return request({
    url: '/organization/getOnePet',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/information 基础信息确认修改按钮
export function updatePet(data) {
  return request({
    url: '/organization/updatePet',
    method: 'put',
    data
  })
}

// /pet/information 修改详细信息按钮
export function getOnePetInformation(id) {
  return request({
    url: '/organization/getOnePetInformation',
    method: 'get',
    params: {
      id
    }
  })
}

// /pet/information 详细信息确认修改按钮
export function updatePetInformation(data) {
  return request({
    url: '/organization/updatePetInformation',
    method: 'put',
    data
  })
}

// /pet/information 新增宠物按钮
export function createPet(data) {
  return request({
    url: '/organization/createPet',
    method: 'post',
    data
  })
}

