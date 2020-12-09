import {getItem} from './utils/storage'
App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.top = result.statusBarHeight
        this.globalData.screenWidth = result.screenWidth
        this.globalData.screenHeight = result.screenHeight
      },
    })
  },
  globalData:{
    screenWidth: 100,
    screenHeight: 100,
    loginState: getItem('loginState'),
    username:getItem('username'),
    token:getItem('token'),
    userid:getItem('userid')
  }
})