<template>
<div class="wrapper pet-card-list"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin pet-owner -->
  <div class="pet-owner">
    <img class="avatar"
      :src="petOwner.avatar"
    >
  </div>
  <!-- end pet-owner -->
  <!-- begin pet-list-switch -->
  <div class="pet-list-switch">
    <div class="pet-list-switch__item"
      @click="switchList(1)"
      :class="petCardList.currentList === 1 ? 'active' : ''"
    >
      <p>我的小主卡</p>
      <img src="../../../static/img/icon/common_select_arrow_black_pickup_w10_h8_2x.png" alt="">
    </div>
    <div class="pet-list-switch__item"
      @click="switchList(2)"
      :class="petCardList.currentList === 2 ? 'active' : ''"
    >
      <p>我关注的小主卡</p>
      <img src="../../../static/img/icon/common_select_arrow_black_pickup_w10_h8_2x.png" alt="">
    </div>
  </div>
  <!-- end pet-list-switch -->
  <!-- begin my-pets -->
  <div class="my-pets"
    v-if="isShowOwnPets"
  >
    <PetCard
      :pets = "petCardList.pets"
    >
    </PetCard>
  </div>
  <!-- end my-pets -->
  <!-- begin favorite-->
  <div class="favorite"
    v-if="isShowFavoritPets"
  >
    <SimplifyPetCard
      :simplifyPetCard = "simplifyPetCard"
    >
    </SimplifyPetCard>
  </div>
  <!-- end favorite -->
  <!-- begin add-pet-btn -->
  <img class="add-pet-btn" src="../../../static/img/icon/add_petcard_w480_h102_1x.png"
    :v-if="isOwner"
  >
  <!-- end add-pet-btn -->
</div>
</template>
<script>
import utils from '@/util'
// import config from '@/config'
// import Request from '@/Request'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import PetCard from '@/components/PetCard'
import SimplifyPetCard from '@/components/SimplifyPetCard'
export default {
  data () {
    return {
      customNavBar: {
        title: 'Charlence',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: true
      },
      isOwner: false,
      isShowOwnPets: true,
      isShowFavoritPets: false,
      petCardList: {
        currentList: 1,
        pets: [
          {
            ageDesc: '2岁1个月.水瓶座.陪伴728天',
            area: '北京市朝阳区',
            avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            breedName: '泰迪',
            brief: '脾气暴躁，爱吃爱睡',
            cardNumber: '34270119921008373D',
            charisma: '100',
            gender: '2',
            nickname: '夏天',
            petId: 'kwgu',
            sterilizeStatus: '1',
            sterilizeDesc: '已绝育'
          },
          {
            ageDesc: '2岁1个月.水瓶座.陪伴728天',
            area: '北京市朝阳区',
            avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            breedName: '泰迪',
            brief: '脾气暴躁，爱吃爱睡',
            cardNumber: '34270119921008373D',
            charisma: '100',
            gender: '2',
            nickname: '夏天',
            petId: 'kwgu',
            sterilizeStatus: '1',
            sterilizeDesc: '已绝育'
          }
        ]
      },
      petOwner: {
        avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
        nickname: 'Charlence',
        uid: ''
      },
      simplifyPetCard: [
        {
          ageDesc: '2岁1个月',
          avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          breedName: '泰迪',
          gender: '1',
          nickname: '夏天',
          petId: 'kwgu',
          relative: 'father',
          sterilizeStatus: '0',
          sterilizeDesc: '未绝育'
        },
        {
          ageDesc: '3岁1个月',
          avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          breedName: '泰迪',
          gender: '2',
          nickname: '朵小朵',
          petId: 'kwgu',
          relative: 'mother',
          sterilizeStatus: '1',
          sterilizeDesc: '已绝育'
        }
      ]

    }
  },
  components: {
    CustomNavBarOther,
    PetCard,
    SimplifyPetCard
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
    // switchList 切换列表
    switchList (e) {
      if (e === 1) {
        this.isShowOwnPets = true
        this.isShowFavoritPets = false
        this.petCardList.currentList = 1
      } else {
        this.isShowOwnPets = false
        this.isShowFavoritPets = true
        this.petCardList.currentList = 2
      }
    }
  },
  mounted () {

  },
  onLoad () {

  },
  onShow () {
    this.init()
  }
}
</script>
<style lang="scss">
page {
  background: #FFD220;
}
.wrapper {
  // begin pet-owner
  .pet-owner {
    margin: 40rpx auto;
    .avatar {
      border: 8rpx solid #fff;
      border-radius: 50%;
      display: block;
      height: 140rpx;
      margin: 0 auto;
      width: 140rpx;
    }
  }
  // end pet-owner
  // begin pet-list-switch
  .pet-list-switch {
    display: flex;
    flex-direction: row;
    height: 88rpx;
    justify-content: flex-start;
    margin-bottom: 40rpx;
    text-align: center;
    .pet-list-switch__item {
      color: #703C0F;
      position: relative;
      width: 50%;
      p {
        font-size: 36rpx;
        height: 88rpx;
        line-height: 88rpx;
      }
      img {
        display: none;
      }
    }
    .active {
      color: #000;
      img {
        bottom: 0;
        display: block;
        height: 14rpx;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 18rpx;
        z-index: 1;
      }
    }
  }
  // end pet-list-switch
  // begin my-pets
  .my-pets {
    padding: 0 30rpx;
  }
  // end my-pets
  // begin favorite
  .favorite {
    padding: 0 30rpx;
  }
  // end favorite
  .add-pet-btn {
    display: block;
    height: 102rpx;
    margin: 66rpx auto 94rpx auto;
    width: 480rpx;
  }
}
</style>
