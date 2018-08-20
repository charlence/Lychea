<template>
<div class="filter-section">
  <!-- begin filter-panel -->
  <div class="filter-panel">
    <div class="item"
      :class="filter.currentShowList === '0' ? 'active' : ''"
      :data-currentval="filter.areaId"
      @click="goToPickArea"
    >
      <p>全国区域</p>
      <span></span>
    </div>
    <div class="item"
      :class="filter.currentShowList === '1' ? 'active' : ''"
      :data-currentshowlist="filter.currentShowList"
      :data-currentval="filter.breedId"
      :data-filtershowfilter="isShowFilter"
      :data-filtertype="'breed'"
      :data-selflist="'1'"
      :filterContent="filterContent"
      @click="switchFilterList"
    >
      <p
        v-if="filter.currentShowList !== '1' || filterContent.currentSelectedDesc === ''"
      >{{filter.breedDesc}}
      </p>
      <p v-if="filter.currentShowList === '1' && filterContent.currentSelectedDesc !== ''">
        {{filterContent.currentSelectedDesc}}
      </p>
      <span></span>
    </div>
    <div class="item"
      :class="filter.currentShowList === '2' ? 'active' : ''"
      :data-currentshowlist="filter.currentShowList"
      :data-currentval="filter.topicId"
      :data-filtershowfilter="isShowFilter"
      :data-filtertype="'topic'"
      :data-selflist="'2'"
      :filterContent="filterContent"
      @click="switchFilterList"
    >
      <p
        v-if="filter.currentShowList !== '2' || filterContent.currentSelectedDesc === ''"
      >{{filter.topicDesc}}
      </p>
      <p v-if="filter.currentShowList === '2' && filterContent.currentSelectedDesc !== ''">
        {{filterContent.currentSelectedDesc}}
      </p>
      <span></span>
    </div>
  </div>
  <!-- end filter-panel -->
  <!-- begin filter-content -->
  <div class="filter-content"
    v-if="isShowFilterContent"
  >
    <div class="filter-list">
      <div class="item"
        v-for="(item, itemIndex) in filterContent.list"
        :class="filterContent.currentSelectedVal === item.itemType ? 'active' : ''"
        :data-filtertype="filterContent.currentFilterType"
        :data-currentlist="filter.currentShowList"
        :data-itemtype="item.itemType"
        :data-itemtitle="item.title"
        :filter="filter"
        :filterContent="filterContent"
        :key="itemIndex"
        @click="switchPostList"
      >
        <div class="title">
          {{item.title}}
        </div>
        <span></span>
      </div>
    </div>
  </div>
  <!-- end filter-content -->
</div>

</template>
<script>
export default {
  props: ['filter', 'isShowFilter'],
  data () {
    return {
      breedList: [
        {
          currentOpt: '0',
          itemType: '0',
          title: '全部物种'
        },
        {
          currentOpt: '2',
          itemType: '2',
          title: '狗'
        },
        {
          currentOpt: '1',
          itemType: '1',
          title: '猫'
        }
      ],
      fitler: this.filter,
      filterContent: {
        currentSelectedDesc: '',
        currentSelectedVal: '0',
        list: []
      },
      isShowFilterContent: false,
      topicList: [
        {
          itemType: '0',
          title: '全部类型'
        },
        {
          itemType: '1',
          title: '日常生活'
        },
        {
          itemType: '2',
          title: '想领养'
        },
        {
          itemType: '3',
          title: '送养'
        },
        {
          itemType: '4',
          title: '交友婚配'
        },
        {
          itemType: '5',
          title: '医疗健康咨询'
        },
        {
          itemType: '6',
          title: '提供顺风车'
        },
        {
          itemType: '7',
          title: '需要顺风车'
        }
      ]
    }
  },
  methods: {
    // goToPickArea 前往地区筛选页
    goToPickArea () {
      wx.navigateTo({
        url: '/pages/area/main?'
      })
    },
    // switchFilterList 切换筛选列表
    switchFilterList (e) {
      let tempObj = {
        filterType: e.currentTarget.dataset.filtertype,
        filterVal: e.currentTarget.dataset.currentval,
        isShowFilter: e.currentTarget.dataset.filtershowfilter,
        currentShowList: e.currentTarget.dataset.currentshowlist,
        selfList: e.currentTarget.dataset.selflist
      }
      if (tempObj.selfList === tempObj.currentShowList) {
        tempObj.isShowFilter = !tempObj.isShowFilter
        this.isShowFilterContent = tempObj.isShowFilter
      } else {
        // 当前展开面板，直接切换另一个大类
        switch (tempObj.filterType) {
          case 'topic':
            if (this.filter.topicId === '') {
              tempObj.filterVal = '0'
            }
            this.filterContent.currentSelectedDesc = this.filter.topicDesc
            this.filterContent.currentSelectedVal = tempObj.filterVal
            this.filterContent.list = this.topicList
            break
          case 'breed':
            if (this.filter.breedId === '') {
              tempObj.filterVal = '0'
            }
            this.filterContent.currentSelectedDesc = this.filter.breedDesc
            this.filterContent.currentSelectedVal = tempObj.filterVal
            this.filterContent.list = this.breedList
            break
          default:
        }
        tempObj.currentShowList = tempObj.selfList
        tempObj.isShowFilter = true
        this.isShowFilterContent = tempObj.isShowFilter
      }
      this.$emit('fromFilter', tempObj)
    },
    // switchPostList
    switchPostList (e) {
      console.log('切换子项时的参数===', e)
      this.filterContent.currentSelectedDesc = e.currentTarget.dataset.itemtitle
      this.filterContent.currentSelectedVal = e.currentTarget.dataset.itemtype
      let tempObj = {
        filterType: e.currentTarget.dataset.currentlist === '1' ? 'breed' : 'topic',
        filterId: e.currentTarget.dataset.itemtype,
        filterTypeDesc: e.currentTarget.dataset.itemtitle,
        currentShowList: e.currentTarget.dataset.currentlist
      }
      this.isShowFilterContent = false
      console.log('switchPostList切换==', tempObj)
      this.$emit('fromFilter', tempObj)
      this.isShowFilterContent = tempObj.isShowFilter
    }
  }
}
</script>
<style lang="scss">
.filter-section {
  // begin filter-panel
  .filter-panel {
    background: #FFD220;
    color: #000;
    font-size: 32rpx;
    height: 88rpx;
    width: 100%;
    // begin item
    .item {
      float: left;
      height: 88rpx;
      line-height: 88rpx;
      width: 33.3333%;
      p {
        float: left;
        margin: 0 10rpx 0 52rpx;
      }
      span {
        background: url('../../static/img/icon/common_select_arrow_black_dropdown_w10_h8_2x.png') no-repeat 0 0;
        background-size: 20rpx 16rpx;
        float: left;
        height: 16rpx;
        margin: 36rpx 0;
        width: 20rpx;
      }
    }
    // end item
    .active {
      span {
        background: url('../../static/img/icon/common_select_arrow_black_pickup_w10_h8_2x.png') no-repeat 0 0;
        background-size: 20rpx 16rpx;
      }
    }
  }
  // end filter-panel
  // begin filter-content
  .filter-content {
    .filter-list {
      background: #fff;
      padding-left: 30rpx;
      .item {
        border-bottom: 1rpx solid #e5e5e5;
        color: #78818F;
        display: flex;
        font-size: 32rpx;
        height: 90rpx;
        line-height: 90rpx;
        .title {
          flex: 1;
        }
        span {
          background: url('../../static/img/icon/select_default_w20_h20_3x.png') no-repeat 0 0;
          background-size: 40rpx 40rpx;
          display: inline-block;
          margin: 25rpx 30rpx 25rpx 0;
          width: 40rpx;
        }
      }
      .active {
        color: #000;
        span {
          background: url('../../static/img/icon/select_active_w20_h20_3x.png') no-repeat 0 0;
          background-size: 40rpx 40rpx;
        }
      }
    }
  }
  // end filter-content
}

</style>
