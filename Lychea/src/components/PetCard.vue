<template>
<!-- begin pet-card-list -->
<div class="pet-card-list">
  <!-- begin pet-card -->
  <div class="pet-card"
    v-for="(pet, petIndex) in pets"
    :key="petIndex"
  >
    <img class="avatar"
      :src="pet.avatar"
    >
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
      <dl class="pet-charisma">
        <dt>
          <img src="../../static/img/icon/pick_card_charisma_w40_h40_1x.png" alt="">
        </dt>
        <dd>{{pet.charisma}}</dd>
      </dl>
      <dl class="pet-age">
        <dt>
          <img src="../../static/img/icon/pick_card_age_w40_h40_1x.png" alt="">
        </dt>
        <dd>{{pet.ageDesc}}</dd>
      </dl>
      <dl class="pet-breif">
        <dt>
          <img src="../../static/img/icon/pick_card_brief_w40_h40_1x.png">
        </dt>
        <dd>{{pet.brief}}</dd>
      </dl>
      <dl class="pet-area">
        <dt>
          <img src="../../static/img/icon/pick_card_area_w40_h40_1x.png">
        </dt>
        <dd>{{pet.area}}</dd>
      </dl>
      <dl class="pet-number">
        <dt><img src="../../static/img/icon/pick_card_number_w40_h40_1x.png"></dt>
        <dd>身份证号{{pet.cardNumber}}</dd>
      </dl>
    </div>
    <!-- end pet-info -->
  </div>
  <!-- end pet-card -->
</div>
<!-- end pet-card-list -->
</template>
<script>
export default {
  props: ['pets'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.pet-card-list {
  // begin pet-card
  .pet-card {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 6px 10px 0 #FFC800;
    margin-top: 40rpx;
    padding: 40rpx 40rpx 10rpx 40rpx;
    position: relative;
    width: auto;
    .avatar {
      border-radius: 50%;
      display: block;
      height: 168rpx;
      position: absolute;
      right: 40rpx;
      top: 40rpx;
      width: 168rpx;
      z-index: 1;
    }
    // begin pet-info
    .pet-info {
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
          background: url('../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
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
          background: url('../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
          background-size: 18rpx 20rpx;
        }
      }
    }
    // end female
    dl {
      display: flex;
      flex-direction: row;
      margin-bottom: 20rpx;
      width: 100%;
      dt {
        display: inline-block;
        height: 40rpx;
        margin-right: 10rpx;
        width: 40rpx;
        img {
          display: block;
          height: 40rpx;
          width: 40rpx;
        }
      }
      dd {
        color: #565E6A;
        flex: 1;
        font-size: 28rpx;
        line-height: 40rpx;
      }
    }
  }
  // end pet-card
}

</style>
