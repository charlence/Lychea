<template>
<div class="ranking-content">
  <scroll-view
    class="scroll-view-v"
    @scrolltolower="scrollLoad"
    bindscroll="scroll"
  >
    <div class="ranking-list">
      <div class="item"
        v-for="(item, itemIndex) in ranking.list"
        :key="itemIndex"
      >
        <div class="position">{{item.rank}}</div>
        <!-- begin pet-baby -->
        <div class="pet-baby">
          <div class="pic">
            <img src="../../static/img/icon/default_user_photo_w40_h40_2x.png" alt="">
          </div>
          <div class="text">
            <div class="name female-name">{{item.nickname}}</div>
            <div class="breed">
              <div class="content female-breed">
                <span>{{item.breed}}</span>
                <img class="female-breed-flag" src="../../static/img/icon/gender_icon_female_white_w9_h10_2x.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <!-- end pet-baby -->
        <!-- begin support -->
        <div class="support"
          v-if="ranking.type.liked">
          <p>{{item.liked}}</p>
          <span>获赞</span>
        </div>
        <!-- end support -->
        <!-- begin support -->
        <div class="support"
          v-if="ranking.type.witness">
          <p>1212</p>
          <span>见证人</span>
        </div>
        <!-- end support -->
      </div>
    </div>
  </scroll-view>

</div>


</template>
<script>
export default {
  props: ['ranking'],
  methods: {
    handleClick (item) {
      console.log(item)
      if (this.type === 'user') {
        console.log('跳转前')
        wx.navigateTo({
          // url: '/pages/detail/main?id=' + comment.bookid
        })
      }
    }
  }
}
</script>
<style lang="scss">
.ranking-list {
  background: #fff;
  padding-top: 12rpx;
  .item {
    display: flex;
    overflow: hidden;
    padding: 22rpx 30rpx;
    .position {
      color: #78818f;
      display: inline-block;
      font-size: 18px;
      height: 88rpx;
      line-height: 88rpx;
      text-indent: 10rpx;
      width: 80rpx;
    }
    .pet-baby {
      flex: 1;
      height: 88rpx;
      overflow: hidden;
      .pic {
        float: left;
        height: 88rpx;
        width: 88rpx;
        img {
          display: block;
          height: 88rpx;
          width: 88rpx;
        }
      }
      .text {
        float: left;
        height: 88rpx;
        margin-left: 20rpx;
        overflow: hidden;
        .name {
          color: #333;
          font-family: PingFangSC-Regular;
          font-size: 15px;
          height: 36rpx;
          line-height: 36rpx;
          margin-bottom: 16rpx;
          width: 100%;
        }
        .breed {
          color: #fff;
          font-size: 12px;
          height: 32rpx;
          overflow: hidden;
          width: 100%;
          .content {
            border-radius: 10px;
            display: inline-block;
            padding: 0 12rpx;
            span {
              float: left;
              height: 32rpx;
              line-height: 32rpx;
            }
            img {
              float: left;
              height: 20rpx;
              margin: 6rpx 0 6rpx 4rpx;
              width: 18rpx;
            }
          }
          .female-breed {
            background: #FF6F8A;
          }
          .male-breed {
            background: #52B0FF;
          }
        }
      }
    }
    .support {
      display: inline-block;
      height: 88rpx;
      text-align: right;
      width: 140rpx;
      p {
        color: #565e6a;
        font-size: 15px;
        font-weight: PingFangSC-Semibold;
        height: 28rpx;
        margin-bottom: 16rpx;
        line-height: 28rpx;
      }
      span {
        color: #78818f;
        font-size: 13px;
        font-weight: PingFangSC-Regular;
        height: 28rpx;
        line-height: 28rpx;
      }
    }
  }
}

</style>
