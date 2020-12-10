import { getProDetail } from './../../api/pro'
import {addCartFn,getCartItems} from './../../api/cart'
import {getItem} from '../../utils/storage'
const app = getApp()
Page({
  data: {
    banners: [],
    proid: '',
    brand: '',
    category: '',
    proname: '',
    originprice: 0,
    discount: 0,
    desc: '',
    sales: 0,
    stock: 0,
    screenWidth: app.globalData.screenWidth,
    current: 0,
    showprice: 0,
    userid:getItem('userid'),
    cartItems:0
  },
  handleChange(event) {
    this.setData({
      current: event.detail.current
    })
  },
  previewimg (e) {
    wx.previewImage({
      urls: this.data.banners,
      current: this.data.banners[this.data.current],
    })
  },

  toCart () {
    if (app.globalData.loginState) {
      wx.switchTab({
        url: '/pages/cart/cart',
      })
    } else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  addCart () {
    if (app.globalData.loginState) {
      addCartFn({
        userid: app.globalData.userid,
        proid: this.data.proid,
        num: 1,
        token: app.globalData.token
      })
      .then(res => {
        if (res.data.code === '10119') {
          wx.showToast({
            title: '请先登录',
            icon: 'none'
          })
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } 
        else {
          
          wx.showToast({           
            title: '加入购物车成功',
            icon: 'none'
          })
          this.setData({cartItems:this.data.cartItems+1})
        }
      }).catch(err=>console.log(err))
    } 
    else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  },

  onLoad: function (options) {
    getProDetail({ proid: options.proid }).then(res => {
      const data = res.data[0]
      this.setData({
        banners: data.banners,
        proid: options.proid,
        brand: data.brand,
        category: data.category,
        proname: data.proname,
        originprice: data.originprice,
        discount: data.discount,
        desc: data.desc,
        sales: data.sales,
        stock: data.stock,
        showprice: (data.originprice * data.discount / 10).toFixed(2)
      })
    })
    getCartItems({userid:this.data.userid}).then(res=>{
      this.setData({
        cartItems:res.data.data
      })
    })
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