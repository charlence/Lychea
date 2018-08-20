import Vue from 'vue'
import PickTopic from './PickTopic'

const app = new Vue(PickTopic)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '选择小主卡'
  }
}
