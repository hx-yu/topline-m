import request from '@/utils/request.js'
// 获取联想建议
export const getAssociation = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}
// 获取搜索列表
export const getList = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    params
  })
}
