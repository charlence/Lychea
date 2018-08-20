<template>
<div class="wrapper pet-dossier"
  :style="'padding-top:' + customNavBar.totalHeight + 'px'"
>
  <!-- begin CustomNavBarOther -->
  <CustomNavBarOther
    :customNavBar="customNavBar"
  >
  </CustomNavBarOther>
  <!-- end CustomNavBarOther -->
  <!-- begin pet-card -->
  <PetCard
    :pets = "pet.baseinfo"
  >
  </PetCard>
  <!-- end pet-card -->
  <!-- begin amuse-activity -->
  <div class="amuse-activity">
    <div class="amuse-text">
      <div class="amuse-title">
        亲昵度
      </div>
      <div class="amuse-intimacy">
      </div>
    </div>
    <img class="amuse-btn"
      src="../../../static/img/icon/amuse_w164_h96_1x.png" alt="">
  </div>
  <!-- end amuse-activity -->
  <!-- begin family-tree -->
  <div class="family-tree">
    <div class="family-tree__hd">
      <div class="title">
        家族谱
      </div>
      <div class="family-member-switch">
        <div class="family-member-switch__item"
          :class = "pet.family.currentMember === '1' ? 'active' : ''"
          @click = "pickClass('1')"
        >
          父母
        </div>
        <div class="family-member-switch__item"
          :class = "pet.family.currentMember === '2' ? 'active' : ''"
          @click = "pickClass('2')"
        >
          配偶
        </div>
        <div class="family-member-switch__item"
          :class = "pet.family.currentMember === '3' ? 'active' : ''"
          @click = "pickClass('3')"
        >
          子女
        </div>
      </div>
    </div>
    <div class="family-tree__bd">
      <!-- begin family-member-list -->
      <div class="family-member-list">
        <SimplifyPetCard
          :simplifyPetCard = "pet.family.members"
        >
        </SimplifyPetCard>
      </div>
      <!-- end family-member-list -->
      <!-- begin add-member-btn -->
      <div class="add-member-btn">
        编辑小主家族成员
      </div>
      <!-- end add-member-btn -->
    </div>
  </div>
  <!-- end family-tree -->
  <!-- begin care-for-guarantee -->
  <div class="care-for-guarantee">
    <div class="care-for-guarantee__hd">
      <div class="title">
        终生宠爱承诺
      </div>
    </div>
    <div class="care-for-guarantee__bd">
      <!-- begin declaration -->
      <div class="declaration">
        <div class="pet-owner">
          <img class="avatar"
            :src="pet.guarantee.petOwnerAvatar"
          >
          <div class="nickname">
            {{pet.guarantee.petOwnerNickname}}
          </div>
          <div class="flag">
            铲屎官
          </div>
        </div>
        <!-- begin declaration-content -->
        <div class="declaration-content">
          <p>{{pet.guarantee.content}}</p>
          <!-- begin witness -->
          <div class="witness">
            <div class="witness__hd">
              <span></span>
              <div class="title">
                见证人
              </div>
            </div>
            <div class="witness__bd">
              <div class="witness-list">
                <img class="witness-avatar"
                  v-for="(avatar, avatarIndex) in pet.guarantee.witnessList"
                  :key="avatarIndex"
                  :src="avatar"
                >
              </div>
            </div>
          </div>
          <!-- end witness-list  -->
        </div>
        <!-- end declaration-content -->
        <!-- begin advocacy-guarantee -->
        <div class="advocacy-guarantee">
          <p>来吱宠倡导对宠物终身负责。如果您也赞同这一点，请宣誓，让更多的朋友为您的真爱证！</p>
          <!-- begin oath-btn -->
          <div class="oath-btn"
            @click="goToOath"
          >
            宣誓
          </div>
          <!-- end oath-btn -->
        </div>
        <!-- end advocacy-guarantee -->

      </div>
      <!-- end declaration -->
    </div>
  </div>
  <!-- end care-for-guarantee -->
  <!-- begin pet-memoir -->
  <div class="pet-memoir">
    <!-- begin pet-memoir__hd -->
    <div class="pet-memoir__hd">
      小主日志
    </div>
    <!-- end pet-memoir__hd -->
    <div class="pet-memoir__bd">
      <!-- begin issue -->
      <div class="issue"
        v-for="(item, itemIndex) in pet.posts"
        :key="itemIndex"
      >
        <div class="issue-year">
          {{item.issueYear}}
        </div>
        <div class="post"
          v-for="(post, postIndex) in item.list"
          :key="postIndex"
        >
          <div class="dateline">
            <span class="issue-day">{{post.issueDay}}</span>
            <span class="issue-month">{{post.issueMonth}}月</span>
          </div>
          <div class="post-content">
            <img class="cover"
              v-if="post.cover !== ''"
              :src="post.cover"
            >
            <div class="post-text">
              <!-- begin post-topic -->
              <div class="post-topic">
                #{{post.topicTitle}}#
              </div>
              <!-- end post-topic -->
              <!-- begin post-text -->
              <div class="post-text">
                {{post.content}}
              </div>
              <!-- end post-text -->
            </div>
          </div>
        </div>
      </div>
      <!-- end issue -->
    </div>
  </div>
  <!-- end pet-memoir -->
</div>
</template>
<script>
import utils from '@/util'
import config from '@/config'
import Request from '@/Request'
import CustomNavBarOther from '@/components/CustomNavBarOther'
import PetCard from '@/components/PetCard'
import SimplifyPetCard from '@/components/SimplifyPetCard'
export default {
  data () {
    return {
      customNavBar: {
        title: '夏天的档案',
        icon: '../../../static/img/icon/arrow_left_w30_h30_2x.png',
        backgroundYellow: true
      },
      pet: {
        baseinfo: [
          {
            ageDesc: '2岁1个月.水瓶座.陪伴728天',
            area: '北京市朝阳区',
            avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            breedName: '泰迪',
            brief: '脾气暴躁，爱吃爱睡',
            cardNumber: '34270119921008373D',
            charisma: '100',
            gender: '2',
            nickname: '夏天',
            petId: 'kwgu',
            sterilizeStatus: '1',
            sterilizeDesc: '已绝育'
          }
        ],
        family: {
          currentMember: '1',
          members: [
            {
              ageDesc: '2岁1个月',
              avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
              breedName: '泰迪',
              gender: '1',
              nickname: '夏天',
              petId: 'kwgu',
              relative: 'father',
              sterilizeStatus: '0',
              sterilizeDesc: '未绝育'
            },
            {
              ageDesc: '3岁1个月',
              avatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
              breedName: '泰迪',
              gender: '2',
              nickname: '朵小朵',
              petId: 'kwgu',
              relative: 'mother',
              sterilizeStatus: '1',
              sterilizeDesc: '已绝育'
            }
          ]
        },
        posts: [
          {
            issueYear: '2017',
            list: [
              {
                content: '最近两周实在是太忙了，导致完全没有是时间带夏周一出去遛遛！结果，夏周一抑郁了，抑郁了呀，我家泰迪！！！',
                cover: '',
                issueMonth: '8',
                issueDay: '20',
                topicTitle: '医疗健康咨询'
              },
              {
                content: '真是一只属狗的好猫~不但陪我看《好好学习》，还每天饭后一起出去遛弯儿，趁我不注意还去勾搭玩具狗，到了下雨天又那么淑女忧郁......',
                cover: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
                issueMonth: '9',
                issueDay: '14',
                topicTitle: '撸猫'
              },
              {
                content: '"婚配交友"业务指猫狗发情，仅仅需要找个对象打个炮，目标不是配种。但由于可能会产生后代，因此对后代处置也是部分需求',
                cover: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
                issueMonth: '8',
                issueDay: '20',
                topicTitle: '婚配交友'
              }
            ]
          },
          {
            issueYear: '2016',
            list: [
              {
                content: '最近两周实在是太忙了，导致完全没有是时间带夏周一出去遛遛！结果，夏周一抑郁了，抑郁了呀，我家泰迪！！！',
                cover: '',
                issueMonth: '8',
                issueDay: '20',
                topicTitle: '医疗健康咨询'
              },
              {
                content: '真是一只属狗的好猫~不但陪我看《好好学习》，还每天饭后一起出去遛弯儿，趁我不注意还去勾搭玩具狗，到了下雨天又那么淑女忧郁......',
                cover: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
                issueMonth: '8',
                issueDay: '20',
                topicTitle: '撸猫'
              },
              {
                content: '"婚配交友"业务指猫狗发情，仅仅需要找个对象打个炮，目标不是配种。但由于可能会产生后代，因此对后代处置也是部分需求',
                cover: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
                issueMonth: '8',
                issueDay: '20',
                topicTitle: '婚配交友'
              }
            ]
          }
        ],
        guarantee: {
          petOwnerAvatar: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
          petOwnerNickname: 'Charlence',
          content: '本铲屎官 Charlence 视小主身份证号为33032420160824123C 的 “朵朵” 小主为家庭成员，我宣誓对它终身负责。如果中途因故不能抚养，也一定给它找好新家。请我的朋友们为我的誓言见证！',
          witnessList: [
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_640w_640h_1pr_1c_1e',
            '../../../static/img/icon/witness_more_w72_h72_1x.png'
          ]
        }
      }
    }
  },
  components: {
    CustomNavBarOther,
    PetCard,
    SimplifyPetCard
  },
  methods: {
    // init 初始化页面
    init () {

    },
    // 适配不同机型，设置自定义导航高度
    setCustomNavBar () {
      let tempObj = utils.setCustomNavBar()
      this.customNavBar = Object.assign(tempObj, this.customNavBar)
    },
    // getPetDossier 获取小主信息
    async getPetDossier () {
      try {
        const tempData = await Request.getHttp(config.getPetDossier, {petId: this.urlParams.petId})
        console.log(tempData)
        this.formatPet(tempData)
      } catch (e) {
        console.log('reject出来的数据', e)
      }
    },
    goToOath () {
      wx.navigateTo({
        url: '/pages/oath/main'
      })
    },
    // 格式化小主数据
    formatPet () {

    }
  },
  mounted () {
    this.setCustomNavBar()
  },
  onLoad () {
    let urlParams = this.$root.$mp.query
    console.log('接到的URL的参数===', urlParams)
    this.urlParams = urlParams
  },
  onShow () {

  }
}
</script>
<style lang="scss">
.wrapper {
  background: #FFD220;
  // begin pet-card
  .pet-card {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 6px 10px 0 #FFC800;
    margin: 20rpx 30rpx 0 30rpx;
    padding: 40rpx 40rpx 10rpx 40rpx;
    position: relative;
    width: auto;
    .avatar {
      border-radius: 50%;
      display: block;
      height: 168rpx;
      position: absolute;
      right: 40rpx;
      top: 40rpx;
      width: 168rpx;
      z-index: 1;
    }
    // begin pet-info
    .pet-info {
      .nickname {
        color: #000;
        font-size: 36rpx;
        height: 40rpx;
        line-height: 40rpx;
        margin-bottom: 30rpx;
      }
      .creature-attribute {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: 26rpx;
        .sterilize {
          background: #C9CFDD;
          border-radius: 100px;
          color: #fff;
          font-size: 26rpx;
          height: 48rpx;
          line-height: 48rpx;
          margin-right: 20rpx;
          padding: 0 16rpx;
        }
        .sterilize.active {
          background: #FFD220;
        }
        .breed {
          border-radius: 100px;
          color: #fff;
          font-size: 26rpx;
          height: 48rpx;
          line-height: 48rpx;
          padding: 0 12rpx;
          .breed__text {
            color: #fff;
            float: left;
            height: 48rpx;
            line-height: 48rpx;
          }
          .gender {
            float: left;
            height: 20rpx;
            margin: 16rpx 0 14rpx 6rpx;
            width: 18rpx;
          }
        }
      }
    }
    // end pet-info
    // begin male 与pet-info 同用，用来设置性别颜色和图片
    .male {
      .breed {
        background: #52B0FF;
        .gender {
          background: url('../../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
          background-size: 18rpx 20rpx;
        }
      }
    }
    // end male
    // begin female
    .female {
      .breed {
        background: #ff6f8a;
        .gender {
          background: url('../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
          background-size: 18rpx 20rpx;
        }
      }
    }
    // end female
    dl {
      display: flex;
      flex-direction: row;
      margin-bottom: 20rpx;
      width: 100%;
      dt {
        display: inline-block;
        height: 40rpx;
        margin-right: 10rpx;
        width: 40rpx;
        img {
          display: block;
          height: 40rpx;
          width: 40rpx;
        }
      }
      dd {
        color: #565E6A;
        flex: 1;
        font-size: 28rpx;
        line-height: 40rpx;
      }
    }
  }
  // end pet-card
  // amuse-activity
  .amuse-activity {
    display: flex;
    padding: 60rpx 30rpx;
    .amuse-text {
      flex: 1;
      .amuse-title {
        background: url('../../../static/img/icon/intimacy_w40_h40_1x.png') no-repeat 0 0;
        background-size: 40rpx 40rpx;
        color: #703C0F;
        font-size: 32rpx;
        height: 40rpx;
        line-height: 40rpx;
        text-indent: 52rpx;
      }
      .amuse-intimacy {
        background: #F3F4F6;
        border-radius: 100px;
        height: 32rpx;
        margin-top: 18rpx;
        width: 100%;
      }
    }
    .amuse-btn {
      display: inline-block;
      height: 96rpx;
      margin-left: 30rpx;
      width: 164rpx;
    }
  }
  // end amuse-activity
  // begin family-tree
  .family-tree {
    background: #fff;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    padding: 60rpx 30rpx 0 30rpx;
    .family-tree__hd {
      color: #565E6A;
      height: 72rpx;
      font-size: 32rpx;
      padding-bottom: 40rpx;
      .title {
        float: left;
        height: 72rpx;
        line-height: 72rpx;
        width: 188rpx;
      }
      .family-member-switch {
        background: #f9fafc;
        border-radius: 100px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        float: left;
        height: 72rpx;
        width: 420rpx;
        .family-member-switch__item {
          color: #78818f;
          font-size: 30rpx;
          height: 72rpx;
          line-height: 72rpx;
          text-align: center;
          width: 140rpx;
        }
        .family-member-switch__item.active {
          background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
          border-radius: 100px;
          color: #703C0F;
        }
      }
    }
    .family-tree__bd {
      text-align: center;
      .family-member-list {
        .family-member {
          background: #FFFFFF;
          box-shadow: 0 2px 8px 1px #F3F4F6;
          border-radius: 4px;
          display: flex;
          margin-bottom: 40rpx;
          padding: 28rpx;
          .avatar {
            border-radius: 50%;
            display: inline-block;
            height: 88rpx;
            margin-right: 18rpx;
            width: 88rpx;
          }
          .pet-info {
            flex: 1;
            position: relative;
            .nickname {
              color: #000;
              font-size: 30rpx;
              height: 36rpx;
              line-height: 36rpx;
              margin-bottom: 12rpx;
              text-align: left;
            }
            .creature-attribute {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              .sterilize {
                background: #C9CFDD;
                border-radius: 100px;
                color: #fff;
                font-size: 24rpx;
                height: 32rpx;
                line-height: 32rpx;
                margin-right: 22rpx;
                padding: 0 16rpx;
              }
              .sterilize.active {
                background: #FFD220;
              }
              .breed {
                border-radius: 100px;
                color: #000;
                font-size: 24rpx;
                height: 32rpx;
                line-height: 32rpx;
                padding: 0 16rpx;
                .breed__text {
                  color: #fff;
                  float: left;
                  height: 32rpx;
                  line-height: 32rpx;
                }
                .gender {
                  float: left;
                  height: 20rpx;
                  margin: 8rpx 0 10rpx 6rpx;
                  width: 18rpx;
                }
              }
            }
            .age {
              color: #565E6A;
              font-size: 26rpx;
              line-height: 28rpx;
              position: absolute;
              right: 0;
              top: 0;
              z-index: 1;
            }
          }
          // end pet-info
          // begin male 与pet-info 同用，用来设置性别颜色和图片
          .male {
            .breed {
              background: #52B0FF;
              .gender {
                background: url('../../../static/img/icon/gender_icon_male_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
          }
          // end male
          // begin female
          .female {
            .breed {
              background: #ff6f8a;
              .gender {
                background: url('../../../static/img/icon/gender_icon_female_white_w9_h10_2x.png') no-repeat 0 0;
                background-size: 18rpx 20rpx;
              }
            }
          }
          // end female
        }
      }
      .add-member-btn {
        background-image: linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
        border-radius: 100px;
        color: #703C0F;
        display: inline-block;
        font-size: 32rpx;
        height: 88rpx;
        line-height: 88rpx;
        margin: 20rpx auto 40rpx auto;
        text-align: center;
        padding: 0 40rpx;
      }
    }
  }
  // end family-tree
  // begin care-for-guarantee
  .care-for-guarantee {
    background: #fff;
    padding: 30rpx;
    .care-for-guarantee__hd {
      height: 80rpx;
      line-height: 80rpx;
      .title {
        color: #565E6A;
        font-size: 32rpx;
      }
    }
    .care-for-guarantee__bd {
      padding-top: 20rpx;
      .declaration {
        background: #F9FAFC;
        border: 1px solid #F3F4F6;
        border-radius: 6px;
        position: relative;
        // begin pet-owner
        .pet-owner {
          left: 0;
          position: absolute;
          text-align: center;
          top: -66rpx;

          width: 100%;
          z-index: 1;
          .avatar {
            border: 6rpx solid #fff;
            border-radius: 50%;
            display: block;
            height: 120rpx;
            margin: 0 auto 20rpx auto;
            width: 120rpx;
          }
          .nickname {
            color: #000;
            display: block;
            font-size: 36rpx;
            height: 36rpx;
            line-height: 36rpx;
            margin-bottom: 20rpx;
            width: 100%;
          }
          .flag {
            color: #565E6A;
            display: block;
            font-size: 26rpx;
            height: 26rpx;
            line-height: 26rpx;
            padding-bottom: 40rpx;
            width: 100%;
          }
        }
        // end pet-owner
        // begin advocacy-guarantee
        .advocacy-guarantee {
          margin: 188rpx 30rpx 30rpx 30rpx;
          text-align: center;
          p {
            margin-bottom: 40rpx;
            color: #565E6A;
            font-size: 28rpx;
            line-height: 40rpx;
          }
          .oath-btn {
            background-image:linear-gradient(-180deg, #FFEB43 0%, #FFD220 100%);
            border-radius:200rpx;
            color:#703C0F;
            display:inline-block;
            font-size:32rpx;
            height:88rpx;
            line-height:88rpx;
            margin: 20rpx auto 40rpx auto;
            text-align:center;
            width: 320rpx;
          }
        }
        // end advocacy-guarantee
        // begin declaration-content
        .declaration-content {
          margin: 188rpx 30rpx 30rpx 30rpx;
          p {
            margin-bottom: 40rpx;
            color: #565E6A;
            font-size: 28rpx;
            line-height: 40rpx;
          }
          // begin witness
          .witness {
            .witness__hd {
              height: 26rpx;
              margin: 0 30rpx;
              padding-top: 16rpx;
              position: relative;
              text-align: center;
              span {
                background: #F3F4F6;
                border-radius: 100px;
                display: block;
                height: 2rpx;
                width: 100%;
              }
              .title {
                background: #f9fafc;
                color: #565E6A;
                font-size: 28rpx;
                height: 36rpx;
                left: 50%;
                line-height: 36rpx;
                position: absolute;
                padding: 0 20rpx;
                top: 0;
                transform: translateX(-50%);
                z-index: 1;
              }
            }
            .witness__bd {
              .witness-list {
                display: flex;
                flex-direction: row;
                // justify-content: flex-start;
                height: 68rpx;
                margin: 28rpx 30rpx;
                overflow: hidden;
                position: relative;
                .witness-avatar {
                  border: 6rpx solid #fff;
                  border-radius: 50%;
                  display: inline-block;
                  // float: left;
                  height: 56rpx;
                  margin-right: 12rpx;
                  width: 56rpx;
                }
                .witness-avatar:last-child {
                  border: 0;
                  height: 68rpx;
                  width: 68rpx;
                }
              }
            }
          }
          // end witness
        }
        // end declaration-content
      }

    }

  }
  // end care-for-guarantee
  // begin pet-memoir
  .pet-memoir {
    background: #fff;
    padding-top: 40rpx;
    .pet-memoir__hd {
      padding: 0 30rpx;
      color: #565E6A;
      font-size: 32rpx;
      height: 80rpx;
      line-height: 80rpx;
    }
    .pet-memoir__bd {
      padding: 30rpx;
      .issue {
        padding-top: 10rpx;
        .issue-year{
          color: #333;
          font-size: 40rpx;
          height: 40rpx;
          line-height: 40rpx;
          margin-bottom: 20rpx;
        }
        .post {
          padding: 30rpx 0 38rpx 0;
          .dateline {
            color: #333;
            height: 40rpx;
            padding-bottom: 20rpx;
            overflow: hidden;
            .issue-day {
              float: left;
              font-size: 40rpx;
              font-weight: bold;
              line-height: 40rpx;
              margin-right: 8rpx;
              width: 52rpx;
            }
            .issue-month {
              float: left;
              font-size: 28rpx;
              line-height: 28rpx;
              padding-top: 8rpx;
            }
          }
          .post-content {
            display: flex;
            flex-direction: row;
            .cover {
              display: inline-block;
              height: 160rpx;
              margin-right: 20rpx;
              width: 160rpx;
            }
            .post-text {
              flex: 1;
              .post-topic {
                color: #FF9F00;
                font-size: 28rpx;
                height: 32rpx;
                line-height: 32rpx;
                margin-bottom: 20rpx;
              }
              .post-text {
                color: #565E6A;
                font-size: 28rpx;
                max-height: 108rpx;
                line-height: 36rpx;
                overflow : hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
    }
  }
  // end pet-memoir
}
</style>
