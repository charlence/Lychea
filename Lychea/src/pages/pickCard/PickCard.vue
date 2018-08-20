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
  <!-- begin EmptyPetCard -->
  <EmptyPetCard
    v-if = "petCard.length === 0"
  >
  </EmptyPetCard>
  <!-- end EmptyCard -->
  <!-- begin pick-petcard -->
  <div class="pick-petcard">
    <!-- begin petcard -->
    <div class="petcard"
      v-for = "(pet, petIndex) in petCard"
      :key = "petIndex"
      @click = "goToPickTopic(pet)"
    >
      <!-- begin pet -->
      <div class="pet">
        <div class="pet-text">
          <div class="nickname">
            {{pet.nickname}}
          </div>
          <div class="pet-text__content">
            <!-- begin sterilize-status -->
            <div class="sterilize-status"
              :class="pet.sterilizeStatus === '1' ? 'sterilize-active' : ''"
            >
              {{pet.sterilizeDesc}}
            </div>
            <!-- end sterilize-status -->
            <!-- begin pet-info -->
            <div class="pet-info"
              :class="pet.gender === '1' ? 'male' : 'female'"
            >
              <div class="breed">
                <span class="breed__text">{{pet.breedName}}</span>
                <span class="breed-gender"></span>
              </div>
            </div>
            <!-- end pet-info -->
          </div>
        </div>
        <img class="pet-avatar"
          :src = "pet.avatar"
        >
      </div>
      <!-- end pet -->
      <dl class="pet-age">
        <dt>
          <img src="../../../static/img/icon/pick_card_age_w40_h40_1x.png" alt="">
        </dt>
        <dd>{{pet.ageDesc}}</dd>
      </dl>
      <dl class="pet-breif">
        <dt>
          <img src="../../../static/img/icon/pick_card_brief_w40_h40_1x.png">
        </dt>
        <dd>{{pet.brief}}</dd>
      </dl>
      <dl class="pet-number">
        <dt><img src="../../../static/img/icon/pick_card_number_w40_h40_1x.png"></dt>
        <dd>身份证号{{pet.cardNumber}}</dd>
      </dl>
    </div>
    <!-- end petcard -->
  </div>
  <!-- end pick-petcard -->
  <!-- begin add-petcard -->
  <img class="add-petcard"
    src="../../../static/img/icon/add_petcard_w480_h102_1x.png"
    @click = "goToAddPet"
  >
  <!-- end add-petcard -->
</div>
</template>
<script>
import config from '@/config'
import utils from '@/util'
import Request from '@/Request'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import EmptyPetCard from '@/components/EmptyPetCard'
export default {
  data () {
    return {
      customNavBar: {
        title: '选择小主卡',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png'
      },
      indicatorActiveDots: '',
      indicatorDots: '#ffffff',
      petCard: []
    }
  },
  components: {
    CustomNavBarOther,
    EmptyPetCard
  },
  methods: {
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // fetchPetList 拉取小主列表数据
    async fetchPetList () {
      const tempData = await Request.getHttp(config.getPetListUrl)
      console.log('小主列表数据', tempData)
      this.processPetList(tempData)
    },
    // processPetList 处理小主列表数据
    processPetList (_data) {
      let tempList = []
      for (let idx in _data.data) {
        let tempCard = {
          ageDesc: _data.data[idx].age_desc,
          area: _data.data[idx].region,
          avatar: _data.data[idx].avatar,
          breedName: _data.data[idx].breed_name,
          brief: _data.data[idx].brief,
          cardNumber: _data.data[idx].card_number,
          gender: _data.data[idx].gender,
          nickname: _data.data[idx].nickname,
          petId: _data.data[idx].id,
          sterilizeStatus: _data.data[idx].sterilize,
          sterilizeDesc: _data.data[idx].sterilize_desc
        }
        tempList.push(tempCard)
      }
      console.log('fetch===', tempList)
      this.petCard = tempList
    },
    // goToAddPet 前往新增小主卡
    goToAddPet () {
      wx.navigateTo({
        url: '/pages/addPet/main'
      })
    },
    // goToPickTopic 前往选择发布主题
    goToPickTopic (obj) {
      console.log('选择主题前===', obj)
      let petInfo = {
        avatar: obj.avatar,
        nickname: obj.nickname,
        petId: obj.petId
      }
      wx.navigateTo({
        url: '/pages/pickTopic/main?' + `${utils.encodeSearchParams(petInfo)}`
      })
    }
  },
  mounted () {
    this.setCustomNavBar()
    this.fetchPetList()
  }
}
</script>
<style lang="scss">
.wrapper {
  background: #FFD220;
  height: 100%;
  padding-bottom: 100rpx;
  .add-petcard {
    display: block;
    height: 102rpx;
    margin: 0 auto;
    width: 480rpx;
  }
  // pick-petcard
  .pick-petcard {
    .petcard {
      background: #FFFFFF;
      box-shadow: 0 6px 10px 0 #FFC800;
      border-radius: 6px;
      margin: 60rpx auto 20rpx auto;
      padding-bottom: 20rpx;
      width: 600rpx;
      dl {
        display: flex;
        flex-direction: row;
        margin-bottom: 28rpx;
        padding: 0 30rpx;
        dt {
          display: inline-block;
          height: 40rpx;
          margin-right: 12rpx;
          width: 40rpx;
          img {
            display: block;
            height: 40rpx;
            width: 40rpx;
          }
        }
        dd {
          color: #565E6A;
          font-size: 28rpx;
          line-height: 40rpx;
        }
      }
      .pet {
        display: flex;
        overflow: hidden;
        padding: 30rpx;
        .pet-avatar {
          border-radius: 50%;
          display: inline-block;
          height: 126rpx;
          width: 126rpx;
        }
        .pet-text {
          flex: 1;
          .nickname {
            color: #000;
            font-size: 36rpx;
            height: 40rpx;
            line-height: 40rpx;
            padding-bottom: 30rpx;
          }
          .pet-text__content {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            width: 100%;
            .sterilize-status {
              background: #C9CFDD;
              border-radius: 100px;
              color: #fff;
              font-size: 26rpx;
              height: 48rpx;
              line-height: 48rpx;
              margin-right: 20rpx;
              padding: 0 16rpx;
            }
            .sterilize-active {
              background: #FFD220;
            }
            .pet-info {
              background: #C9CFDD;
              border-radius: 100px;
              color: #fff;
              font-size: 26rpx;
              height: 48rpx;
              line-height: 48rpx;
              padding: 0 16rpx;
              .breed {
                .breed__text {
                  margin-right: 8rpx;
                }
                .breed-gender {
                  display: inline-block;
                  height: 18rpx;
                  width: 20rpx;
                }
              }
            }
            .male {
              background: #52B0FF;
              .breed-gender {
                background: url('../../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
            .female {
              background: #FF6F8A;
              .breed-gender {
                background: url('../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
          }
        }
      }
    }
    // .pick-petcard__swiper {
    //   height: 848rpx;
    //   padding-left: 120rpx;
    //   // begin swiper
    //   .swiper {
    //     height: 848rpx;
    //     width: 100%;
    //     swiper-item {
    //       background: #fff;
    //       margin-right: 20rpx;
    //       width: 520rpx !important;
    //     }
    //   }
    // }
  }
}
</style>
