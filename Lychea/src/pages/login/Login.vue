<template >
  <div class="login-wrapper"
    :style="'padding-top:' + customNavBar.totalHeight + 'px'"
  >
    <!-- begin CustomNavBarOther -->
    <CustomNavBarOther
      :customNavBar="customNavBar"
    >
    </CustomNavBarOther>
    <!-- end CustomNavBarOther -->
    <!-- begin lychea-slogan -->
    <div class="lychea-slogan">
      <!-- // TEMP: 暂用来占位logo图片 -->
      <div class="logo">
      </div>
      <h2>来吱宠</h2>
    </div>
    <!-- end lychea-slogan -->
    <div class="userinfo">
      <p>登录后体验完整功能</p>
      <button class="userinfo-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">使用微信登录</button>
    </div>
  </div>
</template>
<script>
import utils from '@/util'
import config from '@/config'
import CustomNavBarOther from '@/components/CustomNavBarOther'
export default {
  data () {
    return {
      currentUser: {},
      customNavBar: {
        title: '微信登录',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png'
      }
    }
  },
  components: {
    CustomNavBarOther
  },
  methods: {
    init () {
      this.setCustomNavBar()
      this.fetchCurrentUser()
    },

    // fetchCurrentUser 拉取当前用户uid
    fetchCurrentUser () {
      this.currentUser = wx.getStorageSync('LYCHEAUSER')
      console.log('getUserInfo===', wx.getStorageSync('LYCHEAUSER'))
      console.log('init===', this.currentUser)
    },

    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },

    // 处理用户拒绝授权时的操作
    processAutoDeny () {
      wx.navigateTo({
        // url: '/pages/index/main'
        url: '/pages/bindPhone/main'
      })
    },

    // checkNetworkStatus 检查网络状态
    checkNetworkStatus () {
      wx.getNetworkType({
        success: (res) => {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          if (res.networkType === 'none') {
            console.log('当前网络状态不好，稍后重试！')
          }
        }
      })
    },

    // fetchUserInfo
    fetchUserInfo (data) {
      console.log('fetch', data)
      // 获取用户信息
      wx.request({
        url: config.getUserInfoUrl,
        data,
        success: res => {
          // TEMP: code 待约定字段名
          if (res.data.code === 0) {
            // 得到用户信息->本地缓存
            wx.setStorageSync('USERINFO', res.data.data)
            // 更新用户信息后跳转至首页
            wx.navigateTo({
              url: '/pages/index/main'
            })
          } else {
            console.log(res.data.msg)
          }
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    // 获取授权核心
    getUserInfo (e) {
      console.log('getUserInfo的e：', e)
      if (e.target.errMsg === 'getUserInfo:ok') {
        let data = {
          encryptedData: e.target.encryptedData,
          iv: e.target.iv
          // userInfo: e.target.userInfo
        }
        data = Object.assign({'token': this.currentUser.token, 'uid': this.currentUser.uid}, data)
        console.log('getUserInfo===', data)
        this.fetchUserInfo(data)
      } else if (e.target.errMsg === 'getUserInfo:fail auth deny') {
        // 用户拒绝授权
        this.processAutoDeny()
      } else {
        // 无反馈时，检查网络状态
        this.checkNetworkStatus()
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
.login-wrapper {
  height: 100%;
  position: relative;
  // begin lychea-slogan
  .lychea-slogan {
    margin-top: 360rpx;
    .logo {
      background: #d8d8d8;
      margin: 0 auto;
      height: 240rpx;
      width: 240rpx;
    }
    h2 {
      color: #000;
      font-size: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      padding-top: 40rpx;
      text-align: center;
    }
  }
  // end lychea-slogan
  // begin userinfo
  .userinfo {
    margin-top: 160rpx;
    text-align: center;
    p {
      font-family: PingFangSC-Regular;
      font-size: 32rpx;
      color: #78818F;
      letter-spacing: 0;
      text-align: center;
      line-height: 36px
    }
    .userinfo-btn {
      background: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
      border-radius: 200rpx;
      color: #703C0F;
      font-family: PingFangSC-Regular;
      font-size: 36rpx;
      height: 100rpx;
      letter-spacing: 0;
      line-height: 100rpx;
      margin-top: 40rpx;
      text-align: center;
      width: 480rpx;
    }
    button::after {
      border: none;
    }
  }
}
</style>
