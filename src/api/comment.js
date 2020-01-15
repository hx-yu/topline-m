import request from '@/utils/request.js'
// 获取评论列表
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

// 发送文章评论
export const addComment = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}
