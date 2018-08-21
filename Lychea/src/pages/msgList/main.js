import Vue from 'vue'
import MsgList from './MsgList'

const app = new Vue(MsgList)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '消息通知'
  }
}
