<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item,index) in resultList"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getList } from '@/api/search.js'
export default {
  name: 'SearchList',
  data () {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      resultList: [] // 搜索列表
    }
  },
  props: {
    q: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1、获取数据
      const { data } = await getList({
        page: this.page,
        per_page: this.per_page,
        q: this.q
      })
      // 2、把数据给到列表中
      const results = data.data.results
      this.resultList.push(...results)
      // 3、全部加载完成
      this.loading = false
      //   4、全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>
</style>
