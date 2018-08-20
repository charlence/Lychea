<template>
<div class="container"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin filter -->
  <div class="filter"
    :class="isShowFilter ? 'extend' : ''"
    :style="'top:' + customNavBar.totalHeight + 'px'"
  >
    <!-- begin Filter -->
    <Filter
      :filter="filter"
      :isShowFilter="isShowFilter"
      @fromFilter="handleFilter"
    >
    </Filter>
    <!-- end Filter -->
  </div>
  <!-- end filter -->
  <SearchBox></SearchBox>
  <div class="search-result-list">
    <Result></Result>
  </div>

</div>
</template>
<script>
import utils from '@/util'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import Result from '@/components/Result'
import Filter from '@/components/Filter'
import SearchBox from '@/components/SearchBox'
export default {
  data () {
    return {
      customNavBar: {
        title: '来吱 小主的世界',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: true
      },
      filter: {
        areaId: '',
        areaDesc: '全国区域',
        breedDesc: '全部物种',
        breedId: '',
        currentShowList: '',
        topicDesc: '全部类型',
        topicId: ''
      },
      isShowFilter: false
    }
  },
  components: {
    CustomNavBarOther,
    SearchBox,
    Result,
    Filter
  },
  computed: {
    // 通过动态获取CustomBarHome的totalHeight, 给container补白
    paddingCustomBarHeight () {
      return `padding-top: ${this.customNavBar.totalHeight + 44}px`
    },
    filterContentStyle () {
      return `height: ${wx.getStorageSync('DEVICEINFO').windowHeight - this.customNavBar.totalHeight - 44}px; top: ${this.customNavBar.totalHeight + 44}px`
    }
  },
  methods: {
    // 初始化
    init () {
      this.setCustomNavBar()
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    }
  },
  mounted () {
    this.init()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    console.log('接到的URL的参数===', urlParams)
    this.urlParams = urlParams
  },
  onShow () {
  }
}
</script>
<style>

</style>
