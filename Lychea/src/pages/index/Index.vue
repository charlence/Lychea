<template>
  <div class="container"
    :style="'padding-top:' + customNavBar.totalHeight + 'px'"
  >
    <!-- begin CustomNavBarHome  -->
    <CustomNavBarHome
      :customNavBar="customNavBar"
      @fromNavBarHome="transferFun"
    >

    </CustomNavBarHome>
    <!-- end CustomNavBarHome -->
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
    <!-- begin adv-banner -->
    <div class="adv-banner">
      <img class="adv-img" mode="aspectFit" src="https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_690w_250h_1pr_1c_1e" alt="">
    </div>
    <!-- end  adv-banner -->
    <!-- begin Ranking -->
    <Ranking
      v-if = "isShowRanking"
      :rank = "rank"
      @fromRanking = "transferFun"
    >
    </Ranking>
    <!-- end Ranking -->
    <!-- begin Post -->
    <Post :posts = "posts"></Post>
    <!-- end Poster -->
  </div>
</template>

<script>
import config from '@/config'
import utils from '@/util'
import Request from '@/Request'
import CustomNavBarHome from '@/components/CustomNavBarHome'
import Post from '@/components/Post'
import Filter from '@/components/Filter'
import Ranking from '@/components/index/Ranking'

export default {
  data () {
    return {
      customNavBar: {},
      filter: {
        areaId: '',
        areaDesc: '全国区域',
        breedDesc: '全部物种',
        breedId: '',
        currentShowList: '',
        topicDesc: '全部类型',
        topicId: ''
      },
      getPostsParam: {
        from: '1',
        num: '10'
      },
      isShowFilter: false,
      isShowRanking: true,
      posts: [],
      rank: [
        {
          title: '今日小主明星榜',
          type: 'hot',
          list: [
            '../../static/img/icon/default_user_photo_w40_h40_2x.png',
            '../../static/img/icon/default_user_photo_w40_h40_2x.png',
            '../../static/img/icon/default_user_photo_w40_h40_2x.png'
          ]
        },
        {
          title: '终生宠爱见证榜',
          type: 'hot',
          list: [
            '../../static/img/icon/default_user_photo_w40_h40_2x.png',
            '../../static/img/icon/default_user_photo_w40_h40_2x.png',
            '../../static/img/icon/default_user_photo_w40_h40_2x.png'
          ]
        }
      ]
    }
  },
  components: {
    CustomNavBarHome,
    Filter,
    Post,
    Ranking
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
    init () {
      console.log('首页init')
      // 动态获取 CustomBarHome的各项高度
      this.customNavBar = utils.setCustomNavBar()
      // // 获取用户信息
      // utils.wxLogin()
      this.getPosts(this.getPostsParam)
    },
    async getPosts (getPostsParam) {
      try {
        const tempData = await Request.getHttp(config.getInfoListUrl, getPostsParam)
        this.processPost(tempData)
      } catch (e) {
        console.log('reject执行函数')
      }
    },
    async onPullDownRefresh () {
      try {
        console.log('==onPullDownRefresh==')
        this.getPostsParam.from = `${this.posts.length + 1}`
        const tempData = await Request.getHttp(config.getInfoListUrl, this.getPostsParam)
        this.processPost(tempData)
      } catch (e) {
        console.log('reject执行函数')
      }
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    },
    // processPost 处理post数据
    processPost (_data) {
      console.log('posts==_data===', _data)
      let tempList = []
      for (let idx in _data) {
        let tempObj = {
          dateline: _data[idx].dateline,
          likeNum: _data[idx].like_num,
          commentNum: _data[idx].comment_num,
          textContent: _data[idx].content,
          petOwner: {
            avatar: _data[idx].user_avatar,
            nickname: _data[idx].user_nickname
          },
          pet: {
            avatar: _data[idx].pet_avatar,
            breed: _data[idx].pet_breed_name,
            gender: _data[idx].pet_gender,
            nickname: _data[idx].pet_nickname
          },
          topic: {
            title: _data[idx].topic.name,
            info: _data[idx].topic.content
          },
          type: 'list',
          album: {
            urls: _data[idx].pictures
          }
        }
        tempList.push(tempObj)
      }
      this.posts = this.posts.concat(tempList)
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    resetFilter () {
      this.filter.currentShowList = ''
      this.isShowFilter = false
    },
    // handleFilter 处理筛选的各种状态
    handleFilter (obj) {
      console.log('handleFilter接到的参数====', obj)
      if (obj.filterType) {
        if (obj.isShowFilter) {
          console.log('外层-topic')
          this.isShowFilter = true
          if (obj.filterType === 'topic') {
            this.filter.topicId = obj.filterVal
          } else {
            this.filter.breedId = obj.filterVal
          }
          this.filter.currentShowList = obj.currentShowList
        } else {
          console.log('外层-topic')
          this.isShowFilter = false
          this.filter.currentShowList = ''
        }
      }
      if (obj.filterId) {
        this.isShowFilter = false
        let getPostsParam = {
          topic: this.filter.topicId,
          area: this.filter.areaId,
          pettype: this.filter.breedId
        }
        if (obj.filterType === 'topic') {
          console.log('点击子项外部接收========', obj)
          this.filter.currentShowList = '2'
          this.filter.topicId = obj.filterId
          this.filter.topicDesc = obj.filterTypeDesc
        } else {
          this.filter.currentShowList = '1'
          this.filter.breedId = obj.filterId
          this.filter.breedDesc = obj.filterTypeDesc
        }
        this.filter.currentShowList = ''
        this.getPosts(getPostsParam)
      }
    },
    // transferFun 接收子组件的传值
    transferFun (param) {
      switch (param) {
        case 'removeRanking':
          this.isShowRanking = false
          break
        case 'goToRankingDetail':
          wx.navigateTo({
            url: '/pages/ranking/main'
          })
          break
        // 前往搜索页 - 点击navBar的放大镜
        case 'search':
          wx.navigateTo({
            url: '/pages/search/main?' + `${utils.encodeSearchParams(this.filter)}`
          })
          break
        // 筛选 - 物种
        case 'breed':
          this.filter.currentShowList = '1'
          this.isShowFilter = true
          break
        // 筛选 - 话题类型
        case 'topic':
          this.filter.currentShowList = '2'
          this.isShowFilter = true
          break
        default:
      }
    }
  },
  onLoad () {

  },
  onShow () {
    this.init()
  },
  onReachBottom () {
    this.onPullDownRefresh()
  }
}
</script>

<style lang="scss">

.container {
  background: #f8f8f8;
  // padding-top: 88rpx;
  // filter
  .filter {
    position: fixed;
    width: 100%;
    z-index: 1000;
  }
  .filter.extend {
    background:hsla(0,0%,0%,0.5);
    height: 100%;
    left: 0;
    // margin-top: 88rpx;
    position: fixed;
    width: 100%;
    z-index: 999;
  }
  // begin home-fixed
  .home-fixed {
    background: #ffd220;
    left: 0;
    // padding-top: 42rpx;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    .page-top {
      height: 76rpx;
      width: 100%;
      .home-page-title {
        color: #000;
        font-size: 18px;
        height: 76rpx;
        line-height: 76rpx;
        left: 0;
        position: absolute;
        text-align: center;
        width: 100%;
        z-index: -1;
      }
      .search-entrance {
        display: inline-block;
        height: 76rpx;
        margin-left: 20rpx;
        width: 80rpx;
        img {
          display: block;
          height: 60rpx;
          margin-top: 8rpx;
          width: 60rpx;
        }
      }
    }
  }
  // end home-fixed
  // 首屏广告区
  .adv-banner {
    background: #fff;
    margin-top: 88rpx;
    padding: 30rpx;
    .adv-img {
      border-radius: 5px;
      display: block;
      margin: 0 auto;
      height: 250rpx;
      width: 690rpx;
    }
  }
  // end 首屏广告区

}

</style>
