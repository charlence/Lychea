<template>
<div class="tab-bar">
  <!-- begin item -->
  <div class="item"
    v-for="(item, itemIndex) in tabBar.list"
    :key="itemIndex"
    :class="tabBar.currentPage == itemIndex + 1 ? 'active' : ''"
    @click="switchPage(itemIndex)"
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
import utils from '@/util'
export default {
  props: ['customTabBar'],
  data () {
    return {
      tabBar: {
        currentPage: this.customTabBar.currentPage,
        list: [
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_home_default_w42_h42_2x.png',
            pagePath: '/pages/index/main',
            selectedIconPath: '../../static/img/icon/tabbar_home_active_w42_h42_2x.png',
            text: '首页'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_card_default_w42_h42_2x.png',
            pagePath: '/pages/petCardList/main',
            selectedIconPath: '../../static/img/icon/tabbar_card_active_w42_h42_2x.png',
            text: '小主卡'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_me_default_w42_h42_2x.png',
            pagePath: '/pages/me/main',
            selectedIconPath: '../../static/img/icon/tabbar_me_active_w42_h42_2x.png',
            text: '我的'
          },
          {
            active: false,
            iconPath: '../../static/img/icon/tabbar_release_default_w42_h42_2x.png',
            pagePath: '/pages/pickCard/main',
            selectedIconPath: '../../static/img/icon/tabbar_release_default_w42_h42_2x.png',
            text: ''
          }
        ]
      }
    }
  },
  methods: {
    // switchPage 切换tabbar页面
    switchPage (itemIndex) {
      let url = this.tabBar.list[itemIndex].pagePath
      console.log('===url===', url)
      utils.redirectToPage(url)
      // switch (itemIndex) {
      //   case 0:
      //     url = this.tabBar.list[0].pagePath
      //     utils.redirectToPage(url)
      //     break
      //   case 1:
      //
      //     break
      //   case 2:
      //
      //     break
      //   default:
      //
      // }
    }
  },
  mounted () {
    let currentPageIndex = this.tabBar.currentPage - 1
    this.tabBar.list[currentPageIndex].active = true
  }
}
</script>
<style lang="scss">
.tab-bar {
  bottom: 0;
  display: flex;
  flex-direction: row;
  height: 100rpx;
  justify-content: space-between;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: 1000;
  .item {
    background: #333;
    color: #f3f4f6;
    font-size: 20rpx;
    text-align: center;
    width: 25%;
    img {
      display: block;
      margin: 8rpx auto;
      height: 56rpx;
      width: 56rpx;
    }
    span {
      display: block;
      height: 24rpx;
      line-height: 24rpx;

    }
  }
  .item.active {
    span {
      color: #ffd220;
    }
  }
  .item:last-child {
    background: #FFD220;
    img {
      margin: 24rpx auto;
    }
  }
  .item:last-child.acitve{
    background: #FFD220;
  }
}
</style>
