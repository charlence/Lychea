import Vue from 'vue'
import Oath from './Oath'

const app = new Vue(Oath)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '终生宠爱承诺'
  }
}
