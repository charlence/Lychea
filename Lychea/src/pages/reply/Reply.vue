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
  <!-- begin mod -->
  <div class="mod">
    <div class="mod-hd">
      <div class="mod-hd__title">
        全部评论
      </div>
    </div>
    <div class="mod-bd">
      <Comments
        :commentList="commentList"
      >
      </Comments>
      <!-- begin end-tips -->
      <div class="end-tips">
        <div class="decoration">
          <span></span>
          <em>·&nbsp;END&nbsp;·</em>
        </div>
      </div>
      <!-- end end-tips -->
    </div>
  </div>
  <!-- end mod -->
  <!-- begin reply-mod -->
  <div class="reply-mod">
    <div class="reply-hd">
      <radio-group
        @change = "switchCommentShowStatus"
      >
        <label class="ui-radio"
          v-for = "(radio, radioIndex) in commentStatus.radios"
          :key = "radioIndex"
          :class = "commentStatus.type === radio.index ? 'checked' : ''"
        >
          <radio
            :value = "radio.index"
          >
        </radio>
          <span class="text">
          {{radio.name}}
          </span>
          <span class="tips"
            v-if = "radio.selectedVal === '2'"
          > 设置隐藏时，仅楼主可见哟~
          </span>
        </label>
      </radio-group>
    </div>
    <div class="reply-bd">
      <div class="reply-content">
        <textarea name="commentText" placeholder="写评论..." placeholder-style="placeholder-style" maxlength="-1" fixed="true"
          show-confirm-bar="false" cursor-spacing="20"
          @blur = "getCommentText"
          @confirm = "getCommentText"
        >
        </textarea>
      </div>
    </div>
  </div>
  <!-- end reply-mod -->

</div>
</template>
<script>
import config from '@/config'
import Request from '@/Request'
import utils from '@/util'
import Comments from '@/components/Comments'
import CustomNavBarWhite from '@/components/CustomNavBarWhite'
export default {
  data () {
    return {
      commentList: [
        {
          commenterAvatar: '../../../static/img/icon/default_user_photo_w40_h40_2x.png',
          commenterNickname: '伊娃诺维奇',
          content: '什么时候有空，再打一盘？',
          retime: '8月4日',
          repliedNickname: '莎拉波娃',
          status: '1'
        },
        {
          commenterAvatar: '../../../static/img/icon/default_user_photo_w40_h40_2x.png',
          commenterNickname: '夏周一',
          content: '超级漂亮又可爱的宝宝，萌萌哒！超级漂亮又可爱的宝宝，萌萌哒！',
          retime: '04月22日',
          repliedNickname: '',
          status: '0'
        }
      ],
      customNavBar: {
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        title: '评论'
      },
      commentStatus: {
        type: '1',
        radios: [
          {
            name: '公开',
            index: '1'
          },
          {
            selectedVal: '1',
            name: '私密',
            index: '2'
          }
        ]
      }
    }
  },
  components: {
    Comments,
    CustomNavBarWhite
  },
  methods: {
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
      console.log('page标题是===', this.customNavBar)
    },
    // getCommentText 获取评论内容
    getCommentText (e) {
      console.log('textarea===', e.mp.detail.value)
      let that = this
      if (e.mp.detail.value) {
        that.submitComment(e.mp.detail.value)
      }
    },
    // submitComment 提交评论
    async submitComment (content) {
      let obj = {
        commentStatus: this.commentStatus.type,
        info: content
      }
      const tempData = await Request.postHttp(config.createCommentUrl, obj)
      console.log(tempData)
    },
    // 切换评论显示状态（公开or隐藏仅楼主可见）
    switchCommentShowStatus (e) {
      this.commentStatus.type = e.mp.detail.value
    },
    // 初始化评论数据
    async initCommentList (id) {
      // 帖子id
      const tempData = await Request.getHttp(config.getCommentListUrl, {infoid: id})
      console.log(tempData)
      this.processCommentList(tempData)
    },
    // processCommentList 处理评论列表数据
    processCommentList () {

    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    this.customNavBar.title = '评论'
    this.postInfoId = urlParams.infoid
  },
  onShow () {
    this.initCommentList(this.postInfoId)
  }
}
</script>
<style lang="scss">
page {
  background: #f8f8f8;
}
.wrapper {
  // begin mod
  .mod {
    .mod-hd {
      color: #565E6A;
      font-size: 32rpx;
      height: 80rpx;
      line-height: 80rpx;
      padding: 0 30rpx;
    }
    .mod-bd {
      padding-bottom: 100rpx;
      .end-tips {
        background: #f8f8f8;
        height: 40rpx;
        padding: 40rpx 0 60rpx 0;
        .decoration {
          height: 40rpx;
          margin: 0 auto;
          position: relative;
          text-align: center;
          width: 200rpx;
          span {
            background: #a1abbc;
            height: 2rpx;
            left: 0;
            position: absolute;
            top: 18rpx;
            width: 100%;
            z-index: 0;
          }
          em {
            background: #f8f8f8;
            color: #a1abbc;
            font-size: 28rpx;
            height: 40rpx;
            left: 50%;
            line-height: 40rpx;
            position: absolute;
            top: 0;
            transform: translateX(-50%);
            z-index: 2;
          }
        }
      }
    }
  }
  // end mod
  // begin reply-mod
  .reply-mod {
    background: #f8f8f8;
    bottom: 0;
    left: 0;
    padding-bottom: 28rpx;
    position: fixed;
    width: 100%;
    z-index: 999;
    .reply-hd {
      height: 40rpx;
      padding: 30rpx 24rpx;
      .ui-radio {
        height: 40rpx;
        line-height: 40rpx;
        float: left;
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
    .reply-bd {
      .reply-content {
        background: #FFFFFF;
        border: 1px solid #F3F4F6;
        border-radius: 100px;
        height: 36rpx;
        margin: 0 20rpx;
        padding: 18rpx 20rpx;
        textarea {
          color: #000;
          font-size: 30rpx;
          height: 36rpx;
          line-height: 36rpx;
          width: 100%;
        }
        .placeholder-style {
          color: #A1ABBC;
          font-size: 32rpx;
          height: 100%;
          line-height: 36rpx;
        }
      }
    }
  }
}
</style>
