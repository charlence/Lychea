<template>
  <div class="fixed-top">
    <div class="status-bar" :style="statusBarStyle"></div>
    <!-- begin title-bar -->
    <div class="title-bar" :style="titleBarStyle">
      <div class="title-bar-side"
        @click="goToSearch"
      >
        <img class="title-icon"
          :src="getSearchIcon" alt=""
        >
      </div>
      <h1>来吱宠</h1>
    </div>
    <!-- end title-bar -->
  </div>
</template>
<script>
import consts from '@/utils/constant'
export default {
  props: ['customNavBar'],
  computed: {
    getSearchIcon () {
      return `${consts.HOMESEARCHICON}`
    },
    statusBarStyle () {
      return `height: ${this.customNavBar.statusBarHeight}px`
    },
    titleBarStyle () {
      return `height: ${this.customNavBar.titleBarHeight}px`
    }
  },
  methods: {
    // goToSearch 通知父组件前往搜索页
    goToSearch () {
      this.$emit('fromNavBarHome', 'search')
    }
  }
}
</script>
<style lang="scss">
.fixed-top {
  background: #FFD220;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
  .status-bar {
    display: block;
    width: 100%;
  }
  .title-bar {
    align-items: center;
    display: flex;
    flex-direction: row;
    width: 100%;
    .title-bar-side {
      display: inline-block;
      height: 60rpx;
      padding: 0 20rpx;
      .title-icon {
        display: block;
        height: 52rpx;
        margin-top: 4rpx;
        width: 52rpx;
      }
    }
    h1 {
      align-items: center;/*垂直居中*/
      color: #000;
      flex: 1;
      font-size: 36rpx;
      font-weight: bold;
      margin-right: 80rpx;
      text-align: center;
    }
  }
}
</style>
