<template>
  <div class="reply_container">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
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
  methods: {
    async sendComment () {
      try {
        const { data } = await addComment({
          target: this.articleId,
          content: this.message
        })
        console.log(data)
        const result = data.data.new_obj
        this.$emit('addComment', result)
        this.message = ''
        this.$emit('close')
      } catch (error) {
        console.log(error)
      }
    }
  },
  props: {
    articleId: {
      type: [String, Array, Number, Object],
      required: true
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
