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
      :src="urlParams.avatar"
    />
    <div class="poste-date">2018/08/07</div>
  </div>
  <!-- end pet -->
  <!-- begin poste-text -->
  <div class="poste-text">
    <textarea name="posteText" placeholder="这一刻的想法..." placeholder-style="placeholder-style" maxlength="-1"
      @blur = "getPosteText"
      @confirm = "getPosteText"
    >
    </textarea>
  </div>
  <!-- end poste-text -->
  <!-- begn poste-img -->
  <div class="poste-img">
    <div class="choose-img"
      v-if = "isShowChooseImgBtn"
      @click = "pickImg"
    >
      <img src="../../../static/img/icon/poste_add_pic_w152_h152_1x.png">
    </div>
    <scroll-view class="scroll-view-h" scroll-x="true">
      <div class="item"
        v-for = "(img, imgIndex) in tempImgList"
        :key = "imgIndex"
        @click = "removeSelectedPhoto(imgIndex)"
      >
        <img class="selected-photo" mode="aspectFit"
          :src = "img"
        >
        <img class="delete-btn" src="../../../static/img/icon/cross_white_w32_h32_1x.png">
      </div>
    </scroll-view>
  </div>
  <!-- end poste-img -->
  <!-- begin poste-btn -->
  <div class="poste-btn"
    @click = "submitPoster"
  >
    发&nbsp;&nbsp;布
  </div>
  <!-- end poste-btn -->
  <!-- begin step-back -->
  <div class="step-back">
    上一步
  </div>
  <!-- end step-back -->
</div>
</template>
<script>
import utils from '@/util'
import config from '@/config'
import Request from '@/Request'
import CustomNavBarWhite from '@/components/CustomNavBarWhite'
export default {
  data () {
    return {
      customNavBar: {
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        title: ''
      },
      isShowChooseImgBtn: true,
      isShowPosteSelectedImg: false,
      posterContent: '',
      tempImgList: [],
      uploadImgList: [],
      urlParams: {}
    }
  },
  components: {
    CustomNavBarWhite
  },
  methods: {
    // init
    init () {
      console.log('init时===', this.petInfo)
      this.customNavBar.title = this.urlParams.nickname
    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // submitPoster 点击发布
    submitPoster () {
      // TEMP: 提交发布的几种情形
      // 1 tempImgList.length 为 0, posterContent不为空，即只发布文本
      // 2 反之，发布的内容即有文本，也有图片，(且需等待图片全部上传，完毕，做最终发布提交)
      console.log('submit之前', this.tempImgList.length, this.uploadImgList.length)
      if (this.tempImgList.length === 0 && this.uploadImgList.length === 0 && this.posterContent !== '') {
        // this.uploadPoster()
      } else if (this.tempImgList.length !== 0 && this.uploadImgList.length === 0) {
        console.log('先上传图片==')
        console.log('图片数量==', this.tempImgList.length, this.uploadImgList.length)
        this.uploadImg(this.tempImgList)
      }
    },
    // uploadPoster 上传poster内容，图、文、或图文都有
    async uploadPoster () {
      console.log('发布前===', this.poster)
      this.urlParams.posterContent = this.posterContent
      this.urlParams.album = this.uploadImgList.length !== 0 ? this.uploadImgList : []
      console.log('发布前的===', this.urlParams)
      const tempData = await Request.getHttp(config.postingUrl, {info: this.urlParams})
      console.log('发布后==', tempData)
      this.processPoster(tempData)
    },
    // processPoster 对uploadPoster的结果处理
    processPoster (_data) {
      // TEMP: 1 请求超时或失败; 2 服务器返回错误; 3 成功
      console.log('post前processData', _data)
      if (_data.errMsg === 'request: fail' || _data.errMsg === 'request: fail timeout') {
        console.log('请求失败或超时===', _data.errMsg)
      } else if (_data.statusCode === 11000) {
        // TEMP: statusCode 错误码，处理异常
      } else {
        console.log('post前processData,data.id', _data.data.id)
        let param = {
          infoid: _data.data.id
        }
        console.log('发布跳转前的参数===', utils.encodeSearchParams(param))
        wx.navigateTo({
          url: '/pages/postDetail/main?' + `${utils.encodeSearchParams(param)}`
        })
      }
    },
    // getPosteText 获取textarea的value
    getPosteText (e) {
      console.log('textarea===', e.mp.detail.value)
      this.posterContent = e.mp.detail.value
    },
    // pickImg 从相册中选择图片
    pickImg () {
      let that = this
      wx.chooseImage({
        count: 9 - that.tempImgList.length, // 默认9
        sizeType: ['original', 'compressed'],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'],
        // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          that.tempImgList = that.tempImgList.concat(res.tempFilePaths)
          if (that.tempImgList.length === 9) {
            that.isShowChooseImgBtn = false
          }
          // let tempFilePaths = res.tempFilePaths
          console.log('临时图片路径===', that.tempImgList)
        },
        fail: function (res) {
          // TEMP: 确认fail的场景，并做相应处理
        },
        complete: function (res) {
          // complete
        }
      })
    },
    // removeSelectedPhoto 从已选photo中删除
    removeSelectedPhoto (i) {
      this.tempImgList.splice(i, 1)
      if (this.tempImgList.length < 9) {
        this.isShowChooseImgBtn = true
      }
    },
    // uploadImg 上传图片
    uploadImg (imgList) {
      let uploadImgCount = 0
      let tempList = []
      let that = this
      console.log(uploadImgCount)
      for (let i = 0; i < imgList.length; i++) {
        let retry = false
        for (let j = 0; j < 3; j++) {
          wx.uploadFile({
            url: config.uploadFile,
            filePath: imgList[i],
            name: 'f_upload',
            formData: {
              'imgIndex': i
            },
            header: {
              'Content-Type': 'multipart/form-data'
            },
            success: function (res) {
              retry = false
              // TEMP: 待跟后端约定 status字段名和字，确保上传成功状态
              let data = JSON.parse(res.data)
              // tempList.push(res.data.data.name)
              if (data.status === 0) {
                uploadImgCount++
                // let data = JSON.parse(res.data)
                console.log('上传成功===', data)
                tempList.push(data.data.name)
                if (uploadImgCount === imgList.length) {
                  that.uploadImgList = tempList
                  that.uploadPoster()
                }
              }
            },
            fail: function (res) {
              retry = true
              console.log(i)
            }
          })
          if (retry === false) {
            break
          }
        }
      }
      this.uploadImgList = tempList
      console.log('上传图片后imgList===', this.uploadImgList)
      // console.log()
      // if (uploadImgCount === imgList.length) {
      //   this.uploadPoster()
      // }
    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    console.log('poste接到的urlParams==', urlParams)
    this.urlParams = urlParams
    console.log('poste==', urlParams)
  },
  onShow () {
    this.init()
  }
}
</script>
<style lang="scss">
.wrapper {

  // begin pet
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
    .poste-date {
      color: #000;
      font-size: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      padding: 60rpx 0 60rpx 0;
      text-align: center;
    }
  }
  // end pet
  // begin poste-text
  .poste-text {
    background: #f9fafc;
    border: 1px solid #f3f4f6;
    height: 260rpx;
    margin: 0 40rpx;
    padding: 18rpx;
    textarea {
      color: #000;
      font-size: 30rpx;
      height: 100%;
      line-height: 36rpx;
      width: 100%;
    }
    .placeholder-style {
      color: #A1ABBC;
      font-size: 30rpx;
      line-height: 36rpx;
    }
  }
  // end poste-text
  // begin poste-img
  .poste-img {
    display: flex;
    margin: 40rpx 40rpx 0 40rpx;
    overflow: hidden;
    .choose-img {
      display: inline-block;
      height: 152rpx;
      padding-right: 20rpx;
      width: 152rpx;
      img {
        display: block;
        height: 152rpx;
        width: 152rpx;
      }
    }
    .scroll-view-h {
      flex: 1;
      white-space: nowrap;
      width: 100%;
      .item {
        display: inline-block;
        height: 152rpx;
        margin-right: 20rpx;
        position: relative;
        width: 152rpx;
        .selected-photo {
          height: 152rpx;
          margin: 0 20rpx 20rpx 0;
          width: 152rpx;
        }
        .delete-btn {
          height: 32rpx;
          position: absolute;
          right: 10rpx;
          top: 10rpx;
          width: 32rpx;
          z-index: 1;
        }
      }
    }
  }
  // end poste-img
  // begin poste-btn
  .poste-btn {
    background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
    border-radius: 100px;
    color: #703C0F;
    font-size: 36rpx;
    height: 100rpx;
    line-height: 100rpx;
    margin: 62rpx 40rpx 28rpx 40rpx;
    text-align: center;
  }
  // end poste-btn
  // step-back
  .step-back {
    color: #A1ABBC;
    font-size: 32rpx;
    height: 32rpx;
    line-height: 32rpx;
    padding-bottom: 40rpx;
    text-align: center;
  }
}
</style>
