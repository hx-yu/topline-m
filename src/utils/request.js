// 此文件是配置axios文件
import axios from 'axios'
import jsonBig from 'json-bigint'
// 配置基地址
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0'
})
// 处理响应数据大数字精度问题
request.defaults.transformResponse = [data => {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]
// 设置请求拦截
// 处理token
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})
// 设置响应拦截

export default request
