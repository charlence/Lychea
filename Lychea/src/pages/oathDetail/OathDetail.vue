<template>
<div class="wrapper oath-detail"
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
    <img class="pet-owner-avatar"
      :src="petOwner.avatar">
    <img class="pet-avatar"
      :src="pet.avatar">
  </div>
  <!-- end header -->
  <!-- begin center -->
  <div class="center">
    <div class="oath">
      <p>本铲屎官 <span>{{petOwner.nickname}} </span>视小主身份证号为<span>{{pet.petNumber}}</span> 的 “夏天” 小主为家庭成员，我宣誓对它终身负责。
      如果中途因故不能抚养，也一定给它找好新家。请我的朋友们为我的誓言见证！
      </p>
      <!-- begin invite-witness -->
      <button class="invite-witness"
        open-type="share" name="button"
        @click="inviteWitness"
      >邀请好友见证
      </button>
      <!-- end invite-witness -->
    </div>
    <!-- begin witness -->
    <div class="witness">
      <div class="witness__hd">
        <span></span>
        <div class="title">
          见证人
        </div>
      </div>
      <div class="witness__bd">
        <div class="witness-list">
          <img class="witness-avatar"
            v-for="(avatar, avatarIndex) in guarantee.witnessList"
            :key="avatarIndex"
            :src="avatar"
          >
          <span>108</span>
        </div>
      </div>
    </div>
    <!-- end witness -->
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
        title: '终生宠爱承诺',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: true
      },
      pet: {
        avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
        breedName: '泰迪',
        gender: '1',
        nickname: '夏天',
        petId: 'kwgu',
        petNumber: '33032420160824123D',
        sterilizeStatus: '0',
        sterilizeDesc: '未绝育'
      },
      petOwner: {
        avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
        nickname: 'Charlence',
        uid: ''
      },
      guarantee: {
        petOwnerAvatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
        petOwnerNickname: 'Charlence',
        witnessList: [
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e'
        ]
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
.oath-detail {
  background: #FFD220;
  .header {
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 192rpx;
    margin: 40rpx 30rpx 0 30rpx;
    img {
      border-radius: 50%;
      height: 128rpx;
      margin: 40rpx 6rpx 30rpx 6rpx;
      width: 128rpx;
    }
  }
  .center {
    background: #F8F8F8;
    // begin oath
    .oath {
      background: #fff;
      margin: 0 30rpx 40rpx 30rpx;
      padding-bottom: 60rpx;
      p {
        color: #333;
        font-size: 28rpx;
        line-height: 40rpx;
        padding: 30rpx 40rpx 40rpx 40rpx;
      }
      .invite-witness {
        background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
        border-radius: 100px;
        color: #703c0f;
        font-size: 32rpx;
        height: 88rpx;
        line-height: 88rpx;
        width: 320rpx;
      }
      button::after {
        border: none;
      }
    }
    // end oath
    // begin witness
    .witness {
      background: #fff;
      margin: 40rpx 30rpx 0 30rpx;
      padding: 40rpx 0 20rpx 0;
      .witness__hd {
        height: 26rpx;
        margin: 0 30rpx;
        padding-top: 16rpx;
        position: relative;
        text-align: center;
        span {
          background: #F3F4F6;
          border-radius: 100px;
          display: block;
          height: 2rpx;
          width: 100%;
        }
        .title {
          background: #f9fafc;
          color: #565E6A;
          font-size: 28rpx;
          height: 36rpx;
          left: 50%;
          line-height: 36rpx;
          position: absolute;
          padding: 0 20rpx;
          top: 0;
          transform: translateX(-50%);
          z-index: 1;
        }
      }
      .witness__bd {
        .witness-list {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          height: 84rpx;
          margin: 28rpx 30rpx;
          overflow: hidden;
          position: relative;
          .witness-avatar {
            border: 4rpx solid #fff;
            border-radius: 50%;
            // display: inline-block;
            // float: left;
            height: 76rpx;
            margin-right: 10rpx;
            width: 76rpx;
          }
          span {
            background: #ffd220;
            border: 4rpx solid #fff;
            border-radius: 50%;
            color: #fff;
            font-size: 32rpx;
            height: 76rpx;
            line-height: 76rpx;
            text-align: center;
            width: 76rpx;
          }
        }
      }
    }
    // end witness
  }
}
</style>
