import request from '@/utils/request'

// /revisit/revisitList 回访信息管理列表
export function getRevisit(page, limit, searchParams) {
  return request({
    url: `/organization/getRevisit/${page}/${limit}/`,
    method: 'get',
    params: searchParams
  })
}

// /revisit/revisitList 查看回访中的用户信息按钮
export function getRevisitUser(id) {
  return request({
    url: '/organization/getRevisitUser',
    method: 'get',
    params: {
      id
    }
  })
}

// /revisit/revisitList 查看回访中的宠物信息按钮
export function getRevisitPet(id) {
  return request({
    url: '/organization/getRevisitPet',
    method: 'get',
    params: {
      id
    }
  })
}

// /revisit/revisitList 查看回访信息按钮
export function getOneRevisit(id) {
  return request({
    url: '/organization/getOneRevisit',
    method: 'get',
    params: {
      id
    }
  })
}

// /revisit/revisitList 审核失败/审核通过 按钮
export function updateRevisit(id, status) {
  return request({
    url: '/organization/updateRevisit',
    method: 'put',
    data: {
      id,
      status
    }
  })
}
