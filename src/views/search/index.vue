<template>
  <div class="search_container">
    <!-- 顶部搜索栏 -->
    <form action="/" class="form">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @focus="isSearchShow=false"
        @input="getSuggest"
        @search="onSearch"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索列表 -->
    <SearchList :q="searchText" v-if="isSearchShow"></SearchList>
    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
        v-for="(item,index) in AssociationList"
        :key="index"
        icon="search"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell center title="历史记录">
        <template v-if="isClose">
          <span @click="HistoryList=[]">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isClose=false">完成</span>
        </template>
        <van-icon
          v-else
          slot="right-icon"
          name="delete"
          @click="isClose=true"
        />
      </van-cell>
      <van-cell
        v-for="(item,index) in HistoryList"
        :key="index"
        :title="item"
        @click="onHistory(item,index)"
      >
        <van-icon
          v-if="isClose"
          slot="default"
          name="close"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchList from '@/components/searchlist'
import { getAssociation } from '@/api/search.js'
import { setItem, getItem } from '@/utils/storage.js'
import { debounce } from 'lodash'
export default {
  name: 'Search',
  data () {
    return {
      searchText: '',
      isSearchShow: false,
      isClose: false,
      AssociationList: [], // 联想列表
      HistoryList: getItem('userhistory') || [] // 历史列表
    }
  },
  components: {
    SearchList
  },
  methods: {
    onSearch (value) {
      // 点击联想列表时
      this.searchText = value
      const index = this.HistoryList.indexOf(this.searchText)
      if (index !== -1) {
        this.HistoryList.splice(index, 1)
      }
      this.HistoryList.unshift(this.searchText)
      this.isSearchShow = true
    },
    // 获取联想建议
    getSuggest: debounce(async function () {
      if (!this.searchText) {
        return
      }
      const { data } = await getAssociation(this.searchText)
      this.AssociationList = data.data.options
    }, 250),
    // 高亮显示
    highlight (str) {
      const reg = new RegExp(this.searchText, 'ig')
      return str.replace(reg, `<span style="color:red;">${this.searchText}</span>`)
    },
    // 删除历史记录
    onHistory (item, index) {
      if (this.isClose) {
        this.HistoryList.splice(index, 1)
      } else {
        this.onSearch(item)
      }
    }
  },
  watch: {
    HistoryList () {
      setItem('userhistory', this.HistoryList)
    }
  }
}
</script>

<style scoped lang="less">
.search_container{
    padding-top: 54px;
    .form{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index: 2;
    }
}
</style>
