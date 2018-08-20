<template>
<!-- begin simplify-pet-card-list -->
<div class="simplify-pet-card-list">
  <div class="simplify-pet-card"
    v-for="(pet, petIndex) in simplifyPetCard"
    :key="petIndex"
  >
    <img class="avatar"
      :src="pet.avatar"
    >
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
      <div class="age">
        {{pet.ageDesc}}
      </div>
    </div>
  </div>
</div>
<!-- end simplify-pet-card-list -->
</template>
<script>
export default {
  props: ['simplifyPetCard'],
  data () {
    return {

    }
  }
}
</script>
<style lang="scss">
.simplify-pet-card-list {
  .simplify-pet-card {
    background: #FFFFFF;
    box-shadow: 0 2px 8px 1px #F3F4F6;
    border-radius: 4px;
    display: flex;
    margin-bottom: 40rpx;
    padding: 28rpx;
    .avatar {
      border-radius: 50%;
      display: inline-block;
      height: 88rpx;
      margin-right: 18rpx;
      width: 88rpx;
    }
    .pet-info {
      flex: 1;
      position: relative;
      .nickname {
        color: #000;
        font-size: 30rpx;
        height: 36rpx;
        line-height: 36rpx;
        margin-bottom: 12rpx;
        text-align: left;
      }
      .creature-attribute {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        .sterilize {
          background: #C9CFDD;
          border-radius: 100px;
          color: #fff;
          font-size: 24rpx;
          height: 32rpx;
          line-height: 32rpx;
          margin-right: 22rpx;
          padding: 0 16rpx;
        }
        .sterilize.active {
          background: #FFD220;
        }
        .breed {
          border-radius: 100px;
          color: #000;
          font-size: 24rpx;
          height: 32rpx;
          line-height: 32rpx;
          padding: 0 16rpx;
          .breed__text {
            color: #fff;
            float: left;
            height: 32rpx;
            line-height: 32rpx;
          }
          .gender {
            float: left;
            height: 20rpx;
            margin: 8rpx 0 10rpx 6rpx;
            width: 18rpx;
          }
        }
      }
      .age {
        color: #565E6A;
        font-size: 26rpx;
        line-height: 28rpx;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 1;
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
  }
}

</style>
