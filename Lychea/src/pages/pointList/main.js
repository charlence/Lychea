import Vue from 'vue'
import PointList from './PointList'

const app = new Vue(PointList)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '积分'
  }
}
