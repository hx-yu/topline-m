<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <ValidationObserver ref="myform">
      <ValidationProvider
      name="手机号"
      rules="required|mobile"
       >
      <van-field
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
      />
      </ValidationProvider>
      <ValidationProvider
      name="验证码"
      rules="required|code"
      >
      <van-field
      v-model="user.code"
      label="验证码"
      placeholder="请输入验证码"
      >
        <van-count-down
        v-if="isCountDown"
        slot="button"
        :time="1000*60"
        format="ss 秒"
        @finish="isCountDown = false"
        />
        <van-button
        v-else
        slot="button"
        size="small"
        type="primary"
        @click="onSendCode"
        >发送验证码</van-button>
      </van-field>
      </ValidationProvider>
    </ValidationObserver>
    <div class="login-btn">
        <van-button @click="userLogin" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login, getCode } from '@/api/user.js'
import { validate } from 'vee-validate'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDown: false
    }
  },
  methods: {
    // 登录
    async userLogin () {
      // 1、获取表单数据
      const data = this.user
      // 2、表单校验
      const success = await this.$refs.myform.validate()
      // 验证不通过
      if (!success) {
        setTimeout(() => {
          const errors = this.$refs.myform.errors
          const item = Object.values(errors).find(item => item[0])
          this.$toast(item[0])
        }, 100)
        return
      }
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 3、请求提交
      try {
        const result = await login(data)
        this.$toast.success('登陆成功')
        this.$store.commit('setUser', result.data.data)
        this.$router.push('/')
      } catch (error) {
        this.$toast.fail('登陆失败')
      }
    },
    // 获取验证码
    async onSendCode () {
      // 1、获取手机号
      const { mobile } = this.user
      // 2、校验手机号
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
      // 3、发送验证码
      try {
        await getCode(mobile)
        // 倒计时打开
        this.isCountDown = true
      } catch (error) {
        // 关闭倒计时
        this.isCountDown = false
        // 如果错误为429显示错误信息
        if (error.response.status === 429) {
          this.$toast('请勿频繁发送')
          return
        }
        // 弹出错误信息
        this.$toast('验证码发送失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
@import url('../../styles/base.less');
.login-btn{
    padding: 27px 16px;
    .van-button--info{
        width: 100%;
        background-color: #6db4fb;
        border: none;
    }
}
</style>
