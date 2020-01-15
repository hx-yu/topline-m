import request from '@/utils/request.js'
// 获取评论列表
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}
