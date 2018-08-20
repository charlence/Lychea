import Vue from 'vue'
import PetClass from './PetClass'

const app = new Vue(PetClass)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '城市'
  }
}
