import Vue from 'vue'
import Post from './Post'

const app = new Vue(Post)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '发布'
  }
}
