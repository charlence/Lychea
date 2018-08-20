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
  <!-- begin BreedFilter -->
  <BreedFilter
    v-if = "isShowPetFilter"
  >
  </BreedFilter>
  <!-- end BreedFilter -->
</div>
</template>
<script>
import utils from '@/util'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import BreedFilter from '@/components/BreedFilter'
export default {
  data () {
    return {
      customNavBar: {
        title: '宠物品种',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png'
      },
      isShowPetFilter: true
    }
  },
  components: {
    BreedFilter,
    CustomNavBarOther
  },
  methods: {
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    }
  },
  mounted () {
    this.setCustomNavBar()
  }
}
</script>
<style lang="scss">
.wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
