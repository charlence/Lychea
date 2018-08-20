<template>
<div class="empty-pet-card">
  <div class="empty-pet-card__title">
    您还没有登记小主卡
  </div>
  <div class="empty-pet-card__desc">
    请通过“新增小主卡” <br/>
    立刻使用日志发布功能吧！
  </div>
  <img class="empty-pet-card__bg"
    src="../../static/img/empty_pet_card_bg_w560_h880_1x.png"
  >
</div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.empty-pet-card {
  height: 880rpx;
  margin: 40rpx auto 70rpx auto;
  position: relative;
  width: 560rpx;
  .empty-pet-card__bg {
    display: block;
    height: 100%;
    width: 100%;
  }
  .empty-pet-card__title {
    color: #000;
    font-size: 40rpx;
    font-weight: bold;
    height: 56rpx;
    left: 0;
    position: absolute;
    text-align: center;
    top: 80rpx;
    width: 100%;
    z-index: 1;
  }
  .empty-pet-card__desc {
    color: #000;
    font-size: 32rpx;
    left: 0;
    line-height: 44rpx;
    position: absolute;
    text-align: center;
    top: 332rpx;
    width: 100%;
    z-index: 1;
  }
}
</style>
