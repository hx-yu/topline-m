// 此文件是处理发送请求文件
import request from '@/utils/request.js'
// 用户登录
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data
  })
}
// 发送验证码
export const getCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
// 获取用户自己信息
export const getInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'GET'
  })
}

// 关注文章作者
export const addFollow = userId => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    }
  })
}
// 取消关注文章作者
export const deleteFollow = userId => {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'DELETE'
  })
}

// 获取用户个人资料
export const getProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}
// 编辑用户个人资料
export const editProfile = data => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
