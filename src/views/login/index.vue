<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        label="手机号"
        placeholder="请输入手机号"
        required
      />
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码" required>
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn">
        <van-button @click="userLogin" type="info">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async userLogin () {
      // 表单校验
      const data = this.user
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '登录中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const res = await login(data)
        this.$toast.success('登陆成功')
        console.log(res)
      } catch (error) {
        this.$toast.fail('登陆失败')
        console.log(error)
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
