<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar title="文章详情" left-arrow fixed @click-left="$router.back()"></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading class="loading" color="#1989fa" vertical v-if="isLoadingShow">
      <!-- <slot>加载中...</slot> -->
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="details.title">
      <h3 class="title">{{details.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image class="avatar" round fit="cover" :src="details.aut_photo" />
          <div class="text">
            <p class="name">{{details.aut_name}}</p>
            <p class="time">{{details.pubdate | transTime}}</p>
          </div>
        </div>
        <van-button
          v-if="!$store.state.user || details.aut_id !== $store.state.user.id"
          class="follow-btn"
          :type="details.is_followed?'default':'info'"
          size="small"
          round
          :loading="isFollowLoading"
          @click="onFollow"
        >{{details.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="markdown-body" v-html="details.content"></div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="../../assets/img/no-network.png" alt="no-network" />
      <p class="text">亲，网络不给力哦~</p>
      <van-button class="btn" type="default" size="small">点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length?'人家也是有底线的':''"
      @load="onLoad"
    >
      <ArticleComments
        :comment="item"
        v-for="(item,index) in list"
        :key="index"
        :title="item.content"
        @open="onReply"
      />
    </van-list>
    <!-- /评论列表 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon class="comment-icon" name="comment-o" :info="totalCount" />
      <van-icon
        color="orange"
        :name="details.is_collected?'star':'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="details.attitude===1?'good-job':'good-job-o'"
        @click="onLike"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

    <!-- 发表评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        :articleId="articleId"
        @addComment="sendComment"
        @close="isPostShow=false"
      />
    </van-popup>
    <!-- /发表评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 95%"
    >
      <ReplyComment
      v-if="isReplyShow"
      :comment="currentComment"
      :articleId="articleId"
      @close="isReplyShow=false"
      ></ReplyComment>
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import ArticleComments from '@/components/comment'
import PostComment from '@/components/postcomment'
import ReplyComment from '@/components/replycomment'
import {
  getArticleDetails,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/articles'
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'Article',
  props: {
    articleId: {
      type: [String, Array, Number, Object],
      required: true
    }
  },
  data () {
    return {
      isFollowLoading: false,
      isLoadingShow: true,
      details: {},
      list: [],
      loading: false,
      finished: false,
      offset: null,
      totalCount: null,
      isPostShow: false,
      isReplyShow: false,
      currentComment: {}
    }
  },
  components: {
    ArticleComments,
    PostComment,
    ReplyComment
  },
  methods: {
    onReply (comment) {
      this.currentComment = comment
      this.isReplyShow = true
    },
    sendComment (result) {
      this.list.unshift(result)
      this.totalCount++
    },
    async onLoad () {
      try {
        const { data } = await getComments({
          type: 'a',
          source: this.articleId,
          offset: this.offset,
          limit: 10
        })
        const results = data.data.results
        this.list.push(...results)
        this.totalCount = data.data.total_count
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
    },
    async getArticle () {
      this.isLoadingShow = true
      try {
        const { data } = await getArticleDetails(this.articleId)
        this.details = data.data
      } catch (error) {
        console.log(error)
      }
      this.isLoadingShow = false
    },
    async onCollect () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.details.is_collected) {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.details.is_collected = !this.details.is_collected
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.details.attitude === 1) {
          await deleteLike(this.articleId)
          this.details.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          this.details.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    },
    async onFollow () {
      this.isFollowLoading = true
      try {
        if (this.details.is_followed) {
          await deleteFollow(this.details.aut_id)
        } else {
          await addFollow(this.details.aut_id)
        }
        this.details.is_followed = !this.details.is_followed
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 150px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3a3a3a;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
