import Vue from 'vue'
import PostDetail from './PostDetail'

const app = new Vue(PostDetail)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '日志'
  }
}
