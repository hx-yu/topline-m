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

// 文章评论点赞
export const addLike = commentId => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}
// 取消文章评论点赞
export const deleteLike = commentId => {
  return request({
    url: `/app/v1_0/comment/likings/${commentId}`,
    method: 'DELETE'
  })
}
