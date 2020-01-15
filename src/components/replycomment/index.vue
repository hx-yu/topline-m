<template>
  <div>
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon name="cross" slot="left" @click="$emit('close')" />
    </van-nav-bar>
    <ArticleComment :comment="comment"></ArticleComment>
    <van-cell title="全部回复" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleComment
        v-for="(item,index) in list"
        :key="index"
        :comment="item"
      ></ArticleComment>
    </van-list>
    <van-button
      type="default"
      class="btn"
      @click="isReplyShow=true"
    >写评论</van-button>
    <van-popup
    v-model="isReplyShow"
    position="bottom"
    :style="{ height: '20%' }"
    >
      <ReplyComments
        :comment="comment"
        :articleId="articleId"
        @reply='onReply'
      ></ReplyComments>
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from '@/components/comment'
import ReplyComments from '@/components/replycomments'
import { getComments } from '@/api/comment'
export default {
  name: 'ReplyComment',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20,
      isReplyShow: false
    }
  },
  methods: {
    onReply (results) {
      this.list.unshift(results)
      this.comment.reply_count++
      this.isReplyShow = false
    },
    async onLoad () {
      try {
        const { data } = await getComments({
          type: 'c',
          source: this.comment.com_id.toString(),
          offset: this.offset,
          limit: this.limit
        })
        const results = data.data.results
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Array, Number, Object],
      required: true
    }
  },
  components: {
    ArticleComment,
    ReplyComments
  }
}
</script>

<style scoped lang="less">
.btn {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
