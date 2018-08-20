<template>
<div class="bind-phone-wrapper"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin userinfo -->
  <div class="userinfo">
    <div class="avatar"></div>
    <div class="nickname">Magic王</div>
  </div>
  <!-- end userinfo -->
  <!-- begin declare -->
  <div class="declare">
    Magic王,您好！为给宝贝们提供和谐、安全、关爱的氛围，不给不法分子有机可乘的机会，在您首次发布消息前，我们会发送验证码到您的手机号，感谢您对我们的支持和信任！
  </div>
  <!-- end declare -->
  <!-- begin bind-phone -->
  <div class="bind-phone">
    <input class="phone" type="number" placeholder="点击输入您的手机号" placeholder-class="input-placeholder"
      @blur = "phoneNumberBlur"
      @focus = "phoneNumberFocus"
    >
    <!-- begin tips -->
    <div class="tips"
      v-if = "isShowTips"
    >
      {{tipsContent}}
    </div>
    <!-- end tips -->
    <!-- begin btns -->
    <div class="btns">
      <div class="button-mask">获取验证码</div>
      <button class="get-verification-code" type="button" name="button"
        v-if = "isShowGetVerificationCode"
        @click = "getSmsCode"
      >
        获取验证码
      </button>
    </div>
    <!-- end btns -->
  </div>
  <!-- end bind-phone -->
  <!-- begin SMSCode -->
  <SMSCode
    v-if = "isShowSMSCode"
    @fromSMSCode = "transferFun"
    :phoneNumber = "phoneNumber"
  ></SMSCode>
  <!-- end SMSCode -->
</div>
</template>
<script>
import config from '@/config'
import utils from '@/util'
import Request from '@/Request'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import SMSCode from '@/components/SMSCode'
export default {
  data () {
    return {
      customNavBar: {
        title: '来吱宠',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png'
      },
      isShowGetVerificationCode: false,
      isShowSMSCode: false,
      isShowTips: false,
      phoneNumber: '',
      tipsContent: ''
    }
  },
  components: {
    CustomNavBarOther,
    SMSCode
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

    // phoneNumberBlur
    phoneNumberBlur (e) {
      console.log('blur时==', e.mp.detail.value)
      this.phoneNumber = e.mp.detail.value
      this.checkPhoneNum(this.phoneNumber)
    },

    // phoneNumberFocus
    phoneNumberFocus () {
      this.isShowTips = false
      this.tipsContent = ''
    },

    // getSmsCode 手机号格式正确后，点击获取验证码
    async getSmsCode () {
      let _data = await Request.getHttp(config.getSmsCodeUrl,
        {phone: this.phoneNumber}
      )
      this.processGetSmsCode(_data)
    },

    // processGetSmsCode 处理发起验证码后的结果
    processGetSmsCode (_data) {
      // TEMP: status 暂定字段，只用来说明该手机号可以用来绑定，且发送成功
      console.log('sms', _data)
      if (_data.status === 0) {
        // 通知弹起 验证码层
        this.isShowSMSCode = true
      } else {
        this.tipsContent = _data.errMsg
      }
    },
    // checkPhoneNum
    checkPhoneNum (opt) {
      let phoneRegx = /^(86)?(13[0-9]|14[145678]|15[012356789]|16[6]|17[5678]|18[0-9]|19[89])[0-9]{8}$/
      if (opt === '') {
        this.isShowTips = true
        this.tipsContent = '请输入手机号'
      } else if (!opt.match(phoneRegx)) {
        this.isShowTips = true
        this.tipsContent = '格式不正确，请输入手机号'
      } else {
        this.isShowGetVerificationCode = true
      }
    },
    // transferFun 接收子组件的传值
    transferFun (opt) {
      switch (opt) {
        case 'closeSMSCode':
          this.isShowSMSCode = false
          break
        // default:
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss">
.bind-phone-wrapper {
  // beigin userinfo
  .userinfo {
    margin: 56rpx auto;
    .avatar {
      background: #aaa;
      border-radius: 50%;
      height: 168rpx;
      margin: 0 auto;
      width: 168rpx;
    }
    .nickname {
      color: #000;
      font-size: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      padding-top: 40rpx;
      text-align: center;
    }
  }
  // end userinfo
  // being declare
  .declare {
    color: #78818f;
    font-size: 28rpx;
    line-height: 44rpx;
    padding: 40rpx 60rpx;
  }
  // declare
  // begin bind-phone
  .bind-phone {
    padding: 40rpx 60rpx;
    .phone {
      font-family: PingFangSC-Regular;
      font-size: 36rpx;
      height: 88rpx;
      width: 100%;
    }
    .input-placeholder {
      color: #A1ABBC;
      font-size: 36rpx;
    }
    .tips {
      color: #FF0031;
      font-family: PingFangSC-Regular;
      font-size: 26rpx;
      letter-spacing: 0;
      height: 28rpx;
      line-height: 28rpx;
    }
    .btns {
      height: 100rpx;
      margin-top: 32rpx;
      position: relative;
      width: 630rpx;
      .button-mask {
        background: #f3f3f6;
        border-radius: 200rpx;
        color: #A1ABBC;
        font-family: PingFangSC-Regular;
        font-size: 36rpx;
        height: 100rpx;
        letter-spacing: 0;
        line-height: 100rpx;
        text-align: center;
        width: 100%;
      }
      .get-verification-code {
        background: #FFD220;
        border-radius: 200rpx;
        color: #703C0F;
        font-family: PingFangSC-Regular;
        font-size: 36rpx;
        letter-spacing: 0;
        line-height: 100rpx;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
      }
      button::after {
        border: none;
      }
    }
  }
  // end bind-phone
}
</style>
