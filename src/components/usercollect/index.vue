<template>
  <div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item,index) in list"
          :key="index"
          :title="item.title"
          @click="$router.push({
            name:'Article',
            params:{
              articleId:item.art_id.toString()
            }
          })"
        />
      </van-list>
  </div>
</template>

<script>
import { getUserCollect } from '@/api/user'
export default {
  name: 'UserCollect',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getUserCollect({
        page: this.page,
        per_page: this.perPage
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
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
