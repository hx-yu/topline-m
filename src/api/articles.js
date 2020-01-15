import request from '@/utils/request.js'
// 获取频道列表
export const getChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'GET'
  })
}
// 获取文章列表
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params
  })
}

// 获取文章详情
export const getArticleDetails = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}

// 收藏文章
export const addCollect = articleId => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消收藏文章
export const deleteCollect = articleId => {
  return request({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'DELETE'
  })
}

// 点赞文章
export const addLike = articleId => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
// 取消点赞文章
export const deleteLike = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })
}
