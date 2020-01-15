<template>
  <div class="reply_container">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      size="small"
      type="primary"
      :disabled="!message"
      @click="sendComment"
    >发送</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  data () {
    return {
      message: ''
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
  methods: {
    async sendComment () {
      try {
        const { data } = await addComment({
          target: this.comment.com_id,
          content: this.message,
          art_id: this.articleId.toString()
        })
        const newobj = data.data.new_obj
        this.$emit('reply', newobj)
        this.message = ''
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.reply_container{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  .van-field{
    background-color: #f5f5f5;
    margin-right: 10px;
  }
}
</style>
