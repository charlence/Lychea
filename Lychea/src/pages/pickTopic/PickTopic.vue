<template>
<div class="wrapper"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarWhite -->
  <CustomNavBarWhite
    :customNavBar="customNavBar"
  >
  </CustomNavBarWhite>
  <!-- end CustomNavBarWhite -->
  <!-- begin pet -->
  <div class="pet">
    <img class="avatar"
      :src="petInfo.avatar"
    />
  </div>
  <!-- end pet -->
  <!-- begin topics -->
  <div class="topics">
    <div class="topics__title">
      选择主题
    </div>
    <div class="topics__list">
      <div class="item"
        v-for = "(topic, topicIndex) in topicList"
        :key = "topicIndex"
        :class = "topic.selected ? 'active' :''"
        @click = "switchTopic(topicIndex)"
      >
        {{topic.desc}}
      </div>
    </div>
  </div>
  <!-- end topics -->
  <!-- begin next-step -->
  <div class="next-step"
    @click = "goToTopic"
  >
    下一步
  </div>
  <!-- end next-step -->
</div>
</template>
<script>
import utils from '@/util'
import CustomNavBarWhite from '@/components/CustomNavBarWhite'
export default {
  data () {
    return {
      currentTopicId: '',
      customNavBar: {
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        title: ''
      },
      petInfo: {
        avatar: '',
        nickname: '',
        petId: '',
        topicId: '',
        topicDesc: ''
      },
      topicList: [
        {
          desc: '需要顺风车',
          topicId: '7',
          selected: false
        },
        {
          desc: '提供顺风车',
          topicId: '6',
          selected: false
        },
        {
          desc: '医疗健康咨询',
          topicId: '5',
          selected: false
        },
        {
          desc: '交友婚配',
          topicId: '4',
          selected: false
        },
        {
          desc: '送养',
          topicId: '3',
          selected: false
        },
        {
          desc: '想领养',
          topicId: '2',
          selected: false
        },
        {
          desc: '日常生活',
          topicId: '1',
          selected: true
        }
      ],
      urlParams: {}
    }
  },
  components: {
    CustomNavBarWhite
  },
  methods: {
    // init
    init () {
      this.customNavBar.title = this.urlParams.nickname
      this.initPetInfo(this.urlParams)
      // TEMP: topic 字段暂未使用
      // for (let i = 0; i < this.topicList.length; i++) {
      //   if (this.topicList[i].selected) {
      //     this.petInfo.topic = this.topicList[i].id
      //   }
      // }
    },
    // 初始化小主信息，备用进入下一页所用参数
    initPetInfo (obj) {
      console.log('初始化小主信息前，obj', obj)
      this.petInfo.avatar = obj.avatar
      this.petInfo.nickname = obj.nickname
      this.petInfo.petId = obj.petId
      this.petInfo.topicDesc = obj.topicDesc
      console.log('初始化小主信息====', this.petInfo)
    },
    // 切换选中主题
    switchTopic (e) {
      console.log('切换选中主题', e)
      for (let i = 0; i < this.topicList.length; i++) {
        this.topicList[i].selected = false
      }
      this.topicList[e].selected = true
      this.currentTopicId = this.topicList[e].topicId
      this.petInfo.topicId = this.topicList[e].topicId
      this.petInfo.topicDesc = this.topicList[e].desc
      console.log('当前选中主题的id', this.petInfo.topicId)
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // goToTopic 前往主题表单详情
    goToTopic () {
      console.log('跳转前petInfo==', this.petInfo)
      wx.navigateTo({
        url: '/pages/topicForm/main?' + `${utils.encodeSearchParams(this.petInfo)}`
      })
    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    console.log('选择主题时接到的参数===', urlParams)
    this.urlParams = urlParams
  },
  onShow () {
    this.init()
  }

}
</script>
<style lang="scss">
.wrapper {
  .pet {
    padding: 70rpx 0 60rpx 0;
    .avatar {
      background: #aaa;
      border-radius: 50%;
      display: block;
      height: 168rpx;
      margin: 0 auto;
      width: 168rpx;
    }
  }
  // begin topics
  .topics {
    padding-bottom: 220rpx;
    .topics__title {
      color: #000;
      font-size: 40rpx;
      height: 44rpx;
      line-height: 44rpx;
      padding-bottom: 80rpx;
      text-align: center;
    }
    .topics__list {
      align-items: flex-end;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap-reverse;
      justify-content: space-around;
      .item {
        background-color: #f9fafc;
        border-radius: 100px;
        color: #565e6a;
        font-size: 28rpx;
        height: 88rpx;
        line-height: 88rpx;
        margin-bottom: 40rpx;
        text-align: center;
        width: 210rpx;
      }
      // .item:nth-child(1) {
      //   align-self: flex-start;
      //   justify-content: space-between;
      // }
      .active {
        background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
        border-radius: 100px;
        color: #703C0F;
      }
    }
  }
  // end topics
  // begin next-step
  .next-step {
    background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
    border-radius: 100px;
    color: #703C0F;
    font-size: 36rpx;
    height: 100rpx;
    line-height: 100rpx;
    margin: 0 40rpx;
    text-align: center;
  }
  // end next-step
}
</style>
