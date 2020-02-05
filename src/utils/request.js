// 此文件是配置axios文件
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'
// 配置基地址
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
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
  const user = store.state.user
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 设置响应拦截
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // 判断是否是401
  if (error.response && error.response.status === 401) {
    const user = store.state.user
    // 判断是否有refresh_token
    if (!user || !user.refresh_token) {
      // 没有refresh_token直接跳转登录
      reLogin()
      return
    }
    try {
      // 有refresh_token重新获取token
      const { data } = await axios({
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 重新赋值token
      store.commit('setUser', {
        ...user,
        token: data.data.token
      })
      // 继续之前的请求
      return request(error.config)
    } catch (err) {
      console.log('请求刷新失败', err)
      reLogin()
    }
  }
  return Promise.reject(error)
})
function reLogin () {
  router.push({
    name: 'Login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
