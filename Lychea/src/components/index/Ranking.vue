<template>
<!-- begin rangking-wrapper -->
<div class="ranking-wrapper">
  <img class="ranking-close-btn"
    @click = "removeRanking"
    src="../../../static/img/home_rank_entrance_icon_off_w26_h26_2x.png"
  >
  <img class="ranking-decoration-img" src="../../../static/img/home_rank_entrance_icon_w40_h32_2x.png" alt="">
  <!-- begin swiper-container -->
  <swiper class="swiper-container" vertical="true" autoplay="true" circular="true" interval="4000">
    <swiper-item
      v-for = "(ranking, rankIndex) in rank"
      :key = "rankIndex"
    >
      <!-- begin ranking -->
      <div class="ranking"
        @click = "goToRankingDetail"
      >
        <div class="ranking-title">{{ranking.title}}</div>
        <div class="ranking-top">
          <img class="ranking-top-item"
            v-for = "(item, itemIndex) in ranking.list"
            :key = "itemIndex"
            :src = "item"
          >
        </div>
        <div class="ranking-detail">
          <img class="ranking-detail-img" src="../../../static/img/icon/common_small_arrow_gray_w24_h24_2x.png" alt="">
        </div>
      </div>
      <!-- end ranking -->
    </swiper-item>
  </swiper>
  <!-- end swiper-container -->
</div>
<!-- end ranking-wrapper -->
</template>
<script>
export default {
  props: ['rank'],
  data () {
    return {
    }
  },
  methods: {
    removeRanking () {
      this.$emit('fromRanking', 'removeRanking')
    },
    goToRankingDetail () {
      this.$emit('fromRanking', 'goToRankingDetail')
    }
  }
}
</script>
<style lang="scss">
// 榜单
.ranking-wrapper {
  background: #fff;
  display: flex;
  height: 120rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  padding-left: 30rpx;
  .ranking-close-btn {
    display: inline-block;
    height: 52rpx;
    width: 52rpx;
  }
  .ranking-decoration-img {
    display: inline-block;
    height: 64rpx;
    margin: 28rpx 0;
    width: 80rpx;
  }
  .swiper-container {
    flex: 1;
    overflow: hidden;
    width: 100%;
    .ranking {
      display: flex;
      .ranking-title {
        color: #565E6A;
        display: inline-block;
        font-size: 16px;
        height: 120rpx;
        line-height: 120rpx;
        padding-left: 20rpx;
        width: 240rpx;
      }
      .ranking-top {
        display: flex;
        flex: 1;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: flex-end;
        width: 100%;
        .ranking-top-item {
          margin: 28rpx 6rpx;
          height: 64rpx;
          width: 64rpx;
        }
      }
      .ranking-detail {
        display: inline-block;
        height: 120rpx;
        margin-right: 18rpx;
        width: 48rpx;
        .ranking-detail-img {
          display: block;
          margin: 36rpx 0;
          height: 48rpx;
          width: 48rpx;
        }
      }
    }
  }
}
</style>
