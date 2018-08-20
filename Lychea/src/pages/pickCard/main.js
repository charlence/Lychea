import Vue from 'vue'
import PickCard from './PickCard'

const app = new Vue(PickCard)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '选择小主卡'
  }
}
