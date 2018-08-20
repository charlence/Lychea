<template>
  <div class="fixed-top"
    :class="!customNavBar.backgroundWhite ? 'white' : ''"
  >
    <div class="status-bar" :style="statusBarStyle"></div>
    <!-- begin title-bar -->
    <div class="title-bar" :style="titleBarStyle">
      <div class="title-bar-side">
        <img class="title-icon"
          :src="customNavBar.icon"
        >
      </div>
      <h1>{{customNavBar.title}}</h1>
    </div>
    <!-- end title-bar -->
  </div>
</template>
<script>
export default {
  props: ['customNavBar'],
  computed: {
    statusBarStyle () {
      return `height: ${this.customNavBar.statusBarHeight}px`
    },
    titleBarStyle () {
      return `height: ${this.customNavBar.titleBarHeight}px`
    }
  }
}
</script>
<style lang="scss">
.fixed-top {
  background: #fff;
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
      margin-right: 80rpx;
      text-align: center;
    }
  }
}
.fixed-top.white {
  background: #fff;
}
</style>
