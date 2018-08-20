<script>
import utils from '@/util'
export default {
  // created () {
  //   // 调用API从本地缓存中获取数据
  //   const logs = wx.getStorageSync('logs') || []
  //   logs.unshift(Date.now())
  //   wx.setStorageSync('logs', logs)
  //
  //   console.log('app created and cache logs by setStorageSync')
  // }
  methods: {
    getDeviceInfo () {
      utils.getDeviceInfo()
    }
  },
  created () {
    console.log('mpvue小程序启动')
    utils.wxLogin()
  },
  onShow () {
    this.getDeviceInfo()
  }
}
</script>

<style>
.container {
  height: 100%;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
