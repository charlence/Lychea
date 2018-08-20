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
  <!-- begin Adoption -->
  <!-- <Adoption
    :formItem = "formItem"
  >
  </Adoption> -->
  <!-- end Adoption -->
  <!-- begin topic-content -->
  <div class="topic-content">
    <!-- begin mod -->
    <div class="mod"
      v-for = "(item, itemIndex) in petInfo.formItem"
      :key = "itemIndex"
    >
      <div class="mod-hd">
        {{item.labelText}}
      </div>
      <div class="mod-bd">
        <radio-group
          :data-index="itemIndex"
          @change = "radioChange"
        >
          <label class="ui-radio"
            v-for = "(radio, radioIndex) in item.radios"
            :key = "radioIndex"
            :item = "item"
            :class = "item.selectedVal === radio.index ? 'checked' : ''"
          >
            <radio
              :value = "radio.index"
            >
          </radio>
            <span class="text">
            {{radio.name}}
            </span>
          </label>
        </radio-group>
      </div>
    </div>
    <!-- end mod -->
    <!-- begin comment-status-tips -->
    <div class="comment-status-tips">
      开放状态，意味着您日志下的评论为全员可见，除非评论者设置了“仅楼主可见”。私密状态，意味着每条评论仅评论发布者和您可见.
    </div>
    <!-- end comment-status-tips -->
  </div>
  <!-- end topic-content -->
  <!-- begin next-step -->
  <div class="next-step"
    @click = "goToPoste"
  >
    下一步
  </div>
  <!-- end next-step -->
</div>
</template>
<script>
import config from '@/config'
import utils from '@/util'
import Request from '@/Request'
import CustomNavBarWhite from '@/components/CustomNavBarWhite'
export default {
  data () {
    return {
      customNavBar: {
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        title: ''
      },
      formItem: [],
      petInfo: {
        formItem: []
      }
    }
  },
  components: {
    CustomNavBarWhite
  },
  methods: {
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // fetchTopicForm 拉取主题表单
    async fetchTopicForm (topicId) {
      const tempData = await Request.getHttp(config.getTopicFormUrl, {topicid: topicId})
      this.formatTopicForm(tempData)
    },
    // formatTopicForm 组织数据
    formatTopicForm (_data) {
      let tempList = []
      for (let idx in _data.data.labels) {
        let tempObj = {
          labelText: _data.data.labels[idx].name,
          selectedVal: _data.data.labels[idx].selected,
          radios: _data.data.labels[idx].radios
        }
        tempList.push(tempObj)
      }
      this.petInfo.formItem = tempList
    },
    // radioChange 监听radio选中项, radio-gruop 为多组，定位group所在index很重要；
    radioChange (e) {
      console.log('radioChange', e)
      let formItem = e.mp.currentTarget.dataset.index
      let selectedItem = e.mp.detail.value
      this.petInfo.formItem[formItem].selectedVal = selectedItem
      console.log('选的项目：', formItem)
      console.log('选的值：', selectedItem)
      // let selectedVal = e.mp.detail.value
    },
    // goToPoste 前往话题发布页
    goToPoste () {
      let tempObj = {
        nickname: this.petInfo.nickname,
        petId: this.petInfo.petId,
        topicId: this.petInfo.topicId,
        avatar: this.petInfo.avatar,
        formItem: JSON.stringify(this.petInfo.formItem)
      }
      console.log('发布前的参数==', tempObj)
      wx.navigateTo({
        url: '/pages/post/main?' + `${utils.encodeSearchParams(tempObj)}`
      })
    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    this.customNavBar.title = urlParams.topicDesc
    this.petInfo = Object.assign(urlParams, this.petInfo)
    console.log('主题表单选择，接到的url携带参数是：', urlParams)
    console.log('接进来的topic id===', this.petInfo.topicId)
  },
  onShow () {
    this.fetchTopicForm(this.petInfo.topicId)
  }
}
</script>
<style lang="scss">
.wrapper {
  // begin topic-content
  .topic-content {
    padding: 60rpx 40rpx 0 40rpx;
    // begin mod
    .mod {
      padding-bottom: 50rpx;
      width: 100%;
      .mod-hd {
        color: #565E6A;
        font-size: 32rpx;
        height: 32rpx;
        line-height: 32rpx;
        padding-bottom: 30rpx;
      }
      .mod-bd {
        // display: flex;
        // flex-direction: row;
        // flex-wrap: wrap;
        // justify-content: flex-start;
        overflow: hidden;
        .ui-radio {
          height: 40rpx;
          line-height: 40rpx;
          float: left;
          margin-bottom: 30rpx;
          radio {
            display: none;
          }
          .text {
            background: url('../../../static/img/icon/select_default_w20_h20_3x.png') no-repeat 0 0;
            background-size: 40rpx 40rpx;
            color: #000;
            font-size: 30rpx;
            height: 40rpx;
            line-height: 40rpx;
            margin-right: 30rpx;
            padding-left: 50rpx;
          }
        }
        .checked {
          .text {
            background: url('../../../static/img/icon/select_active_w20_h20_3x.png') no-repeat 0 0;
            background-size: 40rpx 40rpx;
            color: #000;
            font-size: 30rpx;
            height: 40rpx;
            line-height: 40rpx;
            margin-right: 30rpx;
            padding-left: 50rpx;
          }
        }
      }
    }
    // end mod
    // comment-status-tips
    .comment-status-tips {
      color: #A1ABBC;
      font-size: 26rpx;
      line-height: 36rpx;
      margin-bottom: 80rpx;
    }
    // end comment-status-tips
  }
  // end topic-content
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
