import Vue from 'vue'
import Ranking from './Ranking'

const app = new Vue(Ranking)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '榜单'
  }
}
