import Vue from 'vue'
import AddPet from './AddPet'

const app = new Vue(AddPet)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '添加小主'
  }
}
