<template>
<div class="comment-list">
  <!-- begin comment-item -->
  <div class="comment-item"
    v-for = "(comment, commentIndex) in commentList"
    :key = "commentIndex"
  >
    <img class="commentator-avatar"
      :src = "comment.avatar"
    >
    <div class="comment-text">
      <div class="comment-text__hd">
        <div class="commentator-nickname">{{comment.nickname}}</div>
      </div>
      <!-- begin comment-text__bd -->
      <div class="comment-text__bd">
        <div class="comment-content">
          <span class="reply-user-nickname"
            v-if="comment.replyUserNickname"
          >
            回复<span>@{{comment.replyUserNickname}}</span>
          </span>
          {{comment.content}}
        </div>
        <div class="dateline">
          {{comment.dateline}}
        </div>
        <!-- <div class="recieve-replying">
          <div class="reply-item">
            <span class="reply-user-nickname">{{comment.replyUserNickname}}</span>
            : 眼睛颜色都变了。哈啊哈哈！眼睛颜色都变了。哈啊哈哈！眼睛颜色都变了。哈啊哈哈！眼睛颜色都变了。哈啊哈哈！
          </div>
        </div> -->
      </div>
      <!-- end comment-text__bd -->
    </div>
  </div>
  <!-- end comment-item  -->
</div>
</template>
<script>
export default {
  props: ['commentList'],
  data () {
    return {
    }
  }
}
</script>
<style lang="scss">
.comment-list {
  background: #fff;
  .comment-item {
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    margin-left: 30rpx;
    padding: 26rpx 0 30rpx 0;
    .commentator-avatar {
      border-radius: 50%;
      display: inline-block;
      height: 88rpx;
      width: 88rpx;
    }
    .comment-text {
      flex: 1;
      padding: 0 30rpx 0 20rpx;
      .comment-text__hd {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .commentator-nickname {
          color: #0088ff;
          flex: 1;
          font-size: 32rpx;
          height: 32rpx;
          line-height: 32rpx;
          margin-bottom: 20rpx;
        }
      }
      // begin comment-content
      .comment-content {
        color: #565E6A;
        font-size: 28rpx;
        line-height: 36rpx;
        margin-bottom: 20rpx;
        .reply-user-nickname {
          font-size: 26rpx;
          line-height: 32rpx;
          span {
            color: #0088ff;
          }
        }
      }
      // end comment-content
      .dateline {
        color: #78818F;
        display: inline-block;
        font-size: 26rpx;
        height: 26rpx;
        line-height: 26rpx;
      }



    }
  }
}
</style>
