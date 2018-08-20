<template>
<div class="search-wrapper">

  <!-- <div class="search">
    <img class="search-icon" src="../../static/img/search_icon_activity_black_w26_h26_2x.png" />
    <input class="search-input" placeholder-style="color:#a1abbc; font-size: 28rpx;"  placeholder="搜索宠物信息 这里啥都有哦" />

    <div class="input-icon-clear">
        <icon type="clear" size="14"></icon>
    </div>
  </div>
  <div class="cancel-search">取&nbsp;消</div> -->
  <div class="search-panel">
      <img class="icon" src="../../static/img/icon/search_icon_default_gray_w26_h26_2x.png" />
      <div class="text">搜索宠物信息 这里啥都有哦</div>
  </div>

</div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.search-wrapper {
  background: #ffd220;
  display: flex;
  padding: 26rpx 30rpx;
  .search {
    background: #fff;
    border-radius: 4px;
    flex: 1;
    height: 64rpx;
    line-height: 64rpx;
    overflow: hidden;
    position: relative;
    .search-icon {
      float: left;
      height: 52rpx;
      margin: 6rpx 10rpx 6rpx 8rpx;
      width: 52rpx;
    }
    .search-input {
      color: #333;
      font-size: 15px;
      height: 64rpx;
      line-height: 64rpx;
      text-align: left;
    }
    .input-icon-clear {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 10px;
      position: absolute;
      right: 0;
      top: 0;
      z-index: 10;
    }
  }
  .cancel-search {
    color: #fff;
    display: inline-block;
    font-size: 16px;
    text-align: right;
    height: 64rpx;
    line-height: 64rpx;
    width: 120rpx;
  }
  .search-panel {
    background: #fff;
    border-radius: 4px;
    height: 64rpx;
    line-height: 64rpx;
    position: relative;
    width: 100%;
    .icon {
      display: inline-block;
      height: 52rpx;
      margin: 6rpx 10rpx 6rpx 100rpx;
      width: 52rpx;
    }
    .text {
      color: #a1abbc;
      font-size: 15px;
      height: 64rpx;
      left: 0;
      line-height: 64rpx;
      min-width: 360rpx;
      position: absolute;
      text-align: center;
      top: 0;
      width: 100%;
      z-index: 100;
    }
  }
}

</style>
