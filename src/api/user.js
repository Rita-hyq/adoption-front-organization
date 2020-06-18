import request from '@/utils/request'

// /user/adoption 领养申请表管理列表
export function getAdoption(page, limit, searchParams) {
  return request({
    url: `/organization/getAdoption/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /user/adoption 查看领养申请表中的宠物信息按钮
export function getAdoptionPet(id) {
  return request({
    url: '/organization/getAdoptionPet',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 查看领养申请表中的用户信息按钮
export function getAdoptionUser(id) {
  return request({
    url: '/organization/getAdoptionUser',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 查看领养申请表按钮
export function getOneAdoption(id) {
  return request({
    url: '/organization/getOneAdoption',
    method: 'get',
    params: {
      id
    }
  })
}

// /user/adoption 审核失败/审核通过 按钮
export function updateAdoption(id, status) {
  return request({
    url: '/organization/updateAdoption',
    method: 'put',
    data: {
      id,
      status
    }
  })
}
