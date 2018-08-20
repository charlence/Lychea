<template>
<!-- begin filter-wrapper -->
<div class="filter-wrapper"
  :style = "filterStyle"
>
  <!-- begin main -->
  <div class="main">
    <scroll-view scroll-y scroll-with-animation class="scroll-view-v"
      :scroll-into-view='breedListId'
    >
      <!-- begin pet-class  -->
      <div class="pet-class">
        <div class="pet-class-switch">
          <div class="pet-class-item"
            :class = "pickDog"
            @click = "pickClass(2)"
          >
            狗
          </div>
          <div class="pet-class-item"
            :class="pickCat"
            @click = "pickClass(1)"
          >
            猫
          </div>
        </div>
      </div>
      <!-- end pet-class -->
      <!-- begin hot -->
      <div class="hot">
        <div class="hot-title">
          热门品种
        </div>
        <div class="hot-list">
          <div class="item"
            v-for = "(breed, breedIndex) in hotBreed"
            :key = "breedIndex"
            @click = "pickBreed(breed.id)"
          >
          {{breed.name}}
          </div>
        </div>
      </div>
      <!-- end hot -->
      <!-- begin list -->
      <div class="list">
        <!-- begin group -->
        <div class="group"
          v-for = "(item, itemIndex) in breedList"
          :key = "itemIndex"
        >
          <div class="first-letter"
            :id = "item.letter"
          >
            {{item.letter}}
          </div>
          <div class="item"
            v-for = "(breed, breedIndex) in item.data"
            :key = "breedIndex"
            @click = "pickBreed(breed)"
          >
            <span>{{breed.name}}</span>
          </div>
        </div>
        <!-- end group -->
      </div>
      <!-- end breed-list -->
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
import config from '@/config'
import Request from '@/Request'
import utils from '@/util'
export default {
  data () {
    return {
      breedInfo: {
        breedType: 2,
        breedName: '',
        breedId: ''
      },
      breedList: [],
      breedListId: '',
      hotBreed: [],
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      filterWrapHeight: '',
      type: 2,
      pickCat: '',
      pickDog: 'dog'
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
    // init
    init () {
      this.fetchPetClass({tp: this.type})
    },
    // pickClass 选择物种
    pickClass (e) {
      if (e === 2 && this.pickDog === '') {
        this.pickCat = ''
        this.pickDog = 'dog'
      } else if (e === 1 && this.pickCat === '') {
        this.pickCat = 'cat'
        this.pickDog = ''
      }
      this.breedInfo.type = e
      this.fetchPetClass({tp: e})
    },
    // fetchPetClass 拉取小主类型下的品种信息
    async fetchPetClass (opt) {
      console.log('宠物分类是===', opt)
      const _data = await Request.getHttp(config.getPetClassUrl, opt)
      console.log('宠物分类是===', _data)
      this.processData(_data)
    },
    // processData 处理小主品种数据
    processData (_data) {
      console.log('开始处理小主品种信息===', _data)
      this.hotBreed = _data.hot
      this.formatBreedList(_data)
    },
    // formatBreedList 格式化宠物类型数据
    formatBreedList (_data) {
      let tempList = []
      for (let idx in _data.list) {
        let tempObj = {
          letter: idx,
          data: _data.list[idx]
        }
        tempList.push(tempObj)
      }
      this.breedList = tempList
    },
    // letterTap 点击字母
    letterTap (e) {
      console.log('letterTap==', e)
      this.cityListId = e
    },
    // pickBreed 选择具体品种
    pickBreed (breedObj) {
      this.selectedBreedId = breedObj.id
      this.breedInfo.breedName = breedObj.name
      this.breedInfo.breedId = breedObj.id
      wx.navigateTo({
        url: '/pages/addPet/main?' + `${utils.encodeSearchParams(this.breedInfo)}`
      })
    }
  },
  mounted () {
    this.getFilterWrapHeight()
    this.init()
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
      // begin pet-class
      .pet-class {
        background: #fff;
        border-radius: 100px;
        height: 72rpx;
        margin: 40rpx auto 0 auto;
        width: 240rpx;
        .pet-class-item {
          background: #FFFFFF;
          border-radius: 100px;
          color: #78818F;
          float: left;
          font-size: 30rpx;
          height: 72rpx;
          line-height: 72rpx;
          overflow: hidden;
          text-align: center;
          width: 120rpx;
        }
        .dog {
          background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
          border-radius: 100px;
          color: #703C0F;
          // height: 72rpx;
          // line-height: 72rpx;
          // overflow: hidden;
          // width: 120rpx;
        }
        .cat {
          background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
          border-radius: 100px;
          color: #703C0F;
          // height: 72rpx;
          // line-height: 72rpx;
          // overflow: hidden;
          // width: 120rpx;
        }
      }
      // end pet-class
      // begin hot
      .hot {
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
