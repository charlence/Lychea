import Vue from 'vue'
import PetCardList from './PetCardList'

const app = new Vue(PetCardList)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '榜单'
  }
}
