<template>
  <div class="home_container">
    <!-- 导航 -->
    <van-nav-bar fixed>
      <img src="../../assets/img/logo-light.png" slot="left" />
      <van-icon @click="$router.push('/search')" name="search" slot="right" />
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-icon @click="isPopupShow=true" slot="nav-right" name="wap-nav"/>
      <van-tab v-for="item in list" :key="item.id" :title="item.name">
        <Articleslist :channel="item"></Articleslist>
      </van-tab>
    </van-tabs>
    <!-- 下弹框 -->
    <van-popup
      v-model="isPopupShow"
      close-icon-position="top-left"
      closeable
      round
      position="bottom"
      :style="{ height: '95%' }"
    >
      <Channeledit
        v-model="active"
        :userChannels="list"
        @close="isPopupShow=false"
      ></Channeledit>
    </van-popup>
  </div>
</template>

<script>

import Articleslist from '../../components/articlelist'
import Channeledit from '../../components/channeledit'
import { getChannels } from '@/api/articles.js'
import { getItem } from '../../utils/storage.js'
export default {
  name: 'Home',
  data () {
    return {
      isPopupShow: false,
      active: 0,
      list: []
    }
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      const localStorage = getItem('userChannel')
      if (localStorage) {
        this.list = localStorage
      } else {
        const result = await getChannels()
        this.list = result.data.data.channels
      }
    }
  },
  components: {
    Articleslist,
    Channeledit
  },
  created () {
    this.getChannel()
  }
}
</script>

<style scoped lang="less">
.home_container {
  padding-top: 90px;
  padding-bottom: 50px;
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
  ::v-deep .van-tabs__wrap{
    position: fixed;
    top: 46px;
    left:0;
    right: 0;
    z-index: 1;
    .van-icon{
      position: fixed;
      right: 0;
      font-size: 20px;
      line-height: 44px;
      background-color: #fff;
    }
  }
}
</style>
