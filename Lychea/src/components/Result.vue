<template>
  <div class="search-result">
    <!-- begin item -->
    <div class="item">
      <div class="pic">
        <img src="../../static/img/icon/default_user_photo_w40_h40_2x.png" alt="">
      </div>
      <div class="text">
        <div class="nickname">王阿暖暖</div>
        <div class="content">
          威尔士柯基全又称之为威尔士短腿狗，是时下很受欢迎的一个犬种，由于身长腿短长..
        </div>
        <div class="kind">#想领养#</div>
      </div>
    </div>
    <!-- end item -->
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
  .search-result {
    padding: 30rpx 30rpx 0 30rpx;
    overflow: hidden;
    .item {
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      padding-bottom: 30rpx;
      position: relative;
      width: 100%;
      .pic {
        display: inline-block;
        height: 120rpx;
        margin-right: 20rpx;
        width: 120rpx;
        img {
          display: block;
          height: 120rpx;
          width: 120rpx;
        }
      }
      .text {
        flex: 1;
        overflow: hidden;
        .nickname {
          color: #333;
          font-size: 16px;
          height: 36rpx;
          line-height: 36rpx;
          margin-bottom: 12rpx;
        }
        .content {
          color: #78818F;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          height: 72rpx;
          line-height: 36rpx;
          overflow: hidden;
        }
      }
      .kind {
        color: #FF9F00;
        font-size: 14px;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
      }
    }
  }
</style>
