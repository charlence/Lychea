import Vue from 'vue'
import Search from './Search'

const app = new Vue(Search)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '来吱   小主的世界',
    'enablePullDownRefresh': true
  }
}
