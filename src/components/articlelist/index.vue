<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  getArticles
} from '@/api/articles.js'
export default {
  name: 'Articlelist',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 1、获取数据
      const {
        data
      } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const results = data.data.results
      // 2、把数据给到this.list
      this.list.push(...results)
      // 3、数据加载完成后结束加载状态
      this.loading = false
      // 4、数据全部加载完成
      if (results.length) {
        // 更新获取下一页数据的时间戳
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把 finished 设置为 true，不再加载更多
        this.finished = true
      }
    },
    // 下拉刷新列表
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    }
  }
}

</script>

<style>
</style>
