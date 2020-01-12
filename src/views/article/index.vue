<template>
  <div>
      文章详情页
      {{articleId}}
  </div>
</template>

<script>
export default {
  name: 'Article',
  props: {
    articleId: {
      type: [String, Array, Number, Object],
      required: true
    }
  }

}
</script>

<style>

</style>
