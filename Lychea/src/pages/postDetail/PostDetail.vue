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
  <!-- begin post -->
  <Post
    :posts="posts"
  >
  </Post>
  <!-- end post -->
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
  <!-- begin btns -->
  <div class="btns">
    <div class="item"
      @click = "deletePost"
    >
      <img src="../../../static/img/icon/delete_gray_w26_h26_2x.png" alt="">
      <p>删除</p>
    </div>
    <div class="item"
      @click = "commentPost"
    >
      <img src="../../../static/img/icon/comment_gray_w26_h26_2x.png" alt="">
      <p>评论<span>12</span></p>
    </div>
    <div class="item"
      @click = "likePost"
    >
      <img src="../../../static/img/icon/like_gray_w26_h26_2x.png" alt="">
      <p>点赞<span>1.3k</span></p>
    </div>
    <div class="item">
      <img src="../../../static/img/icon/share_gray_w26_h26_2x.png" alt="">
      <p>分享</p>
      <button class="btn-share" open-type="share" name="button"></button>
    </div>
  </div>
  <!-- end btns -->
  <!-- begin reply-mod -->
  <div class="reply-mod"
    v-if="isShowCommentTextarea"
  >
    <div class="reply-hd">
      <radio-group
        @change = "switchCommentShowStatus"
      >
        <label class="ui-radio"
          v-for = "(radio, radioIndex) in currentComment.radios"
          :key = "radioIndex"
          :class = "currentComment.private === radio.index ? 'checked' : ''"
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
        <textarea name="commentText" placeholder="写评论..."  maxlength="-1" fixed="true" placeholder-style="color: #A1ABBC; font-size: 32rpx;"
          show-confirm-bar="true" cursor-spacing="20"
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
import Post from '@/components/Post'
export default {
  data () {
    return {
      posts: [],
      // post: {
      //   album: {
      //     urls: [
      //       'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
      //       ''
      //     ]
      //   },
      //   topic: {
      //     title: '#',
      //     info: [
      //       {
      //         option: '出发时间',
      //         content: '2018年09月27日'
      //       }
      //     ]
      //   }
      // },
      commentList: [],
      customNavBar: {
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        title: ''
      },
      currentComment: {
        content: '',
        private: '0',
        radios: [
          {
            name: '公开',
            index: '0'
          },
          {
            name: '私密',
            index: '1'
          }
        ]
      },
      isShowCommentTextarea: false,
      shareCard: {
        title: '',
        imageUrl: '',
        path: ''
      }
    }
  },
  components: {
    Comments,
    CustomNavBarWhite,
    Post
  },
  methods: {
    // init 初始化页面
    init () {
      this.getPostDetail(this.urlParams)
      this.initCommentList(this.urlParams)
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // getPostDetail 获取帖子详情数据
    async getPostDetail (param) {
      console.log('帖子param', param)
      const tempData = await Request.getHttp(config.getPostDetail, {infoid: param.infoid})
      console.log('帖子详情数据=====', tempData)
      this.processData(tempData.data)
    },
    // processData
    processData (_data) {
      let tempObj = {
        dateline: _data.dateline,
        likeNum: _data.like_num,
        commentNum: _data.comment_num,
        textContent: _data.content,
        petOwner: {
          avatar: _data.user_avatar,
          nickname: _data.user_nickname
        },
        pet: {
          avatar: _data.pet_avatar,
          breed: _data.pet_breed_name,
          gender: _data.pet_gender,
          nickname: _data.pet_nickname
        },
        topic: {
          title: _data.topic.name,
          info: _data.topic.content
        },
        type: 'detail',
        album: {
          urls: _data.pictures
        }
      }
      console.log('处理数据===', tempObj)
      this.posts.push(tempObj)
    },
    // 初始化评论数据
    async initCommentList (param) {
      // 帖子id
      const tempData = await Request.getHttp(config.getCommentListUrl, {info_id: param.infoid})
      console.log(tempData)
      if (tempData.status === 0) {
        this.processCommentList(tempData.data)
      }
    },
    // processCommentList 处理评论列表数据
    processCommentList (_data) {
      let tempList = []
      for (let idx in _data) {
        let tempObj = {
          avatar: _data[idx].avatar,
          content: _data[idx].content,
          dateline: _data[idx].dateline,
          id: _data[idx].id,
          infoid: _data[idx].info_id,
          nickname: _data[idx].nickname,
          private: _data[idx].private,
          replyUid: _data[idx].reply_uid,
          replyUserAvatar: _data[idx].reply_user_avatar,
          replyUserNickname: _data[idx].reply_user_nickname,
          uid: _data[idx].reply_uid
        }
        tempList.push(tempObj)
      }
      this.commentList = tempList
    },
    // previewImage 图片预览
    previewImage (e) {
      console.log('图片预览时===', e)
      let currentIndex = e.currentTarget.dataset.index
      console.log('点开的是===', this.post.album.urls[currentIndex])
      wx.previewImage({
        current: this.post.album.urls[currentIndex],
        urls: this.post.album.urls
      })
    },
    // 删除日志
    deletePost () {
    },
    // 评论日志
    commentPost () {
      // this.urlParams.infoid = '20'
      // wx.navigateTo({
      //   url: '/pages/reply/main?' + `${utils.encodeSearchParams(this.urlParams)}`
      // })
      this.isShowCommentTextarea = true
    },
    // 点赞操作
    likePost () {
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
        infoId: this.urlParams.infoid,
        content: content,
        replyUid: wx.getStorageSync('LYCHEAUSER').uid,
        private: this.currentComment.private
      }
      console.log('创建comment时必带参数===', obj)
      const tempData = await Request.getHttp(config.createCommentUrl, {info: obj})
      this.processReply(tempData)
      console.log(tempData)
    },
    // 处理新提交评论的数据
    processReply (_data) {
      // TEMP: status 为 0 代表提交评论成功, 此时刷新评论列表
      if (_data.status === 0) {
        this.initCommentList(this.urlParams)
      }
    },
    // 切换评论显示状态（公开or隐藏仅楼主可见）
    switchCommentShowStatus (e) {
      this.currentComment.private = e.mp.detail.value
    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    this.urlParams = urlParams
    console.log('url携带参数是：', urlParams)
  },
  onShow () {
    this.urlParams.infoid = '41'
    this.init()
  },
  onShareAppMessage (res) {
    console.log('转发时，share===', this.share)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return this.shareCard
  }
}
</script>
<style lang="scss">
page {
  background: #f8f8f8;
}
.wrapper {
  position: relative;
  // begin mod
  .mod {
    .mod-hd {
      background: #fff;
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
  // begin btns
  .btns {
    background: #fbfbfb;
    bottom: 0;
    display: flex;
    height: 100rpx;
    justify-content: space-around;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: 999;
    .item {
      color: #A1ABBC;
      font-size: 20rpx;
      position: relative;
      text-align: center;
      img {
        display: block;
        height: 52rpx;
        margin: 14rpx auto 0 auto;
        width: 52rpx;
      }
      p {
        min-width: 160rpx;
      }
      .btn-share {
        background: none;
        height: 100%;
        left: 50%;
        position: absolute;
        top: 0;
        transform: translateX(-50%);
        width: 100%;
        z-index: 1;
      }
      .btn-share::after {
        border: none;
      }
    }
  }
  // end btns
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
        height: 72rpx;
        margin: 0 20rpx;
        padding: 0 20rpx;
        textarea {
          color: #000;
          font-size: 30rpx;
          height: 36rpx;
          line-height: 36rpx;
          margin-top: 18rpx;
          width: 100%;
        }
        // .placeholder-style {
        //
        // }
      }
    }
  }
}
</style>
