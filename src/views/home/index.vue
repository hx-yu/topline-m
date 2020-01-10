<template>
  <div class="home_container">
    <!-- 导航 -->
    <van-nav-bar>
      <img src="../../assets/img/logo-light.png" slot="left" />
      <van-icon name="search" slot="right" />
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab v-for="item in list" :key="item.id" :title="item.name">
        <Articleslist :channel="item"></Articleslist>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Articleslist from '../../components/articlelist'
import { getChannels } from '@/api/articles.js'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      list: []
    }
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      const result = await getChannels()
      this.list = result.data.data.channels
    }
  },
  components: {
    Articleslist
  },
  created () {
    this.getChannel()
  }
}
</script>

<style scoped lang="less">
.home_container {
  .van-nav-bar {
    height: 46px;
    background-color: #3196fa;
    line-height: 46px;
    img {
      position: relative;
      top: 8px;
      width: 100px;
      height: 30px;
    }
    .van-icon {
      color: #ffffff;
    }
  }
}
</style>
