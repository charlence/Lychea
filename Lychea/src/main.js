import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [
      'pages/addPet/main',
      'pages/area/main',
      'pages/bindPhone/main',
      'pages/index/main',
      'pages/login/main',
      'pages/me/main',
      '^pages/msgList/main',
      'pages/oath/main',
      'pages/oathDetail/main',
      'pages/petCardList/main',
      'pages/petClass/main',
      'pages/petDossier/main',
      'pages/pickCard/main',
      'pages/pickTopic/main',
      'pages/pointList/main',
      'pages/post/main',
      'pages/postDetail/main',
      'pages/reply/main',
      'pages/ranking/main',
      'pages/search/main',
      'pages/topicForm/main'
    ],
    window: {
      navigationStyle: 'custom',
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
    // tabBar: {
    //   backgroundColor: '#333',
    //   color: '#f3f4f6',
    //   selectedColor: '#FFD220',
    //   list: [
    //     {
    //       text: '首页',
    //       pagePath: 'pages/index/main',
    //       iconPath: '/static/img/icon/tabbar_home_default_w42_h42_2x.png',
    //       selectedIconPath: '/static/img/tab1.png'
    //     },
    //     {
    //       text: '小主卡',
    //       pagePath: 'pages/petCardList/main',
    //       iconPath: '/static/img/icon/tabbar_card_default_w42_h42_2x.png',
    //       selectedIconPath: '/static/img/icon/tabbar_card_active_w42_h42_2x.png'
    //     },
    //     {
    //       text: '我的',
    //       pagePath: 'pages/me/main',
    //       iconPath: '/static/img/icon/tabbar_me_default_w42_h42_2x.png',
    //       selectedIconPath: '/static/img/icon/tabbar_me_active_w42_h42_2x.png'
    //     },
    //     {
    //       text: '',
    //       pagePath: 'pages/pickCard/main',
    //       iconPath: '/static/img/icon/tabbar_release_default_w42_h42_2x.png',
    //       selectedIconPath: '/static/img/icon/tabbar_release_default_w42_h42_2x.png'
    //     }
    //   ]
    // }
  }
}
