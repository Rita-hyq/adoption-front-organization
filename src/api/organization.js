import request from '@/utils/request'

//organization/info 查看机构信息
export function getOneOrganization() {
  return request({
    url: '/organization/getOneOrganization',
    method: 'get',
  })
}

