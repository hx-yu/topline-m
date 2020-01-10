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
