<template>
  <div class="channel_edit">
    <van-cell-group>
      <!-- 我的频道 -->
      <van-cell :border="false" title="我的频道">
        <van-button
          type="danger"
          round
          size="mini"
          slot="right-icon"
          @click="isEdit=!isEdit"
        >{{isEdit?'完成':'编辑'}}</van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(item,index) in userChannels"
          :key="item.id"
          @click="onEdit(index)"
        >
          <span
            slot="text"
            class="text"
            :class="{active:index===value}"
          >{{item.name}}</span>
          <van-icon
            slot="icon"
            class="close"
            name="close"
            v-show="isEdit===true&&item.id!=0"
          />
        </van-grid-item>
      </van-grid>
      <!-- 推荐频道 -->
      <van-cell :border="false" title="推荐频道"/>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="item in restChannel"
          :key="item.id"
          :text="item.name"
          @click="onAdd(item)"
        ></van-grid-item>
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels.js'
import { setItem } from '../../utils/storage.js'
export default {
  data () {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 获取所有频道列表
    async getAllChannel () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    // 编辑列表
    onEdit (index) {
      if (this.isEdit && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('input', index)
        this.$emit('close')
      }
    },
    // 添加列表
    onAdd (item) {
      this.userChannels.push(item)
    }
  },
  computed: {
    restChannel () {
      const channels = []
      const { allChannels, userChannels } = this
      allChannels.forEach(item => {
        if (!userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  },
  created () {
    this.getAllChannel()
  },
  watch: {
    userChannels () {
      setItem('userChannel', this.userChannels)
    }
  }
}
</script>

<style scoped lang="less">
.channel_edit {
  padding: 40px 10px 0 10px;
  .close{
      position: absolute;
      top: -25px;
      left: 25px;
      font-size: 18px;
  }
  .text{
      font-size: 14px;
  }
  .active{
      color: red;
  }
}
</style>
