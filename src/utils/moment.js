import Vue from 'vue'
import moment from 'moment'

moment.locale('zh-cn')

Vue.filter('transTime', value => {
  return moment(value).startOf('day').fromNow()
})
