<template>
  <div class="my_container">
    <!-- 登陆状态 -->
    <div v-if="$store.state.user" class="header">
      <div class="info">
        <van-image round :src="user.photo" />
        <span>{{user.name}}</span>
        <van-button round type="info">编辑资料</van-button>
      </div>
      <van-grid :border="false">
        <van-grid-item>
          <span>{{user.art_count}}</span>
          <span>头条</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.follow_count}}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.fans_count}}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item>
          <span>{{user.like_count}}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 未登录状态 -->
    <div v-else class="no_login" @click="login">
      <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>点击登录</span>
    </div>
    <!-- 收藏系列 -->
    <van-grid class="collect"  :border="false">
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="clock-o" text="浏览历史" />
      <van-grid-item icon="edit" text="作品" />
    </van-grid>
    <!-- 列表 -->
    <van-cell-group class="sms">
      <van-cell title="消息通知" is-link />
      <van-cell title="实名认证" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- 退出登录 -->
    <van-cell-group class="loginout" @click="logout">
      <van-cell>
        <span>退出登录</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getInfo } from '@/api/user.js'
export default {
  name: 'My',
  data () {
    return {
      user: null
    }
  },
  methods: {
    // 登录
    login () {
      this.$router.push('/login')
    },
    // 退出
    logout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认要退出吗?'
      }).then(() => {
        this.$store.commit('setUser', null)
      }).catch(() => {
        this.$toast('取消退出')
      })
    },
    // 获取数据
    async getUserInfo () {
      const result = await getInfo()
      this.user = result.data.data
    }
  },
  created () {
    if (this.$store.state.user) {
      this.getUserInfo()
    }
  }
}
</script>

<style scoped lang="less">
.my_container {
  .header {
    height: 200px;
    background: url("../../assets/img/banner.png");
    background-size: cover;
    padding: 55px 20px 0 20px;
    .info {
      display: flex;
      align-content: center;
      .van-image {
        width: 75px;
        height: 75px;
        border-radius: 50%;
      }
      span {
        margin: 15px;
      }
      .van-button {
        margin-top: 10px;
        margin-left: 60px;
      }
    }
    .van-grid {
      margin-top: 30px;
      ::v-deep .van-grid-item__content {
        background: none;
      }
    }
  }
  .no_login {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 200px;
    background: url("../../assets/img/banner.png");
    background-size: cover;
    padding: 55px 20px 0 20px;
    .van-image {
      width: 75px;
      height: 75px;
    }
  }
  .collect {
    display: flex;
    justify-content: space-around;
  }
  .sms{
    margin-top: 20px;
  }
  .loginout{
    display: flex;
    justify-content: center;
    ::v-deep .van-cell__value{
      text-align: center;
    }
  }
}
</style>
