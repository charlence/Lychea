<template>
  <!-- begin verification -->
  <div class="verification">
    <div class="mask">
      <div class="content">
        <div class="title">
          输入短信验证码
        </div>
        <div class="verification-phone">
          已发送至手机号: {{phoneNumber}}
        </div>
        <!-- begin input-content-wrap -->
        <div class="input-content-wrap"
          @click = "getFocus"
        >
          <div class="input-box">{{ code[0] }}</div>
          <div class="input-box">{{ code[1] }}</div>
          <div class="input-box">{{ code[2] }}</div>
          <div class="input-box">{{ code[3] }}</div>
        </div>
        <!-- end input-content-wrap -->
        <!-- begin verification-code -->
        <input type="number" class="verification-code" maxlength="4" cursor-spacing="120"
          focus = "false"
          @input = "getCode"
          @blur = "codeBlur"
          @focus = "codeFocus"
        >
        <!-- end verification-code -->
        <!-- begin verification-tips -->
        <div class="verification-tips"
          v-if = "isShowVerificationTips"
        >
          {{verificationTipsContent}}
        </div>
        <!-- end verification-tips -->
        <!-- begin verification-retry-get-code -->
        <div class="verification-retry-get-code">
          <div class="retry-countdown"
            v-if = "isShownCountdown"
          >
            {{seconds}}S 后重新发送
          </div>
          <div class="retry-btn">重新发送</div>
        </div>
        <!-- end verification-retry-get-code -->
        <!-- begin close-btn -->
        <div class="close-btn"
          @click="closeLayer"
        >
        </div>
        <!-- end close-btn -->
      </div>
    </div>
    <!-- mask -->
  </div>
  <!-- end verification -->
</template>
<script>
import config from '@/config'
import Request from '@/Request'
export default {
  props: ['phoneNumber'],
  data () {
    return {
      code: '',
      isShownCountdown: true,
      isShowVerificationTips: false,
      seconds: 61,
      timer: null,
      verificationTipsContent: ''
    }
  },
  methods: {
    closeLayer () {
      clearInterval(this.timer)
      this.seconds = 60
      this.$emit('fromSMSCode', 'closeSMSCode')
    },
    // countdown
    countdown () {
      let currentTime = this.seconds
      currentTime--
      this.seconds = currentTime
      if (currentTime <= 0) {
        clearInterval(this.timer)
        this.seconds = 60
        this.isShownCountdown = false
      }
      console.log(this.seconds)
    },
    // getCode
    getCode (e) {
      console.log('e', e.mp.detail.value)
      this.code = e.mp.detail.value
    },
    // getFocus
    getFocus () {
      console.log('设置获焦点')
      console.log('foucs', this.isCodeGetFocus)
      this.isCodeGetFocus = true
      console.log('foucs', this.isCodeGetFocus)
    },
    // codeFocus
    codeFoucs (e) {
      console.log('focus时==', e)
    },
    // codeBlur
    async codeBlur () {
      if (this.checkCode(this.code)) {
        let tempObj = {
          phone: this.phoneNumber,
          code: this.code
        }
        let _data = await Request.getHttp(config.validPhoneUrl, tempObj)
        this.processValidCode(_data)
      }
    },
    // processValidCode
    processValidCode (data) {
      console.log('验证码', data)
    },
    // checkCode
    checkCode (code) {
      if (code === '') {
        this.isShowVerificationTips = true
        this.verificationTipsContent = '验证码不能为空'
      } else if (code.length !== 4) {
        this.isShowVerificationTips = true
        this.verificationTipsContent = '验证码格式不正确'
      } else {
        return true
      }
    },
    init () {
      this.countdown()
      this.timer = setInterval(this.countdown, 1000)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss">
// begin verification
.verification {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 3;
  // begin mask
  .mask {
    background:hsla(0,0%,0%,0.6);
    height: 100%;
    width: 100%;
    .content {
      background: #fff;
      border-radius: 5px;
      height: 420rpx;
      left: 50%;
      position: absolute;
      top: 320rpx;
      transform: translateX(-50%);
      width: 630rpx;
      .title {
        color: #000;
        font-size: 40rpx;
        font-weight: bold;
        height: 50rpx;
        line-height: 56rpx;
        padding-top: 80rpx;
        text-align: center;
      }
      .verification-phone {
        color: #78818F;
        font-size: 28rpx;
        letter-spacing: 0;
        line-height: 44rpx;
        margin-top: 30rpx;
        text-align: center;
      }
      .input-content-wrap {
        align-items: center;
        display: flex;
        height: 92rpx;
        justify-content: space-around;
        line-height: 92rpx;
        margin: 0 auto;
        position: relative;
        width: 360rpx;
        .input-box {
          border-bottom: 6rpx solid #e5e5e5;
          font-size: 58rpx;
          font-weight: bold;
          height: 86rpx;
          line-height: 86rpx;
          text-align: center;
          width: 60rpx;
        }
      }
      .verification-code {
        height: 80rpx;
        width: 100%;
        // height: 0;
        // min-height: 0;
        // width: 0;
      }
      .verification-tips {
        color: #FF0031;
        font-size: 26rpx;
        letter-spacing: 0;
        height: 40rpx;
        line-height: 40rpx;
        padding-top: 10rpx;
        text-align: center;
      }
      .verification-retry-get-code {
        height: 100rpx;
        margin: 0 auto;
        position: relative;
        text-align: center;
        width: 630rpx;
        .retry-countdown {
          background: #fff;
          color: #A1ABBC;
          font-size: 30rpx;
          height: 60rpx;
          left: 0;
          line-height: 60rpx;
          padding: 20rpx 0;
          position: absolute;
          top: 0;
          text-align: center;
          width: 100%;
          z-index: 2;
        }
        .retry-btn {
          color: #333;
          font-size: 30rpx;
          line-height: 60rpx;
          padding: 20rpx 0;
          width: 100%;
        }
      }
      .close-btn {
        background: #aaa;
        height: 80rpx;
        left: 30rpx;
        position: absolute;
        top: 30rpx;
        width: 80rpx;
        z-index: 3;
      }
    }
  }
  // end mask
}
// end verification
</style>
