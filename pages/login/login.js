// pages/login/login.js
import { login } from './../../api/user'
import {setItem} from '../../utils/storage'
const app = getApp()
Page({
  data: {
    flag: true,
    loginname: 'jian',
    password: 'jian'
  },
  changeLoginname (e) {
    this.setData({
      loginname: e.detail
    })
    if (this.data.loginname.length === 0 || this.data.password.length === 0) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  changePassword (e) {
    this.setData({
      password: e.detail
    })
    if (this.data.loginname.length === 0 || this.data.password.length === 0) {
      this.setData({
        flag: true
      })
    } else {
      this.setData({
        flag: false
      })
    }
  },
  login () {
    login({
      loginname: this.data.loginname,
      password: this.data.password
    }).then(res => {
      if (res.data.code === '10007') {
        wx.showToast({
          title: '该用户还未注册',
          icon: 'none'
        })
      } else if (res.data.code === '10008') {
        wx.showToast({
          title: '密码错误',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '登录成功',
          icon: 'none'
        })
        const data = res.data.data
        setItem('username', data.username)
        setItem('token', data.token)
        setItem('userid', data.userid)
        setItem('loginState', true)
        app.globalData.username = data.username
        app.globalData.token = data.token
        app.globalData.userid = data.userid
        app.globalData.loginState = true
        
        wx.navigateBack()
        
      }
    })
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {

  },
  onHide: function () {

  },

  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})