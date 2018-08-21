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
</div>
</template>
<script>
import CustomNavBarOther from '@/components/CustomNavBarOther'
import utils from '@/util'
export default {
  components: {
    CustomNavBarOther
  },
  data () {
    return {
      customNavBar: {
        title: '消息通知',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: false
      }
    }
  },
  methods: {
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    }
  },
  mounted () {

  },
  onLoad () {

  },
  onShow () {
    this.setCustomNavBar()
  }
}
</script>
<style lang="scss">

</style>
