import Vue from 'vue'
import App from './Index'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    enablePullDownRefresh: true,
    navigationStyle: 'custom',
    onReachBottomDistance: 50
  }
}
