<template>
  <div>
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      left-arrow
      @click-left="$emit('close')"
      @click-right="$emit('onsave',message)"
    />
    <van-field
      rows="2"
      autosize
      :value="userName"
      type="textarea"
      maxlength="20"
      :placeholder="userName"
      show-word-limit
      @input="message=$event"
    />
  </div>
</template>

<script>
export default {
  name: 'EditName',
  data () {
    return {
      message: ''
    }
  },
  props: {
    userName: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
</style>
