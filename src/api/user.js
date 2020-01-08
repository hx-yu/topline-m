// 此文件是处理发送请求文件
import request from '@/utils/request.js'

// 用户登录
export const login = data => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}

// 发送验证码
export const getCode = mobile => {
  return request({
    url: `/sms/codes/${mobile}`,
    method: 'GET'
  })
}
