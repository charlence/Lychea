import Vue from 'vue'
import BindPhone from './BindPhone'

const app = new Vue(BindPhone)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '绑定手机'
  }
}
