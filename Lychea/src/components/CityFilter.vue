<template>
<!-- begin filter-wrapper -->
<div class="filter-wrapper"
  :style = "filterStyle"
>
  <!-- begin main -->
  <div class="main">
    <scroll-view scroll-y scroll-with-animation class="scroll-view-v"
      :scroll-into-view='cityListId'
    >
      <!-- begin hot -->
      <div class="hot">
        <div class="hot-title">
          热门城市
        </div>
        <div class="hot-list">
          <div class="item"
            v-for = "(city, cityIndex) in hotCity"
            :key = "cityIndex"
            @click = "goToCity(city.id)"
          >
          {{city.cityName}}
          </div>
        </div>
      </div>
      <!-- end hot -->
      <!-- begin list -->
      <div class="list">
        <!-- begin group -->
        <div class="group"
          v-for = "(item, itemIndex) in cityList"
          :key = "itemIndex"
        >
          <div class="first-letter"
            :id = "item.letter"
          >
            {{item.letter}}
          </div>
          <div class="item"
            v-for = "(city, cityIndex) in item.data"
            :key = "cityIndex"
            @click = "goToCity(city.id)"
          >
            <span>{{city.cityName}}</span>
          </div>
        </div>
        <!-- end group -->
      </div>
      <!-- end list -->
    </scroll-view>
  </div>
  <!-- end main -->
  <!-- begin sub -->
  <div class="sub">
    <div class="letter-item"
      v-for = "(item, itemIndex) in letter"
      :key = "this"
      @click = "letterTap(item)"
    >
      {{item}}
    </div>
  </div>
  <!-- end sub -->
</div>
<!-- end filter-wrapper -->
</template>
<script>
import utils from '@/util'
export default {
  data () {
    return {
      cityList: [
        { 'letter': 'A',
          'data': [{ 'id': 'v7', 'cityName': '安徽' }]
        },
        { 'letter': 'B',
          'data': [
            { 'id': 'v10', 'cityName': '巴中' },
            { 'id': 'v4', 'cityName': '包头' },
            { 'id': 'v1', 'cityName': '北京' }
          ]
        },
        { 'letter': 'C',
          'data': [
            { 'id': 'v15', 'cityName': '成都' }
          ]
        },
        { 'letter': 'D',
          'data': [
            { 'id': 'v21', 'cityName': '稻城' }
          ]
        },
        { 'letter': 'G',
          'data': [
            { 'id': 'v17', 'cityName': '广州' },
            { 'id': 'v29', 'cityName': '桂林' }
          ]
        },
        { 'letter': 'H',
          'data': [
            { 'id': 'v9', 'cityName': '海南' },
            { 'id': 'v3', 'cityName': '呼和浩特' }
          ]
        },
        { 'letter': 'L',
          'data': [
            { 'id': 'v24', 'cityName': '洛阳' },
            { 'id': 'v20', 'cityName': '拉萨' },
            { 'id': 'v14', 'cityName': '丽江' }
          ]
        },
        { 'letter': 'M',
          'data': [
            { 'id': 'v13', 'cityName': '眉山' }
          ]
        },
        { 'letter': 'N',
          'data': [
            { 'id': 'v27', 'cityName': '南京' }
          ]
        },
        { 'letter': 'S',
          'data': [
            { 'id': 'v18', 'cityName': '三亚' },
            { 'id': 'v2', 'cityName': '上海' }
          ]
        },
        { 'letter': 'T',
          'data': [
            { 'id': 'v5', 'cityName': '天津' }
          ]
        },
        { 'letter': 'W',
          'data': [
            { 'id': 'v12', 'cityName': '乌鲁木齐' },
            { 'id': 'v25', 'cityName': '武汉' }
          ]
        },
        { 'letter': 'X',
          'data': [
            { 'id': 'v23', 'cityName': '西安' },
            { 'id': 'v28', 'cityName': '香港' },
            { 'id': 'v19', 'cityName': '厦门' }
          ]
        },
        { 'letter': 'Z',
          'data': [
            { 'id': 'v8', 'cityName': '张家口' }
          ]
        }
      ],
      cityListId: '',
      hotCity: [
        { 'id': 'v1', 'cityName': '北京' },
        { 'id': 'v28', 'cityName': '香港' }
      ],
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      filterWrapHeight: ''
    }
  },
  computed: {
    filterStyle () {
      return `height: ${this.filterWrapHeight}px`
    }
  },
  methods: {
    // 设置filter-wrapper的样式，用来控制scroll-view的高度
    getFilterWrapHeight () {
      if (!wx.getStorageSync('DEVICEINFO')) {
        utils.getDeviceInfo()
      } else {
        this.filterWrapHeight = wx.getStorageSync('DEVICEINFO').windowHeight - wx.getStorageSync('DEVICEINFO').titleTotalHeight
      }
      console.log(this.filterWrapHeight)
    },
    // letterTap 点击字母
    letterTap (e) {
      console.log('letterTap==', e)
      this.cityListId = e
      // const Item = e.currentTarget.dataset.item;
      // this.setData({
      //   cityListId: Item
      // });
      // console.log(this.data.cityListId);
    },
    goToCity () {

    }
  },
  mounted () {
    this.getFilterWrapHeight()
  }
}
</script>
<style lang="scss">
.filter-wrapper {
  background: none;
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  .main {
    flex: 1;
    .scroll-view-v {
      background: #f8f8f8;
      height: 100%;
      width: 100%;
      // begin hot
      .hot{
        overflow: hidden;
        padding: 20rpx 30rpx;
        .hot-title {
          color: #565E6A;
          font-size: 32rpx;
          height: 80rpx;
          line-height: 80rpx;
        }
        .hot-list {
          padding-bottom: 20rpx;
          .item {
            background: #fff;
            border-radius: 4px;
            color: #78818F;
            float: left;
            font-size: 14px;
            height: 64rpx;
            line-height: 64rpx;
            margin: 0 20rpx 20rpx 0;
            padding: 0 16rpx;
            text-align: center;
          }
        }
      }
      // end hot
      // begin list
      .list {
        width: 100%;
        .group {
          .first-letter {
            color: #78818F;
            font-size: 30rpx;
            height: 56rpx;
            line-height: 56rpx;
            text-indent: 30rpx;
          }
          .item {
            background: #fff;
            height: 92rpx;
            padding: 0 30rpx;
            span {
              color: #333;
              font-size: 32rpx;
              border-bottom: 1rpx solid #e5e5e6;
              display: block;
              height: 90rpx;
              line-height: 90rpx;
              width: 100%;
            }
          }
        }
      }
      // end list
    }
  }
  .sub {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 50rpx;
    position: absolute;
    right: 0;
    top: 0;
    width: 60rpx;
    z-index: 1;
    .letter-item {
      color: #007AFF;
      display: block;
      flex: 1;
      font-size: 24rpx;
      height: 44rpx;
      line-height: 44rpx;
      text-align: center;
    }
  }
}
</style>
