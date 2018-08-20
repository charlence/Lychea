import Vue from 'vue'
import PetDossier from './PetDossier'

const app = new Vue(PetDossier)
app.$mount()

export default {
  config: {
    'navigationBarTitleText': '小主档案'
  }
}
