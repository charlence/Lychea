// 配置项

const host = 'https://api.xiaot.site:18443'

const config = {
  host,
  GETACCESSTOKEN: `${host}/index/user/getAccessToken`,
  CHECKACCESSTOKEN: `${host}/index/user/checkAccessToken`,
  // 添加小主
  addPetUrl: `${host}/index/pet/create`,
  // 评论帖子
  createCommentUrl: `${host}/index/comment/create`,
  // 地区查询
  getAreaUrl: `${host}/index/area/getArea`,
  // 获取贴子的评论列表
  getCommentListUrl: `${host}/index/comment/getList`,
  // 获取信息流,必带参数 topic, area, pettype, 全部类型下参数都不带
  getInfoListUrl: `${host}/index/info/getlist`,
  // 小主类型 tp=1 猫 ； tp=2 狗
  getPetClassUrl: `${host}/index/pet/getPetBreed`,
  // 获取小主档案-小主卡-小主信息
  getPetDossier: `${host}/index/pet/getPetDossier`,
  // 小主卡列表
  getPetListUrl: `${host}/index/pet/getPetList`,
  // 获取帖子详情
  getPostDetail: `${host}/index/info/getDetail`,
  // 绑定手机发送验证码
  getSmsCodeUrl: `${host}/index/user/sendValidCode`,
  // 主题表单
  getTopicFormUrl: `${host}/index/info/getTopicExtend`,
  // 授权登录 getUserInfo
  getUserInfoUrl: `${host}/index/user/updateInfo`,
  // 点赞帖子
  likePostUrl: `${host}/index/info/like`,
  // wx.login
  loginUrl: `${host}/index/user/xcxlogin`,
  // 发布
  postingUrl: `${host}/index/info/create`,
  // 搜索: 参数 query
  searchUrl: `${host}/index/search/info`,
  // 图片、视频上传
  uploadFile: `${host}/index/picture/upload`,
  // 手机验证码校验
  validPhoneUrl: `${host}/index/user/validPhone`
}

export default config
