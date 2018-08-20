<template>
  <div class="post-list">
    <!-- begin post -->
    <div class="post"
      v-for="(post, postIndex) in posts"
      :key="postIndex"
      @click="goToPostDetail"
    >
      <!-- begin pet -->
      <div class="pet">
        <img class="pet-avatar"
          :src="post.pet.avatar"
        >
        <div class="pet-text">
          <div class="pet-text__content">
            <!-- begin pet-info -->
            <div class="pet-info"
              :class="post.pet.gender === '1' ? 'male' : 'female'"
            >
              <div class="nickname">
                {{post.pet.nickname}}
              </div>
              <div class="breed">
                <span class="breed__text">{{post.pet.breed}}</span>
                <span class="gender"></span>
              </div>
            </div>
            <!-- end pet-info -->
            <!-- begin pet-owner -->
            <div class="pet-owner">
              <img class="avatar"
                :src="post.petOwner.avatar"
              >
              <span class="nickname">{{post.petOwner.nickname}}</span>
              <span class="owner">铲屎官</span>
            </div>
            <!-- end pet__owner -->
          </div>
        </div>
        <div class="dateline">
          {{post.dateline}}
        </div>
      </div>
      <!-- end pet -->
      <!-- begin post-topic -->
      <div class="post-topic">
        #{{post.topic.title}}#
      </div>
      <!-- end post-topic -->
      <!-- begin post-text -->
      <div class="post-text">
        {{post.textContent}}
      </div>
      <!-- end post-text -->
      <!-- begin topic-info -->
      <div class="topic-info">
        <dl
          v-for="(item, itemIndex) in post.topic.info"
          :key="itemIndex"
        >
          <dt>{{item.option}}：</dt>
          <dd>{{item.content}}</dd>
        </dl>
      </div>
      <!-- end topic-info -->
      <!-- begin post-album  -->
      <div class="post-album"
        v-if="post.album.urls.length > 0"
      >
        <img class="photo" mode="aspectFill"
          v-for="(photo, photoIndex) in post.album.urls"
          :data-photo-index="photoIndex"
          :data-post-index="postIndex"
          :key="photoIndex"
          :src="photo"
          @click="previewImage"
        >
      </div>
      <!-- end post-album -->
      <!-- begin post-actions-->
      <div class="post-actions"
        v-if="post.type !== 'detail'"
      >
        <div class="share">
          <button class="btn" open-type="share" name="button"></button>
          <img src="../../static/img/icon/share_gray_w26_h26_2x.png" alt="">
        </div>
        <div class="like">
          <img src="../../static/img/icon/like_gray_w26_h26_2x.png" alt="">
          <span v-if="post.likeNum > 0">{{post.likeNum}}</span>
          <span v-if="post.likeNum === 0">点赞</span>
        </div>
        <div class="comment">
          <img src="../../static/img/icon/comment_gray_w26_h26_2x.png" alt="">
          <span v-if="post.commentNum > 0">{{post.commentNum}}</span>
          <span v-if="post.commentNum === 0">评论</span>
        </div>
      </div>
      <!-- end post-actions -->
    </div>
    <!-- end post -->
  </div>
</template>

<script>
export default {
  props: ['posts'],
  data () {
    return {
      posts: this.posts
    }
  },
  methods: {
    previewImage (e) {
      console.log('预览图片时参数===', e)
      let listIndex = e.currentTarget.dataset.postIndex
      let photoIndex = e.currentTarget.dataset.photoIndex
      wx.previewImage({
        current: this.posts[listIndex].album.urls[photoIndex],
        urls: this.posts[listIndex].album['urls']
      })
    },
    handleClick (item) {
      console.log(item)
      // if (this.type === 'user') {
      //   console.log('跳转前')
      //   wx.navigateTo({
      //     // url: '/pages/detail/main?id=' + comment.bookid
      //   })
      // }
    }
  }
}
</script>
<style lang="scss">
.post-list {
  // begin post
  .post {
    background: #fff;
    margin-bottom: 20rpx;
    padding: 30rpx 30rpx 0 30rpx;
    .pet {
      display: flex;
      height: 96rpx;
      margin-bottom: 40rpx;
      width: 100%;
      .pet-avatar {
        border-radius: 50%;
        display: inline-block;
        height: 96rpx;
        margin-right: 20rpx;
        width: 96rpx;
      }
      .dateline {
        color: #78818F;
        display: inline-block;
        font-size: 26rpx;
        height: 26rpx;
        line-height: 26rpx;
      }
      .pet-text {
        flex: 1;
        .pet-text__content {
          display: block;
          width: 100%;
          // begin pet-info
          .pet-info {
            display: flex;
            .nickname {
              font-size: 28rpx;
              height: 32rpx;
              line-height: 32rpx;
              margin-right: 12rpx;
            }
            .breed {
              border-radius: 100px;
              height: 32rpx;
              line-height: 32rpx;
              margin-bottom: 12rpx;
              padding: 0 12rpx;
              .breed__text {
                color: #fff;
                float: left;
                font-size: 24rpx;
                height: 32rpx;
                line-height: 32rpx;
              }
              .gender {
                float: left;
                height: 20rpx;
                margin: 7rpx 0 5rpx 6rpx;
                width: 18rpx;
              }
            }
          }
          // end pet-info
          // begin male 与pet-info 同用，用来设置性别颜色和图片
          .male {
            .nickname {
              color: #4a90e2;
            }
            .breed {
              background: #52B0FF;
              .gender {
                background: url('../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
          }
          // end male
          // begin female
          .female {
            .nickname {
              color: #ff617f;
            }
            .breed {
              background: #ff6f8a;
              .gender {
                background: url('../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
          }
          // end female
          // begin pet-owner
          .pet-owner {
            align-items: stretch;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            height: 48rpx;
            .avatar {
              border-radius: 50%;
              height: 48rpx;
              margin-right: 10rpx;
              width: 48rpx;
            }
            .nickname {
              color: #333;
              font-size: 26rpx;
              height: 48rpx;
              line-height: 48rpx;
              margin-right: 12rpx;
            }
            .owner {
              color: #78818f;
              font-size: 20rpx;
              height: 48rpx;
              line-height: 48rpx;
            }
          }
          // end pet-owner
        }
      }
    }
    // end pet
    // begin post-topic
    .post-topic {
      color: #ff9f00;
      font-size: 28rpx;
      height: 32rpx;
      line-height: 32rpx;
      margin-bottom: 20rpx;
    }
    // end post-topic
    // begin post-text
    .post-text {
      color: #565E6A;
      font-size: 28rpx;
      line-height: 36rpx;
      margin-bottom: 20rpx;
    }
    // end post-text
    // begin topic-info
    .topic-info {
      padding-bottom: 8rpx;
      dl {
        color: #788a8f;
        display: flex;
        font-size: 28rpx;
        line-height: 32rpx;
        margin-bottom: 12rpx;
        dt {
          display: inline-block;
          height: 32rpx;
          width: 140rpx;
        }
        dd {
          flex: 1;
          line-height: 32rpx;
        }
      }
    }
    // end topic-info
    // begin post-album
    .post-album {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: hidden;
      width: 100%;
      .photo {
        float: left;
        height: 220rpx;
        margin-bottom: 20rpx;
        width: 220rpx;
      }
    }
    // end post-album
    // begin post-actions
    .post-actions {
      color: #A1ABBC;
      display: flex;
      flex-direction: row-reverse;
      font-size: 26rpx;
      justify-content: flex-start;
      height: 80rpx;
      img {
        display: inline-block;
        height: 52rpx;
        margin: 14rpx 12rpx;
        width: 52rpx;
      }
      .share {
        margin-left: 50rpx;
        line-height: 80rpx;
        height: 80rpx;
        position: relative;
        width: 76rpx;
        .btn {
          background: none;
          height: 100%;
          left: 50%;
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          width: 100%;
          z-index: 1;
        }
        .btn::after {
          border: none;
        }
      }
      .like {
        display: inline-flex;
        margin-left: 50rpx;
        line-height: 80rpx;
        span {
          display: inline-block;
          line-height: 80rpx;
        }
      }
      .comment {
        display: inline-flex;
        margin-left: 50rpx;
        line-height: 80rpx;
        span {
          display: inline-block;
          line-height: 80rpx;
        }
      }
    }
    // end post-actions
  }
  // end post
}
</style>
