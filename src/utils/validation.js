import Vue from 'vue'

// 加载验证组件
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'

// 加载内置验证规则
import * as rules from 'vee-validate/dist/rules'

// 加载中文语言包
import { messages } from 'vee-validate/dist/locale/zh_CN.json'

// 全剧注册组件
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// 配置验证规则和中文提示
Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule]
  })
})

// 自定义验证规则
// 手机号码验证
extend('mobile', {
  validate: value => {
    return /^1(3|5|6|7|8|9)\d{9}$/.test(value)
  },
  message: '{_field_}格式不正确'
})
// 验证码验证
extend('code', {
  validate: value => {
    return /^\d{6}$/.test(value)
  },
  message: '{_field_}格式不正确'
})
