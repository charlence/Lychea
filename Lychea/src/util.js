// 工具函数库
import config from './config'

// 常用默认值
const DEFAULT = {
  shareCard: {
    title: '合力开启PIRT百万宝箱',
    path: 'pages/home/main',
    cover: 'https://img.mxtrip.cn/1f6653d2ddd3311e78659a5d865ea29c@100Q_800w_500h_1pr_1c_1e'
  }
}

// 封装吐司弹层
let showToastSuccess = (text) => {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

// 封装模态弹窗
let showModal = (title, content) => {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

// 封装 wx.redirectTo
let redirectToPage = (url, obj = {}) => {
  wx.redirectTo({
    url: url + `${encodeSearchParams(obj)}`
  })
}

// 封装分享卡片
let shareCard = (title = DEFAULT.shareCard.title, path = DEFAULT.shareCard.path, cover = DEFAULT.shareCard.cover) => {
  return {
    title,
    path,
    imageUrl: cover
  }
}

/**
 * getOffsetTop：主要用于动态设置页面顶部补白，为了对应自定义标题栏
 // TEMP: 需要修正
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
const getOffsetTop = () => {
  if (!wx.getStorageSync('DEVICEINFO')) {
    this.getDeviceInfo()
  } else {
    return `padding-top: ${wx.getStoragesync('DEVICEINFO').titleTotalHeight}px`
  }
}

// 尝试wx.login
const wxLogin = () => {
  // 调用登录接口
  wx.login({
    success: (res) => {
      if (res.code) {
        // 发起网络请求
        wx.request({
          url: config.loginUrl,
          data: {
            code: res.code
          },
          success (res) {
            // TEMP: 如果后台可获取到 unionid, 跳转到指定页面或首页, sessionKey token
            console.log('wxLogin==', res)
            if (res.data.status === 0) {
              let _data = res.data.data
              let lycheaUserInfo = {
                token: _data.token,
                uid: _data.uid
              }
              wx.setStorageSync('LYCHEAUSER', lycheaUserInfo)
              wx.setStorageSync('CURRENTTOKEN', _data.access_info)
              // authorize_flag = 1为已授权用户， 0 为未授权用户
              // if (_data.authorize_flag === '0') {
              //   wx.navigateTo({
              //     url: '/pages/login/main'
              //   })
              // }
            } else {
              console.log(res)
            }
          },
          fail () {

          }
        })
      } else {
        console.log('login失败：' + res.errMsg)
      }
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo
        }
      })
    }
  })
}
// 用于customNavivationBar的一些数据
const getDeviceInfo = () => {
  let deviceInfo = {}
  try {
    var res = wx.getSystemInfoSync()
    let totalTopHeight = 68
    if (res.model.indexOf('iPhone X') !== -1) {
      totalTopHeight = 88
    } else if (res.model.indexOf('iPhone') !== -1) {
      totalTopHeight = 64
    }
    deviceInfo.brand = res.brand
    deviceInfo.model = res.model
    deviceInfo.screenWidth = res.screenWidth
    deviceInfo.screenHeight = res.screenHeight
    deviceInfo.windowWidth = res.windowWidth
    deviceInfo.windowHeight = res.windowHeight
    deviceInfo.statusBarHeight = res.statusBarHeight
    deviceInfo.SDKVersion = res.SDKVersion
    deviceInfo.platform = res.platform
    deviceInfo.version = res.version
    deviceInfo.titleTotalHeight = totalTopHeight
    deviceInfo.titleBarHeight = totalTopHeight - res.statusBarHeight
  } catch (e) {
    // Do something when catch error
    deviceInfo.statusBarHeight = 0
    deviceInfo.titleBarHeight = 0
  }
  wx.setStorageSync('DEVICEINFO', deviceInfo)
}
/*
  setCustomNavBar: 根据设备动态设置自定义页面titleBar的高度
*/
const setCustomNavBar = (retryMaxTime = 3) => {
  let currentIndex = 0
  let retry = true
  let customNavBar = {}
  while (retry) {
    try {
      let localDeviceInfo = wx.getStorageSync('DEVICEINFO')
      if (localDeviceInfo === '') {
        this.getDeviceInfo()
      } else {
        customNavBar.statusBarHeight = localDeviceInfo.statusBarHeight
        customNavBar.titleBarHeight = localDeviceInfo.titleBarHeight
        customNavBar.totalHeight = customNavBar.statusBarHeight + customNavBar.titleBarHeight
        retry = false
        break
      }
    } catch (e) {
      this.getDeviceInfo()
    }
    currentIndex += 1
    if (currentIndex > retryMaxTime) {
      break
    }
  }
  return customNavBar
}

/**
 * 对象拼接为请求字符串：主要用于发起分享构建URL的场景
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 */
const encodeSearchParams = (obj) => {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    // params.push([key, encodeURIComponent(value)].join('='))
    params.push([key, value].join('='))
  })
  return params.join('&')
}

/**
 * 将 url 查询参数解析为对象: 主要用于初始化页面时需要根据不同的参数做不同的渲染
 * @param {any} param 应为 window.location对象或者url字符串，否则报错。
 */
const queryToDict = (param) => {
  let pattern = /([^?&=]+)=([^&#]*)/g
  let dict = {}
  let search = null
  if (typeof param === 'object') {
    search = param
  } else if (typeof param === 'string') {
    search = param
  } else {
    throw new Error('参数类型非法！请传入url字符串。')
  }
  search.replace(pattern, function (rs, $1, $2) {
    var key = decodeURIComponent($1)
    var value = decodeURIComponent($2)
    dict[key] = value
    return rs
  })
  return dict
}

const utils = {
  encodeSearchParams,
  getDeviceInfo,
  getOffsetTop,
  queryToDict,
  redirectToPage,
  setCustomNavBar,
  shareCard,
  showToastSuccess,
  showModal,
  wxLogin
}

export default utils
