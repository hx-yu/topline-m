<template>
  <div class="userarticle_container">
      <van-nav-bar
        title="用户作品、收藏、历史"
        left-arrow
        @click-left="$router.back()"
        fixed=""
      />
      <van-tabs v-model="active">
        <van-tab title="收藏">
            <user-collect/>
        </van-tab>
        <van-tab title="历史">
            <user-history/>
        </van-tab>
        <van-tab title="作品">
            <user-current-article/>
        </van-tab>
      </van-tabs>
  </div>
</template>

<script>
import UserCurrentArticle from '@/components/userarticle'
import UserCollect from '@/components/usercollect'
import UserHistory from '@/components/userhistory'
export default {
  name: 'UserArticle',
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2
    }
    return {
      active
    }
  },
  methods: {},
  components: {
    UserCurrentArticle,
    UserCollect,
    UserHistory
  }
}
</script>

<style scoped lang="less">
.userarticle_container{
    padding-top: 90px;
    .van-nav-bar{
        background-color: #3196fa;
        ::v-deep .van-icon,.van-nav-bar__title{
            color:white;
        }
    }
    .van-tabs{
        ::v-deep .van-tabs__wrap{
            position: fixed;
            left: 0;
            right: 0;
            top: 47px;
            z-index: 1;
        }
    }
}
</style>
