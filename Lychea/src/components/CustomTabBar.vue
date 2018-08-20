<template>
<div class="tab-bar">
  <!-- begin item -->
  <div class="item"
    v-for="(item, itemIndex) in tabBar.list"
    :key="itemIndex"
  >
    <img
      v-if="!item.active"
      :src="item.iconPath"
    >
    <img
      v-if="item.active"
      :src="item.selectedIconPath"
    >
    <span>{{item.text}}</span>
  </div>
  <!-- end item  -->
</div>
</template>
<script>
export default {
  data () {
    return {
      tabBar: {
        currentPage: '1',
        list: [
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_home_default_w42_h42_2x.png',
            pagePath: 'pages/index/main',
            selectedIconPath: '../../static/img/icon/tabbar_home_active_w42_h42_2x.png',
            text: '首页'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_card_default_w42_h42_2x.png',
            pagePath: 'pages/petCardList/main',
            selectedIconPath: '../../static/img/icon/tabbar_card_active_w42_h42_2x.png',
            text: '小主卡'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_me_default_w42_h42_2x.png',
            pagePath: 'pages/me/main',
            selectedIconPath: '../../static/img/icon/tabbar_me_active_w42_h42_2x.png',
            text: '我的'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_release_default_w42_h42_2x.png',
            pagePath: 'pages/pickCard/main',
            selectedIconPath: '../../static/img/icon/tabbar_release_default_w42_h42_2x.png',
            text: ''
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">

</style>
