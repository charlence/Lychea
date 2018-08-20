import Vue from 'vue'
import Reply from './Reply'

const app = new Vue(Reply)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '评论'
  }
}
