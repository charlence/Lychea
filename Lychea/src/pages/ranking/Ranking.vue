<template>
<div class="container"
  :style="'padding-top:' + totalHeight + 'px'"
>
  <!-- begin CustomBarOther -->
  <CustomNavBarOther :customNavBar="customNavBar"></CustomNavBarOther>
  <!-- end CustomBarOther -->
  <div class="ranking-wrapper">
    <!-- begin ranking-title -->
    <div class="ranking-title">
      <div class="item active">
        <span>今日小主明星榜</span>
        <img src="../../../static/img/icon/common_select_arrow_black_pickup_w10_h8_2x.png" alt="">
      </div>
      <div class="item">
        <span>终生宠爱见证榜</span>
      </div>
    </div>
    <!-- end ranking-title -->
    <!-- begin ranking-top-3 -->
    <div class="ranking-top-3">
      <!-- begin ranking-top-item -->
      <div class="ranking-top-item">
        <div class="pet-baby">
          <img class="position" src="../../../static/img/icon/rank_icon_excellent_no2_w40_h40_2x.png" alt="">
          <div class="pic">
            <img src="../../../static/img/icon/default_user_photo_w40_h40_2x.png" alt="">
          </div>
          <div class="name male-name">尼古拉斯</div>
          <div class="breed">
            <div class="content male-breed">
              <span>阿拉斯加</span>
              <img class="male-breed-flag" src="../../../static/img/icon/gender_icon_male_white_w9_h10_2x.png" alt="">
            </div>
          </div>
          <div class="ranking-type" v-if="ranking.type.liked">
            <img class="liked" src="../../../static/img/icon/detail_toolbar_like_activity_w26_h26_2x.png" alt="">
            <span class="number">8451</span>
          </div>
        </div>
      </div>
      <!-- end ranking-top-item -->
      <!-- begin ranking-top-item -->
      <div class="ranking-top-item top1">
        <div class="pet-baby">
          <img class="position" src="../../../static/img/icon/rank_icon_excellent_no1_w40_h40_2x.png" alt="">
          <div class="pic">
            <img src="../../../static/img/icon/default_user_photo_w40_h40_2x.png" alt="">
          </div>
          <div class="name female-name">夏天</div>
          <div class="breed female-breed">
            <div class="content female-breed">
              <span>泰迪</span>
              <img class="female-breed-flag" src="../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png" alt="">
            </div>
          </div>
          <div class="ranking-type" v-if="ranking.type.liked">
            <img class="liked" src="../../../static/img/icon/detail_toolbar_like_activity_w26_h26_2x.png" alt="">
            <span class="number">15451</span>
          </div>
        </div>
      </div>
      <!-- end ranking-top-item -->
      <!-- begin ranking-top-item -->
      <div class="ranking-top-item">
        <div class="pet-baby">
          <img class="position" src="../../../static/img/icon/rank_icon_excellent_no3_w40_h40_2x.png" alt="">
          <div class="pic">
            <img src="../../../static/img/icon/default_user_photo_w40_h40_2x.png" alt="">
          </div>
          <div class="name female-name">波妞妞</div>
          <div class="breed ">
            <div class="content female-breed">
              <span>哈士奇</span>
              <img class="female-breed-flag" src="../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png" alt="">
            </div>
          </div>
          <div class="ranking-type" v-if="ranking.type.liked">
            <img class="liked" src="../../../static/img/icon/detail_toolbar_like_activity_w26_h26_2x.png" alt="">
            <span class="number">6451</span>
          </div>
        </div>
      </div>
      <!-- end ranking-top-item -->
    </div>
    <!-- end ranking-top-3 -->

    <!-- begin RankingList -->
    <RankingList :ranking = "ranking"></RankingList>
    <!-- end RankingList -->
  </div>
</div>
</template>
<script>
import utils from '@/util'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import RankingList from '@/components/RankingList'
export default {
  components: {
    CustomNavBarOther,
    RankingList
  },
  data () {
    return {
      customNavBar: {},
      ranking: {
        type: {
          liked: true
        },
        list: [
          {
            nickname: '朵小朵',
            breed: '泰迪',
            type: 0,
            rank: 4,
            avatar: '',
            liked: 33
          },
          {
            nickname: '朵小朵',
            breed: '泰迪',
            type: 0,
            rank: 5,
            avatar: '',
            liked: 33
          },
          {
            nickname: '朵小朵',
            breed: '泰迪',
            type: 0,
            rank: 6,
            avatar: '',
            liked: 33
          }
        ]
      }
    }
  },
  computed: {
    // 通过动态获取CustomBarHome的totalHeight, 给container补白
    paddingCustomBarHeight () {
      return `padding-top: ${this.customNavBar.totalHeight}px`
    }
  },
  methods: {
    init () {
      // 动态获取 CustomBarHome的各项高度
      this.customNavBar = utils.setCustomNavBar()
    }
  },
  onShow () {
    this.init()
  }
}
</script>
<style lang="scss">
.container {
  .ranking-wrapper {
    background: #FFD220;
    overflow: hidden;
    .ranking-title {
      background: #FFD220;
      height: 88rpx;
      display: flex;
      overflow: hidden;
      width: 100%;
      .item {
        color: #8B572A;
        flex: 1;
        font-size: 18px;
        height: 88rpx;
        line-height: 88rpx;
        text-align: center;
      }
      .active {
        color: #000;
        position: relative;
        img {
          bottom: 0;
          height: 16rpx;
          left: 50%;
          position: absolute;
          transform: translateX(-10rpx);
          width: 20rpx;
          z-index: 1;
        }
      }
    }
    .ranking-top-3 {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      overflow: hidden;
      padding: 30rpx 21rpx;
      .ranking-top-item {
        background: #fff;
        border-radius: 5px;
        flex: 1;
        height: 340rpx;
        margin: 20rpx 10rpx 0 10rpx;
        overflow: hidden;
        position: relative;
        width: auto;
        .pet-baby {
          .position {
            height: 80rpx;
            left: 0;
            top: 0;
            position: absolute;
            width: 80rpx;
            z-index: 10;
          }
          .pic {
            height: 124rpx;
            margin: 28rpx 46rpx 18rpx 46rpx;
            width: 124rpx;
            img {
              display: block;
              height: 124rpx;
              width: 124rpx;
            }
          }
          .name {
            font-family: PingFangSC-Regular;
            font-size: 15px;
            color: #333;
            height: 36rpx;
            line-height: 36rpx;
            margin-bottom: 12rpx;
            overflow: hidden;
            text-align: center;
            text-overflow: ellipsis;
          }
          .breed {
            color: #fff;
            font-size: 12px;
            height: 36rpx;
            overflow: hidden;
            text-align: center;
            width: 100%;
            .content {
              border-radius: 15px;
              display: inline-block;
              padding: 0 14rpx;
              span {
                float: left;
                height: 36rpx;
                line-height: 36rpx;
              }
              img {
                float: left;
                height: 20rpx;
                margin: 8rpx 0 8rpx 4rpx;
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
        .ranking-type {
          background: #F9FAFC;
          bottom: 0;
          display: flex;
          height: 68rpx;
          left: 0;
          overflow: hidden;
          position: absolute;
          width: 100%;
          z-index: 9;
          .liked {
            display: inline-block;
            height: 52rpx;
            margin: 10rpx 0 6rpx 20rpx;
            width: 52rpx;
          }
          .number {
            color: #FF617F;
            flex: 1;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            height: 68rpx;
            line-height: 68rpx;
            padding-right: 20rpx;
            text-align: right;
          }
        }
      }
      .top1 {
        height: 360rpx;
        margin-top: 0;
        .pet-baby {
          .position {
            height:80rpx;
            left: 10rpx;
            top: 10rpx;
            position:absolute;
            width:80rpx;
            z-index:10;

          }
          .pic {
            margin: 48rpx 46rpx 18rpx 46rpx;
          }
        }

      }

    }
  }
}
</style>
