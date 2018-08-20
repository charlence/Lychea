// 工具函数库
import config from './config'
import utils from '@/util'
import md5 from 'js-md5'

// http get 请求
let getHttp = (url, data) => {
  return request(url, 'GET', data)
}

// http post 请求
let postHttp = (url, data) => {
  return request(url, 'POST', data)
}

// request http 请求
let request = async (url, method, data) => {
  let localUserInfo = wx.getStorageSync('LYCHEAUSER')
  console.log('request接收到的参数1')
  console.log(data)
  console.log('request接收到的url')
  console.log(url)
  console.log('request接收到的参数1end')
  if (localUserInfo === '') {
    utils.goToLogin(data)
  } else {
    let uid = localUserInfo.uid
    let token = localUserInfo.token
    let currentToken = await checkTokenValid('CURRENTTOKEN')
    if (!currentToken) {
      utils.showToastFail('网络错误')
      return
    }
    let sessionKey = currentToken.sessionKey
    let tokenKey = currentToken.tokenKey
    let newData = Object.assign({'session_key': sessionKey, 'uid': uid, 'token': token}, data)
    // newData 未经排序的 normal参数 + 当前请求的 sessionKey
    let dataString = formatObj(newData)
    // console.log('下一行是+sessionKey之后，且完成sort的 data')
    // console.log(dataString)
    // newData 已排序 + tokenKey
    let forSign = dataString + tokenKey
    let sign = encrypt(forSign)
    newData = Object.assign({'sign': sign}, newData)
    return fetchDataFromServer(url, method, newData, data)
  }
}

// 校验currentToken的有效性
let checkTokenValid = async (KEY, retryMaxTime = 3) => {
  let currentIndex = 0
  let retry = true
  let currentToken = ''
  while (retry) {
    try {
      currentToken = wx.getStorageSync(KEY)
      if (currentToken !== '') {
        let currentTime = Date.parse(new Date())
        let deadline = currentToken.deadline
        if ((currentTime + 5 * 1000) < deadline) {
          // 未过期有效
          retry = false
          break
        } else {
          console.log('过期需更新')
          await asyncGetToken()
        }
      } else {
        await asyncGetToken()
      }
    } catch (e) {
      await asyncGetToken()
    }
    currentIndex += 1
    if (currentIndex > retryMaxTime) {
      break
    }
  }
  console.log('检测token有效性')
  console.log(currentToken)
  return currentToken
}

// 拉取服务器数据
let fetchDataFromServer = async (url, method, freshToken, normalRequestParams) => {
  // freshToken = normal参数 + sessionKey + token
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method,
      data: freshToken,
      success: function (res) {
        // status 为 0，代表成功返回数据 (数据有可能为空)
        if (res.data.status === 0) {
          resolve(res.data.data)
        } else if (res.data.code === 11000) {
          // 执行重新登录操作或者触发用户重新授权
          utils.goToLogin(normalRequestParams)
        } else {
          console.log(res.data)
          resolve(res.data)
          // resolve(res.data)
          // reject(res.data)
        }
      },
      fail: function (res) {
        console.log(res)
      }
    })
  })
}

// asyncGetToken
let asyncGetToken = async () => {
  // asyncLogin是异步操作，需等待wx.login返回res.code, 用来获取unionid,openId等,
  let code = await asyncLogin()
  // GETACCESSTOKEN也是异步操作，拿code, 交换 token, 且return 出去用来fetchDataFromServer；
  let request = await asyncRequest(config.GETACCESSTOKEN, 'GET', code)
  return setTokenToStorage(request)
}

// setTokenToStorage
let setTokenToStorage = (obj) => {
  let sessionKey = obj.session_key
  let expired = obj.expired
  let tokenKey = obj.access_token
  let currentTime = Date.parse(new Date())
  let deadline = currentTime + (expired * 1000)
  let tempObj = {
    sessionKey: sessionKey,
    deadline: deadline,
    tokenKey: tokenKey
  }
  wx.setStorageSync('CURRENTTOKEN', tempObj)
}

// asyncLogin
let asyncLogin = async () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: function (res) {
        if (res.code) {
          resolve({code: res.code})
        } else {
          // 此处错误详情待了解
          reject(res)
        }
      }
    })
  })
}

// asyncRequest 也是异步操作，传进code, 交换 token；
let asyncRequest = async (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method,
      data,
      success: function (res) {
        // code or status
        if (res.data.status === 0) {
          console.log('交换token')
          console.log(res.data.data)
          resolve(res.data.data)
        } else {
          reject(res.data)
        }
      }
    })
  })
}

// 数组对象排序
let compare = (obj1, obj2) => {
  let val1 = obj1[0]
  let val2 = obj2[0]
  if (val1 < val2) {
    return -1
  } else if (val1 > val2) {
    return 1
  } else {
    return 0
  }
}

// 参数格式化
let formatObj = (obj) => {
  let arrForSort = Object.entries(obj)
  let arrsorted = arrForSort.sort(compare)
  let paramString = ''
  for (let i = 0; i < arrForSort.length; i++) {
    paramString = paramString + arrsorted[i][1]
  }
  return paramString
}

// encrypt token
let encrypt = (words) => {
  let tempString = md5(words)
  return tempString
}

const Request = {
  getHttp,
  postHttp
}

export default Request
