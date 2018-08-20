<template>
<div class="wrapper"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin take-oath -->
  <div class="take-oath">
    <img class="cover"
      :src="pet.avatar"
    >
    <div class="content">
      <!-- begin pet-info -->
      <div class="pet-info"
        :class="pet.gender === '1' ? 'male' : 'female'"
      >
        <div class="nickname">
          {{pet.nickname}}
        </div>
        <!-- begin creature-attribute -->
        <div class="creature-attribute">
          <div class="sterilize"
            :class="pet.sterilizeStatus === '1' ? 'active' : ''"
          >
            {{pet.sterilizeDesc}}
          </div>
          <div class="breed">
            <span class="breed__text">{{pet.breedName}}</span>
            <span class="gender"></span>
          </div>
        </div>
        <!-- end creature-attribute -->
      </div>
      <!-- end pet-info -->
      <div class="promise">
        本铲屎官 <span>{{petOwner.nickname}} </span>视小主身份证号为<span>{{pet.petNumber}}</span> 的 “夏天” 小主为家庭成员，我宣誓对它终身负责。如果中途因故不能抚养，也一定给它找好新家。请我的朋友们为我的誓言见证！
      </div>
    </div>
    <!-- end content -->
  </div>
  <!-- end take-oath -->
  <!-- begin confirm-oath -->
  <img class="confirm-oath" src="../../../static/img/ido_btn_w480_h102_1x.png"
    @click="goToOathDetail"
  >
  <!-- end confirm-oath -->
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
    // 前往终生宠爱宣言详情展示页
    goToOathDetail () {
      wx.navigateTo({
        url: '/pages/oathDetail/main?'
      })
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
  background: #FFD220;
}
.wrapper {
  // begin take-oath
  .take-oath {
    margin: 40rpx 0;
    overflow: hidden;
    .cover {
      border-top-left-radius: 12rpx;
      border-top-right-radius: 12rpx;
      display: block;
      height: 520rpx;
      margin: 0 auto;
      width: 520rpx;
    }
    .content {
      background: #fff;
      border-radius: 40rpx 40rpx 12rpx 12rpx;
      height: 440rpx;
      margin: -120rpx auto 0 auto;
      width: 520rpx;
      .promise {
        color: #565E6A;
        font-size: 28rpx;
        line-height: 40rpx;
        padding: 0 30rpx 20rpx 30rpx;
      }
      // begin pet-info
      .pet-info {
        padding: 30rpx 30rpx 0 30rpx;
        .nickname {
          color: #000;
          font-size: 36rpx;
          height: 40rpx;
          line-height: 40rpx;
          margin-bottom: 30rpx;
        }
        .creature-attribute {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          padding-bottom: 26rpx;
          .sterilize {
            background: #C9CFDD;
            border-radius: 100px;
            color: #fff;
            font-size: 26rpx;
            height: 48rpx;
            line-height: 48rpx;
            margin-right: 20rpx;
            padding: 0 16rpx;
          }
          .sterilize.active {
            background: #FFD220;
          }
          .breed {
            border-radius: 100px;
            color: #fff;
            font-size: 26rpx;
            height: 48rpx;
            line-height: 48rpx;
            padding: 0 12rpx;
            .breed__text {
              color: #fff;
              float: left;
              height: 48rpx;
              line-height: 48rpx;
            }
            .gender {
              float: left;
              height: 20rpx;
              margin: 16rpx 0 14rpx 6rpx;
              width: 18rpx;
            }
          }
        }
      }
      // end pet-info
      // begin male 与pet-info 同用，用来设置性别颜色和图片
      .male {
        .breed {
          background: #52B0FF;
          .gender {
            background: url('../../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
            background-size: 18rpx 20rpx;
          }
        }
      }
      // end male
      // begin female
      .female {
        .breed {
          background: #ff6f8a;
          .gender {
            background: url('../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
            background-size: 18rpx 20rpx;
          }
        }
      }
      // end female
    }
  }
  // end take-oath
  // begin confirm-oath
  .confirm-oath {
    display: block;
    height: 102rpx;
    margin: 80rpx auto 60rpx auto;
    width: 480rpx;
  }
  // end confirm-oath
}
</style>
