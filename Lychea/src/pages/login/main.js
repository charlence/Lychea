import Vue from 'vue'
import Login from './Login'

const app = new Vue(Login)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '榜单'
  }
}
