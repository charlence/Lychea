import Vue from 'vue'
import Area from './Area'

const app = new Vue(Area)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '城市'
  }
}
