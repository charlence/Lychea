<template>
<div class="add-pet-wrapper"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin pet -->
  <div class="pet">
    <!-- begin pet-default-icon -->
    <div class="pet-default-icon"></div>
    <!-- end pet-default-icon -->
    <!-- begin pet-form -->
    <div class="pet-form">
      <form class="" action="index.html" method="post">
        <!-- begin item -->
        <div class="item">
          <input class="pet-nickname" type="text" name="petNickName" placeholder="请输入宠物名称"
            @blur="blurNickname"
          >
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div>
          <div class="content">
            <div class="gender">
              <span>MM</span>
              <img src="../../../static/img/icon/gender_icon_female_active_w9_h13_2x.png" alt="">
            </div>
            <div class="gender">
              <span>GG</span>
              <img src="../../../static/img/icon/gender_icon_male_active_w9_h13_2x.png" alt="">
            </div>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">宠物品种：</div>
          <div class="content">
            <div class="default-tips"
              @click="pickPetBreed"
            >
              <span
                v-if="breedName === ''"
              >
                点击选择
              </span>
              <span class="breed"
                v-else="breedName !== ''"
              >
                {{breedName}}
              </span>
            </div>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">生&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：</div>
          <div class="content">
            <picker mode="date" :value="birthday" @change="bindBirthdayChange">
              <div class="picker">
                <div class="default-tips"
                  v-if = "birthday ===''"
                >点击选择
                </div>
                <div class="birthday"
                  v-if = "birthday !==''"
                >{{birthday}}
                </div>
              </div>
            </picker>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">到家时间：</div>
          <div class="content">
            <picker mode="date" :value="joinDate" @change="bindJoinDateChange">
              <div class="picker">
                <div class="default-tips"
                  v-if = "joinDate ===''"
                >点击选择
                </div>
                <div class="birthday"
                  v-if = "joinDate !==''"
                >{{joinDate}}
                </div>
              </div>
            </picker>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">所在地区：</div>
          <div class="content">
            <picker mode="region" @change="bindRegionChange" :value="region">
              <div class="picker">
                <div class="default-tips"
                  v-if = "region.length === 0"
                >点击选择
                </div>
                <div class="region"
                  v-if = "region.length !== 0"
                >
                  {{region[0]}}，{{region[1]}}，{{region[2]}}
                </div>
              </div>
            </picker>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">是否绝育：</div>
          <div class="content">
            <div class="sterilize">
              <span>未绝育</span>
              <span>已绝育</span>
            </div>
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">介绍小主：</div>
          <div class="content">
            <input class="pet-brief" type="text" name="petBrief" placeholder="一句话介绍小主"
              @blur="blurBrief"
            >
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <div class="label">小主身份：</div>
          <div class="content">
            <input class="pet-card" type="number" placeholder="请输入铲屎官身份证前6位" maxlength="6" name="petCard"
              @blur="blurPetCars"
            >
          </div>
        </div>
        <!-- end item -->
        <!-- begin item -->
        <div class="item">
          <p>为了体现宠物就是家人的理念，我们采用和身份证同样的编码规则，为您生成专属宠物ID，前六位为地区编码，不会导致隐私泄露。</p>
        </div>
        <!-- end item -->
        <!-- begin submit-tips -->
        <div class="submit-tips">
          {{submitTipsContent}}
        </div>
        <!-- end submit-tips -->
        <button type="button" name="button"
          @click="addPetCard"
        >确   认
        </button>
        <!-- begin tips -->
        <p class="tips">请勿添加虚假、侮辱性形象</p>
        <!-- end tips -->
      </form>

    </div>
    <!-- end pet-form -->
  </div>
  <!-- end pet -->
  <!-- begin section -->
</div>
</template>
<script>
import config from '@/config'
import utils from '@/util'
import Request from '@/Request'
import CustomNavBarOther from '@/components/CustomNavBarOther'
export default {
  data () {
    return {
      avatar: '',
      birthday: '',
      breed: '',
      breedName: '',
      brief: '',
      cardNumber: '',
      customNavBar: {
        title: '添加小主',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png'
      },
      gender: 1,
      isShowSubmitTips: false,
      joinDate: '',
      nickname: '',
      region: [],
      sterilize: false,
      submitTipsContent: '',
      type: '',
      urlParams: {}
    }
  },
  components: {
    CustomNavBarOther
  },
  methods: {
    // TODO: 1 宠物性别选择、2 绝育状态选择； 3 小主形象上传
    init () {
      this.setCustomNavBar()
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // 小主昵称
    blurNickname (e) {
      console.log('blur时==', e.mp.detail.value)
      this.nickname = e.mp.detail.value
    },
    // 小主简介
    blurBrief (e) {
      console.log('blur时==', e.mp.detail.value)
      this.brief = e.mp.detail.value
    },
    // blurPetCars
    blurPetCars (e) {
      console.log('blur时==', e.mp.detail.value)
      this.cardNumber = e.mp.detail.value
    },
    // 小主品种
    pickPetBreed () {
      wx.navigateTo({
        url: '/pages/petClass/main'
      })
    },
    // 选择生日
    bindBirthdayChange (e) {
      this.birthday = e.mp.detail.value
    },
    // 选择到家日
    bindJoinDateChange (e) {
      this.joinDate = e.mp.detail.value
    },
    // 选择地区
    bindRegionChange (e) {
      this.region = e.mp.detail.value
    },
    // addPetCard 创建小主
    async addPetCard () {
      let petInfo = {
        avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
        birthday: this.birthday,
        breed: this.breed,
        brief: this.brief,
        card_number: this.cardNumber,
        gender: this.gender,
        joindate: this.joinDate,
        nickname: this.nickname,
        region: this.region,
        sterilize: this.sterilize,
        type: this.type
      }
      if (this.checkPetInfo(petInfo)) {
        const addPetData = await Request.getHttp(config.addPetUrl, {'info': petInfo})
        console.log('创建小主', addPetData)
      }
    },
    // updateInfo 更新宠物信息，eg: 选取宠物类型之后，在本页面返填数据
    updateInfo (urlParams) {
      console.log('updateInfo', urlParams)
      let that = this
      if (urlParams.breedType && urlParams.breedName && urlParams.breedId) {
        console.log('修改类型')
        that.type = urlParams.breedType
        that.breed = urlParams.breedId
        that.breedName = urlParams.breedName
      }
    },
    // checkPetInfo 创建小主前检查必填字段
    checkPetInfo (opt) {
      console.log('创建小主', opt)
      if (opt.nickname === '') {
        this.submitTipsContent = '请填写小主昵称'
      } else if (opt.gender === '') {
        this.submitTipsContent = '请选择小主性别'
      } else if (opt.breed === '') {
        this.submitTipsContent = '请选择小主所属品种'
      } else if (opt.birthday === '') {
        this.submitTipsContent = '请选择小主生日'
      } else if (opt.joinDate === '') {
        this.submitTipsContent = '请选择小主的领养日期'
      } else if (opt.sterilize === '') {
        this.submitTipsContent = '请填写小主绝育状况'
      } else if (opt.brief === '') {
        this.submitTipsContent = '请填写小主介绍'
      } else if (opt.card_number === '') {
        this.submitTipsContent = '请填写小主身份信息'
      } else {
        return true
      }
    }
  },
  mounted () {
    this.init()
  },
  onShow () {
    let urlParams = this.$root.$mp.query
    console.log('addPet==onShow,url===', urlParams)
    if (Object.keys(urlParams).length > 0) {
      this.updateInfo(urlParams)
      this.urlParams = Object.assign(this.urlParams, (urlParams))
      if (urlParams.breedType) {
        this.type = urlParams.breedType
      } else if (urlParams.breedName) {
        this.breed = urlParams.breedName
        console.log('that breed====', this.breed)
      }
    }
    console.log(this.urlParams)
  }
}
</script>
<style lang="scss">
.add-pet-wrapper {
  // pet
  .pet {
    padding: 0 40rpx;
    position: relative;
    // pet-default-icon
    .pet-default-icon {
      background: #aaa;
      border-radius: 50%;
      height: 168rpx;
      position: absolute;
      right: 40rpx;
      top: 36rpx;
      width: 168rpx;
      z-index: 1;
    }
    .pet-form {
      padding-top: 45rpx;
      form {
        // begin item
        .item {
          display: flex;
          margin-bottom: 10rpx;
          // begin pet-nickname
          .pet-nickname {
            color: #000;
            font-size: 40rpx;
            height: 88rpx;
            line-height: 88rpx;
          }
          // end pet-nickname
          .content {
            color: #333;
            flex: 1;
            font-size: 32rpx;
            width: 100%;
            // gender
            .gender {
              background: #f3f4f6;
              border-radius: 100px;
              display: inline-block;
              float: left;
              height: 48rpx;
              margin: 20rpx 20rpx 20rpx 0;
              padding: 0 16rpx;
              width: auto;
              span {
                color: #78818f;
                float: left;
                font-size: 26rpx;
                height: 48rpx;
                line-height: 48rpx;
              }
              img {
                float: left;
                height: 26rpx;
                margin: 11rpx 0 11rpx 10rpx;
                width: 18rpx;
              }
            }
            // gender
            // begin sterilize
            .sterilize {
              span {
                background: #f3f4f6;
                border-radius: 100px;
                color: #78818f;
                float: left;
                font-size: 26rpx;
                height: 48rpx;
                line-height: 48rpx;
                margin: 20rpx 20rpx 20rpx 0;
                padding: 0 16rpx;
              }
            }
            // end sterilize
            // begin pet-brief
            .pet-brief {
              height: 48rpx;
              line-height: 48rpx;
              margin: 20rpx 0;
            }
            // end pet-brief
            // begin pet-card
            .pet-card {
              height: 48rpx;
              line-height: 48rpx;
              margin: 20rpx 0;
            }
            // end pet-card
            .default-tips {
              color: #78818F;
              font-size: 32rpx;
              height: 88rpx;
              line-height: 88rpx;
              .breed {
                color: #000;
              }
            }
            .birthday {
              font-size: 32rpx;
              height: 88rpx;
              line-height: 88rpx;
            }
            .picker {
              font-size: 32rpx;
              height: 88rpx;
              line-height: 88rpx;
            }
          }
          // content
          .label {
            display: inline-block;
            color: #565e6a;
            font-size: 32rpx;
            height: 88rpx;
            line-height: 88rpx;
          }
          p {
            color: #a1abbc;
            font-size: 26rpx;
            line-height: 36rpx;
          }
        }
        // end item
        .submit-tips {
          color: #FF0031;
          font-family: PingFangSC-Regular;
          font-size: 26rpx;
          letter-spacing: 0;
          height: 28rpx;
          line-height: 28rpx;
          padding-top: 20rpx;
        }
        button {
          background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
          border-radius: 100px;
          color: #703C0F;
          font-size: 36rpx;
          height: 100rpx;
          line-height: 100rpx;
          margin: 70rpx 0 60rpx 0;
        }
        button::after {
          border: none;
        }
        .tips {
          color: #a1abbc;
          font-size: 26rpx;
          text-align: center;
          padding-bottom: 80rpx;
        }
      }
    }

  }
}

</style>
