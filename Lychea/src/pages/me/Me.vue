<template>
<div class="wrapper me"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin header -->
  <div class="header">
    <!-- begin user -->
    <div class="user">
      <img class="avatar"
        src="../../../static/img/icon/default_user_photo_w40_h40_2x.png">
      <div class="userinfo">
        <div class="nickname">
          Charlence
        </div>
        <div class="pet-owner">
          有爱的铲屎官
        </div>
      </div>
    </div>
    <!-- end userinfo -->
  </div>
  <!-- end header -->
  <!-- begin center -->
  <div class="center">
    <!-- begin user-extra-info -->
    <div class="user-extra-info">
      <div class="item"
        @click="goToPetList"
      >
        <span class="item-num">9</span>
        <span>小主卡</span>
      </div>
      <div class="item"
        @click="goToPetList"
      >
        <span class="item-num">8</span>
        <span>已关注</span>
      </div>
      <div class="item"
        @click="viewPage('points')"
      >
        <span class="item-num">401200</span>
        <span>积分</span>
      </div>
    </div>
    <!-- end user-extra-info -->
    <!-- begin log-category -->
    <div class="log-category">
      <div class="item"
        @click="viewPage('replies')"
      >
        <img src="../../../static/img/icon/mine_msg_w88_h88_1x.png">
        <span>消息</span>
      </div>
      <div class="item"
        @click="viewPage('posts')"
      >
        <img src="../../../static/img/icon/mine_post_w88_h88_1x.png">
        <span>日志</span>
      </div>
      <div class="item"
        @click="viewPage('comments')"
      >
        <img src="../../../static/img/icon/mine_comment_w88_h88_1x.png">
        <span>评论</span>
      </div>
      <div class="item"
        @click="viewPage('likes')"
      >
        <img src="../../../static/img/icon/mine_like_w88_h88_1x.png">
        <span>点赞</span>
      </div>
    </div>
    <!-- end log-category  -->
    <!-- begin lychea-notice -->
    <div class="lychea-notice">
      <dl class="item">
        <dt><img src="../../../static/img/icon/my_exchange_w60_h60_1x.png"></dt>
        <dd>
          兑换记录
          <span></span>
        </dd>
      </dl>
      <dl class="item">
        <dt><img src="../../../static/img/icon/my_faq_w60_h60_1x.png"></dt>
        <dd>
          常见问题
          <span></span>
        </dd>
      </dl>
      <dl class="item">
        <dt><img src="../../../static/img/icon/my_contact_w60_h60_1x.png"></dt>
        <dd>
          联系我们
          <span></span>
        </dd>
      </dl>
      <dl class="item">
        <dt><img src="../../../static/img/icon/my_about_us_w60_h60_1x.png"></dt>
        <dd>
          关于来吱宠
          <span></span>
        </dd>
      </dl>
      <dl class="item">
        <dt><img src="../../../static/img/icon/my_set_w60_h60_1x.png"></dt>
        <dd>
          设置
          <span></span>
        </dd>
      </dl>
    </div>
    <!-- end lychea-notice -->
  </div>
  <!-- end center -->
</div>
</template>
<script>
import CustomNavBarOther from '@/components/CustomNavBarOther'
import utils from '@/util'
export default {
  data () {
    return {
      customNavBar: {
        title: '我的',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: true
      }
    }
  },
  components: {
    CustomNavBarOther
  },
  methods: {
    init () {
      this.setCustomNavBar()
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // goToPetList 前往我的小主卡列表/我关注的小主卡列表
    goToPetList () {

    },
    // viewPage 查看页面，视参数不同
    viewPage (param) {
      switch (param) {
        case 'points':
          // 进入积分
          wx.navigateTo({
            url: '/pages/points/main'
          })
          break
        case 'replies':
          // 进入消息，他人回复列表
          wx.navigateTo({
            url: '/pages/points/main'
          })
          break
        case 'posts':
          // 进入本人的日志列表
          wx.navigateTo({
            url: '/pages/points/main'
          })
          break
        case 'comments':
          // 进入本人的评论列表
          wx.navigateTo({
            url: '/pages/points/main'
          })
          break
        case 'likes':
          // 进入本人的点赞列表
          wx.navigateTo({
            url: '/pages/points/main'
          })
          break
        default:
      }
    }

  },
  mounted () {
    this.init()
  },
  onLoad () {

  },
  onShow () {

  }
}
</script>
<style lang="scss">
page {
  background: #F8F8F8;
}
.me {
  background: #FFD220;
  // begin header
  .header {
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 192rpx;
    margin: 40rpx 30rpx 0 30rpx;
    padding: 0 36rpx;
    .user {
      display: flex;
      padding: 32rpx 0;
      width: 100%;
      .avatar {
        border-radius: 50%;
        display: inline-block;
        height: 128rpx;
        margin-right: 12rpx;
        width: 128rpx;
      }
      .userinfo {
        flex: 1;
        width: 100%;
        .nickname {
          font-size: 40rpx;
          color: #000;
          height: 40rpx;
          line-height: 40rpx;
          margin-bottom: 20rpx;
          padding-top: 18rpx;
        }
        .pet-owner {
          color: #78818F;
          font-size: 28rpx;
          height: 32rpx;
          line-height: 32rpx;
        }
      }
    }
  }
  // end header
  .center {
    background: #f8f8f8;
    .user-extra-info {
      background: #fff;
      border-radius: 8rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 0 30rpx;
      padding-bottom: 26rpx;
      .item {
        span {
          color: #565E6A;
          display: block;
          font-size: 28rpx;
          height: 36rpx;
          line-height: 36rpx;
          text-align: center;
        }
        .item-num {
          color: #000;
          font-size: 36rpx;
          margin-bottom: 30rpx;
        }
      }
    }
    // begin log-category
    .log-category {
      background: #fff;
      border-radius: 8rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin: 30rpx 30rpx 0 30rpx;
      padding: 30rpx 0;
      .item {
        min-width: 88rpx;
        text-align: center;
        img {
          display: block;
          height: 88rpx;
          margin: 0 auto 12rpx auto;
          width: 88rpx;
        }
        span {
          color: #565E6A;
          font-size: 30rpx;
        }
      }
    }
    // end log-category
    // begin lychea-notice
    .lychea-notice {
      background: #fff;
      border-radius: 8rpx;
      margin: 30rpx 30rpx 0 30rpx;
      padding: 20rpx 0;
      .item {
        display: flex;
        flex-direction: row;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 40rpx;
        dt {
          display: inline-block;
          height: 60rpx;
          margin: 20rpx 20rpx 20rpx 0;
          width: 60rpx;
          img {
            display: block;
            height: 60rpx;
            width: 60rpx;
          }
        }
        dd {
          color: #333;
          flex: 1;
          font-size: 34rpx;
          span {
            height: 40rpx;
            width: 40rpx;
          }
        }
      }
    }
    // end lychea-notice
  }
}
</style>
